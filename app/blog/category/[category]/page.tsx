import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "@/components/blog/BlogIndex";
import JsonLd from "@/components/seo/JsonLd";
import { categorySlug, getAllPosts, getCategories } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map(c => ({ category: c.slug }));
}

const INTRO: Record<string, string> = {
  "comparisons": "Side-by-side comparisons to help you choose: lithium vs tubular, mono vs poly, 3kVA vs 5kVA, solar vs generator and more.",
  "costs-and-savings": "What solar costs in Port Harcourt, Warri and Yenagoa, what drives the price, and how fast it pays you back.",
  "system-sizing": "How big a system you need for your fridge, AC, pump or whole house, with simple formulas and examples.",
  "batteries-and-inverters": "Lithium vs lead-acid, how long batteries last, BMS, inverter types and how to buy safely.",
  "local-guides": "Solar for the Niger Delta: landlords, lodges, churches, schools, floods, soot, salt air and PHED/BEDC outages.",
  "installation-and-maintenance": "Cleaning, troubleshooting, safety and how to keep a solar system healthy for years.",
  "buying-guides": "How to spot fakes, read a quote, check warranties and choose an installer you can trust.",
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategories().find(c => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name}: Solar Guides for Nigeria`,
    description: INTRO[cat.slug] ?? `${cat.count} LumaGrid Solar guides on ${cat.name.toLowerCase()} for Rivers, Delta and Bayelsa.`,
    alternates: { canonical: `${SITE_URL}/blog/category/${cat.slug}` },
    openGraph: { url: `${SITE_URL}/blog/category/${cat.slug}`, images: [{ url: "/og/default.jpg", width: 1200, height: 630 }] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategories().find(c => c.slug === category);
  if (!cat) notFound();
  const posts = getAllPosts().filter(p => categorySlug(p.category) === cat.slug);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Guides", href: "/blog" }, { name: cat.name, href: `/blog/category/${cat.slug}` }])} />
      <BlogIndex
        posts={posts}
        activeSlug={cat.slug}
        title={<>{cat.name}</>}
        lead={INTRO[cat.slug] ?? `${cat.count} guides.`}
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/blog" }, { name: cat.name }]}
      />
    </>
  );
}
