import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Image from "next/image";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import PostCard from "@/components/site/PostCard";
import { CtaBand, FaqList, PageHero, QuoteButtons, SectionHead } from "@/components/site/blocks";
import { WhatsAppIcon } from "@/components/ui";
import { ArrowRight, MapPin } from "@/components/ui/icons";
import { CITIES, STATE_PAGES, cityImageKey, getCity, type City } from "@/lib/cities";
import { getImage } from "@/lib/images";
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
  const description = `Solar panel, inverter and lithium battery installation in ${c.name} (${c.areas.slice(0, 3).join(", ")} and more). Systems from ₦2.8M, free site assessment, 2-year workmanship warranty.`;
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
    },
  };
}

function cityFaqs(c: City) {
  const generic = [
    {
      q: `How much does solar installation cost in ${c.name}?`,
      a: `A 3kVA starter system (5kWh lithium battery, four 600W panels) starts from about ₦2.8M installed, and a 6kVA family system (16kWh lithium, eight 600W panels) starts from about ₦4.9M. Bigger homes and businesses are quoted individually. Any transport cost to ${c.name} is shown on your quote before you pay.`,
    },
    {
      q: `Do you install solar on upstairs buildings in ${c.name}?`,
      a: `Yes. We install on bungalows, upstairs (storey) buildings, duplexes, blocks of flats and shops in ${c.name}. On a storey building we plan safe roof access and the cable route to your inverter room during the free site assessment.`,
    },
  ];
  const hasCost = c.faqs.some(f => /cost|price/i.test(f.q));
  return [...c.faqs, ...generic.filter(g => !(hasCost && /cost/i.test(g.q)))];
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const c = getCity(slug);
  if (!c) notFound();

  const st = STATE_PAGES[c.state];
  const faqs = cityFaqs(c);
  const allPosts = getAllPosts();
  const posts = c.posts.map(s => allPosts.find(p => p.slug === s)).filter(p => p !== undefined);
  const url = `/solar-installation/${c.slug}`;
  const img = getImage(cityImageKey(c));
  const nearby = c.nearby.map(n => CITIES.find(x => x.slug === n)).filter((x): x is City => Boolean(x));

  const facts: [string, React.ReactNode][] = [
    ["Installer", "LumaGrid Solar, CAC-registered, based in Port Harcourt"],
    ["Coverage", `${c.name}, ${c.lga} LGA, ${st.label}`],
    ["Grid supply", c.disco],
    ["Solar resource", `About ${st.psh} peak sun hours a day (we size for rainy season)`],
    ["Starting price", "From ₦2.8M for a 3kVA system with lithium battery"],
    ["Install time", "1 to 2 days for most homes"],
    ["Warranty", "2-year workmanship, 10-year panel performance"],
    ["Contact", <a key="tel" href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY} (call or WhatsApp)</a>],
  ];

  return (
    <>
      <JsonLd data={serviceSchema({ name: `Solar installation in ${c.name}`, description: c.intro, url, areaServed: [{ type: "City", name: c.name, state: st.label }] })} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Areas we cover", href: "/solar-installation" }, { name: st.label, href: st.href }, { name: c.name, href: url }])} />
      <Navbar />

      <PageHero
        eyebrow={`${st.label} · ${c.lga}`}
        title={<>Solar Installation in <span className="hl">{c.name}</span></>}
        lead={c.intro}
        image={img.src}
        imageAlt={img.alt}
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas", href: "/solar-installation" }, { name: st.label, href: st.href }, { name: c.name }]}
      >
        <QuoteButtons source={`${c.name} town page`} state={c.state} area={c.name} primary={`Get a free quote in ${c.name}`} />
      </PageHero>

      <section className="sec--tight sec--sand">
        <div className="wrap wrap--narrow">
          <div className="facts reveal">
            <h2 className="brig" style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Solar in {c.name} at a glance</h2>
            <dl>{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap split2">
          <div className="reveal">
            <span className="eyebrow">Local conditions</span>
            <h2 className="h2" style={{ fontSize: "clamp(26px, 4.4vw, 40px)" }}>Electricity supply and solar power in {c.name}</h2>
            <p className="lead" style={{ marginTop: 14 }}>{c.power}</p>
            <h3 className="h3" style={{ marginTop: 28 }}>What we plan for in {c.name}</h3>
            <p style={{ marginTop: 10, lineHeight: 1.8, color: "var(--muted)" }}>{c.install}</p>
          </div>
          <div className="reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <div className="frame frame--4x3">
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 960px) 100vw, 560px" unoptimized={img.src.startsWith("http")} />
            </div>
            {img.credit && <p className="img-cap">Photo: <a href={img.creditUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>{img.credit}</a> on Unsplash</p>}
          </div>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap">
          <SectionHead eyebrow="Areas" title={`Solar installation areas in ${c.name}`} lead={<>Not listed? We cover all of {c.lga} LGA and the rest of <Link href={st.href} className="link-arrow">{st.label}</Link>.</>} />
          <ul className="area-chips reveal" style={{ gap: 9 }}>
            {c.areas.map(a => <li key={a} style={{ background: "#fff", border: "1px solid var(--line)", padding: "9px 14px", fontSize: 14 }}>{a}</li>)}
          </ul>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow="Sizes & prices" title={`Solar system sizes and prices in ${c.name}`} lead={c.typical} />
            <Link href="/pricing" className="link-arrow">Full price guide <ArrowRight size={15} /></Link>
          </div>
          <div className="g3">
            {PACKAGES.map((p, i) => (
              <div key={p.name} className={`plan reveal${p.highlight ? " plan--featured" : ""}`} style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                <div className="plan__head">
                  <div className="plan__name">{p.name} · {p.kva}</div>
                  <div className="plan__price">{p.priceNote && <small>{p.priceNote}</small>}{p.price}</div>
                  <div style={{ fontSize: 14, marginTop: 8, opacity: .75 }}>{p.label}</div>
                </div>
                <div className="plan__body">
                  <ul className="ticks" style={{ gap: 8, fontSize: 14 }}>{p.appliances.slice(0, 4).map(a => <li key={a}>{a}</li>)}</ul>
                  <WhatsAppButton source={`${c.name} - ${p.name} ${p.kva}`} state={c.state} area={c.name} className={`btn ${p.highlight ? "btn--lime" : "btn--ink"}`}>
                    <WhatsAppIcon size={16} color={p.highlight ? "var(--ink)" : "#fff"} /> Quote in {c.name}
                  </WhatsAppButton>
                </div>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 18, fontSize: 14 }}>
            Not sure? Try the <Link href="/calculator" className="link-arrow">solar calculator</Link> or read <Link href="/blog/what-can-3kva-5kva-10kva-power" className="link-arrow">what 3kVA, 5kVA and 10kVA can power</Link>.
          </p>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title={`How to get solar installed in ${c.name}`} center />
          <ol className="steps2">
            {PROCESS_STEPS.map((s, i) => (
              <li key={s.num} className="reveal" style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}><h3 className="h3">{s.title}</h3><p>{s.desc}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap wrap--narrow">
          <SectionHead eyebrow="FAQ" title={`Solar installation FAQs: ${c.name}`} center />
          <FaqList faqs={faqs} />
        </div>
      </section>

      {posts.length > 0 && (
        <section className="sec sec--sand">
          <div className="wrap">
            <SectionHead eyebrow="Guides" title={`Solar guides for ${c.name}`} />
            <div className="g3">{posts.map(p => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section className="sec--tight sec--paper">
          <div className="wrap">
            <h2 className="h3" style={{ marginBottom: 16 }}>Solar installation near {c.name}</h2>
            <div className="tag-row">
              {nearby.map(n => <Link key={n.slug} href={`/solar-installation/${n.slug}`} className="pill" style={{ padding: "10px 16px", fontSize: 14 }}><MapPin size={14} /> {n.name}</Link>)}
              <Link href={st.href} className="pill pill--lime" style={{ padding: "10px 16px", fontSize: 14 }}>All of {st.label}</Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand source={`${c.name} town page - bottom`} state={c.state} area={c.name} title={`Ready for solar in ${c.name}?`} />
      <Footer />
    </>
  );
}
