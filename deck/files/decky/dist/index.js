const manifest = {"name":"Elemental DeckKeys"};
const API_VERSION = 2;
const internalAPIConnection = window.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit;
if (!internalAPIConnection) {
    throw new Error('[@decky/api]: Failed to connect to the loader as as the loader API was not initialized. This is likely a bug in Decky Loader.');
}
let api;
try {
    api = internalAPIConnection.connect(API_VERSION, manifest.name);
}
catch {
    api = internalAPIConnection.connect(1, manifest.name);
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version 1. Some features may not work.`);
}
if (api._version != API_VERSION) {
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version ${api._version}. Some features may not work.`);
}
const callable = api.callable;
const definePlugin = (fn) => {
    return (...args) => {
        return fn(...args);
    };
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = SP_REACT.createContext && /*#__PURE__*/SP_REACT.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/SP_REACT.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/SP_REACT.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/SP_REACT.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/SP_REACT.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/SP_REACT.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaMobileAlt (props) {
  return GenIcon({"attr":{"viewBox":"0 0 320 512"},"child":[{"tag":"path","attr":{"d":"M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"},"child":[]}]})(props);
}function FaLaptop (props) {
  return GenIcon({"attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"},"child":[]}]})(props);
}function FaKeyboard (props) {
  return GenIcon({"attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"},"child":[]}]})(props);
}function FaGlobe (props) {
  return GenIcon({"attr":{"viewBox":"0 0 496 512"},"child":[{"tag":"path","attr":{"d":"M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"},"child":[]}]})(props);
}function FaDesktop (props) {
  return GenIcon({"attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z"},"child":[]}]})(props);
}

