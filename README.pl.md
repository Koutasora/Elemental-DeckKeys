# Elemental DeckKeys

[English](README.md) | **Polski**

Pisanie na Steam Decku klawiaturą z PC przez sieć lokalną. Otwierasz stronę w przeglądarce
na PC i wysyłasz na Decka tekst albo klawisze na żywo – w trybie gry i w trybie pulpitu.
Bez podpinania klawiatury, bez SSH, bez instalowania czegokolwiek na PC.

## Stan

Wczesny etap. Gotowy etap 0 (test wirtualnej klawiatury). Plan w [SPEC.pl.md](SPEC.pl.md).

## Test etapu 0

Skopiuj folder `deck` na Decka, np. do `/home/deck/deckkeys/`.

Tryb pulpitu – w ciągu 10 sekund kliknij w pole tekstowe:

```
sudo python3 ~/deckkeys/keyboard_test.py
```

Tryb gry – potem w ciągu 90 sekund przełącz na tryb gry i otwórz pole tekstowe:

```
sudo bash ~/deckkeys/game_mode_test.sh
```

Log: `journalctl -u deckkeys-test`

## Licencja

[MIT](LICENSE)
