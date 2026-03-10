import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact LumaGrid Solar | Get a Free Solar Quote in Nigeria",
  description:
    "Contact LumaGrid Solar for a free site assessment and solar quote. We serve Rivers State, Delta State, and Bayelsa State. Reach us on WhatsApp, phone, or in person in Port Harcourt.",
  openGraph: {
    title: "Contact LumaGrid Solar — Free Quote, No Obligation",
    description:
      "Get a free solar assessment for your home or business. We cover Rivers, Delta, and Bayelsa States. Fast response on WhatsApp.",
    url: "https://lumagridsolar.com/contact",
    images: [{ url: "/og/contact.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lumagridsolar.com/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}