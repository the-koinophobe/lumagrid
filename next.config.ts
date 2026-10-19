import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
