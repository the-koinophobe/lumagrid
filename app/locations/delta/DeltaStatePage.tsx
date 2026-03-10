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
  { name: "Warri / Effurun", desc: "Delta's oil city and commercial heartland, high solar demand across GRA and residential zones" },
  { name: "Asaba / Okpanam", desc: "Fast-growing state capital, UNESCO City of Film, rising residential and commercial solar market" },
  { name: "Sapele", desc: "Timber and industrial city on the Ethiope River with significant commercial solar opportunity" },
  { name: "Ughelli / Agbarho", desc: "Central Delta commercial hub, midpoint for installations across the state" },
  { name: "Abraka / Agbor", desc: "University town and Ika-land, student and residential solar demand growing rapidly" },
  { name: "Ozoro / Oleh", desc: "Isoko communities with limited grid reliability, ideal for off-grid solar systems" },
  { name: "Kwale / Ogwashi-Uku", desc: "Ndokwa and Anioma communities along the western axis of the state" },
  { name: "Koko / Warri North", desc: "Oil-producing riverine communities with poor grid infrastructure, perfect for solar" },
  { name: "Bomadi / Patani", desc: "Southern Delta LGAs on waterways, solar is often the only stable power source" },
  { name: "Uvwie / Udu", desc: "Growing suburbs around Warri with heavy residential load and generator dependency" },
  { name: "Ibusa / Oshimili", desc: "Peri-urban Asaba communities with rapid housing development and new solar demand" },
  { name: "Burutu / Forcados", desc: "Remote coastal communities near Forcados Bay where off-grid solar is essential" },
];

const faqs = [
  {
    q: "Do you serve both Warri and Asaba in Delta State?",
    a: "Yes. We cover all 25 LGAs in Delta State including both Warri and Asaba, as well as Sapele, Ughelli, Abraka, and remote LGAs like Bomadi and Burutu.",
  },
  {
    q: "How does the heat in Warri affect solar panels?",
    a: "Modern solar panels are rated to perform well in tropical climates. Warri's average temperature of 30°C is well within operating range. Panels are mounted with airflow clearance so heat has minimal effect on output.",
  },
  {
    q: "I live near the Niger Bridge in Asaba — can you install there?",
    a: "Absolutely. Asaba and the Oshimili South axis is one of our fastest-growing service areas. We do free assessments before recommending any system.",
  },
  {
    q: "What about Nana's Palace area and communities in Koko?",
    a: "We serve Warri North including Koko and surrounding riverine communities. For offshore and waterway communities, we coordinate logistics for equipment delivery.",
  },
  {
    q: "Is Delta State's power situation improving any time soon?",
    a: "Grid supply in Warri and Asaba remains inconsistent despite ongoing infrastructure projects. There is a planned 200MW solar plant at Ashama in Aniocha South, but that is years away from full operation. Residential solar is your best solution today.",
  },
];

const testimonials = [
  {
    name: "Engr. Ejiro A.",
    area: "Effurun, Warri",
    text: "I had been spending over N120,000 monthly on diesel for my shop. LumaGrid installed a 3kW system in two days. I have not bought fuel in over six months.",
    rating: 5,
  },
  {
    name: "Mrs. Okonkwo",
    area: "Asaba GRA",
    text: "Professional team. They came, assessed the site properly, and recommended exactly what we needed. No upselling. The system has been perfect since day one.",
    rating: 5,
  },
  {
    name: "Mr. Ovie",
    area: "Ughelli South",
    text: "Light anywhere in Delta is a joke. LumaGrid gave me light every hour of the day. I wish I had done this years ago.",
    rating: 5,
  },
];

