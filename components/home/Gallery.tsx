"use client";

import { useState } from "react";
import { GALLERY_ITEMS } from "@/lib/constants";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { FadeIn, SectionHeader, InstallPhoto, WhatsAppIcon } from "@/components/ui";

type Filter = "all" | "rooftop" | "indoor";

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const items = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.type === filter);

  return (
    <section id="gallery" className="section" style={{ background: "var(--paper)", scrollMarginTop: 68 }}>
      <div className="container">
        <SectionHeader
          tag="Our Work"
          title={<>Real installs.<br />Real Niger Delta homes.</>}
          subtitle="Every project below was completed by our team. No stock photos. These are actual systems we installed and stand behind."
        />

        <FadeIn delay={0.1}>
          <div className="chip-row no-scrollbar" style={{ marginBottom: 28 }}>
            {(["all", "rooftop", "indoor"] as Filter[]).map(f => (
              <button key={f} type="button" className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f === "all" ? "All installs" : f === "rooftop" ? "Rooftop panels" : "Indoor systems"}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="auto-3">
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
            <WhatsAppButton source="Gallery - site assessment" className="btn-wa">
              <WhatsAppIcon size={18} /> Book Your Free Site Assessment
            </WhatsAppButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}