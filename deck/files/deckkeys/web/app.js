"use strict";

const I18N = {
  en: {
    settings: "Settings",
    connecting: "Connecting to the Deck…",
    connected: "Connected",
    disconnected: "Not connected, retrying…",
    replaced: "Taken over by another window",
    sessionOn: "Session active",
    sessionOff: "Session off",
    pairTitle: "Pair this browser",
    pairHint: "Start pairing on the Deck and enter the 6-digit code shown there.",
    pairCode: "Code from the Deck",
    deviceName: "Device name",
    pairButton: "Pair",
    wrong_code: "Wrong code.",
    pairing_closed: "Pairing is not open or the code expired. Start pairing on the Deck again.",
    pairFailed: "Pairing failed. Check the connection to the Deck.",
    startSession: "Start session",
    continueSession: "Continue session",
    sessionLength: "Session ends after this many minutes without typing",
    endSession: "End session",
    reconnect: "Reconnect",
    endsIn: "Ends in {time}",
    textLabel: "Text to type on the Deck",
    tabText: "Text",
    tabLive: "Live",
    tabMedia: "Media",
    mediaPrevious: "Previous",
    mediaPlayPause: "Play/Pause",
    mediaNext: "Next",
    mediaStop: "Stop",
    mediaVolumeDown: "Volume −",
    mediaMute: "Mute",
    mediaVolumeUp: "Volume +",
    livePlaceholder: "Click here to type on the Deck",
    liveCapturing: "Keys go to the Deck. Click outside the box to stop.",
    legend: "Legend",
    legendPaste: "type the PC clipboard",
    legendBrowser: "stay in the browser",
    legendBoxTerm: "Box",
    legendBox: "shows what you typed; check it on the Deck",
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
  },
  pl: {
    settings: "Ustawienia",
    connecting: "Łączenie z Deckiem…",
    connected: "Połączono",
    disconnected: "Brak połączenia, ponawiam…",
    replaced: "Przejęte przez inne okno",
    sessionOn: "Sesja aktywna",
    sessionOff: "Sesja wyłączona",
    pairTitle: "Sparuj tę przeglądarkę",
    pairHint: "Włącz parowanie na Decku i wpisz 6-cyfrowy kod, który się tam pokaże.",
    pairCode: "Kod z Decka",
    deviceName: "Nazwa urządzenia",
    pairButton: "Paruj",
    wrong_code: "Zły kod.",
    pairing_closed: "Parowanie nie jest włączone albo kod wygasł. Włącz parowanie na Decku jeszcze raz.",
    pairFailed: "Parowanie nie powiodło się. Sprawdź połączenie z Deckiem.",
    startSession: "Rozpocznij sesję",
    continueSession: "Kontynuuj sesję",
    sessionLength: "Sesja kończy się po tylu minutach bez pisania",
    endSession: "Zakończ sesję",
    reconnect: "Połącz ponownie",
    endsIn: "Wyłączy się za {time}",
    textLabel: "Tekst do wpisania na Decku",
    tabText: "Tekst",
    tabLive: "Na żywo",
    tabMedia: "Multimedia",
    mediaPrevious: "Poprzedni",
    mediaPlayPause: "Odtwórz/Pauza",
    mediaNext: "Następny",
    mediaStop: "Stop",
    mediaVolumeDown: "Ciszej",
    mediaMute: "Wycisz",
    mediaVolumeUp: "Głośniej",
    livePlaceholder: "Kliknij tutaj, aby pisać na Decku",
    liveCapturing: "Klawisze trafiają na Decka. Kliknij poza polem, aby przestać.",
    legend: "Legenda",
    legendPaste: "wpisuje schowek z PC",
    legendBrowser: "zostają w przeglądarce",
    legendBoxTerm: "Pole",
    legendBox: "pokazuje, co wpisałeś; sprawdzaj na Decku",
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
const preview = { text: "", cursor: 0, all: false };
const logEntries = [];
let lastAction = "";
let sessionEnded = false;
let actionTimer = null;
const state = { connected: false, session: false, remaining: 0, typing: false };

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
  let status = t("connecting");
  if (replaced) status = t("replaced");
  else if (state.connected) status = `${t("connected")} · ${state.session ? t("sessionOn") : t("sessionOff")}`;
  else if (view === "main") status = t("disconnected");
  $("status").textContent = view === "pair" ? "" : status;

  const sessionBtn = $("session-btn");
  if (replaced) {
    sessionBtn.textContent = t("reconnect");
    sessionBtn.disabled = false;
  } else {
    sessionBtn.textContent = state.session ? t("endSession")
      : t(sessionEnded ? "continueSession" : "startSession");
    sessionBtn.disabled = !state.connected;
  }
  $("session-info").textContent = state.session ? t("endsIn", { time: formatTime(state.remaining) }) : "";

  const canSend = state.connected && state.session && !state.typing;
  $("send-btn").disabled = !canSend;
  document.querySelectorAll("#saved .send").forEach((b) => { b.disabled = !canSend; });
  document.querySelectorAll("[data-media]").forEach((b) => { b.disabled = !canSend; });
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

function showAction(key) {
  lastAction = t(key);
  clearTimeout(actionTimer);
  actionTimer = setTimeout(() => {
    lastAction = "";
    render();
  }, 1500);
  render();
}

function renderPreview() {
  const live = $("live");
  live.value = hidden() ? preview.text.replace(/[^\n]/g, "•") : preview.text;
  if (preview.all) live.setSelectionRange(0, live.value.length);
  else live.setSelectionRange(preview.cursor, preview.cursor);
}

function previewInsert(text) {
  if (preview.all) Object.assign(preview, { text: "", cursor: 0, all: false });
  preview.text = preview.text.slice(0, preview.cursor) + text + preview.text.slice(preview.cursor);
  preview.cursor += text.length;
}

function previewDelete(forward) {
  if (preview.all) {
    Object.assign(preview, { text: "", cursor: 0, all: false });
  } else if (forward) {
    preview.text = preview.text.slice(0, preview.cursor) + preview.text.slice(preview.cursor + 1);
  } else if (preview.cursor > 0) {
    preview.text = preview.text.slice(0, preview.cursor - 1) + preview.text.slice(preview.cursor);
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

function sessionMinutes() {
  const minutes = Number(store.get("sessionMinutes", 10));
  return [5, 10, 15, 20, 30].includes(minutes) ? minutes : 10;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function addLog(kind, payload = null) {
  const last = logEntries[logEntries.length - 1];
  const grouped = ["typed", "deleted", "moved", "enter", "tab", "escape"];
  if (last && last.kind === kind && grouped.includes(kind)) {
    if (kind === "typed") last.payload += payload;
    else last.count += 1;
  } else {
    const now = new Date();
    logEntries.push({
      kind, payload, count: 1,
      time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    });
    if (logEntries.length > 100) logEntries.shift();
  }
  renderLog();
}

function logLabel(entry) {
  const text = entry.payload;
  const withText = { typed: "logTyped", sent: "logSent", pasted: "logPasted" }[entry.kind];
  if (withText) {
    return hidden() ? t(withText + "Hidden", { n: text.length }) : t(withText, { text });
  }
  const simple = {
    deleted: "logDeleted", moved: "logMoved", enter: "logEnter", tab: "logTab",
    escape: "logEscape", selectAll: "logSelectAll", copied: "logCopied", cut: "logCut",
    undo: "logUndo",
  }[entry.kind];
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
    if (!entry.payload && !showKeys) continue;
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
    if (code === "KeyX" && preview.all) Object.assign(preview, { text: "", cursor: 0, all: false });
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
  $("panel-media").hidden = name !== "media";
  $("panel-text").hidden = name !== "text";
  $("saved-section").hidden = name !== "text";
  $("panel-live").hidden = name !== "live";
  $("legend").hidden = name !== "live";
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
  // The box only mirrors what was sent; undo anything the browser changed itself.
  live.addEventListener("input", renderPreview);
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
  return response.json();
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
    if (state.session) sessionEnded = true;
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
    if (state.session && !msg.session) sessionEnded = true;
    Object.assign(state, { session: msg.session, remaining: msg.remaining, typing: msg.typing });
    if (msg.reason === "idle") showMessage(t("endedIdle", { n: sessionMinutes() }));
    render();
  } else if (msg.t === "progress" && msg.id === currentId) {
    $("progress-bar").max = msg.total;
    $("progress-bar").value = msg.done;
    $("progress-text").textContent = t("typing", { done: msg.done, total: msg.total });
  } else if (msg.t === "typed" && msg.id === currentId) {
    currentId = null;
    if (currentFromField && !msg.stopped && $("clear").checked) $("text").value = "";
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

async function pair(event) {
  event.preventDefault();
  const error = $("pair-error");
  error.hidden = true;
  const name = $("pair-name").value.trim();
  store.set("deviceName", name);
  try {
    const response = await fetch("/api/pair", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: $("pair-code").value.trim(), name }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "pairFailed");
    $("pair-code").value = "";
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
  $("pair-name").value = store.get("deviceName", "PC");

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

  $("settings-btn").addEventListener("click", () => show(view === "settings" ? previousView : "settings"));
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
    renderPreview();
    renderLog();
  });
  $("preview-clear").addEventListener("click", () => {
    Object.assign(preview, { text: "", cursor: 0, all: false });
    renderPreview();
  });
  $("log-keys").checked = store.get("logKeys", false);
  $("log-keys").addEventListener("change", () => {
    store.set("logKeys", $("log-keys").checked);
    renderLog();
  });
  $("log-clear").addEventListener("click", () => {
    logEntries.length = 0;
    renderLog();
  });
  $("legend").open = store.get("legendExpanded", false);
  $("legend").addEventListener("toggle", () => store.set("legendExpanded", $("legend").open));
  $("log-box").open = store.get("logOpen", false);
  $("log-box").addEventListener("toggle", () => store.set("logOpen", $("log-box").open));
  $("tab-text").addEventListener("click", () => selectTab("text"));
  $("tab-live").addEventListener("click", () => selectTab("live"));
  $("tab-media").addEventListener("click", () => selectTab("media"));
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
bind();
applyLanguage();
selectTab(["text", "live", "media"].includes(store.get("tab", "text")) ? store.get("tab", "text") : "text");
start();
