"use strict";

const I18N = {
  en: {
    settings: "Settings",
    connecting: "Connecting to the Deck…",
    connected: "Connected",
    connectedAs: "Connected as",
    disconnected: "Not connected, retrying…",
    replaced: "Taken over by another window",
    sessionOn: "Session active",
    sessionOff: "Session off",
    pairTitle: "Pair this browser",
    pairHint: "Start pairing on the Deck and enter the 6-digit code shown there.",
    pairCode: "Code from the Deck",
    deviceName: "Device name",
    deviceKind: "Device",
    kindPc: "PC",
    kindMac: "Mac",
    kindPhone: "Phone",
    kindOther: "Other (type a name)",
    pairedDevices: "Paired devices",
    thisDevice: "this device",
    connectedNow: "connected",
    openOnPhone: "Open on a phone",
    openOnPhoneHint: "Scan to open this page. The pairing code is shown on the Deck.",
    pairButton: "Pair",
    wrong_code: "Wrong code.",
    pairing_closed: "Pairing is not open or the code expired. Start pairing on the Deck again.",
    pairFailed: "Pairing failed. Check the connection to the Deck.",
    startSession: "Start session",
    continueSession: "Continue session",
    notConnected: "Not connected",
    sessionLength: "Session ends after this many minutes without typing",
    endSession: "End session",
    reconnect: "Reconnect",
    endsIn: "Ends in {time}",
    textLabel: "Text to type on the Deck",
    textPlaceholder: "Type or paste text to send to the Deck",
    tabText: "Text",
    tabLive: "Live",
    tabMedia: "Media",
    tabPad: "Touchpad",
    mouseLeft: "Left",
    mouseMiddle: "Middle",
    mouseRight: "Right",
    padHintPc: "Click here to move the Deck cursor with your mouse. Esc gives the cursor back.",
    padHintLocked: "Your mouse and keyboard control the Deck. Esc gives them back.",
    padHintPhone: "Move a finger to move the cursor. Tap to click, tap with two fingers for a right click, drag two fingers to scroll.",
    sensitivity: "Touchpad sensitivity",
    mediaPrevious: "Previous",
    mediaPlayPause: "Play/Pause",
    mediaNext: "Next",
    mediaStop: "Stop",
    mediaVolumeDown: "Volume −",
    mediaMute: "Mute",
    mediaVolumeUp: "Volume +",
    livePlaceholder: "Click here to type on the Deck",
    liveCapturing: "Keys go to the Deck. Click outside the box to stop.",
    macros: "Macros",
    logMacro: "Macro: {name}",
    legend: "Legend",
    legendPaste: "type the PC clipboard",
    legendBrowser: "stay in the browser",
    legendBoxTerm: "Box",
    legendBox: "shows what you typed; check it on the Deck",
    legendPadClickTerm: "Click the box",
    legendPadClick: "takes the mouse and the keyboard, only during a session",
    legendPadEsc: "gives them back to the PC (Esc itself does not reach the Deck)",
    legendPadAwayTerm: "Other tab, window or browser tab",
    legendPadAway: "also give the mouse back",
    legendPadPhoneTerm: "Phone",
    legendPadPhone: "tap = click, two fingers = right click or scroll",
    legendGameModeTerm: "Game Mode",
    legendGameMode: "pick text fields with the arrows and Enter; touching them opens the on-screen keyboard",
    clearPreview: "Clear preview",
    hideTyped: "Hide typed text",
    actTyping: "Typing",
    actDeleting: "Deleting",
    actMoving: "Moving cursor",
    actSelectAll: "Selected all",
    actCopied: "Copied",
    actCut: "Cut",
    actUndo: "Undo",
    actPasted: "Pasted from PC",
    log: "Log",
    logHint: "Click a line to copy its text.",
    logKeys: "Show keys",
    clear: "Clear",
    logTyped: "Typed: {text}",
    logTypedHidden: "Typed ({n} chars)",
    logSent: "Sent: {text}",
    logSentHidden: "Sent ({n} chars)",
    logPasted: "Pasted from PC: {text}",
    logPastedHidden: "Pasted from PC ({n} chars)",
    logDeleted: "Deleted ×{n}",
    logMoved: "Moved cursor ×{n}",
    logEnter: "Enter",
    logTab: "Tab",
    logEscape: "Escape",
    logSelectAll: "Selected all",
    logCopied: "Copied (on the Deck)",
    logCut: "Cut (on the Deck)",
    logUndo: "Undo",
    copiedToPc: "Copied",
    enterAtEnd: "Enter at the end",
    clearAfter: "Clear after sending",
    save: "Save",
    send: "Send",
    sendHint: "Ctrl+Enter sends. ASCII characters only.",
    stop: "Stop",
    typing: "{done} / {total}",
    saved: "Saved",
    savedEmpty: "Nothing saved yet.",
    delete: "Delete",
    skipped: "Not typed (not ASCII): {chars}",
    stopped: "Typing stopped.",
    endedIdle: "Session ended after {n} minutes without typing.",
    no_session: "Start a session first.",
    busy: "Still typing the previous text.",
    theme: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    language: "Language",
    languageAuto: "Automatic",
    speed: "Typing speed (characters per second)",
    forget: "Forget this device",
    forgetConfirm: "Forget this device? You will have to pair it again.",
    close: "Close",
    version: "Version {v}",
  },
  pl: {
    settings: "Ustawienia",
    connecting: "Łączenie z Deckiem…",
    connected: "Połączono",
    connectedAs: "Połączono jako",
    disconnected: "Brak połączenia, ponawiam…",
    replaced: "Przejęte przez inne okno",
    sessionOn: "Sesja aktywna",
    sessionOff: "Sesja wyłączona",
    pairTitle: "Sparuj tę przeglądarkę",
    pairHint: "Włącz parowanie na Decku i wpisz 6-cyfrowy kod, który się tam pokaże.",
    pairCode: "Kod z Decka",
    deviceName: "Nazwa urządzenia",
    deviceKind: "Urządzenie",
    kindPc: "PC",
    kindMac: "Mac",
    kindPhone: "Telefon",
    kindOther: "Inne (wpisz nazwę)",
    pairedDevices: "Sparowane urządzenia",
    thisDevice: "to urządzenie",
    connectedNow: "połączone",
    openOnPhone: "Otwórz na telefonie",
    openOnPhoneHint: "Zeskanuj, aby otworzyć tę stronę. Kod parowania pokazuje Deck.",
    pairButton: "Paruj",
    wrong_code: "Zły kod.",
    pairing_closed: "Parowanie nie jest włączone albo kod wygasł. Włącz parowanie na Decku jeszcze raz.",
    pairFailed: "Parowanie nie powiodło się. Sprawdź połączenie z Deckiem.",
    startSession: "Rozpocznij sesję",
    continueSession: "Kontynuuj sesję",
    notConnected: "Brak połączenia",
    sessionLength: "Sesja kończy się po tylu minutach bez pisania",
    endSession: "Zakończ sesję",
    reconnect: "Połącz ponownie",
    endsIn: "Wyłączy się za {time}",
    textLabel: "Tekst do wpisania na Decku",
    textPlaceholder: "Wpisz lub wklej tekst do wysłania na Decka",
    tabText: "Tekst",
    tabLive: "Na żywo",
    tabMedia: "Multimedia",
    tabPad: "Touchpad",
    mouseLeft: "Lewy",
    mouseMiddle: "Środkowy",
    mouseRight: "Prawy",
    padHintPc: "Kliknij tutaj, aby ruszać kursorem Decka swoją myszą. Esc oddaje kursor.",
    padHintLocked: "Twoja mysz i klawiatura sterują Deckiem. Esc je oddaje.",
    padHintPhone: "Przesuwaj palcem, aby ruszać kursorem. Stuknij, aby kliknąć, stuknij dwoma palcami dla prawego kliknięcia, przesuwaj dwoma palcami, aby przewijać.",
    sensitivity: "Czułość touchpada",
    mediaPrevious: "Poprzedni",
    mediaPlayPause: "Odtwórz/Pauza",
    mediaNext: "Następny",
    mediaStop: "Stop",
    mediaVolumeDown: "Ciszej",
    mediaMute: "Wycisz",
    mediaVolumeUp: "Głośniej",
    livePlaceholder: "Kliknij tutaj, aby pisać na Decku",
    liveCapturing: "Klawisze trafiają na Decka. Kliknij poza polem, aby przestać.",
    macros: "Makra",
    logMacro: "Makro: {name}",
    legend: "Legenda",
    legendPaste: "wpisuje schowek z PC",
    legendBrowser: "zostają w przeglądarce",
    legendBoxTerm: "Pole",
    legendBox: "pokazuje, co wpisałeś; sprawdzaj na Decku",
    legendPadClickTerm: "Kliknięcie w pole",
    legendPadClick: "przejmuje mysz i klawiaturę, tylko w trakcie sesji",
    legendPadEsc: "oddaje je do PC (samo Esc nie trafia na Decka)",
    legendPadAwayTerm: "Inna zakładka, okno, karta",
    legendPadAway: "też oddają mysz",
    legendPadPhoneTerm: "Telefon",
    legendPadPhone: "stuknięcie = klik, dwa palce = prawy klik albo przewijanie",
    legendGameModeTerm: "Tryb gry",
    legendGameMode: "wybieraj pola strzałkami i Enterem; dotyk otwiera klawiaturę ekranową",
    clearPreview: "Wyczyść podgląd",
    hideTyped: "Ukryj wpisywany tekst",
    actTyping: "Pisanie",
    actDeleting: "Kasowanie",
    actMoving: "Przesuwanie kursora",
    actSelectAll: "Zaznaczono wszystko",
    actCopied: "Skopiowano",
    actCut: "Wycięto",
    actUndo: "Cofnij",
    actPasted: "Wklejono z PC",
    log: "Log",
    logHint: "Kliknij linię, aby skopiować tekst.",
    logKeys: "Pokaż klawisze",
    clear: "Wyczyść",
    logTyped: "Wpisano: {text}",
    logTypedHidden: "Wpisano ({n} znaków)",
    logSent: "Wysłano: {text}",
    logSentHidden: "Wysłano ({n} znaków)",
    logPasted: "Wklejono z PC: {text}",
    logPastedHidden: "Wklejono z PC ({n} znaków)",
    logDeleted: "Skasowano ×{n}",
    logMoved: "Przesunięto kursor ×{n}",
    logEnter: "Enter",
    logTab: "Tab",
    logEscape: "Escape",
    logSelectAll: "Zaznaczono wszystko",
    logCopied: "Skopiowano (na Decku)",
    logCut: "Wycięto (na Decku)",
    logUndo: "Cofnij",
    copiedToPc: "Skopiowano",
    enterAtEnd: "Enter na końcu",
    clearAfter: "Wyczyść po wysłaniu",
    save: "Zapisz",
    send: "Wyślij",
    sendHint: "Ctrl+Enter wysyła. Tylko znaki ASCII.",
    stop: "Przerwij",
    typing: "{done} / {total}",
    saved: "Zapisane",
    savedEmpty: "Nic jeszcze nie zapisano.",
    delete: "Usuń",
    skipped: "Pominięte (spoza ASCII): {chars}",
    stopped: "Wpisywanie przerwane.",
    endedIdle: "Sesja zakończona po {n} min bez pisania.",
    no_session: "Najpierw rozpocznij sesję.",
    busy: "Trwa wpisywanie poprzedniego tekstu.",
    theme: "Motyw",
    themeSystem: "Systemowy",
    themeLight: "Jasny",
    themeDark: "Ciemny",
    language: "Język",
    languageAuto: "Automatyczny",
    speed: "Szybkość wpisywania (znaki na sekundę)",
    forget: "Zapomnij to urządzenie",
    forgetConfirm: "Zapomnieć to urządzenie? Trzeba będzie sparować je ponownie.",
    close: "Zamknij",
    version: "Wersja {v}",
  },
};

