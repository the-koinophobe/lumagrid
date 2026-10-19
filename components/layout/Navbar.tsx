"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollY } from "@/lib/hooks";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/constants";
import { CITIES, STATE_PAGES } from "@/lib/cities";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { ArrowUpRight, X, Bolt, Phone, ChevronDown } from "@/components/ui/icons";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Prices", href: "/pricing" },
  { label: "Calculator", href: "/calculator" },
  { label: "Guides", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const STATES = Object.keys(STATE_PAGES) as (keyof typeof STATE_PAGES)[];

/**
 * Transparent over dark heroes, solid once scrolled. Pages that start on a
 * light background pass `solid`. Layout is CSS-driven (only-desktop /
 * only-mobile) so phones get the right header on first paint.
 *
 * `isMobile` is accepted for backwards compatibility and ignored.
 */
export default function Navbar({ isMobile, solid: forceSolid = false }: { isMobile?: boolean; solid?: boolean } = {}) {
  void isMobile;
  const scrollY = useScrollY();
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v;
    setOpenOn(next ? pathname : null);
  };
  const [areasOpen, setAreasOpen] = useState(false);
  const solid = forceSolid || scrollY > 30 || open;
  const fg = solid ? "var(--ink)" : "#fff";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: solid ? "rgba(255,255,255,0.94)" : "linear-gradient(180deg, rgba(8,21,15,.45), transparent)",
          borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
          backdropFilter: solid ? "saturate(1.4) blur(14px)" : "none",
          transition: "background .3s ease, border-color .3s ease",
        }}
      >
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72, gap: 16 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }} aria-label="LumaGrid Solar home">
            <span style={{ width: 36, height: 36, borderRadius: 9, overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <Image src="/images/logo.png" alt="" fill sizes="36px" style={{ objectFit: "contain" }} priority />
            </span>
            <span className="brig" style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-0.02em", color: fg, transition: "color .3s" }}>
              LumaGrid<span style={{ color: solid ? "var(--green-mid)" : "var(--lime)", fontWeight: 700 }}> Solar</span>
            </span>
          </Link>

          <nav className="only-desktop" aria-label="Main" style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <Link href="/services" style={navLink(fg, isActive("/services"))}>Services</Link>
            <Link href="/pricing" style={navLink(fg, isActive("/pricing"))}>Prices</Link>
            <div className="navdrop">
              <Link href="/solar-installation" style={{ ...navLink(fg, isActive("/solar-installation") || isActive("/locations")), display: "inline-flex", alignItems: "center", gap: 4 }} aria-haspopup="true">
                Areas <ChevronDown size={14} />
              </Link>
              <div className="navdrop__panel" role="menu">
                {STATES.map(st => (
                  <div key={st}>
                    <h4><Link href={STATE_PAGES[st].href} style={{ color: "var(--muted)" }}>{STATE_PAGES[st].label}</Link></h4>
                    {CITIES.filter(c => c.state === st).map(c => (
                      <Link key={c.slug} href={`/solar-installation/${c.slug}`} role="menuitem">{c.name}</Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <Link href="/calculator" style={navLink(fg, isActive("/calculator"))}>Calculator</Link>
            <Link href="/blog" style={navLink(fg, isActive("/blog"))}>Guides</Link>
            <Link href="/about" style={navLink(fg, isActive("/about"))}>About</Link>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href={`tel:${PHONE_E164}`} className="only-desktop hide-lt-xl" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 700, color: fg, transition: "color .3s", whiteSpace: "nowrap" }}>
              <Phone size={16} /> {PHONE_DISPLAY}
            </a>
            <WhatsAppButton source="Navbar" className="btn btn--lime btn--sm only-desktop">
              Get a quote <ArrowUpRight size={15} />
            </WhatsAppButton>
            <button
              type="button"
              className="only-mobile"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              style={{ width: 46, height: 46, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0, color: fg }}
            >
              {open ? <X size={24} /> : [0, 1, 2].map(i => (
                <span key={i} style={{ display: "block", width: 22, height: 2, borderRadius: 2, background: "currentColor", transition: "background .3s" }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className="only-mobile"
        aria-hidden={!open}
        style={{
          position: "fixed", inset: "72px 0 0", zIndex: 99, background: "var(--ink)",
          padding: "12px 20px calc(24px + env(safe-area-inset-bottom))",
          display: "flex", flexDirection: "column", overflowY: "auto",
          transform: open ? "translateY(0)" : "translateY(-8px)",
          opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden",
          transition: "transform .3s cubic-bezier(.2,.7,.2,1), opacity .25s, visibility .3s",
        }}
      >
        {LINKS.slice(0, 2).map(l => <SheetLink key={l.href} {...l} />)}
        <button
          type="button"
          onClick={() => setAreasOpen(a => !a)}
          aria-expanded={areasOpen}
          style={{ ...sheetRow, background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.1)", width: "100%", cursor: "pointer", textAlign: "left" }}
        >
          Areas we cover
          <span style={{ color: "var(--lime)", transform: areasOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}><ChevronDown size={20} /></span>
        </button>
        {areasOpen && (
          <div style={{ padding: "8px 0 14px", display: "grid", gap: 14 }}>
            {STATES.map(st => (
              <div key={st}>
                <Link href={STATE_PAGES[st].href} style={{ color: "var(--lime)", fontWeight: 800, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase" }}>{STATE_PAGES[st].label}</Link>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {CITIES.filter(c => c.state === st).map(c => (
                    <Link key={c.slug} href={`/solar-installation/${c.slug}`} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,.16)", color: "rgba(255,255,255,.86)", fontSize: 14, fontWeight: 600 }}>{c.name}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {LINKS.slice(2).map(l => <SheetLink key={l.href} {...l} />)}

        <div style={{ display: "grid", gap: 10, marginTop: 24 }}>
          <WhatsAppButton source="Mobile menu" onClick={() => setOpen(false)} className="btn btn--lime btn--lg">
            Get a free quote on WhatsApp
          </WhatsAppButton>
          <a href={`tel:${PHONE_E164}`} className="btn btn--ghost btn--lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,.35)" }}>
            <Phone size={17} /> Call {PHONE_DISPLAY}
          </a>
          <Link href="/calculator" className="btn btn--ghost btn--lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,.35)" }}>
            <Bolt size={17} /> Calculate my savings
          </Link>
        </div>
      </div>
    </>
  );
}

function navLink(fg: string, active: boolean): React.CSSProperties {
  return {
    fontSize: 14.5, fontWeight: 600, color: fg, opacity: active ? 1 : 0.82,
    transition: "color .3s, opacity .2s", padding: "8px 0",
    borderBottom: active ? "2px solid var(--lime)" : "2px solid transparent",
  };
}

const sheetRow: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "space-between",
  fontSize: 20, fontWeight: 700, color: "#fff", padding: "16px 0", minHeight: 58,
  fontFamily: "var(--font-bricolage), sans-serif",
};

function SheetLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} style={{ ...sheetRow, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
      {label}
      <ArrowUpRight size={19} style={{ color: "var(--lime)" }} />
    </Link>
  );
}
