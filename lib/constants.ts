import type {
  NavLink, Service, Package, GalleryItem,
  Testimonial, FinancingStep, Location, TrustItem, Faq, ProcessStep,
} from "./types";

export const WHATSAPP_NUMBER = "2347059497792";
export const WHATSAPP_MSG = encodeURIComponent(
  "Hello LumaGrid, I'd like a free solar quote for my property."
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
export const GBP_REVIEW_URL = "https://share.google/DtTq8d4ZtcoUOQ1yH";
export const GBP_PROFILE_URL = "https://share.google/tWa3IVR0ETFJ0k8FV";
export const FACEBOOK_URL = "https://facebook.com/lumagrid";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Gallery", href: "#gallery" },
  { label: "Financing", href: "#financing" },
  { label: "Blog", href: "/blog" },
];

export const TRUST_BAR: TrustItem[] = [
  { value: "100%", label: "Genuine panel brands" },
  { value: "2yr", label: "Workmanship warranty" },
  { value: "10yr", label: "Panel performance warranty" },
  { value: "CAC", label: "Registered Nigerian business" },
];

export const SERVICES: Service[] = [
  { icon: "⚡", title: "Residential Solar", desc: "Full off-grid and hybrid systems for homes across the Niger Delta. Designed around your actual load — not guesswork." },
  { icon: "🏭", title: "Commercial Systems", desc: "High-capacity installations for businesses, cold rooms, telecoms, and industrial facilities." },
  { icon: "🔧", title: "Maintenance & Repair", desc: "Regular servicing, panel cleaning, inverter diagnostics, and emergency call-outs across Rivers, Delta, and Bayelsa." },
  { icon: "📊", title: "Energy Audit", desc: "We assess your load, NEPA history, and usage pattern before recommending a system. No upselling. Just the right fit." },
];

export const PACKAGES: Package[] = [
  {
    name: "Starter", label: "1–2 Bedroom", kva: "3.5KVA",
    price: "₦1.8M", priceNote: "from", color: "#157a4e", highlight: false,
    appliances: ["4–6 LED lights", "2 ceiling fans", "TV + decoder", "Phone charging", "Small fridge"],
    includes: ["3.5KVA inverter", "200Ah lithium battery", "4× 400W solar panels", "2-year warranty"],
    ctaMsg: "I'm interested in the Starter 3.5KVA solar package.",
  },
  {
    name: "Family", label: "3–4 Bedroom", kva: "5KVA",
    price: "₦2.8M", priceNote: "from", color: "#0d5c3a", highlight: true, badge: "Most Popular",
    appliances: ["All starter loads", "1× 1.5HP inverter AC", "Washing machine", "Large fridge/freezer", "Security lights"],
    includes: ["5KVA hybrid inverter", "400Ah lithium battery", "8× 400W solar panels", "2-year warranty"],
    ctaMsg: "I'm interested in the Family 5KVA solar package.",
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
  { type: "rooftop", label: "Rooftop Installation — GRA Phase 2, Port Harcourt", img: "/images/Lumagrid-11.jpg" },
  { type: "indoor",  label: "Inverter & Battery Setup — Trans Amadi",             img: "/images/Lumagrid-12.jpg" },
  { type: "rooftop", label: "Rooftop Array — Warri, Delta State",                 img: "/images/Lumagrid-13.jpg" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chukwuemeka O.", location: "GRA Phase 2, Port Harcourt", stars: 5,
    text: "LumaGrid gave me a detailed quote before I paid anything. They showed up on time, finished in two days, and my light bill is basically zero now. These guys are the real deal.",
  },
  {
    name: "Mrs. Adaeze N.", location: "Trans Amadi, Rivers State", stars: 5,
    text: "I was scared of being scammed after hearing stories. But they documented everything — the panels, the inverter brand, the warranty papers. Six months later, still working perfectly.",
  },
  {
    name: "Tunde F.", location: "Warri, Delta State", stars: 5,
    text: "Finally no more generator noise at 2am. The system handles my AC and everything. LumaGrid even came back to check on the installation three weeks after. Highly recommended.",
  },
];

export const FINANCING_STEPS: FinancingStep[] = [
  { step: "01", title: "Get a Quote First", desc: "We size your system and give you a full cost breakdown before any financing conversation begins." },
  { step: "02", title: "Choose Your Plan", desc: "Our financing partner offers 6, 12, and 24-month repayment plans. We'll help you pick what works for your cash flow." },
  { step: "03", title: "Simple Approval", desc: "Straightforward documentation process. No hidden charges. You'll know your monthly payment before signing anything." },
  { step: "04", title: "Install Now, Pay Monthly", desc: "Your system is installed immediately. You start saving on generator costs from day one while spreading the investment." },
];

export const LOCATIONS: Location[] = [
  { state: "Rivers State",  cities: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny", "Okrika"],   color: "#0d5c3a" },
  { state: "Delta State",   cities: ["Warri", "Asaba", "Sapele", "Ughelli", "Abraka"],              color: "#157a4e" },
  { state: "Bayelsa State", cities: ["Yenagoa", "Brass", "Ogbia", "Sagbama", "Ekeremor"],           color: "#1a9460" },
];

export const FAQS: Faq[] = [
  { q: "How much does a solar system cost in Port Harcourt?", a: "A basic 3.5KVA system for a 2-bedroom home typically ranges from ₦1.8M to ₦2.8M depending on battery capacity and panel brand. We provide itemised quotes so you see exactly what you're paying for." },
  { q: "Can solar power an air conditioner in Nigeria?", a: "Yes. A 1.5HP inverter AC on a 5KVA hybrid system is very achievable. We size the system specifically around your AC usage pattern during the site assessment." },
  { q: "Do you install in Warri and Yenagoa?", a: "Yes. We cover Rivers, Delta, and Bayelsa states. Travel costs for sites outside Port Harcourt are discussed upfront — no surprise charges." },
  { q: "What happens if something breaks after installation?", a: "You WhatsApp us. We respond within 24 hours. Our 2-year workmanship warranty covers any installation-related fault at no cost to you." },
  { q: "Can I finance a solar system in Nigeria?", a: "Yes. We work with a financing partner who offers 6, 12, and 24-month repayment plans. You can start with as little as 30% deposit and pay the rest monthly." },
];