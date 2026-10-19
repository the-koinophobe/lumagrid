"use client";

import { useBreakpoint } from "@/lib/hooks";
import { Star } from "@/components/ui/icons";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeIn } from "@/components/ui";
import QuoteForm from "@/components/quote/QuoteForm";
import WhatsAppButton from "@/components/quote/WhatsAppButton";

const CONTACT_PREFILL = { source: "Contact page form" };

// ---------------------------------------------------------------------------
// Contact channels
// ---------------------------------------------------------------------------
const CHANNELS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+234 705 949 7792",
    note: "Fastest response. Mon to Sat, during business hours",
    href: "quote",
    color: "#25D366",
    bg: "#f0fdf4",
    primary: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    label: "Facebook",
    value: "LumaGrid Solar",
    note: "Send us a message or browse our page",
    href: "https://facebook.com/lumagrid",
    color: "#1877F2",
    bg: "#eff6ff",
    primary: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Coverage area",
    value: "Rivers, Delta, Bayelsa",
    note: "We install across the Niger Delta region",
    href: null,
    color: "var(--green)",
    bg: "var(--green-light)",
    primary: false,
  },
];

// ---------------------------------------------------------------------------

function ContactForm({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1rem",
        border: "1px solid var(--border)",
        padding: isMobile ? "1.5rem" : "2rem",
      }}
    >
      <h2 className="brig" style={{ fontSize: "1.2rem", color: "var(--green)", marginBottom: "0.35rem" }}>
        Get a solar quote
      </h2>
      <p style={{ fontSize: "0.83rem", color: "var(--muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        Answer five quick questions and we will open a WhatsApp chat with your details filled in, so our
        first reply can be a real recommendation for your home or business.
      </p>
      <QuoteForm prefill={CONTACT_PREFILL} restore={false} />
    </div>
  );
}

export default function ContactPage() {
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
              Contact us
            </span>
            <h1
              className="brig"
              style={{
                fontSize: isMobile ? "2rem" : "2.75rem",
                lineHeight: 1.15,
                maxWidth: "520px",
                marginBottom: "0.75rem",
              }}
            >
              Let&apos;s talk solar
            </h1>
            <p style={{ fontSize: "1rem", opacity: 0.8, maxWidth: "440px", lineHeight: 1.7 }}>
              Whether you need a quote for your home or business, a site assessment, or after-sales support, we are here.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main */}
      <section className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {/* Left: channels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {CHANNELS.map((ch) => (
                <FadeIn key={ch.label}>
                  {ch.href === "quote" ? (
                    <WhatsAppButton
                      source="Contact page - WhatsApp card"
                      style={{ display: "block", width: "100%", background: "none", padding: 0, textAlign: "left" }}
                    >
                      <ChannelCard ch={ch} />
                    </WhatsAppButton>
                  ) : ch.href ? (
                    <a
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <ChannelCard ch={ch} />
                    </a>
                  ) : (
                    <ChannelCard ch={ch} />
                  )}
                </FadeIn>
              ))}

              {/* Google review nudge */}
              <FadeIn delay={0.1}>
                <a
                  href="https://share.google/DtTq8d4ZtcoUOQ1yH"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem 1.25rem",
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: "0.9rem",
                    textDecoration: "none",
                    transition: "box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
                >
                  <div
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      background: "#fef3c7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "var(--ink)",
                    }}
                  >
                    <Star size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="brig" style={{ fontSize: "0.88rem", color: "#1a2e24", marginBottom: "0.1rem" }}>
                      Leave us a Google review
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      Your feedback helps others choose solar
                    </p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--muted)", flexShrink: 0 }}>
                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </FadeIn>

              {/* Hours */}
              <FadeIn delay={0.15}>
                <div
                  style={{
                    padding: "1.25rem",
                    background: "var(--green-light)",
                    borderRadius: "0.9rem",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p className="brig" style={{ fontSize: "0.88rem", color: "var(--green)", marginBottom: "0.75rem" }}>
                    Business hours
                  </p>
                  {[
                    { day: "Monday to Friday", hours: "8:00am to 6:00pm" },
                    { day: "Saturday", hours: "9:00am to 4:00pm" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((row) => (
                    <div
                      key={row.day}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.8rem",
                        color: row.day === "Sunday" ? "var(--muted)" : "#1a2e24",
                        padding: "0.3rem 0",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <span>{row.day}</span>
                      <span style={{ fontWeight: 600 }}>{row.hours}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right: form */}
            <FadeIn delay={0.05}>
              <ContactForm isMobile={isMobile} />
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer isMobile={isMobile} isSmall={isSmall} />
    </>
  );
}

function ChannelCard({ ch }: { ch: (typeof CHANNELS)[number] }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1.1rem 1.25rem",
        background: ch.bg,
        border: `1px solid ${ch.primary ? ch.color + "33" : "var(--border)"}`,
        borderRadius: "0.9rem",
        transition: "box-shadow 0.15s, transform 0.15s",
        cursor: ch.href ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        if (ch.href) {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: "2.75rem",
          height: "2.75rem",
          borderRadius: "50%",
          background: ch.color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {ch.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.1rem" }}>
          {ch.label}
        </p>
        <p className="brig" style={{ fontSize: "0.95rem", color: "#1a2e24", marginBottom: "0.1rem" }}>
          {ch.value}
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{ch.note}</p>
      </div>
      {ch.href && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--muted)", flexShrink: 0 }}>
          <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}