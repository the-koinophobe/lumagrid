"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolarCalculator from "@/components/tools/SolarCalculator";
import { FadeIn } from "@/components/ui";
import { PETROL_PRICE_NGN, PETROL_PRICE_ASOF, PETROL_PRICE_NOTE } from "@/lib/constants";
import { FuelPump } from "@/components/ui/icons";

export default function CalculatorPage() {
  return (
    <>
      <Navbar />

      <section
        style={{
          background: "var(--ink)",
          padding: "112px 20px 44px",
          color: "#fff",
        }}
      >
        <div className="container" style={{ maxWidth: 720 }}>
          <FadeIn>
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.12)",
                color: "var(--lime)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "6px 13px",
                borderRadius: 3,
                marginBottom: 16,
              }}
            >
              Free tool
            </span>

            <h1
              className="brig"
              style={{
                fontSize: "clamp(28px, 7vw, 46px)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                marginBottom: 14,
              }}
            >
              What does your generator{" "}
              <span style={{ color: "var(--lime)" }}>really cost?</span>
            </h1>

            <p style={{ fontSize: "var(--step-lead)", color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}>
              Work out your yearly fuel spend, then see the solar system that
              would replace it — panels, battery, inverter, and how long it takes
              to pay for itself. Sized for Niger Delta rainy season, not
              best-case sunshine.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                marginTop: 18,
                padding: "9px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.13)",
                color: "rgba(255,255,255,0.8)",
                fontSize: 12.5,
              }}
            >
              <span style={{ color: "var(--lime)" }}><FuelPump size={16} /></span>
              ₦{PETROL_PRICE_NGN.toLocaleString("en-NG")}/litre · {PETROL_PRICE_NOTE}, {PETROL_PRICE_ASOF}
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: "var(--sand)", padding: "36px 20px 72px" }}>
        <SolarCalculator />
      </section>

      <Footer />
    </>
  );
}
