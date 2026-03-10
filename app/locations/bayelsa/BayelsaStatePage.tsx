"use client";

import { useBreakpoint } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeIn, SectionHeader, WhatsAppIcon, Stars } from "@/components/ui";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { WHATSAPP_URL } from "@/lib/constants";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
    <circle cx="8" cy="8" r="8" fill="var(--accent)" opacity="0.15" />
    <path d="M4.5 8l2.5 2.5 4.5-5" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const areas = [
  { name: "Yenagoa (Biogbolo, Kpansia, Ekeki)", desc: "State capital communities with chronically unreliable grid power — solar is the only stable option" },
  { name: "Amarata / Edepie / Agudama", desc: "Central Yenagoa suburbs bearing the full brunt of transmission vandalism outages" },
  { name: "Ovom / Okaka / Swali", desc: "Northern Yenagoa with active businesses and markets suffering extreme power costs" },
  { name: "Opolo / Onopa / Azikoro", desc: "Residential communities that have experienced months-long blackouts in recent years" },
  { name: "Nembe / Bassambiri", desc: "Ancient Nembe Kingdom with no reliable grid — solar is the backbone of power here" },
  { name: "Brass / Twon-Brass / Akassa", desc: "Coastal oil-producing communities near Akassa Lighthouse where off-grid solar is essential" },
  { name: "Ogbia / Oloibiri", desc: "Historic birthplace of Nigerian oil production — ironically among the least electrified areas" },
  { name: "Amassoma / Wilberforce Island", desc: "Home of Niger Delta University and Bayelsa Airport, solar demand from institutions is high" },
  { name: "Sagbama / Ekeremor", desc: "Northern Bayelsa LGAs on the fringes of the grid, frequently off-supply for weeks at a time" },
  { name: "Kolokuma / Opokuma", desc: "Inland communities with very limited grid access, suited for standalone solar systems" },
  { name: "Southern Ijaw / Oporoma", desc: "Remote delta communities fully dependent on generators or no power at all" },
  { name: "Kaiama / Ogbolomabiri", desc: "Interior communities accessible by creek where solar is the most practical energy solution" },
];

const faqs = [
  {
    q: "Does Bayelsa have special power challenges compared to other states?",
    a: "Yes. Bayelsa is supplied via transmission lines from Ahoada in Rivers State. These lines have been repeatedly vandalised, causing blackouts lasting months at a time. In late 2024, much of Yenagoa went without grid power for over four months. Solar removes this dependency entirely.",
  },
  {
    q: "Can you reach riverine communities in Bayelsa like Nembe, Brass, or Southern Ijaw?",
    a: "Yes. We have logistics experience with boat-access communities. Equipment is transported by river where necessary, and our team is familiar with working in Bayelsa's waterway communities. Off-grid solar is the most practical and cost-effective solution for these areas.",
  },
  {
    q: "Is solar viable in a place that rains as heavily as Yenagoa?",
    a: "Yes. Bayelsa's year-round cloud cover is factored into system sizing. Even in the heavy rainy season, panels generate meaningful power. Battery storage covers the hours of reduced output. The system is designed for exactly this climate.",
  },
  {
    q: "What size system does a home in Yenagoa need?",
    a: "Most 3 to 4 bedroom homes in Biogbolo, Kpansia, or Edepie run well on a 3kW to 5kW system with lithium battery storage. We do a proper load assessment before recommending anything.",
  },
  {
    q: "Is Oloibiri or Ogbia within your service area?",
    a: "Yes. Ogbia LGA, including Oloibiri — the birthplace of Nigerian oil — is within our service area. It is a particular focus for us given that this community has historically been among the least electrified despite its historic oil significance.",
  },
];

