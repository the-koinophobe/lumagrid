"use client";

import SolarCalculator from "@/components/tools/SolarCalculator";
import { PETROL_PRICE_NGN, PETROL_PRICE_ASOF, PETROL_PRICE_NOTE } from "@/lib/constants";
import { FuelPump } from "@/components/ui/icons";

/**
 * The calculator is the site's main selling point, so it gets an ink section
 * that visually dominates the page and makes the white tool card pop.
 */
export default function CalculatorSection() {
  return (
    <section
      id="calculator"
      className="section"
      style={{ background: "var(--ink)", scrollMarginTop: 68 }}
    >
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 32 }}>
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
            Savings calculator
          </span>

          <h2
            className="brig section-title"
            style={{ color: "#fff", marginBottom: 16 }}
          >
            Your generator has a price tag.{" "}
            <span style={{ color: "var(--lime)" }}>Most people never add it up.</span>
          </h2>

          <p style={{ fontSize: "var(--step-lead)", color: "rgba(255,255,255,0.72)", lineHeight: 1.75 }}>
            Tell us roughly what you spend on fuel each week. We will show you the
            yearly figure, what a solar system to replace it would cost, and how
            long it takes to pay for itself.
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
            Using ₦{PETROL_PRICE_NGN.toLocaleString("en-NG")}/litre · {PETROL_PRICE_NOTE}, {PETROL_PRICE_ASOF}
          </div>
        </div>

        <SolarCalculator />
      </div>
    </section>
  );
}
