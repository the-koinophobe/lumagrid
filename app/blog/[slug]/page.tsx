import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function generateStaticParams() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return {};

  const { data } = matter(fs.readFileSync(filePath, "utf-8"));
  const title: string | undefined = data.title;
  const description: string | undefined = data.description ?? data.excerpt;
  const url = `https://lumagridsolar.com/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "LumaGrid Solar",
      locale: "en_NG",
      publishedTime: data.date,
      authors: [data.author ?? "LumaGrid Solar"],
      images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "100px 24px 80px" }}>
        <article className="prose">
          <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>
      </div>
      <Footer />
    </>
  );
}