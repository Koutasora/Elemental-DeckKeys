#!/bin/bash
# Stage 1 launcher until the installer exists.
# Usage: sudo bash server.sh pair|start|stop
#   pair  - runs the server in this window with a 2-minute pairing code
#   start - runs the server in the background (keeps running in Game Mode)
#   stop  - stops the background server
dir="$(cd "$(dirname "$0")" && pwd)"
unit=deckkeys-server

case "$1" in
  pair)
    systemctl stop "$unit" 2>/dev/null
    echo "Close this window when pairing is done, then use Start."
    exec python3 "$dir/deckkeys_server.py" --pair
    ;;
  start)
    systemctl stop "$unit" 2>/dev/null
    systemd-run --unit="$unit" --collect python3 "$dir/deckkeys_server.py" || exit 1
    sleep 2
    journalctl -u "$unit" --since "-10s" --no-pager -o cat
    ;;
  stop)
    systemctl stop "$unit" 2>/dev/null
    echo "Stopped."
    ;;
  *)
    echo "Usage: sudo bash server.sh pair|start|stop"
    exit 1
    ;;
esac
