import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);  // remove `data` — not using it here anymore

  return (
    <>
      <Navbar isMobile={false} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "100px 24px 80px" }}>
        <article className="prose">
          <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>
      </div>
      <Footer isMobile={false} isSmall={false} />
    </>
  );
}