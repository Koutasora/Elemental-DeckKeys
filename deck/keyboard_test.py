"""Stage 0: checks that the virtual keyboard types in Game Mode and Desktop Mode.

Waits --delay seconds, then types the test text --repeat times, every --interval seconds.
Run as root.
"""

import argparse
import os
import signal
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from deckkeys.keyboard import BUS_USB, BUS_VIRTUAL, VirtualKeyboard  # noqa: E402

TEST_TEXT = "hello deck 123 !@#$%^&*()_+-=[]{};:'\",.<>/?\\|`~ PROTON_LOG=1 %command% "


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--delay", type=float, default=10)
    parser.add_argument("--repeat", type=int, default=1)
    parser.add_argument("--interval", type=float, default=10)
    parser.add_argument("--speed", type=int, default=100, help="characters per second")
    parser.add_argument("--text", default=TEST_TEXT)
    parser.add_argument("--bus", choices=["virtual", "usb"], default="virtual")
    args = parser.parse_args()

    if os.geteuid() != 0:
        sys.exit("Run as root (sudo).")

    # systemd stops the unit with SIGTERM; turn it into a clean exit.
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(0))

    bus = BUS_USB if args.bus == "usb" else BUS_VIRTUAL
    with VirtualKeyboard(bus=bus) as keyboard:
        print(f"Keyboard created ({args.bus}). Typing in {args.delay:.0f} s.", flush=True)
        time.sleep(args.delay)
        for round_no in range(1, args.repeat + 1):
            started = time.monotonic()
            skipped = keyboard.type_text(args.text, args.speed)
            took = time.monotonic() - started
            print(f"Round {round_no}/{args.repeat}: {len(args.text)} chars in {took:.2f} s",
                  flush=True)
            if skipped:
                print(f"  skipped: {''.join(sorted(set(skipped)))!r}", flush=True)
            if round_no < args.repeat:
                time.sleep(args.interval)
    print("Done, keyboard removed.", flush=True)


if __name__ == "__main__":
    main()
