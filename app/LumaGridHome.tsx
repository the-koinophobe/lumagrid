import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CalculatorSection from "@/components/home/CalculatorSection";
import HeroQuote from "@/components/home/HeroQuote";
import DayNightFlow from "@/components/home/DayNightFlow";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import Counter from "@/components/site/Counter";
import PostCard from "@/components/site/PostCard";
import { CtaBand, FaqList, MoreLink, QuoteButtons, SectionHead } from "@/components/site/blocks";
import { Stars, GoogleIcon, WhatsAppIcon } from "@/components/ui";
import { ArrowRight, Battery, Check, Clock, Inverter, MapPin, Shield, SolarPanel } from "@/components/ui/icons";
import { FAQS, GBP_REVIEW_URL, GENERATOR_SERVICE_NGN_PER_YEAR, PACKAGES, PETROL_PRICE_ASOF, PETROL_PRICE_NGN, TESTIMONIALS } from "@/lib/constants";
import { CITIES, STATE_PAGES } from "@/lib/cities";
import { getAllPosts } from "@/lib/blog";

/*
 * Heading outline (SEO first: one keyword H1, keyword-led H2s, H3s under them):
 *   H1 Solar Installation in Port Harcourt, Warri & Yenagoa
 *   H2 Trusted solar installers in Port Harcourt and the Niger Delta
 *   H2 Solar installation services → H3 per service
 *   H2 How a hybrid solar system works, day and night
 *   H2 Generator vs solar: savings calculator
 *   H2 Solar system prices in Port Harcourt (2026) → H3 per package
 *   H2 Generator vs solar: 5-year cost in Nigeria
 *   H2 Why choose LumaGrid Solar → H3 per reason
 *   H2 Recent solar installations in the Niger Delta
 *   H2 Our solar installation process → H3 per step
 *   H2 LumaGrid Solar reviews
 *   H2 Solar installation areas: Rivers, Delta & Bayelsa → H3 per state
 *   H2 Solar guides: prices, batteries & sizing → H3 per guide
 *   H2 Solar installation FAQs → H3 per question
 */

const SERVICES = [
  { title: "Home solar installation", text: "Hybrid solar with lithium batteries for flats, bungalows, duplexes and upstairs buildings.", img: "/images/real/5kwh-6Kva-system-abraka.jpeg", alt: "Hybrid inverter and lithium battery installed in a home in Delta State", href: "/services#residential" },
  { title: "Commercial solar installation", text: "Shops, offices, schools, hotels and cold rooms. Cut diesel and stop losing sales to outages.", img: "/images/real/solar-panels-on-the-roof.jpeg", alt: "Rooftop solar panels for a business in the Niger Delta", href: "/services#commercial" },
  { title: "Lithium battery upgrades", text: "Replace dying gel or tubular batteries with LiFePO4 that lasts 8 to 15 years.", img: "/images/real/lumagrid-deriy-batteries-for-solar-installation.jpeg", alt: "LiFePO4 lithium batteries ready for a solar installation", href: "/services#battery-upgrade" },
  { title: "Solar maintenance & repair", text: "Cleaning, health checks, fault finding and repairs for solar systems of any brand.", img: "/images/real/jinko-panels.jpeg", alt: "Jinko solar panels checked during maintenance", href: "/services#maintenance" },
];

const WHY = [
  ["Free site assessment", "We visit and check your loads, roof and shade before we quote."],
  ["Itemised solar quotes", "Every brand, model, cable and breaker named. No hidden extras."],
  ["Tier-one equipment", "Jinko and Longi panels, LiFePO4 lithium and pure sine wave hybrid inverters."],
  ["Sized for rainy season", "Systems keep up from April to October, not just in dry season."],
  ["Safe, neat installs", "Breakers, surge protection and earthing on every job, bungalow or upstairs."],
  ["Real after-sales support", "2-year workmanship warranty and WhatsApp support after handover."],
] as const;

const GALLERY = [
  { src: "/images/real/solar-panels-on-the-roof.jpeg", alt: "Solar panels installed by LumaGrid on a roof in the Niger Delta", cap: "Rooftop solar array, Niger Delta" },
  { src: "/images/real/5kwh-6Kva-system-abraka.jpeg", alt: "6kVA inverter and 5kWh lithium battery installed in Abraka", cap: "6kVA + 5kWh lithium, Abraka" },
  { src: "/blog/solar-small-business-rivers-state/hero.jpg", alt: "LumaGrid installer fixing solar panels on a roof", cap: "Installation in progress" },
  { src: "/images/real/jinko-panels-delivered-compound.jpeg", alt: "Jinko solar panels delivered to a customer's compound", cap: "Jinko panels on delivery" },
  { src: "/images/real/movable-LifePo4-batteries.jpeg", alt: "LiFePO4 lithium batteries ready for installation", cap: "LiFePO4 lithium storage" },
  { src: "/images/real/solar-panels-in-transit.jpeg", alt: "Truck carrying solar panels to an installation", cap: "On the way to site" },
];

