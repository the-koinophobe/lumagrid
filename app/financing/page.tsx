import type { Metadata } from "next";
import FinancingPage from "./FinancingPage";

export const metadata: Metadata = {
  title: "Solar Financing in Nigeria | Pay Monthly with LumaGrid Solar",
  description:
    "Go solar now and pay over 6, 12, or 24 months. LumaGrid Solar offers flexible financing for homes and businesses across Rivers, Delta, and Bayelsa States. 30% deposit to get started.",
  openGraph: {
    title: "Solar Financing — Install Now, Pay Monthly | LumaGrid Solar",
    description:
      "Don't let upfront cost stop you from going solar. Pay over 6 to 24 months with our financing partner. Serving Rivers, Delta, and Bayelsa States.",
    url: "https://lumagridsolar.com/financing",
    images: [{ url: "/og/financing.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lumagridsolar.com/financing",
  },
};

export default function Page() {
  return <FinancingPage />;
}