/* ============================================================================
   LumaGrid icon set

   Inline stroke SVGs — no icon library dependency, no emoji.
   Every icon: 24x24 viewBox, currentColor stroke, so colour is controlled by
   the parent's `color`. Size defaults to 20 and scales with the `size` prop.
   ============================================================================ */

import type { CSSProperties } from "react";

export interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  /** Decorative by default. Pass a label to expose it to screen readers. */
  label?: string;
}

function Svg({
  size = 20,
  strokeWidth = 1.7,
  className,
  style,
  label,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, display: "block", ...style }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ── Energy & system ────────────────────────────────────────────────────── */

export const Bolt = (p: IconProps) => (
  <Svg {...p}><path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" /></Svg>
);

export const Sun = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

export const SolarPanel = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 4h17l1.5 10H2L3.5 4Z" />
    <path d="M2.6 9h18.8M12 4v10M7.4 4 6 14M16.6 4 18 14M12 14v6M9 20h6" />
  </Svg>
);

export const Battery = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2" y="7" width="17" height="10" rx="2.5" />
    <path d="M22 10.5v3" />
    <path d="M6 10.5v3M9.5 10.5v3M13 10.5v3" />
  </Svg>
);

export const Inverter = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M8.5 15c0-4 3-6 3-6M15.5 9c0 4-3 6-3 6" />
    <path d="M6 4.5v-2M18 4.5v-2" />
  </Svg>
);

export const Plug = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 2v6M15 2v6" />
    <path d="M5.5 8h13v3a6.5 6.5 0 0 1-13 0V8Z" />
    <path d="M12 17.5V22" />
  </Svg>
);

export const Gauge = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 17a9 9 0 1 1 18 0" />
    <path d="M12 17l4.5-5" />
    <circle cx="12" cy="17" r="1.4" />
  </Svg>
);

/* ── Money & fuel ───────────────────────────────────────────────────────── */

export const FuelPump = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 21V5.5A2.5 2.5 0 0 1 5.5 3h5A2.5 2.5 0 0 1 13 5.5V21" />
    <path d="M2 21h12" />
    <path d="M4.5 7.5h7v4h-7z" />
    <path d="M16 8.5h2.5a2 2 0 0 1 2 2V16a1.8 1.8 0 0 1-3.6 0v-2.6H13" />
    <path d="M16.8 8.5 15 5.5" />
  </Svg>
);

export const Naira = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 20V4l12 16V4" />
    <path d="M3.5 9.5h17M3.5 14.5h17" />
  </Svg>
);

export const TrendDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 7l6.5 6.5 3.5-3.5L21 18" />
    <path d="M21 13v5h-5" />
  </Svg>
);

export const PiggyBank = (p: IconProps) => (
  <Svg {...p}>
    <path d="M11 6h3a7 7 0 0 1 6.3 4H22v4h-1.7a7 7 0 0 1-2.3 2.8V20h-3v-1.4a7.4 7.4 0 0 1-2 .4h-2l-2 1.7V18a7 7 0 0 1-3-5.7C4 8.3 7.1 6 11 6Z" />
    <path d="M11 6a3 3 0 0 1 3-3" />
    <circle cx="16.5" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
);

export const Calendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Svg>
);

/* ── Services ───────────────────────────────────────────────────────────── */

export const Wrench = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15.5 3.5a5.5 5.5 0 0 0-6.9 6.9L3 16v5h5l5.6-5.6a5.5 5.5 0 0 0 6.9-6.9l-3.2 3.2-3-.9-.9-3 3.1-3.3Z" />
  </Svg>
);

export const Clock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.3 2" />
  </Svg>
);

export const ClipboardCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="2.5" width="6" height="3.5" rx="1" />
    <path d="M9 13.5l2.2 2.2 4-4" />
  </Svg>
);

export const Shield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2.5 4.5 5.5v6c0 4.7 3.1 8.6 7.5 10 4.4-1.4 7.5-5.3 7.5-10v-6L12 2.5Z" />
    <path d="M9 12l2.2 2.2 4-4.2" />
  </Svg>
);

export const Handshake = (p: IconProps) => (
  <Svg {...p}>
    <path d="M11 7.5 8.6 9.9a1.9 1.9 0 0 0 2.7 2.7l1.4-1.4 3.5 3.5a1.7 1.7 0 0 1-2.4 2.4l-.6-.6.6.6a1.7 1.7 0 0 1-2.4 2.4l-3.9-3.9" />
    <path d="M2.5 8.5 6 5h4l2 2 2-2h4l3.5 3.5" />
    <path d="M2.5 8.5 5 14M21.5 8.5 19 14" />
  </Svg>
);

export const Star = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 3 2.85 5.9 6.4.93-4.63 4.55 1.1 6.42L12 17.77 6.28 20.8l1.1-6.42L2.75 9.83l6.4-.93L12 3Z" />
  </Svg>
);

export const Leaf = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20c0-8 5-13 16-13 0 9-4.5 13-11 13H4Z" />
    <path d="M4 20c3-5 6.5-8 11-10" />
  </Svg>
);

/* ── Navigation & UI ────────────────────────────────────────────────────── */

export const MapPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10.2" r="2.6" />
  </Svg>
);

export const Search = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10.8" cy="10.8" r="6.8" />
    <path d="M15.8 15.8 21 21" />
  </Svg>
);

export const Check = (p: IconProps) => (
  <Svg {...p}><path d="M4.5 12.5l5 5 10-11" /></Svg>
);

export const CheckCircle = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.2l2.6 2.6L16 9.2" />
  </Svg>
);

export const AlertTriangle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.6 1.8 20.4h20.4L12 3.6Z" />
    <path d="M12 10v4.2" />
    <circle cx="12" cy="17.4" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
);

