import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import PostCard from "@/components/site/PostCard";
import { CtaBand, FaqList, PageHero, QuoteButtons, SectionHead } from "@/components/site/blocks";
import { Stars, GoogleIcon } from "@/components/ui";
import { ArrowRight, MapPin } from "@/components/ui/icons";
import { CITIES, cityImageKey } from "@/lib/cities";
import { getImage } from "@/lib/images";
import { getAllPosts } from "@/lib/blog";
import { PACKAGES, TESTIMONIALS } from "@/lib/constants";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import type { StatePageData } from "@/lib/states";

const GUIDES: Record<StatePageData["slug"], string[]> = {
  rivers: ["solar-vs-phed-band-a-port-harcourt", "solar-for-landlords-port-harcourt", "soot-port-harcourt-solar-panels"],
  delta: ["solar-vs-bedc-grid-warri-asaba", "solar-for-schools-warri-delta", "solar-for-poultry-farms-delta-state"],
  bayelsa: ["protect-solar-system-from-flooding-bayelsa", "solar-for-hotels-yenagoa-bayelsa", "solar-for-riverine-communities"],
};

export default function StatePage({ s }: { s: StatePageData }) {
  const towns = CITIES.filter(c => c.state === s.key);
  const posts = getAllPosts();
  const guides = GUIDES[s.slug].map(slug => posts.find(p => p.slug === slug)).filter(p => p !== undefined);
  const url = `/locations/${s.slug}`;

  return (
    <>
      <JsonLd data={serviceSchema({
        name: `Solar installation in ${s.label}`,
        description: s.heroLead,
        url,
        areaServed: [{ type: "State", name: s.label }, ...towns.map(t => ({ type: "City" as const, name: t.name, state: s.label }))],
      })} />
      <JsonLd data={faqSchema(s.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Areas we cover", href: "/solar-installation" }, { name: s.label, href: url }])} />
      <Navbar />

      <PageHero
        eyebrow={`${s.label} · ${s.disco} area`}
        title={s.heroTitle}
        lead={s.heroLead}
        image={s.heroImage}
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas", href: "/solar-installation" }, { name: s.label }]}
      >
        <QuoteButtons source={`${s.label} page - hero`} state={s.key} />
      </PageHero>

      {/* Towns first: it is what most visitors came for */}
      <section className="sec sec--sand" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <SectionHead eyebrow="Pick your town" title={`Solar in every part of ${s.label}.`} lead="Each town page has local areas, prices, what changes about the install there and answers to the questions people there ask us." />
          <div className="g3">
            {towns.map((t, i) => {
              const img = getImage(cityImageKey(t));
              return (
                <Link key={t.slug} href={`/solar-installation/${t.slug}`} className="pcard reveal" style={{ "--d": `${(i % 3) * 0.06}s` } as React.CSSProperties}>
                  <div className="pcard__img" style={{ aspectRatio: "16 / 8" }}>
                    <Image src={img.src.replace("w=1600", "w=720")} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 380px" unoptimized={img.src.startsWith("http")} />
                  </div>
                  <div className="pcard__body">
                    <h3 className="pcard__title" style={{ display: "flex", alignItems: "center", gap: 8 }}><MapPin size={17} /> Solar installation in {t.name}</h3>
                    <p className="pcard__excerpt">{t.areas.slice(0, 5).join(", ")}</p>
                    <span className="link-arrow" style={{ fontSize: 14, marginTop: "auto" }}>Local prices & areas <ArrowRight size={14} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec sec--ink">
        <div className="wrap">
          <SectionHead eyebrow={`Why solar in ${s.label}`} title={<>The power situation in <span className="hl">{s.label}.</span></>} lead={s.whyLead} />
          <div className="g3">
            {s.why.map((w, i) => (
              <div key={w.title} className="card card--ink reveal" style={{ "--d": `${(i % 3) * 0.06}s` } as React.CSSProperties}>
                <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 800, fontSize: 28, color: "var(--lime)", lineHeight: 1, marginBottom: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="h3" style={{ color: "#fff" }}>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap">
          <SectionHead eyebrow="Coverage" title={`Areas we serve in ${s.label}.`} lead={s.areasLead} />
          <div className="g3">
            {s.areas.map((a, i) => (
              <div key={a.name} className="card card--flat reveal" style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 18, "--d": `${(i % 3) * 0.04}s` } as React.CSSProperties}>
                <span className="card-icon" style={{ width: 38, height: 38, borderRadius: 10, marginBottom: 0, flexShrink: 0 }}><MapPin size={17} /></span>
                <div><strong>{a.name}</strong><p style={{ fontSize: 14, marginTop: 4 }}>{a.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow="Prices" title={`Solar prices in ${s.mainTown}.`} lead="Equipment prices are the same across the Niger Delta. Any transport cost is shown on your quote before you pay." />
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
                <div className="plan__body"><ul className="ticks" style={{ gap: 8, fontSize: 14 }}>{p.appliances.slice(0, 4).map(a => <li key={a}>{a}</li>)}</ul></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead eyebrow="Reviews" title="What our customers say." />
            <span className="badge-google"><GoogleIcon /> 5.0 <Stars count={5} /></span>
          </div>
          <div className="g2">
            {TESTIMONIALS.map(t => (
              <figure key={t.name} className="card qcard reveal">
                <Stars count={t.stars} />
                <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption><strong>{t.name}{t.location ? `, ${t.location}` : ""}</strong><span className="muted" style={{ display: "inline-flex", gap: 6, alignItems: "center", fontSize: 13 }}><GoogleIcon /> Google review</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="sec sec--sand">
          <div className="wrap">
            <SectionHead eyebrow="Local guides" title={`Guides for ${s.label}.`} />
            <div className="g3">{guides.map(p => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}

      <section className="sec sec--paper">
        <div className="wrap wrap--narrow">
          <SectionHead eyebrow="FAQ" title={`Solar questions from ${s.label}.`} center />
          <FaqList faqs={s.faqs} />
        </div>
      </section>

      <CtaBand source={`${s.label} page - bottom`} state={s.key} title={`Ready to go solar in ${s.label}?`} />
      <Footer />
    </>
  );
}
