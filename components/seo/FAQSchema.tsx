interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Usage example:
// <FAQSchema
//   faqs={[
//     {
//       question: "How long does a solar installation take in Port Harcourt?",
//       answer: "Most residential installations are completed within 1 to 2 days depending on system size.",
//     },
//     {
//       question: "Do you cover Delta and Bayelsa State?",
//       answer: "Yes. LumaGrid Solar serves Rivers State, Delta State, and Bayelsa State across the Niger Delta.",
//     },
//   ]}
// />