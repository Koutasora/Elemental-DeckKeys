"""Paired devices and one-time pairing codes."""

import hashlib
import hmac
import json
import os
import secrets
import time

CODE_LIFETIME = 120
MAX_ATTEMPTS = 5


def hash_key(key):
    return hashlib.sha256(key.encode()).hexdigest()


class DeviceStore:
    """devices.json: {device_id: {name, key_hash, created, last_seen}}"""

    def __init__(self, path):
        self._path = path
        self.devices = {}
        if os.path.exists(path):
            with open(path, encoding="utf-8") as f:
                self.devices = json.load(f)

    def _save(self):
        tmp = self._path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(self.devices, f, indent=1)
        os.chmod(tmp, 0o600)
        os.replace(tmp, self._path)

    def add(self, name):
        """Creates a device and returns (device_id, key). Only the key hash is stored."""
        key = secrets.token_urlsafe(32)
        device_id = secrets.token_hex(8)
        now = int(time.time())
        self.devices[device_id] = {
            "name": name, "key_hash": hash_key(key), "created": now, "last_seen": now,
        }
        self._save()
        return device_id, key

    def find(self, key):
        if not key:
            return None
        wanted = hash_key(key)
        for device_id, device in self.devices.items():
            if hmac.compare_digest(device["key_hash"], wanted):
                return device_id
        return None

    def touch(self, device_id):
        if device_id in self.devices:
            self.devices[device_id]["last_seen"] = int(time.time())
            self._save()

    def remove(self, device_id):
        if self.devices.pop(device_id, None) is not None:
            self._save()


class Pairing:
    def __init__(self):
        self.code = None
        self.expires = 0
        self.attempts = 0

    @property
    def active(self):
        return self.code is not None and time.monotonic() < self.expires

    def open(self):
        self.code = f"{secrets.randbelow(10**6):06d}"
        self.expires = time.monotonic() + CODE_LIFETIME
        self.attempts = 0
        return self.code

    def close(self):
        self.code = None

    def check(self, code):
        """Returns "ok", "wrong" or "closed". The code is single use."""
        if not self.active:
            return "closed"
        self.attempts += 1
        if hmac.compare_digest(str(code), self.code):
            self.close()
            return "ok"
        if self.attempts >= MAX_ATTEMPTS:
            self.close()
            return "closed"
        return "wrong"
