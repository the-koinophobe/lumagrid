import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CalculatorSection from "@/components/home/CalculatorSection";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import EnergyFlow from "@/components/site/EnergyFlow";
import Counter from "@/components/site/Counter";
import PostCard from "@/components/site/PostCard";
import { CtaBand, FaqList, MoreLink, QuoteButtons, SectionHead } from "@/components/site/blocks";
import { Stars, GoogleIcon, WhatsAppIcon } from "@/components/ui";
import { ArrowRight, Bolt, Wrench, Battery, Building, Check, Shield, MapPin, FuelPump } from "@/components/ui/icons";
import { FAQS, GBP_REVIEW_URL, PACKAGES, PETROL_PRICE_NGN, TESTIMONIALS } from "@/lib/constants";
import { CITIES, STATE_PAGES } from "@/lib/cities";
import { getAllPosts } from "@/lib/blog";

const SERVICES = [
  { icon: Bolt, title: "Home solar systems", text: "Hybrid systems for flats, bungalows and duplexes, sized to your real load and to rainy-season sun.", href: "/services#residential" },
  { icon: Building, title: "Business solar", text: "Shops, offices, schools, hotels and cold rooms. Cut diesel and stop losing sales to outages.", href: "/services#commercial" },
  { icon: Battery, title: "Lithium upgrades", text: "Swap dying gel or tubular batteries for LiFePO4 that lasts 8 to 15 years.", href: "/services#battery-upgrade" },
  { icon: Wrench, title: "Maintenance & repairs", text: "Cleaning, health checks, fault finding and fixes for systems of any brand.", href: "/services#maintenance" },
];

const WHY = [
  "Free site assessment before every quote",
  "Itemised quotes that name every brand and model",
  "Tier-one panels (Jinko, Longi) and LiFePO4 lithium batteries",
  "Sized for rainy-season sunshine, not best-case days",
  "Clean, labelled wiring with surge protection and earthing",
  "2-year workmanship warranty and WhatsApp support after handover",
];

const GALLERY = [
  { src: "/images/real/solar-panels-on-the-roof.jpeg", alt: "Solar panels installed by LumaGrid on a roof in the Niger Delta", cap: "Rooftop array, Niger Delta" },
  { src: "/images/real/5kwh-6Kva-system-abraka.jpeg", alt: "6kVA inverter and 5kWh lithium battery installed in Abraka", cap: "6kVA + 5kWh lithium, Abraka" },
  { src: "/blog/solar-small-business-rivers-state/hero.jpg", alt: "LumaGrid installer fixing panels on a roof", cap: "Installation in progress" },
  { src: "/images/real/jinko-panels-delivered-compound.jpeg", alt: "Jinko solar panels delivered to a customer's compound", cap: "Jinko panels on delivery" },
  { src: "/images/real/movable-LifePo4-batteries.jpeg", alt: "LiFePO4 lithium batteries ready for installation", cap: "LiFePO4 lithium storage" },
  { src: "/images/real/solar-panels-in-transit.jpeg", alt: "Truck carrying solar panels to an installation", cap: "On the way to site" },
];

const STEPS = [
  { title: "Tell us what you need", text: "Answer five quick questions on WhatsApp: your area, building and what you want to power." },
  { title: "Free site assessment", text: "We visit, check your loads, roof and shade, and agree where everything goes." },
  { title: "Itemised quote", text: "Every brand, model, cable and breaker listed. No surprises later." },
  { title: "Install & handover", text: "Most homes are done in 1 to 2 days. We test, explain and stay on WhatsApp." },
];

