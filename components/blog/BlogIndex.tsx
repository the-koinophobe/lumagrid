import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/site/PostCard";
import BlogSearch from "@/components/blog/BlogSearch";
import { CtaBand, PageHero } from "@/components/site/blocks";
import { getCategories, type BlogPost } from "@/lib/blog";

/**
 * Shared layout for /blog and /blog/category/[slug]. Every card is rendered on
 * the server (no fade-in wrapper around the grid) so all posts are visible and
 * crawlable; BlogSearch filters them client-side.
 */
export default function BlogIndex({
  posts, activeSlug, title, lead, crumbs,
}: {
  posts: BlogPost[];
  activeSlug?: string;
  title: React.ReactNode;
  lead: string;
  crumbs: { name: string; href?: string }[];
}) {
  const categories = getCategories();
  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <PageHero eyebrow="Solar guides" title={title} lead={lead} image="/images/real/jinko-panels-delivered-compound.jpeg" crumbs={crumbs} />

      <section className="sec sec--sand" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
            <nav aria-label="Guide categories" className="filterbar">
              <Link href="/blog" className="fchip" aria-current={!activeSlug ? "page" : undefined}>All</Link>
              {categories.map(c => (
                <Link key={c.slug} href={`/blog/category/${c.slug}`} className="fchip" aria-current={activeSlug === c.slug ? "page" : undefined}>
                  {c.name} <span style={{ opacity: .6, marginLeft: 6 }}>{c.count}</span>
                </Link>
              ))}
            </nav>
            <BlogSearch total={posts.length} />
          </div>

          {featured && (
            <div data-post={searchText(featured)} style={{ marginBottom: 22 }}>
              <PostCard post={featured} wide priority />
            </div>
          )}

          <div className="g3">
            {rest.map(p => (
              <div key={p.slug} data-post={searchText(p)}>
                <PostCard post={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand source="Blog index" title="Rather talk to a person?" text="Tell us your area, building type and what you want to power. We reply on WhatsApp with a recommendation and a price range." />
      <Footer />
    </>
  );
}

function searchText(p: BlogPost) {
  return [p.title, p.excerpt, p.category, ...p.tags].join(" ").toLowerCase();
}
