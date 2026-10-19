"use client";

/* ============================================================================
   LumaGrid solar sizing calculator — money first, system second.

   Flow:
     1. "What is your generator costing you?"  → the hook. Real naira, now.
     2. "What do you need to power?"           → presets, not a blank search box.
     3. "Solar pays for itself in N months"    → payback, then the system spec.

   Mobile-first: layout is CSS (see globals.css .calc-*), tap targets >= 44px,
   steppers and segmented controls instead of fiddly sliders, and a sticky
   action bar so the primary CTA is always reachable on a long list.
   ============================================================================ */

import { useState, useCallback, useMemo, useRef } from "react";
import {
  PETROL_PRICE_NGN,
  PETROL_PRICE_ASOF,
  PETROL_PRICE_NOTE,
  GENERATOR_SERVICE_NGN_PER_YEAR,
  PRICING,
} from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import type { QuoteState } from "@/lib/quote";
import {
  Home, Building, Store, Sliders, FuelPump, TrendDown, Calendar,
  SolarPanel, Battery, Inverter, MapPin, Search, Check, AlertTriangle, Info,
  Copy, Printer, Pencil, Restart, ArrowRight, ArrowLeft, Plus, Minus, X,
  ChevronDown, ChevronUp, Lightbulb, Fan, Snowflake, Fridge, Tv, Laptop,
  Smartphone, Microwave, Shirt, Droplet, HeartPulse, Camera, Plug,
  type IconProps,
} from "@/components/ui/icons";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ApplianceDB {
  id: string; cat: string; name: string; rw: number; eff: number;
  surge: number; alwaysOn?: boolean; duty?: number;
  defaultDay: number; defaultNight: number;
}

type UsageLevel = "light" | "normal" | "heavy" | "custom";

interface Appliance {
  uid: number; id: string; name: string; cat: string; rw: number; eff: number;
  surge: number; alwaysOn: boolean; duty: number;
  qty: number; dayH: number; nightH: number;
  /** Untouched defaults, so switching usage level can recompute hours. */
  baseDay: number; baseNight: number;
  level: UsageLevel;
}

interface CalcResult {
  dayWh: number; nightWh: number; totalWh: number; totalEffW: number;
  dayEffW: number; nightEffW: number; panelKW: number; panelCount: number;
  battKWh: number; invKVA: number; cloudBufWh: number; rawBattWh: number;
  effectivePSH: number; rawInvKVA: number; maxSurgeKVA: number;
  clampedKVA: number; backupHrs: string; sysVoltage: number;
  totalLoadKW: string; worstA: Appliance | null;
  estLow: number; estHigh: number; estMid: number;
}

// ─── Appliance database ──────────────────────────────────────────────────────

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
  // Air conditioners are thermostatic: once the room reaches setpoint the
  // compressor cycles, so average draw is well below rated. Conventional
  // units cycle on/off (~0.75); inverter units modulate down further (~0.65).
  { id: "ac05", cat: "Air conditioning", name: "1HP split AC", rw: 850, eff: 85, surge: 3, duty: 0.75, defaultDay: 3, defaultNight: 7 },
  { id: "ac15", cat: "Air conditioning", name: "1.5HP split AC", rw: 1120, eff: 85, surge: 3, duty: 0.75, defaultDay: 3, defaultNight: 7 },
  { id: "ac2", cat: "Air conditioning", name: "2HP split AC", rw: 1500, eff: 85, surge: 3, duty: 0.75, defaultDay: 2, defaultNight: 8 },
  { id: "ac25", cat: "Air conditioning", name: "2.5HP split AC", rw: 1900, eff: 85, surge: 3, duty: 0.75, defaultDay: 2, defaultNight: 8 },
  { id: "inv15", cat: "Air conditioning", name: "1.5HP inverter AC", rw: 700, eff: 95, surge: 2, duty: 0.65, defaultDay: 3, defaultNight: 7 },
  { id: "inv2", cat: "Air conditioning", name: "2HP inverter AC", rw: 950, eff: 95, surge: 2, duty: 0.65, defaultDay: 2, defaultNight: 8 },
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
  { id: "cctv", cat: "Security", name: "CCTV (4 cameras)", rw: 60, eff: 85, surge: 1, alwaysOn: true, duty: 1, defaultDay: 12, defaultNight: 12 },
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

const CAT_ICON: Record<string, (p: IconProps) => React.ReactElement> = {
  Lighting: Lightbulb,
  Fans: Fan,
  "Air conditioning": Snowflake,
  Refrigeration: Fridge,
  Entertainment: Tv,
  Computing: Laptop,
  Phones: Smartphone,
  Kitchen: Microwave,
  Laundry: Shirt,
  Pumps: Droplet,
  Security: Camera,
  Medical: HeartPulse,
  Custom: Plug,
};

function CatIcon({ cat, size = 18 }: { cat: string; size?: number }) {
  const I = CAT_ICON[cat] ?? Plug;
  return <I size={size} />;
}

// ─── Load presets — the alternative to facing an empty search box ────────────

interface Preset {
  id: string;
  name: string;
  desc: string;
  Icon: (p: IconProps) => React.ReactElement;
  items: [string, number][];
}

/**
 * Appliance lists mirror what the Starter and Family packages advertise, so a
 * visitor who picks "1–2 bedroom" here lands in the same ballpark as the
 * package pricing further down the page instead of seeing two different numbers.
 */
const PRESETS: Preset[] = [
  {
    id: "flat2", name: "1–2 bedroom", desc: "Lights, fans, TV, small fridge",
    Icon: Home,
    items: [["led9", 6], ["cfan", 2], ["tv32", 1], ["dstv", 1], ["frsmall", 1], ["router", 1], ["phone2", 1]],
  },
  {
    id: "flat4", name: "3–4 bedroom", desc: "Adds AC, big fridge, washing machine",
    Icon: Building,
    items: [["led9", 10], ["cfan", 3], ["tv43", 1], ["dstv", 1], ["frlarge", 1], ["inv15", 1],
            ["washmach", 1], ["flood50", 2], ["router", 1], ["phone2", 1]],
  },
  {
    id: "shop", name: "Shop / small office", desc: "AC, freezer, computers, CCTV",
    Icon: Store,
    items: [["led15", 8], ["inv15", 1], ["chest", 1], ["laptop", 2], ["router", 1], ["cctv", 1], ["stand", 2]],
  },
  {
    id: "custom", name: "Build my own", desc: "Start from an empty list",
    Icon: Sliders,
    items: [],
  },
];

