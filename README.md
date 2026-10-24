# Elemental DeckKeys

**English** | [Polski](README.pl.md)

Type on your Steam Deck with your PC keyboard over the local network. Open a page in the
PC browser and send text or live keystrokes to the Deck – in Game Mode and Desktop Mode.
No keyboard to plug in, no SSH, nothing to install on the PC.

## Status

Early development. Stage 0 (virtual keyboard) works in Game Mode and Desktop Mode.
Stage 1 (server + WebUI text mode) is being tested. See [SPEC.md](SPEC.md) for the plan.

## Stage 1 test

Copy the `deck` folder to the Deck as `/home/deck/deckkeys/` and double-click the launchers
in Dolphin (each asks for the `sudo` password):

- `DeckKeys pair.desktop` – runs the server in a Konsole window and shows a 6-digit pairing code
  (valid for 2 minutes) and the address. Open the address in the PC browser, accept the
  certificate warning once and enter the code.
- `DeckKeys start.desktop` – runs the server in the background, it keeps running in Game Mode.
- `DeckKeys stop.desktop` – stops the background server.

## Stage 0 test

Copy the `deck` folder to the Deck, e.g. to `/home/deck/deckkeys/`.

Desktop Mode – click into a text field within 10 seconds:

```
sudo python3 ~/deckkeys/keyboard_test.py
```

Game Mode – then switch to Game Mode and open a text field within 90 seconds:

```
sudo bash ~/deckkeys/game_mode_test.sh
```

Log: `journalctl -u deckkeys-test`

## License

[MIT](LICENSE)
