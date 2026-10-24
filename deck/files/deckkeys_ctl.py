"""Controls the running Elemental DeckKeys service from this Deck, no sudo needed.

  pair         shows a pairing code for a new browser
  pair-if-new  same, but only when no browser is paired yet (used by the installer)
  toggle       turns DeckKeys on or off and shows a notification
"""

import json
import os
import shutil
import ssl
import subprocess
import sys
import time
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from deckkeys import qr  # noqa: E402

BASE = "https://127.0.0.1:8443"
# The service on this Deck uses its own self-signed certificate.
CONTEXT = ssl._create_unverified_context()


def call(path, method="GET"):
    request = urllib.request.Request(BASE + path, method=method,
                                     headers={"X-DeckKeys-Local": "1"})
    with urllib.request.urlopen(request, context=CONTEXT, timeout=5) as response:
        return json.load(response)


def notify(text):
    print(text)
    if shutil.which("notify-send"):
        subprocess.run(["notify-send", "-a", "Elemental DeckKeys", "-i", "input-keyboard",
                        "Elemental DeckKeys", text], check=False)


def pair():
    info = call("/api/local/pair", "POST")
    print("Open on the PC:")
    for address in info["addresses"]:
        print(f"  {address}")
    print(f"Certificate: {info['fingerprint']}")
    print()
    print("Scan with a phone to open the page:")
    print(qr.terminal(info["phone_url"]))
    print()
    print(f"Pairing code: {info['code']}")
    print()

    deadline = time.monotonic() + info["seconds"]
    while True:
        left = int(deadline - time.monotonic())
        status = call("/api/local/pairing")
        if not status["active"]:
            if status["paired"] and left > 0:
                print(f"\rPaired: {status['paired']}. You can close this window.")
            else:
                print("\rCode expired. Start pairing again.            ")
            return
        print(f"\rValid for {left // 60}:{left % 60:02d} ", end="", flush=True)
        time.sleep(1)


def main():
    command = sys.argv[1] if len(sys.argv) > 1 else "pair"
    try:
        if command == "toggle":
            on = call("/api/local/switch", "POST")["on"]
            notify("On. Browsers can connect." if on else "Off. Nothing can connect.")
        elif command == "pair-if-new":
            if call("/api/local/pairing")["devices"] == 0:
                pair()
        else:
            pair()
    except OSError:
        # The installer retries pair-if-new while the service is starting.
        if command != "pair-if-new":
            notify("Elemental DeckKeys is not running.")
        sys.exit(1)


if __name__ == "__main__":
    main()
