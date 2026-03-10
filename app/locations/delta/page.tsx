import type { Metadata } from "next";
import DeltaStatePage from "./DeltaStatePage";

export const metadata: Metadata = {
  title: "Solar Installation in Delta State | Warri, Asaba & Beyond | LumaGrid Solar",
  description:
    "LumaGrid Solar installs solar systems across Delta State. Warri, Asaba, Sapele, Ughelli, Abraka, and all 25 LGAs. Residential, commercial, and off-grid solutions. Free site assessment.",
  openGraph: {
    title: "Solar Installation in Delta State — LumaGrid Solar",
    description:
      "Professional solar installation in Warri, Asaba, Sapele, Ughelli and all of Delta State. Cut your diesel bill. Free site assessment.",
    url: "https://lumagridsolar.com/locations/delta",
    images: [{ url: "/og/delta.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lumagridsolar.com/locations/delta",
  },
};

export default function Page() {
  return <DeltaStatePage />;
}