const store = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem("deckkeys." + key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem("deckkeys." + key, JSON.stringify(value));
    } catch {
      // Settings simply are not remembered.
    }
  },
};

const $ = (id) => document.getElementById(id);

let lang = "en";
let view = "loading";
let previousView = "loading";
let ws = null;
let pingTimer = null;
let reconnectTimer = null;
let replaced = false;
let nextId = 1;
let currentId = null;
let currentFromField = false;
let tab = "text";
const held = new Set();
// flags: one "1"/"0" per character of text, "1" when typed while "Hide typed text" was on.
const preview = { text: "", flags: "", cursor: 0, all: false };
let textMasked = false;
const logEntries = [];
let lastAction = "";
let sessionEnded = false;
let actionTimer = null;
const state = { connected: false, session: false, remaining: 0, typing: false };
const me = { name: "", kind: "other" };

function t(key, vars = {}) {
  const text = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
}

function applyLanguage() {
  const setting = store.get("language", "auto");
  lang = setting === "auto" ? (navigator.language.toLowerCase().startsWith("pl") ? "pl" : "en") : setting;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  render();
  renderSaved();
  renderLog();
}

function applyTheme() {
  const theme = store.get("theme", "system");
  if (theme === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
}

function show(name) {
  if (name === "settings" && view !== "settings") previousView = view;
  view = name;
  $("forget-btn").hidden = previousView !== "main";
  for (const v of ["loading", "pair", "main", "settings"]) $("view-" + v).hidden = v !== name;
}

function showMessage(text, isError = false) {
  const el = $("message");
  el.textContent = text;
  el.className = isError ? "error" : "message";
  el.hidden = !text;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function render() {
  const statusEl = $("status");
  statusEl.replaceChildren();
  if (view !== "pair") {
    if (state.connected && !replaced && me.name) {
      statusEl.append(`${t("connectedAs")} `);
      const who = document.createElement("span");
      who.className = "who";
      who.innerHTML = icon(me.kind);
      who.append(me.name);
      statusEl.append(who, ` · ${state.session ? t("sessionOn") : t("sessionOff")}`);
    } else {
      let status = t("connecting");
      if (replaced) status = t("replaced");
      else if (state.connected) status = `${t("connected")} · ${state.session ? t("sessionOn") : t("sessionOff")}`;
      else if (view === "main") status = t("disconnected");
      statusEl.textContent = status;
    }
  }

  const sessionBtn = $("session-btn");
  sessionBtn.classList.toggle("ready", state.connected && !state.session && !replaced);
  sessionBtn.classList.toggle("problem", replaced || (!state.connected && view === "main"));
  if (replaced) {
    sessionBtn.textContent = t("reconnect");
    sessionBtn.disabled = false;
  } else {
    sessionBtn.textContent = !state.connected ? t("notConnected")
      : state.session ? t("endSession")
        : t(sessionEnded ? "continueSession" : "startSession");
    sessionBtn.disabled = !state.connected;
  }
  $("session-info").textContent = state.session ? t("endsIn", { time: formatTime(state.remaining) }) : "";

  const canSend = state.connected && state.session && !state.typing;
  $("send-btn").disabled = !canSend;
  document.querySelectorAll("#saved .send").forEach((b) => { b.disabled = !canSend; });
  document.querySelectorAll("[data-media], [data-macro], [data-mouse]").forEach((b) => {
    b.disabled = !canSend;
  });
  renderPad();
  $("progress").hidden = !state.typing;

  const capturing = liveActive();
  $("live").classList.toggle("capturing", capturing);
  let liveStatus = "";
  if (tab !== "text" && state.connected && !state.session) liveStatus = t("no_session");
  else if (capturing) liveStatus = lastAction || t("liveCapturing");
  $("live-status").textContent = liveStatus;
  if (tab === "media" && state.connected && !state.session) $("media-status").textContent = t("no_session");
  else if ($("media-status").textContent === t("no_session")) $("media-status").textContent = "";
}

// --- Live preview, action and log ----------------------------------------

function hidden() {
  return $("hide-typed").checked;
}

function updateTextMask() {
  const field = $("text");
  if (field.value === "") textMasked = false;
  else if (hidden()) textMasked = true;
  field.classList.toggle("masked", hidden() || textMasked);
}

function showAction(key) {
  lastAction = t(key);
  clearTimeout(actionTimer);
  actionTimer = setTimeout(() => {
    lastAction = "";
    render();
  }, 1500);
  render();
}

// Phones: on-screen keyboards edit whole words (autocorrect, re-selecting a word on
// Backspace), so there the box holds the real text and each change is sent as a diff.
const phoneTyping = window.matchMedia("(pointer: coarse)").matches;
const phone = { value: "", caret: 0, masked: false };

function renderPreview() {
  const live = $("live");
  if (phoneTyping) {
    if (live.value === "") phone.masked = false;
    else if (hidden()) phone.masked = true;
    live.classList.toggle("masked", hidden() || phone.masked);
    return;
  }
  live.value = [...preview.text]
    .map((ch, i) => (ch !== "\n" && (hidden() || preview.flags[i] === "1") ? "•" : ch))
    .join("");
  if (preview.all) live.setSelectionRange(0, live.value.length);
  else live.setSelectionRange(preview.cursor, preview.cursor);
}

function clearPreview() {
  Object.assign(preview, { text: "", flags: "", cursor: 0, all: false });
  if (phoneTyping) {
    $("live").value = "";
    Object.assign(phone, { value: "", caret: 0, masked: false });
  }
}

function tapRaw(code) {
  send({ t: "key", code, down: true });
  send({ t: "key", code, down: false });
}

function moveDeckCaret(from, to) {
  const key = to > from ? "ArrowRight" : "ArrowLeft";
  for (let i = 0; i < Math.abs(to - from); i += 1) tapRaw(key);
}

function phoneInput() {
  const live = $("live");
  const before = phone.value;
  const after = live.value;
  if (!liveActive() || state.typing) {
    live.value = before;
    return;
  }
  let start = 0;
  while (start < before.length && start < after.length && before[start] === after[start]) start += 1;
  let end = 0;
  while (end < before.length - start && end < after.length - start
         && before[before.length - 1 - end] === after[after.length - 1 - end]) end += 1;
  const deleted = before.length - start - end;
  const inserted = after.slice(start, after.length - end);
  // The Deck cursor is where the box cursor was; move it to the end of the changed part.
  moveDeckCaret(phone.caret, before.length - end);
  for (let i = 0; i < deleted; i += 1) {
    tapRaw("Backspace");
    addLog("deleted");
  }
  if (inserted) {
    send({ t: "chars", text: inserted });
    addLog("typed", inserted);
  }
  showAction(inserted ? "actTyping" : "actDeleting");
  // The Deck cursor now sits after the inserted text; follow the box cursor from there.
  moveDeckCaret(start + inserted.length, live.selectionStart);
  phone.value = after;
  phone.caret = live.selectionStart;
  renderPreview();
}

function previewInsert(text) {
  if (preview.all) clearPreview();
  const c = preview.cursor;
  const flags = (hidden() ? "1" : "0").repeat(text.length);
  preview.text = preview.text.slice(0, c) + text + preview.text.slice(c);
  preview.flags = preview.flags.slice(0, c) + flags + preview.flags.slice(c);
  preview.cursor += text.length;
}

function cut(value, from, to) {
  return value.slice(0, from) + value.slice(to);
}

function previewDelete(forward) {
  const c = preview.cursor;
  if (preview.all) {
    clearPreview();
  } else if (forward) {
    preview.text = cut(preview.text, c, c + 1);
    preview.flags = cut(preview.flags, c, c + 1);
  } else if (c > 0) {
    preview.text = cut(preview.text, c - 1, c);
    preview.flags = cut(preview.flags, c - 1, c);
    preview.cursor -= 1;
  }
}

function previewMove(key) {
  const { text } = preview;
  let c = preview.cursor;
  if (preview.all) c = key === "ArrowLeft" || key === "Home" ? 0 : text.length;
  else if (key === "ArrowLeft") c = Math.max(0, c - 1);
  else if (key === "ArrowRight") c = Math.min(text.length, c + 1);
  else if (key === "Home") c = text.lastIndexOf("\n", c - 1) + 1;
  else if (key === "End") c = text.indexOf("\n", c) === -1 ? text.length : text.indexOf("\n", c);
  preview.cursor = c;
  preview.all = false;
}

// A new session starts with an empty preview; the log stays until reload or Clear.
function endedSession() {
  sessionEnded = true;
  releaseMouse();
  clearPreview();
  renderPreview();
}

function sessionMinutes() {
  const minutes = Number(store.get("sessionMinutes", 10));
  return [5, 10, 15, 20, 30].includes(minutes) ? minutes : 10;
}

function twoDigits(n) {
  return String(n).padStart(2, "0");
}

function addLog(kind, payload = null) {
  const last = logEntries[logEntries.length - 1];
  const grouped = ["typed", "deleted", "moved", "enter", "tab", "escape"];
  // Text typed while "Hide typed text" is on is never stored: only its length is kept.
  const secret = hidden() && payload !== null;
  const length = payload === null ? 0 : payload.length;
  if (last && last.kind === kind && grouped.includes(kind) && last.hidden === secret) {
    if (kind === "typed" && !secret) last.payload += payload;
    last.length += length;
    last.count += 1;
  } else {
    const now = new Date();
    logEntries.push({
      kind, payload: secret ? null : payload, length, count: 1, hidden: secret,
      time: `${twoDigits(now.getHours())}:${twoDigits(now.getMinutes())}:${twoDigits(now.getSeconds())}`,
    });
    if (logEntries.length > 100) logEntries.shift();
  }
  renderLog();
}

function logLabel(entry) {
  const withText = { typed: "logTyped", sent: "logSent", pasted: "logPasted" }[entry.kind];
  if (withText) {
    return entry.hidden || hidden()
      ? t(withText + "Hidden", { n: entry.length })
      : t(withText, { text: entry.payload });
  }
  const simple = {
    deleted: "logDeleted", moved: "logMoved", enter: "logEnter", tab: "logTab",
    escape: "logEscape", selectAll: "logSelectAll", copied: "logCopied", cut: "logCut",
    undo: "logUndo", macro: "logMacro",
  }[entry.kind];
  if (entry.kind === "macro") return t(simple, { name: entry.name });
  const label = t(simple, { n: entry.count });
  // Tab, Escape, Enter: "Tab ×3" when repeated.
  return entry.count > 1 && !label.includes("×") ? `${label} ×${entry.count}` : label;
}

async function copyToPc(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

function renderLog() {
  const list = $("log-list");
  list.replaceChildren();
  const showKeys = $("log-keys").checked;
  for (const entry of logEntries) {
    const isText = ["typed", "sent", "pasted"].includes(entry.kind);
    if (!isText && !showKeys) continue;
    const li = document.createElement("li");
    const time = document.createElement("time");
    time.textContent = entry.time;
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = logLabel(entry);
    li.append(time, label);
    if (entry.payload) {
      li.className = "copyable";
      li.addEventListener("click", async () => {
        if (!(await copyToPc(entry.payload))) return;
        const done = document.createElement("span");
        done.className = "copied";
        done.textContent = t("copiedToPc");
        li.append(done);
        setTimeout(() => done.remove(), 1500);
      });
    }
    list.append(li);
  }
  list.scrollTop = list.scrollHeight;
}

function trackKey(event) {
  const { key, code } = event;
  if (event.ctrlKey || event.metaKey) {
    const shortcut = {
      KeyA: ["selectAll", "actSelectAll"], KeyC: ["copied", "actCopied"],
      KeyX: ["cut", "actCut"], KeyZ: ["undo", "actUndo"],
    }[code];
    if (!shortcut) return;
    if (code === "KeyA") preview.all = true;
    if (code === "KeyX" && preview.all) clearPreview();
    addLog(shortcut[0]);
    showAction(shortcut[1]);
  } else if (key.length === 1) {
    previewInsert(key);
    addLog("typed", key);
    showAction("actTyping");
  } else if (key === "Backspace" || key === "Delete") {
    previewDelete(key === "Delete");
    addLog("deleted");
    showAction("actDeleting");
  } else if (key === "Enter") {
    previewInsert("\n");
    addLog("enter");
  } else if (key === "Tab" || key === "Escape") {
    addLog(key.toLowerCase());
  } else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(key)) {
    previewMove(key);
    addLog("moved");
    showAction("actMoving");
  }
  renderPreview();
}

// --- Tabs and live mode ---------------------------------------------------

function selectTab(name) {
  tab = name;
  store.set("tab", name);
  $("tab-text").setAttribute("aria-selected", String(name === "text"));
  $("tab-live").setAttribute("aria-selected", String(name === "live"));
  $("tab-media").setAttribute("aria-selected", String(name === "media"));
  $("tab-pad").setAttribute("aria-selected", String(name === "pad"));
  $("panel-pad").hidden = name !== "pad";
  if (name !== "pad") releaseMouse();
  $("panel-media").hidden = name !== "media";
  $("panel-text").hidden = name !== "text";
  $("saved-section").hidden = name !== "text";
  $("panel-live").hidden = name !== "live";
  $("legend").hidden = name !== "live" && name !== "pad";
  $("legend-live").hidden = name !== "live";
  $("legend-pad").hidden = name !== "pad";
  $("macros").hidden = name !== "live";
  if (name !== "live") releaseHeld();
  render();
}

function liveActive() {
  return tab === "live" && state.session && document.activeElement === $("live");
}

function releaseHeld() {
  for (const code of held) send({ t: "key", code, down: false });
  held.clear();
  send({ t: "release" });
}

function bindLive() {
  const live = $("live");
  live.addEventListener("keydown", (event) => {
    if (!liveActive()) return;
    if (phoneTyping) {
      // Everything but Enter arrives as a change of the box (see phoneInput).
      if (event.key !== "Enter") return;
      event.preventDefault();
      tapRaw("Enter");
      addLog("enter");
      return;
    }
    if (event.key === "Unidentified" || event.keyCode === 229) return;
    // Ctrl+V / Ctrl+Shift+V: let the browser fire "paste" with the PC clipboard.
    if (event.ctrlKey && event.code === "KeyV") return;
    event.preventDefault();
    if (event.repeat || state.typing) return;
    held.add(event.code);
    send({ t: "key", code: event.code, down: true });
    trackKey(event);
  });
  live.addEventListener("keyup", (event) => {
    if (!held.has(event.code)) return;
    event.preventDefault();
    held.delete(event.code);
    send({ t: "key", code: event.code, down: false });
  });
  live.addEventListener("paste", (event) => {
    if (phoneTyping) return;  // the pasted text arrives as a change of the box
    event.preventDefault();
    if (!liveActive()) return;
    const text = event.clipboardData.getData("text/plain");
    held.clear();
    if (!text) return;
    sendText(text, false, false, false);
    previewInsert(text);
    renderPreview();
    addLog("pasted", text);
    showAction("actPasted");
  });
  // PC: the box only mirrors what was sent; undo anything the browser changed itself.
  live.addEventListener("input", () => (phoneTyping ? phoneInput() : renderPreview()));
  // Phone: moving the cursor by touch moves it on the Deck too.
  document.addEventListener("selectionchange", () => {
    if (!phoneTyping || document.activeElement !== live || !liveActive()) return;
    if (live.value !== phone.value || live.selectionStart !== live.selectionEnd) return;
    moveDeckCaret(phone.caret, live.selectionStart);
    phone.caret = live.selectionStart;
  });
  live.addEventListener("mouseup", renderPreview);
  live.addEventListener("focus", render);
  live.addEventListener("blur", () => {
    releaseHeld();
    render();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) live.blur();
  });
}

// --- Touchpad --------------------------------------------------------------

const BUTTON_NAMES = ["left", "middle", "right"];
const pad = { dx: 0, dy: 0, wheel: 0, timer: null, locked: false, held: new Set(), touch: null };

function padActive() {
  return tab === "pad" && state.session;
}

function renderPad() {
  const el = $("pad");
  el.classList.toggle("capturing", pad.locked);
  let hint = phoneTyping ? t("padHintPhone") : t("padHintPc");
  if (state.connected && !state.session) hint = t("no_session");
  else if (pad.locked) hint = t("padHintLocked");
  $("pad-hint").textContent = hint;
}

// Movement is collected and sent at most every 16 ms, whole pixels only.
function flushPad() {
  pad.timer = null;
  const dx = Math.trunc(pad.dx);
  const dy = Math.trunc(pad.dy);
  pad.dx -= dx;
  pad.dy -= dy;
  if (dx || dy) send({ t: "move", dx, dy });
  const wheel = Math.trunc(pad.wheel);
  pad.wheel -= wheel;
  if (wheel) send({ t: "wheel", v: wheel });
}

function queuePad(dx, dy, wheel = 0) {
  const factor = Number(store.get("sensitivity", 1)) * (phoneTyping ? 1.5 : 1);
  pad.dx += dx * factor;
  pad.dy += dy * factor;
  pad.wheel += wheel;
  if (!pad.timer) pad.timer = setTimeout(flushPad, 16);
}

function mouseButton(name, down) {
  if (down) pad.held.add(name);
  else if (!pad.held.delete(name)) return;
  send({ t: "button", b: name, down });
}

function clickButton(name) {
  mouseButton(name, true);
  mouseButton(name, false);
}

function releaseMouse() {
  for (const name of [...pad.held]) mouseButton(name, false);
  if (document.pointerLockElement === $("pad")) document.exitPointerLock();
}

function touchCenter(touches) {
  let x = 0;
  let y = 0;
  for (const touch of touches) {
    x += touch.clientX;
    y += touch.clientY;
  }
  return { x: x / touches.length, y: y / touches.length };
}

function bindPad() {
  const el = $("pad");

  // PC: the browser hands the mouse to the page until Esc.
  el.addEventListener("click", () => {
    if (padActive() && !phoneTyping && !pad.locked) el.requestPointerLock();
  });
  document.addEventListener("pointerlockchange", () => {
    pad.locked = document.pointerLockElement === el;
    if (!pad.locked) {
      releaseMouse();
      releaseHeld();
    }
    renderPad();
  });

  // While the mouse is captured the keyboard goes to the Deck too (Esc stays with the browser).
  document.addEventListener("keydown", (event) => {
    if (!pad.locked || !padActive()) return;
    if (event.ctrlKey && event.code === "KeyV") return;  // "paste" below sends the PC clipboard
    event.preventDefault();
    if (event.repeat || state.typing) return;
    held.add(event.code);
    send({ t: "key", code: event.code, down: true });
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) addLog("typed", event.key);
  });
  document.addEventListener("keyup", (event) => {
    if (!pad.locked || !held.has(event.code)) return;
    event.preventDefault();
    held.delete(event.code);
    send({ t: "key", code: event.code, down: false });
  });
  document.addEventListener("paste", (event) => {
    if (!pad.locked || !padActive()) return;
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    held.clear();
    if (!text) return;
    sendText(text, false, false, false);
    addLog("pasted", text);
  });
  document.addEventListener("mousemove", (event) => {
    if (pad.locked && padActive()) queuePad(event.movementX, event.movementY);
  });
  document.addEventListener("mousedown", (event) => {
    if (!pad.locked || !padActive() || !BUTTON_NAMES[event.button]) return;
    event.preventDefault();
    mouseButton(BUTTON_NAMES[event.button], true);
  });
  document.addEventListener("mouseup", (event) => {
    if (pad.locked && BUTTON_NAMES[event.button]) mouseButton(BUTTON_NAMES[event.button], false);
  });
  document.addEventListener("wheel", (event) => {
    if (!pad.locked || !padActive()) return;
    event.preventDefault();
    // One notch is about 100 px (or 3 lines); wheel up scrolls up.
    queuePad(0, 0, -event.deltaY / (event.deltaMode === 1 ? 3 : 100));
  }, { passive: false });
  document.addEventListener("contextmenu", (event) => {
    if (pad.locked) event.preventDefault();
  });

  // Phone: one finger moves, a tap clicks, two fingers scroll or right-click.
  el.addEventListener("touchstart", (event) => {
    if (!padActive()) return;
    event.preventDefault();
    const center = touchCenter(event.touches);
    if (!pad.touch) pad.touch = { start: performance.now(), moved: 0, fingers: 0 };
    Object.assign(pad.touch, center, {
      fingers: Math.max(pad.touch.fingers, event.touches.length),
    });
  }, { passive: false });
  el.addEventListener("touchmove", (event) => {
    if (!padActive() || !pad.touch) return;
    event.preventDefault();
    const center = touchCenter(event.touches);
    const dx = center.x - pad.touch.x;
    const dy = center.y - pad.touch.y;
    Object.assign(pad.touch, center);
    pad.touch.moved += Math.abs(dx) + Math.abs(dy);
    if (event.touches.length >= 2) queuePad(0, 0, dy / 25);
    else queuePad(dx, dy);
  }, { passive: false });
  el.addEventListener("touchend", (event) => {
    if (!pad.touch) return;
    event.preventDefault();
    if (event.touches.length > 0) {
      Object.assign(pad.touch, touchCenter(event.touches));
      return;
    }
    const tap = performance.now() - pad.touch.start < 250 && pad.touch.moved < 10;
    if (tap && padActive()) clickButton(pad.touch.fingers >= 2 ? "right" : "left");
    pad.touch = null;
  }, { passive: false });
  el.addEventListener("touchcancel", () => { pad.touch = null; });

  // Never keep the mouse when the page is not in front.
  window.addEventListener("blur", releaseMouse);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) releaseMouse();
  });

  // Buttons under the pad: held down for as long as they are pressed.
  document.querySelectorAll("[data-mouse]").forEach((button) => {
    const name = button.dataset.mouse;
    button.addEventListener("pointerdown", (event) => {
      if (!padActive()) return;
      event.preventDefault();
      mouseButton(name, true);
    });
    for (const type of ["pointerup", "pointercancel", "pointerleave"]) {
      button.addEventListener(type, () => mouseButton(name, false));
    }
    button.addEventListener("contextmenu", (event) => event.preventDefault());
  });
}

