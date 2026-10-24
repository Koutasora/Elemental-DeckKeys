"""Virtual keyboard on top of /dev/uinput, standard library only.

Requires root (or write access to /dev/uinput).
"""

import fcntl
import os
import struct
import time

# ioctl numbers from <linux/uinput.h>
UI_SET_EVBIT = 0x40045564
UI_SET_KEYBIT = 0x40045565
UI_DEV_SETUP = 0x405C5503
UI_DEV_CREATE = 0x5501
UI_DEV_DESTROY = 0x5502

EV_SYN = 0x00
EV_KEY = 0x01
SYN_REPORT = 0
BUS_USB = 0x03
BUS_VIRTUAL = 0x06

# struct input_event on 64-bit: timeval (2 x long), type, code, value
_EVENT = struct.Struct("llHHi")

# Linux key codes from <linux/input-event-codes.h>
KEY = {
    "ESC": 1, "1": 2, "2": 3, "3": 4, "4": 5, "5": 6, "6": 7, "7": 8, "8": 9,
    "9": 10, "0": 11, "MINUS": 12, "EQUAL": 13, "BACKSPACE": 14, "TAB": 15,
    "Q": 16, "W": 17, "E": 18, "R": 19, "T": 20, "Y": 21, "U": 22, "I": 23,
    "O": 24, "P": 25, "LEFTBRACE": 26, "RIGHTBRACE": 27, "ENTER": 28,
    "LEFTCTRL": 29, "A": 30, "S": 31, "D": 32, "F": 33, "G": 34, "H": 35,
    "J": 36, "K": 37, "L": 38, "SEMICOLON": 39, "APOSTROPHE": 40, "GRAVE": 41,
    "LEFTSHIFT": 42, "BACKSLASH": 43, "Z": 44, "X": 45, "C": 46, "V": 47,
    "B": 48, "N": 49, "M": 50, "COMMA": 51, "DOT": 52, "SLASH": 53,
    "RIGHTSHIFT": 54, "LEFTALT": 56, "SPACE": 57, "CAPSLOCK": 58,
    "F1": 59, "F2": 60, "F3": 61, "F4": 62, "F5": 63, "F6": 64, "F7": 65,
    "F8": 66, "F9": 67, "F10": 68, "F11": 87, "F12": 88,
    "RIGHTCTRL": 97, "RIGHTALT": 100, "HOME": 102, "UP": 103, "PAGEUP": 104,
    "LEFT": 105, "RIGHT": 106, "END": 107, "DOWN": 108, "PAGEDOWN": 109,
    "INSERT": 110, "DELETE": 111, "LEFTMETA": 125, "RIGHTMETA": 126,
}


def _build_char_map():
    """ASCII character -> (key code, needs shift) for the US layout."""
    chars = {}
    for letter in "abcdefghijklmnopqrstuvwxyz":
        chars[letter] = (KEY[letter.upper()], False)
        chars[letter.upper()] = (KEY[letter.upper()], True)
    for digit in "0123456789":
        chars[digit] = (KEY[digit], False)
    for char, shifted in zip("1234567890", "!@#$%^&*()"):
        chars[shifted] = (KEY[char], True)
    pairs = [
        ("MINUS", "-", "_"), ("EQUAL", "=", "+"), ("LEFTBRACE", "[", "{"),
        ("RIGHTBRACE", "]", "}"), ("BACKSLASH", "\\", "|"),
        ("SEMICOLON", ";", ":"), ("APOSTROPHE", "'", '"'), ("GRAVE", "`", "~"),
        ("COMMA", ",", "<"), ("DOT", ".", ">"), ("SLASH", "/", "?"),
    ]
    for name, plain, shifted in pairs:
        chars[plain] = (KEY[name], False)
        chars[shifted] = (KEY[name], True)
    chars[" "] = (KEY["SPACE"], False)
    chars["\n"] = (KEY["ENTER"], False)
    chars["\t"] = (KEY["TAB"], False)
    return chars


CHARS = _build_char_map()