export const Info = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11.2v5" />
    <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
);

export const Copy = (p: IconProps) => (
  <Svg {...p}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
    <path d="M15.5 8.5v-3a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" />
  </Svg>
);

export const Printer = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 9V3.5h10V9" />
    <rect x="3" y="9" width="18" height="8" rx="2" />
    <rect x="7" y="14.5" width="10" height="6" rx="1" />
  </Svg>
);

export const Pencil = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20h4l10.5-10.5a2.8 2.8 0 0 0-4-4L4 16v4Z" />
    <path d="M14 6.5l3.5 3.5" />
  </Svg>
);

export const Restart = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
    <path d="M3 3.5V9h5.5" />
  </Svg>
);

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}><path d="M4 12h15M13 6l6 6-6 6" /></Svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}><path d="M6.5 17.5 17.5 6.5M8 6.5h9.5V16" /></Svg>
);

export const ArrowLeft = (p: IconProps) => (
  <Svg {...p}><path d="M20 12H5M11 6l-6 6 6 6" /></Svg>
);

export const Plus = (p: IconProps) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);

export const Minus = (p: IconProps) => (
  <Svg {...p}><path d="M5 12h14" /></Svg>
);

export const X = (p: IconProps) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);

export const ChevronDown = (p: IconProps) => (
  <Svg {...p}><path d="M6 9.5l6 6 6-6" /></Svg>
);

export const ChevronUp = (p: IconProps) => (
  <Svg {...p}><path d="M6 14.5l6-6 6 6" /></Svg>
);

/* ── Appliance categories ───────────────────────────────────────────────── */

export const Lightbulb = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 17.5a6.5 6.5 0 1 1 6 0v1.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19v-1.5Z" />
    <path d="M9.5 17.5h5" />
  </Svg>
);

export const Fan = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2" />
    <path d="M12 10c0-4 .8-6.5 3-6.5S18 6 15.5 8.4M14 12c4 0 6.5.8 6.5 3S18 18 15.6 15.5M12 14c0 4-.8 6.5-3 6.5S6 18 8.5 15.6M10 12c-4 0-6.5-.8-6.5-3S6 6 8.4 8.5" />
  </Svg>
);

export const Snowflake = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2 3.8 16.8" />
    <path d="M12 6l-2.2-2.2M12 6l2.2-2.2M12 18l-2.2 2.2M12 18l2.2 2.2" />
  </Svg>
);

export const Fridge = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
    <path d="M5 10h14M8.5 6v2M8.5 13v2.5" />
  </Svg>
);

export const Tv = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="5" width="19" height="12.5" rx="2" />
    <path d="M8 21h8M12 17.5V21" />
  </Svg>
);

export const Laptop = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="5" width="16" height="10.5" rx="1.8" />
    <path d="M2 18.5h20" />
  </Svg>
);

export const Smartphone = (p: IconProps) => (
  <Svg {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M10.8 5.6h2.4" />
  </Svg>
);

export const Microwave = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <rect x="5.5" y="8" width="9" height="8" rx="1" />
    <path d="M18 8.5v.01M18 12v.01M18 15.5v.01" />
  </Svg>
);

export const Shirt = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 3 4 5.5l1.5 4L8 9v11.5h8V9l2.5.5 1.5-4L15 3a3 3 0 0 1-6 0Z" />
  </Svg>
);

export const Droplet = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3s6 6.4 6 10.4A6 6 0 0 1 6 13.4C6 9.4 12 3 12 3Z" />
  </Svg>
);

export const HeartPulse = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20.4 6.6a4.7 4.7 0 0 0-8.4-1.5 4.7 4.7 0 0 0-8.4 1.5c-1 3.5 2.4 6.9 8.4 12.4 6-5.5 9.4-8.9 8.4-12.4Z" />
    <path d="M3.8 12.5h3.7l1.6-2.6 2 4.6 1.7-3h3.4" />
  </Svg>
);

export const Camera = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 8.5h3.5L8 6h8l1.5 2.5H21v11H3v-11Z" />
    <circle cx="12" cy="13.6" r="3.4" />
  </Svg>
);

/* ── Building types (calculator presets) ────────────────────────────────── */

export const Home = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 10.5 12 3l8.5 7.5" />
    <path d="M5.5 9.2V20h13V9.2" />
    <path d="M10 20v-5.5h4V20" />
  </Svg>
);

export const Building = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="2.5" width="16" height="19" rx="2" />
    <path d="M8.5 7h2M13.5 7h2M8.5 11h2M13.5 11h2M8.5 15h2M13.5 15h2" />
    <path d="M10 21.5v-3h4v3" />
  </Svg>
);

export const Store = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 4h17l1.5 5.5a3.2 3.2 0 0 1-6.2 1 3.2 3.2 0 0 1-6.2 0 3.2 3.2 0 0 1-6.2-1L3.5 4Z" />
    <path d="M4.5 11.5V20h15v-8.5" />
    <path d="M9.5 20v-5h5v5" />
  </Svg>
);

export const Sliders = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
    <circle cx="16" cy="7" r="2.2" />
    <circle cx="8" cy="17" r="2.2" />
  </Svg>
);

/* ── Social ─────────────────────────────────────────────────────────────── */

export const Facebook = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.5 8.5H17V5.2h-2.6c-2.2 0-3.6 1.5-3.6 3.8v1.6H8.5v3.3h2.3V21h3.4v-7.1h2.4l.4-3.3h-2.8V9.4c0-.6.3-.9.9-.9Z" />
  </Svg>
);

export const Instagram = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </Svg>
);

export const Mail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </Svg>
);

export const Phone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.2 3.5h3l1.5 4-2 1.4a12.5 12.5 0 0 0 6.4 6.4l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
  </Svg>
);
