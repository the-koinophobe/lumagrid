"use client";

import { useState, useCallback, useRef } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ApplianceDB {
  id: string; cat: string; name: string; rw: number; eff: number;
  surge: number; alwaysOn?: boolean; duty?: number;
  defaultDay: number; defaultNight: number;
}

interface Appliance {
  uid: number; id: string; name: string; rw: number; eff: number;
  surge: number; alwaysOn: boolean; duty: number;
  qty: number; dayH: number; nightH: number;
}

interface CalcResult {
  dayWh: number; nightWh: number; totalWh: number; totalEffW: number;
  dayEffW: number; nightEffW: number; panelKW: number; panelCount: number;
  battKWh: number; invKVA: number; cloudBufWh: number; rawBattWh: number;
  effectivePSH: number; rawInvKVA: number; maxSurgeKVA: number;
  clampedKVA: number; backupHrs: string; sysVoltage: number;
  totalLoadKW: string; worstA: Appliance | null;
}

// ─── DB ──────────────────────────────────────────────────────────────────────

const DB: ApplianceDB[] = [
  { id: "led9", cat: "Lighting", name: "LED bulb (9W)", rw: 9, eff: 95, surge: 1, defaultDay: 5, defaultNight: 4 },
  { id: "led15", cat: "Lighting", name: "LED bulb (15W)", rw: 15, eff: 95, surge: 1, defaultDay: 5, defaultNight: 4 },
  { id: "cfl20", cat: "Lighting", name: "CFL bulb (20W)", rw: 20, eff: 80, surge: 1, defaultDay: 4, defaultNight: 4 },
  { id: "tube40", cat: "Lighting", name: "Fluorescent tube (40W)", rw: 40, eff: 80, surge: 1, defaultDay: 4, defaultNight: 4 },
  { id: "flood50", cat: "Lighting", name: "Floodlight (50W)", rw: 50, eff: 90, surge: 1, defaultDay: 0, defaultNight: 8 },
  { id: "cfan", cat: "Fans", name: "Ceiling fan (standard)", rw: 75, eff: 80, surge: 1.5, defaultDay: 6, defaultNight: 8 },
  { id: "cfandc", cat: "Fans", name: "Ceiling fan (DC motor)", rw: 35, eff: 90, surge: 1.2, defaultDay: 6, defaultNight: 8 },
  { id: "stand", cat: "Fans", name: "Standing fan", rw: 60, eff: 80, surge: 1.5, defaultDay: 5, defaultNight: 7 },
  { id: "table", cat: "Fans", name: "Table fan", rw: 40, eff: 80, surge: 1.5, defaultDay: 4, defaultNight: 6 },
  { id: "exhaust", cat: "Fans", name: "Exhaust fan", rw: 30, eff: 80, surge: 1.5, defaultDay: 3, defaultNight: 0 },
  { id: "ac05", cat: "Air conditioning", name: "1HP split AC", rw: 850, eff: 85, surge: 3, defaultDay: 3, defaultNight: 7 },
  { id: "ac15", cat: "Air conditioning", name: "1.5HP split AC", rw: 1120, eff: 85, surge: 3, defaultDay: 3, defaultNight: 7 },
  { id: "ac2", cat: "Air conditioning", name: "2HP split AC", rw: 1500, eff: 85, surge: 3, defaultDay: 2, defaultNight: 8 },
  { id: "ac25", cat: "Air conditioning", name: "2.5HP split AC", rw: 1900, eff: 85, surge: 3, defaultDay: 2, defaultNight: 8 },
  { id: "inv15", cat: "Air conditioning", name: "1.5HP inverter AC", rw: 700, eff: 95, surge: 2, defaultDay: 3, defaultNight: 7 },
  { id: "inv2", cat: "Air conditioning", name: "2HP inverter AC", rw: 950, eff: 95, surge: 2, defaultDay: 2, defaultNight: 8 },
  { id: "frmini", cat: "Refrigeration", name: "Mini fridge (50-100L)", rw: 80, eff: 85, surge: 2.5, alwaysOn: true, duty: 0.35, defaultDay: 8, defaultNight: 5 },
  { id: "frsmall", cat: "Refrigeration", name: "Small fridge (100-200L)", rw: 120, eff: 85, surge: 2.5, alwaysOn: true, duty: 0.35, defaultDay: 8, defaultNight: 5 },
  { id: "frmed", cat: "Refrigeration", name: "Medium fridge (200-300L)", rw: 150, eff: 85, surge: 2.5, alwaysOn: true, duty: 0.35, defaultDay: 8, defaultNight: 5 },
  { id: "frlarge", cat: "Refrigeration", name: "Large fridge (300-400L)", rw: 200, eff: 85, surge: 2.5, alwaysOn: true, duty: 0.35, defaultDay: 8, defaultNight: 5 },
  { id: "chest", cat: "Refrigeration", name: "Chest freezer (200L)", rw: 150, eff: 85, surge: 2.5, alwaysOn: true, duty: 0.35, defaultDay: 8, defaultNight: 5 },
  { id: "upright", cat: "Refrigeration", name: "Upright freezer (300L)", rw: 200, eff: 85, surge: 2.5, alwaysOn: true, duty: 0.35, defaultDay: 8, defaultNight: 5 },
  { id: "wchil", cat: "Refrigeration", name: "Water dispenser (hot & cold)", rw: 100, eff: 85, surge: 2, alwaysOn: true, duty: 0.3, defaultDay: 8, defaultNight: 3 },
  { id: "tv32", cat: "Entertainment", name: "LED TV 32\"", rw: 50, eff: 85, surge: 1, defaultDay: 3, defaultNight: 4 },
  { id: "tv43", cat: "Entertainment", name: "LED TV 43\"", rw: 80, eff: 85, surge: 1, defaultDay: 2, defaultNight: 4 },
  { id: "tv55", cat: "Entertainment", name: "LED TV 55\"", rw: 120, eff: 85, surge: 1, defaultDay: 2, defaultNight: 4 },
  { id: "dstv", cat: "Entertainment", name: "DSTV decoder", rw: 15, eff: 85, surge: 1, defaultDay: 3, defaultNight: 4 },
  { id: "gotv", cat: "Entertainment", name: "GoTV / StarTimes decoder", rw: 12, eff: 85, surge: 1, defaultDay: 3, defaultNight: 4 },
  { id: "speaker", cat: "Entertainment", name: "Home theatre / soundbar", rw: 80, eff: 80, surge: 1, defaultDay: 2, defaultNight: 3 },
  { id: "laptop", cat: "Computing", name: "Laptop (14-15\")", rw: 65, eff: 85, surge: 1, defaultDay: 6, defaultNight: 2 },
  { id: "desktop", cat: "Computing", name: "Desktop PC", rw: 200, eff: 85, surge: 1.2, defaultDay: 6, defaultNight: 1 },
  { id: "router", cat: "Computing", name: "WiFi router", rw: 15, eff: 85, surge: 1, alwaysOn: true, duty: 1, defaultDay: 12, defaultNight: 12 },
  { id: "cctv", cat: "Computing", name: "CCTV (4 cameras)", rw: 60, eff: 85, surge: 1, alwaysOn: true, duty: 1, defaultDay: 12, defaultNight: 12 },
  { id: "phone", cat: "Phones", name: "Smartphone charger", rw: 10, eff: 85, surge: 1, defaultDay: 2, defaultNight: 3 },
  { id: "phone2", cat: "Phones", name: "Smartphone x2 chargers", rw: 20, eff: 85, surge: 1, defaultDay: 2, defaultNight: 3 },
  { id: "micro", cat: "Kitchen", name: "Microwave (800W)", rw: 1000, eff: 85, surge: 1.5, defaultDay: 0.5, defaultNight: 0 },
  { id: "kettle", cat: "Kitchen", name: "Electric kettle", rw: 1500, eff: 100, surge: 1, defaultDay: 0.2, defaultNight: 0 },
  { id: "iron", cat: "Laundry", name: "Clothes iron", rw: 1000, eff: 100, surge: 1, defaultDay: 1, defaultNight: 0 },
  { id: "washmach", cat: "Laundry", name: "Washing machine", rw: 500, eff: 78, surge: 3, defaultDay: 1, defaultNight: 0 },
  { id: "pump05", cat: "Pumps", name: "Submersible pump (0.5HP)", rw: 370, eff: 75, surge: 3, defaultDay: 2, defaultNight: 0 },
  { id: "pump1", cat: "Pumps", name: "Submersible pump (1HP)", rw: 750, eff: 75, surge: 3, defaultDay: 2, defaultNight: 0 },
  { id: "pump15", cat: "Pumps", name: "Submersible pump (1.5HP)", rw: 1100, eff: 75, surge: 3, defaultDay: 2, defaultNight: 0 },
  { id: "alarm", cat: "Security", name: "Alarm system", rw: 20, eff: 85, surge: 1, alwaysOn: true, duty: 1, defaultDay: 12, defaultNight: 12 },
  { id: "cpap", cat: "Medical", name: "CPAP machine", rw: 30, eff: 85, surge: 1, defaultDay: 0, defaultNight: 8 },
  { id: "oxygen", cat: "Medical", name: "Oxygen concentrator (5L)", rw: 300, eff: 80, surge: 1.5, defaultDay: 4, defaultNight: 4 },
];

