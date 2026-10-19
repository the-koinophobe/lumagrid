"use client";

import type { QuoteState } from "@/lib/quote";
import { useQuote } from "./QuoteProvider";

/**
 * Drop-in replacement for the old `<a href={WHATSAPP_URL}>` buttons. Opens
 * the prequalification form instead of going straight to WhatsApp.
 */
export default function WhatsAppButton({
  children,
  className,
  style,
  source,
  state,
  area,
  power,
  extra,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  source?: string;
  state?: QuoteState;
  area?: string;
  power?: string[];
  extra?: string;
  onClick?: () => void;
}) {
  const openQuote = useQuote();
  return (
    <button
      type="button"
      className={className}
      style={{ border: className?.includes("btn-outline") ? undefined : "none", cursor: "pointer", ...style }}
      onClick={() => {
        onClick?.();
        openQuote({ source, state, area, power, extra });
      }}
    >
      {children}
    </button>
  );
}
