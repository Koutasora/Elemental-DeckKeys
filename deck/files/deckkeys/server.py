"""HTTPS + WebSocket server: pairing, session and typing text on the Deck."""

import asyncio
import hashlib
import ipaddress
import json
import os
import re
import signal
import socket
import ssl
import threading
import time
from http.cookies import CookieError, SimpleCookie
from urllib.parse import parse_qs, quote

from . import __version__, certs, qr
from .keyboard import (BROWSER_CODES, BUTTONS, MACROS, MEDIA_CODES, MEDIA_KEYS, VirtualKeyboard,
                       VirtualMouse)
from .pairing import CODE_LIFETIME, KINDS, DeviceStore, Pairing
from .transfers import Transfers
from .websocket import WebSocket, accept_key

COOKIE = "deckkeys"
# A browser in the background may ping only once a minute. Wait long for it, unless keys
# are held down: then a dropped connection must release them quickly.
HEARTBEAT_TIMEOUT = 3
QUIET_HEARTBEAT_TIMEOUT = 90
# While a key is held the browser repeats "hold" every 100 ms. A key not heard of for this
# long is released here: a key-up delayed by Wi-Fi would otherwise start the Deck's own key
# repeat (after about 0.6 s) and type "yyy".
KEY_HOLD_TIMEOUT = 0.3
IDLE_TIMEOUT = 600
SESSION_MINUTES = (5, 10, 15, 20, 30)
MAX_TEXT = 20000
MAX_BODY = 64 * 1024
MAX_HEAD = 16 * 1024

STATIC = {
    "/": ("index.html", "text/html; charset=utf-8"),
    "/app.js": ("app.js", "text/javascript; charset=utf-8"),
    "/app.css": ("app.css", "text/css; charset=utf-8"),
}
STATUS_TEXT = {
    101: "Switching Protocols", 200: "OK", 301: "Moved Permanently", 400: "Bad Request",
    401: "Unauthorized", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed",
    411: "Length Required", 413: "Payload Too Large", 500: "Internal Server Error",
    507: "Insufficient Storage",
}
HOST_RE = re.compile(r"^[A-Za-z0-9.\-]+(:\d{1,5})?$|^\[[0-9A-Fa-f:.]+\](:\d{1,5})?$")


class Request:
    def __init__(self, method, path, headers, body, query=""):
        self.peer = None
        self.query = parse_qs(query)
        self.method = method
        self.path = path
        self.headers = headers
        self.body = body

    def cookie(self, name):
        try:
            morsel = SimpleCookie(self.headers.get("cookie", "")).get(name)
        except CookieError:
            return None
        return morsel.value if morsel else None

    @property
    def host(self):
        host = self.headers.get("host", "")
        return host if HOST_RE.match(host) else None

    def local(self):
        """From the Deck itself and not from a web page (pages cannot set this header
        cross-origin without a CORS preflight, which the server never answers)."""
        return (self.headers.get("x-deckkeys-local") == "1" and self.peer is not None
                and is_loopback(self.peer))

    def same_origin(self):
        host = self.host
        return host is not None and self.headers.get("origin") == f"https://{host}"


async def read_request(reader):
    head = await reader.readuntil(b"\r\n\r\n")
    lines = head.decode("latin-1").split("\r\n")
    method, target, _ = lines[0].split(" ", 2)
    headers = {}
    for line in lines[1:]:
        if line:
            name, _, value = line.partition(":")
            headers[name.strip().lower()] = value.strip()
    path, _, query = target.partition("?")
    if method == "PUT" and path == "/api/files":
        return Request(method, path, headers, b"", query)  # file bodies are streamed
    length = int(headers.get("content-length") or 0)
    if length < 0 or length > MAX_BODY:
        raise ValueError("body too large")
    body = await reader.readexactly(length) if length else b""
    return Request(method, path, headers, body, query)


def is_loopback(ip):
    try:
        return ipaddress.ip_address(ip.split("%", 1)[0]).is_loopback
    except ValueError:
        return False


def allowed_peer(ip):
    try:
        address = ipaddress.ip_address(ip.split("%", 1)[0])
    except ValueError:
        return False
    if address.version == 6 and address.ipv4_mapped:
        address = address.ipv4_mapped
    return address.is_private or address.is_loopback


