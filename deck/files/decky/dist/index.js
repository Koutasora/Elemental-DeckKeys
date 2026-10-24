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
function FaKeyboard (props) {
  return GenIcon({"attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"},"child":[]}]})(props);
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
        connected: "Connected",
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
        connected: "Połączono",
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
    return (SP_JSX.jsxs(SP_JSX.Fragment, { children: [SP_JSX.jsxs(DFL.PanelSection, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ToggleField, { label: t("switchLabel"), description: status.on ? t("switchOn") : t("switchOff"), checked: !!status.on, onChange: async () => setStatus(await toggle()) }) }), status.on && (SP_JSX.jsxs(SP_JSX.Fragment, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { label: t("address"), description: status.addresses?.join("\n") }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { label: t("connected"), description: status.client
                                        ? `${status.client}${status.session ? ` · ${t("sessionActive")}` : ""}`
                                        : t("nobody") }) })] }))] }), SP_JSX.jsx(DFL.PanelSection, { title: t("pairing"), children: code ? (SP_JSX.jsxs(SP_JSX.Fragment, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { label: t("code"), children: SP_JSX.jsx("span", { style: { fontSize: "24px", fontWeight: "bold", letterSpacing: "4px" }, children: code }) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { description: `${t("validFor", { time: formatTime(status.pairing?.seconds ?? 0) })}\n`
                                    + `${t("certificate")}: ${status.fingerprint}` }) })] })) : (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: async () => setStatus(await pair()), children: t("pairButton") }) })) }), SP_JSX.jsx(DFL.PanelSection, { title: t("devices"), children: devices.length === 0 ? (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.Field, { description: t("noDevices") }) })) : devices.map((device) => (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "inline", label: device.name, onClick: () => confirmRemove(device), children: t("remove") }) }, device.id))) })] }));
}
var index = definePlugin(() => ({
    name: "Elemental DeckKeys",
    titleView: SP_JSX.jsx("div", { className: DFL.staticClasses.Title, children: "Elemental DeckKeys" }),
    content: SP_JSX.jsx(Content, {}),
    icon: SP_JSX.jsx(FaKeyboard, {}),
}));

export { index as default };
//# sourceMappingURL=index.js.map
