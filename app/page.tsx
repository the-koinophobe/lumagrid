"use client";

import React, { useState, useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "2348000000000"; // replace with real number
const WHATSAPP_MSG = encodeURIComponent("Hello LumaGrid, I'd like a free solar quote for my property.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Locations", href: "#locations" },
  { label: "Blog", href: "/blog" },
  { label: "Calculator", href: "/calculators/solar" },
];

const SERVICES = [
  {
    icon: "⚡",
    title: "Residential Solar",
    desc: "Full off-grid and hybrid systems for homes in Rivers, Delta, and Bayelsa. No more generator dependency.",
  },
  {
    icon: "🏭",
    title: "Commercial Systems",
    desc: "High-capacity installations for businesses, cold rooms, telecoms, and industrial facilities.",
  },
  {
    icon: "🔧",
    title: "Maintenance & Repair",
    desc: "Regular servicing, panel cleaning, inverter diagnostics, and emergency call-outs.",
  },
  {
    icon: "📊",
    title: "Energy Audit",
    desc: "We assess your load, NEPA history, and usage pattern before recommending a system — no guesswork.",
  },
];

const STEPS = [
  { num: "01", title: "Free Site Assessment", desc: "We visit your property, assess your load requirements and roof condition at zero cost." },
  { num: "02", title: "Transparent Proposal", desc: "You receive a detailed breakdown — panel brand, inverter spec, battery count, warranty, and total cost." },
  { num: "03", title: "Professional Installation", desc: "Our certified engineers install to spec. Typically completed within 1-2 days." },
  { num: "04", title: "Handover & Support", desc: "We walk you through the system, hand you a warranty document, and remain reachable on WhatsApp." },
];

