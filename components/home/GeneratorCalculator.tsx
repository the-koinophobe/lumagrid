"use client";

import { useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";
import { SectionHeader, WhatsAppIcon } from "@/components/ui";

const fmt = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

function Slider({ label, value, min, max, step = 1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{label}</label>
      <input type="number" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", padding: "12px 14px", border: "1.5px solid var(--border)", borderRadius: 6, fontSize: 16, fontWeight: 700, color: "var(--green)", fontFamily: "inherit", outline: "none" }}
      />
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", marginTop: 8, accentColor: "var(--green)" as string }}
      />
    </div>
  );
}

function ResultCard({ label, value, sub, bad, good }: { label: string; value: string; sub: string; bad?: boolean; good?: boolean }) {
  return (
    <div style={{ padding: "20px 18px", borderRadius: 10, background: bad ? "#fff5f5" : good ? "var(--green-xl)" : "#f8faf9", border: `1.5px solid ${bad ? "#fecaca" : good ? "var(--border)" : "#e5e7eb"}` }}>
      <div className="brig" style={{ fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 800, color: bad ? "#dc2626" : "var(--green)", marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 11, color: "#9ca3af" }}>{sub}</div>
    </div>
  );
}

export default function GeneratorCalculator({ isMobile, isSmall }: { isMobile: boolean; isSmall: boolean }) {
  const [litres, setLitres]   = useState(5);
  const [fuel, setFuel]       = useState(1200);
  const [cost, setCost]       = useState(2800000);

  const yearlyFuel   = litres * fuel * 365;
  const yearlyTotal  = yearlyFuel + 180_000;
  const over3yr      = yearlyTotal * 3;
  const savings3yr   = over3yr - cost;
  const breakEven    = Math.ceil(cost / (yearlyTotal / 12));

  return (
    <section className="section" style={{ background: "var(--white)" }}>
      <div className="container">
        <SectionHeader
          tag="Cost Calculator"
          title={<>See what your generator<br />is actually costing you.</>}
          subtitle="Most people underestimate their generator spend. Adjust the numbers below to see your real yearly cost — and when solar pays for itself."
        />

        <div style={{ background: "white", borderRadius: 16, padding: isMobile ? "24px 18px" : "40px", boxShadow: "0 8px 40px rgba(13,92,58,0.12)", border: "1.5px solid var(--border)" }}>
          <h3 className="brig" style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Generator vs Solar — Real Numbers</h3>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 32, lineHeight: 1.6 }}>Enter your current generator usage to see what you're actually spending.</p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 20, marginBottom: 36 }}>
            <Slider label="Litres of fuel/day"      value={litres} min={1}       max={30}       onChange={setLitres} />
            <Slider label="Fuel price per litre (₦)" value={fuel}   min={800}     max={3000}     step={50} onChange={setFuel} />
            <Slider label="Solar system cost (₦)"    value={cost}   min={1000000} max={15000000} step={100000} onChange={setCost} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 32 }}>
            <ResultCard label="Generator cost/year"        value={fmt(yearlyTotal)}            sub="fuel + servicing"              bad />
            <ResultCard label="Generator cost over 3 years" value={fmt(over3yr)}               sub="money gone forever"             bad />
            <ResultCard label="You save in 3 years"        value={fmt(Math.max(0, savings3yr))} sub="vs buying a solar system today" good />
            <ResultCard label="Break-even point"           value={`${breakEven} months`}        sub="then it's pure savings"         good />
          </div>

          <div style={{ background: "var(--green)", borderRadius: 10, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>At current fuel prices, you're spending</div>
              <div className="brig" style={{ fontSize: 20, fontWeight: 800, color: "white" }}>{fmt(Math.round(yearlyTotal / 12))}/month on your generator</div>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ flexShrink: 0 }}>
              <WhatsAppIcon size={18} /> Get My Solar Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}