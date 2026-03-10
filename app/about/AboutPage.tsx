"use client";

import { useBreakpoint } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WHATSAPP_URL } from "@/lib/constants";
import { FadeIn, SectionHeader, WhatsAppIcon, Check } from "@/components/ui";

// ─── Data ────────────────────────────────────────────────────────────────────

const MISSION_VALUES = [
  {
    icon: "⚡",
    title: "Energy Independence",
    body: "We exist to cut every home and business loose from a grid that was never built to serve them. Your power should come from the sun, not NEPA.",
  },
  {
    icon: "🤝",
    title: "Honest Work",
    body: "No inflated quotes. No hidden markups. You get a clear breakdown of what you're paying for and exactly what you'll get in return.",
  },
  {
    icon: "🛠️",
    title: "Quality That Lasts",
    body: "We install systems we'd put in our own homes. Tier-1 panels, certified inverters, and workmanship that holds up through harmattan and rainy season alike.",
  },
  {
    icon: "📍",
    title: "Built for This Region",
    body: "We know the Niger Delta. We understand the load demands, the weather patterns, and the voltage swings that generic installers overlook.",
  },
];

const WHY_ITEMS = [
  "Site assessment before every quote — no guesswork",
  "Certified installation teams, not subcontracted labour",
  "Post-installation support and system monitoring",
  "Warranties on panels, inverters, and batteries",
  "Transparent pricing with itemised breakdowns",
  "Coverage across Rivers, Delta, and Bayelsa States",
];

