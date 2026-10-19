import { getAllSlugs, getPost } from "@/lib/blog";
import { OG_SIZE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "LumaGrid Solar guide";

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogCard({
    eyebrow: post?.category ?? "Solar guide",
    title: post?.title ?? "Solar guides for the Niger Delta",
    footer: post?.readTime ? `Solar guide · ${post.readTime}` : undefined,
  });
}
