import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui";
import { ArrowRight, Phone } from "@/components/ui/icons";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/constants";
import type { QuoteState } from "@/lib/quote";

/* Server-rendered building blocks shared by every redesigned page. */

export function SectionHead({
  eyebrow, title, lead, center = false, children,
}: {
  eyebrow?: string; title: React.ReactNode; lead?: React.ReactNode; center?: boolean; children?: React.ReactNode;
}) {
  return (
    <div className={`sec-head reveal${center ? " sec-head--center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  );
}

export interface Crumb { name: string; href?: string }

export function PageHero({
  eyebrow, title, lead, image, imageAlt = "", crumbs, children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="phero on-dark">
      {image && (
        <div className="phero__bg">
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" unoptimized={image.startsWith("http")} />
        </div>
      )}
      <div className="phero__scrim" />
      <div className="phero__glow" />
      <div className="wrap">
        <div className="phero__inner">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="crumbs">
              {crumbs.map((c, i) => (
                <span key={c.name} style={{ display: "contents" }}>
                  {i > 0 && <span aria-hidden>/</span>}
                  {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="display" style={{ fontSize: "clamp(34px, 7vw, 64px)" }}>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function QuoteButtons({
  source, state, area, primary = "Get a free quote", showCall = true, size = "lg",
}: {
  source: string; state?: QuoteState; area?: string; primary?: string; showCall?: boolean; size?: "lg" | "md";
}) {
  const sz = size === "lg" ? " btn--lg" : "";
  return (
    <div className="btn-row btn-row--stack">
      <WhatsAppButton source={source} state={state} area={area} className={`btn btn--lime${sz}`}>
        <WhatsAppIcon size={19} color="var(--ink)" /> {primary}
      </WhatsAppButton>
      {showCall && (
        <a href={`tel:${PHONE_E164}`} className={`btn btn--ghost${sz}`}>
          <Phone size={17} /> {PHONE_DISPLAY}
        </a>
      )}
    </div>
  );
}

export function CtaBand({
  title = "Ready to stop buying fuel?",
  text = "Tell us your area, building type and what you want to power. We reply on WhatsApp with a recommendation and book a free site assessment.",
  source, state, area,
}: {
  title?: React.ReactNode; text?: string; source: string; state?: QuoteState; area?: string;
}) {
  return (
    <section className="sec--tight" style={{ background: "transparent" }}>
      <div className="wrap">
        <div className="ctaband reveal-scale">
          <SunMark className="ctaband__sun" />
          <div>
            <p className="h2" role="presentation">{title}</p>
            <p>{text}</p>
          </div>
          <div className="ctaband__actions">
            <WhatsAppButton source={source} state={state} area={area} className="btn btn--ink btn--lg">
              <WhatsAppIcon size={19} /> Get my free quote
            </WhatsAppButton>
            <a href={`tel:${PHONE_E164}`} className="btn btn--ghost btn--lg">
              <Phone size={17} /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <details key={f.q} className="reveal" style={{ "--d": `${Math.min(i, 6) * 0.04}s` } as React.CSSProperties}>
          <summary><h3 className="faq-q">{f.q}</h3></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link-arrow">
      {children} <ArrowRight size={16} />
    </Link>
  );
}

/** LumaGrid's sun mark, used as a quiet decorative shape. */
export function SunMark({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill={color}>
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="44" y="6" width="12" height="26" rx="3" transform={`rotate(${i * 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="14" />
    </svg>
  );
}
