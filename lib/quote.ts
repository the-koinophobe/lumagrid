import { WHATSAPP_NUMBER } from "./constants";

/**
 * Prequalification for every "Chat on WhatsApp" button on the site.
 *
 * Nobody lands in the WhatsApp inbox without telling us their state, area,
 * building type and what they want to power, so the first reply can be a
 * real answer instead of five questions. Anyone who needs installments is
 * stopped here, before WhatsApp opens.
 */

export type QuoteState = "Rivers" | "Delta" | "Bayelsa" | "Other";

export const QUOTE_STATES: QuoteState[] = ["Rivers", "Delta", "Bayelsa", "Other"];

/** Suggestions for the area field. People can still type anything. */
export const AREA_SUGGESTIONS: Record<Exclude<QuoteState, "Other">, string[]> = {
  Rivers: [
    "GRA, Port Harcourt", "Rumuola, Port Harcourt", "Woji, Port Harcourt", "Trans-Amadi, Port Harcourt",
    "Ada George, Port Harcourt", "Rumuokoro, Obio-Akpor", "Choba, Obio-Akpor", "Rumuodara, Obio-Akpor",
    "Eliozu, Obio-Akpor", "Elelenwo, Obio-Akpor", "D-Line, Port Harcourt", "Old GRA, Port Harcourt",
    "Peter Odili Road, Port Harcourt", "Eneka, Obio-Akpor", "Igwuruta, Ikwerre", "Rumuolumeni, Obio-Akpor",
    "Alesa, Eleme", "Onne, Eleme", "Oyigbo", "Bonny Island", "Okrika", "Ahoada", "Omoku", "Bori",
  ],
  Delta: [
    "Effurun, Uvwie", "Warri GRA", "Okumagba Layout, Warri", "Airport Road, Warri", "Jakpa Road, Effurun",
    "Ekpan, Uvwie", "Enerhen, Warri", "Asaba", "Okpanam, Asaba", "Cable Point, Asaba", "Sapele",
    "Ughelli", "Abraka", "Agbor", "Oghara", "Kwale", "Ozoro", "Oleh", "Burutu", "Koko",
  ],
  Bayelsa: [
    "Yenagoa", "Amarata, Yenagoa", "Opolo, Yenagoa", "Swali, Yenagoa", "Okutukutu, Yenagoa",
    "Edepie, Yenagoa", "Kpansia, Yenagoa", "Agudama-Epie, Yenagoa", "Akenfa, Yenagoa", "Biogbolo, Yenagoa",
    "Amassoma", "Otuoke", "Ogbia", "Kaiama", "Sagbama", "Nembe", "Brass", "Odi",
  ],
};

export const BUILDING_TYPES = [
  "Bungalow",
  "Upstairs (storey building)",
  "Flat in a block",
  "Shop / office / business",
] as const;
export type BuildingType = (typeof BUILDING_TYPES)[number];

export const POWER_OPTIONS = [
  "Lights & fans",
  "TV & decoder",
  "Fridge / freezer",
  "1 air conditioner",
  "2+ air conditioners",
  "Water pump / borehole",
  "Washing machine",
  "Pressing iron",
  "Microwave / kettle",
  "Whole house",
  "Shop or office equipment",
  "Cold room / deep freezers",
] as const;

export const PAYMENT_OPTIONS = ["Full payment", "Installments"] as const;
export type PaymentOption = (typeof PAYMENT_OPTIONS)[number];

export interface QuoteAnswers {
  name: string;
  state: QuoteState | "";
  otherState: string;
  area: string;
  building: BuildingType | "";
  power: string[];
  powerNote: string;
  payment: PaymentOption | "";
}

export interface QuotePrefill {
  state?: QuoteState;
  area?: string;
  building?: BuildingType;
  power?: string[];
  /** What the visitor clicked on, e.g. "Family 6KVA package". Goes into the message. */
  source?: string;
  /** Extra block appended to the message, e.g. calculator results. */
  extra?: string;
}

export const EMPTY_ANSWERS: QuoteAnswers = {
  name: "", state: "", otherState: "", area: "", building: "", power: [], powerNote: "", payment: "",
};

export type QuoteProblem = "state" | "area" | "building" | "power" | "payment";

/** First unanswered required question, or null when the form is complete. */
export function firstProblem(a: QuoteAnswers): QuoteProblem | null {
  if (!a.state || (a.state === "Other" && !a.otherState.trim())) return "state";
  if (!a.area.trim()) return "area";
  if (!a.building) return "building";
  if (a.power.length === 0 && !a.powerNote.trim()) return "power";
  if (!a.payment) return "payment";
  return null;
}

export function stateLabel(a: QuoteAnswers): string {
  if (a.state === "Other") return a.otherState.trim();
  return a.state ? `${a.state} State` : "";
}

export function buildQuoteMessage(a: QuoteAnswers, prefill?: QuotePrefill): string {
  const power = [...a.power, a.powerNote.trim()].filter(Boolean).join(", ");
  const lines = [
    "Hello LumaGrid, I'd like a solar quote.",
    "",
    a.name.trim() ? `*Name:* ${a.name.trim()}` : null,
    `*State:* ${stateLabel(a)}`,
    `*Location:* ${a.area.trim()}`,
    `*Building:* ${a.building}`,
    `*I want to power:* ${power}`,
    `*Payment:* ${a.payment}`,
    prefill?.extra ? `\n${prefill.extra}` : null,
    // Tells us which button or page brought the lead in.
    prefill?.source ? `\n_Sent from: ${prefill.source}_` : null,
  ].filter((l): l is string => l !== null);
  return lines.join("\n");
}

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const STORAGE_KEY = "lg-quote-answers";

export function loadSavedAnswers(): Partial<QuoteAnswers> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<QuoteAnswers>) : {};
  } catch {
    return {};
  }
}

export function saveAnswers(a: QuoteAnswers) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    /* private mode — nothing to do */
  }
}
