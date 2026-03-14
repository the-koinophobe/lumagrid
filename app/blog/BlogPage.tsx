"use client";

import { useState } from "react";
import Link from "next/link";
import { useBreakpoint } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeIn } from "@/components/ui";

const CATEGORIES = ["All", "Solar Tips", "Power Planning", "News", "Case Studies"] as const;
type Category = (typeof CATEGORIES)[number];

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverGradient: string;
  coverEmoji: string;
}

const CAT_COLORS: Record<string, string> = {
  "Solar Tips": "#00c06a",
  "Power Planning": "#157a4e",
  "News": "#0d5c3a",
  "Case Studies": "#0a4a2e",
};

function PostCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: "0.9rem",
          overflow: "hidden",
          background: "#fff",
          border: "1px solid var(--border)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "box-shadow 0.22s, transform 0.22s",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 16px 40px rgba(13,92,58,0.13)"
            : "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <div
            style={{
              background: post.coverGradient,
              height: "196px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3.5rem",
              transition: "transform 0.35s",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            {post.coverEmoji}
          </div>
          <span
            style={{
              position: "absolute",
              top: "0.8rem",
              left: "0.8rem",
              background: CAT_COLORS[post.category] ?? "var(--green)",
              color: "#fff",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              padding: "0.22rem 0.65rem",
              borderRadius: "2rem",
            }}
          >
            {post.category}
          </span>
        </div>

        <div style={{ padding: "1rem 1.2rem 1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.45rem" }}>
            {post.date} · {post.readTime}
          </p>
          <h3
            className="brig"
            style={{
              fontSize: "0.98rem",
              color: "#1a2e24",
              lineHeight: 1.35,
              marginBottom: "0.55rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
              flex: 1,
            }}
          >
            {post.title}
          </h3>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--muted)",
              lineHeight: 1.65,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage({ posts }: { posts: BlogPost[] }) {
  const { isMobile, isSmall } = useBreakpoint();
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const cols = isMobile ? 1 : isSmall ? 2 : 3;

  return (
    <>
      <Navbar isMobile={isMobile} />

      <section
        style={{
          background: "var(--green)",
          paddingTop: isMobile ? "6rem" : "8rem",
          paddingBottom: isMobile ? "2.5rem" : "3.5rem",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div className="container">
          <FadeIn>
            <span
              className="tag"
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "#fff",
                marginBottom: "1rem",
                display: "inline-block",
              }}
            >
              Blog
            </span>
            <h1
              className="brig"
              style={{
                fontSize: isMobile ? "2.1rem" : "2.9rem",
                lineHeight: 1.15,
                marginBottom: "0.75rem",
              }}
            >
              Solar knowledge for the Niger Delta
            </h1>
            <p
              style={{
                fontSize: "1rem",
                opacity: 0.8,
                maxWidth: "460px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Practical guides, cost breakdowns and real install stories from Rivers, Delta, and Bayelsa.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background: "var(--green-xl)" }}>
        <div className="container">
          <FadeIn>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "2.5rem",
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "0.4rem 1.1rem",
                    borderRadius: "2rem",
                    border: `1.5px solid ${activeCategory === cat ? "var(--green)" : "var(--border)"}`,
                    background: activeCategory === cat ? "var(--green)" : "#fff",
                    color: activeCategory === cat ? "#fff" : "var(--muted)",
                    fontSize: "0.83rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            {filtered.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--muted)", padding: "3rem 0" }}>
                No posts in this category yet. Check back soon.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gap: "1.5rem",
                  alignItems: "start",
                }}
              >
                {filtered.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              style={{
                marginTop: "3.5rem",
                background: "var(--green)",
                borderRadius: "1rem",
                padding: isMobile ? "2rem 1.5rem" : "2rem 2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
                flexWrap: "wrap",
                color: "#fff",
              }}
            >
              <div>
                <p className="brig" style={{ fontSize: "1.15rem", marginBottom: "0.3rem" }}>
                  Want new posts in your WhatsApp?
                </p>
                <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                  Send us a message and we will add you to our update list.
                </p>
              </div>
              
                <a href="https://wa.me/2347059497792?text=Hi%20LumaGrid%2C%20please%20add%20me%20to%20your%20blog%20update%20list."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "#25D366",
                  color: "#fff",
                  padding: "0.75rem 1.4rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Subscribe via WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer isMobile={isMobile} isSmall={isSmall} />
    </>
  );
}