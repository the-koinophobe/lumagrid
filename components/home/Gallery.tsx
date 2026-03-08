"use client";

import { useState } from "react";
import { GALLERY_ITEMS, WHATSAPP_URL } from "@/lib/constants";
import { FadeIn, SectionHeader, InstallPhoto, WhatsAppIcon } from "@/components/ui";

type Filter = "all" | "rooftop" | "indoor";

export default function Gallery({ isMobile }: { isMobile: boolean }) {
  const [filter, setFilter] = useState<Filter>("all");
  const items = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.type === filter);

  return (
    <section id="gallery" className="section" style={{ background: "var(--white)" }}>
      <div className="container">
        <SectionHeader
          tag="Our Work"
          title={<>Real installs.<br />Real Niger Delta homes.</>}
          subtitle="Every project below was completed by our team. No stock photos. These are actual systems we installed and stand behind."
        />

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
            {(["all", "rooftop", "indoor"] as Filter[]).map(f => (
              <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f === "all" ? "All Installs" : f === "rooftop" ? "Rooftop Panels" : "Indoor Systems"}
              </button>
            ))}
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
          {items.map((item, i) => (
            <FadeIn key={`${item.img}-${i}`} delay={i * 0.07}>
              <div
                style={{ borderRadius: 10, overflow: "hidden", position: "relative", boxShadow: "0 4px 20px rgba(13,92,58,0.08)", height: 260 }}
                onMouseEnter={e => { const o = e.currentTarget.querySelector<HTMLElement>(".overlay"); if (o) o.style.opacity = "1"; }}
                onMouseLeave={e => { const o = e.currentTarget.querySelector<HTMLElement>(".overlay"); if (o) o.style.opacity = "0"; }}
              >
                <InstallPhoto src={item.img} alt={item.label} style={{ height: "100%" }} />
                <div className="overlay" style={{ position: "absolute", inset: 0, background: "rgba(13,92,58,0.75)", display: "flex", alignItems: "flex-end", padding: 20, opacity: 0, transition: "opacity 0.3s ease" }}>
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
  );
}