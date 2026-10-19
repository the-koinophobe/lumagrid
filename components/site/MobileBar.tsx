"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { PHONE_E164 } from "@/lib/constants";
import { useQuote } from "@/components/quote/QuoteProvider";
import { WhatsAppIcon } from "@/components/ui";
import { Phone } from "@/components/ui/icons";

/**
 * Sticky call / quote bar on phones. It slides in once the visitor has
 * scrolled past the hero, so the two actions that turn into leads are always
 * one thumb-tap away. Hidden on desktop, where the navbar button does the job.
 */
export default function MobileBar() {
  const [show, setShow] = useState(false);
  const openQuote = useQuote();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mbar${show ? " show" : ""}`} aria-hidden={!show}>
      <a href={`tel:${PHONE_E164}`} className="btn btn--ghost" tabIndex={show ? 0 : -1} onClick={() => track("call_click", { from: "mobile_bar" })}>
        <Phone size={17} /> Call
      </a>
      <button type="button" className="btn btn--wa" tabIndex={show ? 0 : -1} onClick={() => openQuote({ source: "Mobile action bar" })}>
        <WhatsAppIcon size={18} /> Get a free quote
      </button>
    </div>
  );
}
