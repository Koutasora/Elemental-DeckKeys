# Elemental DeckKeys

**English** | [Polski](README.pl.md)

Type on your Steam Deck with your PC keyboard over the local network. Open a page in the
PC browser and send text or live keystrokes to the Deck – in Game Mode and Desktop Mode.
No keyboard to plug in, no SSH, nothing to install on the PC.

## Status

Early development. Stage 0 (virtual keyboard test) is ready. See [SPEC.md](SPEC.md) for the plan.

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
