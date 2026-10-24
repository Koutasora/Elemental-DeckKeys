"""The transfers folder: Downloads/DeckKeysTransfers of the Deck user.

Files sent from a browser are saved in its "Received" folder; files the user puts in
"Send to PC" can be downloaded. Nothing outside these folders is ever read or written.
"""

import json
import os
import pwd
import secrets
import shutil
import stat
import time

FOLDER = os.path.join("Downloads", "DeckKeysTransfers")
INBOX = "Received"
OUTBOX = "Send to PC"
SPACE_RESERVE = 200 * 1024 * 1024
MAX_NAME_BYTES = 200
MAX_RECEIVED = 20


def safe_name(raw):
    """A plain file name: no folders, no control characters, no leading dots."""
    name = os.path.basename(str(raw).replace("\\", "/")).strip()
    name = "".join(ch for ch in name if ch >= " " and ch != "\x7f").lstrip(".").strip()
    name = name or "file"
    stem, ext = os.path.splitext(name)
    while len((stem + ext).encode()) > MAX_NAME_BYTES and stem:
        stem = stem[:-1]
    return (stem + ext) or "file"


class Transfers:
    def __init__(self, user, data_dir):
        account = pwd.getpwnam(user)
        self.uid, self.gid = account.pw_uid, account.pw_gid
        self.folder = os.path.join(account.pw_dir, FOLDER)
        self.inbox = os.path.join(self.folder, INBOX)
        self.outbox = os.path.join(self.folder, OUTBOX)
        self._received_path = os.path.join(data_dir, "received.json")
        try:
            with open(self._received_path, encoding="utf-8") as f:
                self.received = json.load(f)
        except (OSError, ValueError):
            self.received = []

    def _ensure_folder(self):
        downloads = os.path.dirname(self.folder)
        for path in (downloads, self.folder, self.inbox, self.outbox):
            if os.path.islink(path):
                raise PermissionError(f"{path} is a link")
            if not os.path.isdir(path):
                os.mkdir(path, 0o755)
                os.chown(path, self.uid, self.gid)

    def free_space(self):
        self._ensure_folder()
        return shutil.disk_usage(self.inbox).free - SPACE_RESERVE

    def list(self):
        """Files waiting in "Send to PC"."""
        try:
            self._ensure_folder()
        except OSError:
            return []
        files = []
        with os.scandir(self.outbox) as entries:
            for entry in entries:
                if entry.name.startswith(".") or not entry.is_file(follow_symlinks=False):
                    continue
                info = entry.stat(follow_symlinks=False)
                files.append({"name": entry.name, "size": info.st_size,
                              "time": int(info.st_mtime)})
        files.sort(key=lambda f: -f["time"])
        return files[:200]

    def open_part(self):
        """A hidden temporary file for an upload in progress."""
        self._ensure_folder()
        path = os.path.join(self.inbox, f".deckkeys-{secrets.token_hex(6)}.part")
        fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o644)
        return path, os.fdopen(fd, "wb")

    def finish(self, part, name, size, device):
        """Gives the upload its name without overwriting anything. Returns the final name."""
        os.chown(part, self.uid, self.gid)
        stem, ext = os.path.splitext(safe_name(name))
        for n in range(1000):
            final = f"{stem}{ext}" if n == 0 else f"{stem} ({n}){ext}"
            try:
                os.link(part, os.path.join(self.inbox, final))  # fails if the name is taken
            except FileExistsError:
                continue
            os.unlink(part)
            self._remember(final, size, device)
            return final
        raise FileExistsError(name)

    def discard(self, part):
        try:
            os.unlink(part)
        except OSError:
            pass

    def open_file(self, name):
        """A file of "Send to PC" for download, or None. Links and hidden files are refused."""
        if name != safe_name(name) or os.path.islink(self.outbox):
            return None
        try:
            fd = os.open(os.path.join(self.outbox, name), os.O_RDONLY | os.O_NOFOLLOW)
        except OSError:
            return None
        if not stat.S_ISREG(os.fstat(fd).st_mode):
            os.close(fd)
            return None
        return os.fdopen(fd, "rb")

    def _remember(self, name, size, device):
        self.received.insert(0, {"name": name, "size": size, "device": device,
                                 "time": int(time.time())})
        del self.received[MAX_RECEIVED:]
        self._save_received()

    def clear_received(self):
        self.received = []
        self._save_received()

    def _save_received(self):
        with open(self._received_path, "w", encoding="utf-8") as f:
            json.dump(self.received, f)
