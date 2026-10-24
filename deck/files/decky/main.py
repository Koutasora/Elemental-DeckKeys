"""Decky backend: forwards panel actions to the Elemental DeckKeys service on this Deck."""

import asyncio
import json
import ssl
import urllib.request

import decky

BASE = "https://127.0.0.1:8443"
# The service on this Deck uses its own self-signed certificate.
CONTEXT = ssl._create_unverified_context()


def _call(path, method="GET", body=None):
    data = json.dumps(body).encode() if body is not None else None
    request = urllib.request.Request(BASE + path, method=method, data=data, headers={
        "X-DeckKeys-Local": "1", "Content-Type": "application/json",
    })
    with urllib.request.urlopen(request, context=CONTEXT, timeout=5) as response:
        return json.load(response)


async def _request(path, method="GET", body=None):
    """Service response, or {"running": False} when the service is not reachable."""
    try:
        result = await asyncio.to_thread(_call, path, method, body)
    except OSError as e:
        decky.logger.info(f"Service not reachable: {e}")
        return {"running": False}
    result["running"] = True
    return result


class Plugin:
    async def get_status(self):
        return await _request("/api/local/status")

    async def toggle(self):
        await _request("/api/local/switch", "POST")
        return await self.get_status()

    async def pair(self):
        await _request("/api/local/pair", "POST")
        return await self.get_status()

    async def remove_device(self, device_id: str):
        return await _request("/api/local/devices/remove", "POST", {"id": device_id})

    async def _main(self):
        decky.logger.info("Elemental DeckKeys panel loaded")

    async def _unload(self):
        pass

    async def _uninstall(self):
        pass
