import type {
  NavLink, Service, Package, GalleryItem,
  Testimonial, Location, TrustItem, Faq, ProcessStep,
} from "./types";

export const SITE_URL = "https://lumagridsolar.com";
export const BUSINESS_NAME = "LumaGrid Solar";
export const WHATSAPP_NUMBER = "2347059497792";
export const PHONE_E164 = "+2347059497792";
export const PHONE_DISPLAY = "+234 705 949 7792";
export const EMAIL = "info@lumagridsolar.com";
export const INSTAGRAM_URL = "https://instagram.com/lumagrid";
export const GBP_MAP_URL = "https://share.google/DtTq8d4ZtcoUOQ1yH";
export const GBP_PROFILE_URL = "https://share.google/7VtLiGINyLqrUfrf3";
export const GBP_REVIEW_URL  = "https://share.google/7VtLiGINyLqrUfrf3";
export const FACEBOOK_URL = "https://facebook.com/lumagrid";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Prices", href: "/pricing" },
  { label: "Areas", href: "/solar-installation" },
  { label: "Calculator", href: "/calculator" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const TRUST_BAR: TrustItem[] = [
  { value: "100%", label: "Genuine panel brands" },
  { value: "2yr", label: "Workmanship warranty" },
  { value: "10yr", label: "Panel performance warranty" },
  { value: "CAC", label: "Registered Nigerian business" },
];

export const SERVICES: Service[] = [
  { icon: "bolt", title: "Residential Solar", desc: "Full off-grid and hybrid systems for homes across the Niger Delta. Designed around your actual load — not guesswork." },
  { icon: "wrench", title: "Commercial Systems", desc: "High-capacity installations for businesses, cold rooms, telecoms, and industrial facilities." },
  { icon: "clock", title: "Maintenance & Repair", desc: "Regular servicing, panel cleaning, inverter diagnostics, and emergency call-outs across Rivers, Delta, and Bayelsa." },
  { icon: "audit", title: "Energy Audit", desc: "We assess your load, NEPA history, and usage pattern before recommending a system. No upselling. Just the right fit." },
];

// ─── Fuel & cost assumptions (calculator) ─────────────────────────────────────

/**
 * Default petrol pump price, naira per litre.
 *
 * Sourced August 2026 from Port Harcourt pump prices: Dangote gantry ₦1,165,
 * NNPC retail ₦1,255 (Lagos), Matrix Port Harcourt ₦1,220. Retail across PH
 * stations sat in the ₦1,220–1,290 band, so 1,250 is a fair midpoint.
 *
 * ── UPDATE POINT ──────────────────────────────────────────────────────────
 * This is the ONLY place the price is defined. Change the number and the date
 * below, and it updates everywhere — calculator, homepage, and all copy.
 * Visitors can also override it themselves with the in-calculator slider.
 */
export const PETROL_PRICE_NGN = 1250;
export const PETROL_PRICE_ASOF = "August 2026";
export const PETROL_PRICE_NOTE = "Port Harcourt average pump price";

/** Generator servicing: oil, filters, plugs, and typical repairs per year. */
export const GENERATOR_SERVICE_NGN_PER_YEAR = 180_000;

/**
 * Rule-of-thumb install pricing, back-fitted from our own quoted packages
 * (3kVA/3.2kWh ≈ ₦1.7M, 6kVA/8kWh ≈ ₦3.8M). Used to show an estimate RANGE
 * only — every real number still comes from a site assessment.
 */
export const PRICING = {
  perKvaInverter: 110_000,
  perKwhBattery: 220_000,
  perKwPanel: 170_000,
  balanceOfSystem: 250_000,
  /** Estimate is shown as ±this fraction, e.g. "₦3.4M – ₦4.3M". */
  rangeSpread: 0.12,
} as const;

export const PACKAGES: Package[] = [
  {
    name: "Starter", label: "1–2 Bedroom", kva: "3KVA",
    price: "₦1.7M", priceNote: "from", color: "#157a4e", highlight: false,
    appliances: ["4–6 LED lights", "2 ceiling fans", "TV + decoder", "Phone charging", "Small fridge"],
    includes: ["3KVA inverter", "3.2kwh lithium battery", "4× 600W solar panels", "2-year warranty"],
    ctaMsg: "I'm interested in the Starter 3KVA solar package.",
  },
  {
    name: "Family", label: "3–4 Bedroom", kva: "6KVA",
    price: "₦3.8M", priceNote: "from", color: "#0d5c3a", highlight: true, badge: "Most Popular",
    appliances: ["All starter loads", "1× 1.5HP inverter AC", "Washing machine", "Large fridge/freezer", "Security lights"],
    includes: ["6KVA hybrid inverter", "8kwh lithium battery", "8× 600W solar panels", "2-year warranty"],
    ctaMsg: "I'm interested in the Family 6KVA solar package.",
  },
  {
    name: "Premium", label: "Large Home / Office", kva: "10KVA+",
    price: "Custom", priceNote: "", color: "#081210", highlight: false,
    appliances: ["Multiple ACs", "Water pump", "Cold room", "Full office load", "Security system"],
    includes: ["10KVA+ hybrid inverter", "Lithium battery bank", "12+ solar panels", "Extended warranty"],
    ctaMsg: "I'm interested in a Premium 10KVA+ solar system for a large property.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { num: "01", title: "Free Site Assessment", desc: "We visit your property, assess your load requirements and roof condition at zero cost to you." },
  { num: "02", title: "Transparent Proposal", desc: "You receive a full breakdown — panel brand, inverter spec, battery count, warranty terms, and total cost. Line by line." },
  { num: "03", title: "Professional Installation", desc: "Our certified engineers install to spec. Most residential installs are completed within 1–2 days." },
  { num: "04", title: "Handover & Ongoing Support", desc: "We walk you through the system, hand you a warranty document, and stay reachable on WhatsApp after handover." },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { type: "rooftop", label: "", img: "/images/Lumagrid-11.jpg" },
  { type: "rooftop",  label: "", img: "/images/real/jinko-panel.jpeg" },
  { type: "rooftop", label: "", img: "/images/real/jinko-panels.jpeg" },
  { type: "rooftop", label: "", img: "/images/real/longi-solar-panels.jpeg" },
  { type: "indoor",  label: "", img: "/images/real/solar-panels-for-lumagrid-install.jpeg" },
  { type: "indoor", label: "5kwh-6Kva-system-abraka", img: "/images/real/5kwh-6Kva-system-abraka.jpeg" },
  { type: "rooftop", label: "", img: "/images/real/solar-panels-on-the-roof.jpeg" },
  { type: "indoor",  label: "", img: "/images/real/LiFePo4-batteries-in-storage.jpeg" },
  { type: "indoor", label: "", img: "/images/real/movable-LifePo4-batteries.jpeg" },
  { type: "indoor", label: "", img: "/images/real/lumagrid-deriy-batteries-for-solar-installation.jpeg" },
  { type: "indoor",  label: "", img: "/images/Lumagrid-12.jpg" },
  { type: "rooftop", label: "", img: "/images/Lumagrid-13.jpg" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Okoro E.", location: "", stars: 5,
    text: "I'm satisfied with the service rendered by LumaGrid and their technicians. I live in Abraka where the light situation is bad, so I decided to get solar for my house and shop. I contacted them for it and I can say, for sure, they did a great job. The connections were neat and obviously done by people who know what they are doing. Now I don't have to be worrying myself about NEPA bill again. I definitely recommend them to anyone wanting to have solar in their homes and offices",
  },
  {
    name: "Ms. Deborah", location: "", stars: 5,
    text: "I was originally hesitant to patronize LumaGrid for my solar installation as it is a small and barely known brand. But after my experience, I'm happy to say that I have no regrets. The products were quality ones, the customer service top-notch. The installation was smooth and hitch free, and thanks to LumaGrid, I've started enjoying constant electricity without interruption. I highly recommend LumaGrid to anyone looking for quality products and services",
  },
];

export const LOCATIONS: Location[] = [
  { state: "Rivers State",  cities: ["Port Harcourt", "Obio-Akpor", "Eleme", "Oyigbo", "Bonny Island", "Okrika", "Ahoada", "Omoku", "Bori"], color: "#08150f" },
  { state: "Delta State",   cities: ["Warri", "Effurun", "Asaba", "Sapele", "Ughelli", "Abraka", "Agbor"],                                  color: "#14261c" },
  { state: "Bayelsa State", cities: ["Yenagoa", "Amassoma", "Ogbia & Otuoke", "Sagbama", "Kaiama & Odi", "Brass"],                        color: "#20382a" },
];

/**
 * Homepage FAQ, also emitted as FAQPage schema. Answers are written to be
 * quoted on their own (by Google or an AI assistant), so each one names the
 * place, the numbers and LumaGrid without relying on the question.
 */
export const FAQS: Faq[] = [
  { q: "How much does a solar system cost in Port Harcourt?", a: "LumaGrid Solar's installed systems start from about ₦1.7M for a 3kVA inverter with a 3.2kWh lithium battery and four 600W panels, and from about ₦3.8M for a 6kVA system with 8kWh of lithium storage that can run a 1.5HP inverter AC. Every quote is itemised after a free site assessment." },
  { q: "Who installs solar in Port Harcourt, Warri and Yenagoa?", a: "LumaGrid Solar is a CAC-registered solar installer based in Port Harcourt that installs solar panels, hybrid inverters and lithium batteries across Rivers, Delta and Bayelsa States, including Port Harcourt, Obio-Akpor, Eleme, Bonny, Warri, Effurun, Asaba, Sapele, Ughelli, Abraka, Yenagoa, Ogbia and Amassoma." },
  { q: "Can solar power an air conditioner in Nigeria?", a: "Yes. One 1.5HP inverter AC needs at least a 5kVA pure sine wave hybrid inverter, about 3kW to 4kW of panels and enough lithium battery for the hours you run it at night. Our 6kVA package with 8kWh of storage is built for a home with one AC." },
  { q: "Can you install solar on an upstairs building or duplex?", a: "Yes. We install on bungalows, upstairs (storey) buildings, duplexes, blocks of flats and shops. On storey buildings we plan safe roof access, fix the panels to the roof structure and run correctly sized cables to the inverter room." },
  { q: "How long does a solar installation take?", a: "Most homes are installed in one to two days after the free site assessment. Larger commercial systems take three to five days." },
  { q: "Does solar work during the rainy season in the Niger Delta?", a: "Yes. Panels keep producing under cloud at reduced output. We size every system for rainy-season sunshine in Rivers, Delta and Bayelsa, not dry-season peaks, so it keeps up from April to October." },
  { q: "How long do solar batteries last?", a: "The LiFePO4 lithium batteries we install typically last 8 to 15 years with daily use, compared with 1.5 to 3 years for gel and tubular lead-acid batteries." },
  { q: "Do you install in Warri and Yenagoa?", a: "Yes. We cover Rivers, Delta and Bayelsa States. Equipment prices are the same everywhere; any transport cost for sites outside Port Harcourt is shown on your quote before you pay." },
  { q: "What happens if something breaks after installation?", a: "You WhatsApp us and we respond within 24 hours. Our 2-year workmanship warranty covers any installation-related fault at no cost to you, and panels carry a 10-year performance warranty." },
];