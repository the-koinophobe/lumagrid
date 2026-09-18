"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollY } from "@/lib/hooks";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { ArrowUpRight, X, Bolt } from "@/components/ui/icons";

/**
 * Transparent over the hero image, solid once scrolled. The mobile menu is a
 * full-height sheet with large tap targets rather than a cramped dropdown.
 *
 * `isMobile` is accepted for backwards compatibility with pages that still
 * pass it, but layout is CSS-driven so it is not required.
 */
export default function Navbar({ isMobile }: { isMobile?: boolean } = {}) {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const solid = scrollY > 40 || open;

  void isMobile;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: solid ? "rgba(255,255,255,0.97)" : "transparent",
          borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: solid ? "blur(14px)" : "none",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
            padding: "0 20px",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }} aria-label="LumaGrid Solar home">
            <span style={{ width: 34, height: 34, borderRadius: 7, overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <Image src="/images/logo.png" alt="" fill sizes="34px" style={{ objectFit: "contain" }} />
            </span>
            <span
              className="brig"
              style={{
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.02em",
                color: solid ? "var(--ink)" : "#fff",
                transition: "color 0.3s",
              }}
            >
              LumaGrid
            </span>
          </Link>

          {/* Desktop links */}
          <div className="only-desktop" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {NAV_LINKS.map(l => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: solid ? "var(--muted)" : "rgba(255,255,255,0.85)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = solid ? "var(--ink)" : "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = solid ? "var(--muted)" : "rgba(255,255,255,0.85)")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime only-desktop"
              style={{ padding: "10px 18px", fontSize: 13.5 }}
            >
              Contact us <ArrowUpRight size={15} />
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              className="only-mobile"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              style={{
                width: 44,
                height: 44,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {open ? (
                <X size={22} style={{ color: "var(--ink)" }} />
              ) : (
                [0, 1, 2].map(i => (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      width: 22,
                      height: 2,
                      borderRadius: 2,
                      background: solid ? "var(--ink)" : "#fff",
                      transition: "background 0.3s",
                    }}
                  />
                ))
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className="only-mobile"
        style={{
          position: "fixed",
          inset: "68px 0 0",
          zIndex: 99,
          background: "var(--ink)",
          padding: "24px 20px calc(24px + env(safe-area-inset-bottom))",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.25s, visibility 0.32s",
          overflowY: "auto",
        }}
      >
        {NAV_LINKS.map(l => (
          <Link
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 20,
              fontWeight: 600,
              color: "#fff",
              padding: "17px 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              minHeight: 58,
            }}
          >
            {l.label}
            <ArrowUpRight size={19} style={{ color: "var(--lime)" }} />
          </Link>
        ))}

        <a
          href="#calculator"
          onClick={() => setOpen(false)}
          className="btn-lime"
          style={{ marginTop: 24, width: "100%", fontSize: 16, padding: "15px 24px" }}
        >
          <Bolt size={18} /> Calculate my savings
        </a>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="btn-outline"
          style={{ marginTop: 10, width: "100%", borderColor: "rgba(255,255,255,0.4)", color: "#fff", fontSize: 16 }}
        >
          Chat on WhatsApp
        </a>
      </div>
    </>
  );
}
