# Elemental DeckKeys

**English** | [Polski](README.pl.md)

Type on your Steam Deck with your PC keyboard over the local network. Open a page in the
PC browser and send text or live keystrokes to the Deck – in Game Mode and Desktop Mode.
No keyboard to plug in, no SSH, nothing to install on the PC.

## Status

Early development. Text mode, live mode and the on/off switch work; the Decky panel
is still to come. See [SPEC.md](SPEC.md) for the plan.

## Install

1. Copy the `deck` folder anywhere on the Deck (it holds only the installer and a `files` folder).
2. In Desktop Mode double-click `Install Elemental DeckKeys.desktop` and enter the `sudo` password.
   The service starts with the Deck from now on, in Game Mode and Desktop Mode.
   If no browser is paired yet, the installer shows a pairing code right away.
   The copied folder can be deleted afterwards.

Or, in Konsole on the Deck, download and install the latest version in one go
(the same command updates an existing install, pairing is kept):

```
curl -L https://github.com/Koutasora/Elemental-DeckKeys/archive/refs/heads/main.tar.gz | tar xz -C /tmp && sudo bash /tmp/Elemental-DeckKeys-main/deck/files/install.sh
```

## Pair a browser

1. On the Deck: application menu > **Elemental DeckKeys – Pair** (no password).
   It shows the address and a 6-digit code valid for 2 minutes.
2. On the PC open `https://steamdeck.local:8443`, accept the certificate warning once
   and enter the code.

## Use

Application menu on the Deck (no password):

- **Elemental DeckKeys – Pair** – pairing code for a new browser.
- **Elemental DeckKeys – On/Off** – main switch. Off: nothing can connect from the network.

On the PC:

- **Start session**, then the **Text** tab (type or paste, Send) or the **Live** tab
  (click the box and type).
- In the Live tab Ctrl+V and Ctrl+Shift+V type the PC clipboard on the Deck. The box previews what
  you typed (not what is on the Deck). The Log lists every action; click a line to copy its text.
- The **Media** tab has media keys: previous, play/pause, next, stop, volume and mute.
- The session ends with **End session**, by closing the tab or after 10 minutes without typing
  (5–30 minutes in Settings).

## Uninstall

Application menu > **Elemental DeckKeys – Uninstall** (asks for the `sudo` password).

## License

[MIT](LICENSE)
