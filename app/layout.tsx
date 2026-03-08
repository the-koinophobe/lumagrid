import type { Metadata } from "next";
import { Bricolage_Grotesque, Chivo } from "next/font/google";
<meta name="apple-mobile-web-app-title" content="LumaGrid" />
import "@/app/globals.css"

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

  alternates: {
    canonical: "https://lumagridsolar.com",
  },

  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
    // Add more verifications here if needed e.g. bing
  },

  category: "Solar Energy",
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
          Preconnect to Google Fonts for faster font loading.
          The actual @import is in globals.css / component styles.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon set — generate these at realfavicongenerator.net */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#0d5c3a" />
        <meta name="msapplication-TileColor" content="#0d5c3a" />
        <meta name="theme-color" content="#0d5c3a" />
      </head>

      <body
        className={`${bricolage.variable} ${chivo.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
