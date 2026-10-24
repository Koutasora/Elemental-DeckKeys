"""Elemental DeckKeys server. Run as root.

--pair opens a 2-minute pairing window and prints the code.
"""

import argparse
import asyncio
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from deckkeys.server import Server  # noqa: E402


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=443)
    parser.add_argument("--pair", action="store_true")
    parser.add_argument("--data-dir", default=os.path.join(HERE, "data"))
    args = parser.parse_args()

    if os.geteuid() != 0:
        sys.exit("Run as root (sudo).")

    server = Server(args.data_dir, os.path.join(HERE, "deckkeys", "web"), args.port)
    asyncio.run(server.run(args.pair))


if __name__ == "__main__":
    main()
