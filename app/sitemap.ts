import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { CITIES, cityImageKey } from "@/lib/cities";
import { SITE_URL } from "@/lib/constants";
import { absoluteImageUrl, getImage } from "@/lib/images";

/**
 * Every indexable URL, on the one canonical host, with honest lastmod dates
 * (Google ignores lastmod that changes on every build). Redirecting URLs
 * such as /financing are deliberately left out.
 *
 * Bump CONTENT_UPDATED when page copy changes.
 */
const CONTENT_UPDATED = new Date("2026-10-19");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts.reduce(
    (max, p) => (new Date(p.updated) > max ? new Date(p.updated) : max),
    CONTENT_UPDATED,
  );
  const img = (key?: string) => [absoluteImageUrl(getImage(key), SITE_URL)];

  const page = (
    path: string,
    priority: number,
    opts: { lastModified?: Date; images?: string[]; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"] } = {},
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: opts.lastModified ?? CONTENT_UPDATED,
    changeFrequency: opts.changeFrequency ?? "monthly",
    priority,
    ...(opts.images ? { images: opts.images } : {}),
  });

  return [
    page("", 1, { images: img("rooftop-array"), changeFrequency: "weekly" }),
    page("/pricing", 0.9),
    page("/services", 0.8),
    page("/calculator", 0.8),
    page("/solar-installation", 0.8),
    page("/locations/rivers", 0.8),
    page("/locations/delta", 0.8),
    page("/locations/bayelsa", 0.8),
    ...CITIES.map(c => page(`/solar-installation/${c.slug}`, 0.7, { images: img(cityImageKey(c)) })),
    page("/blog", 0.7, { lastModified: latestPost, changeFrequency: "weekly" }),
    ...posts.map(p => page(`/blog/${p.slug}`, 0.6, { lastModified: new Date(p.updated), images: img(p.image) })),
    page("/about", 0.5),
    page("/contact", 0.5),
  ];
}
