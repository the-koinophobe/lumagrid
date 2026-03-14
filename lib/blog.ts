import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverGradient: string;
  coverEmoji: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        date: data.date,
        readTime: data.readTime,
        coverGradient: data.coverGradient ?? "linear-gradient(135deg, #0d5c3a 0%, #00c06a 100%)",
        coverEmoji: data.coverEmoji ?? "☀️",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}