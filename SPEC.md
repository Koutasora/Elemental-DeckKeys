# Elemental DeckKeys – specification

**English** | [Polski](SPEC.pl.md)

Type on a Steam Deck with your PC keyboard over the local network. No keyboard to plug in,
no SSH, nothing to install on the PC.

## Goal and scope

- Configuring the console: terminal (Konsole), Steam launch options, the browser,
  text fields in launchers. Gaming is not the goal.
- Works in Game Mode and Desktop Mode.
- ASCII characters only (US layout).
- Local network only. No access from the internet.

Out of scope: mouse, screen streaming, running commands on the Deck through the server,
a Stream Deck plugin (maybe later, using the same API as the WebUI).

## Architecture

| Part | Where | Role |
|---|---|---|
| `elemental-deckkeys.service` | Deck, systemd, root | virtual keyboard (`/dev/uinput`), HTTPS + WebSocket server, pairing |
| Decky panel | Deck, Game Mode | remote control: main switch, "Pair", device list |
| Local panel | Deck, Desktop Mode | same as the Decky panel; a page reachable only from `127.0.0.1` |
| Pairing window | Deck, application menu | shows a pairing code, runs without `sudo` |
| WebUI | browser on the PC | text mode, live mode, "End session" |

The service does not depend on Decky. If Decky breaks after a Steam update, the keyboard
keeps working; only the panel in the `...` menu disappears.

## States

- **Main switch off**: the server does not listen on the network (the local panel still works).
- **Main switch on, no session**: the server listens, keys are ignored.
- **Session active**: keys from a paired device reach the Deck.

A session ends on "End session", closing the tab, a dropped connection (no heartbeat for 3 s)
or 10 minutes without typing. When a session ends, the page loses focus or the tab is hidden,
the Deck releases all held keys.

## Security

- HTTPS with a certificate issued by the Deck itself (`openssl` during install). No domain needed.
  The browser shows a warning once.
- The local panel and the Decky panel are reachable only from `127.0.0.1`.
- Pairing is possible only after pressing "Pair" on the Deck.
- No endpoint for running commands. The service can only press keys.

### Pairing

1. On the Deck, "Pair new device" (for now: application menu > Elemental DeckKeys – Pair,
   which asks the service over `127.0.0.1` with an `X-DeckKeys-Local` header): a 6-digit code, valid for 2 minutes, single use,
   invalidated after 5 wrong attempts.
2. On the PC the page asks for the code and a device name.
3. The Deck creates a random key (256 bits) and sets it as a `HttpOnly; Secure; SameSite=Strict` cookie.
   The Deck stores only the SHA-256 hash of the key.
4. Both panels list paired devices with a "Remove" button (takes effect immediately).

Default address: `https://steamdeck.local:8443` (the IP is shown too). The key is bound to the
address, so when the page is opened by IP and the IP changes, the device has to pair again.

## WebUI

- **Text**: multi-line field, "Enter at the end", "Clear after sending" (on by default, only
  when the whole text was typed), "Send" (Ctrl+Enter), progress and "Stop"
  for long text. "Saved" snippets are added manually only (stored in the PC browser).
- **Live**: a "Click here to type on the Deck" area with an accent-colored border while it
  captures. Sends physical keys (`KeyboardEvent.code`). Ctrl+X and Ctrl+C go to the Deck as
  shortcuts. Ctrl+V and Ctrl+Shift+V type the PC clipboard on the Deck.
- **Settings**: theme (light / dark / system), language (automatic by default: Polish for a Polish browser, otherwise English), typing speed, "Forget this device".
- Status bar: connection, session, time until automatic switch-off.
- Plain HTML/CSS/JS, no frameworks, no CDN.
- Look: readable, high contrast, one accent color, no decoration.

On the PC it is opened from a bookmark or a `msedge --app=https://steamdeck.local:8443` shortcut.

## Typing

- Text mode: character → key (+ Shift) in the US layout.
- About 100 characters per second by default, adjustable in settings.

## Installation on the Deck

- Program in `~/.local/share/elemental-deckkeys/`, service file in `/etc/systemd/system/`.
  Both survive SteamOS updates.
- No `steamos-readonly disable`, no `pacman`.
- SteamOS Python, standard library only (a small library bundled with the project if needed).
- Install and uninstall scripts, started by double-clicking `Install Elemental DeckKeys.desktop`
  / `Uninstall Elemental DeckKeys.desktop` in Dolphin. A Konsole window asks only for the `sudo` password.

## Stages

0. Virtual keyboard test in Game Mode and Desktop Mode – done.
1. Service + WebUI text mode (HTTPS, pairing, session) – done.
2. Live mode – done, testing on the Deck.
3. Installer and main switch in the application menu – done. Local panel page – later, if needed.
4. Decky panel.

## Verified (stage 0, 2026-10-24)

- The virtual keyboard types in Desktop Mode and Game Mode, all test characters arrive.
- The keyboard must report itself as USB. With a virtual bus Steam shows its on-screen
  keyboard on every text field.
- Double-clicking a `.desktop` file opens Konsole and asks only for the password.

## To verify in practice

- At what speed Steam text fields start dropping characters.
- Whether `steamdeck.local` resolves from Windows on a home network.
