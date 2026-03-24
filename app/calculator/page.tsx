import type { Metadata } from "next";
import CalculatorPage from "./CalculatorPage";

export const metadata: Metadata = {
  title: "Free Solar Sizing Calculator | LumaGrid Solar",
  description:
    "Find out exactly what solar system you need for your home or business in Rivers State, Delta State, or Bayelsa. Add your appliances and get an instant panel, battery, and inverter recommendation.",
  alternates: { canonical: "https://lumagridsolar.com/calculator" },
  openGraph: {
    title: "Free Solar Sizing Calculator — LumaGrid Solar",
    description:
      "Size your solar system in 3 steps. Add appliances, set daily hours, get your recommendation instantly. Built for Niger Delta conditions.",
    url: "https://lumagridsolar.com/calculator",
    images: [{ url: "/og/calculator.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <CalculatorPage />;
}