const STEPS = [
  { title: "Tell us what you need", text: "Five quick questions on WhatsApp: your area, building and what you want to power." },
  { title: "Free site assessment", text: "We check your loads, roof, shade and where the battery and inverter will go." },
  { title: "Itemised solar quote", text: "Every brand, model, cable and breaker listed and agreed before work starts." },
  { title: "Installation & handover", text: "Most homes are installed in 1 to 2 days. We test, explain and stay reachable." },
];

const millions = (n: number) => `₦${(n / 1_000_000).toFixed(1)}M`;

export default function LumaGridHome() {
  const posts = getAllPosts();
  const guideSlugs = ["how-much-does-solar-cost-in-port-harcourt", "lithium-vs-tubular-battery", "what-can-3kva-5kva-10kva-power"];
  const guides = guideSlugs.map(s => posts.find(p => p.slug === s)).filter(p => p !== undefined);
  const states = Object.keys(STATE_PAGES) as (keyof typeof STATE_PAGES)[];

  // 5-year cost: a home burning 8 litres of petrol a day vs the 6kVA family package.
  const monthly = 8 * PETROL_PRICE_NGN * 30;
  const gen5 = (8 * PETROL_PRICE_NGN * 365 + GENERATOR_SERVICE_NGN_PER_YEAR) * 5;
  const solar5 = 3_800_000 + 50_000 * 5;
  const solarWidth = `${Math.max(14, (solar5 / gen5) * 100).toFixed(1)}%`;

  return (
    <>
      <Navbar />

      {/* ── Hero: keyword H1 + two-tap quote starter ─────────────────── */}
      <section className="hero on-dark">
        <div className="hero__bg">
          <Image src="/images/real/solar-panels-on-the-roof.jpeg" alt="Solar panels on a roof in the Niger Delta, installed by LumaGrid Solar" fill priority sizes="100vw" />
        </div>
        <div className="hero__scrim" />
        <div className="wrap hero__inner">
          <div>
            <span className="pill pill--glass"><MapPin size={14} /> Rivers · Delta · Bayelsa</span>
            <h1 className="display" style={{ fontSize: "clamp(36px, 6.6vw, 70px)" }}>
              Solar Installation in <span className="hl">Port Harcourt, Warri &amp; Yenagoa</span>
            </h1>
            <p className="lead">
              LumaGrid Solar installs solar panels, hybrid inverters and lithium batteries for homes and businesses across
              Rivers, Delta and Bayelsa. From ₦1.7M installed, sized for rainy season and fitted in 1 to 2 days.
            </p>
            <div className="hero__proof">
              <span><Stars count={5} /> 5.0 on Google</span>
              <span><Shield size={16} /> CAC registered</span>
              <span><Check size={16} /> 2-year workmanship warranty</span>
            </div>
          </div>
          <div className="reveal-scale" style={{ "--d": ".15s" } as React.CSSProperties}>
            <HeroQuote />
          </div>
        </div>
      </section>

      {/* ── Equipment / trust strip ───────────────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap trust-strip">
          <span><SolarPanel size={18} /> Jinko &amp; Longi tier-one panels</span>
          <span><Battery size={18} /> LiFePO4 lithium batteries</span>
          <span><Inverter size={18} /> Pure sine wave hybrid inverters</span>
          <span><Clock size={18} /> Reply within 24 hours</span>
        </div>
      </div>

      {/* ── Entity paragraph: the answer Google and AI tools quote ────── */}
      <section className="sec sec--paper">
        <div className="wrap split2">
          <div className="reveal">
            <span className="eyebrow">About LumaGrid Solar</span>
            <h2 className="h2">Trusted solar installers in Port Harcourt and the Niger Delta</h2>
            <div className="stack" style={{ marginTop: 18, fontSize: 17, lineHeight: 1.8, color: "var(--muted)" }}>
              <p>
                <strong style={{ color: "var(--ink)" }}>LumaGrid Solar is a CAC-registered solar installation company based in Port Harcourt, Rivers State.</strong>{" "}
                We design and install complete solar power systems (solar panels, hybrid inverters and LiFePO4 lithium batteries)
                for homes, shops, offices, schools and churches in {CITIES.length} towns across Rivers, Delta and Bayelsa.
              </p>
              <p>
                Every system starts with a free site assessment and is sized for the Niger Delta&apos;s rainy season, so your
                fridge, fans, lights, pumping machine and AC keep running when PHED or BEDC supply fails. Most homes are
                installed in one to two days, with a 2-year workmanship warranty.
              </p>
            </div>
            <div className="stats" style={{ marginTop: 28 }}>
              <div><div className="stat__num"><Counter to={CITIES.length} /></div><div className="stat__label">Towns covered</div></div>
              <div><div className="stat__num">1–2</div><div className="stat__label">Days to install a home</div></div>
              <div><div className="stat__num"><Counter to={2} suffix="-yr" /></div><div className="stat__label">Workmanship warranty</div></div>
              <div><div className="stat__num"><Counter to={25} suffix="-yr" /></div><div className="stat__label">Panel lifespan</div></div>
            </div>
          </div>
          <div className="frame frame--4x5 reveal-scale">
            <Image src="/images/Lumagrid-13.jpg" alt="LumaGrid solar installer in Port Harcourt" fill sizes="(max-width: 960px) 100vw, 560px" />
          </div>
        </div>
      </section>

      {/* ── Services (photo cards) ────────────────────────────────────── */}
      <section className="sec sec--sand">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow="What we do" title="Solar installation services" lead="Home and commercial solar, lithium battery upgrades and maintenance across Rivers, Delta and Bayelsa." />
            <MoreLink href="/services">All services</MoreLink>
          </div>
          <div className="g4">
            {SERVICES.map((s, i) => (
              <Link key={s.title} href={s.href} className="scard reveal" style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                <Image src={s.img} alt={s.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 290px" />
                <div className="scard__body">
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="link-arrow">Learn more <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works: interactive day / night ─────────────────────── */}
      <section className="sec sec--ink">
        <div className="wrap split2">
          <div className="reveal">
            <span className="eyebrow">How it works</span>
            <h2 className="h2">How a hybrid solar system works, <span className="hl">day and night</span></h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Your solar panels run the house and charge the lithium battery while the sun is up. When the sun sets or NEPA
              takes light, the hybrid inverter switches to the battery in a split second. Tap Day or Night to see it.
            </p>
            <ul className="ticks" style={{ marginTop: 22 }}>
              <li>No noise, no fumes, no fuel queues</li>
              <li>Uses PHED or BEDC power when it comes, to save the battery</li>
              <li>Your generator becomes an emergency backup, not a daily bill</li>
            </ul>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <Link href="/blog/how-does-solar-work-simple-guide" className="btn btn--ghost">How solar works <ArrowRight size={16} /></Link>
              <Link href="/blog/why-lithium-ion-batteries-are-better-for-solar" className="btn btn--ghost">Why lithium</Link>
            </div>
          </div>
          <div className="reveal-scale" style={{ "--d": ".1s" } as React.CSSProperties}>
            <DayNightFlow />
          </div>
        </div>
      </section>

      <CalculatorSection />

      {/* ── Prices ────────────────────────────────────────────────────── */}
      <section id="packages" className="sec sec--sand">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow={`Prices · ${PETROL_PRICE_ASOF}`} title="Solar system prices in Port Harcourt (2026)" lead="Complete installed prices: inverter, lithium battery, panels, cabling, protection and labour. Confirmed after a free site visit." />
            <MoreLink href="/pricing">Full solar price guide</MoreLink>
          </div>
          <div className="g3">
            {PACKAGES.map((p, i) => (
              <article key={p.name} className={`plan reveal${p.highlight ? " plan--featured" : ""}`} style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                {p.badge && <span className="pill pill--lime plan__badge">{p.badge}</span>}
                <div className="plan__head">
                  <h3 className="plan__name">{p.kva} solar system · {p.name}</h3>
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
                    {p.price === "Custom" ? "Get a custom quote" : `Get the ${p.kva} quote`}
                  </WhatsAppButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-year cost bars ──────────────────────────────────────────── */}
      <section className="sec sec--ink">
        <div className="wrap split2">
          <div className="reveal">
            <span className="eyebrow">The real numbers</span>
            <h2 className="h2">Generator vs solar: <span className="hl">5-year cost in Nigeria</span></h2>
            <p className="lead" style={{ marginTop: 16 }}>
              A generator burning 8 litres of petrol a day costs about ₦{monthly.toLocaleString("en-NG")} a month at
              ₦{PETROL_PRICE_NGN.toLocaleString("en-NG")}/litre, before servicing. A 6kVA solar system with lithium
              batteries pays that back in under a year, then keeps saving.
            </p>
            <div style={{ marginTop: 22 }}>
              <Link href="/blog/generator-vs-solar" className="link-arrow" style={{ color: "#fff" }}>Full generator vs solar breakdown <ArrowRight size={15} /></Link>
            </div>
          </div>
          <div className="bars reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <div>
              <div className="bar__label"><span>Petrol generator, 8 litres a day</span><strong style={{ color: "#ff9a7a" }}>{millions(gen5)}</strong></div>
              <div className="bar__track">
                <div className="bar__fill" style={{ "--w": "100%", background: "linear-gradient(90deg, #ff6b4a, #ff9f43)", color: "#2a0d05" } as React.CSSProperties}>Fuel + servicing</div>
              </div>
            </div>
            <div>
              <div className="bar__label"><span>LumaGrid 6kVA solar + lithium</span><strong style={{ color: "var(--lime)" }}>{millions(solar5)}</strong></div>
              <div className="bar__track">
                <div className="bar__fill" style={{ "--w": solarWidth, background: "var(--lime)", color: "var(--ink)" } as React.CSSProperties}>Solar</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 4 }}>
              Generator: 8 litres a day at ₦{PETROL_PRICE_NGN.toLocaleString("en-NG")} plus ₦{(GENERATOR_SERVICE_NGN_PER_YEAR / 1000).toFixed(0)}k a year servicing, with no price rises.
              Solar: the 6kVA package from ₦3.8M plus light yearly maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why us ────────────────────────────────────────────────────── */}
      <section className="sec sec--paper">
        <div className="wrap">
          <SectionHead eyebrow="Why LumaGrid" title="Why choose LumaGrid Solar" lead="Built for the Niger Delta: rainy seasons, soot, salt air, floods, upstairs buildings and short grid hours." center />
          <div className="g3">
            {WHY.map(([t, d], i) => (
              <div key={t} className="card reveal" style={{ "--d": `${(i % 3) * 0.06}s` } as React.CSSProperties}>
                <span className="card-icon"><Check size={22} /></span>
                <h3 className="h3">{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      <section id="gallery" className="sec sec--sand">
        <div className="wrap">
          <SectionHead eyebrow="Our work" title="Recent solar installations in the Niger Delta" lead="Genuine Jinko and Longi panels, LiFePO4 lithium batteries and neat, labelled installs." />
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
          <SectionHead eyebrow="The process" title="Our solar installation process" center />
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
            <SectionHead eyebrow="Reviews" title="LumaGrid Solar reviews" />
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

      {/* ── Areas ─────────────────────────────────────────────────────── */}
      <section className="sec sec--ink" style={{ overflow: "hidden" }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Coverage"
            title={<>Solar installation areas: <span className="hl">Rivers, Delta &amp; Bayelsa</span></>}
            lead={`${CITIES.length} towns, from Port Harcourt and Bonny to Warri, Asaba and Yenagoa. Pick yours for local prices, areas and answers.`}
          />
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
            {states.map((st, i) => (
              <div key={st} className="card card--ink reveal" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                <h3 className="h3"><Link href={STATE_PAGES[st].href} style={{ color: "#fff" }}>Solar installation in {STATE_PAGES[st].label}</Link></h3>
                <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "6px 14px", marginTop: 12 }}>
                  {CITIES.filter(c => c.state === st).map(c => (
                    <li key={c.slug}>
                      <Link href={`/solar-installation/${c.slug}`} style={{ color: "rgba(255,255,255,.8)", fontSize: 14.5, textDecoration: "underline", textDecorationColor: "rgba(212,245,12,.45)", textUnderlineOffset: 3 }}>
                        Solar in {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={STATE_PAGES[st].href} className="link-arrow" style={{ marginTop: 16, color: "var(--lime)", fontSize: 14 }}>
                  {STATE_PAGES[st].label} solar prices <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guides ────────────────────────────────────────────────────── */}
      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow="Solar guides" title="Solar guides: prices, batteries & sizing" />
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
          <SectionHead eyebrow="FAQ" title="Solar installation FAQs" center />
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
