# Elemental DeckKeys

[English](README.md) | **Polski**

Pisanie na Steam Decku klawiaturą z PC przez sieć lokalną. Otwierasz stronę w przeglądarce
na PC i wysyłasz na Decka tekst albo klawisze na żywo – w trybie gry i w trybie pulpitu.
Bez podpinania klawiatury, bez SSH, bez instalowania czegokolwiek na PC.

## Stan

Wczesny etap. Tryb tekstu, tryb na żywo i wyłącznik działają; panel Decky jest
jeszcze do zrobienia. Plan w [SPEC.pl.md](SPEC.pl.md).

## Instalacja

1. Skopiuj folder `deck` w dowolne miejsce na Decku (jest w nim tylko instalator i folder `files`).
2. W trybie pulpitu kliknij dwa razy `Install Elemental DeckKeys.desktop` i podaj hasło `sudo`.
   Od teraz usługa startuje razem z Deckiem, w trybie gry i pulpitu.
   Jeśli żadna przeglądarka nie jest sparowana, instalator od razu pokaże kod parowania.
   Skopiowany folder można potem usunąć.

## Parowanie przeglądarki

1. Na Decku: menu aplikacji > **Elemental DeckKeys – Pair** (bez hasła).
   Pokaże adres i 6-cyfrowy kod ważny 2 minuty.
2. Na PC otwórz `https://steamdeck.local:8443`, raz zaakceptuj ostrzeżenie o certyfikacie
   i wpisz kod.

## Używanie

Menu aplikacji na Decku (bez hasła):

- **Elemental DeckKeys – Pair** – kod parowania dla nowej przeglądarki.
- **Elemental DeckKeys – On/Off** – wyłącznik główny. Wyłączony: nic nie połączy się z sieci.

Na PC:

- **Rozpocznij sesję**, potem zakładka **Tekst** (wpisz lub wklej, Wyślij) albo **Na żywo**
  (kliknij w pole i pisz).
- W zakładce Na żywo Ctrl+V i Ctrl+Shift+V wpisują na Decku schowek z PC.
- Sesja kończy się przyciskiem **Zakończ sesję**, zamknięciem karty albo po 10 minutach bez pisania.

## Odinstalowanie

Menu aplikacji > **Elemental DeckKeys – Uninstall** (pyta o hasło `sudo`).

## Licencja

[MIT](LICENSE)