const INV_SIZES = [3, 3.5, 4, 5, 6, 7.5, 8, 10, 12, 15, 20, 25, 30];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const effW = (a: Pick<Appliance, "rw" | "eff">) => a.rw / (a.eff / 100);
const surgeKVA = (a: Appliance) => (effW(a) * a.qty * a.surge) / 1000;

function calcSystem(appliances: Appliance[], psh: number): CalcResult {
  let dayWh = 0, nightWh = 0, totalEffW = 0, dayEffW = 0, nightEffW = 0;
  appliances.forEach(a => {
    const ew = effW(a);
    dayWh += a.qty * ew * a.dayH;
    nightWh += a.qty * ew * a.nightH;
    totalEffW += a.qty * ew;
    if (a.dayH > 0) dayEffW += a.qty * ew;
    if (a.nightH > 0) nightEffW += a.qty * ew;
  });
  const totalWh = dayWh + nightWh;
  const effectivePSH = psh * 0.80;
  const panelKW = (totalWh / 1000) / effectivePSH / 0.75;
  const panelCount = Math.ceil(panelKW * 1000 / 400);
  const cloudBufWh = dayEffW * 4;
  const rawBattWh = nightWh + cloudBufWh;
  const battKWh = (rawBattWh / 1000 / 0.80) * 1.20;
  const rawInvKVA = (totalEffW / 1000) * 1.25;
  const worstA = appliances.length ? appliances.reduce((mx, a) => surgeKVA(a) > surgeKVA(mx) ? a : mx, appliances[0]) : null;
  const maxSurgeKVA = worstA ? ((totalEffW - worstA.qty * effW(worstA)) + worstA.qty * effW(worstA) * worstA.surge) / 1000 : 0;
  const clampedKVA = Math.max(3, rawInvKVA, maxSurgeKVA);
  const invKVA = INV_SIZES.find(s => s >= clampedKVA) ?? (Math.ceil(clampedKVA / 5) * 5);
  const sysVoltage = battKWh < 1.2 ? 12 : battKWh < 3 ? 24 : 48;
  const battUsableWh = battKWh * 1000 * 0.80;
  const backupLoad = nightEffW > 0 ? nightEffW : totalEffW;
  const backupHrs = backupLoad > 0 ? (battUsableWh / backupLoad).toFixed(1) : "--";
  const totalLoadKW = (totalEffW / 1000).toFixed(2);
  return { dayWh, nightWh, totalWh, totalEffW, dayEffW, nightEffW, panelKW, panelCount, battKWh, invKVA, cloudBufWh, rawBattWh, effectivePSH, rawInvKVA, maxSurgeKVA, clampedKVA, backupHrs, sysVoltage, totalLoadKW, worstA };
}

