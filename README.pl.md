# Elemental DeckKeys

[English](README.md) | **Polski**

Pisanie na Steam Decku klawiaturą z PC przez sieć lokalną. Otwierasz stronę w przeglądarce
na PC i wysyłasz na Decka tekst albo klawisze na żywo – w trybie gry i w trybie pulpitu.
Bez podpinania klawiatury, bez SSH, bez instalowania czegokolwiek na PC.

## Stan

Wczesny etap. Etap 0 (wirtualna klawiatura) działa w trybie gry i pulpitu.
Etap 1 (serwer + WebUI w trybie tekstu) jest w testach. Plan w [SPEC.pl.md](SPEC.pl.md).

## Test etapu 1

Skopiuj folder `deck` na Decka jako `/home/deck/deckkeys/` i uruchamiaj pliki dwuklikiem
w Dolphinie (każdy pyta o hasło `sudo`):

- `DeckKeys pair.desktop` – uruchamia serwer w oknie Konsole i pokazuje 6-cyfrowy kod parowania
  (ważny 2 minuty) oraz adres. Otwórz adres w przeglądarce na PC, raz zaakceptuj ostrzeżenie
  o certyfikacie i wpisz kod.
- `DeckKeys start.desktop` – uruchamia serwer w tle, działa też w trybie gry.
- `DeckKeys stop.desktop` – zatrzymuje serwer w tle.

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
