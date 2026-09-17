import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { SERVICE_LINKS } from "@/lib/site";

/**
 * Compact capability map: a "WardShift" hub node with nine thin teal
 * connector lines to nine labelled service nodes arranged in a loose ring.
 * Code-built SVG. Hub appears, then each connector draws (60ms stagger)
 * with nodes popping (scale 0.8 -> 1).
 */

const SIZE = 460;
const C = SIZE / 2;
const R = 168;

interface NodePos {
  x: number;
  y: number;
  /** text anchor side for label placement */
  anchor: "start" | "middle" | "end";
  dx: number;
  dy: number;
}

function layout(): NodePos[] {
  return SERVICE_LINKS.map((_, i) => {
    // start at top (-90deg) and walk clockwise
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / SERVICE_LINKS.length;
    const x = C + R * Math.cos(angle);
    const y = C + R * 0.92 * Math.sin(angle);
    const cos = Math.cos(angle);
    const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
    const dx = anchor === "start" ? 12 : anchor === "end" ? -12 : 0;
    const dy = anchor === "middle" ? (Math.sin(angle) > 0 ? 20 : -12) : 4;
    return { x, y, anchor, dx, dy };
  });
}

const NODES = layout();

/** Short labels so the ring stays readable. */
const SHORT: Record<string, string> = {
  "Private Practice Websites": "Websites",
  "Search Visibility": "Search Visibility",
  "Patient Acquisition": "Acquisition",
  "Google Ads": "Google Ads",
  "Digital Reputation": "Reputation",
  "Consultant Positioning": "Positioning",
  "Enquiry Systems": "Enquiries",
  "CRM & Follow-Up": "CRM & Follow-Up",
  "Growth Strategy": "Strategy",
};

export default function CapabilityMap() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-auto w-full max-w-[460px]"
      role="img"
      aria-label="Capability map: WardShift at the hub, connected to nine service capabilities"
    >
      {/* connector lines */}
      {NODES.map((n, i) => (
        <motion.line
          key={`line-${i}`}
          x1={C}
          y1={C}
          x2={n.x}
          y2={n.y}
          stroke="#14B8A6"
          strokeWidth={1}
          strokeOpacity={0.55}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.35 + i * 0.06 }}
        />
      ))}

      {/* hub */}
      <motion.g
        initial={reduced ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        style={{ transformOrigin: `${C}px ${C}px` }}
      >
        <circle cx={C} cy={C} r={46} fill="#0B1F3A" />
        <circle cx={C} cy={C} r={46} fill="none" stroke="#14B8A6" strokeOpacity={0.5} strokeWidth={1} />
        <text
          x={C}
          y={C + 4}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize={15}
          fontWeight={600}
          fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        >
          WardShift
        </text>
      </motion.g>

      {/* service nodes */}
      {NODES.map((n, i) => (
        <motion.g
          key={`node-${i}`}
          initial={reduced ? false : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.45 + i * 0.06 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r={5.5} fill="#FFFFFF" stroke="#14B8A6" strokeWidth={1.5} />
          <text
            x={n.x + n.dx}
            y={n.y + n.dy}
            textAnchor={n.anchor}
            fill="#3D4C5E"
            fontSize={11.5}
            fontWeight={500}
            fontFamily="'IBM Plex Mono', ui-monospace, monospace"
          >
            {(SHORT[SERVICE_LINKS[i].title] ?? SERVICE_LINKS[i].title).toUpperCase()}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
