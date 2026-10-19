"use client";

import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { FACEBOOK_URL, GBP_PROFILE_URL, GBP_REVIEW_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui";
import { Facebook, Instagram, Phone, ArrowUpRight } from "@/components/ui/icons";
import { CITIES } from "@/lib/cities";

const FOOTER_SERVICES: [string, string][] = [
  ["Residential Solar", "/services"],
  ["Commercial Systems", "/services"],
  ["Maintenance", "/services"],
  ["Energy Audit", "/services"],
];

const FOOTER_COMPANY: [string, string][] = [
  ["About Us", "/about"],
  ["Solar Prices", "/pricing"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

const FOOTER_AREAS: [string, string][] = [
  ["Rivers State", "/locations/rivers"],
  ["Delta State", "/locations/delta"],
  ["Bayelsa State", "/locations/bayelsa"],
  ["All towns we cover", "/solar-installation"],
  ["Savings Calculator", "/calculator"],
];

const FOOTER_GUIDES: [string, string][] = [
  ["How much solar costs in 2026", "/blog/how-much-does-solar-cost-in-port-harcourt"],
  ["What 3kVA, 5kVA & 10kVA can power", "/blog/what-can-3kva-5kva-10kva-power"],
  ["Panels needed for a 5kVA inverter", "/blog/how-many-solar-panels-for-5kva-inverter"],
  ["Can solar power an AC?", "/blog/solar-ac"],
  ["Solar on an upstairs building", "/blog/solar-on-upstairs-building"],
  ["Lithium vs lead-acid batteries", "/blog/lifep04-vs-acid"],
];

const colHead: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--lime)",
  marginBottom: 14,
};

/**
 * `isMobile` / `isSmall` are accepted for backwards compatibility with pages
 * that still pass them; the layout itself is CSS-driven.
 */
export default function Footer({ isMobile, isSmall }: { isMobile?: boolean; isSmall?: boolean } = {}) {
  void isMobile;
  void isSmall;

  return (
    <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,0.55)", padding: "48px 20px 28px" }}>
      <div className="container">
        <div className="auto-4" style={{ marginBottom: 36, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ width: 30, height: 30, borderRadius: 6, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                <Image src="/images/logo.png" alt="" fill sizes="30px" style={{ objectFit: "contain" }} />
              </span>
              <span className="brig" style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>LumaGrid Solar</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 270, marginBottom: 18 }}>
              Solar installation across Rivers, Delta, and Bayelsa states. CAC
              registered. Genuine brands. Real warranties.
            </p>
            <WhatsAppButton source="Footer" className="btn-lime" style={{ fontSize: 13.5, padding: "11px 18px" }}>
              <WhatsAppIcon size={15} color="var(--ink)" /> Chat on WhatsApp
            </WhatsAppButton>
          </div>

          <div>
            <div style={colHead}>Services</div>
            {FOOTER_SERVICES.map(([label, href]) => (
              <Link key={label} href={href} className="footer-link">{label}</Link>
            ))}
          </div>

          <div>
            <div style={colHead}>Company</div>
            {FOOTER_COMPANY.map(([label, href]) => (
              <Link key={label} href={href} className="footer-link">{label}</Link>
            ))}
          </div>

          <div>
            <div style={colHead}>Where we work</div>
            {FOOTER_AREAS.map(([label, href]) => (
              <Link key={label} href={href} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>

        {/* Town + guide links: one crawlable path to every local page */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.09)", paddingTop: 22, marginBottom: 22 }}>
          <div style={colHead}>Solar installation in</div>
          <div className="footer-towns">
            {CITIES.map(c => (
              <Link key={c.slug} href={`/solar-installation/${c.slug}`}>{c.name}</Link>
            ))}
          </div>
          <div style={{ ...colHead, marginTop: 20 }}>Popular guides</div>
          <div className="footer-towns">
            {FOOTER_GUIDES.map(([label, href]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </div>
        </div>

        {/* Direct line */}
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 24,
            minHeight: 44,
          }}
        >
          <span style={{ color: "var(--lime)" }}><Phone size={17} /></span>
          +234 705 949 7792
        </a>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.09)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12.5 }}>
            © {new Date().getFullYear()} LumaGrid. All rights reserved.
          </span>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {([
              ["Facebook", FACEBOOK_URL, Facebook],
              ["Instagram", "https://instagram.com/lumagrid", Instagram],
              ["Google Business", GBP_PROFILE_URL, ArrowUpRight],
            ] as const).map(([label, href, Icon]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.16)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <Icon size={17} />
              </a>
            ))}
            <a
              href={GBP_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ fontSize: 12.5, marginLeft: 6 }}
            >
              Leave a review
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