function fmtKVA(v: number) { return Number.isInteger(v) ? String(v) : v.toFixed(1); }

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepDot({ n, current }: { n: number; current: number }) {
  const done = n < current;
  const active = n === current;
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 700, flexShrink: 0, transition: "all 0.2s",
      background: done ? "var(--accent)" : active ? "var(--green)" : "white",
      border: `2px solid ${done ? "var(--accent)" : active ? "var(--green)" : "var(--border)"}`,
      color: done || active ? "white" : "var(--muted)",
    }}>
      {done ? "✓" : n}
    </div>
  );
}

function Steps({ current }: { current: number }) {
  const steps = ["Location", "Appliances", "Your system"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
      {steps.map((label, i) => (
        <div key={label} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "unset" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StepDot n={i + 1} current={current} />
            <span style={{ fontSize: 12, fontWeight: 600, color: i + 1 === current ? "var(--green)" : "var(--muted)", whiteSpace: "nowrap" }}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 1, background: i + 1 < current ? "var(--accent)" : "var(--border)", margin: "0 10px" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "white", border: "1.5px solid var(--border)", borderRadius: 14, padding: "24px 20px", ...style }}>
      {children}
    </div>
  );
}

function Flag({ type, title, desc }: { type: "warn" | "info"; title: string; desc: string }) {
  const warn = type === "warn";
  return (
    <div style={{
      display: "flex", gap: 10, padding: "12px 14px", borderRadius: 10, marginBottom: 10,
      background: warn ? "#fffbeb" : "var(--green-xl)",
      border: `1px solid ${warn ? "#fde68a" : "var(--border)"}`,
    }}>
      <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{warn ? "⚠️" : "ℹ️"}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: warn ? "#92400e" : "var(--green)", marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: warn ? "#92400e" : "var(--green-mid)", lineHeight: 1.6, opacity: 0.9 }}>{desc}</div>
      </div>
    </div>
  );
}

