#!/bin/bash
# Removes Elemental DeckKeys: service, program, certificate, paired devices and menu entries.
if [ "$(id -u)" != 0 ]; then
  echo "Run with sudo."
  exit 1
fi

user="${SUDO_USER:-deck}"
home="$(getent passwd "$user" | cut -d: -f6)"

systemctl disable --now elemental-deckkeys 2>/dev/null
rm -f /etc/systemd/system/elemental-deckkeys.service
systemctl daemon-reload
rm -f "$home"/.local/share/applications/elemental-deckkeys-*.desktop
rm -rf "$home/.local/share/elemental-deckkeys"
if [ -d "$home/homebrew/plugins/elemental-deckkeys" ]; then
  rm -rf "$home/homebrew/plugins/elemental-deckkeys"
  systemctl restart plugin_loader 2>/dev/null || true
fi
echo "Elemental DeckKeys removed."
