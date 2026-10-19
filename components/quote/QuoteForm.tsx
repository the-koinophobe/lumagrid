"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { WhatsAppIcon } from "@/components/ui";
import {
  AREA_SUGGESTIONS, BUILDING_TYPES, EMPTY_ANSWERS, PAYMENT_OPTIONS, POWER_OPTIONS, QUOTE_STATES,
  buildQuoteMessage, firstProblem, loadSavedAnswers, saveAnswers, whatsappHref,
  type QuoteAnswers, type QuotePrefill, type QuoteProblem,
} from "@/lib/quote";

const PROMPTS: Record<QuoteProblem, string> = {
  state: "Pick your state",
  area: "Tell us your town or area",
  building: "Tell us the building type",
  power: "Pick what you want to power",
  payment: "Choose how you'll pay",
};

/**
 * The prequalification form behind every WhatsApp button. Used inside the
 * site-wide modal and inline on the contact page.
 */
export default function QuoteForm({
  prefill,
  onSent,
  restore = true,
}: {
  prefill?: QuotePrefill;
  onSent?: () => void;
  /**
   * Fill in answers from the visitor's last submission. Leave off where the
   * form is server-rendered (contact page) so the HTML matches on hydration.
   */
  restore?: boolean;
}) {
  const uid = useId();
  // The modal mounts a fresh form on every open, so the initial state is
  // enough: earlier answers first, then whatever the clicked button knows.
  const [a, setA] = useState<QuoteAnswers>(() => ({
    ...EMPTY_ANSWERS,
    ...(restore ? loadSavedAnswers() : {}),
    ...(prefill?.state ? { state: prefill.state } : {}),
    ...(prefill?.area ? { area: prefill.area } : {}),
    ...(prefill?.power?.length ? { power: prefill.power } : {}),
  }));
  const [touched, setTouched] = useState(false);

  const set = <K extends keyof QuoteAnswers>(k: K, v: QuoteAnswers[K]) => setA(prev => ({ ...prev, [k]: v }));
  const togglePower = (p: string) =>
    set("power", a.power.includes(p) ? a.power.filter(x => x !== p) : [...a.power, p]);

  const problem = firstProblem(a);
  const wantsInstallments = a.payment === "Installments";
  const ready = !problem && !wantsInstallments;
  const href = useMemo(() => whatsappHref(buildQuoteMessage(a, prefill)), [a, prefill]);
  const suggestions = a.state && a.state !== "Other" ? AREA_SUGGESTIONS[a.state] : [];

  return (
    <div className="qf">
      {/* State */}
      <fieldset className="qf-field">
        <legend className="qf-label">Which state is the property in? *</legend>
        <div className="qf-chips">
          {QUOTE_STATES.map(s => (
            <button key={s} type="button" className={`chip${a.state === s ? " on" : ""}`} aria-pressed={a.state === s}
              onClick={() => set("state", s)}>
              {s === "Other" ? "Other state" : s}
            </button>
          ))}
        </div>
        {a.state === "Other" && (
          <input type="text" className="qf-input" placeholder="Which state?" value={a.otherState}
            onChange={e => set("otherState", e.target.value)} style={{ marginTop: 10 }} aria-label="Your state" />
        )}
      </fieldset>

      {/* Area */}
      <div className="qf-field">
        <label className="qf-label" htmlFor={`${uid}-area`}>Town / area *</label>
        <input id={`${uid}-area`} type="text" className="qf-input" list={`${uid}-areas`}
          placeholder={a.state === "Delta" ? "e.g. Effurun, Warri" : a.state === "Bayelsa" ? "e.g. Amarata, Yenagoa" : "e.g. Rumuola, Port Harcourt"}
          value={a.area} onChange={e => set("area", e.target.value)} autoComplete="address-level2" />
        <datalist id={`${uid}-areas`}>
          {suggestions.map(s => <option key={s} value={s} />)}
        </datalist>
      </div>

      {/* Building */}
      <fieldset className="qf-field">
        <legend className="qf-label">Is it a bungalow or an upstairs? *</legend>
        <div className="qf-chips">
          {BUILDING_TYPES.map(b => (
            <button key={b} type="button" className={`chip${a.building === b ? " on" : ""}`} aria-pressed={a.building === b}
              onClick={() => set("building", b)}>
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Power */}
      <fieldset className="qf-field">
        <legend className="qf-label">What would you like to power? * <span className="qf-hint">Pick all that apply</span></legend>
        <div className="qf-chips">
          {POWER_OPTIONS.map(p => (
            <button key={p} type="button" className={`chip${a.power.includes(p) ? " on" : ""}`} aria-pressed={a.power.includes(p)}
              onClick={() => togglePower(p)}>
              {p}
            </button>
          ))}
        </div>
        <input type="text" className="qf-input" placeholder="Anything else? e.g. 2HP AC, welding machine, POS"
          value={a.powerNote} onChange={e => set("powerNote", e.target.value)} style={{ marginTop: 10 }}
          aria-label="Other appliances" />
      </fieldset>

      {/* Payment */}
      <fieldset className="qf-field">
        <legend className="qf-label">How will you pay? *</legend>
        <div className="qf-chips">
          {PAYMENT_OPTIONS.map(p => (
            <button key={p} type="button" className={`chip${a.payment === p ? " on" : ""}`} aria-pressed={a.payment === p}
              onClick={() => {
                set("payment", p);
                if (p === "Installments") track("quote_installments_blocked", { source: prefill?.source ?? "general" });
              }}>
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Name */}
      <div className="qf-field">
        <label className="qf-label" htmlFor={`${uid}-name`}>Your name <span className="qf-hint">optional</span></label>
        <input id={`${uid}-name`} type="text" className="qf-input" placeholder="e.g. Ebiere" value={a.name}
          onChange={e => set("name", e.target.value)} autoComplete="given-name" />
      </div>

      {wantsInstallments ? (
        <div className="qf-stop" role="status">
          <strong>We don&apos;t offer installment plans at the moment.</strong>
          <p>
            If you can make a full payment, switch your answer above and continue. Until then, these
            will help you plan and budget:
          </p>
          <div className="qf-stop-links">
            <Link href="/pricing" onClick={onSent}>Solar prices in 2026</Link>
            <Link href="/calculator" onClick={onSent}>Size your system</Link>
            <Link href="/blog/how-much-does-solar-cost-in-port-harcourt" onClick={onSent}>What drives the cost</Link>
          </div>
        </div>
      ) : (
        <>
          <a
            href={ready ? href : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa"
            aria-disabled={!ready}
            style={{ width: "100%", opacity: ready ? 1 : 0.55, cursor: ready ? "pointer" : "not-allowed" }}
            onClick={e => {
              if (!ready) {
                e.preventDefault();
                setTouched(true);
                return;
              }
              saveAnswers(a);
              track("quote_whatsapp_sent", {
                state: a.state,
                building: a.building,
                source: prefill?.source ?? "general",
              });
              onSent?.();
            }}
          >
            <WhatsAppIcon size={19} /> Continue to WhatsApp
          </a>
          <p className="qf-foot">
            {touched && problem ? <span style={{ color: "#b42318", fontWeight: 600 }}>{PROMPTS[problem]}.</span> : "Your answers go into the chat so we can reply with a real recommendation. Free site assessment."}
          </p>
        </>
      )}
    </div>
  );
}