// ─── Step 1: Location ────────────────────────────────────────────────────────

const LOCATIONS = [
  { state: "Rivers", psh: 4.5, cities: "Port Harcourt, Obio-Akpor, Bonny" },
  { state: "Delta", psh: 4.6, cities: "Warri, Asaba, Sapele, Abraka" },
  { state: "Bayelsa", psh: 4.4, cities: "Yenagoa, Brass, Ogbia" },
];

function Step1({ location, onSelect, onNext }: { location: string; onSelect: (s: string, p: number) => void; onNext: () => void }) {
  return (
    <Card>
      <h2 className="brig" style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Where are you located?</h2>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20, lineHeight: 1.6 }}>
        Sets your peak sun hours. All systems are sized for Niger Delta rainy season — 4-hour cloud buffer, 20% reduced effective sun hours.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {LOCATIONS.map(loc => (
          <button key={loc.state} onClick={() => onSelect(loc.state, loc.psh)} style={{
            border: `2px solid ${location === loc.state ? "var(--green)" : "var(--border)"}`,
            background: location === loc.state ? "var(--green-xl)" : "white",
            borderRadius: 10, padding: "14px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>📍</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: location === loc.state ? "var(--green)" : "var(--text)" }}>{loc.state} State</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{loc.psh} peak sun hrs</div>
          </button>
        ))}
      </div>
      <button className="btn-wa" style={{ background: "var(--green)", boxShadow: "none", width: "100%", justifyContent: "center" }} onClick={onNext}>
        Next: Add appliances →
      </button>
    </Card>
  );
}

// ─── Step 2: Appliances ───────────────────────────────────────────────────────

