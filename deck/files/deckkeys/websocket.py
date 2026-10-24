"""Minimal WebSocket (RFC 6455) server side on top of asyncio streams."""

import asyncio
import base64
import hashlib
import struct

GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
MAX_MESSAGE = 1024 * 1024

OP_CONT = 0x0
OP_TEXT = 0x1
OP_BINARY = 0x2
OP_CLOSE = 0x8
OP_PING = 0x9
OP_PONG = 0xA


class ProtocolError(Exception):
    pass


def accept_key(client_key):
    digest = hashlib.sha1((client_key + GUID).encode()).digest()
    return base64.b64encode(digest).decode()


def _unmask(data, mask):
    n = len(data)
    if n == 0:
        return data
    key = int.from_bytes((mask * (n // 4 + 1))[:n], "big")
    return (int.from_bytes(data, "big") ^ key).to_bytes(n, "big")


class WebSocket:
    def __init__(self, reader, writer):
        self._reader = reader
        self._writer = writer
        self._lock = asyncio.Lock()
        self.closed = False

    async def _read_frame(self):
        b1, b2 = await self._reader.readexactly(2)
        fin = bool(b1 & 0x80)
        opcode = b1 & 0x0F
        if not b2 & 0x80:
            raise ProtocolError("client frames must be masked")
        length = b2 & 0x7F
        if length == 126:
            (length,) = struct.unpack("!H", await self._reader.readexactly(2))
        elif length == 127:
            (length,) = struct.unpack("!Q", await self._reader.readexactly(8))
        if length > MAX_MESSAGE:
            raise ProtocolError("message too large")
        mask = await self._reader.readexactly(4)
        data = _unmask(await self._reader.readexactly(length), mask)
        return fin, opcode, data

    async def recv(self):
        """Returns the next text message, or None when the connection is closed."""
        parts = []
        size = 0
        while True:
            try:
                fin, opcode, data = await self._read_frame()
            except (asyncio.IncompleteReadError, ConnectionError, ProtocolError):
                self.closed = True
                return None
            if opcode == OP_CLOSE:
                await self.close()
                return None
            if opcode == OP_PING:
                await self._send_frame(OP_PONG, data)
                continue
            if opcode == OP_PONG:
                continue
            if opcode in (OP_TEXT, OP_BINARY, OP_CONT):
                size += len(data)
                if size > MAX_MESSAGE:
                    await self.close(1009)
                    return None
                parts.append(data)
                if fin:
                    try:
                        return b"".join(parts).decode()
                    except UnicodeDecodeError:
                        await self.close(1007)
                        return None
                continue
            await self.close(1002)
            return None

    async def _send_frame(self, opcode, payload):
        length = len(payload)
        if length < 126:
            header = struct.pack("!BB", 0x80 | opcode, length)
        elif length < 65536:
            header = struct.pack("!BBH", 0x80 | opcode, 126, length)
        else:
            header = struct.pack("!BBQ", 0x80 | opcode, 127, length)
        async with self._lock:
            self._writer.write(header + payload)
            await self._writer.drain()

    async def send(self, text):
        if self.closed:
            return
        try:
            await self._send_frame(OP_TEXT, text.encode())
        except (ConnectionError, RuntimeError):
            self.closed = True

    async def close(self, code=1000, reason=""):
        if self.closed:
            return
        self.closed = True
        try:
            await self._send_frame(OP_CLOSE, struct.pack("!H", code) + reason.encode()[:120])
        except (ConnectionError, RuntimeError):
            pass
