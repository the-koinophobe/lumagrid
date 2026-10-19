"use client";

import { useState } from "react";
import { useQuote } from "@/components/quote/QuoteProvider";
import { WhatsAppIcon } from "@/components/ui";
import { ArrowRight, Clock, Shield } from "@/components/ui/icons";
import type { BuildingType, QuoteState } from "@/lib/quote";

const STATES: QuoteState[] = ["Rivers", "Delta", "Bayelsa"];
const BUILDINGS: [BuildingType, string][] = [
  ["Bungalow", "Bungalow"],
  ["Upstairs (storey building)", "Upstairs"],
  ["Shop / office / business", "Shop / office"],
];

/**
 * Two-tap quote starter in the hero (the Sunrun / Octopus pattern): pick a
 * state and a building type, then the full prequalification form opens with
 * both already filled in. Starting the form on the page converts far better
 * than a button that opens it cold.
 */
export default function HeroQuote() {
  const openQuote = useQuote();
  const [state, setState] = useState<QuoteState | undefined>();
  const [building, setBuilding] = useState<BuildingType | undefined>();

  return (
    <div className="hq">
      <p className="hq__title">Get your free solar quote</p>
      <p className="hq__sub">Two taps to start. Reply on WhatsApp within 24 hours.</p>

      <fieldset className="hq__field">
        <legend>Where is the property?</legend>
        <div className="hq__opts">
          {STATES.map(s => (
            <button key={s} type="button" aria-pressed={state === s} className={`hq__opt${state === s ? " on" : ""}`} onClick={() => setState(s)}>
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="hq__field">
        <legend>What kind of building?</legend>
        <div className="hq__opts">
          {BUILDINGS.map(([value, label]) => (
            <button key={value} type="button" aria-pressed={building === value} className={`hq__opt${building === value ? " on" : ""}`} onClick={() => setBuilding(value)}>
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <button type="button" className="btn btn--lime btn--lg" style={{ width: "100%" }} onClick={() => openQuote({ source: "Homepage hero quote starter", state, building })}>
        <WhatsAppIcon size={19} color="var(--ink)" /> Continue <ArrowRight size={17} />
      </button>

      <div className="hq__trust">
        <span><Shield size={14} /> Free site assessment</span>
        <span><Clock size={14} /> Installed in 1–2 days</span>
      </div>
    </div>
  );
}
