import Image from "next/image";
import { WHATSAPP_URL, FACEBOOK_URL, GBP_PROFILE_URL } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui";

const FOOTER_SERVICES = ["Residential Solar", "Commercial Systems", "Maintenance", "Energy Audit"];
const FOOTER_CITIES   = ["Port Harcourt", "Warri", "Asaba", "Yenagoa"];
const FOOTER_COMPANY: [string, string][] = [["About Us", "/about"], ["Blog", "/blog"], ["Packages", "#packages"], ["Financing", "#financing"]];

const mutedLink: React.CSSProperties = { fontSize: 13, color: "rgba(255,255,255,0.5)", transition: "color 0.2s", display: "block", marginBottom: 11 };
const colHead: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 18 };

export default function Footer({ isMobile, isSmall }: { isMobile: boolean; isSmall: boolean }) {
  return (
    <footer style={{ background: "#07100d", color: "rgba(255,255,255,0.5)", padding: "56px 24px 32px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: isSmall ? "1fr" : isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap: isSmall ? 32 : 48, marginBottom: 48 }}>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, overflow: "hidden", position: "relative" }}>
                <Image src="/images/logo.png" alt="LumaGrid Solar" fill style={{ objectFit: "contain" }} />
              </div>
              <span className="brig" style={{ fontWeight: 800, fontSize: 16, color: "white" }}>LumaGrid Solar</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.85, maxWidth: 260 }}>
              Professional solar installation across Rivers, Delta, and Bayelsa states. CAC registered. Genuine brands. Real warranties.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, background: "var(--wa)", color: "white", padding: "9px 18px", borderRadius: 5, fontSize: 13, fontWeight: 600 }}>
              <WhatsAppIcon size={14} /> Chat on WhatsApp
            </a>
          </div>

          <div>
            <div style={colHead}>Services</div>
            {FOOTER_SERVICES.map(s => (
              <a key={s} href="#services" style={mutedLink}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"}
              >{s}</a>
            ))}
          </div>

          <div>
            <div style={colHead}>Locations</div>
            {FOOTER_CITIES.map(c => (
              <a key={c} href="#locations" style={mutedLink}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"}
              >{c}</a>
            ))}
          </div>

          <div>
            <div style={colHead}>Company</div>
            {FOOTER_COMPANY.map(([label, href]) => (
              <a key={label} href={href} style={mutedLink}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"}
              >{label}</a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12 }}>© {new Date().getFullYear()} LumaGrid. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Facebook", FACEBOOK_URL], ["Google", GBP_PROFILE_URL]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}