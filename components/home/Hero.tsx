"use client";

import { useState, useEffect } from "react";
import { WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppIcon, InstallPhoto, FadeIn } from "@/components/ui";

const TRUST_STATS = [
  { val: "3",    lbl: "States covered" },
  { val: "2yr",  lbl: "Warranty" },
  { val: "1–3d", lbl: "Install time" },
  { val: "Free", lbl: "Site assessment" },
];

export default function Hero({ isMobile, isSmall }: { isMobile: boolean; isSmall: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="grid-dot" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      paddingTop: 68, position: "relative", overflow: "hidden",
      background: "linear-gradient(155deg, #ffffff 0%, var(--green-xl) 55%, var(--green-light) 100%)",
    }}>
      {/* Decorative circles */}
      {[700, 500, 320].map((s, i) => (
        <div key={i} style={{ position: "absolute", right: -s * 0.25, top: "50%", transform: "translateY(-50%)", width: s, height: s, borderRadius: "50%", border: "1px solid var(--border)", opacity: 0.5 - i * 0.1, pointerEvents: "none" }} />
      ))}

      <div className="container" style={{ padding: isMobile ? "100px 20px 60px" : "80px 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 64, alignItems: "center" }}>

        {/* Left — copy */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
          <span className="tag">Rivers · Delta · Bayelsa</span>
          <h1 className="brig" style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 800, lineHeight: 1.07, letterSpacing: "-0.03em", marginBottom: 24 }}>
            No more<br />
            <span style={{ color: "var(--green)" }}>power outages</span><br />
            Switch to Solar today!.
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.75, maxWidth: 460, marginBottom: 36 }}>
            LumaGrid installs reliable solar systems across the Niger Delta, with full transparency, genuine panel brands, real warranties, and engineers you can call back.
          </p>

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 14, flexWrap: "wrap", alignItems: isMobile ? "stretch" : "center" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ fontSize: 16, padding: "16px 32px", justifyContent: "center" }}>
              <WhatsAppIcon size={20} /> Get Free Quote on WhatsApp
            </a>
            <a href="#packages" className="btn-outline" style={{ justifyContent: "center" }}>See Packages →</a>
          </div>

          {/* Trust card */}
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: isSmall ? "1fr 1fr" : "repeat(4, 1fr)", background: "white", borderRadius: 12, boxShadow: "0 8px 32px rgba(13,92,58,0.12)", border: "1.5px solid var(--border)", overflow: "hidden", maxWidth: 460 }}>
            {TRUST_STATS.map((s, i) => (
              <div key={i} style={{
                padding: "16px 12px", textAlign: "center",
                borderRight: isSmall ? (i % 2 === 0 ? "1px solid var(--border)" : "none") : (i < 3 ? "1px solid var(--border)" : "none"),
                borderBottom: isSmall && i < 2 ? "1px solid var(--border)" : "none",
              }}>
                <div className="brig" style={{ fontSize: 20, fontWeight: 800, color: "var(--green)" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, marginTop: 3 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image (desktop only) */}
        {!isMobile && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.35s" }}>
            <InstallPhoto
              src="/images/Lumagrid-11.jpg"
              alt="Solar installation by LumaGrid in Port Harcourt"
              style={{ borderRadius: 16, height: 440, boxShadow: "0 32px 80px rgba(13,92,58,0.2)" }}
              priority
            />
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.35 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: "var(--green)" }} />
      </div>
    </section>
  );
}