// --- Saved snippets -------------------------------------------------------

function renderSaved() {
  const items = store.get("saved", []);
  const list = $("saved");
  list.replaceChildren();
  $("saved-empty").hidden = items.length > 0;
  items.forEach((text, index) => {
    const li = document.createElement("li");
    const code = document.createElement("code");
    code.textContent = text;
    code.title = text;
    const send = document.createElement("button");
    send.type = "button";
    send.className = "send";
    send.textContent = t("send");
    send.addEventListener("click", () => sendText(text));
    const del = document.createElement("button");
    del.type = "button";
    del.textContent = t("delete");
    del.addEventListener("click", () => {
      const current = store.get("saved", []);
      current.splice(index, 1);
      store.set("saved", current);
      renderSaved();
    });
    li.append(code, send, del);
    list.append(li);
  });
  render();
}

function saveCurrent() {
  const text = $("text").value;
  if (!text) return;
  const items = store.get("saved", []).filter((item) => item !== text);
  items.unshift(text);
  store.set("saved", items);
  renderSaved();
}

// --- Connection -----------------------------------------------------------

function send(message) {
  if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(message));
}

async function fetchStatus() {
  const response = await fetch("/api/status", { cache: "no-store" });
  const status = await response.json();
  Object.assign(me, { name: status.name || "", kind: status.kind || "other" });
  if (status.version) $("version").textContent = t("version", { v: status.version });
  return status;
}

