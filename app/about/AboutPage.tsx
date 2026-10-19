import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { CtaBand, PageHero, QuoteButtons, SectionHead } from "@/components/site/blocks";
import { Bolt, Handshake, Wrench, MapPin, ArrowRight } from "@/components/ui/icons";
import { CITIES, STATE_PAGES } from "@/lib/cities";
import { breadcrumbSchema } from "@/lib/schema";

const VALUES = [
  { icon: Bolt, title: "Energy independence", body: "We exist to cut every home and business loose from a grid that was never built to serve them. Your power should come from the sun, not from waiting on NEPA." },
  { icon: Handshake, title: "Honest work", body: "No inflated quotes and no hidden markups. You get a clear, itemised breakdown of what you are paying for and exactly what you will get." },
  { icon: Wrench, title: "Quality that lasts", body: "We install systems we would put in our own homes: tier-one panels, pure sine wave inverters, lithium batteries and workmanship that holds up through harmattan and rainy season." },
  { icon: MapPin, title: "Built for this region", body: "We know the Niger Delta: the load demands, the weather, the soot, the floods and the voltage swings that generic installers overlook." },
];

const PROMISES = [
  "A site assessment before every quote. No guessing over the phone.",
  "Our own trained installation team, not casual labour.",
  "Itemised pricing that names every brand, model and cable size.",
  "Proper protection: breakers, surge protection and earthing.",
  "A 2-year workmanship warranty, in writing.",
  "Support on WhatsApp after handover, not a disappearing act.",
];

export default function AboutPage() {
  const states = Object.keys(STATE_PAGES) as (keyof typeof STATE_PAGES)[];
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About", href: "/about" }])} />
      <Navbar />

      <PageHero
        eyebrow="About LumaGrid"
        title={<>We got tired of waiting for <span className="hl">light that never comes.</span></>}
        lead="LumaGrid Solar is a CAC-registered solar installer based in Port Harcourt. We design and install solar panels, hybrid inverters and lithium batteries for homes and businesses across Rivers, Delta and Bayelsa."
        image="/images/Lumagrid-12.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
      >
        <QuoteButtons source="About page - hero" />
      </PageHero>

      <section className="sec sec--paper">
        <div className="wrap split2">
          <div className="reveal">
            <span className="eyebrow">Our story</span>
            <h2 className="h2">The grid failed us all. We chose to do something about it.</h2>
            <div className="stack" style={{ marginTop: 20, fontSize: 17, lineHeight: 1.8, color: "var(--muted)" }}>
              <p>
                Every Nigerian knows the routine. You plan your day around when light might come. You buy fuel for a
                generator that eats money and chokes your lungs. You wait on NEPA apologies that explain nothing and
                fix nothing.
              </p>
              <p>
                The founders of LumaGrid Solar grew up in that same reality. Rivers State. Generators humming through
                the night. Businesses losing stock to heat. Children studying by candlelight. Not because resources
                were scarce, but because the system was broken beyond repair.
              </p>
              <p>
                So we stopped waiting. LumaGrid Solar was built to offer something different: a permanent exit from
                grid dependency. Real solar infrastructure designed, supplied and installed by people who understand
                this region and actually care about what happens after the job is done.
              </p>
              <p style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 20, color: "var(--ink)" }}>
                &ldquo;The sun rises every day in the Niger Delta. That energy belongs to you.&rdquo;
              </p>
            </div>
          </div>
          <div className="frame frame--4x5 reveal-scale">
            <Image src="/images/Lumagrid-9.jpg" alt="LumaGrid solar technician" fill sizes="(max-width: 960px) 100vw, 520px" />
          </div>
        </div>
      </section>

      <section className="sec sec--ink">
        <div className="wrap">
          <SectionHead eyebrow="What we stand for" title="Four rules behind every installation." />
          <div className="g4">
            {VALUES.map((v, i) => (
              <div key={v.title} className="card card--ink reveal" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                <span className="card-icon"><v.icon size={22} /></span>
                <h3 className="h3" style={{ color: "#fff" }}>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap split2 split2--rev">
          <div className="reveal">
            <span className="eyebrow">Our promise</span>
            <h2 className="h2">We do not cut corners. And we do not disappear.</h2>
            <p className="lead" style={{ marginTop: 14 }}>Plenty of people will sell you solar in Port Harcourt. Not all of them will still pick up your call six months later. We built LumaGrid on the standard we wished existed when we were looking for someone to trust.</p>
            <ul className="ticks" style={{ marginTop: 24 }}>{PROMISES.map(p => <li key={p}>{p}</li>)}</ul>
            <div style={{ marginTop: 26 }}>
              <Link href="/blog/choosing-a-solar-installer-port-harcourt" className="link-arrow">12 questions to ask any installer <ArrowRight size={15} /></Link>
            </div>
          </div>
          <div className="frame frame--4x3 reveal-scale">
            <Image src="/images/real/jinko-panels-delivered-compound.jpeg" alt="Jinko solar panels delivered to a customer's compound" fill sizes="(max-width: 960px) 100vw, 560px" />
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap">
          <SectionHead eyebrow="Where we work" title="Three states. Twenty-two towns." lead="Port Harcourt is our base. We travel across the Niger Delta, including island and riverine communities, with transport costs shown on your quote before you pay." />
          <div className="g3">
            {states.map((st, i) => (
              <Link key={st} href={STATE_PAGES[st].href} className="card card--hover reveal" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                <span className="card-icon"><MapPin size={22} /></span>
                <h3 className="h3">{STATE_PAGES[st].label}</h3>
                <p>{CITIES.filter(c => c.state === st).map(c => c.name).join(", ")}</p>
                <span className="link-arrow" style={{ marginTop: 14, fontSize: 14 }}>Solar in {STATE_PAGES[st].label} <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand source="About page - bottom" title="Let's end your generator bill." />
      <Footer />
    </>
  );
}
