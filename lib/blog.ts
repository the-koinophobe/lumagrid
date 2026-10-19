import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description, also the lead paragraph under the H1. */
  description: string;
  /** Card text on the blog index. Falls back to the description. */
  excerpt: string;
  category: string;
  date: string;
  updated: string;
  readTime: string;
  tags: string[];
  coverGradient: string;
  image?: string;
}

export interface BlogPostFull extends BlogPost {
  content: string;
  /** Two-to-three sentence direct answer shown above the article. */
  summary?: string;
  /** Key facts for the TL;DR box at the top of the post. */
  tldr: string[];
  faqs: BlogFaq[];
  related: string[];
  ctaTitle?: string;
  ctaText?: string;
  /** Key into lib/images.ts. */
  image?: string;
}

function toPost(slug: string, data: Record<string, unknown>): BlogPost {
  const description = String(data.description ?? data.excerpt ?? "");
  return {
    slug,
    title: String(data.title ?? slug),
    description,
    excerpt: String(data.excerpt ?? description),
    category: String(data.category ?? "Solar Guides"),
    date: String(data.date),
    updated: String(data.updated ?? data.date),
    readTime: String(data.readTime ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverGradient: String(data.coverGradient ?? "linear-gradient(135deg, #08150f 0%, #2b4a37 100%)"),
    image: data.image ? String(data.image) : undefined,
  };
}

export function getAllSlugs(): string[] {
  return fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx")).map(f => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map(slug => {
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8"));
      return toPost(slug, data);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): BlogPostFull | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  const faqs = Array.isArray(data.faqs)
    ? (data.faqs as { q: unknown; a: unknown }[]).map(f => ({ q: String(f.q), a: String(f.a) }))
    : [];
  return {
    ...toPost(slug, data),
    content,
    summary: data.summary ? String(data.summary) : undefined,
    tldr: Array.isArray(data.tldr) ? data.tldr.map(String) : [],
    faqs,
    related: Array.isArray(data.related) ? data.related.map(String) : [],
    ctaTitle: data.ctaTitle ? String(data.ctaTitle) : undefined,
    ctaText: data.ctaText ? String(data.ctaText) : undefined,
  };
}

/**
 * Hand-picked related posts first, then the posts sharing the most tags or
 * the same category. Always returns `count` posts when enough exist.
 */
export function getRelatedPosts(post: BlogPostFull, count = 3): BlogPost[] {
  const all = getAllPosts().filter(p => p.slug !== post.slug);
  const picked = post.related
    .map(slug => all.find(p => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p));
  const tagSet = new Set(post.tags.map(t => t.toLowerCase()));
  const scored = all
    .filter(p => !picked.includes(p))
    .map(p => ({
      p,
      score:
        p.tags.filter(t => tagSet.has(t.toLowerCase())).length +
        (p.category === post.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map(x => x.p);
  return [...picked, ...scored].slice(0, count);
}
