import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import TownLinks from "@/components/locations/TownLinks";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
import { CITIES, STATE_PAGES, cityImageKey, getCity, type City } from "@/lib/cities";
import { getImage } from "@/lib/images";
import PostImage from "@/components/blog/PostImage";
import { PACKAGES, PHONE_DISPLAY, PHONE_E164, PROCESS_STEPS } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return CITIES.map(c => ({ city: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const c = getCity(slug);
  if (!c) return {};
  const url = `https://lumagridsolar.com/solar-installation/${c.slug}`;
  const title = `Solar Installation in ${c.name}, ${c.state} State`;
  const description = `Solar panel, inverter and lithium battery installation in ${c.name} (${c.areas.slice(0, 3).join(", ")} and more). Systems from ₦1.7M, free site assessment, 2-year workmanship warranty.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | LumaGrid Solar`,
      description,
      url,
      type: "website",
      locale: "en_NG",
      siteName: "LumaGrid Solar",
      images: [{ url: getImage(cityImageKey(c)).src, width: 1200, height: 630 }],
    },
  };
}

function cityFaqs(c: City) {
  const generic = [
    {
      q: `How much does solar installation cost in ${c.name}?`,
      a: `A 3kVA starter system (3.2kWh lithium battery, four 600W panels) starts from about ₦1.7M installed, and a 6kVA family system (8kWh lithium, eight 600W panels) starts from about ₦3.8M. Bigger homes and businesses are quoted individually. Any transport cost to ${c.name} is shown on your quote before you pay.`,
    },
    {
      q: `Do you install solar on upstairs buildings in ${c.name}?`,
      a: `Yes. We install on bungalows, upstairs (storey) buildings, duplexes, blocks of flats and shops in ${c.name}. On a storey building we plan safe roof access and the cable route to your inverter room during the free site assessment.`,
    },
  ];
  const hasCost = c.faqs.some(f => /cost|price/i.test(f.q));
  return [...c.faqs, ...generic.filter(g => !(hasCost && /cost/i.test(g.q)))];
}

