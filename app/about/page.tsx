import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About Us | Solar Installers in Port Harcourt, Rivers State",
  description:
    "LumaGrid Solar was founded in the Niger Delta by people who lived Nigeria's power problem firsthand. We install honest, reliable solar systems across Rivers, Delta, and Bayelsa States.",
  openGraph: {
    title: "About LumaGrid Solar — Niger Delta's Trusted Solar Installer",
    description:
      "We got tired of waiting for light that never comes. LumaGrid Solar installs real solar systems for homes and businesses across Rivers, Delta, and Bayelsa States.",
    url: "https://lumagridsolar.com/about",
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lumagridsolar.com/about",
  },
};

export default function Page() {
  return <AboutPage />;
}