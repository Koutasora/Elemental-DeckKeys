"""HTTPS + WebSocket server: pairing, session and typing text on the Deck."""

import asyncio
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

from . import certs
from .keyboard import BROWSER_CODES, VirtualKeyboard
from .pairing import CODE_LIFETIME, DeviceStore, Pairing
from .websocket import WebSocket, accept_key

COOKIE = "deckkeys"
HEARTBEAT_TIMEOUT = 3
IDLE_TIMEOUT = 600
MAX_TEXT = 20000
MAX_BODY = 64 * 1024
MAX_HEAD = 16 * 1024

STATIC = {
    "/": ("index.html", "text/html; charset=utf-8"),
    "/app.js": ("app.js", "text/javascript; charset=utf-8"),
    "/app.css": ("app.css", "text/css; charset=utf-8"),
}
STATUS_TEXT = {
    101: "Switching Protocols", 200: "OK", 400: "Bad Request", 401: "Unauthorized",
    403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 413: "Payload Too Large",
}
HOST_RE = re.compile(r"^[A-Za-z0-9.\-]+(:\d{1,5})?$|^\[[0-9A-Fa-f:.]+\](:\d{1,5})?$")


class Request:
    def __init__(self, method, path, headers, body):
        self.peer = None
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
        if self.headers.get("x-deckkeys-local") != "1" or not self.peer:
            return False
        try:
            return ipaddress.ip_address(self.peer.split("%", 1)[0]).is_loopback
        except ValueError:
            return False

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
    length = int(headers.get("content-length") or 0)
    if length < 0 or length > MAX_BODY:
        raise ValueError("body too large")
    body = await reader.readexactly(length) if length else b""
    return Request(method, target.split("?", 1)[0], headers, body)


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
        self.typing = None
        self.stop = threading.Event()


class Server:
    def __init__(self, data_dir, web_dir, port):
        os.makedirs(data_dir, mode=0o700, exist_ok=True)
        self.web_dir = web_dir
        self.port = port
        self.devices = DeviceStore(os.path.join(data_dir, "devices.json"))
        self.pairing = Pairing()
        self.cert, self.key = certs.ensure_certificate(data_dir)
        self.keyboard = None
        self.client = None
        self.last_paired = None

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
            name = self.devices.devices[device_id]["name"] if device_id else None
            return await self._json(writer, request, 200, {
                "paired": device_id is not None, "name": name, "pairing": self.pairing.active,
            })
        if path == "/api/pair" and method == "POST":
            return await self._pair(request, writer)
        if path == "/api/forget" and method == "POST":
            return await self._forget(request, writer)
        if path == "/api/local/pair" and method == "POST" and request.local():
            return await self._json(writer, request, 200, {
                "code": self.pairing.open(), "seconds": CODE_LIFETIME,
                "addresses": self.addresses(), "fingerprint": certs.fingerprint(self.cert),
            })
        if path == "/api/local/pairing" and method == "GET" and request.local():
            return await self._json(writer, request, 200, {
                "active": self.pairing.active, "paired": self.last_paired,
            })
        if path == "/ws" and method == "GET":
            return await self._websocket(request, reader, writer)
        await self._respond(writer, request, 404)

    async def _pair(self, request, writer):
        if not request.same_origin():
            return await self._respond(writer, request, 403)
        try:
            data = json.loads(request.body)
            code = str(data.get("code", "")).strip()
            name = str(data.get("name", "")).strip()[:40] or "PC"
        except (ValueError, AttributeError):
            return await self._respond(writer, request, 400)
        result = self.pairing.check(code)
        if result != "ok":
            error = "wrong_code" if result == "wrong" else "pairing_closed"
            return await self._json(writer, request, 403, {"error": error})
        device_id, key = self.devices.add(name)
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
        try:
            while not ws.closed:
                try:
                    message = await asyncio.wait_for(ws.recv(), HEARTBEAT_TIMEOUT)
                except asyncio.TimeoutError:
                    break
                if message is None:
                    break
                await self._handle_message(client, message)
                if (client.session and not client.typing
                        and time.monotonic() - client.last_activity > IDLE_TIMEOUT):
                    await self._end_session(client, "idle")
        finally:
            await self._end_session(client, None, notify=False)
            if self.client is client:
                self.client = None
            await ws.close()

    async def _drop_client(self, client, reason):
        await self._end_session(client, reason)
        await client.ws.send(json.dumps({"t": "closed", "reason": reason}))
        await client.ws.close(4000, reason)
        if self.client is client:
            self.client = None

    async def _send_state(self, client, reason=None):
        remaining = 0
        if client.session:
            remaining = max(0, int(IDLE_TIMEOUT - (time.monotonic() - client.last_activity)))
        await client.ws.send(json.dumps({
            "t": "state", "session": client.session, "remaining": remaining,
            "typing": client.typing is not None, "reason": reason,
        }))

    async def _end_session(self, client, reason, notify=True):
        client.stop.set()
        if client.typing:
            await client.typing
        self.keyboard.release_all()
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
                self.keyboard.key(code, bool(msg.get("down")))
                client.last_activity = time.monotonic()
        elif kind == "release":
            if not client.typing:
                self.keyboard.release_all()

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
        self.keyboard.release_all()
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
            self.keyboard.release_all()
            client.typing = None
        await client.ws.send(json.dumps({
            "t": "typed", "id": message_id, "skipped": "".join(sorted(set(skipped))),
            "stopped": client.stop.is_set(),
        }))
        await self._send_state(client)

    # --- Run ----------------------------------------------------------------

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
        self.keyboard = VirtualKeyboard()
        server = await asyncio.start_server(
            self._handle, "0.0.0.0", self.port,
            ssl=certs.server_context(self.cert, self.key), limit=MAX_HEAD)
        print("Elemental DeckKeys is running.", flush=True)
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
            async with server:
                await stop.wait()
        finally:
            if self.client:
                await self._drop_client(self.client, "shutdown")
            self.keyboard.close()
            print("Stopped.", flush=True)
