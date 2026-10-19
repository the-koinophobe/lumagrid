import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { CtaBand, PageHero, QuoteButtons, SectionHead } from "@/components/site/blocks";
import { ArrowRight, MapPin } from "@/components/ui/icons";
import { CITIES, STATE_PAGES, cityImageKey } from "@/lib/cities";
import { getImage } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Solar Installation in Rivers, Delta & Bayelsa: Towns We Cover",
  description:
    "LumaGrid Solar installs solar panels, inverters and lithium batteries in Port Harcourt, Obio-Akpor, Eleme, Bonny, Warri, Effurun, Asaba, Sapele, Ughelli, Abraka, Yenagoa, Amassoma, Ogbia and more. Find your town.",
  alternates: { canonical: `${SITE_URL}/solar-installation` },
  openGraph: {
    title: "Solar Installation Across the Niger Delta | LumaGrid Solar",
    description: "Every town we install solar in across Rivers, Delta and Bayelsa States.",
    url: `${SITE_URL}/solar-installation`,
  },
};

const BLURB: Record<keyof typeof STATE_PAGES, string> = {
  Rivers: "Our home base. Port Harcourt and Obio-Akpor get the fastest response, and we travel to Eleme, Oyigbo, Okrika, Bonny, Ahoada, Omoku and Ogoniland.",
  Delta: "Warri and Effurun, the capital Asaba, and the towns in between: Sapele, Ughelli, Abraka and Agbor.",
  Bayelsa: "Yenagoa and the communities around it, with flood-aware installs and boat logistics for island sites like Brass.",
};

export default function SolarInstallationHub() {
  const states = Object.keys(STATE_PAGES) as (keyof typeof STATE_PAGES)[];
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Areas we cover", href: "/solar-installation" }])} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "ItemList", name: "Towns where LumaGrid Solar installs solar",
        itemListElement: CITIES.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `Solar installation in ${c.name}`, url: `${SITE_URL}/solar-installation/${c.slug}` })),
      }} />
      <Navbar />

      <PageHero
        eyebrow="Areas we cover"
        title={<>Solar installation across <span className="hl">Rivers, Delta & Bayelsa.</span></>}
        lead={`Panels, hybrid inverters and lithium batteries for homes and businesses in ${CITIES.length} towns. Pick yours for local prices, areas and answers.`}
        image="/images/real/solar-panels-in-transit.jpeg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas" }]}
      >
        <QuoteButtons source="Areas hub" />
      </PageHero>

      {states.map((st, si) => (
        <section key={st} className={`sec ${si % 2 ? "sec--paper" : "sec--sand"}`}>
          <div className="wrap">
            <div className="sec-head-row">
              <SectionHead eyebrow={`${CITIES.filter(c => c.state === st).length} towns`} title={STATE_PAGES[st].label} lead={BLURB[st]} />
              <Link href={STATE_PAGES[st].href} className="link-arrow">{STATE_PAGES[st].label} overview <ArrowRight size={15} /></Link>
            </div>
            <div className="g3">
              {CITIES.filter(c => c.state === st).map((c, i) => {
                const img = getImage(cityImageKey(c));
                return (
                  <Link key={c.slug} href={`/solar-installation/${c.slug}`} className="pcard reveal" style={{ "--d": `${(i % 3) * 0.06}s` } as React.CSSProperties}>
                    <div className="pcard__img" style={{ aspectRatio: "16 / 8" }}>
                      <Image src={img.src.replace("w=1600", "w=720")} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 380px" unoptimized={img.src.startsWith("http")} />
                    </div>
                    <div className="pcard__body">
                      <h3 className="pcard__title" style={{ display: "flex", alignItems: "center", gap: 8 }}><MapPin size={17} /> {c.name}</h3>
                      <p className="pcard__excerpt">{c.areas.slice(0, 5).join(", ")}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <CtaBand source="Areas hub - bottom" title="Don't see your town?" text="We cover the whole of Rivers, Delta and Bayelsa, including riverine communities. Tell us where you are and we'll confirm." />
      <Footer />
    </>
  );
}
