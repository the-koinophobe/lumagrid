import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Everything is public. AI crawlers are named explicitly so a future
 * blanket rule can't shut out ChatGPT, Perplexity, Claude or Gemini by
 * accident; being readable by them is how we get recommended in answers.
 */
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "PerplexityBot", "Perplexity-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