const COVERAGE = [
  { name: "Rivers State", sub: "Port Harcourt & surroundings", top: "20%", left: "42%" },
  { name: "Delta State", sub: "Asaba, Warri & beyond", top: "12%", left: "28%" },
  { name: "Bayelsa State", sub: "Yenagoa & communities", top: "38%", left: "34%" },
];

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, var(--green) 0%, #0a4029 60%, #072b1c 100%)",
        paddingTop: isMobile ? "100px" : "120px",
        paddingBottom: isMobile ? "64px" : "96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,192,106,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,192,106,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(0,192,106,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <FadeIn>
          <span
            className="tag"
            style={{
              background: "rgba(0,192,106,0.15)",
              color: "var(--accent)",
              border: "1px solid rgba(0,192,106,0.3)",
              marginBottom: "24px",
              display: "inline-block",
            }}
          >
            Who We Are
          </span>
          <h1
            className="brig"
            style={{
              fontSize: isMobile ? "clamp(2rem, 8vw, 2.8rem)" : "clamp(2.8rem, 5vw, 4rem)",
              color: "#fff",
              lineHeight: 1.15,
              maxWidth: "700px",
              marginBottom: "24px",
            }}
          >
            We got tired of waiting for light that never comes.
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: isMobile ? "1rem" : "1.15rem",
              maxWidth: "560px",
              lineHeight: 1.7,
            }}
          >
            LumaGrid Solar was founded in the Niger Delta by people who lived the power problem firsthand.
            We do not sell hope. We install reliable solar energy systems that put you in control of your own power.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function StorySection({ isMobile }: { isMobile: boolean }) {
  const newsItems = [
    {
      label: "Instablog9ja",
      text: "Power generation drops to 3,940MW as plants shut down amid gas supply crisis.",
    },
    {
      label: "Nigeria National Grid",
      text: "\"THE POWER GENERATION HAS DEGRADED EVEN MORE!\"",
    },
    {
      label: "Nairametrics",
      text: "Nigeria's power grid faces shutdowns as majority of plants stay offline.",
    },
  ];

  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "48px" : "80px",
            alignItems: "start",
          }}
        >
          {/* Left: Story copy */}
          <FadeIn>
            <span className="tag" style={{ marginBottom: "20px", display: "inline-block" }}>
              Our Story
            </span>
            <h2
              className="brig section-title"
              style={{ marginBottom: "24px", textAlign: "left" }}
            >
              The grid failed us all. We chose to do something about it.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Every Nigerian knows the routine. You plan your day around when light might come.
                You buy fuel for a generator that eats money and chokes your lungs. You wait on NEPA
                apologies that explain nothing and fix nothing.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                The founders of LumaGrid Solar grew up in that same reality. Rivers State. Generators
                humming through the night. Businesses losing stock to heat. Children studying by
                candlelight. Not because resources were scarce, but because the system was broken beyond
                repair.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                So we stopped waiting. LumaGrid Solar was built to offer something different: a
                permanent exit from grid dependency. Real solar infrastructure designed, supplied, and
                installed by people who understand this region and actually care about what happens
                after the job is done.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                The grid has only gotten worse since we started. That is not a talking point. It is the
                news every week. Which is exactly why what we do matters more now than ever.
              </p>
            </div>
          </FadeIn>

          {/* Right: News cards */}
          <FadeIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* NEPA meme card */}
              <div
                style={{
                  background: "#111",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  color: "#fff",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at top left, rgba(255,180,0,0.08), transparent 60%)",
                  }}
                />
                <p
                  className="brig"
                  style={{ fontSize: "1.05rem", lineHeight: 1.5, position: "relative", zIndex: 1 }}
                >
                  <span style={{ color: "#f5a623" }}>In 2015,</span> Nigerians marched to NEPA offices
                  demanding electricity after 2 months without light. When they arrived, NEPA's own{" "}
                  <span style={{ color: "#f5a623" }}>generator</span> was on.
                </p>
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.4)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  A story every Nigerian has lived in some form.
                </p>
              </div>

              {/* News items */}
              {newsItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--green-xl)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "18px 20px",
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      marginTop: "6px",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--green-mid)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "var(--green)", lineHeight: 1.5 }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  textAlign: "center",
                  paddingTop: "4px",
                }}
              >
                March 2026. This is the grid Nigerians are still being asked to rely on.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function MissionSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section className="section" style={{ background: "var(--green-xl)" }}>
      <div className="container">
        <FadeIn>
          <SectionHeader
            tag="Mission & Values"
            title="What we stand for"
            subtitle="We are not just selling solar panels. We are selling a way out of a broken system. These are the principles that guide every installation we do."
          />
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "20px",
            marginTop: "48px",
          }}
        >
          {MISSION_VALUES.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="card-hover"
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "28px",
                  border: "1px solid var(--border)",
                  height: "100%",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "14px" }}>{item.icon}</div>
                <h3
                  className="brig"
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--green)",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "48px" : "80px",
            alignItems: "center",
          }}
        >
          <FadeIn>
            <span className="tag" style={{ marginBottom: "20px", display: "inline-block" }}>
              Why Choose Us
            </span>
            <h2 className="brig section-title" style={{ textAlign: "left", marginBottom: "16px" }}>
              We do not cut corners. And we do not disappear after installation.
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: "32px" }}>
              Plenty of people will sell you solar in Port Harcourt. Not all of them will still pick
              up your call six months later. We built LumaGrid Solar on the standard we wish existed
              when we were looking for someone to trust.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {WHY_ITEMS.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <Check />
                  <p style={{ color: "#2d3d35", lineHeight: 1.6, fontSize: "0.95rem" }}>{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              style={{
                background: "linear-gradient(145deg, var(--green) 0%, #0a4029 100%)",
                borderRadius: "20px",
                padding: isMobile ? "36px 28px" : "48px 40px",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "-40px",
                  right: "-40px",
                  width: "200px",
                  height: "200px",
                  background: "radial-gradient(circle, rgba(0,192,106,0.2), transparent 70%)",
                }}
              />
              <p
                className="brig"
                style={{
                  fontSize: isMobile ? "1.5rem" : "1.75rem",
                  lineHeight: 1.3,
                  marginBottom: "20px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                "The sun rises every day in the Niger Delta. That energy belongs to you."
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.9rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                LumaGrid Solar, Rivers State
              </p>

              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "28px",
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {[
                  { label: "Homes & Businesses Served", value: "Growing" },
                  { label: "States Covered", value: "3" },
                  { label: "After-Sales Support", value: "Ongoing" },
                  { label: "Grid Dependency", value: "Zero" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p
                      className="brig"
                      style={{ fontSize: "1.4rem", color: "var(--accent)", marginBottom: "4px" }}
                    >
                      {stat.value}
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function CoverageSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section className="section" style={{ background: "var(--green-xl)" }}>
      <div className="container">
        <FadeIn>
          <SectionHeader
            tag="Coverage Area"
            title="Serving the Niger Delta"
            subtitle="We operate across three states in the Niger Delta region, with local teams who know the terrain and understand what reliable solar installation looks like in your area."
          />
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "48px",
          }}
        >
          {COVERAGE.map((area, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="card-hover"
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  border: "1px solid var(--border)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "var(--green-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: "1.5rem",
                  }}
                >
                  📍
                </div>
                <h3 className="brig" style={{ fontSize: "1.15rem", color: "var(--green)", marginBottom: "8px" }}>
                  {area.name}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{area.sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p
            style={{
              textAlign: "center",
              marginTop: "32px",
              color: "var(--muted)",
              fontSize: "0.9rem",
            }}
          >
            Not sure if we cover your area? Message us on WhatsApp and we will confirm within minutes.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function CTASection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      className="section"
      style={{
        background: "linear-gradient(135deg, var(--green) 0%, #0a4029 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,192,106,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,192,106,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <FadeIn>
          <span
            className="tag"
            style={{
              background: "rgba(0,192,106,0.15)",
              color: "var(--accent)",
              border: "1px solid rgba(0,192,106,0.3)",
              marginBottom: "24px",
              display: "inline-block",
            }}
          >
            Get Started
          </span>
          <h2
            className="brig"
            style={{
              fontSize: isMobile ? "1.9rem" : "2.6rem",
              color: "#fff",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Ready to leave the grid behind?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: isMobile ? "1rem" : "1.1rem",
              maxWidth: "500px",
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            Talk to our team today. We will assess your needs, explain your options, and give you a
            clear quote with no pressure and no hidden fees.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "1rem",
            }}
          >
            <WhatsAppIcon size={20} />
            Chat With Us on WhatsApp
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const { isMobile, isSmall } = useBreakpoint();

  return (
    <>
      <Navbar isMobile={isMobile} />
      <HeroSection isMobile={isMobile} />
      <StorySection isMobile={isMobile} />
      <MissionSection isMobile={isMobile} />
      <WhyUsSection isMobile={isMobile} />
      <CoverageSection isMobile={isMobile} />
      <CTASection isMobile={isMobile} />
      <Footer isMobile={isMobile} isSmall={isSmall} />
    </>
  );
}