function ApplianceRow({ app, onChange, onRemove }: {
  app: Appliance;
  onChange: (uid: number, field: "qty" | "dayH" | "nightH", val: number) => void;
  onRemove: (uid: number) => void;
}) {
  const ew = effW(app);
  const isZero = app.dayH === 0 && app.nightH === 0;
  const dayKwh = (app.qty * ew * app.dayH / 1000).toFixed(2);
  const nightKwh = (app.qty * ew * app.nightH / 1000).toFixed(2);

  return (
    <div style={{
      background: isZero ? "#fffbeb" : "var(--green-xl)",
      border: `1.5px solid ${isZero ? "#fde68a" : "var(--border)"}`,
      borderRadius: 10, padding: 14, marginBottom: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, flex: 1, color: "var(--text)" }}>{app.name}</span>
        <span style={{ fontSize: 10, background: "var(--green-light)", color: "var(--green-mid)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 6px" }}>
          {app.rw}W
        </span>
        {app.surge > 1 && (
          <span style={{ fontSize: 10, background: "#fffbeb", color: "#92400e", border: "1px solid #fde68a", borderRadius: 4, padding: "2px 6px" }}>
            {app.surge}x surge
          </span>
        )}
        <button onClick={() => onRemove(app.uid)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: 16, lineHeight: 1, padding: "2px 4px", borderRadius: 4 }}>×</button>
      </div>

      {/* Qty */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: "var(--muted)", flex: 1 }}>Quantity</span>
        <button onClick={() => onChange(app.uid, "qty", Math.max(1, app.qty - 1))} style={{ width: 28, height: 28, border: "1px solid var(--border)", borderRadius: 7, background: "white", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
        <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{app.qty}</span>
        <button onClick={() => onChange(app.uid, "qty", app.qty + 1)} style={{ width: 28, height: 28, border: "1px solid var(--border)", borderRadius: 7, background: "white", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>= {Math.round(app.qty * ew)}W</span>
      </div>

      {/* Sliders */}
      {[
        { field: "dayH" as const, label: "Day hrs", max: 18 },
        { field: "nightH" as const, label: "Night hrs", max: 12 },
      ].map(({ field, label, max }) => (
        <div key={field} style={{ display: "grid", gridTemplateColumns: "64px 1fr 36px", gap: 8, alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{label}</span>
          <input type="range" min={0} max={max} step={0.5} value={app[field]}
            onChange={e => onChange(app.uid, field, parseFloat(e.target.value))}
            style={{ accentColor: "var(--green)", width: "100%" }}
          />
          <span style={{ fontSize: 12, fontWeight: 700, textAlign: "right", color: "var(--green)" }}>{app[field]}h</span>
        </div>
      ))}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>Day: {dayKwh} kWh</span>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>Night: {nightKwh} kWh</span>
        {Math.round(ew) !== app.rw && <span style={{ fontSize: 11, color: "#92400e", fontWeight: 600 }}>{app.eff}% eff = {Math.round(ew)}W</span>}
      </div>

      {isZero && <div style={{ fontSize: 11, color: "#92400e", marginTop: 6, display: "flex", gap: 5 }}>⚠️ Both sliders at 0 — not counted in calculation.</div>}
      {app.alwaysOn && <div style={{ fontSize: 11, color: "var(--green-mid)", marginTop: 4, display: "flex", gap: 5 }}>ℹ️ Always-on: set total hours to ~8-10h/day across day and night.</div>}
    </div>
  );
}

function Step2({ appliances, onAdd, onChange, onRemove, onBack, onNext }: {
  appliances: Appliance[];
  onAdd: (a: ApplianceDB) => void;
  onChange: (uid: number, field: "qty" | "dayH" | "nightH", val: number) => void;
  onRemove: (uid: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [query, setQuery] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customW, setCustomW] = useState("");

  const results = query.trim()
    ? DB.filter(a => new RegExp(query, "i").test(a.name) || new RegExp(query, "i").test(a.cat)).slice(0, 10)
    : [];

  const hasLoad = appliances.some(a => a.dayH > 0 || a.nightH > 0);

  function addCustom() {
    const rw = parseInt(customW);
    if (!customName.trim() || !rw || rw < 1) return;
    const custom: ApplianceDB = { id: "c" + Date.now(), cat: "Custom", name: customName.trim(), rw, eff: 80, surge: 1, defaultDay: 4, defaultNight: 2 };
    onAdd(custom);
    setCustomName(""); setCustomW(""); setShowCustom(false);
  }

  return (
    <Card>
      <h2 className="brig" style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>What do you want to power?</h2>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, lineHeight: 1.6 }}>Search for each appliance. Set quantity and daily hours.</p>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 8 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: 14 }}>🔍</span>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="e.g. fan, fridge, AC, TV..."
          style={{ width: "100%", height: 42, border: "1.5px solid var(--border)", borderRadius: 10, padding: "0 12px 0 36px", fontSize: 14, fontFamily: "inherit", outline: "none", background: "white", color: "var(--text)" }}
        />
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", marginBottom: 12, maxHeight: 240, overflowY: "auto" }}>
          {results.map(a => (
            <button key={a.id} onClick={() => { onAdd(a); setQuery(""); }} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              border: "none", borderBottom: "1px solid var(--border)", background: "white", cursor: "pointer", textAlign: "left",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--green-xl)")}
              onMouseLeave={e => (e.currentTarget.style.background = "white")}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{a.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{a.cat}{a.alwaysOn ? " · always-on" : ""}</div>
              </div>
              <div style={{ textAlign: "right", fontSize: 12, fontWeight: 600, color: "var(--green)", flexShrink: 0 }}>{a.rw}W</div>
            </button>
          ))}
        </div>
      )}
      {query.trim() && results.length === 0 && (
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, padding: "8px 0" }}>No match. Add manually below.</div>
      )}

      {/* Custom toggle */}
      <button onClick={() => setShowCustom(!showCustom)} style={{ fontSize: 13, color: "var(--green-mid)", background: "none", border: "none", cursor: "pointer", padding: "4px 0", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        {showCustom ? "−" : "+"} Can't find it? Add manually
      </button>

      {showCustom && (
        <div style={{ background: "var(--green-xl)", borderRadius: 10, padding: 14, marginBottom: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 90px", gap: 8, marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Appliance name</div>
              <input type="text" value={customName} onChange={e => setCustomName(e.target.value)} placeholder="e.g. Borehole pump"
                style={{ width: "100%", height: 36, border: "1.5px solid var(--border)", borderRadius: 8, padding: "0 10px", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Watts (W)</div>
              <input type="number" value={customW} onChange={e => setCustomW(e.target.value)} placeholder="750" min={1}
                style={{ width: "100%", height: 36, border: "1.5px solid var(--border)", borderRadius: 8, padding: "0 10px", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
            </div>
          </div>
          <button onClick={addCustom} className="btn-outline" style={{ fontSize: 13, padding: "8px 16px" }}>Add appliance</button>
        </div>
      )}

      {/* Added list */}
      {appliances.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--muted)", fontSize: 13 }}>No appliances added yet. Search above to get started.</div>
      ) : (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            Added appliances ({appliances.length})
          </div>
          {appliances.map(a => <ApplianceRow key={a.uid} app={a} onChange={onChange} onRemove={onRemove} />)}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button onClick={onBack} className="btn-outline" style={{ flex: 1 }}>← Back</button>
        <button onClick={onNext} disabled={appliances.length === 0 || !hasLoad}
          className="btn-wa" style={{ flex: 2, background: "var(--green)", boxShadow: "none", justifyContent: "center", opacity: appliances.length === 0 || !hasLoad ? 0.5 : 1 }}>
          Calculate my system →
        </button>
      </div>
    </Card>
  );
}

// ─── Step 3: Results ──────────────────────────────────────────────────────────

function Step3({ appliances, location, psh, onBack, onRestart }: {
  appliances: Appliance[]; location: string; psh: number;
  onBack: () => void; onRestart: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const r = calcSystem(appliances, psh);

  const flags: Array<{ type: "warn" | "info"; title: string; desc: string }> = [];
  const zeroApps = appliances.filter(a => a.dayH === 0 && a.nightH === 0);
  if (zeroApps.length) flags.push({ type: "warn", title: `${zeroApps.length} appliance${zeroApps.length > 1 ? "s" : ""} set to 0 hours`, desc: `${zeroApps.map(a => a.name).join(", ")} will not be counted. Adjust the hours sliders to include them.` });
  if (r.maxSurgeKVA > r.rawInvKVA && r.worstA) flags.push({ type: "warn", title: "Inverter sized up for motor startup surge", desc: `${r.worstA.name} has a ${r.worstA.surge}x startup surge. Running load alone would need ${r.rawInvKVA.toFixed(1)} kVA, bumped to ${fmtKVA(r.invKVA)} kVA.` });
  if (r.invKVA >= 8) flags.push({ type: "warn", title: `Large inverter: ${fmtKVA(r.invKVA)} kVA`, desc: "Professional installation with properly rated cables and earthing is essential at this size." });
  if (r.battKWh >= 20) flags.push({ type: "warn", title: `Large battery bank: ${r.battKWh.toFixed(1)} kWh`, desc: "Consider whether all appliances need to run overnight. Reducing night-time AC use can significantly cut battery size." });
  flags.push({ type: "info", title: `Recommended system voltage: ${r.sysVoltage}V`, desc: `Based on your battery size of ${r.battKWh.toFixed(1)} kWh. ${r.sysVoltage === 48 ? "48V systems are more efficient at this scale with lower cable losses." : r.sysVoltage === 24 ? "24V is suitable for systems up to about 3 kWh." : "12V suits very small systems only."}` });

  function buildWAMsg() {
    const lines = appliances.map(a => `  - ${a.name} x${a.qty} (${a.dayH}h day + ${a.nightH}h night)`).join("\n");
    return `Hello LumaGrid Solar! I used your sizing calculator.\n\n*Location:* ${location} State\n*Appliances:*\n${lines}\n\n*Recommended system:*\n  Panels: ${r.panelKW.toFixed(2)} kW (~${r.panelCount} x 400W)\n  Battery: ${r.battKWh.toFixed(2)} kWh\n  Inverter: ${fmtKVA(r.invKVA)} kVA\n  System voltage: ${r.sysVoltage}V\n  Daily energy: ${(r.totalWh / 1000).toFixed(2)} kWh/day\n\nPlease send me a quote. Thank you.`;
  }

  function copyResults() {
    const lines = appliances.map(a => `  ${a.name} x${a.qty} -- ${a.dayH}h day, ${a.nightH}h night`).join("\n");
    const text = `LumaGrid Solar -- System Sizing Result\nLocation: ${location} State (rainy season sizing)\n\nAPPLIANCES:\n${lines}\n\nRECOMMENDED SYSTEM:\n  Solar panels:   ${r.panelKW.toFixed(2)} kW (~${r.panelCount} x 400W panels)\n  Battery bank:   ${r.battKWh.toFixed(2)} kWh usable\n  Inverter:       ${fmtKVA(r.invKVA)} kVA\n  System voltage: ${r.sysVoltage}V\n  Daily energy:   ${(r.totalWh / 1000).toFixed(2)} kWh/day\n  Backup time:    ~${r.backupHrs} hours\n\nGet a quote: wa.me/${WHATSAPP_NUMBER}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  }

  const statCard = (icon: string, label: string, val: string, unit: string) => (
    <div style={{ background: "var(--green-xl)", borderRadius: 10, padding: "14px 8px", textAlign: "center" }}>
      <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>{label}</div>
      <div className="brig" style={{ fontSize: 24, fontWeight: 800, color: "var(--green)", lineHeight: 1.1 }}>{val}</div>
      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{unit}</div>
    </div>
  );

  return (
    <Card>
      <h2 className="brig" style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Your recommended system</h2>
      <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 20 }}>{location} State · Rainy season sizing · {appliances.length} appliance type{appliances.length !== 1 ? "s" : ""}</p>

      {/* Main stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 10 }}>
        {statCard("☀️", "Solar panels", r.panelKW.toFixed(2), "kW capacity")}
        {statCard("🔋", "Battery bank", r.battKWh.toFixed(2), "kWh usable")}
        {statCard("⚡", "Inverter", fmtKVA(r.invKVA), "kVA rating")}
      </div>

      {/* Extra row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          ["~" + r.panelCount, "× 400W panels (approx)"],
          [r.totalLoadKW, "kW total load"],
          [String(r.sysVoltage), "V system voltage"],
        ].map(([val, lbl]) => (
          <div key={lbl} style={{ background: "var(--green-xl)", borderRadius: 8, padding: "8px", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--green)" }}>{val}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{ background: "var(--green-xl)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px", marginBottom: 16, fontSize: 13, color: "var(--green)", lineHeight: 1.75 }}>
        Your system needs <strong>{(r.totalWh / 1000).toFixed(1)} kWh</strong> per day. The <strong>{r.panelKW.toFixed(2)} kW</strong> panel array produces about <strong>{(r.panelKW * r.effectivePSH * 0.75).toFixed(1)} kWh</strong> on a typical rainy-season day. The <strong>{r.battKWh.toFixed(1)} kWh</strong> battery covers overnight and cloud-cover load for approximately <strong>{r.backupHrs} hours</strong>. The <strong>{fmtKVA(r.invKVA)} kVA</strong> inverter handles your full <strong>{r.totalLoadKW} kW</strong> connected load, including motor startup surges.
      </div>

      {/* Flags */}
      {flags.map((f, i) => <Flag key={i} {...f} />)}

      {/* Share */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={copyResults} style={{
          display: "inline-flex", alignItems: "center", gap: 6, background: "none",
          border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`, borderRadius: 8,
          padding: "7px 12px", fontSize: 12, color: copied ? "var(--green)" : "var(--muted)", cursor: "pointer",
        }}>
          {copied ? "✓ Copied!" : "📋 Copy summary"}
        </button>
        <button onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 12px", fontSize: 12, color: "var(--muted)", cursor: "pointer" }}>
          🖨️ Print
        </button>
      </div>

      {/* Details toggle */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <button onClick={() => setShowDetails(!showDetails)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 16px", fontSize: 12, color: "var(--muted)", cursor: "pointer" }}>
          {showDetails ? "▲ Hide details" : "▼ Read details"}
        </button>
      </div>

      {showDetails && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ background: "var(--green-xl)", borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 12, color: "var(--muted)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--text)" }}>Sizing breakdown:</strong><br />
            Inverter: {(r.totalEffW / 1000).toFixed(2)} kW × 1.25 = {r.rawInvKVA.toFixed(2)} kVA. Surge check = {r.maxSurgeKVA.toFixed(2)} kVA. Using <strong>{fmtKVA(r.invKVA)} kVA</strong> (min 3 kVA).<br />
            Battery: {(r.nightWh / 1000).toFixed(2)} kWh night + {(r.cloudBufWh / 1000).toFixed(2)} kWh cloud buffer = {(r.rawBattWh / 1000).toFixed(2)} kWh / 80% DoD × 1.2 = <strong>{r.battKWh.toFixed(2)} kWh</strong>.<br />
            Backup: {r.battKWh.toFixed(2)} kWh × 80% / {(r.nightEffW > 0 ? r.nightEffW : r.totalEffW).toFixed(0)}W = <strong>{r.backupHrs} hours</strong>.<br />
            Panels: {(r.totalWh / 1000).toFixed(2)} kWh / {r.effectivePSH.toFixed(2)} PSH / 0.75 = <strong>{r.panelKW.toFixed(2)} kW</strong> (~{r.panelCount} × 400W panels).
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Energy breakdown</div>
          <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "var(--green)" }}>
                  {["Appliance", "Qty", "Day Wh", "Night Wh", "Total"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: h === "Appliance" ? "left" : "right", color: "white", fontWeight: 700, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appliances.map((a, i) => {
                  const ew = effW(a);
                  const dw = Math.round(a.qty * ew * a.dayH);
                  const nw = Math.round(a.qty * ew * a.nightH);
                  return (
                    <tr key={a.uid} style={{ background: i % 2 === 0 ? "white" : "var(--green-xl)", opacity: dw + nw === 0 ? 0.4 : 1 }}>
                      <td style={{ padding: "8px 10px", fontSize: 12 }}>{a.name}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right" }}>{a.qty}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right" }}>{dw}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right" }}>{nw}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 700 }}>{dw + nw}</td>
                    </tr>
                  );
                })}
                <tr style={{ background: "var(--green-xl)", fontWeight: 700 }}>
                  <td style={{ padding: "8px 10px" }} colSpan={2}>Total (effective Wh)</td>
                  <td style={{ padding: "8px 10px", textAlign: "right" }}>{Math.round(r.dayWh)}</td>
                  <td style={{ padding: "8px 10px", textAlign: "right" }}>{Math.round(r.nightWh)}</td>
                  <td style={{ padding: "8px 10px", textAlign: "right" }}>{Math.round(r.totalWh)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.6, marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
            Wh figures use effective wattage (rated W / efficiency %). Cloud buffer covers daytime load only. Battery: nighttime Wh + 4h daytime cloud buffer / 80% DoD × 1.2 safety. Panel count assumes 400W modules.
          </div>
        </div>
      )}

      {/* WhatsApp CTA */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <div className="brig" style={{ fontSize: 14, fontWeight: 700, color: "var(--green)", marginBottom: 4 }}>Get a quote from LumaGrid Solar</div>
        <p style={{ fontSize: 12, color: "#3a6b52", marginBottom: 12 }}>Send your system summary and we will follow up within 24 hours.</p>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWAMsg())}`} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ width: "100%", justifyContent: "center" }}>
          <WhatsAppIcon size={18} /> Chat on WhatsApp
        </a>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onBack} className="btn-outline" style={{ flex: 1 }}>✏️ Edit appliances</button>
        <button onClick={onRestart} className="btn-outline" style={{ flex: 1 }}>↺ Start over</button>
      </div>
    </Card>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SolarCalculator() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("Rivers");
  const [psh, setPsh] = useState(4.5);
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [counter, setCounter] = useState(0);

  const counterRef = useRef(0);

  const addAppliance = useCallback((a: ApplianceDB) => {
    counterRef.current += 1;
    const uid = counterRef.current;
    setAppliances(prev => [...prev, {
      uid, id: a.id, name: a.name, rw: a.rw, eff: a.eff,
      surge: a.surge ?? 1, alwaysOn: !!a.alwaysOn, duty: a.duty ?? 1,
      qty: 1, dayH: a.defaultDay, nightH: a.defaultNight,
    }]);
  }, []);

  const changeAppliance = useCallback((uid: number, field: "qty" | "dayH" | "nightH", val: number) => {
    setAppliances(prev => prev.map(a => a.uid === uid ? { ...a, [field]: val } : a));
  }, []);

  const removeAppliance = useCallback((uid: number) => {
    setAppliances(prev => prev.filter(a => a.uid !== uid));
  }, []);

  function restart() {
    setAppliances([]); counterRef.current = 0; setLocation("Rivers"); setPsh(4.5); setStep(1);
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Steps current={step} />
      {step === 1 && (
        <Step1 location={location}
          onSelect={(s, p) => { setLocation(s); setPsh(p); }}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2 appliances={appliances}
          onAdd={addAppliance} onChange={changeAppliance} onRemove={removeAppliance}
          onBack={() => setStep(1)} onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <Step3 appliances={appliances} location={location} psh={psh}
          onBack={() => setStep(2)} onRestart={restart}
        />
      )}
    </div>
  );
}