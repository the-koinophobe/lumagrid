/**
 * Animated "how solar works" diagram: sun → panels → inverter → home, with
 * the battery charging off the inverter and the grid as an optional input.
 * Pure SVG + CSS animation (see .flow-line etc. in globals.css), so it costs
 * no JavaScript and freezes politely under prefers-reduced-motion.
 */
export default function EnergyFlow() {
  const lime = "#d4f50c";
  const soft = "rgba(255,255,255,.55)";
  const card = "rgba(255,255,255,.06)";
  const edge = "rgba(255,255,255,.16)";

  return (
    <svg viewBox="0 0 640 430" role="img" aria-labelledby="ef-title ef-desc" style={{ width: "100%", height: "auto" }}>
      <title id="ef-title">How a LumaGrid solar system powers your home</title>
      <desc id="ef-desc">Sunlight hits the panels. The inverter sends power to the home and charges the lithium battery. At night the battery powers the home, and grid or generator power can top it up.</desc>

      {/* Sun */}
      <g transform="translate(70 70)">
        <g className="sun-rays">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="-3" y="-52" width="6" height="16" rx="3" fill={lime} opacity=".75" transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <circle r="26" fill={lime} />
      </g>

      {/* Panels */}
      <g transform="translate(160 150)">
        <rect x="0" y="0" width="150" height="80" rx="8" fill={card} stroke={edge} />
        <g transform="translate(10 10) skewX(-12)">
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={c * 21} y={r * 20} width="18" height="17" rx="2" fill="#1d3a5c" stroke="#5e86b8" strokeWidth=".8" />
            )),
          )}
        </g>
        <text x="75" y="104" textAnchor="middle" fill={soft} fontSize="17" fontWeight="700">Solar panels</text>
      </g>

      {/* Inverter */}
      <g transform="translate(360 150)">
        <rect width="92" height="110" rx="12" fill={card} stroke={edge} />
        <rect x="16" y="16" width="60" height="30" rx="5" fill="#0b1f15" stroke={lime} strokeWidth="1.2" />
        <text x="46" y="36" textAnchor="middle" fill={lime} fontSize="15" fontWeight="800">5kVA</text>
        <circle cx="30" cy="70" r="5" className="pulse-dot" fill={lime} />
        <circle cx="46" cy="70" r="5" fill="rgba(255,255,255,.25)" />
        <circle cx="62" cy="70" r="5" fill="rgba(255,255,255,.25)" />
        <text x="46" y="134" textAnchor="middle" fill={soft} fontSize="17" fontWeight="700">Hybrid inverter</text>
      </g>

      {/* Home */}
      <g transform="translate(520 60)">
        <path d="M0 50 L50 10 L100 50 L100 120 L0 120 Z" fill={card} stroke={edge} />
        <rect x="18" y="62" width="22" height="22" rx="3" fill={lime} className="pulse-dot" />
        <rect x="60" y="62" width="22" height="22" rx="3" fill={lime} opacity=".85" />
        <rect x="40" y="92" width="20" height="28" rx="2" fill="rgba(255,255,255,.18)" />
        <text x="50" y="144" textAnchor="middle" fill={soft} fontSize="17" fontWeight="700">Your home</text>
      </g>

      {/* Battery */}
      <g transform="translate(530 250)">
        <rect width="80" height="110" rx="12" fill={card} stroke={edge} />
        <rect x="28" y="-8" width="24" height="10" rx="3" fill={edge} />
        <clipPath id="ef-batt"><rect x="12" y="14" width="56" height="82" rx="6" /></clipPath>
        <rect x="12" y="14" width="56" height="82" rx="6" fill="rgba(255,255,255,.06)" />
        <g clipPath="url(#ef-batt)">
          <rect x="12" y="14" width="56" height="82" fill={lime} className="battery-fill" />
        </g>
        <text x="40" y="134" textAnchor="middle" fill={soft} fontSize="17" fontWeight="700">Lithium battery</text>
      </g>

      {/* Grid / generator (optional input) */}
      <g transform="translate(372 330)">
        <path d="M24 0 L8 52 M24 0 L40 52 M14 20 L34 20 M11 34 L37 34" stroke="rgba(255,255,255,.45)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <text x="24" y="70" textAnchor="middle" fill="rgba(255,255,255,.45)" fontSize="15" fontWeight="700">Grid / generator</text>
      </g>

      {/* Flows */}
      <g fill="none" strokeLinecap="round" strokeWidth="3">
        <path d="M96 96 Q140 130 168 160" stroke={lime} className="flow-line flow-line--slow" opacity=".8" />
        <path d="M310 190 L360 195" stroke={lime} className="flow-line" />
        <path d="M452 180 Q500 160 520 140" stroke={lime} className="flow-line" />
        <path d="M452 235 Q500 270 530 290" stroke={lime} className="flow-line" />
        <path d="M396 330 L400 262" stroke="rgba(255,255,255,.4)" className="flow-line flow-line--slow" />
      </g>
    </svg>
  );
}