const h2: React.CSSProperties = {
  fontSize: "clamp(22px, 4.5vw, 30px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 14,
};
const body: React.CSSProperties = { fontSize: 15.5, color: "#2d3a35", lineHeight: 1.8, marginBottom: 16 };

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const c = getCity(slug);
  if (!c) notFound();

  const st = STATE_PAGES[c.state];
  const faqs = cityFaqs(c);
  const allPosts = getAllPosts();
  const posts = c.posts.map(s => allPosts.find(p => p.slug === s)).filter(p => p !== undefined);
  const url = `/solar-installation/${c.slug}`;

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Solar installation in ${c.name}`,
          description: c.intro,
          url,
          areaServed: [{ type: "City", name: c.name, state: st.label }],
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Areas we cover", href: "/solar-installation" },
          { name: st.label, href: st.href },
          { name: c.name, href: url },
        ])}
      />

      <Navbar />

      {/* Hero */}
      <section style={{ background: "var(--ink)", color: "#fff", padding: "112px 20px 48px" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <nav aria-label="Breadcrumb" className="crumbs">
            <Link href="/">Home</Link> <span>/</span>
            <Link href="/solar-installation">Areas</Link> <span>/</span>
            <Link href={st.href}>{st.label}</Link> <span>/</span>
            <span aria-current="page">{c.name}</span>
          </nav>
          <h1 className="brig" style={{ fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", margin: "14px 0 16px" }}>
            Solar installation in <span style={{ color: "var(--lime)" }}>{c.name}</span>
          </h1>
          <p style={{ fontSize: "var(--step-lead)", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, maxWidth: 680, marginBottom: 24 }}>
            {c.intro}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <WhatsAppButton source={`${c.name} town page`} state={c.state} area={c.name} className="btn-lime" style={{ fontSize: 16, padding: "15px 24px" }}>
              <WhatsAppIcon size={18} color="var(--ink)" /> Get a free quote in {c.name}
            </WhatsAppButton>
            <Link href="/pricing" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.45)", color: "#fff" }}>
              See solar prices
            </Link>
          </div>
        </div>
      </section>

      {/* Quick facts — the short, quotable answer */}
      <section style={{ background: "var(--sand)", padding: "36px 20px" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="facts">
            <h2 className="brig" style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>Solar in {c.name} at a glance</h2>
            <dl>
              <div><dt>Installer</dt><dd>LumaGrid Solar, CAC-registered, based in Port Harcourt</dd></div>
              <div><dt>Coverage</dt><dd>{c.name}, {c.lga} LGA, {st.label}</dd></div>
              <div><dt>Grid supply</dt><dd>{c.disco}</dd></div>
              <div><dt>Solar resource</dt><dd>About {st.psh} peak sun hours a day (we size for rainy season)</dd></div>
              <div><dt>Starting price</dt><dd>From ₦1.7M for a 3kVA system with lithium battery</dd></div>
              <div><dt>Typical systems</dt><dd>{c.typical}</dd></div>
              <div><dt>Install time</dt><dd>1 to 2 days for most homes</dd></div>
              <div><dt>Warranty</dt><dd>2-year workmanship, 10-year panel performance</dd></div>
              <div><dt>Contact</dt><dd><a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a> (call or WhatsApp)</dd></div>
            </dl>
          </div>
          <div style={{ marginTop: 24 }}>
            <PostImage image={getImage(cityImageKey(c))} />
          </div>
        </div>
      </section>

      {/* Local detail */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2 className="brig" style={h2}>The power situation in {c.name}</h2>
          <p style={body}>{c.power}</p>

          <h2 className="brig" style={{ ...h2, marginTop: 36 }}>Areas we cover in {c.name}</h2>
          <ul className="area-chips">
            {c.areas.map(a => <li key={a}>{a}</li>)}
          </ul>
          <p style={{ ...body, fontSize: 14, color: "var(--muted)" }}>
            Not listed? We cover all of {c.lga} LGA and the rest of {st.label}.{" "}
            <Link href={st.href} style={{ textDecoration: "underline", textDecorationColor: "var(--lime)", textDecorationThickness: 2 }}>
              See all of {st.label}
            </Link>.
          </p>

          <h2 className="brig" style={{ ...h2, marginTop: 36 }}>Installing solar in {c.name}: what we plan for</h2>
          <p style={body}>{c.install}</p>

          <h2 className="brig" style={{ ...h2, marginTop: 36 }}>What size solar system do people in {c.name} buy?</h2>
          <p style={body}>
            {c.typical} Not sure where you fit? Use the{" "}
            <Link href="/calculator" style={{ textDecoration: "underline", textDecorationColor: "var(--lime)", textDecorationThickness: 2 }}>solar calculator</Link>{" "}
            or read{" "}
            <Link href="/blog/what-can-3kva-5kva-10kva-power" style={{ textDecoration: "underline", textDecorationColor: "var(--lime)", textDecorationThickness: 2 }}>what a 3kVA, 5kVA and 10kVA system can power</Link>.
          </p>

          <div className="table-wrap" style={{ marginTop: 18 }}>
            <table>
              <thead>
                <tr><th>Package</th><th>Suits</th><th>What&apos;s included</th><th>Price</th></tr>
              </thead>
              <tbody>
                {PACKAGES.map(p => (
                  <tr key={p.name}>
                    <td><strong>{p.name} ({p.kva})</strong></td>
                    <td>{p.label}</td>
                    <td>{p.includes.slice(0, 3).join(", ")}</td>
                    <td>{p.price === "Custom" ? "Custom quote" : `From ${p.price}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
            Indicative installed prices. <Link href="/pricing" style={{ textDecoration: "underline" }}>See what changes the price</Link>.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: "var(--sand)" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2 className="brig" style={h2}>How getting solar in {c.name} works</h2>
          <ol className="steps">
            {PROCESS_STEPS.map(s => (
              <li key={s.num}>
                <strong>{s.title}.</strong> {s.desc}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2 className="brig" style={h2}>Solar questions from {c.name}</h2>
          <div className="faq-list">
            {faqs.map(f => (
              <details key={f.q}>
                <summary className="brig">{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          {posts.length > 0 && (
            <>
              <h2 className="brig" style={{ ...h2, marginTop: 40 }}>Guides for {c.name} homeowners</h2>
              <ul className="guide-list">
                {posts.map(p => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>
                      <span>{p.title}</span> <ArrowRight size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <TownLinks
        slugs={c.nearby}
        title={`Solar installation near ${c.name}`}
        subtitle={`We also install in these towns close to ${c.name}.`}
      />

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "56px 20px" }}>
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <h2 className="brig" style={{ color: "#fff", fontSize: "clamp(26px, 6vw, 40px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 14 }}>
            Ready for solar in {c.name}?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 24 }}>
            Tell us your area, building type and what you want to power. We reply on WhatsApp with a
            recommendation and book your free site assessment.
          </p>
          <WhatsAppButton source={`${c.name} town page - bottom`} state={c.state} area={c.name} className="btn-lime" style={{ fontSize: 16, padding: "15px 26px" }}>
            <WhatsAppIcon size={18} color="var(--ink)" /> Get my free quote
          </WhatsAppButton>
        </div>
      </section>

      <Footer />
    </>
  );
}
