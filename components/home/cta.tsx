import { TESTIMONIALS, WHATSAPP_URL, GBP_REVIEW_URL, FACEBOOK_URL } from "@/lib/constants";
import { FadeIn, Stars, GoogleIcon, WhatsAppIcon } from "@/components/ui";

// ── Testimonials ──────────────────────────────────────────────────────────────

export function Testimonials() {
  return (
    <section className="section" style={{ background: "var(--green-xl)" }}>
      <div className="container">
        <FadeIn>
          <span className="tag">Client Reviews</span>
          <h2 className="brig section-title">What our customers say.</h2>
          <div className="divider" />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
            <Stars count={5} />
            <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>5.0 on Google · Verified reviews</span>
            <a href={GBP_REVIEW_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--green)", fontWeight: 600, marginLeft: 8, textDecoration: "underline" }}>
              Leave a review →
            </a>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="card-hover" style={{ padding: 32, border: "1.5px solid var(--border)", borderRadius: 12, background: "white", display: "flex", flexDirection: "column", gap: 16 }}>
                <Stars count={t.stars} />
                <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.75, fontStyle: "italic", flexGrow: 1 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{t.location}</div>
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

// ── FinalCta ──────────────────────────────────────────────────────────────────

export function FinalCta({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ background: "var(--green)", padding: "96px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {[700, 460].map(s => (
        <div key={s} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: s, height: s, borderRadius: "50%", border: `1px solid rgba(255,255,255,${s === 700 ? "0.06" : "0.08"})`, pointerEvents: "none" }} />
      ))}

      <div className="container" style={{ position: "relative" }}>
        <FadeIn>
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "5px 14px", borderRadius: 3, marginBottom: 24 }}>
            Free. No pressure. No obligation.
          </span>
          <h2 className="brig" style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 800, color: "white", lineHeight: 1.08, marginBottom: 20, letterSpacing: "-0.03em" }}>
            Ready to end your<br />generator bill forever?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.8 }}>
            Message us on WhatsApp. We'll schedule a free site visit, assess your load, and send you a full itemised proposal — every naira accounted for.
          </p>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ background: "white", color: "var(--green)", fontSize: 16, padding: "17px 36px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
              <WhatsAppIcon size={20} color="var(--green)" /> WhatsApp Us Now
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
              className="btn-outline"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
            >
              Follow on Facebook
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}