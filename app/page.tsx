import type { Metadata } from "next";
import LumaGridHome from "@/app/LumaGridHome";

export const metadata: Metadata = {
  title: "Solar Installation in Port Harcourt, Rivers State | LumaGrid Solar",
  description: "LumaGrid installs reliable solar systems across Rivers, Delta, and Bayelsa states. Free site assessment. Genuine panel brands. 2-year warranty. CAC registered.",
  openGraph: {
    title: "LumaGrid Solar — Niger Delta's Trusted Solar Installer",
    description: "Off-grid and hybrid solar systems for homes and businesses across Rivers, Delta, and Bayelsa. Free quote on WhatsApp.",
    url: "https://lumagridsolar.com",
    siteName: "LumaGrid Solar",
    images: [{ url: "/og/homepage.jpg", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
};

export default function Page() {
  return <LumaGridHome />;
}