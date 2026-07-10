import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bricolage_Grotesque, Chivo } from "next/font/google";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

// ─── Site-wide default metadata ───────────────────────────────────────────────
// Every page inherits these and can override specific fields via generateMetadata()

export const metadata: Metadata = {
  metadataBase: new URL("https://lumagridsolar.com"),

  title: {
    default: "LumaGrid Solar | Solar Installation in Rivers, Delta & Bayelsa State",
    template: "%s | LumaGrid Solar",
  },

  description:
    "Trusted solar panel installation across Rivers State, Delta State, and Bayelsa State. Off-grid and hybrid systems for homes and businesses. Free site assessment. CAC registered.",

  keywords: [
    "solar installation Port Harcourt",
    "solar panels Rivers State",
    "solar energy Nigeria",
    "solar installation Warri",
    "solar installation Yenagoa",
    "solar installation Asaba",
    "hybrid solar system Nigeria",
    "off-grid solar Niger Delta",
    "solar company Port Harcourt",
    "solar panel price Nigeria",
    "inverter installation Port Harcourt",
    "solar financing Nigeria",
  ],

  authors: [{ name: "LumaGrid Solar", url: "https://lumagridsolar.com" }],
  creator: "LumaGrid Solar",
  publisher: "LumaGrid Solar",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://lumagridsolar.com",
    siteName: "LumaGrid Solar",
    title: "LumaGrid Solar | Solar Installation in Rivers, Delta & Bayelsa",
    description:
      "Reliable solar installation across the Niger Delta. Free site assessment, genuine panel brands, real warranties. Serving Port Harcourt, Warri, Yenagoa and beyond.",
    images: [
      {
        url: "/og/default.jpg",   // 1200x630px — create this image
        width: 1200,
        height: 630,
        alt: "LumaGrid Solar — Professional Solar Installation in Nigeria",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "LumaGrid Solar | Solar Installation in Rivers, Delta & Bayelsa",
    description:
      "Reliable solar installation across the Niger Delta. Free site assessment. CAC registered.",
    images: ["/og/default.jpg"],
  },

  category: "Solar Energy",
};

export const viewport: Viewport = {
  themeColor: "#0d5c3a",
};


const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-chivo",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are self-hosted via next/font — no external font requests.
          Icons and manifest are auto-served by Next from app/ (favicon.ico,
          apple-icon.png, icon0.svg, icon1.png, manifest.json).
        */}
        <LocalBusinessSchema />
      </head>

      <body
        className={`${bricolage.variable} ${chivo.variable} antialiased`}
      >
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
