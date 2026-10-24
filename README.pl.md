# Elemental DeckKeys

[English](README.md) | **Polski**

Sterowanie Steam Deckiem z przeglądarki na PC albo telefonie, przez sieć lokalną:
wysyłanie tekstu, klawiatura na żywo, kursor myszy, klawisze multimedialne i przesyłanie plików.
Działa w trybie gry i w trybie pulpitu. Bez podpinania czegokolwiek, bez SSH, bez instalowania
czegokolwiek na PC.

## Co potrafi

| Zakładka | Do czego |
|---|---|
| **Tekst** | Wpisz albo wklej tekst i wyślij go na Decka za jednym razem, opcjonalnie z Enterem. Zapisuj często używane fragmenty, np. opcje uruchamiania. |
| **Na żywo** | Klawiatura pisze na Decku w trakcie naciskania klawiszy. Ctrl+V wpisuje schowek z PC. Makra na skróty, które przeglądarka zatrzymuje dla siebie (Alt+F4, Alt+Tab, Ctrl+W, Ctrl+T, Ctrl+A, F11, Super). |
| **Multimedia** | Odtwórz/pauza, poprzedni, następny, stop, głośność i wyciszenie. |
| **Touchpad** | Na PC strona przejmuje mysz (i, jeśli chcesz, klawiaturę) do wciśnięcia Esc. Na telefonie pole działa jak touchpad w laptopie. |
| **Pliki** | Wysyłanie plików do `Downloads/DeckKeysTransfers/Received` na Decku. Pobieranie tego, co wrzucisz do `Downloads/DeckKeysTransfers/Send to PC` (z „Zapisz jako…” w Chrome i Edge). |

Do tego: log wysłanych rzeczy (kliknięcie linii ją kopiuje), „Ukryj wpisywany tekst” dla haseł,
jasny i ciemny motyw, angielski i polski oraz układ na telefon w pionie i w poziomie.

## Instalacja

W Konsole na Decku (albo wyślij tę linię z innego urządzenia, gdy DeckKeys już działa):

```
curl -L https://github.com/Koutasora/Elemental-DeckKeys/releases/latest/download/Elemental-DeckKeys.tar.gz | tar xz -C /tmp && sudo bash /tmp/Elemental-DeckKeys/files/install.sh
```

Albo pobierz `Elemental-DeckKeys.zip` z [najnowszego wydania](https://github.com/Koutasora/Elemental-DeckKeys/releases/latest), rozpakuj go na Decku i kliknij dwa razy `Install Elemental DeckKeys.desktop`
w Dolphinie. W obu przypadkach raz podajesz hasło `sudo`.

- Od tej chwili usługa startuje razem z Deckiem, w trybie gry i pulpitu.
- Jeśli żadna przeglądarka nie jest sparowana, instalator od razu pokaże kod parowania.
- Gdy jest Decky Loader, instalator zapyta, czy dodać panel do trybu gry (domyślnie nie).
- To samo polecenie uruchomione ponownie aktualizuje DeckKeys. Sparowanie zostaje, a otwarte
  strony same się przeładowują.

## Parowanie przeglądarki albo telefonu

1. Na Decku: panel Decky > **Sparuj nową przeglądarkę** albo menu aplikacji >
   **Elemental DeckKeys – Pair** (bez hasła). Pokaże adres, 6-cyfrowy kod ważny 2 minuty
   i kod QR z adresem dla telefonów.
2. Otwórz `https://steamdeck.local:8443` (na telefonie użyj pokazanego adresu IP albo zeskanuj QR).
   Raz zaakceptuj ostrzeżenie o certyfikacie: Deck wystawia go sam.
3. Wpisz kod i wybierz urządzenie: PC, Mac, Telefon albo Inne.

## Używanie

1. **Rozpocznij sesję.** Przycisk jest zielony, gdy można zacząć, niebieski w trakcie sesji
   i czerwony przy braku połączenia. Wirtualna klawiatura i mysz istnieją tylko w trakcie sesji.
2. Wybierz zakładkę i działaj. W trybie gry wybieraj pola tekstowe strzałkami i Enterem:
   dotknięcie pola otwiera klawiaturę ekranową Steama.
3. Sesja kończy się przyciskiem **Zakończ sesję**, zamknięciem strony albo po 10 minutach
   bez pisania (od 5 do 30 minut w Ustawieniach).

Na Decku, bez hasła:

- **Panel Decky** (tryb gry): włącznik, kto jest połączony, parowanie z kodem QR,
  sparowane przeglądarki, odebrane pliki.
- **Menu aplikacji** (tryb pulpitu): Elemental DeckKeys – Pair, On/Off, Uninstall.

## Bezpieczeństwo

- Tylko sieć lokalna. Połączenie szyfrowane (HTTPS z własnym certyfikatem Decka).
- Przeglądarka połączy się dopiero po sparowaniu kodem z Decka. Deck przechowuje tylko skrót
  klucza każdej przeglądarki; sparowane przeglądarki można usunąć w panelu Decky.
- Klawisze, mysz i pliki działają tylko w trakcie sesji rozpoczętej z tej przeglądarki.
- Usługa potrafi naciskać klawisze, ruszać myszą oraz czytać i zapisywać pliki wyłącznie
  w `Downloads/DeckKeysTransfers`. Nigdy nie uruchamia poleceń.
- Wyłączona (panel Decky albo menu aplikacji): nic z sieci nie może się połączyć.

## Odinstalowanie

Menu aplikacji > **Elemental DeckKeys – Uninstall** (pyta o hasło `sudo`).
Usuwa usługę, panel, certyfikat i sparowane przeglądarki. Pliki w
`Downloads/DeckKeysTransfers` zostają.

## Dla programistów

- `deck/` – to, co trafia na Decka: instalator i `files/` (Python, tylko biblioteka standardowa).
- `decky-plugin/` – źródła panelu Decky. `npm install` i `npm run build` w tym folderze budują go
  do `deck/files/decky/`.
- Najnowszy kod z `main` (nie wydanie), do testów:

  ```
  curl -L https://github.com/Koutasora/Elemental-DeckKeys/archive/refs/heads/main.tar.gz | tar xz -C /tmp && sudo bash /tmp/Elemental-DeckKeys-main/deck/files/install.sh
  ```
- [SPEC.pl.md](SPEC.pl.md) – jak to działa i dlaczego.

## Licencja

[MIT](LICENSE)
