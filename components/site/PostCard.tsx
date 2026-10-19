import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { getImage } from "@/lib/images";

function shortDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** Blog card with photo. `wide` is the featured layout on the blog index. */
export default function PostCard({ post, wide = false, priority = false }: { post: BlogPost; wide?: boolean; priority?: boolean }) {
  const img = getImage(post.image);
  const remote = img.src.startsWith("http");
  return (
    <Link href={`/blog/${post.slug}`} className={`pcard${wide ? " pcard--wide" : ""}`}>
      <div className="pcard__img">
        <Image
          src={remote ? img.src.replace("w=1600", wide ? "w=1200" : "w=720") : img.src}
          alt={img.alt}
          fill
          sizes={wide ? "(max-width: 900px) 100vw, 640px" : "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 380px"}
          unoptimized={remote}
          priority={priority}
        />
        <span className="pill pill--lime pcard__cat">{post.category}</span>
      </div>
      <div className="pcard__body">
        <div className="pcard__meta">
          <span>{shortDate(post.updated)}</span>
          {post.readTime && <><span aria-hidden>·</span><span>{post.readTime}</span></>}
        </div>
        <h3 className="pcard__title">{post.title}</h3>
        <p className="pcard__excerpt">{post.excerpt}</p>
      </div>
    </Link>
  );
}
