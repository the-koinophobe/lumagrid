import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Solar Installation Services | Residential, Commercial & Maintenance | LumaGrid Solar",
  description:
    "LumaGrid Solar offers residential and commercial solar installation, maintenance, and gel-to-lithium battery upgrades across Rivers State, Delta State, and Bayelsa State. Free site assessment.",
  keywords: [
    "solar installation Rivers State",
    "solar panels Port Harcourt",
    "commercial solar Nigeria",
    "residential solar installation",
    "solar maintenance Nigeria",
    "lithium battery upgrade Nigeria",
    "gel to lithium battery upgrade",
    "solar power Delta State",
    "solar Bayelsa State",
    "inverter installation Nigeria",
  ],
  openGraph: {
    title: "Solar Services — Installation, Maintenance & Battery Upgrades | LumaGrid Solar",
    description:
      "Residential solar, commercial systems, ongoing maintenance, and lithium battery upgrades across Rivers, Delta, and Bayelsa States. Free site assessment.",
    url: "https://lumagridsolar.com/services",
    images: [{ url: "/og/services.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lumagridsolar.com/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}