const LEVEL_FACTOR: Record<Exclude<UsageLevel, "custom">, number> = {
  light: 0.6, normal: 1, heavy: 1.5,
};

function hoursForLevel(base: number, level: UsageLevel, cap: number) {
  if (level === "custom") return base;
  const v = Math.round(base * LEVEL_FACTOR[level] * 2) / 2;
  return Math.min(cap, v);
}

// ─── Locations ───────────────────────────────────────────────────────────────

const LOCATIONS = [
  { state: "Rivers", psh: 4.5, cities: "Port Harcourt, Bonny" },
  { state: "Delta", psh: 4.6, cities: "Warri, Asaba, Abraka" },
  { state: "Bayelsa", psh: 4.4, cities: "Yenagoa, Brass" },
];

// ─── Money helpers ───────────────────────────────────────────────────────────

const naira = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

/** Compact naira for headline figures: ₦3.4M, ₦850k. */
function nairaShort(n: number) {
  if (n >= 1_000_000) return "₦" + (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1) + "M";
  if (n >= 1_000) return "₦" + Math.round(n / 1_000) + "k";
  return "₦" + Math.round(n);
}

function monthsToHuman(m: number) {
  if (!Number.isFinite(m) || m <= 0) return "--";
  if (m < 12) return `${Math.round(m)} months`;
  const y = Math.floor(m / 12);
  const rem = Math.round(m % 12);
  if (rem === 0) return `${y} year${y > 1 ? "s" : ""}`;
  return `${y}y ${rem}m`;
}

// ─── Sizing engine ───────────────────────────────────────────────────────────

const effW = (a: Pick<Appliance, "rw" | "eff">) => a.rw / (a.eff / 100);
const surgeKVA = (a: Appliance) => (effW(a) * a.qty * a.surge) / 1000;

/**
 * Energy actually consumed per hour of being "on".
 *
 * Thermostatic loads — fridges, freezers, air conditioners — do not draw
 * rated power continuously; the compressor cycles once the target temperature
 * is reached. Ignoring this overstates a fridge's daily energy by roughly 3x.
 * Duty applies to ENERGY only. Inverter sizing below deliberately uses full
 * rated draw, because the compressor does pull its full load when it kicks in.
 */
const energyW = (a: Appliance) => effW(a) * (a.duty ?? 1);

function calcSystem(appliances: Appliance[], psh: number): CalcResult {
  let dayWh = 0, nightWh = 0, totalEffW = 0, dayEffW = 0, nightEffW = 0;
  appliances.forEach(a => {
    const ew = effW(a);          // full draw — inverter sizing
    const enW = energyW(a);      // duty-adjusted — energy totals
    dayWh += a.qty * enW * a.dayH;
    nightWh += a.qty * enW * a.nightH;
    totalEffW += a.qty * ew;
    if (a.dayH > 0) dayEffW += a.qty * ew;
    if (a.nightH > 0) nightEffW += a.qty * ew;
  });
  const totalWh = dayWh + nightWh;
  const effectivePSH = psh * 0.80;
  const panelKW = (totalWh / 1000) / effectivePSH / 0.75;
  const panelCount = Math.ceil(panelKW * 1000 / 400);
  /**
   * Rainy-season cloud buffer: assume 4 of roughly 12 daylight hours are too
   * overcast to generate, so the battery carries a third of the day's load.
   * (The previous model assumed every daytime appliance ran simultaneously
   * for 4 hours, which stacked on top of the 80% DoD and 1.2 safety factor
   * and produced batteries around twice the size actually needed.)
   */
  const cloudBufWh = dayWh / 3;
  const rawBattWh = nightWh + cloudBufWh;
  const battKWh = (rawBattWh / 1000 / 0.80) * 1.20;
  const rawInvKVA = (totalEffW / 1000) * 1.25;
  const worstA = appliances.length
    ? appliances.reduce((mx, a) => (surgeKVA(a) > surgeKVA(mx) ? a : mx), appliances[0])
    : null;
  const maxSurgeKVA = worstA
    ? ((totalEffW - worstA.qty * effW(worstA)) + worstA.qty * effW(worstA) * worstA.surge) / 1000
    : 0;
  const clampedKVA = Math.max(3, rawInvKVA, maxSurgeKVA);
  const invKVA = INV_SIZES.find(s => s >= clampedKVA) ?? Math.ceil(clampedKVA / 5) * 5;
  const sysVoltage = battKWh < 1.2 ? 12 : battKWh < 3 ? 24 : 48;
  const battUsableWh = battKWh * 1000 * 0.80;
  const backupLoad = nightEffW > 0 ? nightEffW : totalEffW;
  const backupHrs = backupLoad > 0 ? (battUsableWh / backupLoad).toFixed(1) : "--";
  const totalLoadKW = (totalEffW / 1000).toFixed(2);

  // Indicative install price — a range, never a hard quote.
  const estMid =
    PRICING.perKvaInverter * invKVA +
    PRICING.perKwhBattery * battKWh +
    PRICING.perKwPanel * panelKW +
    PRICING.balanceOfSystem;
  const estLow = estMid * (1 - PRICING.rangeSpread);
  const estHigh = estMid * (1 + PRICING.rangeSpread);

  return {
    dayWh, nightWh, totalWh, totalEffW, dayEffW, nightEffW, panelKW, panelCount,
    battKWh, invKVA, cloudBufWh, rawBattWh, effectivePSH, rawInvKVA, maxSurgeKVA,
    clampedKVA, backupHrs, sysVoltage, totalLoadKW, worstA, estLow, estHigh, estMid,
  };
}

