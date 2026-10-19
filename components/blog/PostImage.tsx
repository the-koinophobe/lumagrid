import Image from "next/image";
import type { SiteImage } from "@/lib/images";

/**
 * Post / page image with photographer credit. Unsplash images are served
 * straight from Unsplash's CDN (already resized), as their license asks.
 */
export default function PostImage({ image, priority = false }: { image: SiteImage; priority?: boolean }) {
  const remote = image.src.startsWith("http");
  return (
    <figure className="post-image">
      <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 12, overflow: "hidden", background: "var(--green-light)" }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 800px) 100vw, 760px"
          style={{ objectFit: "cover" }}
          priority={priority}
          unoptimized={remote}
        />
      </div>
      {image.credit ? (
        <figcaption>
          Photo: <a href={image.creditUrl} target="_blank" rel="noopener noreferrer">{image.credit}</a> on Unsplash
        </figcaption>
      ) : (
        <figcaption>{image.alt}. Photo: LumaGrid Solar</figcaption>
      )}
    </figure>
  );
}
