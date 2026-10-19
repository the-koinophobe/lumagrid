import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui";
import { PACKAGES, PRICING, PETROL_PRICE_NGN, PETROL_PRICE_ASOF } from "@/lib/constants";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Solar Installation Prices in Nigeria (2026): 3kVA, 5kVA, 10kVA",
  description:
    "What solar costs in Port Harcourt, Warri and Yenagoa in 2026: 3kVA from ₦1.7M, 6kVA from ₦3.8M, plus 5kVA and 10kVA estimates and what pushes the price up or down.",
  alternates: { canonical: "https://lumagridsolar.com/pricing" },
  openGraph: {
    title: "Solar Installation Prices in Nigeria (2026) | LumaGrid Solar",
    description: "Installed solar prices for Rivers, Delta and Bayelsa, with a line-by-line breakdown of what drives the cost.",
    url: "https://lumagridsolar.com/pricing",
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
};

const naira = (n: number) => `₦${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;

/** Same rule of thumb the calculator uses, so both pages agree. */
function estimate(kva: number, kwh: number, panelKw: number) {
  const mid = kva * PRICING.perKvaInverter + kwh * PRICING.perKwhBattery + panelKw * PRICING.perKwPanel + PRICING.balanceOfSystem;
  return `${naira(mid * (1 - PRICING.rangeSpread))} – ${naira(mid * (1 + PRICING.rangeSpread))}`;
}

const SIZES = [
  { size: "3kVA", battery: "3.2kWh lithium", panels: "4 × 600W (2.4kW)", suits: "1–2 bedroom flat: lights, fans, TV, small fridge", price: "From ₦1.7M" },
  { size: "5kVA", battery: "5kWh lithium", panels: "5–6 × 600W (3–3.6kW)", suits: "2–3 bedroom home, one small inverter AC for a few hours", price: estimate(5, 5, 3.3) },
  { size: "6kVA", battery: "8kWh lithium", panels: "8 × 600W (4.8kW)", suits: "3–4 bedroom home with one 1.5HP inverter AC", price: "From ₦3.8M" },
  { size: "10kVA", battery: "15kWh lithium", panels: "10–12 × 600W (6–7.2kW)", suits: "Duplex or office, two ACs, water pump", price: estimate(10, 15, 6.6) },
];

const FAQS = [
  {
    q: "How much is a 5kVA solar system in Nigeria in 2026?",
    a: `An installed 5kVA solar system with a 5kWh lithium battery and about 3kW of panels costs roughly ${estimate(5, 5, 3.3)} in Rivers, Delta and Bayelsa. The battery is the biggest variable: doubling it to 10kWh adds about ₦1.1M.`,
  },
  {
    q: "How much is a 10kVA solar system in Nigeria?",
    a: `A 10kVA system with 15kWh of lithium storage and 6 to 7kW of panels typically costs ${estimate(10, 15, 6.6)} installed. Large homes and offices are always quoted after a site assessment because loads vary a lot.`,
  },
  {
    q: "Why is the battery the most expensive part of a solar system?",
    a: "Lithium (LiFePO4) batteries cost more per kWh than any other component, and the battery is sized for the hours you need power at night. A home that wants AC all night needs far more storage than one running lights and fans.",
  },
  {
    q: "Does installing on an upstairs building cost more?",
    a: "Slightly, sometimes. Storey buildings can need longer cable runs, more conduit and safety equipment for roof access. The difference is usually small and is itemised on your quote.",
  },
  {
    q: "Is it cheaper to buy panels and batteries myself and hire a technician?",
    a: "It can look cheaper, but mismatched parts, fake panels and undersized cables are the main reasons solar systems fail in Nigeria. A proper installer sizes everything together and gives you one warranty that covers the whole job.",
  },
  {
    q: "How long does it take for solar to pay for itself?",
    a: `For homes and shops running a generator most of the day, often one to two years at ${PETROL_PRICE_ASOF} petrol prices (about ₦${PETROL_PRICE_NGN.toLocaleString("en-NG")} per litre in Port Harcourt). After that, the fuel money stays in your pocket. The calculator works it out for your own fuel spend.`,
  },
];

const h2: React.CSSProperties = { fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 14 };
const p: React.CSSProperties = { fontSize: 15.5, color: "#2d3a35", lineHeight: 1.8, marginBottom: 16 };
const a: React.CSSProperties = { textDecoration: "underline", textDecorationColor: "var(--lime)", textDecorationThickness: 2, fontWeight: 600 };

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Solar prices", href: "/pricing" }])} />
      <JsonLd data={faqSchema(FAQS)} />
      <Navbar />

      <section style={{ background: "var(--ink)", color: "#fff", padding: "112px 20px 48px" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <span className="tag" style={{ background: "rgba(255,255,255,0.12)", color: "var(--lime)" }}>Prices · Updated {PETROL_PRICE_ASOF}</span>
          <h1 className="brig" style={{ fontSize: "clamp(30px, 7vw, 50px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: 16 }}>
            How much does solar cost in Port Harcourt, Warri and Yenagoa?
          </h1>
          <p style={{ fontSize: "var(--step-lead)", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, maxWidth: 680, marginBottom: 24 }}>
            Installed prices for complete solar systems in Rivers, Delta and Bayelsa States, and the things that move a quote up or down.
          </p>
          <WhatsAppButton source="Pricing page - top" className="btn-lime" style={{ fontSize: 16, padding: "15px 24px" }}>
            <WhatsAppIcon size={18} color="var(--ink)" /> Get my exact price
          </WhatsAppButton>
        </div>
      </section>

      <section style={{ background: "var(--sand)", padding: "36px 20px" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="facts">
            <h2 className="brig" style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Quick answer</h2>
            <p style={{ fontSize: 15, lineHeight: 1.75 }}>
              A complete, installed solar system from LumaGrid Solar starts at about <strong>₦1.7M for 3kVA</strong> (3.2kWh lithium
              battery, four 600W panels) and about <strong>₦3.8M for 6kVA</strong> (8kWh lithium, eight 600W panels). A 5kVA system
              usually lands around <strong>{estimate(5, 5, 3.3)}</strong> and a 10kVA system around <strong>{estimate(10, 15, 6.6)}</strong>.
              Prices include the inverter, battery, panels, mounting, cabling, protection and installation, and are confirmed after a free site assessment.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2 className="brig" style={h2}>Solar system prices by size</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Inverter</th><th>Battery</th><th>Panels</th><th>Suits</th><th>Installed price</th></tr></thead>
              <tbody>
                {SIZES.map(s => (
                  <tr key={s.size}>
                    <td><strong>{s.size}</strong></td><td>{s.battery}</td><td>{s.panels}</td><td>{s.suits}</td><td><strong>{s.price}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
            3kVA and 6kVA are our standard packages. 5kVA and 10kVA are estimates using the same pricing the{" "}
            <Link href="/calculator" style={{ textDecoration: "underline" }}>calculator</Link> uses. Bigger systems ({PACKAGES[2].kva}) are quoted individually.
          </p>

          <h2 className="brig" style={{ ...h2, marginTop: 40 }}>What changes the price of a solar system</h2>
          <p style={p}><strong>1. Battery size.</strong> The biggest single cost. Lithium storage runs roughly ₦{(PRICING.perKwhBattery / 1000).toFixed(0)},000 per kWh installed. Running an AC through the night is what pushes battery size up. See <Link href="/blog/how-long-do-solar-batteries-last-nigeria" style={a}>how long solar batteries last</Link> and <Link href="/blog/lifep04-vs-acid" style={a}>lithium vs lead-acid</Link>.</p>
          <p style={p}><strong>2. Inverter size and type.</strong> A hybrid inverter that also uses grid power costs a little more than a basic off-grid unit, but lets you buy a smaller battery. Read <Link href="/blog/hybrid-vs-off-grid-solar-nigeria" style={a}>hybrid vs off-grid</Link>.</p>
          <p style={p}><strong>3. Number and brand of panels.</strong> We use tier-one brands such as Jinko and Longi. Cheap unbranded panels cost less up front and lose output quickly. Here is <Link href="/blog/fake-substandard-solar-panels-nigeria" style={a}>how to spot fake panels</Link>.</p>
          <p style={p}><strong>4. Your building.</strong> Bungalows are the simplest. <Link href="/blog/solar-on-upstairs-building" style={a}>Upstairs buildings</Link> and duplexes can need longer cable runs and more roof-access equipment.</p>
          <p style={p}><strong>5. Location and logistics.</strong> Equipment prices are the same everywhere we work. Sites that need a long drive or a boat (Bonny, Brass, riverine communities) carry a transport cost that is listed on the quote.</p>
          <p style={p}><strong>6. What you want to power.</strong> ACs, water pumps, freezers and pressing irons change the size of everything. The <Link href="/calculator" style={a}>solar calculator</Link> sizes it from your appliance list, and <Link href="/blog/what-can-3kva-5kva-10kva-power" style={a}>this guide</Link> shows what each size can carry.</p>

          <h2 className="brig" style={{ ...h2, marginTop: 40 }}>What every LumaGrid quote includes</h2>
          <ul className="steps" style={{ listStyle: "disc" }}>
            <li>Inverter, lithium battery bank and solar panels, with brand and model named</li>
            <li>Mounting rails, DC and AC cabling, breakers, surge protection and earthing</li>
            <li>Installation, testing and a walkthrough of how to use the system</li>
            <li>2-year workmanship warranty and the manufacturers&apos; product warranties</li>
            <li>Any transport cost for sites outside Port Harcourt, shown up front</li>
          </ul>
        </div>
      </section>

      <section className="section" style={{ background: "var(--sand)" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2 className="brig" style={h2}>Solar price questions</h2>
          <div className="faq-list">
            {FAQS.map(f => (
              <details key={f.q}>
                <summary className="brig">{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p style={{ ...p, marginTop: 24 }}>
            Prices for your town:{" "}
            <Link href="/solar-installation/port-harcourt" style={a}>Port Harcourt</Link>,{" "}
            <Link href="/solar-installation/obio-akpor" style={a}>Obio-Akpor</Link>,{" "}
            <Link href="/solar-installation/warri" style={a}>Warri</Link>,{" "}
            <Link href="/solar-installation/asaba" style={a}>Asaba</Link>,{" "}
            <Link href="/solar-installation/yenagoa" style={a}>Yenagoa</Link> and{" "}
            <Link href="/solar-installation" style={a}>every other town we cover</Link>.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--ink)", padding: "56px 20px" }}>
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <h2 className="brig" style={{ color: "#fff", fontSize: "clamp(26px, 6vw, 40px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 14 }}>
            Get an exact price for your property
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 24 }}>
            Tell us your state, area, building type and what you want to power. We reply on WhatsApp with a recommendation and a price range, then confirm it after a free site visit.
          </p>
          <WhatsAppButton source="Pricing page - bottom" className="btn-lime" style={{ fontSize: 16, padding: "15px 26px" }}>
            <WhatsAppIcon size={18} color="var(--ink)" /> Get my quote
          </WhatsAppButton>
        </div>
      </section>

      <Footer />
    </>
  );
}
