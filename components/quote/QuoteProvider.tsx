"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { WhatsAppIcon } from "@/components/ui";
import { X } from "@/components/ui/icons";
import type { QuotePrefill } from "@/lib/quote";
import QuoteForm from "./QuoteForm";

type OpenQuote = (prefill?: QuotePrefill) => void;

const QuoteContext = createContext<OpenQuote>(() => {});

/** Opens the prequalification modal. Every WhatsApp CTA goes through this. */
export function useQuote() {
  return useContext(QuoteContext);
}

export default function QuoteProvider({ children }: { children: React.ReactNode }) {
  // The modal belongs to the page it was opened on, so navigating away closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const [prefill, setPrefill] = useState<QuotePrefill | undefined>();
  const dialogRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const open = openOn === pathname;

  const openQuote = useCallback<OpenQuote>(p => {
    setPrefill(p);
    setOpenOn(pathname);
    track("quote_opened", { source: p?.source ?? "general" });
  }, [pathname]);

  const close = useCallback(() => setOpenOn(null), []);

  // Escape to close, lock page scroll, move focus into the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <QuoteContext.Provider value={openQuote}>
      {children}

      <button
        type="button"
        className="wa-fab"
        aria-label="Get a quote on WhatsApp"
        onClick={() => openQuote({ source: "Floating WhatsApp button" })}
        style={{ border: "none", cursor: "pointer", visibility: open ? "hidden" : "visible" }}
      >
        <WhatsAppIcon size={28} />
      </button>

      {open && (
        <div className="qm-backdrop" onClick={close}>
          <div
            ref={dialogRef}
            className="qm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qm-title"
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
          >
            <div className="qm-head">
              <div>
                <h2 id="qm-title" className="brig">Get your solar quote on WhatsApp</h2>
                <p>Five quick answers. It takes about 30 seconds.</p>
              </div>
              <button type="button" onClick={close} aria-label="Close" className="qm-close">
                <X size={20} />
              </button>
            </div>
            <QuoteForm prefill={prefill} onSent={close} />
          </div>
        </div>
      )}
    </QuoteContext.Provider>
  );
}
