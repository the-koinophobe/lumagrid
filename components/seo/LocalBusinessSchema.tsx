interface LocalBusinessSchemaProps {
  /** Override page-specific description. Defaults to the company description. */
  description?: string;
}

export default function LocalBusinessSchema({ description }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://lumagridsolar.com/#business",
    name: "LumaGrid Solar",
    description:
      description ??
      "LumaGrid Solar installs residential and commercial solar power systems across Rivers State, Delta State, and Bayelsa State in the Niger Delta region of Nigeria.",
    url: "https://lumagridsolar.com",
    telephone: "+2347059497792",
    email: "info@lumagridsolar.com",
    logo: "https://lumagridsolar.com/logo.png",
    image: "https://lumagridsolar.com/og-image.jpg",
    priceRange: "₦₦",
    currenciesAccepted: "NGN",
    paymentAccepted: "Cash, Bank Transfer",
    areaServed: [
      {
        "@type": "State",
        name: "Rivers State",
        containedInPlace: { "@type": "Country", name: "Nigeria" },
      },
      {
        "@type": "State",
        name: "Delta State",
        containedInPlace: { "@type": "Country", name: "Nigeria" },
      },
      {
        "@type": "State",
        name: "Bayelsa State",
        containedInPlace: { "@type": "Country", name: "Nigeria" },
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Port Harcourt",
      addressRegion: "Rivers State",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.8156,
      longitude: 7.0498,
    },
    sameAs: [
      "https://facebook.com/lumagrid",
    ],
    hasMap: "https://share.google/DtTq8d4ZtcoUOQ1yH",
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
        closes: "15:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+2347059497792",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