def _build_browser_map():
    """KeyboardEvent.code (physical key) -> key code."""
    codes = {f"Key{letter}": KEY[letter] for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"}
    for digit in "0123456789":
        codes[f"Digit{digit}"] = KEY[digit]
        codes[f"Numpad{digit}"] = KEY[digit]
    for n in range(1, 13):
        codes[f"F{n}"] = KEY[f"F{n}"]
    names = {
        "Minus": "MINUS", "Equal": "EQUAL", "BracketLeft": "LEFTBRACE",
        "BracketRight": "RIGHTBRACE", "Backslash": "BACKSLASH", "IntlBackslash": "BACKSLASH",
        "Semicolon": "SEMICOLON", "Quote": "APOSTROPHE", "Backquote": "GRAVE",
        "Comma": "COMMA", "Period": "DOT", "Slash": "SLASH", "Space": "SPACE",
        "Enter": "ENTER", "NumpadEnter": "ENTER", "Tab": "TAB", "Backspace": "BACKSPACE",
        "Escape": "ESC", "CapsLock": "CAPSLOCK", "ShiftLeft": "LEFTSHIFT",
        "ShiftRight": "RIGHTSHIFT", "ControlLeft": "LEFTCTRL", "ControlRight": "RIGHTCTRL",
        "AltLeft": "LEFTALT", "AltRight": "RIGHTALT", "MetaLeft": "LEFTMETA",
        "MetaRight": "RIGHTMETA", "ArrowUp": "UP", "ArrowDown": "DOWN", "ArrowLeft": "LEFT",
        "ArrowRight": "RIGHT", "Home": "HOME", "End": "END", "PageUp": "PAGEUP",
        "PageDown": "PAGEDOWN", "Insert": "INSERT", "Delete": "DELETE",
        "NumpadDecimal": "DOT", "NumpadDivide": "SLASH", "NumpadSubtract": "MINUS",
    }
    for code, name in names.items():
        codes[code] = KEY[name]
    return codes


BROWSER_CODES = _build_browser_map()


class VirtualKeyboard:
    # USB by default: with a virtual bus Steam keeps showing its on-screen keyboard.
    def __init__(self, name="Elemental DeckKeys", bus=BUS_USB):
        self._fd = os.open("/dev/uinput", os.O_WRONLY | os.O_NONBLOCK)
        self._pressed = set()
        try:
            fcntl.ioctl(self._fd, UI_SET_EVBIT, EV_KEY)
            for code in KEY.values():
                fcntl.ioctl(self._fd, UI_SET_KEYBIT, code)
            # struct uinput_setup: input_id (4 x u16), name[80], ff_effects_max (u32)
            setup = struct.pack("HHHH80sI", bus, 0x1209, 0xDECC, 1,
                                name.encode()[:79], 0)
            fcntl.ioctl(self._fd, UI_DEV_SETUP, setup)
            fcntl.ioctl(self._fd, UI_DEV_CREATE)
        except OSError:
            os.close(self._fd)
            raise
        # Give the system a moment to notice the new device.
        time.sleep(1.0)

    def _emit(self, ev_type, code, value):
        os.write(self._fd, _EVENT.pack(0, 0, ev_type, code, value))

    def key(self, code, down):
        self._emit(EV_KEY, code, 1 if down else 0)
        self._emit(EV_SYN, SYN_REPORT, 0)
        if down:
            self._pressed.add(code)
        else:
            self._pressed.discard(code)

    @property
    def any_pressed(self):
        return bool(self._pressed)

    def release_all(self):
        for code in list(self._pressed):
            self.key(code, False)

    def tap(self, code, shift=False, delay=0.004):
        if shift:
            self.key(KEY["LEFTSHIFT"], True)
            time.sleep(delay)
        self.key(code, True)
        time.sleep(delay)
        self.key(code, False)
        if shift:
            time.sleep(delay)
            self.key(KEY["LEFTSHIFT"], False)

    def type_text(self, text, chars_per_second=100, stop=None, progress=None):
        """Types ASCII text. Returns characters that could not be typed.

        stop: threading.Event that aborts typing; progress: callback(done, total).
        """
        skipped = []
        interval = 1.0 / chars_per_second
        total = len(text)
        for done, char in enumerate(text, 1):
            if stop is not None and stop.is_set():
                break
            mapping = CHARS.get(char)
            if mapping is None:
                skipped.append(char)
                continue
            started = time.monotonic()
            self.tap(*mapping)
            if progress is not None and (done % 20 == 0 or done == total):
                progress(done, total)
            remaining = interval - (time.monotonic() - started)
            if remaining > 0:
                time.sleep(remaining)
        return skipped

    def close(self):
        if self._fd is None:
            return
        try:
            self.release_all()
            fcntl.ioctl(self._fd, UI_DEV_DESTROY)
        finally:
            os.close(self._fd)
            self._fd = None

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()
