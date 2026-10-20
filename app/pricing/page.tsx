import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Image from "next/image";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
import { CtaBand, FaqList, PageHero, QuoteButtons, SectionHead } from "@/components/site/blocks";
import { PACKAGES, PRICING, PETROL_PRICE_NGN, PETROL_PRICE_ASOF } from "@/lib/constants";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Solar Installation Prices in Nigeria (2026): 3kVA, 5kVA, 10kVA",
  description:
    "What solar costs in Port Harcourt, Warri and Yenagoa in 2026: 3kVA from ₦2.8M, 6kVA from ₦4.9M, plus 5kVA and 10kVA estimates and what pushes the price up or down.",
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
  { size: "3kVA", battery: "5kWh lithium", panels: "4 × 600W (2.4kW)", suits: "1–2 bedroom flat: lights, fans, TV, small fridge", price: "From ₦2.8M" },
  { size: "5kVA", battery: "5kWh lithium", panels: "5–6 × 600W (3–3.6kW)", suits: "2–3 bedroom home, one small inverter AC for a few hours", price: estimate(5, 5, 3.3) },
  { size: "6kVA", battery: "16kWh lithium", panels: "8 × 600W (4.8kW)", suits: "3–4 bedroom home with one 1.5HP inverter AC", price: "From ₦4.9M" },
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

const FACTORS = [
  { title: "Battery size", text: `The biggest cost. Lithium storage runs roughly ₦${(PRICING.perKwhBattery / 1000).toFixed(0)},000 per kWh installed. Running an AC through the night is what pushes it up.`, href: "/blog/how-long-do-solar-batteries-last-nigeria", link: "How long batteries last" },
  { title: "Inverter size and type", text: "A hybrid inverter that also uses grid power costs a little more than basic off-grid, but lets you buy a smaller battery.", href: "/blog/hybrid-vs-off-grid-solar-nigeria", link: "Hybrid vs off-grid" },
  { title: "Panel brand and count", text: "Tier-one panels such as Jinko and Longi cost more up front and keep their output for 25 years. Unbranded panels lose power fast.", href: "/blog/fake-substandard-solar-panels-nigeria", link: "Spot fake panels" },
  { title: "Your building", text: "Bungalows are simplest. Upstairs buildings and duplexes can need longer cable runs and more roof-access equipment.", href: "/blog/solar-on-upstairs-building", link: "Solar on upstairs buildings" },
  { title: "Location and logistics", text: "Equipment prices are the same everywhere we work. Long drives or boat trips (Bonny, Brass) add a transport line on the quote.", href: "/solar-installation", link: "Towns we cover" },
  { title: "What you want to power", text: "ACs, pumps, freezers and pressing irons change the size of everything. The calculator sizes it from your appliance list.", href: "/calculator", link: "Open the calculator" },
];

