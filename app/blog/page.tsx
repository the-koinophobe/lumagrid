import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogPage from "./BlogPage";

export const metadata: Metadata = {
  title: "Solar Energy Blog | Tips, Guides & News | LumaGrid Solar",
  description:
    "Solar tips, power planning guides, and energy news written for Nigerian homes and businesses. Learn how to size a system, cut generator costs, and get the most from solar in the Niger Delta.",
  openGraph: {
    title: "LumaGrid Solar Blog — Solar Tips & Guides for Nigeria",
    description:
      "Practical solar advice written for Rivers State, Delta State, and Bayelsa. How to size a system, battery choices, and more.",
    url: "https://lumagridsolar.com/blog",
    images: [{ url: "/og/blog.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://lumagridsolar.com/blog",
  },
};

export default function Page() {
  const posts = getAllPosts();
  console.log("Posts found:", posts.length, posts.map(p => p.slug));
  return <BlogPage posts={posts} />;
}