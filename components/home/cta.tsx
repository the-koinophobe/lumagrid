"use client";

import { TESTIMONIALS, WHATSAPP_URL, GBP_REVIEW_URL } from "@/lib/constants";
import { FadeIn, Stars, GoogleIcon, WhatsAppIcon } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";

// ── Testimonials ──────────────────────────────────────────────────────────────

export function Testimonials() {
  return (
    <section className="section" style={{ background: "var(--paper)" }}>
      <div className="container">
        <FadeIn>
          <span className="tag">Client reviews</span>
          <h2 className="brig section-title">What our customers say.</h2>
          <div className="divider" />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
            <Stars count={5} />
            <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>
              5.0 on Google · Verified reviews
            </span>
            <a
              href={GBP_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, fontWeight: 600, textDecoration: "underline", minHeight: 40, display: "inline-flex", alignItems: "center" }}
            >
              Leave a review
            </a>
          </div>
        </FadeIn>

        <div className="auto-2">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="card-hover"
                style={{
                  padding: 26,
                  border: "1.5px solid var(--border)",
                  borderRadius: 12,
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  height: "100%",
                }}
              >
                <Stars count={t.stars} />
                <p style={{ fontSize: 14.5, lineHeight: 1.8, flexGrow: 1 }}>&ldquo;{t.text}&rdquo;</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 14,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    {t.location && (
                      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{t.location}</div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <GoogleIcon />
                    <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>Google</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA — lime panel on ink, per the brand template ────────────────────

export function FinalCta() {
  return (
    <section style={{ background: "var(--ink)", padding: "56px 20px" }}>
      <div className="container">
        <FadeIn>
          <div
            style={{
              background: "var(--lime)",
              borderRadius: 16,
              padding: "40px 24px",
              textAlign: "center",
            }}
          >
            <h2
              className="brig"
              style={{
                fontSize: "clamp(26px, 6.5vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                marginBottom: 14,
              }}
            >
              Ready to stop buying petrol?
            </h2>
            <p
              style={{
                fontSize: "var(--step-lead)",
                color: "rgba(8,21,15,0.72)",
                maxWidth: 480,
                margin: "0 auto 26px",
                lineHeight: 1.7,
              }}
            >
              Message us on WhatsApp. We schedule a free site visit, assess your
              load, and send an itemised proposal — every naira accounted for.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink"
                style={{ fontSize: 16, padding: "15px 28px" }}
              >
                <WhatsAppIcon size={19} /> Get my free assessment
              </a>
              <a
                href="#calculator"
                className="btn-outline"
                style={{ fontSize: 16, padding: "14px 26px" }}
              >
                Run the numbers first <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