const testimonials = [
  {
    name: "James T.",
    area: "Edepie, Yenagoa",
    text: "After months of total darkness when the transmission towers were vandalised, I got a solar system from LumaGrid. Now I have 24-hour power regardless of what happens on the grid. Best decision I made.",
    rating: 5,
  },
  {
    name: "Pastor Goodluck E.",
    area: "Kpansia, Yenagoa",
    text: "Our church runs four days a week with sound equipment, projectors, and fans. LumaGrid sized the system perfectly. We have not used our generator since installation.",
    rating: 5,
  },
  {
    name: "Ebitari P.",
    area: "Ekeki, Yenagoa",
    text: "I run a business centre here. The outages were costing me customers and income. Since LumaGrid, I operate every day without worry about fuel prices or power cuts.",
    rating: 5,
  },
];

export default function BayelsaStatePage() {
  const { isMobile, isSmall } = useBreakpoint();

  return (
    <>
      {/* ── JSON-LD structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "LumaGrid Solar",
            description:
              "Professional solar installation in Yenagoa, Nembe, Brass, Ogbia and all 8 LGAs of Bayelsa State. Specialists in off-grid solar for riverine Niger Delta communities.",
            url: "https://lumagridsolar.com/locations/bayelsa-state",
            telephone: "+2347059497792",
            areaServed: {
              "@type": "State",
              name: "Bayelsa State",
              containsPlace: [
                { "@type": "City", name: "Yenagoa" },
                { "@type": "City", name: "Nembe" },
                { "@type": "City", name: "Brass" },
                { "@type": "City", name: "Ogbia" },
                { "@type": "City", name: "Sagbama" },
                { "@type": "City", name: "Amassoma" },
                { "@type": "City", name: "Ekeremor" },
                { "@type": "City", name: "Kaiama" },
              ],
            },
            serviceType: [
              "Solar Panel Installation",
              "Off-Grid Solar Systems",
              "Solar Battery Storage",
              "Riverine Community Solar",
            ],
            priceRange: "₦₦",
            sameAs: ["https://facebook.com/lumagrid"],
          }),
        }}
      />

      <Navbar isMobile={isMobile} />
      <FAQSchema
        faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Bayelsa State", href: "/locations/bayelsa" }]} />

      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(150deg, #083d26 0%, var(--green) 45%, #1e9b5e 100%)",
          padding: isMobile ? "80px 0 60px" : "100px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(0,192,106,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <span
              className="tag"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", marginBottom: "16px", display: "inline-block" }}
            >
              Bayelsa State Coverage
            </span>
            <h1
              className="brig"
              style={{
                color: "#fff",
                fontSize: isMobile ? "2.2rem" : "3.4rem",
                lineHeight: 1.1,
                maxWidth: "820px",
                marginBottom: "20px",
              }}
            >
              Solar Installation in Yenagoa &amp; All of Bayelsa State
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: isMobile ? "1rem" : "1.15rem",
                maxWidth: "640px",
                marginBottom: "32px",
                lineHeight: 1.7,
              }}
            >
              Bayelsa's power crisis is real and well-documented. Transmission vandalism, infrastructure gaps, and geography combine to
              make the national grid unreliable here by default. Solar is not an upgrade for Bayelsa — it is the solution. We install
              across all 8 LGAs, including riverine and island communities.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <WhatsAppIcon size={20} />
                Get a Free Quote
              </a>
              <a href="#areas" className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}>
                View Areas We Cover
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BAYELSA POWER CONTEXT BANNER ── */}
      <div
        style={{
          background: "#fff3cd",
          borderTop: "3px solid #e6a817",
          borderBottom: "3px solid #e6a817",
          padding: "18px 0",
        }}
      >
        <div className="container">
          <p style={{ color: "#7a5000", fontSize: "0.92rem", textAlign: "center", lineHeight: 1.6, margin: 0 }}>
            <strong>Documented:</strong> In 2024, Yenagoa experienced over 4 months of near-total blackout following transmission tower vandalism on the
            Ahoada-Yenagoa 132kV line. Residents spent N32,000+ daily on generator fuel. Solar removes this risk permanently.
          </p>
        </div>
      </div>

      {/* ── WHY BAYELSA ── */}
      <section className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="The Bayelsa Power Reality"
              title="Why Bayelsa Residents Need Solar More Than Anywhere"
              subtitle="Bayelsa State is the core of the Niger Delta. It is also one of the most power-deprived states in Nigeria. Here is exactly why solar is not optional here."
            />
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            {[
              {
                icon: "🗼",
                title: "Transmission Vandalism Risk",
                body: "Bayelsa receives grid power via long-distance transmission lines from Ahoada. A single act of vandalism can plunge the entire state into darkness for weeks or months, as seen in 2024.",
              },
              {
                icon: "🌿",
                title: "River Access Only Communities",
                body: "Tens of thousands of Bayelsans in Nembe, Brass, Southern Ijaw, and other LGAs are only reachable by boat. The national grid will never serve these communities. Solar is the only answer.",
              },
              {
                icon: "🛢️",
                title: "Oloibiri: Birthplace of Oil, No Light",
                body: "Nigeria's first oil well was drilled in Oloibiri, Ogbia LGA in 1956. Decades later, this community still lacks reliable power. We serve Oloibiri and all of Ogbia LGA.",
              },
              {
                icon: "🏛️",
                title: "Institutions Need Power",
                body: "Niger Delta University in Amassoma, schools, clinics, and government offices across Yenagoa cannot function without power. Solar ensures they run regardless of grid status.",
              },
              {
                icon: "💸",
                title: "Generator Fuel Costs Are Catastrophic",
                body: "During the 2024 blackout, residents in Ekeki and Edepie reported spending N30,000 to N50,000 weekly on fuel. Solar eliminates that recurring drain on household and business income.",
              },
              {
                icon: "🔋",
                title: "Battery Storage for Rainy Season",
                body: "Bayelsa's heavy rainfall reduces direct sunlight on some days. Our systems include correctly sized lithium battery banks to cover low-generation periods seamlessly.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="card-hover"
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "28px 24px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                  <h3 className="brig" style={{ fontSize: "1.05rem", color: "var(--green)", marginBottom: "8px" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANDMARK AREAS WITH IMAGE PLACEHOLDERS ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="Bayelsa Locations"
              title="Key Areas We Serve Across Bayelsa State"
              subtitle="From Yenagoa's urban suburbs to the ancient communities of Nembe, Brass, and the Southern Ijaw creeks."
            />
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isSmall ? "repeat(2,1fr)" : "repeat(3,1fr)",
              gap: "20px",
              marginTop: "48px",
            }}
          >
            {[
              {
                label: "Yenagoa — State Capital",
                sublabel: "Biogbolo, Kpansia, Swali, Ekeki",
                imgPlaceholder: "[PHOTO: Yenagoa city centre, Isaac Adaka Boro Expressway, or Government House road]",
                body: "Bayelsa's capital and most populated area. Communities like Biogbolo, Kpansia, and Edepie are our most active service zones in the state.",
              },
              {
                label: "Nembe Kingdom",
                sublabel: "Nembe LGA — Ancient Delta City",
                imgPlaceholder: "[PHOTO: Nembe waterfront or traditional Nembe community]",
                body: "One of the oldest kingdoms in the Niger Delta, accessible by creek. Nembe has no reliable grid power. We bring complete off-grid solar to homes and community facilities here.",
              },
              {
                label: "Brass & Akassa Lighthouse",
                sublabel: "Brass LGA — Coastal Bayelsa",
                imgPlaceholder: "[PHOTO: Akassa Lighthouse or Brass coastal community]",
                body: "The Akassa Lighthouse has guided ships since 1910. The communities around Brass LGA still live without reliable electricity. Solar changes that.",
              },
              {
                label: "Oloibiri / Ogbia",
                sublabel: "Ogbia LGA — Birthplace of Nigerian Oil",
                imgPlaceholder: "[PHOTO: Oloibiri oil well monument or Ogbia community]",
                body: "Nigeria's oil story started here in 1956. Decades on, Oloibiri and Ogbia communities deserve the power that energy extraction never gave them. Solar delivers it now.",
              },
              {
                label: "Amassoma & NDU",
                sublabel: "Kolokuma/Opokuma — University Town",
                imgPlaceholder: "[PHOTO: Niger Delta University Amassoma campus or Wilberforce Island]",
                body: "Home of Niger Delta University and Bayelsa International Airport. Institutional and student solar demand is high here. We service the campus corridor and surrounding communities.",
              },
              {
                label: "Southern Ijaw Creeks",
                sublabel: "Southern Ijaw LGA — Remote Delta",
                imgPlaceholder: "[PHOTO: Southern Ijaw riverine community or creek waterway]",
                body: "Some of the most remote communities in Nigeria. Southern Ijaw LGA has the lowest urbanisation in Bayelsa. For these communities, solar is the first real electricity they will have.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  className="card-hover"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      height: "180px",
                      background: "linear-gradient(135deg, var(--green-light), var(--green-xl))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ color: "var(--green)", fontSize: "0.78rem", fontStyle: "italic", opacity: 0.7 }}>
                      {item.imgPlaceholder}
                    </p>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--accent)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.sublabel}
                    </span>
                    <h3 className="brig" style={{ fontSize: "1.05rem", color: "var(--green)", margin: "6px 0 8px" }}>
                      {item.label}
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS COVERED ── */}
      <section id="areas" className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="Full Coverage"
              title="Communities We Serve in Bayelsa State"
              subtitle="We cover all 8 LGAs across Bayelsa, including communities only accessible by water."
            />
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isSmall ? "repeat(2,1fr)" : "repeat(3,1fr)",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            {areas.map((area, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "18px 20px",
                    border: "1px solid var(--border)",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <CheckIcon />
                  <div>
                    <strong style={{ color: "var(--green)", fontSize: "0.95rem" }}>{area.name}</strong>
                    <p style={{ color: "var(--muted)", fontSize: "0.83rem", marginTop: "3px", lineHeight: 1.5 }}>{area.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <p style={{ color: "var(--muted)", marginBottom: "16px" }}>
                Your community not listed? We cover all of Bayelsa. Message us.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <WhatsAppIcon size={18} />
                Chat With Us on WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="Customer Reviews"
              title="What Bayelsa Customers Are Saying"
            />
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className="card-hover"
                  style={{
                    background: "var(--green-xl)",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Stars count={t.rating} />
                  <p style={{ color: "#333", lineHeight: 1.7, margin: "14px 0 18px", fontSize: "0.93rem" }}>"{t.text}"</p>
                  <div>
                    <strong style={{ color: "var(--green)", fontSize: "0.92rem" }}>{t.name}</strong>
                    <p style={{ color: "var(--muted)", fontSize: "0.82rem" }}>{t.area}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <FadeIn>
            <SectionHeader tag="FAQ" title="Common Questions About Solar in Bayelsa State" />
          </FadeIn>
          <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "22px 24px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3 className="brig" style={{ fontSize: "1rem", color: "var(--green)", marginBottom: "10px" }}>
                    {faq.q}
                  </h3>
                  <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.92rem" }}>{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background: "var(--green)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "660px" }}>
          <FadeIn>
            <h2 className="brig" style={{ color: "#fff", fontSize: isMobile ? "1.9rem" : "2.6rem", marginBottom: "16px" }}>
              Ready to Go Solar in Bayelsa State?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "28px", lineHeight: 1.7 }}>
              Do not wait for the next transmission tower vandalism or grid failure. Get a solar system designed for Bayelsa's
              climate and geography. Free assessment, honest recommendation.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
              style={{ fontSize: "1rem", padding: "14px 28px", display: "inline-flex", alignItems: "center", gap: "10px" }}
            >
              <WhatsAppIcon size={20} />
              Get Your Free Quote Now
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer isMobile={isMobile} isSmall={isSmall} />
    </>
  );
}