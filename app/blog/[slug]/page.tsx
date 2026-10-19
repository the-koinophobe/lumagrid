import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import { WhatsAppIcon, Check } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
import { getAllSlugs, getPost, getRelatedPosts } from "@/lib/blog";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getImage } from "@/lib/images";
import PostImage from "@/components/blog/PostImage";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://lumagridsolar.com/blog/${slug}`;
  const image = getImage(post.image).src;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: "LumaGrid Solar",
      locale: "en_NG",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ["LumaGrid Solar"],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [image] },
  };
}

/** Components available inside every MDX post. */
const mdxComponents = {
  Check,
  WhatsAppButton,
  Link,
  /** Inline quote button for the middle of a post. */
  QuoteButton: ({ source, children }: { source: string; children?: React.ReactNode }) => (
    <p>
      <WhatsAppButton source={source} className="btn-wa">
        <WhatsAppIcon size={18} /> {children ?? "Get a quote on WhatsApp"}
      </WhatsAppButton>
    </p>
  ),
};

const LOCAL_LINKS = [
  ["Port Harcourt", "/solar-installation/port-harcourt"],
  ["Obio-Akpor", "/solar-installation/obio-akpor"],
  ["Eleme", "/solar-installation/eleme"],
  ["Warri", "/solar-installation/warri"],
  ["Effurun", "/solar-installation/effurun"],
  ["Asaba", "/solar-installation/asaba"],
  ["Yenagoa", "/solar-installation/yenagoa"],
  ["Rivers State", "/locations/rivers"],
  ["Delta State", "/locations/delta"],
  ["Bayelsa State", "/locations/bayelsa"],
] as const;

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const updated = post.updated !== post.date;

  return (
    <>
      <JsonLd
        data={articleSchema({
          slug,
          title: post.title,
          description: post.description,
          date: post.date,
          updated: post.updated,
          tags: post.tags,
          image: getImage(post.image).src,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ])}
      />
      {post.faqs.length > 0 && <JsonLd data={faqSchema(post.faqs)} />}

      <Navbar solid />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "100px 20px 80px" }}>
        <nav aria-label="Breadcrumb" className="crumbs light">
          <Link href="/">Home</Link> <span>/</span> <Link href="/blog">Blog</Link> <span>/</span>
          <span>{post.category}</span>
        </nav>

        <header className="blog-hero" style={{ marginTop: 18 }}>
          <span className="tag">{post.category}</span>
          <h1 className="brig">{post.title}</h1>
          <p className="blog-lead">{post.description}</p>
          <div className="blog-meta">
            <span>By LumaGrid Solar, Port Harcourt</span>
            <span className="divider-dot">·</span>
            <span>{post.readTime}</span>
            <span className="divider-dot">·</span>
            <time dateTime={post.updated}>{updated ? `Updated ${formatDate(post.updated)}` : formatDate(post.date)}</time>
          </div>
        </header>

        {(post.summary || post.tldr.length > 0) && (
          <aside className="quick-answer" aria-label="TL;DR summary">
            <strong>TL;DR</strong>
            {post.summary && <p>{post.summary}</p>}
            {post.tldr.length > 0 && (
              <ul>
                {post.tldr.map(t => <li key={t}>{t}</li>)}
              </ul>
            )}
          </aside>
        )}

        <PostImage image={getImage(post.image)} priority />

        <article className="prose">
          <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>

        {post.faqs.length > 0 && (
          <section className="blog-faq">
            <h2 className="brig">Frequently asked questions</h2>
            <div className="faq-list">
              {post.faqs.map(f => (
                <details key={f.q}>
                  <summary className="brig">{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="blog-cta">
          <h3 className="brig">{post.ctaTitle ?? "Want a system sized for your home?"}</h3>
          <p>
            {post.ctaText ??
              "Tell us your state, area, building type and what you want to power. We reply on WhatsApp with a recommendation and book a free site assessment anywhere in Rivers, Delta or Bayelsa."}
          </p>
          <WhatsAppButton source={`Blog: ${post.title}`} className="btn-wa">
            <WhatsAppIcon size={18} /> Get a quote on WhatsApp
          </WhatsAppButton>
        </div>

        {related.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <h2 className="brig" style={{ fontSize: 22, fontWeight: 800, marginBottom: 14 }}>Keep reading</h2>
            <ul className="guide-list">
              {related.map(r => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`}>
                    <span>{r.title}</span> <ArrowRight size={15} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section style={{ marginTop: 40 }}>
          <h2 className="brig" style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>Solar installation near you</h2>
          <ul className="area-chips">
            {LOCAL_LINKS.map(([label, href]) => (
              <li key={href} style={{ padding: 0 }}>
                <Link href={href} style={{ display: "inline-block", padding: "6px 12px" }}>Solar in {label}</Link>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 6 }}>
            <Link href="/pricing" style={{ textDecoration: "underline" }}>Solar prices</Link> ·{" "}
            <Link href="/calculator" style={{ textDecoration: "underline" }}>Solar calculator</Link> ·{" "}
            <Link href="/solar-installation" style={{ textDecoration: "underline" }}>All towns we cover</Link>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