const INCLUDES = [
  "Inverter, lithium battery and solar panels, with brand and model named",
  "Mounting rails, DC and AC cabling, breakers, surge protection and earthing",
  "Installation, testing and a walkthrough of how to use the system",
  "2-year workmanship warranty plus the manufacturers' product warranties",
  "Any transport cost for sites outside Port Harcourt, shown up front",
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Solar prices", href: "/pricing" }])} />
      <JsonLd data={faqSchema(FAQS)} />
      <Navbar />

      <PageHero
        eyebrow={`Prices · Updated ${PETROL_PRICE_ASOF}`}
        title={<>Solar Prices in Nigeria (2026): <span className="hl">Port Harcourt, Warri &amp; Yenagoa</span></>}
        lead="Installed prices for complete solar systems in Rivers, Delta and Bayelsa, and the things that move a quote up or down."
        image="/images/real/longi-panel-pallets.jpeg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Prices" }]}
      >
        <QuoteButtons source="Pricing page - top" primary="Get my exact price" />
      </PageHero>

      <section className="sec--tight sec--sand">
        <div className="wrap wrap--narrow">
          <aside className="quick-answer reveal" aria-label="Quick answer" style={{ marginBottom: 0 }}>
            <strong>TL;DR</strong>
            <p>
              A complete installed system starts at about <b>₦2.8M for 3kVA</b> (5kWh lithium, four 600W panels) and about
              {" "}<b>₦4.9M for 6kVA</b> (16kWh lithium, eight 600W panels). 5kVA usually lands around <b>{estimate(5, 5, 3.3)}</b> and
              10kVA around <b>{estimate(10, 15, 6.6)}</b>. Prices include inverter, battery, panels, mounting, cabling, protection and installation.
            </p>
          </aside>
        </div>
      </section>

      <section className="sec sec--sand" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <SectionHead eyebrow="Packages" title="Solar packages and installed prices" />
          <div className="g3">
            {PACKAGES.map((p, i) => (
              <article key={p.name} className={`plan reveal${p.highlight ? " plan--featured" : ""}`} style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                {p.badge && <span className="pill pill--lime plan__badge">{p.badge}</span>}
                <div className="plan__head">
                  <div className="plan__name">{p.name} · {p.kva}</div>
                  <div className="plan__price">{p.priceNote && <small>{p.priceNote}</small>}{p.price}</div>
                  <div style={{ fontSize: 14, marginTop: 8, opacity: .75 }}>{p.label}</div>
                </div>
                <div className="plan__body">
                  <div>
                    <div className="plan__label">Runs</div>
                    <ul className="ticks" style={{ gap: 9, fontSize: 14.5 }}>{p.appliances.map(a => <li key={a}>{a}</li>)}</ul>
                  </div>
                  <div>
                    <div className="plan__label">Includes</div>
                    <ul style={{ listStyle: "none", display: "grid", gap: 6, fontSize: 14, color: "var(--muted)" }}>{p.includes.map(x => <li key={x}>• {x}</li>)}</ul>
                  </div>
                  <WhatsAppButton source={`Pricing - ${p.name} ${p.kva}`} className={`btn ${p.highlight ? "btn--lime" : "btn--ink"}`}>
                    <WhatsAppIcon size={17} color={p.highlight ? "var(--ink)" : "#fff"} />
                    {p.price === "Custom" ? "Get a custom quote" : `Get the ${p.name} quote`}
                  </WhatsAppButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap">
          <SectionHead eyebrow="By size" title="Solar system prices by size: 3kVA, 5kVA, 6kVA & 10kVA" lead={<>3kVA and 6kVA are standard packages. 5kVA and 10kVA are estimates from the same pricing the <Link href="/calculator" className="link-arrow">calculator</Link> uses.</>} />
          <div className="table-wrap reveal">
            <table className="compare">
              <thead><tr><th>Inverter</th><th>Battery</th><th>Panels</th><th>Suits</th><th>Installed price</th></tr></thead>
              <tbody>
                {SIZES.map(s => (
                  <tr key={s.size}><td><strong>{s.size}</strong></td><td>{s.battery}</td><td>{s.panels}</td><td>{s.suits}</td><td>{s.price}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap">
          <SectionHead eyebrow="What moves the price" title="What affects the cost of solar in Nigeria" />
          <div className="g3">
            {FACTORS.map((f, i) => (
              <div key={f.title} className="card reveal" style={{ "--d": `${(i % 3) * 0.06}s` } as React.CSSProperties}>
                <div className="kicker" style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 800, fontSize: 30, color: "var(--green-mid)", lineHeight: 1, marginBottom: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="h3">{f.title}</h3>
                <p>{f.text}</p>
                <Link href={f.href} className="link-arrow" style={{ marginTop: 14, fontSize: 14 }}>{f.link} <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap split2">
          <div className="reveal">
            <span className="eyebrow">Every quote</span>
            <h2 className="h2">What is included in a solar installation price</h2>
            <ul className="ticks" style={{ marginTop: 22 }}>{INCLUDES.map(x => <li key={x}>{x}</li>)}</ul>
            <div style={{ marginTop: 24 }}><Link href="/blog/how-to-read-a-solar-quote" className="link-arrow">How to read a solar quote <ArrowRight size={15} /></Link></div>
          </div>
          <div className="frame frame--4x3 reveal-scale">
            <Image src="/images/real/LiFePo4-batteries-in-storage.jpeg" alt="LiFePO4 lithium batteries in storage, ready for LumaGrid installs" fill sizes="(max-width: 960px) 100vw, 560px" />
          </div>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap wrap--narrow">
          <SectionHead eyebrow="FAQ" title="Solar price FAQs" center />
          <FaqList faqs={FAQS} />
          <p className="muted" style={{ marginTop: 26, textAlign: "center", lineHeight: 1.8 }}>
            Prices for your town:{" "}
            <Link href="/solar-installation/port-harcourt" className="link-arrow">Port Harcourt</Link>,{" "}
            <Link href="/solar-installation/warri" className="link-arrow">Warri</Link>,{" "}
            <Link href="/solar-installation/asaba" className="link-arrow">Asaba</Link>,{" "}
            <Link href="/solar-installation/yenagoa" className="link-arrow">Yenagoa</Link>,{" "}
            <Link href="/solar-installation" className="link-arrow">all towns</Link>.
          </p>
        </div>
      </section>

      <CtaBand source="Pricing page - bottom" title="Get an exact price for your property." />
      <Footer />
    </>
  );
}
