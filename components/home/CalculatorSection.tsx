import SolarCalculator from "@/components/tools/SolarCalculator";
import { PETROL_PRICE_NGN, PETROL_PRICE_ASOF, PETROL_PRICE_NOTE } from "@/lib/constants";
import { FuelPump } from "@/components/ui/icons";

/**
 * The calculator is the site's main selling point, so it gets an ink section
 * that visually dominates the page and makes the white tool card pop.
 */
export default function CalculatorSection() {
  return (
    <section id="calculator" className="sec sec--ink" style={{ scrollMarginTop: 72 }}>
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 700 }}>
          <span className="eyebrow">Savings calculator</span>
          <h2 className="h2">
            Your generator has a price tag. <span className="hl">Most people never add it up.</span>
          </h2>
          <p className="lead">
            Tell us roughly what you spend on fuel each week. We show you the yearly figure, the solar system
            that would replace it, and how long it takes to pay for itself.
          </p>
          <span className="pill pill--glass" style={{ marginTop: 18 }}>
            <span style={{ color: "var(--lime)" }}><FuelPump size={15} /></span>
            ₦{PETROL_PRICE_NGN.toLocaleString("en-NG")}/litre · {PETROL_PRICE_NOTE}, {PETROL_PRICE_ASOF}
          </span>
        </div>
        <div className="reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
          <SolarCalculator />
        </div>
      </div>
    </section>
  );
}