const fmtKVA = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

// ─── Shared bits ─────────────────────────────────────────────────────────────

function Rail({ step }: { step: number }) {
  return (
    <div className="calc-rail" aria-label={`Step ${step} of 3`}>
      {[1, 2, 3].map(n => (
        <span key={n} className={n === step ? "on" : n < step ? "done" : ""} />
      ))}
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
      <span style={{ color: warn ? "#a16207" : "var(--ink)", marginTop: 1 }}>
        {warn ? <AlertTriangle size={17} /> : <Info size={17} />}
      </span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: warn ? "#92400e" : "var(--ink)", marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: warn ? "#92400e" : "var(--muted)", lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function Stepper({ value, min, max, step = 1, onChange, label }: {
  value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; label: string;
}) {
  return (
    <div className="stepper">
      <button type="button" aria-label={`Decrease ${label}`} disabled={value <= min}
        onClick={() => onChange(Math.max(min, Math.round((value - step) * 10) / 10))}>
        <Minus size={17} />
      </button>
      <span className="val">{value}</span>
      <button type="button" aria-label={`Increase ${label}`} disabled={value >= max}
        onClick={() => onChange(Math.min(max, Math.round((value + step) * 10) / 10))}>
        <Plus size={17} />
      </button>
    </div>
  );
}

// ─── Step 1: what the generator costs ────────────────────────────────────────

const SPEND_CHIPS = [5_000, 10_000, 20_000, 35_000, 50_000];

function Step1({
  weekly, setWeekly, petrol, setPetrol, location, setLocation, onNext,
}: {
  weekly: number; setWeekly: (v: number) => void;
  petrol: number; setPetrol: (v: number) => void;
  location: string; setLocation: (s: string, psh: number) => void;
  onNext: () => void;
}) {
  const [showPrice, setShowPrice] = useState(false);

  const litresWeek = weekly / petrol;
  const yearly = weekly * 52 + (weekly > 0 ? GENERATOR_SERVICE_NGN_PER_YEAR : 0);
  const monthly = yearly / 12;

  return (
    <div className="calc-card">
      <h3 className="calc-q">What is your generator costing you?</h3>
      <p className="calc-sub">
        Tap the closest amount, then fine-tune. This is fuel only — we add servicing for you.
      </p>

      <div className="chip-row no-scrollbar">
        {SPEND_CHIPS.map(v => (
          <button key={v} type="button"
            className={`chip${weekly === v ? " on" : ""}`}
            onClick={() => setWeekly(v)}>
            {naira(v)}<span style={{ opacity: 0.65, fontWeight: 500 }}> /week</span>
          </button>
        ))}
      </div>

      <label htmlFor="weekly-spend" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>Fuel spend per week</span>
        <span className="brig" style={{ fontSize: 20, fontWeight: 800 }}>{naira(weekly)}</span>
      </label>
      <input id="weekly-spend" type="range" min={0} max={100_000} step={1_000}
        value={weekly} onChange={e => setWeekly(Number(e.target.value))} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--muted)", marginBottom: 18 }}>
        <span>₦0</span>
        <span>{litresWeek > 0 ? `≈ ${litresWeek.toFixed(0)} litres/week` : "No generator"}</span>
        <span>₦100k</span>
      </div>

      {/* Petrol price — disclosed, adjustable, dated */}
      <button type="button" onClick={() => setShowPrice(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 8, width: "100%",
          background: "var(--green-xl)", border: "1px solid var(--border)",
          borderRadius: 9, padding: "11px 13px", cursor: "pointer",
          minHeight: 44, textAlign: "left", marginBottom: showPrice ? 10 : 18,
        }}>
        <FuelPump size={17} />
        <span style={{ flex: 1, fontSize: 13, color: "var(--muted)" }}>
          Petrol at <strong style={{ color: "var(--ink)" }}>{naira(petrol)}/litre</strong>
          <span style={{ opacity: 0.75 }}> · {PETROL_PRICE_ASOF}</span>
        </span>
        {showPrice ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {showPrice && (
        <div style={{ background: "var(--green-xl)", borderRadius: 9, padding: "14px 13px", marginBottom: 18 }}>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 10, lineHeight: 1.6 }}>
            {PETROL_PRICE_NOTE}, {PETROL_PRICE_ASOF}. Prices move fast — set what you actually pay.
          </div>
          <input type="range" min={700} max={2_500} step={10}
            value={petrol} onChange={e => setPetrol(Number(e.target.value))}
            aria-label="Petrol price per litre" />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--muted)" }}>
            <span>₦700</span>
            <strong style={{ color: "var(--ink)" }}>{naira(petrol)}/L</strong>
            <span>₦2,500</span>
          </div>
        </div>
      )}

      {/* The hook */}
      <div style={{ background: "var(--ink)", borderRadius: 12, padding: "20px 18px", marginBottom: 18 }}>
        {weekly > 0 ? (
          <>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>
              Your generator burns about
            </div>
            <div className="brig" style={{ fontSize: "clamp(34px, 11vw, 52px)", fontWeight: 800, color: "var(--lime)", lineHeight: 1, letterSpacing: "-0.03em" }}>
              {naira(yearly)}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 6 }}>
              every year — that is {naira(monthly)}/month, gone for good.
            </div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)", marginTop: 10, lineHeight: 1.6 }}>
              {naira(weekly * 52)} fuel + {naira(GENERATOR_SERVICE_NGN_PER_YEAR)} servicing, oil and repairs
            </div>
          </>
        ) : (
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.7 }}>
            No generator? No problem. Skip ahead and we will still size a system
            around exactly what you want to run.
          </div>
        )}
      </div>

      {/* Location */}
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        <MapPin size={15} /> Where is the property?
      </div>
      <div className="chip-row no-scrollbar" style={{ marginBottom: 4 }}>
        {LOCATIONS.map(loc => (
          <button key={loc.state} type="button"
            className={`chip${location === loc.state ? " on" : ""}`}
            onClick={() => setLocation(loc.state, loc.psh)}>
            {loc.state}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 4, lineHeight: 1.6 }}>
        Sets your peak sun hours. Every system here is sized for rainy season, not the best-case month.
      </div>

      <div className="calc-sticky">
        <button type="button" className="btn-lime" style={{ flex: 1 }} onClick={onNext}>
          Next: what to power <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: the load ────────────────────────────────────────────────────────

function ApplianceRow({ app, onQty, onLevel, onHours, onRemove }: {
  app: Appliance;
  onQty: (uid: number, v: number) => void;
  onLevel: (uid: number, l: UsageLevel) => void;
  onHours: (uid: number, field: "dayH" | "nightH", v: number) => void;
  onRemove: (uid: number) => void;
}) {
  const [exact, setExact] = useState(false);
  const isZero = app.dayH === 0 && app.nightH === 0;
  const kwh = (app.qty * energyW(app) * (app.dayH + app.nightH)) / 1000;

  return (
    <div className={`app-row${isZero ? " muted" : ""}`}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
        <span style={{ color: "var(--ink)" }}><CatIcon cat={app.cat} /></span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3 }}>{app.name}</div>
          <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>
            {app.rw}W{app.surge > 1 ? ` · ${app.surge}x surge` : ""} · {kwh.toFixed(2)} kWh/day
          </div>
        </div>
        <button type="button" onClick={() => onRemove(app.uid)} aria-label={`Remove ${app.name}`}
          style={{
            width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center",
            justifyContent: "center", background: "none", border: "none",
            color: "var(--muted)", cursor: "pointer", borderRadius: 8,
          }}>
          <X size={17} />
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 12.5, color: "var(--muted)", flex: 1 }}>How many?</span>
        <Stepper value={app.qty} min={1} max={60} label={`${app.name} quantity`}
          onChange={v => onQty(app.uid, v)} />
      </div>

      <div className="seg" style={{ marginBottom: exact ? 10 : 0 }}>
        {(["light", "normal", "heavy"] as const).map(l => (
          <button key={l} type="button"
            className={app.level === l ? "on" : ""}
            onClick={() => onLevel(app.uid, l)}>
            {l === "light" ? "Light use" : l === "normal" ? "Normal" : "Heavy use"}
          </button>
        ))}
      </div>

      <button type="button" onClick={() => setExact(v => !v)}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: "8px 0 0",
          fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 5,
        }}>
        {exact ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {exact ? "Hide exact hours" : `Exact hours: ${app.dayH}h day, ${app.nightH}h night`}
      </button>

      {exact && (
        <div style={{ marginTop: 8 }}>
          {([
            { field: "dayH" as const, label: "Day hours", max: 18 },
            { field: "nightH" as const, label: "Night hours", max: 12 },
          ]).map(({ field, label, max }) => (
            <div key={field} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 12.5, color: "var(--muted)", flex: 1 }}>{label}</span>
              <Stepper value={app[field]} min={0} max={max} step={0.5} label={label}
                onChange={v => onHours(app.uid, field, v)} />
            </div>
          ))}
        </div>
      )}

      {isZero && (
        <div style={{ fontSize: 11.5, color: "#92400e", marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
          <AlertTriangle size={14} /> Set to zero hours — not counted.
        </div>
      )}
    </div>
  );
}

