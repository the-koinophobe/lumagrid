"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { Copy, Check } from "@/components/ui/icons";
import { WhatsAppIcon } from "@/components/ui";

/** Thin lime reading-progress bar pinned to the top of the viewport. */
export function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById("read-progress");
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      bar?.style.setProperty("--p", String(Math.min(1, Math.max(0, p))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" aria-hidden><span id="read-progress" /></div>;
}

/** Highlights the table-of-contents entry for the section being read. */
export function TocSpy() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".toc a[href^='#']"));
    const heads = links.map(a => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean) as HTMLElement[];
    if (!heads.length) return;
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.toggle("on", a.hash === `#${e.target.id}`));
        }
      }
    }, { rootMargin: "-20% 0px -70% 0px" });
    heads.forEach(h => io.observe(h));
    return () => io.disconnect();
  }, []);
  return null;
}

/** Share to WhatsApp / Facebook, or copy the link. People forward guides on WhatsApp a lot. */
export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(`${title}\n${url}`);
  return (
    <div className="share" aria-label="Share this guide">
      <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--muted)", marginRight: 4 }}>Share:</span>
      <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noopener noreferrer" onClick={() => track("share", { via: "whatsapp" })}>
        <WhatsAppIcon size={16} color="#25d366" /> WhatsApp
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" onClick={() => track("share", { via: "facebook" })}>
        Facebook
      </a>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
          track("share", { via: "copy" });
        }}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
