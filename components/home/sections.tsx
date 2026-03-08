import { TRUST_BAR, SERVICES, PROCESS_STEPS, LOCATIONS, FAQS } from "@/lib/constants";
import { FadeIn, SectionHeader } from "@/components/ui";
import { useState } from "react";

// ── TrustBar ──────────────────────────────────────────────────────────────────

export function TrustBar({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ background: "var(--green)", padding: "28px 24px" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 20 : 24, alignItems: "center" }}>
        {TRUST_BAR.map((t, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className="brig" style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>{t.value}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>{t.label}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────

export function Services() {
  return (
    <section id="services" className="section" style={{ background: "var(--white)" }}>
      <div className="container">
        <SectionHeader tag="What We Do" title={<>Built for the Niger Delta,<br />not just Nigeria.</>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card-hover" style={{ padding: 32, border: "1.5px solid var(--border)", borderRadius: 10, cursor: "default" }}>
                <div style={{ fontSize: 28, marginBottom: 18 }}>{s.icon}</div>
                <h3 className="brig" style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HowItWorks ────────────────────────────────────────────────────────────────

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section" style={{ background: "var(--green-xl)" }}>
      <div className="container">
        <SectionHeader tag="The Process" title={<>We show you everything<br />before you pay a kobo.</>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
          {PROCESS_STEPS.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div>
                <div className="brig" style={{ fontSize: 52, fontWeight: 800, color: "var(--green-light)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 10, WebkitTextStroke: "1.5px var(--border)" }}>
                  {s.num}
                </div>
                <h3 className="brig" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Locations ─────────────────────────────────────────────────────────────────

export function Locations() {
  return (
    <section id="locations" className="section" style={{ background: "var(--white)" }}>
      <div className="container">
        <SectionHeader tag="Coverage Area" title={<>Serving the Niger Delta,<br />city by city.</>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {LOCATIONS.map((loc, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="card-hover" style={{ border: "1.5px solid var(--border)", borderRadius: 10, overflow: "hidden", background: "white" }}>
                <div style={{ background: loc.color, padding: "20px 24px" }}>
                  <h3 className="brig" style={{ color: "white", fontWeight: 700, fontSize: 18 }}>{loc.state}</h3>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {loc.cities.map(city => (
                      <span key={city} style={{ background: "var(--green-light)", color: "var(--green-mid)", fontSize: 12, fontWeight: 500, padding: "5px 11px", borderRadius: 3 }}>{city}</span>
                    ))}
                  </div>
                  <a href={`/locations/${loc.state.toLowerCase().replace(" ", "-")}`} style={{ display: "inline-block", marginTop: 20, fontSize: 13, color: "var(--green)", fontWeight: 600 }}>
                    View {loc.state} page →
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Faq ───────────────────────────────────────────────────────────────────────

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" style={{ background: "var(--green-xl)" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <SectionHeader tag="FAQ" title={<>Questions Nigerians<br />actually ask.</>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((f, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{ border: "1.5px solid var(--border)", borderRadius: 8, background: "white", overflow: "hidden" }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <span className="brig" style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{f.q}</span>
                  <span style={{ fontSize: 22, color: "var(--green)", flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.25s" }}>+</span>
                </button>
                <div style={{ maxHeight: open === i ? "240px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                  <p style={{ padding: "0 24px 20px", fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>{f.a}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}