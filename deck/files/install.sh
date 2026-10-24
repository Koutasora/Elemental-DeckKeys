#!/bin/bash
# Installs Elemental DeckKeys as a service that starts with the Deck.
# Started by "Install Elemental DeckKeys.desktop" next to the files folder.
# Options: --decky / --no-decky install or skip the Game Mode panel without asking.
set -e
decky_choice=""
for arg in "$@"; do
  case "$arg" in
    --decky) decky_choice=yes ;;
    --no-decky) decky_choice=no ;;
  esac
done
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

# Game Mode panel: optional, only when Decky Loader is installed. Asked before the service
# stops, so the answer can still be typed with DeckKeys.
plugins="$home/homebrew/plugins"
if [ -d "$plugins" ] && [ -d "$src/decky" ] && [ -z "$decky_choice" ]; then
  if [ -d "$plugins/elemental-deckkeys" ]; then
    read -r -p "Update the Game Mode panel for Decky Loader? [Y/n] " answer || answer=""
    case "$answer" in [nN]*) decky_choice=no ;; *) decky_choice=yes ;; esac
  else
    read -r -p "Decky Loader found. Install the Game Mode panel? [y/N] " answer || answer=""
    case "$answer" in [yY]*) decky_choice=yes ;; *) decky_choice=no ;; esac
  fi
fi

systemctl stop elemental-deckkeys 2>/dev/null || true
# Background server from the stage 1 test, if still running.
systemctl stop deckkeys-server 2>/dev/null || true

# Program files belong to root: the service runs as root.
# The data folder (certificate, paired devices, on/off) is kept on reinstall.
mkdir -p "$dest"
rm -rf "$dest/deckkeys" "$dest/pair.py"
cp -r "$src/deckkeys" "$src/deckkeys_server.py" "$src/deckkeys_ctl.py" "$src/uninstall.sh" "$dest/"
find "$dest/deckkeys" -name __pycache__ -prune -exec rm -rf {} +
chown -R root:root "$dest"

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
entry() {
  cat > "$apps/elemental-deckkeys-$1.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=Elemental DeckKeys – $2
Icon=input-keyboard
Exec=$3
Terminal=false
Categories=Utility;
EOF
  chown "$user": "$apps/elemental-deckkeys-$1.desktop"
}
entry pair "Pair" "konsole --hold -e python3 $dest/deckkeys_ctl.py pair"
entry toggle "On/Off" "python3 $dest/deckkeys_ctl.py toggle"
entry uninstall "Uninstall" "konsole --hold -e sudo bash $dest/uninstall.sh"

# Game Mode panel (the answer was given at the start).
if [ "$decky_choice" = yes ] && [ -d "$plugins" ] && [ -d "$src/decky" ]; then
  rm -rf "$plugins/elemental-deckkeys"
  cp -r "$src/decky" "$plugins/elemental-deckkeys"
  chown -R --reference="$plugins" "$plugins/elemental-deckkeys"
  chmod -R a+rX "$plugins/elemental-deckkeys"
  systemctl restart plugin_loader 2>/dev/null || true
  echo "Decky panel installed."
fi

systemctl daemon-reload
systemctl enable elemental-deckkeys >/dev/null 2>&1
systemctl restart elemental-deckkeys

# Wait for the service, then pair right away if no browser is paired yet.
for _ in $(seq 20); do
  sleep 0.5
  if sudo -u "$user" python3 "$dest/deckkeys_ctl.py" pair-if-new 2>/dev/null; then
    break
  fi
done

echo
echo "Installed. Elemental DeckKeys starts with the Deck, in Game Mode and Desktop Mode."
echo "Application menu: Elemental DeckKeys – Pair, On/Off, Uninstall."
if [ -d "$plugins/elemental-deckkeys" ]; then
  echo "Game Mode: Decky menu > Elemental DeckKeys."
fi
echo "The installer folder is no longer needed and can be deleted."
