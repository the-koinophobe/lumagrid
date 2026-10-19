import { ImageResponse } from "next/og";

/**
 * Branded 1200×630 share card, used for blog posts and town pages so WhatsApp,
 * Facebook and X previews show the page's own title instead of a generic logo.
 */
export const OG_SIZE = { width: 1200, height: 630 };

export function ogCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  // The built-in OG font has no ₦ glyph; "N" is the common shorthand anyway.
  const n = (t?: string) => t?.replace(/₦/g, "N");
  eyebrow = n(eyebrow)!; title = n(title)!; footer = n(footer);
  const size = title.length > 80 ? 54 : title.length > 55 ? 62 : 72;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          background: "#08150f", color: "#fff", padding: "64px 72px", position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -120, width: 520, height: 520, borderRadius: 520, background: "radial-gradient(circle, rgba(212,245,12,0.28), rgba(212,245,12,0) 65%)", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#d4f50c", display: "flex", alignItems: "center", justifyContent: "center", }}><div style={{ width: 24, height: 24, borderRadius: 24, background: "#08150f", display: "flex" }} /></div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
            LumaGrid<span style={{ color: "#d4f50c", marginLeft: 10 }}>Solar</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#d4f50c" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2, maxWidth: 1040 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "rgba(255,255,255,0.75)" }}>
          <span>{footer ?? "Rivers · Delta · Bayelsa"}</span>
          <span style={{ display: "flex", background: "#d4f50c", color: "#08150f", padding: "12px 22px", borderRadius: 999, fontWeight: 800 }}>lumagridsolar.com</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