const LOCATIONS = [
  { state: "Rivers State", cities: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny", "Okrika"] },
  { state: "Delta State", cities: ["Warri", "Asaba", "Sapele", "Ughelli", "Abraka"] },
  { state: "Bayelsa State", cities: ["Yenagoa", "Brass", "Ogbia", "Sagbama", "Ekeremor"] },
];

const TRUST = [
  { value: "100%", label: "Genuine panel brands — no Alaba market substitutes" },
  { value: "2yr", label: "Installation workmanship warranty on every project" },
  { value: "10yr", label: "Panel performance warranty passed through to you" },
  { value: "CAC", label: "Registered Nigerian business — verifiable on CAC portal" },
];

const FAQS = [
  { q: "How much does a solar system cost in Port Harcourt?", a: "A basic 3.5KVA system for a 2-bedroom home typically ranges from ₦1.8M to ₦2.8M depending on battery capacity and panel brand. We provide itemised quotes so you see exactly what you're paying for." },
  { q: "Can solar power an air conditioner in Nigeria?", a: "Yes. A 1.5HP inverter AC on a 5KVA hybrid system is very achievable. We size the system specifically around your AC usage pattern during the site assessment." },
  { q: "Do you install in Warri and Yenagoa?", a: "Yes. We cover Rivers, Delta, and Bayelsa states. Travel costs for sites outside Port Harcourt are discussed upfront — no hidden charges." },
  { q: "What happens if something breaks after installation?", a: "You WhatsApp us. We respond within 24 hours. Our 2-year workmanship warranty covers any installation-related fault at no cost to you." },
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function LumaGridHome() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const navScrolled = scrollY > 40;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f9fafb", color: "#0f1a14", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --green: #0d5c3a;
          --green-mid: #157a4e;
          --green-light: #e8f4ef;
          --green-xlight: #f2faf6;
          --accent: #00c06a;
          --wa: #25D366;
          --text: #0f1a14;
          --muted: #5a6b62;
          --border: #d4e4db;
          --white: #ffffff;
        }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
        a { color: inherit; text-decoration: none; }
        .syne { font-family: 'Syne', sans-serif; }
        .btn-wa {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--wa); color: #fff;
          padding: 14px 28px; border-radius: 4px;
          font-weight: 600; font-size: 15px;
          border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(37,211,102,0.3);
          white-space: nowrap;
        }
        .btn-wa:hover { background: #1db954; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,211,102,0.4); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1.5px solid var(--green); color: var(--green);
          padding: 13px 26px; border-radius: 4px;
          font-weight: 500; font-size: 15px;
          background: transparent; cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .btn-outline:hover { background: var(--green); color: #fff; }
        .grid-bg {
          background-image: linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .wa-pulse::before {
          content: ''; position: absolute; inset: -6px;
          border-radius: 50%; background: var(--wa);
          animation: pulse-ring 1.8s ease-out infinite;
          z-index: -1;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .float { animation: float 4s ease-in-out infinite; }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        .tag {
          display: inline-block;
          background: var(--green-light); color: var(--green-mid);
          font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 5px 12px; border-radius: 2px;
          margin-bottom: 16px;
        }
        .section { padding: 96px 24px; }
        .container { max-width: 1120px; margin: 0 auto; }
        .section-title { font-size: clamp(28px, 4vw, 42px); font-weight: 800; line-height: 1.15; }
        .divider { width: 48px; height: 3px; background: var(--accent); margin: 20px 0 32px; }
        @media (max-width: 768px) {
          .section { padding: 64px 20px; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* FLOATING WHATSAPP */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{
          position: "fixed", bottom: 28, right: 24, zIndex: 999,
          width: 58, height: 58, borderRadius: "50%",
          background: "var(--wa)", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 24px rgba(37,211,102,0.45)",
          transition: "transform 0.2s",
        }}
        className="wa-pulse"
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.86L.054 23.428a.75.75 0 00.918.918l5.568-1.48A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.962-1.362l-.355-.212-3.683.978.978-3.584-.232-.368A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
      </a>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navScrolled ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: navScrolled ? "1px solid var(--border)" : "none",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, background: "var(--green)", borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </div>
            <span className="syne" style={{ fontWeight: 800, fontSize: 18, color: "var(--green)", letterSpacing: "-0.02em" }}>
              LumaGrid <span style={{ color: "var(--muted)", fontWeight: 700 }}>Solar</span>
            </span>
          </a>

          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{
                fontSize: 14, fontWeight: 500, color: "var(--muted)",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--green)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"}
              >{l.label}</a>
            ))}
          </div>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa hide-mobile" style={{ padding: "10px 20px", fontSize: 13 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.86L.054 23.428a.75.75 0 00.918.918l5.568-1.48A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.962-1.362l-.355-.212-3.683.978.978-3.584-.232-.368A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            Get Free Quote
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}
            className="mobile-menu-btn"
          >
            <div style={{ width: 22, height: 2, background: "var(--green)", marginBottom: 5, borderRadius: 2 }} />
            <div style={{ width: 22, height: 2, background: "var(--green)", marginBottom: 5, borderRadius: 2 }} />
            <div style={{ width: 14, height: 2, background: "var(--green)", borderRadius: 2 }} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid-bg" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        paddingTop: 68, position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, var(--white) 0%, var(--green-xlight) 60%, var(--green-light) 100%)",
      }}>
        {/* Decorative circle */}
        <div style={{
          position: "absolute", right: "-120px", top: "10%",
          width: 600, height: 600, borderRadius: "50%",
          border: "1.5px solid var(--border)", opacity: 0.6, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: "-60px", top: "18%",
          width: 420, height: 420, borderRadius: "50%",
          border: "1.5px solid var(--border)", opacity: 0.5, pointerEvents: "none",
        }} />

        <div className="container" style={{ padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              <span className="tag">Rivers · Delta · Bayelsa</span>
              <h1 className="syne" style={{
                fontSize: "clamp(36px, 5.5vw, 62px)", fontWeight: 800,
                lineHeight: 1.08, letterSpacing: "-0.03em", color: "var(--text)",
                marginBottom: 24,
              }}>
                Stop paying<br />
                <span style={{ color: "var(--green)" }}>for power</span><br />
                you don't control.
              </h1>
              <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, maxWidth: 460, marginBottom: 36 }}>
                LumaGrid installs reliable solar systems across the Niger Delta — with full transparency, real warranties, and engineers you can call back.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ fontSize: 16, padding: "16px 32px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.86L.054 23.428a.75.75 0 00.918.918l5.568-1.48A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.962-1.362l-.355-.212-3.683.978.978-3.584-.232-.368A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                  Get Free Quote on WhatsApp
                </a>
                <a href="/calculators/solar" className="btn-outline">
                  Size My System →
                </a>
              </div>

              <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
                {[["1", "Install done"], ["3", "States covered"], ["Free", "Site assessment"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div className="syne" style={{ fontSize: 26, fontWeight: 800, color: "var(--green)" }}>{val}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500, marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="float" style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "scale(1)" : "scale(0.92)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
              width: "100%", maxWidth: 440,
            }}>
              {/* Solar panel SVG illustration */}
              <svg viewBox="0 0 440 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", filter: "drop-shadow(0 24px 48px rgba(13,92,58,0.18))" }}>
                {/* Panel background */}
                <rect x="40" y="60" width="360" height="220" rx="8" fill="#0d5c3a" />
                <rect x="48" y="68" width="344" height="204" rx="6" fill="#0a4f31" />
                {/* Grid lines */}
                {[0,1,2,3].map(i => (
                  <line key={`v${i}`} x1={48 + (i+1)*344/5} y1="68" x2={48 + (i+1)*344/5} y2="272" stroke="#157a4e" strokeWidth="1.5" />
                ))}
                {[0,1,2].map(i => (
                  <line key={`h${i}`} x1="48" y1={68 + (i+1)*204/4} x2="392" y2={68 + (i+1)*204/4} stroke="#157a4e" strokeWidth="1.5" />
                ))}
                {/* Cell highlights */}
                {[0,1,2,3,4].map(col =>
                  [0,1,2,3].map(row => (
                    <rect key={`c${col}${row}`}
                      x={52 + col * (344/5)} y={72 + row * (204/4)}
                      width={344/5 - 6} height={204/4 - 6}
                      rx="2" fill="#0d6644" opacity="0.6"
                    />
                  ))
                )}
                {/* Sun rays */}
                <circle cx="370" cy="50" r="22" fill="#f5c842" opacity="0.9" />
                <circle cx="370" cy="50" r="30" fill="#f5c842" opacity="0.2" />
                {[0,45,90,135,180,225,270,315].map((angle, i) => {
                  const rad = angle * Math.PI / 180;
                  return <line key={i} x1={370 + 34*Math.cos(rad)} y1={50 + 34*Math.sin(rad)} x2={370 + 42*Math.cos(rad)} y2={50 + 42*Math.sin(rad)} stroke="#f5c842" strokeWidth="2" strokeLinecap="round" />;
                })}
                {/* Mount legs */}
                <line x1="120" y1="280" x2="100" y2="340" stroke="#157a4e" strokeWidth="6" strokeLinecap="round" />
                <line x1="320" y1="280" x2="340" y2="340" stroke="#157a4e" strokeWidth="6" strokeLinecap="round" />
                <line x1="220" y1="280" x2="220" y2="340" stroke="#157a4e" strokeWidth="6" strokeLinecap="round" />
                {/* Ground */}
                <rect x="60" y="338" width="320" height="8" rx="4" fill="#d4e4db" />
                {/* Power label */}
                <rect x="165" y="298" width="110" height="30" rx="4" fill="white" opacity="0.15" />
                <text x="220" y="318" textAnchor="middle" fill="white" fontSize="12" fontFamily="monospace" fontWeight="bold">5KVA HYBRID</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          opacity: 0.4,
        }}>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: "var(--green)" }} />
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "var(--green)", padding: "28px 24px" }}>
        <div className="container" style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          {TRUST.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span className="syne" style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>{t.value}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.4, maxWidth: 200 }}>{t.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <FadeIn>
            <span className="tag">What We Do</span>
            <h2 className="syne section-title">Built for the Niger Delta,<br />not just Nigeria.</h2>
            <div className="divider" />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginTop: 8 }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  padding: 32, border: "1.5px solid var(--border)", borderRadius: 8,
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(13,92,58,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
                  <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section" style={{ background: "var(--green-xlight)" }}>
        <div className="container">
          <FadeIn>
            <span className="tag">The Process</span>
            <h2 className="syne section-title">We show you everything<br />before you pay a kobo.</h2>
            <div className="divider" />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, marginTop: 16 }}>
            {STEPS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{ position: "relative", paddingTop: 16 }}>
                  <div className="syne" style={{
                    fontSize: 48, fontWeight: 800,
                    color: "var(--green-light)", letterSpacing: "-0.04em",
                    lineHeight: 1, marginBottom: 8,
                    WebkitTextStroke: "1.5px var(--border)",
                  }}>{s.num}</div>
                  <h3 className="syne" style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: 56, textAlign: "center" }}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ fontSize: 16, padding: "16px 36px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.86L.054 23.428a.75.75 0 00.918.918l5.568-1.48A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.962-1.362l-.355-.212-3.683.978.978-3.584-.232-.368A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                Book Free Site Assessment
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <FadeIn>
            <span className="tag">Coverage Area</span>
            <h2 className="syne section-title">Serving the Niger Delta,<br />city by city.</h2>
            <div className="divider" />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {LOCATIONS.map((loc, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{
                  border: "1.5px solid var(--border)", borderRadius: 8, overflow: "hidden",
                  transition: "box-shadow 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(13,92,58,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  <div style={{ background: "var(--green)", padding: "20px 24px" }}>
                    <h3 className="syne" style={{ color: "white", fontWeight: 700, fontSize: 18 }}>{loc.state}</h3>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {loc.cities.map(city => (
                        <span key={city} style={{
                          background: "var(--green-light)", color: "var(--green-mid)",
                          fontSize: 12, fontWeight: 500, padding: "5px 11px", borderRadius: 2,
                        }}>{city}</span>
                      ))}
                    </div>
                    <a href={`/locations/${loc.state.toLowerCase().replace(" ", "-")}`}
                      style={{ display: "inline-block", marginTop: 20, fontSize: 13, color: "var(--green)", fontWeight: 600 }}>
                      View {loc.state} page →
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--green-xlight)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <FadeIn>
            <span className="tag">FAQ</span>
            <h2 className="syne section-title">Questions Nigerians<br />actually ask.</h2>
            <div className="divider" />
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{
                  border: "1.5px solid var(--border)", borderRadius: 6,
                  background: "var(--white)", overflow: "hidden",
                  marginBottom: 8,
                }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", textAlign: "left", background: "none", border: "none",
                      padding: "20px 24px", cursor: "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{f.q}</span>
                    <span style={{
                      fontSize: 20, color: "var(--green)", flexShrink: 0,
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                      transition: "transform 0.2s",
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: openFaq === i ? "200px" : "0",
                    overflow: "hidden", transition: "max-height 0.35s ease",
                  }}>
                    <p style={{ padding: "0 24px 20px", fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>{f.a}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "var(--green)", padding: "96px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: 400, height: 400, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.1)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative" }}>
          <FadeIn>
            <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 2, display: "inline-block", marginBottom: 24 }}>
              Free. No pressure. No obligation.
            </span>
            <h2 className="syne" style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.03em" }}>
              Ready to end your<br />generator bill forever?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
              Message us on WhatsApp. We'll schedule a free site visit, assess your load, and send you a full proposal — with every naira accounted for.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{
              background: "white", color: "var(--green)",
              fontSize: 17, padding: "18px 40px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0d5c3a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.86L.054 23.428a.75.75 0 00.918.918l5.568-1.48A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.962-1.362l-.355-.212-3.683.978.978-3.584-.232-.368A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
              WhatsApp Us Now
            </a>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#081210", color: "rgba(255,255,255,0.55)", padding: "48px 24px 32px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, background: "var(--green)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </div>
                <span className="syne" style={{ fontWeight: 800, fontSize: 16, color: "white" }}>LumaGrid Solar</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 280 }}>
                Professional solar installation across Rivers, Delta, and Bayelsa states. Registered Nigerian business. Real warranties. Engineers you can call back.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Services</div>
              {["Residential Solar", "Commercial Systems", "Maintenance", "Energy Audit"].map(s => (
                <div key={s} style={{ fontSize: 13, marginBottom: 10 }}><a href="#services" style={{ color: "rgba(255,255,255,0.55)", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"}>{s}</a></div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>Contact</div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--wa)", fontSize: 13, marginBottom: 10 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.86L.054 23.428a.75.75 0 00.918.918l5.568-1.48A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.962-1.362l-.355-.212-3.683.978.978-3.584-.232-.368A9.715 9.715 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                WhatsApp Us
              </a>
              <div style={{ fontSize: 13, marginBottom: 10 }}>Port Harcourt, Rivers State</div>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"}>Facebook</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12 }}>© 2025 LumaGrid Solar. All rights reserved.</span>
            <span style={{ fontSize: 12 }}>lumagridsolar.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}