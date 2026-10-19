import {
  BUSINESS_NAME, EMAIL, FACEBOOK_URL, GBP_MAP_URL, GBP_PROFILE_URL, INSTAGRAM_URL, PACKAGES,
  PHONE_E164, SITE_URL,
} from "@/lib/constants";
import { CITIES, STATE_PAGES } from "@/lib/cities";
import JsonLd from "./JsonLd";

export const ORG_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Package prices like "₦1.7M" → 1700000. Returns undefined for "Custom". */
function nairaFromLabel(label: string): number | undefined {
  const m = label.match(/([\d.]+)\s*M/i);
  return m ? Math.round(parseFloat(m[1]) * 1_000_000) : undefined;
}

/**
 * Site-wide entity graph: Organization + WebSite + LocalBusiness. Every
 * other schema on the site points back at these @ids, which is what lets
 * Google and AI assistants tie pages, services and towns to one business.
 */
export default function LocalBusinessSchema() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BUSINESS_NAME,
        alternateName: ["LumaGrid", "LumaGrid Solar Nigeria"],
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
        email: EMAIL,
        telephone: PHONE_E164,
        sameAs: [FACEBOOK_URL, INSTAGRAM_URL, GBP_PROFILE_URL],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE_E164,
          contactType: "sales",
          areaServed: "NG",
          availableLanguage: ["English", "Nigerian Pidgin"],
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: BUSINESS_NAME,
        inLanguage: "en-NG",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": ["LocalBusiness", "Electrician"],
        "@id": BUSINESS_ID,
        name: BUSINESS_NAME,
        parentOrganization: { "@id": ORG_ID },
        description:
          "LumaGrid Solar is a CAC-registered solar installation company based in Port Harcourt. We design and install solar panels, hybrid inverters and lithium (LiFePO4) batteries for homes and businesses across Rivers State, Delta State and Bayelsa State, including Port Harcourt, Obio-Akpor, Eleme, Bonny, Warri, Effurun, Asaba, Sapele, Ughelli, Abraka, Yenagoa, Ogbia and Amassoma. Free site assessment, itemised quotes and a 2-year workmanship warranty.",
        slogan: "Stop burning money on petrol every week.",
        url: SITE_URL,
        telephone: PHONE_E164,
        email: EMAIL,
        logo: `${SITE_URL}/images/logo.png`,
        image: [
          `${SITE_URL}/og/default.jpg`,
          `${SITE_URL}/images/real/solar-panels-on-the-roof.jpeg`,
          `${SITE_URL}/images/real/5kwh-6Kva-system-abraka.jpeg`,
          `${SITE_URL}/images/real/jinko-panels.jpeg`,
        ],
        priceRange: "₦1.7M+",
        currenciesAccepted: "NGN",
        paymentAccepted: "Cash, Bank Transfer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Port Harcourt",
          addressRegion: "Rivers State",
          addressCountry: "NG",
        },
        geo: { "@type": "GeoCoordinates", latitude: 4.8156, longitude: 7.0498 },
        hasMap: GBP_MAP_URL,
        areaServed: [
          ...Object.values(STATE_PAGES).map(s => ({
            "@type": "State",
            name: s.label,
            url: `${SITE_URL}${s.href}`,
            containedInPlace: { "@type": "Country", name: "Nigeria" },
          })),
          ...CITIES.map(c => ({
            "@type": "City",
            name: c.name,
            url: `${SITE_URL}/solar-installation/${c.slug}`,
            containedInPlace: { "@type": "State", name: STATE_PAGES[c.state].label },
          })),
        ],
        knowsAbout: [
          "Solar panel installation", "Hybrid solar inverters", "Off-grid solar systems",
          "LiFePO4 lithium batteries", "Solar system sizing", "Solar for air conditioners",
          "Solar water pumps and boreholes", "Commercial solar", "Solar maintenance",
          "Gel to lithium battery upgrades",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "09:00",
            closes: "16:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Solar system packages",
          url: `${SITE_URL}/pricing`,
          itemListElement: PACKAGES.map(p => {
            const price = nairaFromLabel(p.price);
            return {
              "@type": "Offer",
              name: `${p.name} ${p.kva} solar package`,
              description: `${p.label}: ${p.includes.join(", ")}`,
              ...(price
                ? { priceSpecification: { "@type": "PriceSpecification", minPrice: price, priceCurrency: "NGN" } }
                : {}),
              itemOffered: {
                "@type": "Service",
                name: `${p.kva} solar system installation`,
                serviceType: "Solar installation",
              },
            };
          }),
        },
      },
    ],
  };

  return <JsonLd data={graph} />;
}
