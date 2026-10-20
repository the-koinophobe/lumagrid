import { SITE_URL } from "./constants";

/** Must match the @ids emitted by components/seo/LocalBusinessSchema. */
const BUSINESS_ID = `${SITE_URL}/#business`;
const ORG_ID = `${SITE_URL}/#organization`;

export function abs(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Solar installation offered by the business in a specific place. */
export function serviceSchema({
  name, description, url, areaServed,
}: {
  name: string;
  description: string;
  url: string;
  areaServed: { type: "City" | "State"; name: string; state?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(url)}#service`,
    name,
    serviceType: "Solar panel installation",
    description,
    url: abs(url),
    provider: { "@id": BUSINESS_ID },
    areaServed: areaServed.map(a => ({
      "@type": a.type,
      name: a.name,
      ...(a.state ? { containedInPlace: { "@type": "State", name: a.state } } : {}),
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      priceSpecification: { "@type": "PriceSpecification", minPrice: 2_800_000, priceCurrency: "NGN" },
      availability: "https://schema.org/InStock",
    },
  };
}

export function articleSchema({
  slug, title, description, date, updated, tags, image,
}: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  tags: string[];
  image: string;
}) {
  const url = abs(`/blog/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    datePublished: date,
    dateModified: updated,
    inLanguage: "en-NG",
    keywords: tags.join(", "),
    image: abs(image),
    author: { "@type": "Organization", "@id": ORG_ID, name: "LumaGrid Solar", url: SITE_URL },
    publisher: { "@id": ORG_ID },
    about: { "@id": BUSINESS_ID },
  };
}
