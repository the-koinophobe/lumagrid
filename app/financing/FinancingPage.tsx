"use client";

import { useState, useMemo } from "react";
import { useBreakpoint } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppIcon, FadeIn, SectionHeader } from "@/components/ui";
import { WHATSAPP_URL } from "@/lib/constants";

// Rivy partner config
const RIVY_APPLY_URL = "https://app.rivy.co/signup";
const RIVY_SITE_URL = "https://rivy.co";
const RIVY_TERMS_URL = "https://app.rivy.co/terms";

const MIN_PROJECT = 1_000_000;
const DOWN_PAYMENT_RATE = 0.3;
const MONTHLY_INTEREST_RATE = 0.04; // 4% of total principal per month

function formatNaira(value: number) {
  return "₦" + Math.round(value).toLocaleString("en-NG");
}

// Rivy logo as inline SVG text (no external image dependency)
function RivyBadge() {
  return (
    <a
      href={RIVY_SITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        textDecoration: "none",
        padding: "0.35rem 0.75rem",
        borderRadius: "2rem",
        border: "1.5px solid var(--border)",
        background: "#fff",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--muted)",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <span style={{ opacity: 0.6, fontSize: "0.7rem" }}>Financing by</span>
      <span
        className="brig"
        style={{ color: "#0d5c3a", fontSize: "0.85rem", letterSpacing: "-0.01em" }}
      >
        Rivy
      </span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5 }}>
        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function FinancingCalculator() {
  const [projectCost, setProjectCost] = useState<string>("1500000");
  const [tenure, setTenure] = useState<number>(6);

  const cost = parseFloat(projectCost.replace(/,/g, "")) || 0;
  const eligible = cost >= MIN_PROJECT;

  const calc = useMemo(() => {
    if (!eligible || cost <= 0) return null;

    const downPayment = cost * DOWN_PAYMENT_RATE;
    const financed = cost - downPayment;
    const monthlyInterest = cost * MONTHLY_INTEREST_RATE;
    const totalInterest = monthlyInterest * tenure;
    const totalRepayment = financed + totalInterest;
    const monthlyPayment = totalRepayment / tenure;
    const totalCost = downPayment + totalRepayment;

    return { downPayment, financed, monthlyInterest, totalInterest, monthlyPayment, totalRepayment, totalCost };
  }, [cost, tenure, eligible]);

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setProjectCost(raw);
  };

  const waMessage = calc
    ? encodeURIComponent(
        `Hello LumaGrid Solar, I'm interested in your financing plan.\n\nProject Cost: ${formatNaira(cost)}\nDown Payment: ${formatNaira(calc.downPayment)}\nTenure: ${tenure} months\nMonthly Payment: ${formatNaira(calc.monthlyPayment)}\n\nPlease contact me to get started.`
      )
    : "";

  return (
    <section className="section" style={{ background: "var(--green-xl)" }}>
      <div className="container">
        <FadeIn>
          {/* Header with Rivy badge */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
            <SectionHeader
              tag="Solar Financing"
              title="Own solar on your own terms"
              subtitle="Spread the cost of your system over up to 18 months. Available for projects from ₦1,000,000 and above."
            />
            <div style={{ paddingTop: "0.25rem" }}>
              <RivyBadge />
            </div>
          </div>
        </FadeIn>

        {/* Rivy partner notice */}
        <FadeIn delay={0.05}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.9rem 1.25rem",
              background: "#fff",
              border: "1px solid var(--border)",
              borderLeft: "3px solid var(--accent)",
              borderRadius: "0.6rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: "var(--green-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "1rem",
              }}
            >
              🤝
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, flex: 1 }}>
              Financing is provided by{" "}
              <a href={RIVY_SITE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)", fontWeight: 700, textDecoration: "none" }}>
                Rivy
              </a>
              , a clean energy fintech backed by Y Combinator. LumaGrid Solar is an authorised Rivy installer partner.{" "}
              <a href={RIVY_TERMS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green-mid)", textDecoration: "underline" }}>
                Terms and conditions apply.
              </a>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
            className="calc-grid"
          >
            {/* Left: Inputs */}
            <div
              className="card-hover"
              style={{
                background: "#fff",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 className="brig" style={{ fontSize: "1.15rem", color: "var(--green)", marginBottom: "1.75rem" }}>
                Configure your plan
              </h3>

              {/* Project Cost Input */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                  Project Cost (₦)
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--green)", fontWeight: 700, fontSize: "1rem" }}>
                    ₦
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={projectCost ? Number(projectCost).toLocaleString("en-NG") : ""}
                    onChange={handleCostChange}
                    placeholder="1,000,000"
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem 0.85rem 2.25rem",
                      border: `1.5px solid ${eligible || !cost ? "var(--border)" : "#e74c3c"}`,
                      borderRadius: "0.6rem",
                      fontSize: "1rem",
                      color: "#1a2e24",
                      outline: "none",
                      fontFamily: "var(--font-chivo)",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = eligible || !cost ? "var(--border)" : "#e74c3c")}
                  />
                </div>
                {cost > 0 && !eligible && (
                  <p style={{ fontSize: "0.8rem", color: "#e74c3c", marginTop: "0.4rem" }}>
                    Minimum project cost for financing is ₦1,000,000
                  </p>
                )}
              </div>

              {/* Tenure Slider */}
              <div>
                <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                  <span>Repayment Tenure</span>
                  <span className="brig" style={{ color: "var(--green)", fontSize: "0.95rem", textTransform: "none", letterSpacing: 0 }}>
                    {tenure} month{tenure !== 1 ? "s" : ""}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={18}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent)" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                  <span>1 month</span>
                  <span>18 months</span>
                </div>
              </div>

              {/* Quick select tenure buttons */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                {[3, 6, 9, 12, 18].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenure(m)}
                    style={{
                      padding: "0.35rem 0.85rem",
                      borderRadius: "2rem",
                      border: `1.5px solid ${tenure === m ? "var(--accent)" : "var(--border)"}`,
                      background: tenure === m ? "var(--accent)" : "transparent",
                      color: tenure === m ? "#fff" : "var(--muted)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {m}mo
                  </button>
                ))}
              </div>

              {/* Key terms */}
              <div style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
                <div style={{ padding: "1rem", background: "var(--green-light)", borderRadius: "0.6rem", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.7 }}>
                  <strong style={{ color: "var(--green)", display: "block", marginBottom: "0.4rem" }}>
                    Financing terms
                  </strong>
                  30% down payment required upfront. Monthly interest is fixed at 4% of the project cost. All payments must be completed within the agreed tenure. Terms and conditions apply.
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {!eligible ? (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "1rem",
                    padding: "2.5rem 2rem",
                    border: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    flex: 1,
                  }}
                >
                  <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
                    ☀️
                  </div>
                  <p className="brig" style={{ color: "var(--green)", fontSize: "1rem" }}>
                    Enter a project cost of ₦1,000,000 or more to see your financing breakdown
                  </p>
                </div>
              ) : (
                <>
                  {/* Main monthly payment card */}
                  <div style={{ background: "var(--green)", borderRadius: "1rem", padding: "1.75rem 2rem", color: "#fff" }}>
                    <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.07em", opacity: 0.75, marginBottom: "0.4rem" }}>
                      Monthly payment
                    </p>
                    <p className="brig" style={{ fontSize: "2.25rem", lineHeight: 1, marginBottom: "0.25rem" }}>
                      {calc && formatNaira(calc.monthlyPayment)}
                    </p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                      for {tenure} month{tenure !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid var(--border)", overflow: "hidden" }}>
                    {[
                      { label: "Down payment (30%)", value: calc && formatNaira(calc.downPayment), note: "Due before installation", accent: false },
                      { label: "Amount financed (70%)", value: calc && formatNaira(calc.financed), note: "Principal spread over tenure", accent: false },
                      { label: "Monthly interest (4%)", value: calc && formatNaira(calc.monthlyInterest), note: "Fixed, based on total project cost", accent: false },
                      { label: "Total repayment", value: calc && formatNaira(calc.totalRepayment), note: `Principal + interest over ${tenure} months`, accent: true },
                    ].map((row, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.9rem 1.25rem",
                          borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                          background: row.accent ? "var(--green-light)" : "transparent",
                        }}
                      >
                        <div>
                          <p style={{ fontSize: "0.85rem", fontWeight: row.accent ? 700 : 500, color: row.accent ? "var(--green)" : "#1a2e24" }}>
                            {row.label}
                          </p>
                          <p style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{row.note}</p>
                        </div>
                        <p className="brig" style={{ fontSize: row.accent ? "1rem" : "0.95rem", color: row.accent ? "var(--green)" : "#1a2e24" }}>
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Dual CTAs */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {/* Primary: Apply via Rivy */}
                    <a
                      href={RIVY_APPLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.6rem",
                        textDecoration: "none",
                        borderRadius: "0.6rem",
                        padding: "0.9rem 1.5rem",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        background: "var(--green)",
                        color: "#fff",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-mid)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green)")}
                    >
                      Apply via Rivy
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>

                    {/* Secondary: WhatsApp */}
                    <a
                      href={`https://wa.me/2347059497792?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wa"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.6rem",
                        textDecoration: "none",
                        borderRadius: "0.6rem",
                        padding: "0.9rem 1.5rem",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                      }}
                    >
                      <WhatsAppIcon size={18} />
                      Ask us on WhatsApp
                    </a>
                  </div>

                  {/* T&C footnote */}
                  <p style={{ fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.6, textAlign: "center" }}>
                    Figures are estimates for planning purposes only. Final terms are subject to Rivy's credit assessment.{" "}
                    <a href={RIVY_TERMS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green-mid)", textDecoration: "underline" }}>
                      Terms and conditions apply.
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </FadeIn>

        {/* How it works with Rivy */}
        <FadeIn delay={0.15}>
          <div style={{ marginTop: "3.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <h3 className="brig" style={{ fontSize: "1.1rem", color: "var(--green)" }}>
                How financing works
              </h3>
              <div style={{ height: "1px", flex: 1, background: "var(--border)" }} />
              <RivyBadge />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }} className="steps-grid">
              {[
                {
                  step: "01",
                  title: "Apply on Rivy",
                  body: "Sign up and submit your application on the Rivy app. Takes just a few minutes.",
                  icon: "📱",
                },
                {
                  step: "02",
                  title: "Get approved",
                  body: "Check your eligibility and receive a financing offer within 30 minutes.",
                  icon: "✅",
                },
                {
                  step: "03",
                  title: "We install",
                  body: "Loan is disbursed within 12 hours and LumaGrid Solar gets your system installed.",
                  icon: "⚡",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  style={{
                    background: "#fff",
                    borderRadius: "0.9rem",
                    padding: "1.5rem",
                    border: "1px solid var(--border)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span
                    className="brig"
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1.25rem",
                      fontSize: "1.75rem",
                      color: "var(--green-light)",
                      lineHeight: 1,
                    }}
                  >
                    {s.step}
                  </span>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                  <p className="brig" style={{ fontSize: "0.95rem", color: "var(--green)", marginBottom: "0.4rem" }}>
                    {s.title}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export default function FinancingPage() {
  const { isMobile, isSmall } = useBreakpoint();

  return (
    <>
      <Navbar isMobile={isMobile} />

      {/* Hero */}
      <section
        className="section"
        style={{
          background: "var(--green)",
          paddingTop: isMobile ? "6rem" : "8rem",
          paddingBottom: isMobile ? "3rem" : "4rem",
          color: "#fff",
        }}
      >
        <div className="container">
          <FadeIn>
            <span
              className="tag"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", marginBottom: "1rem" }}
            >
              Solar Financing
            </span>
            <h1
              className="brig"
              style={{
                fontSize: isMobile ? "2rem" : "3rem",
                lineHeight: 1.15,
                maxWidth: "640px",
                marginBottom: "1rem",
              }}
            >
              Go solar today. Pay over time.
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                opacity: 0.85,
                maxWidth: "520px",
                lineHeight: 1.7,
              }}
            >
              LumaGrid Solar financing lets you spread the cost of your system across up to 18 months.
              No banks, no stress. Just solar power working for you from day one.
            </p>
          </FadeIn>
        </div>
      </section>

      <FinancingCalculator />

      <Footer isMobile={isMobile} isSmall={isSmall} />
    </>
  );
}