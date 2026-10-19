import type { Metadata } from "next";
import LumaGridHome from "@/app/LumaGridHome";
import JsonLd from "@/components/seo/JsonLd";
import { FAQS } from "@/lib/constants";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Solar Installation in Port Harcourt, Warri & Yenagoa | LumaGrid Solar" },
  description: "Solar installation in Port Harcourt, Warri, Asaba and Yenagoa. Solar panels, hybrid inverters and lithium batteries from ₦1.7M. Free site assessment, 2-year warranty, CAC registered.",
  alternates: { canonical: "https://lumagridsolar.com" },
  openGraph: {
    title: "LumaGrid Solar — Niger Delta's Trusted Solar Installer",
    description: "Off-grid and hybrid solar systems for homes and businesses across Rivers, Delta, and Bayelsa. Free quote on WhatsApp.",
    url: "https://lumagridsolar.com",
    siteName: "LumaGrid Solar",
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <LumaGridHome />
    </>
  );
}