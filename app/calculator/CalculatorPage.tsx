import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolarCalculator from "@/components/tools/SolarCalculator";
import JsonLd from "@/components/seo/JsonLd";
import { CtaBand, PageHero, SectionHead } from "@/components/site/blocks";
import { PETROL_PRICE_NGN, PETROL_PRICE_ASOF, PETROL_PRICE_NOTE, SITE_URL } from "@/lib/constants";
import { FuelPump, ArrowRight } from "@/components/ui/icons";
import { breadcrumbSchema } from "@/lib/schema";

const HOW = [
  { title: "Your fuel spend", text: "Weekly petrol or diesel, plus about ₦180,000 a year of servicing, gives your true yearly generator cost." },
  { title: "Your appliances", text: "Watts × hours for everything you want on solar, split into daytime and night-time use." },
  { title: "Rainy-season sizing", text: "Panels are sized for low rainy-season sun in your state, so the battery still fills from April to October." },
];

export default function CalculatorPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Solar calculator", href: "/calculator" }])} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "WebApplication", name: "LumaGrid Solar & Generator Savings Calculator",
        url: `${SITE_URL}/calculator`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
        description: "Work out your yearly generator cost and the solar system that would replace it, sized for rainy season in Rivers, Delta and Bayelsa.",
      }} />
      <Navbar />

      <PageHero
        eyebrow="What does your generator really cost?"
        title={<>Solar Calculator: <span className="hl">Generator vs Solar Cost in Nigeria</span></>}
        lead="Work out your yearly fuel spend, then see the solar system that would replace it: panels, battery, inverter and how long it takes to pay for itself."
        image="/images/real/solar-panels-on-the-roof.jpeg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Calculator" }]}
      >
        <span className="pill pill--glass" style={{ marginTop: 18 }}>
          <span style={{ color: "var(--lime)" }}><FuelPump size={15} /></span>
          ₦{PETROL_PRICE_NGN.toLocaleString("en-NG")}/litre · {PETROL_PRICE_NOTE}, {PETROL_PRICE_ASOF}
        </span>
      </PageHero>

      <section className="sec sec--sand" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <h2 className="h3" style={{ marginBottom: 18 }}>Generator vs solar savings calculator</h2>
          <SolarCalculator />
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title="How the solar savings calculator works" />
          <div className="g3">
            {HOW.map((h, i) => (
              <div key={h.title} className="card reveal" style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                <h3 className="h3">{h.title}</h3>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 22 }}>
            Results are estimates. <Link href="/pricing" className="link-arrow">See real prices <ArrowRight size={14} /></Link> or read <Link href="/blog/how-much-solar-do-i-need" className="link-arrow">how to size a system yourself</Link>.
          </p>
        </div>
      </section>

      <CtaBand source="Calculator page - bottom" title="Want a real quote, not an estimate?" />
      <Footer />
    </>
  );
}
