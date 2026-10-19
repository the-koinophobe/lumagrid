"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = ".reveal:not(.is-in), .reveal-scale:not(.is-in)";

/**
 * One observer for the whole site. Anything with `.reveal` fades up the first
 * time any part of it enters the viewport. Using threshold 0 (not a ratio)
 * matters: a block taller than the screen can never be 12% visible, which is
 * what left the old blog grid stuck at opacity 0.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach(el => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    const scan = () => document.querySelectorAll(SELECTOR).forEach(el => io.observe(el));
    scan();
    // Client-rendered content (filters, modals) can add new .reveal nodes.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [pathname]);

  return null;
}