function connect() {
  clearTimeout(reconnectTimer);
  replaced = false;
  ws = new WebSocket(`wss://${location.host}/ws`);
  ws.onopen = () => {
    state.connected = true;
    pingTimer = setInterval(() => send({ t: "ping" }), 1000);
    render();
  };
  ws.onmessage = (event) => handleMessage(JSON.parse(event.data));
  ws.onclose = (event) => {
    clearInterval(pingTimer);
    ws = null;
    if (state.session) endedSession();
    Object.assign(state, { connected: false, session: false, typing: false });
    currentId = null;
    if (event.code === 4000 && (event.reason === "replaced" || event.reason === "forgotten")) {
      replaced = event.reason === "replaced";
      if (event.reason === "forgotten") show("pair");
      render();
      return;
    }
    render();
    reconnectTimer = setTimeout(async () => {
      try {
        const status = await fetchStatus();
        if (!status.paired) {
          show("pair");
          render();
          return;
        }
      } catch {
        // The Deck is unreachable; try again below.
      }
      connect();
    }, 2000);
  };
}

function handleMessage(msg) {
  if (msg.t === "state") {
    if (state.session && !msg.session) endedSession();
    Object.assign(state, { session: msg.session, remaining: msg.remaining, typing: msg.typing });
    if (msg.reason === "idle") showMessage(t("endedIdle", { n: sessionMinutes() }));
    render();
  } else if (msg.t === "progress" && msg.id === currentId) {
    $("progress-bar").max = msg.total;
    $("progress-bar").value = msg.done;
    $("progress-text").textContent = t("typing", { done: msg.done, total: msg.total });
  } else if (msg.t === "typed" && msg.id === currentId) {
    currentId = null;
    if (currentFromField && !msg.stopped && $("clear").checked) {
      $("text").value = "";
      updateTextMask();
    }
    if (msg.skipped) showMessage(t("skipped", { chars: msg.skipped }), true);
    else if (msg.stopped) showMessage(t("stopped"));
  } else if (msg.t === "error") {
    showMessage(t(msg.code), true);
  }
}

