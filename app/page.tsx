"use client";

import React, { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "2347059497792"; 
const WHATSAPP_MSG = encodeURIComponent("Hello LumaGrid, I'd like a free solar quote for my property.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Financing", href: "#financing" },
  { label: "Locations", href: "#locations" },
  { label: "Blog", href: "/blog" },
];

const SERVICES = [
  { icon: "⚡", title: "Residential Solar", desc: "Full off-grid and hybrid systems for homes across the Niger Delta. Designed around your actual load — not guesswork." },
  { icon: "🏭", title: "Commercial Systems", desc: "High-capacity installations for businesses, cold rooms, telecoms, and industrial facilities." },
  { icon: "🔧", title: "Maintenance & Repair", desc: "Regular servicing, panel cleaning, inverter diagnostics, and emergency call-outs across Rivers, Delta, and Bayelsa." },
  { icon: "📊", title: "Energy Audit", desc: "We assess your load, NEPA history, and usage pattern before recommending a system. No upselling. Just the right fit." },
];

const STEPS = [
  { num: "01", title: "Free Site Assessment", desc: "We visit your property, assess your load requirements and roof condition at zero cost to you." },
  { num: "02", title: "Transparent Proposal", desc: "You receive a full breakdown — panel brand, inverter spec, battery count, warranty terms, and total cost. Line by line." },
  { num: "03", title: "Professional Installation", desc: "Our certified engineers install to spec. Most residential installs are completed within 1–2 days." },
  { num: "04", title: "Handover & Ongoing Support", desc: "We walk you through the system, hand you a warranty document, and stay reachable on WhatsApp after handover." },
];

const GALLERY = [
  { type: "rooftop", label: "Rooftop Installation — GRA Phase 2, Port Harcourt", img: "/images/Lumagrid-11.jpg" },
  { type: "indoor", label: "Inverter & Battery Setup — Trans Amadi", img: "/images/Lumagrid-12.jpg" },
  { type: "rooftop", label: "Rooftop Array — Warri, Delta State", img: "/images/Lumagrid-13.jpg" },
];

const TESTIMONIALS = [
  {
    name: "Chukwuemeka O.",
    location: "GRA Phase 2, Port Harcourt",
    stars: 5,
    text: "LumaGrid gave me a detailed quote before I paid anything. They showed up on time, finished in two days, and my light bill is basically zero now. These guys are the real deal.",
    source: "Google Review",
  },
  {
    name: "Mrs. Adaeze N.",
    location: "Trans Amadi, Rivers State",
    stars: 5,
    text: "I was scared of being scammed after hearing stories. But they documented everything — the panels, the inverter brand, the warranty papers. Six months later, still working perfectly.",
    source: "Google Review",
  },
  {
    name: "Tunde F.",
    location: "Warri, Delta State",
    stars: 5,
    text: "Finally no more generator noise at 2am. The system handles my AC and everything. LumaGrid even came back to check on the installation three weeks after. Highly recommended.",
    source: "Google Review",
  },
];

const FINANCING_STEPS = [
  { step: "01", title: "Get a Quote First", desc: "We size your system and give you a full cost breakdown before any financing conversation begins." },
  { step: "02", title: "Choose Your Plan", desc: "Our financing partner offers 6, 12, and 24-month repayment plans. We'll help you pick what works for your cash flow." },
  { step: "03", title: "Simple Approval", desc: "Straightforward documentation process. No hidden charges. You'll know your monthly payment before signing anything." },
  { step: "04", title: "Install Now, Pay Monthly", desc: "Your system is installed immediately. You start saving on generator costs from day one while spreading the investment." },
];

