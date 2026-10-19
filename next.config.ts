import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // Photos never change in place (new photo = new file name), so cache them hard.
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  async redirects() {
    return [
      // One host only. www served a full duplicate of every page, which split
      // indexing between two copies; send it all to the bare domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lumagridsolar.com" }],
        destination: "https://lumagridsolar.com/:path*",
        permanent: true,
      },
      // Installment financing was withdrawn; send old links and bookmarks to prices.
      { source: "/financing", destination: "/pricing", permanent: true },
      // Old schema URLs pointed here; keep them resolving.
      { source: "/locations/rivers-state", destination: "/locations/rivers", permanent: true },
      { source: "/locations/delta-state", destination: "/locations/delta", permanent: true },
      { source: "/locations/bayelsa-state", destination: "/locations/bayelsa", permanent: true },
      { source: "/locations", destination: "/solar-installation", permanent: true },
    ];
  },
};

export default nextConfig;
