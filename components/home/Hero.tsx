"use client";

import Image from "next/image";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

/**
 * Full-bleed hero. Layout is CSS-only (no breakpoint hook) so phones get the
 * right composition on the very first paint instead of reflowing after mount.
 */
export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "min(90vh, 780px)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        paddingTop: 68,
      }}
    >
      <Image
        src="/images/real/solar-panels-on-the-roof.jpeg"
        alt="Rooftop solar array installed by LumaGrid in the Niger Delta"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />

      {/* Legibility scrim — heavier at the bottom where the copy sits */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,21,15,0.62) 0%, rgba(8,21,15,0.25) 32%, rgba(8,21,15,0.55) 62%, rgba(8,21,15,0.93) 100%)",
        }}
      />

      <div
        className="container"
        style={{ position: "relative", padding: "0 20px 40px", width: "100%" }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
          <div style={{ maxWidth: 720 }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(6px)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "6px 13px",
                borderRadius: 3,
                marginBottom: 18,
              }}
            >
              Rivers · Delta · Bayelsa
            </span>

            <h1
              className="brig"
              style={{
                fontSize: "clamp(32px, 8vw, 68px)",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: "#fff",
                marginBottom: 18,
              }}
            >
              <span style={{ color: "var(--lime)" }}>Stop burning money</span>
              <br />
              on petrol every week.
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 2.2vw, 18px)",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 26,
              }}
            >
              Work out exactly what your generator costs you each year, and what
              it would take to replace it. Takes about a minute.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#calculator" className="btn-lime" style={{ fontSize: 16, padding: "15px 26px" }}>
                Calculate my savings <ArrowRight size={18} />
              </a>
              <WhatsAppButton
                source="Homepage hero"
                className="btn-outline"
                style={{
                  borderColor: "rgba(255,255,255,0.45)",
                  color: "#fff",
                  fontSize: 16,
                  padding: "14px 24px",
                }}
              >
                <WhatsAppIcon size={18} /> Talk to us
              </WhatsAppButton>
            </div>
          </div>

          {/* Floating project card — desktop only, mirrors the brand template */}
          <a
            href="#gallery"
            className="only-desktop"
            style={{
              width: 250,
              flexShrink: 0,
              background: "#fff",
              borderRadius: 12,
              padding: 14,
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ position: "relative", height: 132, borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
              <Image
                src="/images/real/5kwh-6Kva-system-abraka.jpeg"
                alt="5kWh, 6kVA system installed in Abraka, Delta State"
                fill
                sizes="250px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
                See our recent installs
              </span>
              <span className="icon-badge" style={{ width: 34, height: 34 }}>
                <ArrowUpRight size={17} />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
