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
  { name: "GRA Phase 1 & 2", desc: "High-demand residential estates with consistent power challenges" },
  { name: "Rumuola / Rumuibekwe", desc: "Fast-growing suburb off Aba Road needing reliable off-grid power" },
  { name: "Mgbuoba / Ada George", desc: "Dense residential corridor with rising solar adoption" },
  { name: "D-Line / Elekahia", desc: "Mid-city neighbourhoods where fuel costs are biting hardest" },
  { name: "Woji / Trans-Amadi", desc: "Industrial and mixed-use zone, ideal for commercial solar" },
  { name: "Rumuola / Peter Odili Road", desc: "Government and business district with uninterrupted power needs" },
  { name: "Obio-Akpor (Rumuola, Rumuogba)", desc: "One of the most populated LGAs — highest solar demand in the state" },
  { name: "Bonny Island", desc: "Oil and gas community requiring 24/7 off-grid solar reliability" },
  { name: "Eleme / Oyigbo", desc: "Industrial hubs near the refinery with high commercial load requirements" },
  { name: "Okrika / Ogu-Bolo", desc: "Riverine communities where grid access is unreliable by geography" },
  { name: "Ahoada / Omoku", desc: "Upland communities along East-West Road, underserved by PHCN" },
  { name: "Degema / Abonnema", desc: "Kalabari heartland with island communities fully dependent on generation" },
];

const faqs = [
  {
    q: "How long does a solar installation take in Port Harcourt?",
    a: "Most residential installations in Port Harcourt are completed within 1 to 2 days. Commercial projects in areas like Trans-Amadi or Eleme may take 3 to 5 days depending on system size.",
  },
  {
    q: "Will solar work during the rainy season in Rivers State?",
    a: "Yes. Modern solar panels generate power even on overcast days. Port Harcourt averages 4 to 5.2 kWh per kW of installed capacity daily year-round. You will still have power during the rainy season, supplemented by your battery storage.",
  },
  {
    q: "Do you install in places like Bonny, Okrika, or Degema?",
    a: "Yes, we cover all of Rivers State including riverine and island communities. For areas like Bonny Island and Degema, solar is not just an option — it is the most cost-effective power solution available.",
  },
  {
    q: "What size system do I need for my Port Harcourt home?",
    a: "A typical 3-bedroom home in GRA or Rumuola runs well on a 3kW to 5kW system with a lithium battery bank. We do a free load assessment before recommending any system.",
  },
  {
    q: "Can solar replace my generator completely?",
    a: "For most homes and small businesses in Port Harcourt, yes. A properly sized solar-plus-battery system eliminates the need for a generator for everyday loads. Many of our customers in Obio-Akpor and Mgbuoba have not refuelled their generators in months.",
  },
];

const testimonials = [
  {
    name: "Chukwuemeka O.",
    area: "GRA Phase 2, Port Harcourt",
    text: "LumaGrid installed a 5kW system in my home. Since then, my generator has not started once. The savings on diesel alone covered most of the system cost within a year.",
    rating: 5,
  },
  {
    name: "Mrs. Eze",
    area: "Rumuola, Obio-Akpor",
    text: "I was sceptical but the team was professional and honest. They did not oversize my system just to charge more. Everything was explained clearly and the work was clean.",
    rating: 5,
  },
  {
    name: "Tari W.",
    area: "Trans-Amadi, Port Harcourt",
    text: "We run a cold room and small shop. LumaGrid designed a commercial system that handles our load perfectly. Fourteen months in and no issues.",
    rating: 5,
  },
];

