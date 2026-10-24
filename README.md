# Elemental DeckKeys

**English** | [Polski](README.pl.md)

Type on your Steam Deck with your PC keyboard over the local network. Open a page in the
PC browser and send text or live keystrokes to the Deck – in Game Mode and Desktop Mode.
No keyboard to plug in, no SSH, nothing to install on the PC.

## Status

Early development. Text mode and live mode work; the main on/off switch and the Decky panel
are still to come. See [SPEC.md](SPEC.md) for the plan.

## Install

1. Copy the `deck` folder to the Deck as `/home/deck/deckkeys/`.
2. In Desktop Mode double-click `Install Elemental DeckKeys.desktop` and enter the `sudo` password.
   The service starts with the Deck from now on, in Game Mode and Desktop Mode.
   The copied folder can be deleted afterwards.

## Pair a browser

1. On the Deck: application menu > **Elemental DeckKeys – Pair** (no password).
   It shows the address and a 6-digit code valid for 2 minutes.
2. On the PC open `https://steamdeck.local:8443`, accept the certificate warning once
   and enter the code.

## Use

- **Start session**, then the **Text** tab (type or paste, Send) or the **Live** tab
  (click the box and type).
- In the Live tab Ctrl+V and Ctrl+Shift+V type the PC clipboard on the Deck.
- The session ends with **End session**, by closing the tab or after 10 minutes without typing.

## Uninstall

Application menu > **Elemental DeckKeys – Uninstall** (asks for the `sudo` password).

## License

[MIT](LICENSE)
