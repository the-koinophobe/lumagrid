import type { Metadata } from "next";
import StatePage from "@/components/locations/StatePage";
import { STATES } from "@/lib/states";

export const metadata: Metadata = {
  title: "Solar Installation in Delta State | Warri, Asaba, Sapele, Ughelli",
  description:
    "LumaGrid Solar installs solar systems across Delta State. Warri, Asaba, Sapele, Ughelli, Abraka, and all 25 LGAs. Residential, commercial, and off-grid solutions. Free site assessment.",
  openGraph: {
    title: "Solar Installation in Delta State — LumaGrid Solar",
    description:
      "Professional solar installation in Warri, Asaba, Sapele, Ughelli and all of Delta State. Cut your diesel bill. Free site assessment.",
    url: "https://lumagridsolar.com/locations/delta",
      },
  alternates: {
    canonical: "https://lumagridsolar.com/locations/delta",
  },
};

export default function Page() {
  return <StatePage s={STATES.delta} />;
}