export default function RiversStatePage() {
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
              "Professional solar panel installation company serving Port Harcourt, Rivers State, and all 23 LGAs. Residential, commercial and industrial solar systems.",
            url: "https://lumagridsolar.com/locations/rivers-state",
            telephone: "+2347059497792",
            areaServed: {
              "@type": "State",
              name: "Rivers State",
              containsPlace: [
                { "@type": "City", name: "Port Harcourt" },
                { "@type": "City", name: "Obio-Akpor" },
                { "@type": "City", name: "Bonny" },
                { "@type": "City", name: "Okrika" },
                { "@type": "City", name: "Eleme" },
                { "@type": "City", name: "Oyigbo" },
                { "@type": "City", name: "Ahoada" },
                { "@type": "City", name: "Degema" },
              ],
            },
            serviceType: ["Solar Panel Installation", "Solar Battery Storage", "Off-Grid Solar Systems"],
            priceRange: "₦₦",
            sameAs: ["https://facebook.com/lumagrid"],
          }),
        }}
      />

      <Navbar isMobile={isMobile} />
      <FAQSchema
        faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Rivers State", href: "/locations/rivers" }]} />

      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--green) 0%, var(--green-mid) 60%, #1a9460 100%)",
          padding: isMobile ? "80px 0 60px" : "100px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-40%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(0,192,106,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <span
              className="tag"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", marginBottom: "16px", display: "inline-block" }}
            >
              Rivers State Coverage
            </span>
            <h1
              className="brig"
              style={{
                color: "#fff",
                fontSize: isMobile ? "2.2rem" : "3.4rem",
                lineHeight: 1.1,
                maxWidth: "780px",
                marginBottom: "20px",
              }}
            >
              Solar Installation in Port Harcourt &amp; Rivers State
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
              Port Harcourt is one of Nigeria's most solar-ready cities. With average daily output of up to 5.24 kWh per kW installed,
              your investment works hard here year-round. We serve all 23 LGAs across Rivers State, from GRA to Bonny Island to Degema.
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

      {/* ── WHY SOLAR NOW IN PH ── */}
      <section className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="The Power Situation in Rivers State"
              title="Why Port Harcourt Residents Are Switching to Solar"
              subtitle="PHED supply in Rivers State remains among the most unreliable in the South-South. Most homes and businesses run on generators for 18 to 22 hours daily. Solar changes that permanently."
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
                icon: "",
                title: "Excellent Solar Resource",
                body: "Port Harcourt generates 4.0 to 5.24 kWh per kW of installed solar capacity daily across all seasons. The science is solid for this location.",
              },
              {
                icon: "",
                title: "Rising Fuel Costs",
                body: "A household running a generator 20 hours daily is spending N80,000 to N150,000 on diesel monthly. Solar eliminates that recurring cost.",
              },
              {
                icon: "",
                title: "Riverine Areas Without Grid",
                body: "Communities in Bonny, Degema, Okrika, and Kalabari have never had reliable grid power. Solar is not a supplement here — it is the grid.",
              },
              {
                icon: "",
                title: "Industrial & Commercial Loads",
                body: "Trans-Amadi, Eleme, and Oyigbo are home to some of Nigeria's most energy-intensive businesses. We design systems to match industrial loads.",
              },
              {
                icon: "",
                title: "No More Generator Noise or Soot",
                body: "Port Harcourt already battles soot pollution. Solar ends your contribution to that problem and gives you silent, clean power 24/7.",
              },
              {
                icon: "",
                title: "Property Value Increase",
                body: "Solar-equipped homes in Obio-Akpor, GRA, and Woji command higher rents and sale prices. It is an infrastructure upgrade, not just a power solution.",
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

      {/* ── LANDMARK IMAGE PLACEHOLDERS ── 
      <section className="section">
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="Serving All of Rivers State"
              title="From Port Harcourt City to the Creeks"
              subtitle="We have installed systems across the length and breadth of Rivers State, from the urban streets of GRA to riverine communities that have never had grid power."
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
                label: "Port Harcourt City Centre",
                sublabel: "The Treasure City",
                imgPlaceholder: "[PHOTO: Port Harcourt city skyline or Rumuola road]",
                body: "Nigeria's oil capital is our home base. From GRA Phase 1 to D-Line, Mile 1 to Rumuola, we have the fastest response time in the city.",
              },
              {
                label: "Bonny Island",
                sublabel: "LNG Hub, Rivers State",
                imgPlaceholder: "[PHOTO: Bonny Island waterfront or NLNG facility exterior]",
                body: "Bonny's offshore position makes the national grid unreliable. Solar-plus-battery systems are the permanent fix for homes and businesses here.",
              },
              {
                label: "Obio-Akpor LGA",
                sublabel: "Rumuola, Mgbuoba, Rumuigbo",
                imgPlaceholder: "[PHOTO: Ada George Road or Rumuola residential area]",
                body: "The most populated LGA in Rivers State. Solar demand here is the highest in the South-South and we are ready to serve every household.",
              },
              {
                label: "Trans-Amadi Industrial Layout",
                sublabel: "Commercial & Industrial",
                imgPlaceholder: "[PHOTO: Trans-Amadi industrial area or factory rooftop]",
                body: "Workshops, factories, cold rooms, and logistics companies in Trans-Amadi need reliable industrial solar. We design for heavy commercial loads.",
              },
              {
                label: "Degema & Kalabari Communities",
                sublabel: "Riverine Rivers State",
                imgPlaceholder: "[PHOTO: Degema riverside or Kalabari waterway community]",
                body: "Kalabari communities along the creeks and waterways depend entirely on generators. We bring solar to these communities with boat-accessible logistics.",
              },
              {
                label: "Ahoada & Omoku",
                sublabel: "Ahoada East & West LGA",
                imgPlaceholder: "[PHOTO: Ahoada town or East-West Road scene in Rivers State]",
                body: "Upland Rivers State communities along the East-West Road are underserved by PHCN. We deliver and install across these areas regularly.",
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
                  {/* Image placeholder 
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
                    <p
                      style={{
                        color: "var(--green)",
                        fontSize: "0.78rem",
                        fontStyle: "italic",
                        opacity: 0.7,
                      }}
                    >
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

      */}

      {/* ── AREAS COVERED ── */}
      <section id="areas" className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="Coverage Map"
              title="Areas We Serve in Rivers State"
              subtitle="We cover all 23 LGAs in Rivers State. Below are the most active areas. If your community is not listed, message us — we likely cover it."
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
                Not sure if we cover your area? Message us directly.
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
              title="What Rivers State Customers Are Saying"
              subtitle="Real feedback from homeowners and business owners across Port Harcourt and Rivers State."
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
            <SectionHeader
              tag="FAQ"
              title="Common Questions About Solar in Rivers State"
            />
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
      <section
        className="section"
        style={{
          background: "var(--green)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "660px" }}>
          <FadeIn>
            <h2 className="brig" style={{ color: "#fff", fontSize: isMobile ? "1.9rem" : "2.6rem", marginBottom: "16px" }}>
              Ready to Go Solar in Rivers State?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "28px", lineHeight: 1.7 }}>
              Get a free site assessment and quote. No pressure, no obligation. We will tell you exactly what you need and what it will cost before any work begins.
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