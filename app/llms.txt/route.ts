import { getAllPosts } from "@/lib/blog";
import { CITIES, STATE_PAGES } from "@/lib/cities";
import { FAQS, PACKAGES, PHONE_DISPLAY, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text brief for AI assistants (ChatGPT, Perplexity,
 * Claude, Gemini). Built from the same data as the site so it never drifts.
 */
export function GET() {
  const posts = getAllPosts();
  const lines = [
    "# LumaGrid Solar",
    "",
    "> LumaGrid Solar is a CAC-registered solar installation company based in Port Harcourt, Nigeria. It designs and installs solar panels, pure sine wave hybrid inverters and LiFePO4 lithium batteries for homes and businesses across Rivers State, Delta State and Bayelsa State.",
    "",
    "## Key facts",
    `- Phone / WhatsApp: ${PHONE_DISPLAY}`,
    `- Website: ${SITE_URL}`,
    "- Service area: Rivers State, Delta State and Bayelsa State, Nigeria",
    "- Free site assessment before every quote; itemised quotes naming every brand and model",
    "- Most homes installed in 1 to 2 days",
    "- 2-year workmanship warranty; 10-year panel performance warranty",
    "- Panels: tier-one brands such as Jinko and Longi; batteries: LiFePO4 lithium",
    "- Systems are sized for rainy-season sunshine in the Niger Delta (about 4.4 to 4.6 peak sun hours on average)",
    "",
    "## Packages and prices (installed, 2026)",
    ...PACKAGES.map(p => `- ${p.name} ${p.kva} (${p.label}): ${p.price === "Custom" ? "custom quote" : `from ${p.price}`}. Includes ${p.includes.join(", ")}. Runs ${p.appliances.join(", ")}.`),
    `- Full price guide: ${SITE_URL}/pricing`,
    "",
    "## Towns served",
    ...(Object.keys(STATE_PAGES) as (keyof typeof STATE_PAGES)[]).flatMap(state => [
      `### ${STATE_PAGES[state].label} (${SITE_URL}${STATE_PAGES[state].href})`,
      ...CITIES.filter(c => c.state === state).map(
        c => `- [Solar installation in ${c.name}](${SITE_URL}/solar-installation/${c.slug}): ${c.areas.slice(0, 6).join(", ")}`,
      ),
    ]),
    "",
    "## Frequently asked questions",
    ...FAQS.flatMap(f => [`### ${f.q}`, f.a, ""]),
    "## Guides",
    ...posts.map(p => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    "",
    "## Tools",
    `- [Solar and generator savings calculator](${SITE_URL}/calculator)`,
    `- [Get a quote](${SITE_URL}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
