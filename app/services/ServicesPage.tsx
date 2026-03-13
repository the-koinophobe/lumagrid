"use client";

import { InstallPhoto } from "@/components/ui";
import { useBreakpoint } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

// Inline UI components — no external UI imports needed

function FadeIn({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        animation: `fadeInUp 0.55s ease both`,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={{ maxWidth: "640px", marginBottom: "0.5rem" }}>
      <span
        className="tag"
        style={{ marginBottom: "0.75rem", display: "inline-block" }}
      >
        {tag}
      </span>
      <h2
        className="brig section-title"
        style={{ marginBottom: subtitle ? "0.75rem" : 0 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.975rem" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CheckIcon({ size = 14, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      style={{ flexShrink: 0, ...style }}
    >
      <circle cx="7" cy="7" r="7" fill="currentColor" opacity={0.15} />
      <polyline
        points="3.5,7 6,9.5 10.5,4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── SEO Metadata (export from a separate metadata.ts if needed) ───────────
// export const metadata = {
//   title: "Solar Installation Services | Residential, Commercial & Maintenance | LumaGrid Solar",
//   description:
//     "LumaGrid Solar offers expert solar panel installation for homes and businesses across Rivers State, Delta State and Bayelsa. We also service and maintain existing solar systems and upgrade gel batteries to lithium. Get a free quote today.",
//   keywords: [
//     "solar installation Rivers State",
//     "solar panels Port Harcourt",
//     "commercial solar Nigeria",
//     "residential solar installation",
//     "solar maintenance Nigeria",
//     "lithium battery upgrade Nigeria",
//     "gel to lithium battery upgrade",
//     "solar power Delta State",
//     "solar Bayelsa State",
//     "inverter installation Nigeria",
//   ],
// };


const WHATSAPP_BASE = `https://wa.me/2347059497792`;

function waLink(msg: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
}

// ─── Service card data ───────────────────────────────────────────────────────
const services = [
  {
    id: "residential",
    tag: "For Homes",
    title: "Residential Solar Installation",
    subtitle: "Reliable power for your home. Day and night.",
    image: "/images/real/5kwh-6Kva-system-abraka.jpeg",
    description:
      "Stop depending on PHCN and diesel generators. We design and install complete solar power systems for houses, apartments, and estates across Rivers State, Delta State, and Bayelsa. Every installation is sized to your actual energy needs so you never pay for capacity you do not use.",
    features: [
      "Free on-site energy assessment",
      "Custom system sizing (1kVA to 20kVA+)",
      "Monocrystalline solar panels with 25-year warranties",
      "Lithium battery storage for overnight and cloudy-day power",
      "Inverter selection and installation",
      "Clean cable management and circuit protection",
      "Post-installation testing and handover training",
      "12-month workmanship warranty",
    ],
    waMsg:
      "Hi LumaGrid, I'm interested in residential solar installation. I'd like to get a free quote.",
    imagePlaceholder: {
      label: "Residential install photo",
      hint: "Photo of solar panels on a residential rooftop in Port Harcourt",
      aspect: "16/9",
    },
    accent: "Homes across Port Harcourt, Warri, Yenagoa and beyond",
  },
  {
    id: "commercial",
    tag: "For Businesses",
    title: "Commercial Solar Installation",
    subtitle: "Cut your diesel bill. Protect your business from outages.",
    image: "/images/real/movable-LifePo4-batteries.jpeg",
    description:
      "Power cuts cost Nigerian businesses billions every year. LumaGrid designs and deploys commercial-grade solar systems for offices, warehouses, hospitals, schools, hotels, filling stations, and industrial facilities. We handle systems of any scale and manage the full project from site survey to commissioning.",
    features: [
      "Detailed load analysis and ROI projection",
      "Systems from 10kVA to 500kVA+",
      "Three-phase inverter solutions available",
      "Industrial-grade lithium battery banks",
      "Grid-tie and off-grid configurations",
      "Diesel generator integration and auto-switching",
      "Remote monitoring and performance reporting",
      "Dedicated commercial support line",
    ],
    waMsg:
      "Hi LumaGrid, I need a commercial solar quote for my business. Please get in touch.",
    imagePlaceholder: {
      label: "Commercial install photo",
      hint: "Photo of large solar array on a commercial building or warehouse roof",
      aspect: "16/9",
    },
    accent: "Trusted by businesses in Rivers, Delta and Bayelsa States",
  },
  {
    id: "maintenance",
    tag: "Keep It Running",
    title: "Solar System Maintenance & Servicing",
    subtitle: "Your system is an investment. Protect it.",
    image: "/images/real/jinko-590w-panels.jpeg",
    description:
      "A poorly maintained solar system loses efficiency fast. Dust, loose connections, and aging components quietly rob you of power. Our maintenance service keeps your panels, batteries, and inverters performing at full capacity all year round.",
    features: [
      "Panel cleaning and output inspection",
      "Battery health check and capacity test",
      "Inverter diagnostics and firmware updates",
      "Wiring inspection and connection tightening",
      "Charge controller calibration",
      "Full written service report after every visit",
      "Priority emergency call-out for service plan members",
      "Available as one-off visit or annual service plan",
    ],
    waMsg:
      "Hi LumaGrid, I'd like to book a maintenance visit for my solar system.",
    imagePlaceholder: {
      label: "Maintenance service photo",
      hint: "Technician cleaning solar panels or testing battery bank",
      aspect: "16/9",
    },
    accent: "We service all brands and system types",
  },
  {
    id: "battery-upgrade",
    tag: "Upgrade Service",
    title: "Gel Battery to Lithium Battery Upgrade",
    subtitle: "The single best upgrade you can make to your solar system.",
    image: "/images/real/deriy-10kwh-battery.jpeg",
    description:
      "Still running gel or flooded lead-acid batteries? You are losing money every month. Lithium batteries last 3 to 5 times longer, charge faster, weigh less, and give you more usable capacity from the same bank size. The upgrade pays for itself within years, not decades.",
    features: [
      "Full assessment of your existing system",
      "Lithium battery sizing to match your load",
      "Safe removal and responsible disposal of old gel batteries",
      "Installation of LiFePO4 (lithium iron phosphate) battery bank",
      "Charge controller and inverter compatibility check",
      "Battery Management System (BMS) setup and testing",
      "Performance benchmark before and after upgrade",
      "Upgrade certificate and 2-year battery warranty",
    ],
    waMsg:
      "Hi LumaGrid, I want to upgrade my gel batteries to lithium. Please tell me more.",
    imagePlaceholder: {
      label: "Battery upgrade photo",
      hint: "Side-by-side comparison of gel batteries and new lithium battery bank",
      aspect: "4/3",
    },
    accent: "Most upgrades completed in a single day",
    highlight: true,
  },
];

// ─── Comparison table data ───────────────────────────────────────────────────
const batteryCompare = [
  { feature: "Typical lifespan", gel: "2 to 4 years", lithium: "8 to 15 years" },
  { feature: "Usable capacity", gel: "~50% of rated", lithium: "~95% of rated" },
  { feature: "Charge speed", gel: "Slow (8 to 12 hrs)", lithium: "Fast (2 to 4 hrs)" },
  { feature: "Depth of discharge", gel: "50%", lithium: "95%" },
  { feature: "Efficiency", gel: "70 to 80%", lithium: "95 to 98%" },
  { feature: "Maintenance required", gel: "Yes", lithium: "None" },
  { feature: "Heat tolerance (Nigeria)", gel: "Poor", lithium: "Good" },
  { feature: "Weight", gel: "Very heavy", lithium: "60% lighter" },
];

// ─── Process steps ────────────────────────────────────────────────────────────
const process = [
  {
    step: "01",
    title: "Free Consultation",
    body: "Tell us what you need. We discuss your power requirements, budget, and location over WhatsApp, phone, or in person.",
  },
  {
    step: "02",
    title: "Site Survey",
    body: "Our engineers visit your property to assess roof space, shading, load requirements, and existing wiring before designing your system.",
  },
  {
    step: "03",
    title: "Proposal & Quote",
    body: "You receive a detailed written proposal with system specs, equipment list, timeline, and a clear fixed price. No hidden costs.",
  },
  {
    step: "04",
    title: "Installation",
    body: "Our certified team installs your system to the highest safety standards. Most residential jobs are completed in 1 to 2 days.",
  },
  {
    step: "05",
    title: "Testing & Handover",
    body: "We test every component under load, walk you through your new system, and hand over all documentation and warranties.",
  },
  {
    step: "06",
    title: "Ongoing Support",
    body: "We do not disappear after installation. Reach us any time for support, maintenance, or system expansions.",
  },
];

// ─── FAQ data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How long does a residential solar installation take?",
    a: "Most home installations in Port Harcourt and across Rivers State take 1 to 2 working days, depending on system size and roof type. We give you a clear timeline in your proposal.",
  },
  {
    q: "What areas do you cover?",
    a: "We install and service solar systems across Rivers State (including Port Harcourt, Obio-Akpor, Eleme, Bonny), Delta State (Warri, Asaba, Sapele), and Bayelsa State (Yenagoa, Brass). Contact us for other locations.",
  },
  {
    q: "Is lithium really worth the upgrade from gel batteries?",
    a: "Yes, for most customers in Nigeria's climate it is. Gel batteries typically last 2 to 3 years in our heat and with frequent deep cycling. LiFePO4 lithium batteries routinely last 8 to 12 years, give you nearly double the usable capacity, and require zero maintenance. The upfront cost is higher but the total cost of ownership is much lower.",
  },
  {
    q: "Do you handle both off-grid and grid-tied systems?",
    a: "Yes. We install hybrid systems that use solar as the primary source, battery storage for nights and outages, and PHCN grid as backup, as well as fully off-grid systems for locations without grid access.",
  },
  {
    q: "What brands of equipment do you use?",
    a: "We work with proven, warranty-backed brands for panels, inverters, and batteries. We discuss the best options for your budget during your free consultation.",
  },
  {
    q: "Can you service a system installed by another company?",
    a: "Yes. We service and maintain all brands and configurations. If you have an existing system that is underperforming or needs repairs, contact us for a diagnostic visit.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const { isMobile, isSmall } = useBreakpoint();

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Navbar isMobile={isMobile} />
      <FAQSchema
        faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          background:
            "linear-gradient(160deg, var(--green) 0%, var(--green-mid) 100%)",
          paddingTop: isMobile ? "5rem" : "7rem",
          paddingBottom: isMobile ? "4rem" : "6rem",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative circles */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "-120px",
            right: "-100px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "rgba(0,192,106,0.12)",
            pointerEvents: "none",
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <span
              className="tag"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                marginBottom: "1.25rem",
                display: "inline-block",
              }}
            >
              Solar Services — Rivers, Delta & Bayelsa States
            </span>

            <h1
              className="brig"
              style={{
                fontSize: isMobile ? "2rem" : "3rem",
                fontWeight: 800,
                lineHeight: 1.15,
                maxWidth: "720px",
                marginBottom: "1.25rem",
              }}
            >
              Solar Installation, Maintenance & Battery Upgrades in Nigeria
            </h1>

            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.15rem",
                maxWidth: "600px",
                opacity: 0.9,
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              From first panel to full system, LumaGrid Solar handles every step.
              Residential homes, commercial buildings, routine maintenance, and
              lithium battery upgrades across the Niger Delta region.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href={waLink("Hi LumaGrid, I'd like to get a free solar quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                <WhatsAppIcon size={18} />
                Get a Free Quote
              </a>
              <a href="#services" className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}>
                See All Services
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--green-xl)",
          borderBottom: "1px solid var(--border)",
          padding: "1.25rem 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: isMobile ? "0.75rem 1.5rem" : "0 3rem",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "center",
          }}
        >
          {[
            "Licensed solar engineers",
            "Free site surveys",
            "All installations warranted",
            "Rivers, Delta & Bayelsa coverage",
            "Lithium battery specialists",
          ].map((item) => (
            <span
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.875rem",
                color: "var(--green)",
                fontWeight: 600,
              }}
            >
              <CheckIcon size={14} />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── SERVICE SECTIONS ─────────────────────────────────────────── */}
      <div id="services">
        {services.map((svc, i) => {
          const isEven = i % 2 === 0;
          const bg = svc.highlight
            ? "linear-gradient(135deg, var(--green) 0%, var(--green-mid) 100%)"
            : isEven
              ? "#fff"
              : "var(--green-xl)";
          const textColor = svc.highlight ? "#fff" : "inherit";
          const mutedColor = svc.highlight ? "rgba(255,255,255,0.75)" : "var(--muted)";
          const featureIconColor = svc.highlight ? "var(--accent)" : "var(--green)";
          const tagStyle = svc.highlight
            ? { background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }
            : {};

          return (
            <section
              key={svc.id}
              id={svc.id}
              className="section"
              style={{ background: bg, color: textColor, position: "relative", overflow: "hidden" }}
            >
              {svc.highlight && (
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "-100px",
                    right: "-80px",
                    width: "380px",
                    height: "380px",
                    borderRadius: "50%",
                    background: "rgba(0,192,106,0.1)",
                    pointerEvents: "none",
                  }}
                />
              )}

              <div className="container">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "2rem" : "4rem",
                    alignItems: "center",
                    direction: !isMobile && !isEven ? "rtl" : "ltr",
                  }}
                >
                  {/* Text side */}
                  <FadeIn style={{ direction: "ltr" }}>
                    <span className="tag" style={tagStyle}>
                      {svc.tag}
                    </span>

                    <h2
                      className="brig"
                      style={{
                        fontSize: isMobile ? "1.6rem" : "2.1rem",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        margin: "0.75rem 0 0.5rem",
                      }}
                    >
                      {svc.title}
                    </h2>

                    <p
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        marginBottom: "0.75rem",
                        color: svc.highlight ? "var(--accent)" : "var(--green-mid)",
                      }}
                    >
                      {svc.subtitle}
                    </p>

                    <p
                      style={{
                        color: mutedColor,
                        lineHeight: 1.75,
                        marginBottom: "1.5rem",
                        fontSize: "0.975rem",
                      }}
                    >
                      {svc.description}
                    </p>

                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 1.75rem",
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: "0.5rem 1rem",
                      }}
                    >
                      {svc.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: 1.5,
                          }}
                        >
                          <CheckIcon
                            size={14}
                            style={{ marginTop: "3px", flexShrink: 0, color: featureIconColor }}
                          />
                          <span style={{ color: textColor === "#fff" ? "rgba(255,255,255,0.9)" : "inherit" }}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: svc.highlight ? "rgba(255,255,255,0.6)" : "var(--muted)",
                        marginBottom: "1.25rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {svc.accent}
                    </p>

                    <a
                      href={waLink(svc.waMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wa"
                    >
                      <WhatsAppIcon size={16} />
                      Enquire About This Service
                    </a>
                  </FadeIn>

                  {/* Image placeholder side */}
                  <FadeIn delay={0.1} style={{ direction: "ltr" }}>
                    <InstallPhoto
                      src={svc.image}
                      alt={svc.imagePlaceholder.label}
                      style={{
                        borderRadius: 16,
                        height: 340,
                        boxShadow: svc.highlight
                          ? "0 24px 64px rgba(0,0,0,0.25)"
                          : "0 16px 48px rgba(13,92,58,0.15)",
                      }}
                    />
                  </FadeIn>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── BATTERY UPGRADE COMPARISON TABLE ─────────────────────────── */}
      <section
        className="section"
        style={{ background: "var(--green-xl)", borderTop: "1px solid var(--border)" }}
      >
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="Why Upgrade"
              title="Gel Batteries vs Lithium Batteries"
              subtitle="If your solar system is still running on gel or lead-acid batteries, this comparison explains why an upgrade is one of the best investments you can make."
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              style={{
                overflowX: "auto",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                marginTop: "2rem",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                  background: "#fff",
                }}
              >
                <thead>
                  <tr style={{ background: "var(--green)" }}>
                    <th
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        width: "38%",
                      }}
                    >
                      Feature
                    </th>
                    <th
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        width: "31%",
                      }}
                    >
                      Gel / Lead-Acid
                    </th>
                    <th
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        color: "var(--accent)",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        width: "31%",
                      }}
                    >
                      Lithium (LiFePO4)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {batteryCompare.map((row, idx) => (
                    <tr
                      key={row.feature}
                      style={{
                        background: idx % 2 === 0 ? "#fff" : "var(--green-xl)",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.875rem 1.25rem",
                          fontWeight: 600,
                          color: "var(--green)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {row.feature}
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1.25rem",
                          color: "var(--muted)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {row.gel}
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1.25rem",
                          fontWeight: 700,
                          color: "var(--green-mid)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {row.lithium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <a
                href={waLink(
                  "Hi LumaGrid, I'd like to know more about upgrading my gel batteries to lithium."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                <WhatsAppIcon size={16} />
                Ask About Battery Upgrade Pricing
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── OUR PROCESS ──────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="How It Works"
              title="Our Installation Process"
              subtitle="Simple, transparent, and built around your schedule. Here is exactly what to expect when you work with LumaGrid."
            />
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "1.5rem",
              marginTop: "2.5rem",
            }}
          >
            {process.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.06}>
                <div
                  className="card-hover"
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "1.75rem",
                    background: "#fff",
                    height: "100%",
                  }}
                >
                  <span
                    className="brig"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      color: "var(--green-light)",
                      lineHeight: 1,
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {step.step}
                  </span>
                  <h3
                    className="brig"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                      color: "var(--green)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.65 }}>
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY PLACEHOLDER ────────────────────────────────── 
      <section
        className="section"
        style={{ background: "var(--green-xl)", borderTop: "1px solid var(--border)" }}
      >
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="Our Work"
              title="Recent Installations"
              subtitle="Solar systems we have installed across Rivers State, Delta State and Bayelsa State."
            />
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : isSmall
                  ? "repeat(3, 1fr)"
                  : "repeat(4, 1fr)",
              gap: "0.75rem",
              marginTop: "2rem",
            }}
          >
            {[
              "Residential rooftop install, Port Harcourt",
              "Commercial array, Warri",
              "Lithium battery bank installation",
              "Off-grid system, Bayelsa",
              "Panel mounting, GRA Port Harcourt",
              "Inverter room setup",
              "Maintenance visit, Delta State",
              "Estate solar project",
            ].map((label, i) => (
              <FadeIn key={label} delay={i * 0.04}>
                <div
                  style={{
                    aspectRatio: "4/3",
                    borderRadius: "10px",
                    background: "var(--green-light)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  / PLACEHOLDER: Replace with <InstallPhoto> component 
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--green-mid)"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      */}

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <FadeIn>
            <SectionHeader
              tag="Common Questions"
              title="Frequently Asked Questions"
              subtitle="Questions about solar installation, maintenance, and battery upgrades in Nigeria."
            />
          </FadeIn>

          <div
            style={{
              maxWidth: "780px",
              margin: "2.5rem auto 0",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.05}>
                <details
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    background: "var(--green-xl)",
                    overflow: "hidden",
                  }}
                >
                  <summary
                    style={{
                      padding: "1.1rem 1.25rem",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      color: "var(--green)",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {faq.q}
                    <span
                      aria-hidden
                      style={{
                        fontSize: "1.2rem",
                        color: "var(--accent)",
                        flexShrink: 0,
                        marginLeft: "1rem",
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    style={{
                      padding: "0 1.25rem 1.1rem",
                      color: "var(--muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {faq.a}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, var(--green) 0%, var(--green-mid) 100%)",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(0,192,106,0.08)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <span
              className="tag"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                marginBottom: "1.25rem",
                display: "inline-block",
              }}
            >
              Free Quote, No Obligation
            </span>
            <h2
              className="brig"
              style={{
                fontSize: isMobile ? "1.75rem" : "2.5rem",
                fontWeight: 800,
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}
            >
              Ready to go solar? Let us talk.
            </h2>
            <p
              style={{
                maxWidth: "520px",
                margin: "0 auto 2rem",
                opacity: 0.88,
                lineHeight: 1.7,
                fontSize: "1rem",
              }}
            >
              Whether you want a brand new installation, a system service, or a
              battery upgrade, our team is available now on WhatsApp. Response
              within the hour during business hours.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <a
                href={waLink("Hi LumaGrid, I'd like to discuss a solar project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
                style={{ fontSize: "1rem", padding: "0.9rem 1.75rem" }}
              >
                <WhatsAppIcon size={20} />
                Chat With Us on WhatsApp
              </a>
              <a
                href="tel:+2347059497792"
                className="btn-outline"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}
              >
                Call Us Directly
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STRUCTURED DATA (JSON-LD) ─────────────────────────────────
           Place this in a <Script> component with strategy="afterInteractive"
           or inside a generateMetadata / layout file in production.

      <Script id="services-schema" type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "LumaGrid Solar",
          "url": "https://lumagridsolar.com",
          "telephone": "+2347059497792",
          "areaServed": ["Rivers State", "Delta State", "Bayelsa State"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Solar Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Solar Installation" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Solar Installation" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Solar System Maintenance" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gel to Lithium Battery Upgrade" } }
            ]
          }
        }
      `}</Script>
      ─────────────────────────────────────────────────────────────── */}

      <Footer isMobile={isMobile} isSmall={isSmall} />
    </>
  );
}
