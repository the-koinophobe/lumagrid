"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollY } from "@/lib/hooks";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui";

export default function Navbar({ isMobile }: { isMobile: boolean }) {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const scrolled = scrollY > 40;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || open ? "rgba(255,255,255,0.97)" : "transparent",
      borderBottom: scrolled || open ? "1px solid var(--border)" : "none",
      backdropFilter: scrolled || open ? "blur(14px)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, padding: "0 24px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 7, overflow: "hidden", position: "relative" }}>
            <Image src="/images/logo.png" alt="LumaGrid Solar Logo" fill style={{ objectFit: "contain" }} />
          </div>
          <span className="brig" style={{ fontWeight: 800, fontSize: 18, color: "var(--green)", letterSpacing: "-0.02em" }}>LumaGrid</span>
        </a>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: "var(--muted)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--green)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"}
              >{l.label}</a>
            ))}
          </div>
        )}

        {!isMobile && (
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ padding: "10px 20px", fontSize: 13 }}>
            <WhatsAppIcon size={15} /> Get Free Quote
          </a>
        )}

        {isMobile && (
          <button onClick={() => setOpen(o => !o)} aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              open ? "rotate(45deg) translate(5px, 5px)" : "none",
              "none",
              open ? "rotate(-45deg) translate(5px, -5px)" : "none",
            ].map((transform, i) => (
              <span key={i} style={{
                display: "block", width: 22, height: 2,
                background: "var(--green)", borderRadius: 2,
                transition: "all 0.25s", transform,
                opacity: i === 1 && open ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </div>

      {isMobile && (
        <div style={{ maxHeight: open ? "400px" : "0", overflow: "hidden", transition: "max-height 0.35s ease", background: "white", borderTop: open ? "1px solid var(--border)" : "none" }}>
          <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                style={{ fontSize: 16, fontWeight: 500, color: "var(--text)", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                {l.label}
              </a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)} className="btn-wa" style={{ marginTop: 16, justifyContent: "center" }}>
              <WhatsAppIcon size={18} /> Get Free Quote on WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}