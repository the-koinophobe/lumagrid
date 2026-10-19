"use client";

import { useEffect, useState } from "react";
import EnergyFlow from "@/components/site/EnergyFlow";
import { Sun } from "@/components/ui/icons";

const COPY = {
  day: { title: "Daytime", text: "Panels power your home directly and pour the extra into the lithium battery." },
  night: { title: "Night & outages", text: "The battery takes over the moment the sun sets or NEPA takes light. Grid or generator can top it up on long cloudy spells." },
};

/**
 * The energy-flow diagram with a Day / Night switch. It cycles on its own
 * until the visitor touches it, then stays where they put it.
 */
export default function DayNightFlow() {
  const [mode, setMode] = useState<"day" | "night">("day");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setMode(m => (m === "day" ? "night" : "day")), 5200);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (m: "day" | "night") => { setAuto(false); setMode(m); };

  return (
    <div className={`flow-card ef${mode === "night" ? " ef-night" : ""}`}>
      <div className="ef-toggle" role="group" aria-label="Show day or night">
        <button type="button" aria-pressed={mode === "day"} className={mode === "day" ? "on" : ""} onClick={() => pick("day")}>
          <Sun size={15} /> Day
        </button>
        <button type="button" aria-pressed={mode === "night"} className={mode === "night" ? "on" : ""} onClick={() => pick("night")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg> Night
        </button>
      </div>
      <EnergyFlow />
      <p className="ef-caption" aria-live="polite"><strong>{COPY[mode].title}:</strong> {COPY[mode].text}</p>
    </div>
  );
}