function Step2({
  appliances, presetId, onPreset, onAdd, onQty, onLevel, onHours, onRemove, onBack, onNext,
}: {
  appliances: Appliance[];
  presetId: string | null;
  onPreset: (p: Preset) => void;
  onAdd: (a: ApplianceDB) => void;
  onQty: (uid: number, v: number) => void;
  onLevel: (uid: number, l: UsageLevel) => void;
  onHours: (uid: number, field: "dayH" | "nightH", v: number) => void;
  onRemove: (uid: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [query, setQuery] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customW, setCustomW] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return DB.filter(a => a.name.toLowerCase().includes(q) || a.cat.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const dailyKWh = useMemo(
    () => appliances.reduce((s, a) => s + (a.qty * energyW(a) * (a.dayH + a.nightH)) / 1000, 0),
    [appliances],
  );
  const hasLoad = appliances.some(a => a.dayH > 0 || a.nightH > 0);

  function addCustom() {
    const rw = parseInt(customW, 10);
    if (!customName.trim() || !rw || rw < 1) return;
    onAdd({
      id: "c" + Date.now(), cat: "Custom", name: customName.trim(),
      rw, eff: 80, surge: 1, defaultDay: 4, defaultNight: 2,
    });
    setCustomName(""); setCustomW(""); setShowCustom(false);
  }

  return (
    <div className="calc-card">
      <h3 className="calc-q">What do you need to power?</h3>
      <p className="calc-sub">
        Pick the closest match — we fill in the appliances for you. Adjust anything after.
      </p>

      <div className="preset-grid" style={{ marginBottom: 20 }}>
        {PRESETS.map(p => {
          const on = presetId === p.id;
          return (
            <button key={p.id} type="button" onClick={() => onPreset(p)}
              style={{
                display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                border: `2px solid ${on ? "var(--ink)" : "var(--border)"}`,
                background: on ? "var(--ink)" : "#fff",
                color: on ? "#fff" : "var(--ink)",
                borderRadius: 11, padding: "14px 13px", cursor: "pointer",
                minHeight: 68, transition: "all 0.15s",
              }}>
              <span style={{
                width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: on ? "var(--lime)" : "var(--green-light)",
                color: "var(--ink)",
              }}>
                <p.Icon size={20} />
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 14, fontWeight: 700 }}>{p.name}</span>
                <span style={{ display: "block", fontSize: 11.5, opacity: 0.7, marginTop: 2, lineHeight: 1.4 }}>{p.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Added list */}
      {appliances.length > 0 && (
        <>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Your list ({appliances.length})
            </span>
            <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{dailyKWh.toFixed(1)} kWh/day</span>
          </div>
          {appliances.map(a => (
            <ApplianceRow key={a.uid} app={a}
              onQty={onQty} onLevel={onLevel} onHours={onHours} onRemove={onRemove} />
          ))}
        </>
      )}

      {/* Add more */}
      <div style={{ marginTop: appliances.length ? 16 : 0 }}>
        <div style={{ position: "relative", marginBottom: 8 }}>
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }}>
            <Search size={17} />
          </span>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder={appliances.length ? "Add another appliance..." : "Search: fan, fridge, AC, TV..."}
            aria-label="Search appliances"
            style={{
              width: "100%", minHeight: 46, border: "1.5px solid var(--border)",
              borderRadius: 10, padding: "0 13px 0 40px",
              outline: "none", background: "#fff", color: "var(--text)",
            }}
          />
        </div>

        {results.length > 0 && (
          <div className="search-results">
            {results.map(a => (
              <button key={a.id} type="button" onClick={() => { onAdd(a); setQuery(""); }}>
                <span style={{ color: "var(--ink)" }}><CatIcon cat={a.cat} size={17} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 13.5, fontWeight: 600 }}>{a.name}</span>
                  <span style={{ display: "block", fontSize: 11.5, color: "var(--muted)" }}>
                    {a.cat}{a.alwaysOn ? " · always-on" : ""}
                  </span>
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", flexShrink: 0 }}>{a.rw}W</span>
              </button>
            ))}
          </div>
        )}
        {query.trim() && results.length === 0 && (
          <div style={{ fontSize: 12.5, color: "var(--muted)", padding: "4px 0 10px" }}>
            No match — add it manually below.
          </div>
        )}

        <button type="button" onClick={() => setShowCustom(v => !v)}
          style={{
            display: "flex", alignItems: "center", gap: 6, minHeight: 40,
            background: "none", border: "none", cursor: "pointer",
            fontSize: 13, color: "var(--muted)", padding: 0,
          }}>
          {showCustom ? <Minus size={15} /> : <Plus size={15} />} Add something not listed
        </button>

        {showCustom && (
          <div style={{ background: "var(--green-xl)", borderRadius: 10, padding: 13, marginTop: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: 8, marginBottom: 10 }}>
              <div>
                <label htmlFor="c-name" style={{ display: "block", fontSize: 11.5, color: "var(--muted)", marginBottom: 4 }}>Appliance</label>
                <input id="c-name" type="text" value={customName} onChange={e => setCustomName(e.target.value)}
                  placeholder="Borehole pump"
                  style={{ width: "100%", minHeight: 42, border: "1.5px solid var(--border)", borderRadius: 8, padding: "0 10px", outline: "none" }} />
              </div>
              <div>
                <label htmlFor="c-watt" style={{ display: "block", fontSize: 11.5, color: "var(--muted)", marginBottom: 4 }}>Watts</label>
                <input id="c-watt" type="number" value={customW} onChange={e => setCustomW(e.target.value)}
                  placeholder="750" min={1}
                  style={{ width: "100%", minHeight: 42, border: "1.5px solid var(--border)", borderRadius: 8, padding: "0 10px", outline: "none" }} />
              </div>
            </div>
            <button type="button" onClick={addCustom} className="btn-outline" style={{ width: "100%", fontSize: 14 }}>
              Add to list
            </button>
          </div>
        )}
      </div>

      <div className="calc-sticky">
        <button type="button" onClick={onBack} aria-label="Back"
          style={{
            width: 46, height: 46, flexShrink: 0, display: "flex", alignItems: "center",
            justifyContent: "center", border: "1.5px solid var(--border)",
            borderRadius: 8, background: "#fff", cursor: "pointer", color: "var(--ink)",
          }}>
          <ArrowLeft size={18} />
        </button>
        <button type="button" className="btn-lime" style={{ flex: 1 }}
          disabled={!appliances.length || !hasLoad} onClick={onNext}>
          {appliances.length ? <>See my savings <ArrowRight size={17} /></> : "Pick a setup above"}
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: payback, then the system ────────────────────────────────────────

function SpecCard({ Icon, label, value, unit }: {
  Icon: (p: IconProps) => React.ReactElement; label: string; value: string; unit: string;
}) {
  return (
    <div style={{ background: "var(--green-xl)", border: "1px solid var(--border)", borderRadius: 11, padding: "16px 14px" }}>
      <span style={{ color: "var(--ink)", display: "block", marginBottom: 10 }}><Icon size={22} /></span>
      <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 3 }}>{label}</div>
      <div className="brig" style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{unit}</div>
    </div>
  );
}

