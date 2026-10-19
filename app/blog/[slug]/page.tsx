import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import WhatsAppButton from "@/components/quote/WhatsAppButton";
import PostImage from "@/components/blog/PostImage";
import PostCard from "@/components/site/PostCard";
import { ReadingProgress, ShareButtons, TocSpy } from "@/components/blog/PostClient";
import { CtaBand, FaqList } from "@/components/site/blocks";
import { WhatsAppIcon, Check } from "@/components/ui";
import { getAllSlugs, getPost, getRelatedPosts, categorySlug } from "@/lib/blog";
import { getImage } from "@/lib/images";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${slug}`;
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
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

/** Same rule on both sides so TOC links match heading ids. */
function headingId(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  return "";
}

const mdxComponents = {
  Check,
  WhatsAppButton,
  Link,
  h2: ({ children }: { children?: React.ReactNode }) => <h2 id={headingId(textOf(children))}>{children}</h2>,
  QuoteButton: ({ source, children }: { source: string; children?: React.ReactNode }) => (
    <p>
      <WhatsAppButton source={source} className="btn btn--wa">
        <WhatsAppIcon size={18} /> {children ?? "Get a quote on WhatsApp"}
      </WhatsAppButton>
    </p>
  ),
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const updated = post.updated !== post.date;
  const url = `${SITE_URL}/blog/${slug}`;
  const toc = [...post.content.matchAll(/^## (.+)$/gm)].map(m => {
    const text = m[1].replace(/\*\*|`/g, "").trim();
    return { text, id: headingId(text) };
  });

  return (
    <>
      <JsonLd data={articleSchema({ slug, title: post.title, description: post.description, date: post.date, updated: post.updated, tags: post.tags, image: getImage(post.image).src })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Guides", href: "/blog" }, { name: post.category, href: `/blog/category/${categorySlug(post.category)}` }, { name: post.title, href: `/blog/${slug}` }])} />
      {post.faqs.length > 0 && <JsonLd data={faqSchema(post.faqs)} />}

      <ReadingProgress />
      <TocSpy />
      <Navbar solid />

      <div className="wrap" style={{ paddingTop: 104, paddingBottom: 40 }}>
        <div className="post-grid">
          <main>
            <nav aria-label="Breadcrumb" className="crumbs light">
              <Link href="/">Home</Link> <span>/</span> <Link href="/blog">Guides</Link> <span>/</span>
              <Link href={`/blog/category/${categorySlug(post.category)}`}>{post.category}</Link>
            </nav>

            <header className="blog-hero" style={{ marginTop: 18 }}>
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
                {post.tldr.length > 0 && <ul>{post.tldr.map(t => <li key={t}>{t}</li>)}</ul>}
              </aside>
            )}

            <PostImage image={getImage(post.image)} priority />

            <article className="prose">
              <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </article>

            {post.faqs.length > 0 && (
              <section className="blog-faq" id="faq">
                <h2 className="brig">Frequently asked questions</h2>
                <FaqList faqs={post.faqs} />
              </section>
            )}

            <div style={{ margin: "32px 0 8px" }}><ShareButtons title={post.title} url={url} /></div>

            <div className="blog-cta">
              <h3 className="brig">{post.ctaTitle ?? "Want a system sized for your home?"}</h3>
              <p>{post.ctaText ?? "Tell us your state, area, building type and what you want to power. We reply on WhatsApp with a recommendation and book a free site assessment anywhere in Rivers, Delta or Bayelsa."}</p>
              <WhatsAppButton source={`Blog: ${post.title}`} className="btn btn--lime btn--lg">
                <WhatsAppIcon size={18} color="var(--ink)" /> Get a quote on WhatsApp
              </WhatsAppButton>
            </div>
          </main>

          <aside className="toc" aria-label="On this page">
            {toc.length > 1 && (
              <>
                <div className="toc__title">On this page</div>
                <ol>
                  {toc.map(t => <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>)}
                  {post.faqs.length > 0 && <li><a href="#faq">FAQs</a></li>}
                </ol>
              </>
            )}
            <div className="toc__cta">
              <strong className="brig" style={{ fontSize: 17 }}>Free site assessment</strong>
              <p>Rivers, Delta and Bayelsa. Itemised quote, no obligation.</p>
              <WhatsAppButton source={`Blog sidebar: ${post.title}`} className="btn btn--lime btn--sm" style={{ width: "100%" }}>
                <WhatsAppIcon size={16} color="var(--ink)" /> Get a quote
              </WhatsAppButton>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="sec sec--sand" style={{ paddingTop: 56 }}>
          <div className="wrap">
            <h2 className="h2" style={{ fontSize: "clamp(26px, 4vw, 36px)", marginBottom: 24 }}>Keep reading</h2>
            <div className="g3">
              {related.map(r => <PostCard key={r.slug} post={r} />)}
            </div>
            <div className="tag-row" style={{ marginTop: 32 }}>
              {[
                ["Port Harcourt", "port-harcourt"], ["Obio-Akpor", "obio-akpor"], ["Warri", "warri"], ["Asaba", "asaba"],
                ["Yenagoa", "yenagoa"], ["Eleme", "eleme"], ["Effurun", "effurun"],
              ].map(([n, s]) => (
                <Link key={s} href={`/solar-installation/${s}`} className="pill">Solar in {n}</Link>
              ))}
              <Link href="/pricing" className="pill pill--lime">Solar prices</Link>
              <Link href="/calculator" className="pill pill--lime">Savings calculator</Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand source={`Blog bottom: ${post.title}`} />
      <Footer />
    </>
  );
}
