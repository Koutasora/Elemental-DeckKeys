#!/bin/bash
# Installs Elemental DeckKeys as a service that starts with the Deck.
# Usage: sudo bash install.sh
set -e
if [ "$(id -u)" != 0 ]; then
  echo "Run with sudo."
  exit 1
fi

src="$(cd "$(dirname "$0")" && pwd)"
user="${SUDO_USER:-deck}"
home="$(getent passwd "$user" | cut -d: -f6)"
dest="$home/.local/share/elemental-deckkeys"
apps="$home/.local/share/applications"
unit=/etc/systemd/system/elemental-deckkeys.service

systemctl stop elemental-deckkeys 2>/dev/null || true
# Background server from the stage 1 test, if still running.
systemctl stop deckkeys-server 2>/dev/null || true

# Program files belong to root: the service runs as root.
mkdir -p "$dest"
rm -rf "$dest/deckkeys"
cp -r "$src/deckkeys" "$src/deckkeys_server.py" "$src/pair.py" "$src/uninstall.sh" "$dest/"
# Keep the certificate and paired devices from an earlier test run.
if [ -d "$src/data" ] && [ ! -d "$dest/data" ]; then
  cp -r "$src/data" "$dest/data"
fi
chown -R root:root "$dest"
find "$dest/deckkeys" -name __pycache__ -prune -exec rm -rf {} +

cat > "$unit" <<EOF
[Unit]
Description=Elemental DeckKeys
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=/usr/bin/python3 $dest/deckkeys_server.py
Restart=on-failure
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

mkdir -p "$apps"
cat > "$apps/elemental-deckkeys-pair.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=Elemental DeckKeys – Pair
Comment=Shows a pairing code for a new browser
Icon=input-keyboard
Exec=konsole --hold -e python3 $dest/pair.py
Terminal=false
Categories=Utility;
EOF
cat > "$apps/elemental-deckkeys-uninstall.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=Elemental DeckKeys – Uninstall
Icon=input-keyboard
Exec=konsole --hold -e sudo bash $dest/uninstall.sh
Terminal=false
Categories=Utility;
EOF
chown "$user": "$apps/elemental-deckkeys-pair.desktop" "$apps/elemental-deckkeys-uninstall.desktop"

systemctl daemon-reload
systemctl enable --now elemental-deckkeys
sleep 2
journalctl -u elemental-deckkeys --since "-10s" --no-pager -o cat
echo
echo "Installed. It starts with the Deck, in Game Mode and Desktop Mode."
echo "To pair a browser: application menu > Elemental DeckKeys – Pair."
echo "This folder is no longer needed and can be deleted."