function Step3({ appliances, location, psh, weekly, petrol, onBack, onRestart }: {
  appliances: Appliance[]; location: string; psh: number;
  weekly: number; petrol: number;
  onBack: () => void; onRestart: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const r = useMemo(() => calcSystem(appliances, psh), [appliances, psh]);

  const genYear = weekly * 52 + (weekly > 0 ? GENERATOR_SERVICE_NGN_PER_YEAR : 0);
  const genMonth = genYear / 12;
  const gen5 = genYear * 5;
  const paybackMonths = genMonth > 0 ? r.estMid / genMonth : Infinity;
  const keep5 = gen5 - r.estMid;
  const hasGen = weekly > 0;

  // Bar widths relative to the larger of the two figures.
  const maxBar = Math.max(gen5, r.estMid, 1);

  const flags: Array<{ type: "warn" | "info"; title: string; desc: string }> = [];
  const zeroApps = appliances.filter(a => a.dayH === 0 && a.nightH === 0);
  if (zeroApps.length) {
    flags.push({
      type: "warn",
      title: `${zeroApps.length} appliance${zeroApps.length > 1 ? "s" : ""} set to 0 hours`,
      desc: `${zeroApps.map(a => a.name).join(", ")} will not be counted. Go back and set usage to include them.`,
    });
  }
  if (r.maxSurgeKVA > r.rawInvKVA && r.worstA) {
    flags.push({
      type: "warn",
      title: "Inverter sized up for motor startup surge",
      desc: `${r.worstA.name} draws ${r.worstA.surge}x on startup. Running load alone needs ${r.rawInvKVA.toFixed(1)} kVA, bumped to ${fmtKVA(r.invKVA)} kVA.`,
    });
  }
  if (r.invKVA >= 8) {
    flags.push({
      type: "warn",
      title: `Large inverter: ${fmtKVA(r.invKVA)} kVA`,
      desc: "Professional installation with properly rated cables and earthing is essential at this size.",
    });
  }
  if (r.battKWh >= 20) {
    flags.push({
      type: "warn",
      title: `Large battery bank: ${r.battKWh.toFixed(1)} kWh`,
      desc: "Cutting night-time AC use is the fastest way to bring this down. Worth discussing at the site visit.",
    });
  }
  flags.push({
    type: "info",
    title: `Recommended system voltage: ${r.sysVoltage}V`,
    desc: `Based on a ${r.battKWh.toFixed(1)} kWh battery. ${
      r.sysVoltage === 48
        ? "48V is more efficient at this scale with lower cable losses."
        : r.sysVoltage === 24
          ? "24V suits systems up to about 3 kWh."
          : "12V suits very small systems only."
    }`,
  });

  function buildWAMsg() {
    const lines = appliances.map(a => `  - ${a.name} x${a.qty} (${a.dayH}h day + ${a.nightH}h night)`).join("\n");
    const gen = hasGen
      ? `\n*My generator today:*\n  ${naira(weekly)}/week fuel at ${naira(petrol)}/litre\n  ≈ ${naira(genYear)}/year with servicing\n`
      : "";
    return `*From the calculator:*${gen}\n*Appliances:*\n${lines}\n\n*Suggested system:*\n  Panels: ${r.panelKW.toFixed(2)} kW (~${r.panelCount} x 400W)\n  Battery: ${r.battKWh.toFixed(2)} kWh\n  Inverter: ${fmtKVA(r.invKVA)} kVA\n  System voltage: ${r.sysVoltage}V\n  Daily energy: ${(r.totalWh / 1000).toFixed(2)} kWh/day`;
  }

  function copyResults() {
    const lines = appliances.map(a => `  ${a.name} x${a.qty} -- ${a.dayH}h day, ${a.nightH}h night`).join("\n");
    const gen = hasGen
      ? `GENERATOR TODAY:\n  ${naira(weekly)}/week fuel at ${naira(petrol)}/L\n  ${naira(genYear)}/year including servicing\n  ${naira(gen5)} over 5 years\n\n`
      : "";
    const text = `LumaGrid Solar -- System Sizing Result\nLocation: ${location} State (rainy season sizing)\n\n${gen}APPLIANCES:\n${lines}\n\nSUGGESTED SYSTEM:\n  Solar panels:   ${r.panelKW.toFixed(2)} kW (~${r.panelCount} x 400W panels)\n  Battery bank:   ${r.battKWh.toFixed(2)} kWh usable\n  Inverter:       ${fmtKVA(r.invKVA)} kVA\n  System voltage: ${r.sysVoltage}V\n  Daily energy:   ${(r.totalWh / 1000).toFixed(2)} kWh/day\n  Backup time:    ~${r.backupHrs} hours\n  Indicative:     ${naira(r.estLow)} - ${naira(r.estHigh)}\n\nGet a quote: lumagridsolar.com/contact`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="calc-card">
      {/* ── Headline: the money ── */}
      <div style={{ background: "var(--ink)", borderRadius: 12, padding: "22px 18px", marginBottom: 16 }}>
        {hasGen ? (
          <>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>
              Going solar pays for itself in
            </div>
            <div className="brig" style={{ fontSize: "clamp(36px, 12vw, 56px)", fontWeight: 800, color: "var(--lime)", lineHeight: 1, letterSpacing: "-0.03em" }}>
              {monthsToHuman(paybackMonths)}
            </div>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", marginTop: 8, lineHeight: 1.6 }}>
              After that, the {naira(genMonth)} you spend on fuel each month stays in your pocket.
            </div>

            {/* Comparison bars */}
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", marginBottom: 5 }}>
                Generator, next 5 years
              </div>
              <div className="bar-track" style={{ background: "rgba(255,255,255,0.09)", marginBottom: 12 }}>
                <div className="bar-fill" style={{ width: `${(gen5 / maxBar) * 100}%`, background: "#e0574f" }}>
                  {naira(gen5)}
                </div>
              </div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", marginBottom: 5 }}>
                Solar, paid once
              </div>
              <div className="bar-track" style={{ background: "rgba(255,255,255,0.09)" }}>
                <div className="bar-fill" style={{ width: `${(r.estMid / maxBar) * 100}%`, background: "var(--lime)", color: "var(--ink)" }}>
                  {nairaShort(r.estLow)}–{nairaShort(r.estHigh)}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>
              Your system, sized for {location} State
            </div>
            <div className="brig" style={{ fontSize: "clamp(30px, 9vw, 44px)", fontWeight: 800, color: "var(--lime)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              {nairaShort(r.estLow)} – {nairaShort(r.estHigh)}
            </div>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", marginTop: 8, lineHeight: 1.6 }}>
              Indicative range for {(r.totalWh / 1000).toFixed(1)} kWh per day. Final price comes from the free site assessment.
            </div>
          </>
        )}
      </div>

      {hasGen && (
        <div className="money-grid" style={{ marginBottom: 18 }}>
          {[
            { Icon: FuelPump, label: "Generator, per year", value: naira(genYear) },
            { Icon: Calendar, label: "Break-even", value: monthsToHuman(paybackMonths) },
            { Icon: TrendDown, label: "You keep over 5 years", value: keep5 > 0 ? naira(keep5) : "--" },
          ].map(({ Icon, label, value }) => (
            <div key={label} style={{ background: "var(--green-xl)", border: "1px solid var(--border)", borderRadius: 10, padding: "13px 12px" }}>
              <span style={{ color: "var(--ink)", display: "block", marginBottom: 7 }}><Icon size={18} /></span>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 3 }}>{label}</div>
              <div className="brig" style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.15 }}>{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── The system ── */}
      <h3 className="calc-q" style={{ fontSize: "clamp(18px, 4.6vw, 22px)", marginBottom: 4 }}>
        What that system looks like
      </h3>
      <p className="calc-sub" style={{ marginBottom: 14 }}>
        {location} State · rainy-season sizing · {appliances.length} appliance type{appliances.length !== 1 ? "s" : ""}
      </p>

      <div className="spec-grid" style={{ marginBottom: 10 }}>
        <SpecCard Icon={SolarPanel} label="Solar panels" value={r.panelKW.toFixed(2)} unit={`kW · ~${r.panelCount} × 400W`} />
        <SpecCard Icon={Battery} label="Battery bank" value={r.battKWh.toFixed(1)} unit="kWh usable" />
        <SpecCard Icon={Inverter} label="Inverter" value={fmtKVA(r.invKVA)} unit={`kVA · ${r.sysVoltage}V`} />
      </div>

      <div className="mini-grid" style={{ marginBottom: 16 }}>
        {[
          [(r.totalWh / 1000).toFixed(1), "kWh per day"],
          [r.totalLoadKW, "kW total load"],
          [r.backupHrs, "hrs backup"],
        ].map(([val, lbl]) => (
          <div key={lbl} style={{ background: "var(--green-xl)", borderRadius: 8, padding: "10px 6px", textAlign: "center" }}>
            <div className="brig" style={{ fontSize: 16, fontWeight: 800 }}>{val}</div>
            <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: "var(--green-xl)", border: "1px solid var(--border)", borderRadius: 10,
        padding: "14px 16px", marginBottom: 16, fontSize: 13.5, lineHeight: 1.75,
      }}>
        You need <strong>{(r.totalWh / 1000).toFixed(1)} kWh</strong> a day. The{" "}
        <strong>{r.panelKW.toFixed(2)} kW</strong> array makes about{" "}
        <strong>{(r.panelKW * r.effectivePSH * 0.75).toFixed(1)} kWh</strong> on a typical rainy-season day, and the{" "}
        <strong>{r.battKWh.toFixed(1)} kWh</strong> battery carries you through the night and cloud cover for roughly{" "}
        <strong>{r.backupHrs} hours</strong>.
      </div>

      {flags.map((f, i) => <Flag key={i} {...f} />)}

      {/* Estimate honesty note */}
      <div style={{
        border: "1px dashed var(--border)", borderRadius: 10, padding: "12px 14px",
        margin: "6px 0 16px", fontSize: 12, color: "var(--muted)", lineHeight: 1.65,
      }}>
        The <strong style={{ color: "var(--ink)" }}>{naira(r.estLow)} – {naira(r.estHigh)}</strong> range is
        indicative, based on our typical installs. Roof access, cable runs, and battery
        chemistry move the real number. The site assessment is free and the quote is itemised.
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <button type="button" onClick={copyResults}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6, minHeight: 40,
            background: "none", border: `1px solid ${copied ? "var(--ink)" : "var(--border)"}`,
            borderRadius: 8, padding: "8px 13px", fontSize: 12.5,
            color: copied ? "var(--ink)" : "var(--muted)", cursor: "pointer",
          }}>
          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy summary"}
        </button>
        <button type="button" onClick={() => window.print()}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6, minHeight: 40,
            background: "none", border: "1px solid var(--border)", borderRadius: 8,
            padding: "8px 13px", fontSize: 12.5, color: "var(--muted)", cursor: "pointer",
          }}>
          <Printer size={15} /> Print
        </button>
        <button type="button" onClick={() => setShowDetails(v => !v)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6, minHeight: 40,
            background: "none", border: "1px solid var(--border)", borderRadius: 8,
            padding: "8px 13px", fontSize: 12.5, color: "var(--muted)", cursor: "pointer",
          }}>
          {showDetails ? <ChevronUp size={15} /> : <ChevronDown size={15} />} How we got this
        </button>
      </div>

      {showDetails && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ background: "var(--green-xl)", borderRadius: 10, padding: 13, marginBottom: 12, fontSize: 12.5, color: "var(--muted)", lineHeight: 1.85 }}>
            <strong style={{ color: "var(--ink)" }}>Sizing breakdown</strong><br />
            Inverter: {(r.totalEffW / 1000).toFixed(2)} kW × 1.25 = {r.rawInvKVA.toFixed(2)} kVA. Surge check = {r.maxSurgeKVA.toFixed(2)} kVA. Using <strong>{fmtKVA(r.invKVA)} kVA</strong> (3 kVA minimum).<br />
            Battery: {(r.nightWh / 1000).toFixed(2)} kWh night + {(r.cloudBufWh / 1000).toFixed(2)} kWh cloud buffer (a third of daytime load, for overcast spells) = {(r.rawBattWh / 1000).toFixed(2)} kWh ÷ 80% DoD × 1.2 safety = <strong>{r.battKWh.toFixed(2)} kWh</strong>.<br />
            Panels: {(r.totalWh / 1000).toFixed(2)} kWh ÷ {r.effectivePSH.toFixed(2)} effective PSH ÷ 0.75 system efficiency = <strong>{r.panelKW.toFixed(2)} kW</strong>.<br />
            Backup: {r.battKWh.toFixed(2)} kWh × 80% ÷ {(r.nightEffW > 0 ? r.nightEffW : r.totalEffW).toFixed(0)}W = <strong>{r.backupHrs} hours</strong>.
          </div>

          <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
            Energy per appliance
          </div>
          <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, minWidth: 380 }}>
              <thead>
                <tr style={{ background: "var(--ink)" }}>
                  {["Appliance", "Qty", "Day Wh", "Night Wh", "Total"].map(h => (
                    <th key={h} style={{ padding: "9px 10px", textAlign: h === "Appliance" ? "left" : "right", color: "#fff", fontWeight: 700, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appliances.map((a, i) => {
                  const enW = energyW(a);
                  const dw = Math.round(a.qty * enW * a.dayH);
                  const nw = Math.round(a.qty * enW * a.nightH);
                  return (
                    <tr key={a.uid} style={{ background: i % 2 === 0 ? "#fff" : "var(--green-xl)", opacity: dw + nw === 0 ? 0.4 : 1 }}>
                      <td style={{ padding: "8px 10px" }}>{a.name}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right" }}>{a.qty}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right" }}>{dw}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right" }}>{nw}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 700 }}>{dw + nw}</td>
                    </tr>
                  );
                })}
                <tr style={{ background: "var(--green-light)", fontWeight: 700 }}>
                  <td style={{ padding: "9px 10px" }} colSpan={2}>Total (effective Wh)</td>
                  <td style={{ padding: "9px 10px", textAlign: "right" }}>{Math.round(r.dayWh)}</td>
                  <td style={{ padding: "9px 10px", textAlign: "right" }}>{Math.round(r.nightWh)}</td>
                  <td style={{ padding: "9px 10px", textAlign: "right" }}>{Math.round(r.totalWh)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.65, marginTop: 10 }}>
            Watt-hours use effective wattage (rated W ÷ efficiency), then a duty factor for
            thermostatic loads — fridges, freezers and air conditioners cycle rather than
            drawing rated power continuously. Inverter sizing still uses full rated draw.
            Panel count assumes 400W modules.
            {hasGen && ` Generator figures use ${naira(petrol)}/litre and ${naira(GENERATOR_SERVICE_NGN_PER_YEAR)}/year servicing.`}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ background: "var(--lime)", borderRadius: 12, padding: "18px 16px", marginBottom: 14 }}>
        <div className="brig" style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)", marginBottom: 4 }}>
          Send this to us and get a real quote
        </div>
        <p style={{ fontSize: 13, color: "rgba(8,21,15,0.72)", marginBottom: 14, lineHeight: 1.6 }}>
          Your full summary goes across on WhatsApp. We reply within 24 hours, and the site assessment is free.
        </p>
        <WhatsAppButton
          source="Solar calculator result"
          state={location as QuoteState}
          extra={buildWAMsg()}
          className="btn-ink" style={{ width: "100%" }}>
          <WhatsAppIcon size={18} /> Send my results on WhatsApp
        </WhatsAppButton>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={onBack} className="btn-outline" style={{ flex: 1, fontSize: 14 }}>
          <Pencil size={16} /> Edit list
        </button>
        <button type="button" onClick={onRestart} className="btn-outline" style={{ flex: 1, fontSize: 14 }}>
          <Restart size={16} /> Start over
        </button>
      </div>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function SolarCalculator() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("Rivers");
  const [psh, setPsh] = useState(4.5);
  const [weekly, setWeekly] = useState(10_000);
  const [petrol, setPetrol] = useState(PETROL_PRICE_NGN);
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [presetId, setPresetId] = useState<string | null>(null);

  const counterRef = useRef(0);
  const topRef = useRef<HTMLDivElement>(null);

  const nextUid = () => {
    counterRef.current += 1;
    return counterRef.current;
  };

  const toAppliance = useCallback((a: ApplianceDB, qty = 1): Appliance => ({
    uid: nextUid(), id: a.id, name: a.name, cat: a.cat, rw: a.rw, eff: a.eff,
    surge: a.surge ?? 1, alwaysOn: !!a.alwaysOn, duty: a.duty ?? 1,
    qty, dayH: a.defaultDay, nightH: a.defaultNight,
    baseDay: a.defaultDay, baseNight: a.defaultNight, level: "normal",
  }), []);

  const applyPreset = useCallback((p: Preset) => {
    setPresetId(p.id);
    if (!p.items.length) { setAppliances([]); return; }
    const built = p.items.flatMap(([id, qty]) => {
      const db = DB.find(d => d.id === id);
      return db ? [toAppliance(db, qty)] : [];
    });
    setAppliances(built);
  }, [toAppliance]);

  const addAppliance = useCallback((a: ApplianceDB) => {
    setAppliances(prev => [...prev, toAppliance(a)]);
  }, [toAppliance]);

  const setQty = useCallback((uid: number, v: number) => {
    setAppliances(prev => prev.map(a => (a.uid === uid ? { ...a, qty: v } : a)));
  }, []);

  const setLevel = useCallback((uid: number, level: UsageLevel) => {
    setAppliances(prev => prev.map(a => (
      a.uid === uid
        ? {
            ...a, level,
            dayH: hoursForLevel(a.baseDay, level, 18),
            nightH: hoursForLevel(a.baseNight, level, 12),
          }
        : a
    )));
  }, []);

  const setHours = useCallback((uid: number, field: "dayH" | "nightH", v: number) => {
    setAppliances(prev => prev.map(a => (a.uid === uid ? { ...a, [field]: v, level: "custom" as UsageLevel } : a)));
  }, []);

  const removeAppliance = useCallback((uid: number) => {
    setAppliances(prev => prev.filter(a => a.uid !== uid));
  }, []);

  /** Move between steps and pull the viewport back to the top of the widget. */
  const goto = useCallback((n: number) => {
    setStep(n);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  function restart() {
    setAppliances([]);
    counterRef.current = 0;
    setPresetId(null);
    setLocation("Rivers");
    setPsh(4.5);
    setWeekly(10_000);
    setPetrol(PETROL_PRICE_NGN);
    goto(1);
  }

  return (
    <div className="calc" ref={topRef} style={{ scrollMarginTop: 84 }}>
      <Rail step={step} />

      {step === 1 && (
        <Step1
          weekly={weekly} setWeekly={setWeekly}
          petrol={petrol} setPetrol={setPetrol}
          location={location}
          setLocation={(s, p) => { setLocation(s); setPsh(p); }}
          onNext={() => goto(2)}
        />
      )}

      {step === 2 && (
        <Step2
          appliances={appliances} presetId={presetId}
          onPreset={applyPreset} onAdd={addAppliance}
          onQty={setQty} onLevel={setLevel} onHours={setHours} onRemove={removeAppliance}
          onBack={() => goto(1)} onNext={() => goto(3)}
        />
      )}

      {step === 3 && (
        <Step3
          appliances={appliances} location={location} psh={psh}
          weekly={weekly} petrol={petrol}
          onBack={() => goto(2)} onRestart={restart}
        />
      )}
    </div>
  );
}
