// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://lumagridsolar.com", lastModified: new Date(), priority: 1 },
    // ... rest of your URLs
  ];
}