function sendText(text, fromField = false, withEnter = $("enter").checked, log = true) {
  if (!text || !state.session || state.typing) return;
  showMessage("");
  currentId = nextId++;
  currentFromField = fromField;
  const total = text.length + (withEnter ? 1 : 0);
  $("progress-bar").max = total;
  $("progress-bar").value = 0;
  $("progress-text").textContent = t("typing", { done: 0, total });
  state.typing = true;
  render();
  if (log) addLog("sent", text);
  send({ t: "text", id: currentId, text, enter: withEnter, speed: Number(store.get("speed", 100)) });
}

// --- Pairing and settings -------------------------------------------------

const KIND_NAMES = { pc: "PC", mac: "Mac", phone: "Phone" };

// Simple outline icons, drawn with the text color.
const ICONS = {
  pc: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>',
  mac: '<rect x="5" y="5" width="14" height="10" rx="1"/><path d="M2 19h20l-2-4H4z"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  other: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
};

function icon(kind) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" '
    + `stroke-linejoin="round" stroke-linecap="round">${ICONS[kind] || ICONS.other}</svg>`;
}

function guessKind() {
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|Mobile/i.test(ua)) return "phone";
  if (/Macintosh|Mac OS X/i.test(ua)) return "mac";
  return "pc";
}

function updatePairName() {
  $("pair-name-row").hidden = $("pair-kind").value !== "other";
  $("pair-name").required = $("pair-kind").value === "other";
}

