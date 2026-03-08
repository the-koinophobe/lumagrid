import { FINANCING_STEPS, WHATSAPP_URL } from "@/lib/constants";
import { FadeIn, WhatsAppIcon } from "@/components/ui";

const ringStyle = (size: number): React.CSSProperties => ({
  position: "absolute", left: "50%", top: "50%",
  transform: "translate(-50%,-50%)",
  width: size, height: size, borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none",
});

export default function Financing({ isMobile }: { isMobile: boolean }) {
  return (
    <section id="financing" className="section" style={{ background: "var(--green)", position: "relative", overflow: "hidden" }}>
      <div style={ringStyle(700)} />
      <div style={ringStyle(460)} />

      <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems: "center" }}>

        {/* Left */}
        <FadeIn>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "5px 13px", borderRadius: 3, marginBottom: 18 }}>
            Financing Available
          </span>
          <h2 className="brig" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
            Go solar today.<br />Pay over time.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, marginBottom: 32, maxWidth: 420 }}>
            Through our financing partner, you can own a full solar system with as little as 30% upfront and spread the rest over 6, 12, or 24 months. Start saving from day one.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 36 }}>
            {[["30%", "Minimum deposit"], ["24mo", "Max repayment"], ["Same day", "Installation"]].map(([val, lbl]) => (
              <div key={lbl} style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 14 }}>
                <div className="brig" style={{ fontSize: 22, fontWeight: 800, color: "white" }}>{val}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ background: "white", color: "var(--green)" }}>
            <WhatsAppIcon size={18} color="var(--green)" /> Ask About Financing
          </a>
        </FadeIn>

        {/* Right — steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {FINANCING_STEPS.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div className="brig" style={{ minWidth: 40, height: 40, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "var(--accent)" }}>
                  {s.step}
                </div>
                <div>
                  <h4 className="brig" style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 5 }}>{s.title}</h4>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}