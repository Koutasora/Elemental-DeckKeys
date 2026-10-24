# Elemental DeckKeys – specyfikacja

[English](SPEC.md) | **Polski**

Pisanie na Steam Decku klawiaturą z PC przez sieć lokalną. Bez podpinania klawiatury,
bez SSH, bez instalowania czegokolwiek na PC.

## Cel i zakres

- Konfiguracja konsoli: terminal (Konsole), opcje uruchamiania w Steamie, przeglądarka,
  pola w launcherach. Granie nie jest celem.
- Działa w trybie gry i w trybie pulpitu.
- Tylko znaki ASCII (układ US). Bez polskich znaków.
- Tylko sieć lokalna. Żadnego dostępu z internetu.

Poza zakresem: mysz, przesyłanie obrazu, wykonywanie poleceń na Decku przez serwer,
wtyczka Stream Deck (może kiedyś, korzystając z tego samego API co WebUI).

## Architektura

| Część | Gdzie | Rola |
|---|---|---|
| Usługa `elemental-deckkeys.service` | Deck, systemd, root | wirtualna klawiatura (`/dev/uinput`), serwer HTTPS + WebSocket, parowanie |
| Panel Decky | Deck, tryb gry | pilot: wyłącznik główny, „Paruj”, lista urządzeń |
| Panel lokalny | Deck, tryb pulpitu | to samo co panel Decky; strona dostępna tylko z `127.0.0.1` |
| WebUI | przeglądarka na PC | tryb tekstu, tryb na żywo, „Zakończ sesję” |

Usługa nie zależy od Decky. Gdy Decky przestanie działać po aktualizacji Steama, klawiatura
działa dalej, znika tylko panel w menu `...`.

## Stany

- **Wyłącznik główny wyłączony**: serwer nie nasłuchuje w sieci (panel lokalny działa).
- **Wyłącznik włączony, brak sesji**: serwer nasłuchuje, klawisze są ignorowane.
- **Sesja aktywna**: klawisze od sparowanego urządzenia trafiają na Decka.

Sesja kończy się po: „Zakończ sesję”, zamknięciu karty, zerwaniu połączenia (brak sygnału
przez 3 s) albo 10 minutach bez pisania. Przy końcu sesji, utracie fokusu lub ukryciu karty
Deck puszcza wszystkie wciśnięte klawisze.

## Bezpieczeństwo

- HTTPS z certyfikatem wystawionym przez Decka (`openssl` przy instalacji). Bez domeny.
  Przeglądarka raz pokazuje ostrzeżenie.
- Panel lokalny i panel Decky dostępne tylko z `127.0.0.1`.
- Parowanie możliwe tylko po kliknięciu „Paruj” na Decku.
- Brak endpointu do wykonywania poleceń. Usługa umie tylko naciskać klawisze.

### Parowanie

1. Na Decku „Paruj nowe urządzenie”: 6-cyfrowy kod, ważny 2 min, jednorazowy,
   unieważniany po 5 błędnych próbach.
2. Na PC strona prosi o kod i nazwę urządzenia.
3. Deck tworzy losowy klucz (256 bitów) i ustawia go w ciasteczku `HttpOnly; Secure; SameSite=Strict`.
   U siebie trzyma tylko skrót SHA-256 klucza.
4. Lista sparowanych urządzeń w panelach z opcją „Usuń” (działa od razu).

Adres domyślny: `https://steamdeck.local:8443` (pokazywany także IP). Klucz jest przypisany
do adresu, więc zmiana IP przy wejściu przez IP wymaga ponownego parowania.

## WebUI

- **Tekst**: pole wielowierszowe, „Enter na końcu”, „Wyślij” (Ctrl+Enter), postęp
  i „Przerwij” przy długim tekście. „Zapisane” fragmenty dodawane tylko ręcznie
  (przechowywane w przeglądarce na PC).
- **Na żywo**: pole „Kliknij tutaj, aby pisać na Decku”, ramka w kolorze akcentu, gdy
  przechwytuje. Przesyła fizyczne klawisze (`KeyboardEvent.code`). Ctrl+X i Ctrl+C idą
  na Decka jako skróty. Ctrl+V i Ctrl+Shift+V wpisują na Decku tekst ze schowka PC.
- **Ustawienia**: motyw (jasny / ciemny / systemowy), szybkość wpisywania,
  „Zapomnij to urządzenie”.
- Pasek stanu: połączenie, sesja, czas do automatycznego wyłączenia.
- Zwykły HTML/CSS/JS, bez frameworków i bez CDN.
- Wygląd: czytelny, kontrastowy, jeden kolor akcentu, bez ozdobników.

Na PC uruchamiane z zakładki albo skrótu `msedge --app=https://steamdeck.local:8443`.

## Wpisywanie

- Tryb tekstu: znak → klawisz (+ Shift) w układzie US.
- Domyślnie ok. 100 znaków/s, regulowane w ustawieniach.

## Instalacja na Decku

- Program w `~/.local/share/elemental-deckkeys/`, plik usługi w `/etc/systemd/system/`.
  Oba miejsca przetrwają aktualizacje SteamOS.
- Bez `steamos-readonly disable` i bez `pacman`.
- Python ze SteamOS, tylko biblioteka standardowa (ewentualna mała biblioteka dołączona
  do projektu).
- Skrypt instalacyjny i odinstalowujący, uruchamiane dwuklikiem w `Install Elemental DeckKeys.desktop`
  / `Uninstall Elemental DeckKeys.desktop` w Dolphinie. Okno Konsole pyta tylko o hasło `sudo`.

## Etapy

0. Test wirtualnej klawiatury (`deck/keyboard_test.py`, `deck/game_mode_test.sh`) w trybie gry i pulpitu.
1. Usługa + WebUI w trybie tekstu (HTTPS, parowanie, sesja).
2. Tryb na żywo.
3. Panel lokalny + skrypt instalacyjny.
4. Panel Decky.

## Do sprawdzenia w praktyce

- Czy tryb gry (gamescope / Steam) od razu widzi nową wirtualną klawiaturę.
- Przy jakim tempie pola w Steamie zaczynają gubić znaki.
- Czy `steamdeck.local` działa w sieci domowej z Windows.
