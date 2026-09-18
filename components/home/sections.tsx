"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TRUST_BAR, SERVICES, PROCESS_STEPS, LOCATIONS, FAQS, WHATSAPP_URL } from "@/lib/constants";
import type { ServiceIcon } from "@/lib/types";
import { FadeIn, SectionHeader } from "@/components/ui";
import {
  Bolt, Wrench, Clock, ClipboardCheck, Check, Plus, ArrowRight, MapPin,
  type IconProps,
} from "@/components/ui/icons";

/** Maps the icon key on each service to a real SVG — no emoji anywhere. */
const SERVICE_ICONS: Record<ServiceIcon, (p: IconProps) => React.ReactElement> = {
  bolt: Bolt,
  wrench: Wrench,
  clock: Clock,
  audit: ClipboardCheck,
};

// ── Stats bar ─────────────────────────────────────────────────────────────────

export function TrustBar() {
  return (
    <section style={{ background: "var(--paper)", borderBottom: "1px solid var(--border)", padding: "28px 20px" }}>
      <div className="container auto-4">
        {TRUST_BAR.map((t, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span
                className="brig"
                style={{ fontSize: "clamp(24px, 6vw, 34px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                {t.value}
              </span>
              <span style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.35 }}>{t.label}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────

export function Services() {
  return (
    <section id="services" className="section" style={{ background: "var(--paper)" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          <div>
            <span className="tag">What we do</span>
            <h2 className="brig section-title">
              Built for the Niger Delta,
              <br />
              not just Nigeria.
            </h2>
            <div className="divider" style={{ marginBottom: 0 }} />
          </div>
          <Link href="/services" className="btn-lime" style={{ fontSize: 14, padding: "11px 20px" }}>
            View all services <ArrowRight size={16} />
          </Link>
        </div>

        <div className="auto-4">
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="card-hover"
                  style={{
                    padding: 24,
                    border: "1.5px solid var(--border)",
                    borderRadius: 12,
                    height: "100%",
                    background: "#fff",
                  }}
                >
                  <span className="icon-badge" style={{ marginBottom: 16 }}>
                    <Icon size={21} />
                  </span>
                  <h3 className="brig" style={{ fontSize: 17.5, fontWeight: 700, marginBottom: 8 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Benefits — image with an overlaid card, per the brand template ────────────

const BENEFITS = [
  "No fuel queues, no generator noise",
  "Genuine panel brands with real warranties",
  "Runs through rainy season, sized for it",
  "Adds value to your property",
];

export function Benefits() {
  return (
    <section style={{ position: "relative", background: "var(--ink)" }}>
      <div style={{ position: "relative", minHeight: 420 }}>
        <Image
          src="/images/real/jinko-panels.jpeg"
          alt="Jinko solar panels installed on a Niger Delta rooftop"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(100deg, rgba(8,21,15,0.92) 0%, rgba(8,21,15,0.55) 55%, rgba(8,21,15,0.25) 100%)",
          }}
        />

        <div
          className="container"
          style={{ position: "relative", padding: "56px 20px", display: "flex" }}
        >
          <FadeIn>
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "26px 22px",
                maxWidth: 460,
              }}
            >
              <h2
                className="brig"
                style={{
                  fontSize: "clamp(23px, 5.5vw, 32px)",
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                Why people here switch
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.75, marginBottom: 20 }}>
                Grid supply in Rivers, Delta and Bayelsa is unreliable and petrol
                keeps climbing. Solar turns an endless monthly bill into a
                one-time cost that keeps paying you back.
              </p>

              <ul style={{ listStyle: "none", marginBottom: 22 }}>
                {BENEFITS.map(b => (
                  <li
                    key={b}
                    style={{ display: "flex", alignItems: "flex-start", gap: 11, marginBottom: 12 }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "var(--lime)",
                        color: "var(--ink)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <Check size={13} strokeWidth={2.6} />
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.6 }}>{b}</span>
                  </li>
                ))}
              </ul>

              <a href="#calculator" className="btn-lime" style={{ width: "100%" }}>
                See your numbers <ArrowRight size={17} />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── How it works ──────────────────────────────────────────────────────────────

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section" style={{ background: "var(--sand)" }}>
      <div className="container">
        <SectionHeader
          tag="The process"
          title={<>We show you everything<br />before you pay a kobo.</>}
        />
        <div className="auto-4">
          {PROCESS_STEPS.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div>
                <div
                  className="brig"
                  style={{
                    fontSize: 44,
                    fontWeight: 800,
                    color: "var(--lime)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {s.num}
                </div>
                <h3 className="brig" style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Locations ─────────────────────────────────────────────────────────────────

export function Locations() {
  return (
    <section id="locations" className="section" style={{ background: "var(--paper)" }}>
      <div className="container">
        <SectionHeader
          tag="Coverage area"
          title={<>Serving the Niger Delta,<br />city by city.</>}
        />
        <div className="auto-3">
          {LOCATIONS.map((loc, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="card-hover"
                style={{
                  border: "1.5px solid var(--border)",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#fff",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    background: loc.color,
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                  }}
                >
                  <span style={{ color: "var(--lime)" }}><MapPin size={18} /></span>
                  <h3 className="brig" style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>
                    {loc.state}
                  </h3>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {loc.cities.map(city => (
                      <span
                        key={city}
                        style={{
                          background: "var(--green-light)",
                          color: "var(--green-mid)",
                          fontSize: 12,
                          fontWeight: 500,
                          padding: "5px 11px",
                          borderRadius: 3,
                        }}
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/locations/${loc.state.toLowerCase().replace(/\s*state\s*/i, "").trim()}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 18,
                      minHeight: 40,
                      fontSize: 13.5,
                      fontWeight: 600,
                    }}
                  >
                    View {loc.state} page <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" style={{ background: "var(--sand)" }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <SectionHeader tag="FAQ" title={<>Questions Nigerians<br />actually ask.</>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={i} delay={i * 0.05}>
                <div
                  style={{
                    border: "1.5px solid var(--border)",
                    borderRadius: 10,
                    background: "#fff",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      padding: "17px 18px",
                      minHeight: 56,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <span className="brig" style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4 }}>
                      {f.q}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        color: "var(--ink)",
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: "transform 0.25s",
                      }}
                    >
                      <Plus size={19} />
                    </span>
                  </button>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.3s ease",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <p style={{ padding: "0 18px 18px", fontSize: 14.5, color: "var(--muted)", lineHeight: 1.8 }}>
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Ask us something else
          </a>
        </div>
      </div>
    </section>
  );
}
