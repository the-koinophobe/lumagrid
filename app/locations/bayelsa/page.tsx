import type { Metadata } from "next";
import StatePage from "@/components/locations/StatePage";
import { STATES } from "@/lib/states";

export const metadata: Metadata = {
  title: "Solar Installation in Bayelsa State | Yenagoa, Ogbia, Amassoma",
  description:
    "LumaGrid Solar installs off-grid and hybrid solar systems across Bayelsa State. Yenagoa, Brass, Nembe, Ogbia, Southern Ijaw, and riverine communities. Free site assessment.",
  openGraph: {
    title: "Solar Installation in Bayelsa State — LumaGrid Solar",
    description:
      "Reliable off-grid solar for Bayelsa's most underserved communities. Yenagoa, Nembe, Brass, Southern Ijaw and beyond. Free site assessment.",
    url: "https://lumagridsolar.com/locations/bayelsa",
      },
  alternates: {
    canonical: "https://lumagridsolar.com/locations/bayelsa",
  },
};

export default function Page() {
  return <StatePage s={STATES.bayelsa} />;
}