export default function LumaGridHome() {
  const posts = getAllPosts();
  const featuredSlugs = ["how-much-does-solar-cost-in-port-harcourt", "lithium-vs-tubular-battery", "what-can-3kva-5kva-10kva-power"];
  const guides = featuredSlugs.map(s => posts.find(p => p.slug === s)).filter(p => p !== undefined);
  const monthly = 8 * PETROL_PRICE_NGN * 30;

  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero on-dark">
        <div className="hero__bg">
          <Image src="/images/real/solar-panels-on-the-roof.jpeg" alt="Solar panels on a roof in the Niger Delta, installed by LumaGrid" fill priority sizes="100vw" />
        </div>
        <div className="hero__scrim" />
        <div className="wrap hero__inner">
          <div>
            <span className="pill pill--glass">
              <MapPin size={14} /> Port Harcourt · Warri · Asaba · Yenagoa
            </span>
            <h1 className="display">
              Solar that <span className="hl">ends the generator</span> for good.
            </h1>
            <p className="lead">
              LumaGrid designs and installs solar panels, hybrid inverters and lithium batteries for homes and
              businesses across Rivers, Delta and Bayelsa. Sized for rainy season. Installed in 1 to 2 days.
            </p>
            <div className="btn-row btn-row--stack" style={{ marginTop: 28 }}>
              <WhatsAppButton source="Homepage hero" className="btn btn--lime btn--lg">
                <WhatsAppIcon size={19} color="var(--ink)" /> Get a free quote
              </WhatsAppButton>
              <a href="#calculator" className="btn btn--ghost btn--lg">Calculate my savings <ArrowRight size={17} /></a>
            </div>
            <div className="hero__proof">
              <span><Stars count={5} /> 5.0 on Google</span>
              <span><Shield size={16} /> CAC registered</span>
              <span><Check size={16} /> 2-year workmanship warranty</span>
            </div>
          </div>

          <aside className="hero-card reveal-scale" style={{ "--d": ".2s" } as React.CSSProperties}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,.7)", marginBottom: 12 }}>
              <span style={{ color: "var(--lime)" }}><FuelPump size={16} /></span> 8 litres of petrol a day costs
            </div>
            <div className="hero-card__big">₦{monthly.toLocaleString("en-NG")}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,.75)", marginTop: 6 }}>every month at ₦{PETROL_PRICE_NGN.toLocaleString("en-NG")}/litre</div>
            <hr style={{ border: 0, borderTop: "1px solid rgba(255,255,255,.14)", margin: "18px 0" }} />
            <div style={{ fontSize: 14, color: "rgba(255,255,255,.8)", lineHeight: 1.6 }}>
              A family solar system from <strong style={{ color: "#fff" }}>₦3.8M</strong> pays that back in under a year, then keeps saving.
            </div>
            <a href="#calculator" className="link-arrow" style={{ marginTop: 14, color: "#fff" }}>Work out my numbers <ArrowRight size={15} /></a>
          </aside>
        </div>
      </section>

      {/* ── Proof numbers ─────────────────────────────────────────────── */}
      <section className="sec--tight" style={{ background: "#fff", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="stats reveal">
            <div><div className="stat__num"><Counter to={CITIES.length} /></div><div className="stat__label">Towns covered across Rivers, Delta & Bayelsa</div></div>
            <div><div className="stat__num">1–2 days</div><div className="stat__label">Typical home installation time</div></div>
            <div><div className="stat__num"><Counter to={2} suffix="-yr" /></div><div className="stat__label">Workmanship warranty on every install</div></div>
            <div><div className="stat__num"><Counter to={25} suffix="-yr" /></div><div className="stat__label">Panel life from tier-one brands</div></div>
          </div>
        </div>
      </section>

      <CalculatorSection />

      {/* ── Why LumaGrid ──────────────────────────────────────────────── */}
      <section className="sec sec--paper">
        <div className="wrap split2">
          <div className="frame frame--4x5 reveal-scale">
            <Image src="/images/Lumagrid-13.jpg" alt="LumaGrid solar engineer on site" fill sizes="(max-width: 960px) 100vw, 560px" />
          </div>
          <div className="reveal">
            <span className="eyebrow">Why LumaGrid</span>
            <h2 className="h2">Built for the Niger Delta, not just Nigeria.</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Heavy rainy seasons, soot, salt air, floods, upstairs buildings and short PHED or BEDC hours. We design
              around all of it, so your system keeps up in July as well as January.
            </p>
            <ul className="ticks" style={{ marginTop: 26 }}>
              {WHY.map(w => <li key={w}>{w}</li>)}
            </ul>
            <div style={{ marginTop: 28 }}><MoreLink href="/about">How we work</MoreLink></div>
          </div>
        </div>
      </section>

      {/* ── How solar works (animated) ────────────────────────────────── */}
      <section className="sec sec--ink">
        <div className="wrap split2">
          <div className="reveal">
            <span className="eyebrow">How it works</span>
            <h2 className="h2">Sun by day. <span className="hl">Battery by night.</span></h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Panels turn sunlight into power. The hybrid inverter runs your home, fills the lithium battery, and
              switches to it the moment the sun goes down or NEPA takes light. Grid or generator power can top it up
              on very cloudy days.
            </p>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <Link href="/blog/how-does-solar-work-simple-guide" className="btn btn--ghost">How solar works <ArrowRight size={16} /></Link>
              <Link href="/blog/why-lithium-ion-batteries-are-better-for-solar" className="btn btn--ghost">Why lithium</Link>
            </div>
          </div>
          <div className="flow-card reveal-scale" style={{ "--d": ".1s" } as React.CSSProperties}>
            <EnergyFlow />
          </div>
        </div>
      </section>

      {/* ── Packages ──────────────────────────────────────────────────── */}
      <section id="packages" className="sec sec--sand">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow="Packages & prices" title={<>Clear prices. <br className="only-desktop" />No guesswork.</>} lead="Installed prices for 2026. Every quote is confirmed after a free site visit and itemised line by line." />
            <MoreLink href="/pricing">Full price guide</MoreLink>
          </div>
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
                    <ul style={{ listStyle: "none", display: "grid", gap: 6, fontSize: 14, color: "var(--muted)" }}>
                      {p.includes.map(x => <li key={x}>• {x}</li>)}
                    </ul>
                  </div>
                  <WhatsAppButton
                    source={`${p.name} ${p.kva} package (${p.price === "Custom" ? "custom" : `from ${p.price}`})`}
                    className={`btn ${p.highlight ? "btn--lime" : "btn--ink"}`}
                  >
                    <WhatsAppIcon size={17} color={p.highlight ? "var(--ink)" : "#fff"} />
                    {p.price === "Custom" ? "Get a custom quote" : `Get the ${p.name} quote`}
                  </WhatsAppButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────── */}
      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow="What we do" title="Everything solar, done properly." />
            <MoreLink href="/services">All services</MoreLink>
          </div>
          <div className="g4">
            {SERVICES.map((s, i) => (
              <Link key={s.title} href={s.href} className="card card--hover reveal" style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                <span className="card-icon"><s.icon size={22} /></span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
                <span className="link-arrow" style={{ marginTop: 14, fontSize: 14 }}>Learn more <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent installs ───────────────────────────────────────────── */}
      <section id="gallery" className="sec sec--sand">
        <div className="wrap">
          <SectionHead eyebrow="Our work" title="Real installs. Real equipment." lead="Photos from our jobs and stock: genuine Jinko and Longi panels, LiFePO4 lithium batteries and neat, labelled installs." />
          <div className="gallery-grid">
            {GALLERY.map((g, i) => (
              <figure key={g.src} className={`gallery-item reveal${i === 0 ? " gallery-item--big" : ""}`} style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}>
                <Image src={g.src} alt={g.alt} fill sizes={i === 0 ? "(max-width: 900px) 100vw, 600px" : "(max-width: 900px) 50vw, 300px"} />
                <figcaption>{g.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────── */}
      <section className="sec sec--paper">
        <div className="wrap">
          <SectionHead eyebrow="The process" title="From first message to first night of steady power." center />
          <ol className="steps2">
            {STEPS.map((s, i) => (
              <li key={s.title} className="reveal" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────────── */}
      <section className="sec sec--sand">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow="Reviews" title="What customers say." />
            <div className="btn-row">
              <span className="badge-google"><GoogleIcon /> 5.0 <Stars count={5} /></span>
              <a href={GBP_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">Leave a review</a>
            </div>
          </div>
          <div className="g2">
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.name} className="card qcard reveal" style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                <Stars count={t.stars} />
                <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption>
                  <strong>{t.name}{t.location ? `, ${t.location}` : ""}</strong>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: 13 }}><GoogleIcon /> Google review</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage ──────────────────────────────────────────────────── */}
      <section className="sec sec--ink" style={{ overflow: "hidden" }}>
        <div className="wrap">
          <SectionHead eyebrow="Coverage" title={<>Installing across <span className="hl">Rivers, Delta & Bayelsa.</span></>} lead={`${CITIES.length} towns, from Port Harcourt and Bonny to Warri, Asaba and Yenagoa. Pick yours for local prices, areas and answers.`} />
        </div>
        <div className="marquee reveal" aria-label="Towns we cover">
          <div className="marquee__track">
            {[...CITIES, ...CITIES].map((c, i) => (
              <Link key={`${c.slug}-${i}`} href={`/solar-installation/${c.slug}`} tabIndex={i >= CITIES.length ? -1 : 0} aria-hidden={i >= CITIES.length}>
                <MapPin size={15} /> {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 36 }}>
          <div className="g3">
            {(Object.keys(STATE_PAGES) as (keyof typeof STATE_PAGES)[]).map((st, i) => (
              <Link key={st} href={STATE_PAGES[st].href} className="card card--ink card--hover reveal" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                <h3 className="h3" style={{ color: "#fff" }}>{STATE_PAGES[st].label}</h3>
                <p>{CITIES.filter(c => c.state === st).map(c => c.name).join(", ")}</p>
                <span className="link-arrow" style={{ marginTop: 14, color: "var(--lime)", fontSize: 14 }}>View {STATE_PAGES[st].label} <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guides ────────────────────────────────────────────────────── */}
      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow="Solar guides" title="Answers before you spend a naira." />
            <MoreLink href="/blog">All {posts.length} guides</MoreLink>
          </div>
          <div className="g3">
            {guides.map((p, i) => (
              <div key={p.slug} className="reveal" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}><PostCard post={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="sec sec--sand">
        <div className="wrap wrap--narrow">
          <SectionHead eyebrow="FAQ" title="Questions people in the Niger Delta ask us." center />
          <FaqList faqs={FAQS} />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <QuoteButtons source="Homepage FAQ" primary="Ask us on WhatsApp" size="md" />
          </div>
        </div>
      </section>

      <CtaBand source="Homepage final CTA" />
      <Footer />
    </>
  );
}
