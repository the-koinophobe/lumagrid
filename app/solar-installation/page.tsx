import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import TownLinks from "@/components/locations/TownLinks";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
import { CITIES, STATE_PAGES } from "@/lib/cities";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Solar Installation in Rivers, Delta & Bayelsa: Towns We Cover",
  description:
    "LumaGrid Solar installs solar panels, inverters and lithium batteries in Port Harcourt, Obio-Akpor, Eleme, Bonny, Warri, Effurun, Asaba, Sapele, Ughelli, Abraka, Yenagoa, Amassoma, Ogbia and more. Find your town.",
  alternates: { canonical: "https://lumagridsolar.com/solar-installation" },
  openGraph: {
    title: "Solar Installation Across the Niger Delta | LumaGrid Solar",
    description: "Every town we install solar in across Rivers, Delta and Bayelsa States.",
    url: "https://lumagridsolar.com/solar-installation",
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
};

const STATE_BLURB: Record<keyof typeof STATE_PAGES, string> = {
  Rivers:
    "Our home base. Port Harcourt and Obio-Akpor get the fastest response, and we travel to Eleme, Oyigbo, Okrika, Bonny, Ahoada, Omoku and Ogoniland.",
  Delta:
    "Warri and Effurun, the capital Asaba, and the towns in between: Sapele, Ughelli, Abraka and Agbor.",
  Bayelsa:
    "Yenagoa and the communities around it, with flood-aware installs for low-lying areas and boat logistics for island sites like Brass.",
};

export default function SolarInstallationHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Areas we cover", href: "/solar-installation" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Towns where LumaGrid Solar installs solar",
          itemListElement: CITIES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Solar installation in ${c.name}`,
            url: `https://lumagridsolar.com/solar-installation/${c.slug}`,
          })),
        }}
      />
      <Navbar />

      <section style={{ background: "var(--ink)", color: "#fff", padding: "112px 20px 48px" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <span className="tag" style={{ background: "rgba(255,255,255,0.12)", color: "var(--lime)" }}>Areas we cover</span>
          <h1 className="brig" style={{ fontSize: "clamp(30px, 7vw, 50px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Solar installation across Rivers, Delta and Bayelsa
          </h1>
          <p style={{ fontSize: "var(--step-lead)", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, maxWidth: 680, marginBottom: 24 }}>
            LumaGrid Solar installs solar panels, hybrid inverters and lithium batteries for homes and businesses in{" "}
            {CITIES.length} towns across the Niger Delta. Pick your town for local details, prices and answers to the
            questions people there ask us most.
          </p>
          <WhatsAppButton source="Areas hub" className="btn-lime" style={{ fontSize: 16, padding: "15px 24px" }}>
            <WhatsAppIcon size={18} color="var(--ink)" /> Get a free quote
          </WhatsAppButton>
        </div>
      </section>

      {(Object.keys(STATE_PAGES) as (keyof typeof STATE_PAGES)[]).map(state => (
        <div key={state}>
          <TownLinks state={state} title={`Solar installation in ${STATE_PAGES[state].label}`} subtitle={STATE_BLURB[state]} />
          <div className="container" style={{ padding: "0 20px 32px", marginTop: -24 }}>
            <Link href={STATE_PAGES[state].href} className="btn-outline" style={{ fontSize: 14 }}>
              Full {STATE_PAGES[state].label} page <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ))}

      <Footer />
    </>
  );
}
