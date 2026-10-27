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

    def _open_dir(self, parts=(), create=False):
        """A descriptor of Received or of a folder inside it, opened without following links."""
        self._ensure_folder()
        flags = os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW
        fd = os.open(self.inbox, flags)
        try:
            for part in parts:
                if create:
                    try:
                        os.mkdir(part, 0o755, dir_fd=fd)
                        os.chown(part, self.uid, self.gid, dir_fd=fd, follow_symlinks=False)
                    except FileExistsError:
                        pass
                inner = os.open(part, flags, dir_fd=fd)
                os.close(fd)
                fd = inner
        except BaseException:
            os.close(fd)
            raise
        return fd

    def create_folder(self, name, device):
        """A new folder in Received for a sent folder, never an existing one. Returns its name."""
        fd = self._open_dir()
        try:
            base = safe_name(name)
            for n in range(1000):
                final = base if n == 0 else f"{base} ({n})"
                try:
                    os.mkdir(final, 0o755, dir_fd=fd)
                except FileExistsError:
                    continue
                os.chown(final, self.uid, self.gid, dir_fd=fd, follow_symlinks=False)
                self._remember(final + "/", 0, device)
                return final
        finally:
            os.close(fd)
        raise FileExistsError(name)

    def open_part(self, folder=()):
        """A hidden temporary file for an upload in progress, in Received or a folder of it.

        `folder` is a path made of safe names whose first part was made by create_folder;
        the folders below it are created as needed.
        """
        if folder:
            fd = self._open_dir(folder[:1])
            os.close(fd)  # the sent folder must already exist
        dir_fd = self._open_dir(folder, create=True)
        name = f".deckkeys-{secrets.token_hex(6)}.part"
        try:
            fd = os.open(name, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o644,
                         dir_fd=dir_fd)
        except BaseException:
            os.close(dir_fd)
            raise
        return (dir_fd, name, tuple(folder)), os.fdopen(fd, "wb")

    def finish(self, part, name, size, device):
        """Gives the upload its name without overwriting anything. Returns the final name.

        On an error the part stays as it is, for discard().
        """
        dir_fd, temp, folder = part
        os.chown(temp, self.uid, self.gid, dir_fd=dir_fd, follow_symlinks=False)
        stem, ext = os.path.splitext(safe_name(name))
        for n in range(1000):
            final = f"{stem}{ext}" if n == 0 else f"{stem} ({n}){ext}"
            try:  # fails if the name is taken
                os.link(temp, final, src_dir_fd=dir_fd, dst_dir_fd=dir_fd, follow_symlinks=False)
            except FileExistsError:
                continue
            os.unlink(temp, dir_fd=dir_fd)
            if folder:
                self._add_to_folder(folder[0], size)
            else:
                self._remember(final, size, device)
            os.close(dir_fd)
            return final
        raise FileExistsError(name)

    def discard(self, part):
        dir_fd, temp, _ = part
        try:
            os.unlink(temp, dir_fd=dir_fd)
        except OSError:
            pass
        os.close(dir_fd)

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

    def _add_to_folder(self, folder, size):
        """A sent folder is one entry on the list; its size grows with every file."""
        for entry in self.received:
            if entry["name"] == folder + "/":
                entry["size"] += size
                self._save_received()
                return

    def clear_received(self):
        self.received = []
        self._save_received()

    def _save_received(self):
        with open(self._received_path, "w", encoding="utf-8") as f:
            json.dump(self.received, f)