export default function DeltaStatePage() {
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
              "Professional solar panel installation in Warri, Asaba, Sapele, Ughelli and all 25 LGAs across Delta State. Residential, commercial and off-grid solar solutions.",
            url: "https://lumagridsolar.com/locations/delta-state",
            telephone: "+2347059497792",
            areaServed: {
              "@type": "State",
              name: "Delta State",
              containsPlace: [
                { "@type": "City", name: "Warri" },
                { "@type": "City", name: "Asaba" },
                { "@type": "City", name: "Sapele" },
                { "@type": "City", name: "Ughelli" },
                { "@type": "City", name: "Abraka" },
                { "@type": "City", name: "Agbor" },
                { "@type": "City", name: "Ozoro" },
                { "@type": "City", name: "Kwale" },
              ],
            },
            serviceType: ["Solar Panel Installation", "Solar Battery Storage", "Off-Grid Solar Systems", "Commercial Solar"],
            priceRange: "₦₦",
            sameAs: ["https://facebook.com/lumagrid"],
          }),
        }}
      />

      <Navbar isMobile={isMobile} />
      <FAQSchema
        faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Delta State", href: "/locations/delta" }]} />

      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0a4d30 0%, var(--green) 50%, var(--green-mid) 100%)",
          padding: isMobile ? "80px 0 60px" : "100px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-5%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(0,192,106,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <span
              className="tag"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", marginBottom: "16px", display: "inline-block" }}
            >
              Delta State Coverage
            </span>
            <h1
              className="brig"
              style={{
                color: "#fff",
                fontSize: isMobile ? "2.2rem" : "3.4rem",
                lineHeight: 1.1,
                maxWidth: "800px",
                marginBottom: "20px",
              }}
            >
              Solar Installation in Warri, Asaba &amp; All of Delta State
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: isMobile ? "1rem" : "1.15rem",
                maxWidth: "620px",
                marginBottom: "32px",
                lineHeight: 1.7,
              }}
            >
              From the Niger Bridge in Asaba to the Forcados Bay in the south, Delta State deserves better power. We install professional solar systems
              across all 25 LGAs, serving homes, businesses, cold rooms, and off-grid communities.
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

      {/* ── WHY DELTA ── */}
      <section className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="Delta State Power Reality"
              title="Why Delta State Residents Are Done Waiting for NEPA"
              subtitle="Delta State is one of Nigeria's wealthiest states by oil revenue. Yet homes in Warri, Ughelli, and Asaba are lucky to see 4 hours of grid power daily. Solar is not a luxury here. It is common sense."
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
                icon: "🛢️",
                title: "Oil Money, No Light",
                body: "Delta produces billions in oil revenue yet grid power in Warri averages under 5 hours daily. Solar ends this contradiction for your home or business permanently.",
              },
              {
                icon: "🌊",
                title: "Riverine Communities with No Grid",
                body: "Bomadi, Patani, Burutu, and Forcados Bay communities have never had consistent grid power. Solar-plus-battery is the only viable solution for these locations.",
              },
              {
                icon: "🏙️",
                title: "Asaba Is Booming",
                body: "Asaba is one of Nigeria's fastest-growing cities, a UNESCO City of Film with a surge in housing. New construction going in without solar is leaving money on the table.",
              },
              {
                icon: "⚡",
                title: "Unstable Transmission",
                body: "Delta's grid depends on transmission lines prone to vandalism and faults. Even when power is scheduled, it often does not arrive. Solar removes that dependency entirely.",
              },
              {
                icon: "🏭",
                title: "Commercial & Industrial Belt",
                body: "Sapele, Ughelli, and the Warri industrial corridor run heavy equipment that needs reliable power. We design industrial solar systems that match real commercial loads.",
              },
              {
                icon: "💰",
                title: "Diesel Is Bleeding You Dry",
                body: "Businesses in Warri and Effurun burning 15 to 30 litres of diesel daily are losing N250,000 to N500,000 monthly to fuel. Solar payback on that spend is typically under 18 months.",
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
              tag="Delta State Locations"
              title="Major Areas We Serve Across Delta State"
              subtitle="We have active installations in all three senatorial districts of Delta State — Delta North, Delta Central, and Delta South."
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
                label: "Warri / Effurun",
                sublabel: "Delta South — Oil City",
                imgPlaceholder: "[PHOTO: Warri city centre or Effurun roundabout]",
                body: "Delta's commercial engine. From Warri GRA to Effurun and the Army Estate axis, residential and commercial solar demand here is the highest in the state.",
              },
              {
                label: "Asaba & Niger Bridge",
                sublabel: "Delta North — State Capital",
                imgPlaceholder: "[PHOTO: Niger Bridge Asaba or Asaba city skyline]",
                body: "The fastest-growing city in Delta State. Asaba's residential estates and Ibusa corridor are prime solar territory. We install across Okpanam Road and beyond.",
              },
              {
                label: "Sapele & Ethiope River",
                sublabel: "Delta Central",
                imgPlaceholder: "[PHOTO: Sapele port or Ethiope River waterfront]",
                body: "Historic timber city and port town on the Ethiope River. Industrial and residential solar needs are significant in Sapele and surrounding Ethiope LGAs.",
              },
              {
                label: "Ughelli & Agbarho",
                sublabel: "Ughelli North/South LGA",
                imgPlaceholder: "[PHOTO: Ughelli town centre or Agbarho community]",
                body: "Ughelli is the central hub for installations across the middle belt of Delta State. We maintain regular service runs to this corridor.",
              },
              {
                label: "Abraka & Agbor",
                sublabel: "Ethiope East / Ika South",
                imgPlaceholder: "[PHOTO: Delta State University Abraka campus or Agbor market]",
                body: "Home to Delta State University in Abraka and the commercial Ika-land hub of Agbor. Growing student and residential solar demand in both communities.",
              },
              {
                label: "Bomadi / Burutu / Forcados",
                sublabel: "Delta South — Riverine",
                imgPlaceholder: "[PHOTO: Bomadi beach, Forcados River, or riverine community]",
                body: "Southern Delta's waterway communities near Forcados Bay have no viable grid power. We bring complete off-grid solar systems to these locations.",
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
                    <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
              title="LGAs &amp; Towns We Cover in Delta State"
              subtitle="Our team operates across all 25 LGAs in Delta State. Here are the most active service areas."
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
                Do not see your town listed? Message us. We cover all of Delta State.
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
              title="What Delta State Customers Are Saying"
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
            <SectionHeader tag="FAQ" title="Common Questions About Solar in Delta State" />
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
              Ready to Go Solar in Delta State?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "28px", lineHeight: 1.7 }}>
              Get a free assessment anywhere in Delta State. Whether you are in Warri GRA, along the Niger Bridge in Asaba, or in a
              Forcados riverine community, we come to you.
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