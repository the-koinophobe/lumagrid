import { CITIES, STATE_PAGES, getCity } from "@/lib/cities";
import { OG_SIZE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Solar installation by LumaGrid Solar";

export function generateStaticParams() {
  return CITIES.map(c => ({ city: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getCity(city);
  return ogCard({
    eyebrow: c ? STATE_PAGES[c.state].label : "Niger Delta",
    title: c ? `Solar installation in ${c.name}` : "Solar installation in the Niger Delta",
    footer: "From ₦1.7M · Free site assessment · 2-year warranty",
  });
}
