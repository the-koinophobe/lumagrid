import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { CtaBand, FaqList, PageHero, QuoteButtons, SectionHead } from "@/components/site/blocks";
import { WhatsAppIcon } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const SERVICES = [
  {
    id: "residential",
    tag: "For homes",
    title: "Home solar installation",
    subtitle: "Reliable power for your home, day and night.",
    image: "/images/real/5kwh-6Kva-system-abraka.jpeg",
    alt: "6kVA hybrid inverter and lithium battery installed in a home in Abraka",
    description:
      "Stop depending on PHED, BEDC and petrol generators. We design and install complete hybrid solar systems for flats, bungalows, duplexes and estates across Rivers, Delta and Bayelsa. Every system is sized to what you actually run, so you never pay for capacity you do not use and never run short in rainy season.",
    features: [
      "Free on-site energy assessment",
      "Systems from 3kVA to 10kVA and above",
      "Tier-one monocrystalline panels (Jinko, Longi)",
      "LiFePO4 lithium battery storage",
      "Pure sine wave hybrid inverter with built-in MPPT",
      "Breakers, surge protection and earthing on every job",
      "Testing, handover and a walkthrough of your system",
      "2-year workmanship warranty",
    ],
    guide: { label: "What 3kVA, 5kVA and 10kVA can power", href: "/blog/what-can-3kva-5kva-10kva-power" },
  },
  {
    id: "commercial",
    tag: "For businesses",
    title: "Business & commercial solar",
    subtitle: "Cut your diesel bill. Stop losing sales to outages.",
    image: "/images/real/movable-LifePo4-batteries.jpeg",
    alt: "Commercial lithium battery cabinets ready for installation",
    description:
      "Shops, offices, schools, clinics, hotels, filling stations and cold rooms. We audit your load, show you the payback, then design a hybrid system that keeps critical equipment running and uses grid or generator power only as backup.",
    features: [
      "Load audit and payback (ROI) projection",
      "Systems from 10kVA upward, three-phase available",
      "Large lithium battery banks",
      "Generator and grid integration with auto-switching",
      "Critical-load circuits for servers, fridges and medical equipment",
      "Remote monitoring through the inverter app",
      "Priority support line for business customers",
    ],
    guide: { label: "Solar ROI for businesses", href: "/blog/solar-roi-for-business-nigeria" },
  },
  {
    id: "battery-upgrade",
    tag: "Upgrade",
    title: "Gel & tubular to lithium upgrade",
    subtitle: "The single best upgrade you can make to an old system.",
    image: "/images/real/lumagrid-deriy-batteries-for-solar-installation.jpeg",
    alt: "LiFePO4 lithium batteries ready for a LumaGrid upgrade",
    description:
      "Still running gel or tubular batteries that die every two years? LiFePO4 lithium lasts 8 to 15 years, gives you almost double the usable power from the same label size, charges faster on cloudy days and needs no water or care.",
    features: [
      "Check of your existing inverter and settings",
      "Lithium sized to your night-time load",
      "Removal of old lead-acid batteries",
      "LiFePO4 installation with BMS set-up and testing",
      "Before-and-after backup check",
      "Manufacturer battery warranty plus our workmanship warranty",
    ],
    guide: { label: "Gel or tubular to lithium: cost guide", href: "/blog/gel-to-lithium-upgrade-cost" },
  },
  {
    id: "maintenance",
    tag: "Keep it running",
    title: "Maintenance, repairs & health checks",
    subtitle: "Your system is an investment. Protect it.",
    image: "/images/real/jinko-panel.jpeg",
    alt: "Solar panel with its rating label, checked during maintenance",
    description:
      "Soot, dust, loose connections and wrong settings quietly rob you of power. We clean, test and fix systems of any brand, so your panels, inverter and batteries keep performing through harmattan and rainy season.",
    features: [
      "Panel cleaning and output check",
      "Battery health and capacity test",
      "Inverter diagnostics and firmware updates",
      "Cable, breaker and connection checks",
      "Surge protection and earthing test",
      "Written report after every visit",
    ],
    guide: { label: "Rainy season maintenance checklist", href: "/blog/solar-panel-maintenance-rainy-season" },
  },
];

const COMPARE = [
  ["Typical life with daily use", "2 to 3 years", "8 to 15 years"],
  ["Usable capacity", "About 50%", "About 80 to 95%"],
  ["Charge speed", "Slow", "Fast"],
  ["Efficiency", "70 to 85%", "95% and up"],
  ["Maintenance", "Yes (tubular needs water)", "None"],
  ["Heat tolerance", "Poor", "Good"],
  ["Weight for the same use", "Very heavy", "Much lighter"],
];

