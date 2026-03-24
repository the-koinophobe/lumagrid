"use client";

import { useBreakpoint } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolarCalculator from "@/components/tools/SolarCalculator";
import { FadeIn } from "@/components/ui";

export default function CalculatorPage() {
  const { isMobile, isSmall } = useBreakpoint();

  return (
    <>
      <Navbar isMobile={isMobile} />

      <section style={{
        background: "linear-gradient(160deg, var(--green) 0%, var(--green-mid) 100%)",
        paddingTop: isMobile ? "5rem" : "7rem",
        paddingBottom: "3rem",
        color: "#fff",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {[600, 400].map(s => (
          <div key={s} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: s, height: s, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
        ))}
        <div className="container" style={{ position: "relative" }}>
          <FadeIn>
            <span className="tag" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
              Free Tool
            </span>
            <h1 className="brig" style={{ fontSize: isMobile ? "2rem" : "2.8rem", fontWeight: 800, lineHeight: 1.15, margin: "1rem 0 0.75rem" }}>
              Solar Sizing Calculator
            </h1>
            <p style={{ fontSize: "1rem", opacity: 0.85, maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
              Add your appliances, set your daily hours, and get an instant panel, battery, and inverter recommendation — sized for Niger Delta rainy season conditions.
            </p>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: "var(--green-xl)", padding: "48px 24px 80px" }}>
        <FadeIn>
          <SolarCalculator />
        </FadeIn>
      </section>

      <Footer isMobile={isMobile} isSmall={isSmall} />
    </>
  );
}