const LOCATIONS = [
  { state: "Rivers State", cities: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny", "Okrika"], color: "#0d5c3a" },
  { state: "Delta State", cities: ["Warri", "Asaba", "Sapele", "Ughelli", "Abraka"], color: "#157a4e" },
  { state: "Bayelsa State", cities: ["Yenagoa", "Brass", "Ogbia", "Sagbama", "Ekeremor"], color: "#1a9460" },
];

const TRUST_BAR = [
  { value: "100%", label: "Genuine panel brands" },
  { value: "2yr", label: "Workmanship warranty" },
  { value: "10yr", label: "Panel performance warranty" },
  { value: "CAC", label: "Registered Nigerian business" },
];

const FAQS = [
  { q: "How much does a solar system cost in Port Harcourt?", a: "A basic 3.5KVA system for a 2-bedroom home typically ranges from ₦1.8M to ₦2.8M depending on battery capacity and panel brand. We provide itemised quotes so you see exactly what you're paying for." },
  { q: "Can solar power an air conditioner in Nigeria?", a: "Yes. A 1.5HP inverter AC on a 5KVA hybrid system is very achievable. We size the system specifically around your AC usage pattern during the site assessment." },
  { q: "Do you install in Warri and Yenagoa?", a: "Yes. We cover Rivers, Delta, and Bayelsa states. Travel costs for sites outside Port Harcourt are discussed upfront — no surprise charges." },
  { q: "What happens if something breaks after installation?", a: "You WhatsApp us. We respond within 24 hours. Our 2-year workmanship warranty covers any installation-related fault at no cost to you." },
  { q: "Can I finance a solar system in Nigeria?", a: "Yes. We work with a financing partner who offers 6, 12, and 24-month repayment plans. You can start with as little as 30% deposit and pay the rest monthly." },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 20, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.86L.054 23.428a.75.75 0 00.918.918l5.568-1.48A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.962-1.362l-.355-.212-3.683.978.978-3.584-.232-.368A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <img src="/images/logo.png" alt="LumaGrid Logo"  />
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f5c842">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// Image placeholder component — swap src prop for real images
function InstallPhoto({ src, alt, style = {} }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "#e8f4ef", ...style }}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
            display: "block",
          }}
        />
      ) : null}
      {/* Placeholder shown while loading or on error */}
      {(!loaded || error) && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #e8f4ef 0%, #d4e4db 100%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d5c3a" strokeWidth="1.5" opacity="0.4">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span style={{ fontSize: 11, color: "#5a6b62", fontWeight: 500, opacity: 0.6 }}>{alt}</span>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LumaGridHome() {
  const scrollY = useScrollY();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "rooftop" | "indoor">("all");

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const navScrolled = scrollY > 40;
  const filteredGallery = activeFilter === "all" ? GALLERY : GALLERY.filter(g => g.type === activeFilter);

  return (
    <div style={{ fontFamily: "'Chivo', 'Segoe UI', sans-serif", background: "#f8faf9", color: "#0f1a14", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Chivo:wght@300;400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --green:       #0d5c3a;
          --green-mid:   #157a4e;
          --green-light: #e8f4ef;
          --green-xl:    #f2faf6;
          --accent:      #00c06a;
          --wa:          #25D366;
          --text:        #0f1a14;
          --muted:       #5a6b62;
          --border:      #d4e4db;
          --white:       #ffffff;
          --gold:        #f5c842;
        }

        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
        a { color: inherit; text-decoration: none; }

        .brig { font-family: 'Bricolage Grotesque', sans-serif; }

        .tag {
          display: inline-block;
          background: var(--green-light); color: var(--green-mid);
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 5px 13px; border-radius: 3px;
          margin-bottom: 18px;
        }

        .btn-wa {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--wa); color: #fff;
          padding: 14px 28px; border-radius: 5px;
          font-family: 'Chivo', sans-serif;
          font-weight: 700; font-size: 15px;
          border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(37,211,102,0.3);
          white-space: nowrap;
        }
        .btn-wa:hover { background: #1db954; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,211,102,0.4); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1.5px solid var(--green); color: var(--green);
          padding: 13px 26px; border-radius: 5px;
          font-family: 'Chivo', sans-serif;
          font-weight: 500; font-size: 15px;
          background: transparent; cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .btn-outline:hover { background: var(--green); color: #fff; }

        .btn-solid {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--green); color: white;
          padding: 14px 28px; border-radius: 5px;
          font-family: 'Chivo', sans-serif;
          font-weight: 700; font-size: 15px;
          border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-solid:hover { background: var(--green-mid); transform: translateY(-2px); }

        .section { padding: 96px 24px; }
        .container { max-width: 1120px; margin: 0 auto; }
        .section-title { font-size: clamp(28px, 4vw, 44px); font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; }
        .divider { width: 48px; height: 3px; background: var(--accent); margin: 18px 0 36px; border-radius: 2px; }

        .grid-dot {
          background-image: radial-gradient(var(--border) 1.2px, transparent 1.2px);
          background-size: 28px 28px;
        }

        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .wa-fab {
          position: fixed; bottom: 28px; right: 24px; z-index: 999;
          width: 58px; height: 58px; border-radius: 50%;
          background: var(--wa);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 24px rgba(37,211,102,0.45);
          transition: transform 0.2s;
        }
        .wa-fab::before {
          content: ''; position: absolute; inset: -6px;
          border-radius: 50%; background: var(--wa);
          animation: wa-pulse 2s ease-out infinite;
          z-index: -1;
        }
        .wa-fab:hover { transform: scale(1.1); }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .card-hover {
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .card-hover:hover {
          border-color: var(--green) !important;
          box-shadow: 0 8px 32px rgba(13,92,58,0.1);
          transform: translateY(-3px);
        }

        .filter-btn {
          padding: 8px 20px; border-radius: 4px; border: 1.5px solid var(--border);
          font-family: 'Chivo', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.2s; background: white; color: var(--muted);
        }
        .filter-btn.active { background: var(--green); color: white; border-color: var(--green); }
        .filter-btn:hover:not(.active) { border-color: var(--green); color: var(--green); }

        @media (max-width: 768px) {
          .section { padding: 64px 20px; }
          .hide-mobile { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* FLOATING WHATSAPP */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="wa-fab" title="Chat on WhatsApp">
        <WhatsAppIcon size={28} />
      </a>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navScrolled ? "rgba(255,255,255,0.96)" : "transparent",
        borderBottom: navScrolled ? "1px solid var(--border)" : "none",
        backdropFilter: navScrolled ? "blur(14px)" : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "var(--green)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SunIcon />
            </div>
            <span className="brig" style={{ fontWeight: 800, fontSize: 18, color: "var(--green)", letterSpacing: "-0.02em" }}>
              LumaGrid</span>
          </a>

          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: "var(--muted)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--green)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"}
              >{l.label}</a>
            ))}
          </div>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa hide-mobile" style={{ padding: "10px 20px", fontSize: 13 }}>
            <WhatsAppIcon size={15} /> Get Free Quote
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="grid-dot" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        paddingTop: 68, position: "relative", overflow: "hidden",
        background: "linear-gradient(155deg, #ffffff 0%, var(--green-xl) 55%, var(--green-light) 100%)",
      }}>
        {/* decorative rings */}
        {[700, 500, 320].map((s, i) => (
          <div key={i} style={{
            position: "absolute", right: -s * 0.25, top: "50%", transform: "translateY(-50%)",
            width: s, height: s, borderRadius: "50%",
            border: "1px solid var(--border)", opacity: 0.5 - i * 0.1, pointerEvents: "none",
          }} />
        ))}

        <div className="container hero-grid" style={{ padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}>
            <span className="tag">Rivers · Delta · Bayelsa</span>
            <h1 className="brig" style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 800, lineHeight: 1.07, letterSpacing: "-0.03em", marginBottom: 24 }}>
              Stop paying<br />
              <span style={{ color: "var(--green)" }}>for power</span><br />
              you don't own.
            </h1>
            <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.75, maxWidth: 460, marginBottom: 36 }}>
              LumaGrid installs reliable solar systems across the Niger Delta — with full transparency, genuine panel brands, real warranties, and engineers you can call back.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ fontSize: 16, padding: "16px 32px" }}>
                <WhatsAppIcon size={20} /> Get Free Quote on WhatsApp
              </a>
              <a href="/calculators/solar" className="btn-outline">Size My System →</a>
            </div>

            <div style={{ display: "flex", gap: 40, marginTop: 52, flexWrap: "wrap" }}>
              {[["₦0", "Generator costs after install"], ["3", "States covered"], ["Free", "Site assessment"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="brig" style={{ fontSize: 28, fontWeight: 800, color: "var(--green)" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500, marginTop: 3, maxWidth: 100, lineHeight: 1.4 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div style={{
            opacity: heroVisible ? 1 : 0, transition: "opacity 0.8s ease 0.35s",
            animation: heroVisible ? "float 5s ease-in-out infinite" : "none",
          }}>
            <InstallPhoto
              src="/images/real/solar-install.jpg"
              alt="Solar installation by LumaGrid"
              style={{ borderRadius: 16, height: 420, boxShadow: "0 32px 80px rgba(13,92,58,0.2)" }}
            />
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.35 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 36, background: "var(--green)" }} />
        </div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--green)", padding: "28px 24px" }}>
        <div className="container" style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          {TRUST_BAR.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span className="brig" style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>{t.value}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>{t.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section id="services" className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <FadeIn>
            <span className="tag">What We Do</span>
            <h2 className="brig section-title">Built for the Niger Delta,<br />not just Nigeria.</h2>
            <div className="divider" />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card-hover" style={{ padding: 32, border: "1.5px solid var(--border)", borderRadius: 10, cursor: "default" }}>
                  <div style={{ fontSize: 28, marginBottom: 18 }}>{s.icon}</div>
                  <h3 className="brig" style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────────────────────────────── */}
      <section id="gallery" className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container">
          <FadeIn>
            <span className="tag">Our Work</span>
            <h2 className="brig section-title">Real installs.<br />Real Niger Delta homes.</h2>
            <div className="divider" />
            <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 520, lineHeight: 1.75, marginBottom: 36 }}>
              Every project below was completed by our team. No stock photos. These are actual systems we installed and stand behind.
            </p>
          </FadeIn>

          {/* Filter */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
              {(["all", "rooftop", "indoor"] as const).map(f => (
                <button key={f} className={`filter-btn ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>
                  {f === "all" ? "All Installs" : f === "rooftop" ? "Rooftop Panels" : "Indoor Systems"}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filteredGallery.map((item, i) => (
              <FadeIn key={`${item.img}-${i}`} delay={i * 0.07}>
                <div style={{ borderRadius: 10, overflow: "hidden", position: "relative", boxShadow: "0 4px 20px rgba(13,92,58,0.08)" }}
                  onMouseEnter={e => {
                    const overlay = e.currentTarget.querySelector(".gallery-overlay") as HTMLElement;
                    if (overlay) overlay.style.opacity = "1";
                  }}
                  onMouseLeave={e => {
                    const overlay = e.currentTarget.querySelector(".gallery-overlay") as HTMLElement;
                    if (overlay) overlay.style.opacity = "0";
                  }}
                >
                  <InstallPhoto src={item.img} alt={item.label} style={{ height: 240 }} />
                  <div className="gallery-overlay" style={{
                    position: "absolute", inset: 0, background: "rgba(13,92,58,0.75)",
                    display: "flex", alignItems: "flex-end", padding: 20,
                    opacity: 0, transition: "opacity 0.3s ease",
                  }}>
                    <span style={{ color: "white", fontSize: 13, fontWeight: 500, lineHeight: 1.5 }}>{item.label}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div style={{ marginTop: 40, textAlign: "center" }}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <WhatsAppIcon size={18} /> Book Your Free Site Assessment
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <FadeIn>
            <span className="tag">The Process</span>
            <h2 className="brig section-title">We show you everything<br />before you pay a kobo.</h2>
            <div className="divider" />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
            {STEPS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <div className="brig" style={{ fontSize: 52, fontWeight: 800, color: "var(--green-light)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 10, WebkitTextStroke: "1.5px var(--border)" }}>{s.num}</div>
                  <h3 className="brig" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINANCING ──────────────────────────────────────────────────────── */}
      <section id="financing" className="section" style={{ background: "var(--green)", position: "relative", overflow: "hidden" }}>
        {/* bg decoration */}
        <div style={{ position: "absolute", right: -100, top: -100, width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, bottom: -150, width: 350, height: 350, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <FadeIn>
              <span style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 13px", borderRadius: 3, marginBottom: 18 }}>
                Financing Available
              </span>
              <h2 className="brig" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
                Go solar today.<br />Pay over time.
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, marginBottom: 32, maxWidth: 420 }}>
                Through our financing partner, you can own a full solar system with as little as 30% upfront and spread the rest over 6, 12, or 24 months. Start saving from day one.
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 36 }}>
                {[["30%", "Minimum deposit"], ["24mo", "Max repayment"], ["Same day", "Installation"]].map(([val, lbl]) => (
                  <div key={lbl} style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 14 }}>
                    <div className="brig" style={{ fontSize: 22, fontWeight: 800, color: "white" }}>{val}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ background: "white", color: "var(--green)" }}>
                <WhatsAppIcon size={18} color="var(--green)" /> Ask About Financing
              </a>
            </FadeIn>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {FINANCING_STEPS.map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div className="brig" style={{
                      minWidth: 40, height: 40, borderRadius: 8,
                      background: "rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800, color: "var(--accent)",
                    }}>{s.step}</div>
                    <div>
                      <h4 className="brig" style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 5 }}>{s.title}</h4>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{s.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <FadeIn>
            <span className="tag">Client Reviews</span>
            <h2 className="brig section-title">What our customers say.</h2>
            <div className="divider" />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
              <Stars count={5} />
              <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>5.0 on Google · Verified reviews from Google Business Profile</span>
              <a href="https://g.page/r/YOUR_GBP_LINK/review" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: "var(--green)", fontWeight: 600, marginLeft: 8, textDecoration: "underline" }}>
                Leave a review →
              </a>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="card-hover" style={{
                  padding: 32, border: "1.5px solid var(--border)", borderRadius: 12,
                  background: "var(--white)", display: "flex", flexDirection: "column", gap: 16,
                }}>
                  <Stars count={t.stars} />
                  <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.75, fontStyle: "italic", flexGrow: 1 }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{t.location}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>Google</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* GBP note */}
          <FadeIn delay={0.3}>
            <div style={{ marginTop: 40, padding: "20px 28px", background: "var(--green-xl)", borderRadius: 10, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ fontSize: 22 }}>💡</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Grow your reviews on Google</div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                  After every install, send your customer your GBP review link directly on WhatsApp. Each new review improves your local SEO ranking. Update the <code style={{ background: "var(--border)", padding: "1px 6px", borderRadius: 3, fontSize: 12 }}>TESTIMONIALS</code> array in this file as new reviews come in.
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── LOCATIONS ──────────────────────────────────────────────────────── */}
      <section id="locations" className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container">
          <FadeIn>
            <span className="tag">Coverage Area</span>
            <h2 className="brig section-title">Serving the Niger Delta,<br />city by city.</h2>
            <div className="divider" />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {LOCATIONS.map((loc, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="card-hover" style={{ border: "1.5px solid var(--border)", borderRadius: 10, overflow: "hidden", background: "white" }}>
                  <div style={{ background: loc.color, padding: "20px 24px" }}>
                    <h3 className="brig" style={{ color: "white", fontWeight: 700, fontSize: 18 }}>{loc.state}</h3>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {loc.cities.map(city => (
                        <span key={city} style={{ background: "var(--green-light)", color: "var(--green-mid)", fontSize: 12, fontWeight: 500, padding: "5px 11px", borderRadius: 3 }}>{city}</span>
                      ))}
                    </div>
                    <a href={`/locations/${loc.state.toLowerCase().replace(" ", "-")}`} style={{ display: "inline-block", marginTop: 20, fontSize: 13, color: "var(--green)", fontWeight: 600 }}>
                      View {loc.state} page →
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <FadeIn>
            <span className="tag">FAQ</span>
            <h2 className="brig section-title">Questions Nigerians<br />actually ask.</h2>
            <div className="divider" />
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ border: "1.5px solid var(--border)", borderRadius: 8, background: "white", overflow: "hidden" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: "100%", textAlign: "left", background: "none", border: "none",
                    padding: "20px 24px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  }}>
                    <span className="brig" style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{f.q}</span>
                    <span style={{ fontSize: 22, color: "var(--green)", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.25s" }}>+</span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                    <p style={{ padding: "0 24px 20px", fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>{f.a}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--green)", padding: "96px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 460, height: 460, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <FadeIn>
            <span style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 3, marginBottom: 24 }}>
              Free. No pressure. No obligation.
            </span>
            <h2 className="brig" style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 800, color: "white", lineHeight: 1.08, marginBottom: 20, letterSpacing: "-0.03em" }}>
              Ready to end your<br />generator bill forever?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.8 }}>
              Message us on WhatsApp. We'll schedule a free site visit, assess your load, and send you a full itemised proposal — every naira accounted for.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ background: "white", color: "var(--green)", fontSize: 16, padding: "17px 36px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
                <WhatsAppIcon size={20} color="var(--green)" /> WhatsApp Us Now
              </a>
              <a href="/calculators/solar" className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}>
                Calculate My System
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#07100d", color: "rgba(255,255,255,0.5)", padding: "56px 24px 32px" }}>
        <div className="container">
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 30, height: 30, background: "var(--green)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SunIcon />
                </div>
                <span className="brig" style={{ fontWeight: 800, fontSize: 16, color: "white" }}>LumaGrid Solar</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.85, maxWidth: 260 }}>
                Professional solar installation across Rivers, Delta, and Bayelsa states. CAC registered. Genuine brands. Real warranties.
              </p>
              <div style={{ marginTop: 24 }}>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--wa)", color: "white", padding: "9px 18px", borderRadius: 5, fontSize: 13, fontWeight: 600 }}>
                  <WhatsAppIcon size={14} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 18 }}>Services</div>
              {["Residential Solar", "Commercial Systems", "Maintenance", "Energy Audit"].map(s => (
                <div key={s} style={{ marginBottom: 11 }}>
                  <a href="#services" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"}
                  >{s}</a>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 18 }}>Locations</div>
              {["Port Harcourt", "Warri", "Asaba", "Yenagoa"].map(c => (
                <div key={c} style={{ marginBottom: 11 }}>
                  <a href="#locations" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"}
                  >{c}</a>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 18 }}>Company</div>
              {[["About Us", "/about"], ["Blog", "/blog"], ["Solar Calculator", "/calculators/solar"], ["Financing", "#financing"]].map(([label, href]) => (
                <div key={label} style={{ marginBottom: 11 }}>
                  <a href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"}
                  >{label}</a>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12 }}>© {new Date().getFullYear()} LumaGrid. All rights reserved.</span>
            <div style={{ display: "flex", gap: 24 }}>
              <a href="https://facebook.com/lumagrid" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"}
              >Facebook</a>
              <a href="https://share.google/tWa3IVR0ETFJ0k8FV" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"}
              >Google</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}