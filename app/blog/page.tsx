import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogIndex from "@/components/blog/BlogIndex";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Solar Guides for Nigeria | Prices, Batteries, Sizing & Local Tips",
  description:
    "Plain-English solar guides for Port Harcourt, Warri, Asaba and Yenagoa: prices, lithium vs tubular batteries, how many panels you need, inverter sizes and local tips for Rivers, Delta and Bayelsa.",
  openGraph: {
    title: "LumaGrid Solar Guides: Solar Answers for the Niger Delta",
    description: "Prices, batteries, sizing, comparisons and local guides for Rivers, Delta and Bayelsa.",
    url: `${SITE_URL}/blog`,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function Page() {
  const all = getAllPosts();
  // Lead with the guide most visitors want first.
  const pinned = all.find(p => p.slug === "how-much-does-solar-cost-in-port-harcourt");
  const posts = pinned ? [pinned, ...all.filter(p => p !== pinned)] : all;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Guides", href: "/blog" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "LumaGrid Solar Guides",
          url: `${SITE_URL}/blog`,
          publisher: { "@id": `${SITE_URL}/#organization` },
          blogPost: posts.slice(0, 30).map(p => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.date, dateModified: p.updated })),
        }}
      />
      <BlogIndex
        posts={posts}
        title={<>Solar answers for the <span className="hl">Niger Delta.</span></>}
        lead={`${posts.length} plain-English guides on prices, batteries, sizing and local conditions in Rivers, Delta and Bayelsa.`}
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }]}
      />
    </>
  );
}