def lan_address():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("192.0.2.1", 9))  # no traffic is sent
            return s.getsockname()[0]
    except OSError:
        return None


class Client:
    def __init__(self, ws, device_id):
        self.ws = ws
        self.device_id = device_id
        self.session = False
        self.last_activity = 0.0
        self.idle_timeout = IDLE_TIMEOUT
        self.typing = None
        self.stop = threading.Event()
        self.keys = {}  # live-mode key code -> when the browser last said it is held


class Server:
    def __init__(self, data_dir, web_dir, port, user="deck"):
        os.makedirs(data_dir, mode=0o700, exist_ok=True)
        self.settings_path = os.path.join(data_dir, "settings.json")
        self.enabled = self._load_settings().get("enabled", True)
        self.web_dir = web_dir
        # Changes whenever the page files change, so open pages can reload after an update.
        digest = hashlib.sha256()
        for name, _ in STATIC.values():
            with open(os.path.join(web_dir, name), "rb") as f:
                digest.update(f.read())
        self.build = digest.hexdigest()[:12]
        self.port = port
        self.devices = DeviceStore(os.path.join(data_dir, "devices.json"))
        self.pairing = Pairing()
        self.cert, self.key = certs.ensure_certificate(data_dir)
        self.transfers = Transfers(user, data_dir)
        self.keyboard = None
        self.media = None
        self.mouse = None
        self.client = None
        self.last_paired = None

    def _load_settings(self):
        try:
            with open(self.settings_path, encoding="utf-8") as f:
                return json.load(f)
        except (OSError, ValueError):
            return {}

    def _save_settings(self):
        with open(self.settings_path, "w", encoding="utf-8") as f:
            json.dump({"enabled": self.enabled}, f)

    async def _switch(self, on):
        """Main switch. Off: connections from the network are closed right away."""
        self.enabled = on
        self._save_settings()
        if not on:
            self.pairing.close()
            if self.client:
                await self._drop_client(self.client, "disabled")
        print("Switched on." if on else "Switched off.", flush=True)

    # --- HTTP ---------------------------------------------------------------

    async def _respond(self, writer, request, status, body=b"", content_type=None,
                       extra_headers=()):
        host = request.host if request else None
        connect = "'self'" + (f" wss://{host}" if host else "")
        headers = [
            f"HTTP/1.1 {status} {STATUS_TEXT.get(status, '')}",
            f"Content-Length: {len(body)}",
            "Connection: close",
            "Cache-Control: no-store",
            "X-Content-Type-Options: nosniff",
            "Referrer-Policy: no-referrer",
            f"Content-Security-Policy: default-src 'self'; connect-src {connect}; "
            "img-src 'self' data:; "
            "frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
        ]
        if content_type:
            headers.append(f"Content-Type: {content_type}")
        headers.extend(extra_headers)
        writer.write(("\r\n".join(headers) + "\r\n\r\n").encode() + body)
        await writer.drain()

    async def _json(self, writer, request, status, data, extra_headers=()):
        await self._respond(writer, request, status, json.dumps(data).encode(),
                            "application/json", extra_headers)

    async def _handle(self, reader, writer):
        peer = writer.get_extra_info("peername")
        try:
            if not peer or not allowed_peer(peer[0]):
                return
            if not self.enabled and not is_loopback(peer[0]):
                return
            request = await asyncio.wait_for(read_request(reader), 10)
            request.peer = peer[0]
            await self._route(request, reader, writer)
        except (asyncio.TimeoutError, asyncio.IncompleteReadError, asyncio.LimitOverrunError,
                ConnectionError, ssl.SSLError, ValueError):
            pass
        finally:
            writer.close()
            try:
                await writer.wait_closed()
            except (ConnectionError, ssl.SSLError):
                pass

    # --- Listening: HTTPS, and plain http:// redirected to https:// on the same port ---

    async def _listen(self, ssl_context):
        loop = asyncio.get_running_loop()
        listener = socket.create_server(("0.0.0.0", self.port), backlog=100)
        listener.setblocking(False)
        try:
            while True:
                conn, _ = await loop.sock_accept(listener)
                asyncio.create_task(self._accept(conn, ssl_context))
        finally:
            listener.close()

    async def _peek(self, conn):
        """First byte of the connection without consuming it."""
        loop = asyncio.get_running_loop()
        while True:
            try:
                data = conn.recv(1, socket.MSG_PEEK)
            except BlockingIOError:
                ready = loop.create_future()
                loop.add_reader(conn.fileno(), lambda: ready.done() or ready.set_result(None))
                try:
                    await ready
                finally:
                    loop.remove_reader(conn.fileno())
                continue
            if not data:
                raise ConnectionError("closed")
            return data

    async def _accept(self, conn, ssl_context):
        loop = asyncio.get_running_loop()
        conn.setblocking(False)
        try:
            first = await asyncio.wait_for(self._peek(conn), 10)
            # A TLS connection always starts with a handshake record (0x16).
            secure = first == b"\x16"
            reader = asyncio.StreamReader(limit=MAX_HEAD)
            protocol = asyncio.StreamReaderProtocol(reader)
            transport, _ = await loop.connect_accepted_socket(
                lambda: protocol, conn, ssl=ssl_context if secure else None,
                ssl_handshake_timeout=10 if secure else None)
        except (asyncio.TimeoutError, OSError, ssl.SSLError):
            conn.close()
            return
        writer = asyncio.StreamWriter(transport, protocol, reader, loop)
        await (self._handle if secure else self._redirect)(reader, writer)

    async def _redirect(self, reader, writer):
        peer = writer.get_extra_info("peername")
        try:
            if not peer or not allowed_peer(peer[0]):
                return
            if not self.enabled and not is_loopback(peer[0]):
                return
            request = await asyncio.wait_for(read_request(reader), 10)
            if request.host:
                await self._respond(writer, request, 301,
                                    extra_headers=[f"Location: https://{request.host}/"])
        except (asyncio.TimeoutError, asyncio.IncompleteReadError, asyncio.LimitOverrunError,
                ConnectionError, ValueError):
            pass
        finally:
            writer.close()

    async def _route(self, request, reader, writer):
        path, method = request.path, request.method
        if path in STATIC:
            if method != "GET":
                return await self._respond(writer, request, 405)
            name, content_type = STATIC[path]
            with open(os.path.join(self.web_dir, name), "rb") as f:
                return await self._respond(writer, request, 200, f.read(), content_type)
        if path == "/api/status" and method == "GET":
            device_id = self.devices.find(request.cookie(COOKIE))
            device = self.devices.devices.get(device_id, {}) if device_id else {}
            return await self._json(writer, request, 200, {
                "paired": device_id is not None, "name": device.get("name"),
                "kind": device.get("kind", "other") if device_id else None,
                "pairing": self.pairing.active, "version": __version__, "build": self.build,
            })
        if path == "/api/devices" and method == "GET":
            mine = self.devices.find(request.cookie(COOKIE))
            if not mine:
                return await self._respond(writer, request, 401)
            return await self._json(writer, request, 200, {"devices": self._device_list(mine)})
        if path == "/api/qr" and method == "GET":
            if not self.devices.find(request.cookie(COOKIE)):
                return await self._respond(writer, request, 401)
            url = self.phone_url()
            return await self._json(writer, request, 200, {"url": url, "svg": qr.svg(url)})
        if path == "/api/files" and method == "PUT":
            return await self._upload(request, reader, writer)
        if path == "/api/files" and method == "GET":
            if not self._session_device(request):
                return await self._json(writer, request, 403, {"error": "no_session"})
            return await self._json(writer, request, 200, {"files": self.transfers.list()})
        if path == "/api/files/download" and method == "GET":
            return await self._download(request, writer)
        if path == "/api/pair" and method == "POST":
            return await self._pair(request, writer)
        if path == "/api/forget" and method == "POST":
            return await self._forget(request, writer)
        if path == "/api/local/switch" and method == "POST" and request.local():
            await self._switch(not self.enabled)
            return await self._json(writer, request, 200, {"on": self.enabled})
        if path == "/api/local/pair" and method == "POST" and request.local():
            if not self.enabled:
                await self._switch(True)
            return await self._json(writer, request, 200, {
                "code": self.pairing.open(), "seconds": CODE_LIFETIME,
                "phone_url": self.phone_url(),
                "addresses": self.addresses(), "fingerprint": certs.fingerprint(self.cert),
            })
        if path == "/api/local/pairing" and method == "GET" and request.local():
            return await self._json(writer, request, 200, {
                "active": self.pairing.active, "paired": self.last_paired,
                "on": self.enabled, "devices": len(self.devices.devices),
            })
        if path == "/api/local/status" and method == "GET" and request.local():
            return await self._json(writer, request, 200, self._local_status())
        if path == "/api/local/received/clear" and method == "POST" and request.local():
            self.transfers.clear_received()
            return await self._json(writer, request, 200, self._local_status())
        if path == "/api/local/devices/remove" and method == "POST" and request.local():
            try:
                device_id = str(json.loads(request.body).get("id", ""))
            except (ValueError, AttributeError):
                return await self._respond(writer, request, 400)
            if self.client and self.client.device_id == device_id:
                await self._drop_client(self.client, "forgotten")
            self.devices.remove(device_id)
            return await self._json(writer, request, 200, self._local_status())
        if path == "/ws" and method == "GET":
            return await self._websocket(request, reader, writer)
        await self._respond(writer, request, 404)

    def _device_list(self, mine=None):
        connected = self.client.device_id if self.client else None
        return [
            {"id": device_id, "name": d["name"], "kind": d.get("kind", "other"),
             "last_seen": d["last_seen"], "connected": device_id == connected,
             "this": device_id == mine}
            for device_id, d in sorted(self.devices.devices.items(),
                                       key=lambda item: -item[1]["last_seen"])
        ]

    def _local_status(self):
        """Everything the Decky panel shows. Only served to the Deck itself."""
        client = self.client
        return {
            "version": __version__,
            "on": self.enabled,
            "client": self.devices.devices.get(client.device_id, {}).get("name") if client else None,
            "client_kind": (self.devices.devices.get(client.device_id, {}).get("kind", "other")
                            if client else None),
            "session": bool(client and client.session),
            "addresses": self.addresses(),
            "fingerprint": certs.fingerprint(self.cert),
            "pairing": {
                "code": self.pairing.code if self.pairing.active else None,
                "seconds": self.pairing.seconds_left,
            },
            "devices": self._device_list(),
            "phone_url": self.phone_url(),
            "qr": qr.svg(self.phone_url()),
            "transfers_folder": self.transfers.inbox,
            "received": self.transfers.received[:5],
        }

    def _session_device(self, request):
        """The device of this request, if it is the one with the active session."""
        device_id = self.devices.find(request.cookie(COOKIE))
        client = self.client
        if device_id and client and client.device_id == device_id and client.session:
            return device_id
        return None

    async def _upload(self, request, reader, writer):
        """PUT /api/files?name=...: one file, streamed into the transfers folder."""
        if not request.same_origin():
            return await self._respond(writer, request, 403)
        device_id = self._session_device(request)
        if not device_id:
            return await self._json(writer, request, 403, {"error": "no_session"})
        try:
            length = int(request.headers["content-length"])
        except (KeyError, ValueError):
            return await self._respond(writer, request, 411)
        if length < 0:
            return await self._respond(writer, request, 400)
        try:
            if length > self.transfers.free_space():
                return await self._json(writer, request, 507, {"error": "no_space"})
            part, out = self.transfers.open_part()
        except OSError as e:
            print(f"Cannot save files: {e}", flush=True)
            return await self._json(writer, request, 500, {"error": "save_failed"})
        try:
            with out:
                remaining = length
                while remaining:
                    chunk = await asyncio.wait_for(reader.read(min(1 << 20, remaining)), 60)
                    if not chunk:
                        raise ConnectionError("upload interrupted")
                    await asyncio.to_thread(out.write, chunk)
                    remaining -= len(chunk)
                    if self.client:
                        self.client.last_activity = time.monotonic()
            device = self.devices.devices.get(device_id, {}).get("name", "")
            name = self.transfers.finish(part, request.query.get("name", ["file"])[0],
                                         length, device)
        except BaseException:
            self.transfers.discard(part)
            raise
        print(f"Received: {name} ({length} bytes)", flush=True)
        await self._json(writer, request, 200, {"name": name, "size": length})

    async def _download(self, request, writer):
        """GET /api/files/download?name=...: one file of "Send to PC", streamed."""
        if not self._session_device(request):
            return await self._json(writer, request, 403, {"error": "no_session"})
        name = request.query.get("name", [""])[0]
        f = self.transfers.open_file(name)  # checks the name
        if f is None:
            return await self._respond(writer, request, 404)
        with f:
            size = os.fstat(f.fileno()).st_size
            fallback = name.encode("ascii", "replace").decode().replace('"', "_")
            writer.write("\r\n".join([
                "HTTP/1.1 200 OK",
                f"Content-Length: {size}",
                "Content-Type: application/octet-stream",
                f"Content-Disposition: attachment; filename=\"{fallback}\"; "
                f"filename*=UTF-8''{quote(name)}",
                "Cache-Control: no-store",
                "X-Content-Type-Options: nosniff",
                "Connection: close",
                "", "",
            ]).encode())
            while True:
                chunk = await asyncio.to_thread(f.read, 1 << 20)
                if not chunk:
                    break
                writer.write(chunk)
                await writer.drain()
                if self.client:
                    self.client.last_activity = time.monotonic()

    async def _pair(self, request, writer):
        if not request.same_origin():
            return await self._respond(writer, request, 403)
        try:
            data = json.loads(request.body)
            code = str(data.get("code", "")).strip()
            name = str(data.get("name", "")).strip()[:40] or "PC"
            kind = data.get("kind") if data.get("kind") in KINDS else "other"
        except (ValueError, AttributeError):
            return await self._respond(writer, request, 400)
        result = self.pairing.check(code)
        if result != "ok":
            error = "wrong_code" if result == "wrong" else "pairing_closed"
            return await self._json(writer, request, 403, {"error": error})
        device_id, key = self.devices.add(name, kind)
        self.last_paired = name
        print(f"Paired: {name}", flush=True)
        cookie = (f"Set-Cookie: {COOKIE}={key}; Path=/; Max-Age=315360000; HttpOnly; Secure; "
                  "SameSite=Strict")
        await self._json(writer, request, 200, {"ok": True}, [cookie])

    async def _forget(self, request, writer):
        if not request.same_origin():
            return await self._respond(writer, request, 403)
        device_id = self.devices.find(request.cookie(COOKIE))
        if device_id:
            if self.client and self.client.device_id == device_id:
                await self._drop_client(self.client, "forgotten")
            self.devices.remove(device_id)
            print("Device removed.", flush=True)
        cookie = f"Set-Cookie: {COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict"
        await self._json(writer, request, 200, {"ok": True}, [cookie])

    # --- WebSocket ----------------------------------------------------------

    async def _websocket(self, request, reader, writer):
        headers = request.headers
        key = headers.get("sec-websocket-key")
        if (headers.get("upgrade", "").lower() != "websocket" or not key
                or headers.get("sec-websocket-version") != "13"):
            return await self._respond(writer, request, 400)
        if not request.same_origin():
            return await self._respond(writer, request, 403)
        device_id = self.devices.find(request.cookie(COOKIE))
        if not device_id:
            return await self._respond(writer, request, 401)
        writer.write((
            "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n"
            f"Sec-WebSocket-Accept: {accept_key(key)}\r\n\r\n").encode())
        await writer.drain()
        await self._serve_client(WebSocket(reader, writer), device_id)

    async def _serve_client(self, ws, device_id):
        if self.client:
            await self._drop_client(self.client, "replaced")
        client = Client(ws, device_id)
        self.client = client
        self.devices.touch(device_id)
        await self._send_state(client)
        watchdog = asyncio.create_task(self._watch_keys(client))
        try:
            while not ws.closed:
                try:
                    held = any(d is not None and d.any_pressed for d in self._devices())
                    timeout = (HEARTBEAT_TIMEOUT if held
                               else QUIET_HEARTBEAT_TIMEOUT)
                    message = await asyncio.wait_for(ws.recv(), timeout)
                except asyncio.TimeoutError:
                    break
                if message is None:
                    break
                await self._handle_message(client, message)
                if (client.session and not client.typing
                        and time.monotonic() - client.last_activity > client.idle_timeout):
                    await self._end_session(client, "idle")
        finally:
            watchdog.cancel()
            await self._end_session(client, None, notify=False)
            if self.client is client:
                self.client = None
            await ws.close()

    async def _watch_keys(self, client):
        while True:
            await asyncio.sleep(0.05)
            if client.typing:
                continue
            now = time.monotonic()
            for code, seen in list(client.keys.items()):
                if now - seen > KEY_HOLD_TIMEOUT:
                    del client.keys[code]
                    self._key_up(code)

    def _key_device(self, code):
        return self.media if code in MEDIA_CODES else self.keyboard

    def _key_up(self, code):
        device = self._key_device(code)
        if device is not None and device.is_pressed(code):
            device.key(code, False)

    async def _drop_client(self, client, reason):
        await self._end_session(client, reason)
        await client.ws.send(json.dumps({"t": "closed", "reason": reason}))
        await client.ws.close(4000, reason)
        if self.client is client:
            self.client = None

    async def _send_state(self, client, reason=None):
        remaining = 0
        if client.session:
            elapsed = time.monotonic() - client.last_activity
            remaining = max(0, int(client.idle_timeout - elapsed))
        await client.ws.send(json.dumps({
            "t": "state", "session": client.session, "remaining": remaining,
            "typing": client.typing is not None, "reason": reason,
        }))

    async def _end_session(self, client, reason, notify=True):
        client.stop.set()
        if client.typing:
            await client.typing
        client.keys.clear()
        self._release_all()
        self._detach_devices()
        was_active = client.session
        client.session = False
        if notify and was_active:
            await self._send_state(client, reason)

    async def _handle_message(self, client, message):
        try:
            msg = json.loads(message)
            kind = msg.get("t")
        except (ValueError, AttributeError):
            return
        if kind == "ping":
            await self._send_state(client)
        elif kind == "start":
            await self._attach_devices()
            minutes = msg.get("minutes")
            client.idle_timeout = minutes * 60 if minutes in SESSION_MINUTES else IDLE_TIMEOUT
            client.session = True
            client.last_activity = time.monotonic()
            await self._send_state(client)
        elif kind == "end":
            await self._end_session(client, "ended")
        elif kind == "stop":
            client.stop.set()
        elif kind == "text":
            await self._start_typing(client, msg)
        elif kind == "key":
            # Live mode: physical keys. Ignored while text is being typed.
            code = BROWSER_CODES.get(msg.get("code"))
            if client.session and not client.typing and code is not None:
                if msg.get("down"):
                    self._key_device(code).key(code, True)
                    client.keys[code] = time.monotonic()
                else:
                    # Already released by _watch_keys when the key-up came late.
                    client.keys.pop(code, None)
                    self._key_up(code)
                client.last_activity = time.monotonic()
        elif kind == "hold":
            codes = msg.get("codes")
            if isinstance(codes, list):
                now = time.monotonic()
                for name in codes[:16]:
                    code = BROWSER_CODES.get(name) if isinstance(name, str) else None
                    if code in client.keys:
                        client.keys[code] = now
        elif kind == "chars":
            # Live mode on a phone: on-screen keyboards deliver characters, not keys.
            text = msg.get("text")
            if (client.session and not client.typing and isinstance(text, str)
                    and 0 < len(text) <= 200):
                self._release_all()
                await asyncio.to_thread(self.keyboard.type_text, text, 200)
                client.last_activity = time.monotonic()
        elif kind == "media":
            code = MEDIA_KEYS.get(msg.get("key"))
            if client.session and not client.typing and code is not None:
                self.media.tap(code)
                client.last_activity = time.monotonic()
        elif kind == "macro":
            names = MACROS.get(msg.get("key"))
            if client.session and not client.typing and names:
                self._release_all()
                await asyncio.to_thread(self.keyboard.combo, names)
                client.last_activity = time.monotonic()
        elif kind in ("move", "wheel", "button"):
            if client.session:
                self._mouse_event(kind, msg)
                client.last_activity = time.monotonic()
        elif kind == "release":
            if not client.typing:
                self._release_all()

    async def _start_typing(self, client, msg):
        error = None
        text = msg.get("text")
        if not client.session:
            error = "no_session"
        elif client.typing:
            error = "busy"
        elif not isinstance(text, str):
            error = "bad_text"
        if error:
            return await client.ws.send(json.dumps({"t": "error", "code": error}))
        text = text.replace("\r\n", "\n").replace("\r", "\n")[:MAX_TEXT]
        if msg.get("enter"):
            text += "\n"
        try:
            speed = min(1000, max(10, int(msg.get("speed", 100))))
        except (TypeError, ValueError):
            speed = 100
        client.last_activity = time.monotonic()
        client.stop.clear()
        # Keys still held in live mode (e.g. Ctrl from Ctrl+V) would turn the text into shortcuts.
        self._release_all()
        client.typing = asyncio.create_task(self._type(client, msg.get("id"), text, speed))

    async def _type(self, client, message_id, text, speed):
        loop = asyncio.get_running_loop()

        def progress(done, total):
            client.last_activity = time.monotonic()
            payload = json.dumps({"t": "progress", "id": message_id, "done": done, "total": total})
            loop.call_soon_threadsafe(lambda: asyncio.ensure_future(client.ws.send(payload)))

        skipped = []
        try:
            skipped = await asyncio.to_thread(
                self.keyboard.type_text, text, speed, client.stop, progress)
        except OSError as e:
            print(f"Typing failed: {e}", flush=True)
        finally:
            self._release_all()
            client.typing = None
        await client.ws.send(json.dumps({
            "t": "typed", "id": message_id, "skipped": "".join(sorted(set(skipped))),
            "stopped": client.stop.is_set(),
        }))
        await self._send_state(client)

    def _devices(self):
        return (self.keyboard, self.media, self.mouse)

    def _release_all(self):
        for device in self._devices():
            if device is not None:
                device.release_all()

    def _mouse_event(self, kind, msg):
        def number(name, limit):
            try:
                return max(-limit, min(limit, int(msg.get(name, 0))))
            except (TypeError, ValueError):
                return 0

        if self.mouse is None:
            return
        if kind == "move":
            self.mouse.move(number("dx", 2000), number("dy", 2000))
        elif kind == "wheel":
            self.mouse.wheel(number("v", 20), number("h", 20))
        elif msg.get("b") in BUTTONS:
            self.mouse.button(msg["b"], bool(msg.get("down")))

    # The virtual keyboard is plugged in only for the length of a session. To Steam this
    # looks like a USB keyboard plugged in while it runs, which is when it hides its own.
    async def _attach_devices(self):
        if self.keyboard is None:
            def create():
                devices = (VirtualKeyboard(settle=False),
                           VirtualKeyboard("Elemental DeckKeys Media", keys=MEDIA_CODES,
                                           settle=False),
                           VirtualMouse(settle=False))
                time.sleep(1.0)  # one pause for the system to notice all three
                return devices

            self.keyboard, self.media, self.mouse = await asyncio.to_thread(create)

    def _detach_devices(self):
        for device in self._devices():
            if device is not None:
                device.close()
        self.keyboard = self.media = self.mouse = None

    # --- Run ----------------------------------------------------------------

    def phone_url(self):
        """Address for QR codes: the IP, because phones often cannot resolve .local names."""
        addresses = self.addresses()
        return addresses[-1]

    def addresses(self):
        suffix = "" if self.port == 443 else f":{self.port}"
        result = [f"https://{socket.gethostname()}.local{suffix}"]
        ip = lan_address()
        if ip:
            result.append(f"https://{ip}{suffix}")
        return result

    async def run(self, pair):
        loop = asyncio.get_running_loop()

        def quiet_errors(loop, context):
            # Browsers drop connections while the self-signed certificate is not accepted yet.
            if isinstance(context.get("exception"), (ssl.SSLError, ConnectionError)):
                return
            loop.default_exception_handler(context)

        loop.set_exception_handler(quiet_errors)
        listening = asyncio.create_task(self._listen(certs.server_context(self.cert, self.key)))
        print("Elemental DeckKeys is running." if self.enabled
              else "Elemental DeckKeys is running, switched off.", flush=True)
        for address in self.addresses():
            print(f"  {address}", flush=True)
        print(f"  Certificate: {certs.fingerprint(self.cert)}", flush=True)
        if pair:
            code = self.pairing.open()
            print(f"Pairing code: {code} (valid for 2 minutes)", flush=True)

        stop = asyncio.Event()
        for sig in (signal.SIGTERM, signal.SIGINT):
            loop.add_signal_handler(sig, stop.set)
        try:
            await asyncio.wait([listening, asyncio.create_task(stop.wait())],
                               return_when=asyncio.FIRST_COMPLETED)
            if listening.done():
                listening.result()  # raises the error that stopped listening
        finally:
            listening.cancel()
            if self.client:
                await self._drop_client(self.client, "shutdown")
            self._detach_devices()
            print("Stopped.", flush=True)
