import {
  ButtonItem,
  ConfirmModal,
  Field,
  PanelSection,
  PanelSectionRow,
  ToggleField,
  showModal,
  staticClasses,
} from "@decky/ui";
import { callable, definePlugin } from "@decky/api";
import { useEffect, useState } from "react";
import { FaDesktop, FaGlobe, FaKeyboard, FaLaptop, FaMobileAlt } from "react-icons/fa";

interface Device {
  id: string;
  name: string;
  kind: string;
  last_seen: number;
  connected: boolean;
}

interface Status {
  running: boolean;
  on?: boolean;
  client?: string | null;
  client_kind?: string | null;
  phone_url?: string;
  qr?: string;
  session?: boolean;
  addresses?: string[];
  fingerprint?: string;
  pairing?: { code: string | null; seconds: number };
  devices?: Device[];
}

const getStatus = callable<[], Status>("get_status");
const toggle = callable<[], Status>("toggle");
const pair = callable<[], Status>("pair");
const removeDevice = callable<[deviceId: string], Status>("remove_device");

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

type Key = keyof typeof TEXT.en;

function t(key: Key, vars: Record<string, string> = {}): string {
  const lang = navigator.language.toLowerCase().startsWith("pl") ? "pl" : "en";
  return TEXT[lang][key].replace(/\{(\w+)\}/g, (_, name: string) => vars[name] ?? "");
}

function KindIcon({ kind }: { kind?: string | null }) {
  const Icon = { pc: FaDesktop, mac: FaLaptop, phone: FaMobileAlt }[kind ?? ""] ?? FaGlobe;
  return <Icon style={{ marginRight: "8px", verticalAlign: "middle" }} />;
}

function DeviceName({ kind, name }: { kind?: string | null; name: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <KindIcon kind={kind} />
      {name}
    </span>
  );
}

function formatTime(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function Content() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let alive = true;
    const refresh = async () => {
      const next = await getStatus();
      if (alive) setStatus(next);
    };
    refresh();
    const timer = setInterval(refresh, 1000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  if (!status) return null;
  if (!status.running) {
    return (
      <PanelSection>
        <PanelSectionRow>
          <Field description={t("notRunning")} />
        </PanelSectionRow>
      </PanelSection>
    );
  }

  const code = status.pairing?.code;
  const devices = status.devices ?? [];
  const confirmRemove = (device: Device) => {
    showModal(
      <ConfirmModal
        strTitle={t("removeTitle", { name: device.name })}
        strDescription={t("removeText")}
        strOKButtonText={t("remove")}
        onOK={async () => setStatus(await removeDevice(device.id))}
      />,
    );
  };

  return (
    <>
      <PanelSection>
        <PanelSectionRow>
          <ToggleField
            label={t("switchLabel")}
            description={status.on ? t("switchOn") : t("switchOff")}
            checked={!!status.on}
            onChange={async () => setStatus(await toggle())}
          />
        </PanelSectionRow>
        {status.on && (
          <>
            <PanelSectionRow>
              <Field label={t("address")} description={status.addresses?.join("\n")} />
            </PanelSectionRow>
            <PanelSectionRow>
              <Field
                label={t("connected")}
                description={status.client ? (
                  <span>
                    <DeviceName kind={status.client_kind} name={status.client} />
                    {status.session ? ` · ${t("sessionActive")}` : ""}
                  </span>
                ) : t("nobody")}
              />
            </PanelSectionRow>
          </>
        )}
      </PanelSection>

      <PanelSection title={t("pairing")}>
        {code ? (
          <>
            <PanelSectionRow>
              <Field label={t("code")}>
                <span style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "4px" }}>{code}</span>
              </Field>
            </PanelSectionRow>
            <PanelSectionRow>
              <Field
                description={`${t("validFor", { time: formatTime(status.pairing?.seconds ?? 0) })}\n`
                  + `${t("certificate")}: ${status.fingerprint}`}
              />
            </PanelSectionRow>
            {status.qr && (
              <PanelSectionRow>
                <Field description={`${t("scanHint")}\n${status.phone_url}`} />
                <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
                  <img
                    src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(status.qr)}`}
                    width={180}
                    height={180}
                    style={{ borderRadius: "6px" }}
                  />
                </div>
              </PanelSectionRow>
            )}
          </>
        ) : (
          <PanelSectionRow>
            <ButtonItem layout="below" onClick={async () => setStatus(await pair())}>
              {t("pairButton")}
            </ButtonItem>
          </PanelSectionRow>
        )}
      </PanelSection>

      <PanelSection title={t("devices")}>
        {devices.length === 0 ? (
          <PanelSectionRow>
            <Field description={t("noDevices")} />
          </PanelSectionRow>
        ) : devices.map((device) => (
          <PanelSectionRow key={device.id}>
            <ButtonItem
              layout="inline"
              label={<DeviceName kind={device.kind} name={device.name} />}
              onClick={() => confirmRemove(device)}
            >
              {t("remove")}
            </ButtonItem>
          </PanelSectionRow>
        ))}
      </PanelSection>
    </>
  );
}

export default definePlugin(() => ({
  name: "Elemental DeckKeys",
  titleView: <div className={staticClasses.Title}>Elemental DeckKeys</div>,
  content: <Content />,
  icon: <FaKeyboard />,
}));
