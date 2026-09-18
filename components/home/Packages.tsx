import { PACKAGES, WHATSAPP_NUMBER } from "@/lib/constants";
import { FadeIn, SectionHeader, WhatsAppIcon, Check } from "@/components/ui";

export default function Packages() {
  return (
    <section id="packages" className="section" style={{ background: "var(--sand)" }}>
      <div className="container">
        <SectionHeader
          tag="System Packages"
          title={<>What size system<br />do you need?</>}
          subtitle="Every home is different — but these packages cover 90% of what we install. All prices are indicative. Your actual quote depends on your site assessment."
        />

        <div className="auto-3" style={{ alignItems: "start" }}>
          {PACKAGES.map((pkg, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                borderRadius: 14, overflow: "hidden", position: "relative", background: "white",
                border: pkg.highlight ? "2.5px solid var(--ink)" : "1.5px solid var(--border)",
                boxShadow: pkg.highlight ? "0 16px 48px rgba(8,21,15,0.16)" : "0 4px 16px rgba(0,0,0,0.05)",
              }}>
                {pkg.badge && (
                  <div style={{ position: "absolute", top: 16, right: 16, background: "var(--lime)", color: "var(--ink)", fontSize: 11, fontWeight: 700, padding: "5px 11px", borderRadius: 20, letterSpacing: "0.05em" }}>
                    {pkg.badge}
                  </div>
                )}

                {/* Header */}
                <div style={{ background: pkg.color, padding: "28px 28px 24px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.65)", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{pkg.label}</div>
                  <div className="brig" style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 4 }}>{pkg.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    {pkg.priceNote && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{pkg.priceNote}</span>}
                    <span className="brig" style={{ fontSize: 32, fontWeight: 800, color: "white" }}>{pkg.price}</span>
                  </div>
                  <div style={{ display: "inline-block", marginTop: 12, background: "rgba(255,255,255,0.15)", color: "white", fontSize: 13, fontWeight: 700, padding: "5px 12px", borderRadius: 4 }}>{pkg.kva}</div>
                </div>

                {/* Body */}
                <div style={{ padding: "24px 28px 28px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 12 }}>Handles</div>
                  <ul style={{ listStyle: "none", marginBottom: 24, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                    {pkg.appliances.map(a => (
                      <li key={a} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}><Check />{a}</li>
                    ))}
                  </ul>

                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 12 }}>Includes</div>
                  <ul style={{ listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column" as const, gap: 7 }}>
                    {pkg.includes.map(inc => (
                      <li key={inc} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--muted)" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green-mid)", flexShrink: 0 }} />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pkg.ctaMsg)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      width: "100%", padding: "14px", borderRadius: 6,
                      minHeight: 48,
                      background: pkg.highlight ? "var(--wa)" : "var(--green-light)",
                      color: pkg.highlight ? "white" : "var(--ink)",
                      fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer",
                    }}
                  >
                    <WhatsAppIcon size={16} color={pkg.highlight ? "white" : "var(--ink)"} />
                    {pkg.price === "Custom" ? "Get a Custom Quote" : `Get Quote for ${pkg.name}`}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25}>
          <p style={{ textAlign: "center", marginTop: 32, fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>
            Not sure which fits?{" "}
            <a href="#calculator" style={{ fontWeight: 700, textDecoration: "underline", textDecorationColor: "var(--lime)", textDecorationThickness: 2 }}>
              Size it with the calculator
            </a>{" "}
            — or{" "}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, textDecoration: "underline", textDecorationColor: "var(--lime)", textDecorationThickness: 2 }}>
              WhatsApp us
            </a>{" "}
            and we will help for free.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}