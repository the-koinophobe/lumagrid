import Link from "next/link";
import { CITIES, type City } from "@/lib/cities";
import { ArrowRight, MapPin } from "@/components/ui/icons";

/** Grid of links to the town pages for one state (or a hand-picked list). */
export default function TownLinks({
  state,
  slugs,
  title,
  subtitle,
}: {
  state?: City["state"];
  slugs?: string[];
  title: string;
  subtitle?: string;
}) {
  const towns = slugs
    ? slugs.map(s => CITIES.find(c => c.slug === s)).filter((c): c is City => Boolean(c))
    : CITIES.filter(c => c.state === state);

  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container">
        <span className="tag">Towns we cover</span>
        <h2 className="brig section-title">{title}</h2>
        <div className="divider" />
        {subtitle && (
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 620, lineHeight: 1.75, marginBottom: 28 }}>{subtitle}</p>
        )}
        <div className="town-grid">
          {towns.map(c => (
            <Link key={c.slug} href={`/solar-installation/${c.slug}`} className="town-link card-hover">
              <span style={{ color: "var(--green-mid)" }}><MapPin size={17} /></span>
              <span style={{ flex: 1 }}>
                <strong>Solar installation in {c.name}</strong>
                <span className="town-sub">{c.areas.slice(0, 3).join(", ")}</span>
              </span>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