const getStatus = callable("get_status");
const toggle = callable("toggle");
const pair = callable("pair");
const removeDevice = callable("remove_device");
const TEXT = {
    en: {
        notRunning: "Elemental DeckKeys is not running. Install it again from the GitHub page.",
        switchLabel: "DeckKeys",
        switchOn: "Browsers on the local network can connect.",
        switchOff: "Nothing can connect.",
        address: "Address",
        connected: "Connected as",
        scanHint: "Scan with a phone to open the page, then type the code there.",
        nobody: "Nobody",
        sessionActive: "session active",
        pairing: "Pairing",
        pairButton: "Pair a new browser",
        code: "Code",
        validFor: "Valid for {time}",
        certificate: "Certificate",
        devices: "Paired browsers",
        noDevices: "None yet.",
        remove: "Remove",
        removeTitle: "Remove {name}?",
        removeText: "This browser will have to pair again.",
    },
    pl: {
        notRunning: "Elemental DeckKeys nie działa. Zainstaluj go ponownie ze strony na GitHubie.",
        switchLabel: "DeckKeys",
        switchOn: "Przeglądarki w sieci lokalnej mogą się połączyć.",
        switchOff: "Nic nie może się połączyć.",
        address: "Adres",
        connected: "Połączono jako",
        scanHint: "Zeskanuj telefonem, aby otworzyć stronę, i wpisz tam kod.",
        nobody: "Nikt",
        sessionActive: "sesja aktywna",
        pairing: "Parowanie",
        pairButton: "Sparuj nową przeglądarkę",
        code: "Kod",
        validFor: "Ważny {time}",
        certificate: "Certyfikat",
        devices: "Sparowane przeglądarki",
        noDevices: "Jeszcze żadnej.",
        remove: "Usuń",
        removeTitle: "Usunąć {name}?",
        removeText: "Ta przeglądarka będzie musiała sparować się ponownie.",
    },
};
function t(key, vars = {}) {
    const lang = navigator.language.toLowerCase().startsWith("pl") ? "pl" : "en";
    return TEXT[lang][key].replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
}
function KindIcon({ kind }) {
    const Icon = { pc: FaDesktop, mac: FaLaptop, phone: FaMobileAlt }[kind ?? ""] ?? FaGlobe;
    return SP_JSX.jsx(Icon, { style: { marginRight: "8px", verticalAlign: "middle" } });
}
function DeviceName({ kind, name }) {
    return (SP_JSX.jsxs("span", { style: { display: "inline-flex", alignItems: "center" }, children: [SP_JSX.jsx(KindIcon, { kind: kind }), name] }));
}
function formatTime(seconds) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
function Content() {
    const [status, setStatus] = SP_REACT.useState(null);
    SP_REACT.useEffect(() => {
        let alive = true;
        const refresh = async () => {
            const next = await getStatus();
            if (alive)
                setStatus(next);
        };
        refresh();
        const timer = setInterval(refresh, 1000);
        return () => {
            alive = false;
            clearInterval(timer);
        };
    }, []);
    if (!status)
        return null;
    if (!status.running) {
        return (SP_JSX.jsx(DFL.PanelSection, { children: SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { description: t("notRunning") }) }) }));
    }
    const code = status.pairing?.code;
    const devices = status.devices ?? [];
    const confirmRemove = (device) => {
        DFL.showModal(SP_JSX.jsx(DFL.ConfirmModal, { strTitle: t("removeTitle", { name: device.name }), strDescription: t("removeText"), strOKButtonText: t("remove"), onOK: async () => setStatus(await removeDevice(device.id)) }));
    };
    return (SP_JSX.jsxs(SP_JSX.Fragment, { children: [SP_JSX.jsxs(DFL.PanelSection, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ToggleField, { label: t("switchLabel"), description: status.on ? t("switchOn") : t("switchOff"), checked: !!status.on, onChange: async () => setStatus(await toggle()) }) }), status.on && (SP_JSX.jsxs(SP_JSX.Fragment, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { label: t("address"), description: status.addresses?.join("\n") }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { label: t("connected"), description: status.client ? (SP_JSX.jsxs("span", { children: [SP_JSX.jsx(DeviceName, { kind: status.client_kind, name: status.client }), status.session ? ` · ${t("sessionActive")}` : ""] })) : t("nobody") }) })] }))] }), SP_JSX.jsx(DFL.PanelSection, { title: t("pairing"), children: code ? (SP_JSX.jsxs(SP_JSX.Fragment, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { label: t("code"), children: SP_JSX.jsx("span", { style: { fontSize: "24px", fontWeight: "bold", letterSpacing: "4px" }, children: code }) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { description: `${t("validFor", { time: formatTime(status.pairing?.seconds ?? 0) })}\n`
                                    + `${t("certificate")}: ${status.fingerprint}` }) }), status.qr && (SP_JSX.jsxs(DFL.PanelSectionRow, { children: [SP_JSX.jsx(DFL.Field, { description: `${t("scanHint")}\n${status.phone_url}` }), SP_JSX.jsx("div", { style: { display: "flex", justifyContent: "center", padding: "8px 0" }, children: SP_JSX.jsx("img", { src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(status.qr)}`, width: 180, height: 180, style: { borderRadius: "6px" } }) })] }))] })) : (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: async () => setStatus(await pair()), children: t("pairButton") }) })) }), SP_JSX.jsx(DFL.PanelSection, { title: t("devices"), children: devices.length === 0 ? (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { description: t("noDevices") }) })) : devices.map((device) => (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "inline", label: SP_JSX.jsx(DeviceName, { kind: device.kind, name: device.name }), onClick: () => confirmRemove(device), children: t("remove") }) }, device.id))) })] }));
}
var index = definePlugin(() => ({
    name: "Elemental DeckKeys",
    titleView: SP_JSX.jsx("div", { className: DFL.staticClasses.Title, children: "Elemental DeckKeys" }),
    content: SP_JSX.jsx(Content, {}),
    icon: SP_JSX.jsx(FaKeyboard, {}),
}));

export { index as default };
//# sourceMappingURL=index.js.map
