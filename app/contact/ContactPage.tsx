import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import QuoteForm from "@/components/quote/QuoteForm";
import { FaqList, PageHero, SectionHead } from "@/components/site/blocks";
import { Phone, Mail, Clock, MapPin, Facebook, Star, ArrowUpRight } from "@/components/ui/icons";
import { EMAIL, FACEBOOK_URL, GBP_MAP_URL, GBP_REVIEW_URL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/constants";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const CONTACT_PREFILL = { source: "Contact page form" };

const FAQS = [
  { q: "How fast do you reply?", a: "Usually within a few hours during business hours, and always within 24 hours. WhatsApp is the fastest way to reach us." },
  { q: "Is the site assessment really free?", a: "Yes. We visit, check your loads, roof and wiring, and send an itemised quote. There is no charge and no obligation." },
  { q: "Do you install outside Port Harcourt?", a: "Yes. We cover Rivers, Delta and Bayelsa States. Any transport cost for sites outside Port Harcourt is shown on your quote before you pay." },
  { q: "Can I visit your office?", a: "Message us first so we can make sure someone is available. Most customers never need to visit: we come to you for the free site assessment." },
];

const row: React.CSSProperties = { display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 0", borderTop: "1px solid var(--line)" };
const ic: React.CSSProperties = { width: 42, height: 42, borderRadius: 12, background: "var(--green-light)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }])} />
      <JsonLd data={faqSchema(FAQS)} />
      <Navbar />

      <PageHero
        eyebrow="Let's talk solar"
        title={<>Contact LumaGrid Solar for a <span className="hl">Free Solar Quote</span></>}
        lead="Answer five quick questions and we open WhatsApp with your details filled in, so our first reply is a real recommendation. Prefer to talk? Call us."
        image="/images/real/solar-panels-on-the-roof.jpeg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
      />

      <section className="sec sec--sand" style={{ paddingTop: 48 }}>
        <div className="wrap contact-grid">
          <div className="card reveal" style={{ padding: "26px 22px" }}>
            <h2 className="h3" style={{ fontSize: 24, marginBottom: 6 }}>Get a solar installation quote</h2>
            <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.6, marginBottom: 22 }}>
              Free site assessment. Itemised quote. No obligation.
            </p>
            <QuoteForm prefill={CONTACT_PREFILL} restore={false} />
          </div>

          <aside className="reveal" style={{ "--d": ".1s" } as React.CSSProperties}>
            <div className="card">
              <h2 className="h3" style={{ marginBottom: 6 }}>Call, email or visit LumaGrid Solar</h2>
              <a href={`tel:${PHONE_E164}`} style={row}>
                <span style={ic}><Phone size={19} /></span>
                <span><strong>Call or WhatsApp</strong><br /><span className="muted">{PHONE_DISPLAY}</span></span>
              </a>
              <a href={`mailto:${EMAIL}`} style={row}>
                <span style={ic}><Mail size={19} /></span>
                <span><strong>Email</strong><br /><span className="muted">{EMAIL}</span></span>
              </a>
              <div style={row}>
                <span style={ic}><Clock size={19} /></span>
                <span><strong>Business hours</strong><br /><span className="muted">Mon–Fri 8am–6pm · Sat 9am–4pm · Sun closed</span></span>
              </div>
              <a href={GBP_MAP_URL} target="_blank" rel="noopener noreferrer" style={row}>
                <span style={ic}><MapPin size={19} /></span>
                <span><strong>Port Harcourt, Rivers State</strong><br /><span className="muted">Serving Rivers, Delta & Bayelsa · Open in Google Maps</span></span>
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={row}>
                <span style={ic}><Facebook size={19} /></span>
                <span><strong>Facebook</strong><br /><span className="muted">LumaGrid Solar</span></span>
              </a>
            </div>
            <a href={GBP_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="card card--hover" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
              <span style={{ ...ic, background: "#fef3c7" }}><Star size={19} /></span>
              <span style={{ flex: 1 }}><strong>Already a customer?</strong><br /><span className="muted" style={{ fontSize: 14 }}>Leave us a Google review. It helps your neighbours choose well.</span></span>
              <ArrowUpRight size={18} />
            </a>
          </aside>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap wrap--narrow">
          <SectionHead eyebrow="FAQ" title="Solar quote FAQs" center />
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <Footer />
    </>
  );
}