async function loadDevices() {
  const list = $("devices");
  try {
    const [devices, code] = await Promise.all([
      fetch("/api/devices", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/qr", { cache: "no-store" }).then((r) => r.json()),
    ]);
    list.replaceChildren();
    for (const device of devices.devices) {
      const li = document.createElement("li");
      li.innerHTML = icon(device.kind);
      const name = document.createElement("span");
      name.textContent = device.name;
      li.append(name);
      const notes = [device.this && t("thisDevice"), device.connected && t("connectedNow")].filter(Boolean);
      if (notes.length) {
        const note = document.createElement("span");
        note.className = "note";
        note.textContent = `· ${notes.join(", ")}`;
        li.append(note);
      }
      list.append(li);
    }
    $("qr").src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(code.svg)}`;
    $("qr-url").textContent = code.url;
  } catch {
    // Not paired or not reachable: the lists stay empty.
  }
}

async function pair(event) {
  event.preventDefault();
  const error = $("pair-error");
  error.hidden = true;
  const kind = $("pair-kind").value;
  const name = kind === "other" ? $("pair-name").value.trim() : KIND_NAMES[kind];
  store.set("deviceKind", kind);
  if (kind === "other") store.set("deviceName", name);
  try {
    const response = await fetch("/api/pair", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: $("pair-code").value.trim(), name, kind }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "pairFailed");
    $("pair-code").value = "";
    Object.assign(me, { name, kind });
    show("main");
    connect();
  } catch (e) {
    error.textContent = t(I18N.en[e.message] ? e.message : "pairFailed");
    error.hidden = false;
  }
}

async function forget() {
  if (!confirm(t("forgetConfirm"))) return;
  clearTimeout(reconnectTimer);
  try {
    await fetch("/api/forget", { method: "POST" });
  } catch {
    // Show the pairing screen anyway.
  }
  if (ws) {
    ws.onclose = null;
    ws.close();
    ws = null;
  }
  clearInterval(pingTimer);
  Object.assign(state, { connected: false, session: false, typing: false });
  show("pair");
  render();
}

function bind() {
  $("pair-form").addEventListener("submit", pair);
  $("pair-kind").value = store.get("deviceKind", guessKind());
  $("pair-name").value = store.get("deviceName", "");
  $("pair-kind").addEventListener("change", updatePairName);
  updatePairName();

  $("session-btn").addEventListener("click", () => {
    if (replaced) connect();
    else if (state.session) send({ t: "end" });
    else send({ t: "start", minutes: sessionMinutes() });
  });
  $("send-btn").addEventListener("click", () => sendText($("text").value, true));
  $("save-btn").addEventListener("click", saveCurrent);
  $("stop-btn").addEventListener("click", () => send({ t: "stop" }));
  $("text").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      sendText($("text").value, true);
    }
  });
  $("enter").checked = store.get("enter", false);
  $("enter").addEventListener("change", () => store.set("enter", $("enter").checked));
  $("clear").checked = store.get("clear", true);
  $("clear").addEventListener("change", () => store.set("clear", $("clear").checked));

  $("settings-btn").addEventListener("click", () => {
    if (view !== "settings") loadDevices();
    show(view === "settings" ? previousView : "settings");
  });
  $("settings-close").addEventListener("click", () => show(previousView));
  $("theme").value = store.get("theme", "system");
  $("theme").addEventListener("change", () => { store.set("theme", $("theme").value); applyTheme(); });
  $("language").value = store.get("language", "auto");
  $("language").addEventListener("change", () => { store.set("language", $("language").value); applyLanguage(); });
  $("session-minutes").value = String(sessionMinutes());
  $("session-minutes").addEventListener("change", () => {
    store.set("sessionMinutes", Number($("session-minutes").value));
  });
  $("speed").value = String(store.get("speed", 100));
  $("speed").addEventListener("change", () => store.set("speed", Number($("speed").value)));
  $("forget-btn").addEventListener("click", forget);

  $("hide-typed").checked = store.get("hideTyped", false);
  $("hide-typed").addEventListener("change", () => {
    store.set("hideTyped", $("hide-typed").checked);
    updateTextMask();
    renderPreview();
    renderLog();
  });
  $("preview-clear").addEventListener("click", () => {
    clearPreview();
    renderPreview();
  });
  // Text field: a field cannot hide only some characters, so anything typed while hidden
  // keeps the whole field hidden until it is emptied.
  $("text").addEventListener("input", updateTextMask);
  $("log-keys").checked = store.get("logKeys", false);
  $("log-keys").addEventListener("change", () => {
    store.set("logKeys", $("log-keys").checked);
    renderLog();
  });
  $("log-clear").addEventListener("click", () => {
    logEntries.length = 0;
    renderLog();
  });
  $("macros").open = store.get("macrosExpanded", true);
  $("macros").addEventListener("toggle", () => store.set("macrosExpanded", $("macros").open));
  document.querySelectorAll("[data-macro]").forEach((button) => {
    button.addEventListener("click", () => {
      send({ t: "macro", key: button.dataset.macro });
      addLog("macro");
      logEntries[logEntries.length - 1].name = button.textContent;
      renderLog();
    });
  });
  $("legend").open = store.get("legendExpanded", false);
  $("legend").addEventListener("toggle", () => store.set("legendExpanded", $("legend").open));
  $("log-box").open = store.get("logOpen", false);
  $("log-box").addEventListener("toggle", () => store.set("logOpen", $("log-box").open));
  $("tab-text").addEventListener("click", () => selectTab("text"));
  $("tab-live").addEventListener("click", () => selectTab("live"));
  $("tab-media").addEventListener("click", () => selectTab("media"));
  $("tab-pad").addEventListener("click", () => selectTab("pad"));
  $("sensitivity").value = String(store.get("sensitivity", 1));
  $("sensitivity").addEventListener("change", () => store.set("sensitivity", Number($("sensitivity").value)));
  bindPad();
  document.querySelectorAll("[data-media]").forEach((button) => {
    button.addEventListener("click", () => {
      send({ t: "media", key: button.dataset.media });
      $("media-status").textContent = button.textContent;
      clearTimeout(button.statusTimer);
      button.statusTimer = setTimeout(() => { $("media-status").textContent = ""; }, 1500);
    });
  });
  bindLive();
}

async function start() {
  try {
    const status = await fetchStatus();
    show(status.paired ? "main" : "pair");
    if (status.paired) connect();
  } catch {
    setTimeout(start, 2000);
    return;
  }
  render();
}

applyTheme();
// Browsers may restore field contents on reload; every page load starts empty.
$("text").value = "";
$("live").value = "";
bind();
updateTextMask();
applyLanguage();
selectTab(["text", "live", "media", "pad"].includes(store.get("tab", "text")) ? store.get("tab", "text") : "text");
start();
