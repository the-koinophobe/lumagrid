"use client";

import { useEffect, useState } from "react";

/**
 * Filters the server-rendered post grid in place by toggling `hidden` on
 * every [data-post] card. All posts stay in the HTML for search engines;
 * this only changes what the visitor sees.
 */
export default function BlogSearch({ total }: { total: number }) {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(total);

  useEffect(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let n = 0;
    document.querySelectorAll<HTMLElement>("[data-post]").forEach(el => {
      const hay = el.dataset.post ?? "";
      const match = terms.every(t => hay.includes(t));
      el.hidden = !match;
      if (match) n++;
    });
    setShown(n);
  }, [q]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label htmlFor="blog-q" className="sr-only">Search solar guides</label>
      <input
        id="blog-q"
        type="search"
        className="search-input"
        placeholder="Search guides: lithium, 5kVA, Warri, AC, price…"
        value={q}
        onChange={e => setQ(e.target.value)}
        autoComplete="off"
      />
      <p aria-live="polite" style={{ fontSize: 13.5, color: "var(--muted)" }}>
        {q ? `${shown} of ${total} guides match “${q}”` : `${total} guides`}
      </p>
    </div>
  );
}
