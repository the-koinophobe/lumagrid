"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `to` the first time it scrolls into view. Renders the final
 * value on the server so the number is never wrong for crawlers or no-JS.
 */
export default function Counter({ to, prefix = "", suffix = "", duration = 1400 }: {
  to: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setValue(0);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);

  return <span ref={ref}>{prefix}{value.toLocaleString("en-NG")}{suffix}</span>;
}
