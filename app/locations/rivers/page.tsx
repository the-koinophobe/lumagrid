import type { Metadata } from "next";
import RiversStatePage from "./RiversStatePage";

export const metadata: Metadata = {
  title: "Solar Installation in Rivers State | Port Harcourt & Beyond | LumaGrid Solar",
  description:
    "LumaGrid Solar installs residential and commercial solar systems across Rivers State. Port Harcourt, Obio-Akpor, Bonny, Okrika, Eleme, and all 23 LGAs. Free site assessment.",
  openGraph: {
    title: "Solar Installation in Rivers State — LumaGrid Solar",
    description:
      "Professional solar installation across all of Rivers State. Port Harcourt, Bonny Island, Degema, Obio-Akpor and beyond. Free assessment, genuine brands, real warranties.",
    url: "https://lumagridsolar.com/locations/rivers",
    images: [{ url: "/og/rivers.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lumagridsolar.com/locations/rivers",
  },
};

export default function Page() {
  return <RiversStatePage />;
}