const FAQS = [
  { q: "How long does a home solar installation take?", a: "Most home installations in Port Harcourt, Warri and Yenagoa take 1 to 2 working days. Larger commercial systems take 3 to 5 days. You get a clear timeline in your quote." },
  { q: "Which areas do you cover?", a: "All of Rivers State (Port Harcourt, Obio-Akpor, Eleme, Oyigbo, Bonny, Okrika, Ahoada, Omoku, Bori), Delta State (Warri, Effurun, Asaba, Sapele, Ughelli, Abraka, Agbor) and Bayelsa State (Yenagoa, Amassoma, Ogbia, Sagbama, Kaiama, Brass)." },
  { q: "Is lithium really worth it over gel or tubular?", a: "For daily solar use, yes. Gel and tubular batteries usually last 2 to 3 years in our heat. LiFePO4 lithium lasts 8 to 15 years, gives almost double the usable capacity and needs no maintenance, so it costs less per year." },
  { q: "Do you install hybrid and off-grid systems?", a: "Yes. Most homes get a hybrid system that uses solar first, battery at night and grid or generator as backup. Places with no grid, like Bonny or Brass, get fully off-grid designs." },
  { q: "Which brands do you use?", a: "Tier-one panels such as Jinko and Longi, LiFePO4 lithium batteries with a built-in BMS, and pure sine wave hybrid inverters. Your quote names every brand and model." },
  { q: "Can you fix a system another company installed?", a: "Yes. We service and repair systems of any brand. Book a diagnostic visit and we will tell you what is wrong and what it will cost to fix." },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }])} />
      <Navbar />

      <PageHero
        eyebrow="Solar installation, upgrades and support"
        title={<>Solar Installation Services in <span className="hl">Port Harcourt &amp; the Niger Delta</span></>}
        lead="Home and business solar, lithium battery upgrades and maintenance across Rivers, Delta and Bayelsa. Designed for rainy season, installed in 1 to 2 days, backed by a 2-year workmanship warranty."
        image="/blog/solar-small-business-rivers-state/hero.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
      >
        <QuoteButtons source="Services page - hero" />
        <nav aria-label="Jump to a service" className="tag-row" style={{ marginTop: 26 }}>
          {SERVICES.map(s => <a key={s.id} href={`#${s.id}`} className="pill pill--glass">{s.title}</a>)}
        </nav>
      </PageHero>

      {SERVICES.map((s, i) => (
        <section key={s.id} id={s.id} className={`sec ${i % 2 ? "sec--sand" : "sec--paper"}`} style={{ scrollMarginTop: 72 }}>
          <div className={`wrap split2${i % 2 ? " split2--rev" : ""}`}>
            <div className="frame frame--4x3 reveal-scale">
              <Image src={s.image} alt={s.alt} fill sizes="(max-width: 960px) 100vw, 560px" />
            </div>
            <div className="reveal">
              <span className="eyebrow">{s.tag}</span>
              <h2 className="h2" style={{ fontSize: "clamp(28px, 4.6vw, 44px)" }}>{s.title}</h2>
              <p className="h3" style={{ color: "var(--green-mid)", fontWeight: 600, marginTop: 10 }}>{s.subtitle}</p>
              <p className="lead" style={{ marginTop: 14 }}>{s.description}</p>
              <ul className="ticks" style={{ marginTop: 22, gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
                {s.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <div className="btn-row" style={{ marginTop: 26, alignItems: "center" }}>
                <WhatsAppButton source={`Services - ${s.title}`} className="btn btn--ink">
                  <WhatsAppIcon size={17} /> Ask about this
                </WhatsAppButton>
                <Link href={s.guide.href} className="link-arrow">{s.guide.label} <ArrowRight size={15} /></Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="sec sec--paper">
        <div className="wrap wrap--narrow">
          <SectionHead eyebrow="Why we fit lithium" title="Lithium vs tubular batteries for solar" lead="The battery is the most expensive part of a solar system. Here is why we install lithium." />
          <div className="table-wrap reveal">
            <table className="compare">
              <thead><tr><th>What matters</th><th>Gel / tubular</th><th>LiFePO4 lithium</th></tr></thead>
              <tbody>{COMPARE.map(([a, b, c]) => <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>)}</tbody>
            </table>
          </div>
          <p style={{ marginTop: 16 }}>
            <Link href="/blog/why-lithium-ion-batteries-are-better-for-solar" className="link-arrow">Why lithium-ion is better for solar <ArrowRight size={15} /></Link>
          </p>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap wrap--narrow">
          <SectionHead eyebrow="FAQ" title="Solar installation service FAQs" center />
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <CtaBand source="Services page - bottom" />
      <Footer />
    </>
  );
}
