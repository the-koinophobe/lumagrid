import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui";
import { Facebook, Instagram, Phone, ArrowUpRight, Mail, Clock } from "@/components/ui/icons";
import { FACEBOOK_URL, GBP_PROFILE_URL, GBP_REVIEW_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_E164, EMAIL } from "@/lib/constants";
import { CITIES, STATE_PAGES } from "@/lib/cities";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Solar",
    links: [
      ["Home solar systems", "/services#residential"],
      ["Business solar", "/services#commercial"],
      ["Lithium battery upgrades", "/services#battery-upgrade"],
      ["Maintenance & repairs", "/services#maintenance"],
      ["Solar prices 2026", "/pricing"],
      ["Savings calculator", "/calculator"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About LumaGrid", "/about"],
      ["Contact & quote", "/contact"],
      ["Solar guides", "/blog"],
      ["Leave a Google review", GBP_REVIEW_URL],
    ],
  },
  {
    title: "Where we work",
    links: [
      ...(Object.values(STATE_PAGES).map(s => [s.label, s.href]) as [string, string][]),
      ["All towns we cover", "/solar-installation"],
    ],
  },
];

const GUIDES: [string, string][] = [
  ["How much solar costs in 2026", "/blog/how-much-does-solar-cost-in-port-harcourt"],
  ["Lithium vs tubular battery", "/blog/lithium-vs-tubular-battery"],
  ["What 3kVA, 5kVA & 10kVA can power", "/blog/what-can-3kva-5kva-10kva-power"],
  ["Panels needed for a 5kVA inverter", "/blog/how-many-solar-panels-for-5kva-inverter"],
  ["Can solar power an AC?", "/blog/solar-ac"],
  ["Solar on an upstairs building", "/blog/solar-on-upstairs-building"],
];

const col: React.CSSProperties = { fontSize: 12, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--lime)", marginBottom: 14 };

/**
 * `isMobile` / `isSmall` are accepted for backwards compatibility; layout is CSS.
 */
export default function Footer(_props: { isMobile?: boolean; isSmall?: boolean } = {}) {
  void _props;
  return (
    <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,0.62)", paddingTop: 64 }}>
      <div className="wrap">
        <div style={{ display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", paddingBottom: 40 }}>
          <div style={{ gridColumn: "span 1", minWidth: 0 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ width: 36, height: 36, borderRadius: 9, overflow: "hidden", position: "relative" }}>
                <Image src="/images/logo.png" alt="" fill sizes="36px" style={{ objectFit: "contain" }} />
              </span>
              <span className="brig" style={{ fontWeight: 800, fontSize: 19, color: "#fff" }}>LumaGrid Solar</span>
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.75, maxWidth: 300, marginBottom: 18 }}>
              CAC-registered solar installer based in Port Harcourt. Panels, hybrid inverters and lithium batteries
              for homes and businesses across Rivers, Delta and Bayelsa.
            </p>
            <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
              <a href={`tel:${PHONE_E164}`} style={{ display: "inline-flex", gap: 9, alignItems: "center", color: "#fff", fontWeight: 700 }}>
                <span style={{ color: "var(--lime)" }}><Phone size={16} /></span> {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} style={{ display: "inline-flex", gap: 9, alignItems: "center" }}>
                <span style={{ color: "var(--lime)" }}><Mail size={16} /></span> {EMAIL}
              </a>
              <span style={{ display: "inline-flex", gap: 9, alignItems: "flex-start" }}>
                <span style={{ color: "var(--lime)", marginTop: 2 }}><Clock size={16} /></span>
                Mon–Fri 8am–6pm · Sat 9am–4pm
              </span>
            </div>
            <WhatsAppButton source="Footer" className="btn btn--lime btn--sm" style={{ marginTop: 20 }}>
              <WhatsAppIcon size={16} color="var(--ink)" /> Get a free quote
            </WhatsAppButton>
          </div>

          {COLS.map(c => (
            <div key={c.title}>
              <div style={col}>{c.title}</div>
              {c.links.map(([label, href]) =>
                href.startsWith("http") ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-link">{label}</a>
                ) : (
                  <Link key={label} href={href} className="footer-link">{label}</Link>
                ),
              )}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.09)", padding: "28px 0" }}>
          <div style={col}>Solar installation in</div>
          <div className="footer-towns">
            {CITIES.map(c => (
              <Link key={c.slug} href={`/solar-installation/${c.slug}`}>{c.name}</Link>
            ))}
          </div>
          <div style={{ ...col, marginTop: 22 }}>Popular guides</div>
          <div className="footer-towns">
            {GUIDES.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.09)", padding: "22px 0 28px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
          <span style={{ fontSize: 13 }}>© {new Date().getFullYear()} LumaGrid Solar. All rights reserved.</span>
          <div style={{ display: "flex", gap: 8 }}>
            {([
              ["Facebook", FACEBOOK_URL, Facebook],
              ["Instagram", INSTAGRAM_URL, Instagram],
              ["Google Business Profile", GBP_PROFILE_URL, ArrowUpRight],
            ] as const).map(([label, href, Icon]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.8)" }}>
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
