#!/bin/bash
# Stage 0, Game Mode: starts the keyboard test as a temporary systemd unit,
# so it keeps running after switching from Desktop Mode to Game Mode.
# Usage: sudo bash game_mode_test.sh [usb|virtual]
set -e
dir="$(cd "$(dirname "$0")" && pwd)"
systemd-run --unit=deckkeys-test --collect \
    python3 "$dir/keyboard_test.py" --delay 90 --repeat 12 --interval 10 --bus "${1:-usb}"
echo "Started. Switch to Game Mode and open a text field within 90 s."
echo "Log: journalctl -u deckkeys-test"
