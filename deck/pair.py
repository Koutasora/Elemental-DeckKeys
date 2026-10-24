"""Opens a 2-minute pairing window on the running service and shows the code.

Runs as the normal user, no sudo needed.
"""

import json
import ssl
import sys
import time
import urllib.request

BASE = "https://127.0.0.1"
# The service on this Deck uses its own self-signed certificate.
CONTEXT = ssl._create_unverified_context()


def call(path, method="GET"):
    request = urllib.request.Request(BASE + path, method=method,
                                     headers={"X-DeckKeys-Local": "1"})
    with urllib.request.urlopen(request, context=CONTEXT, timeout=5) as response:
        return json.load(response)


def main():
    try:
        info = call("/api/local/pair", "POST")
    except OSError:
        sys.exit("Elemental DeckKeys is not running. Install it first.")

    print("Open on the PC:")
    for address in info["addresses"]:
        print(f"  {address}")
    print(f"Certificate: {info['fingerprint']}")
    print()
    print(f"Pairing code: {info['code']}")
    print()

    deadline = time.monotonic() + info["seconds"]
    while True:
        left = int(deadline - time.monotonic())
        try:
            status = call("/api/local/pairing")
        except OSError:
            print("\nLost connection to the service.")
            return
        if not status["active"]:
            if status["paired"] and left > 0:
                print(f"\rPaired: {status['paired']}            ")
            else:
                print("\rCode expired. Start pairing again.            ")
            return
        print(f"\rValid for {left // 60}:{left % 60:02d} ", end="", flush=True)
        time.sleep(1)


if __name__ == "__main__":
    main()
