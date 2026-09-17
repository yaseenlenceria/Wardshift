import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Patient acquisition system loop — five nodes in a circular arrangement:
 * DISCOVERY → TRUST → CONVERSION → FOLLOW-UP → MEASUREMENT, with a dashed
 * "optimize" return arc from MEASUREMENT back to DISCOVERY.
 *
 * Draws node-by-node clockwise on mount; the loop rotates slowly
 * (1 rev / 60s, pauses on hover, labels counter-rotate to stay level).
 * All continuous motion is motion-safe gated.
 */

const SIZE = 480;
const C = SIZE / 2;
const R = 172;
const NODE_R = 42;

const NODES = ["DISCOVERY", "TRUST", "CONVERSION", "FOLLOW-UP", "MEASUREMENT"];

const rad = (deg: number) => (deg * Math.PI) / 180;
const pos = (deg: number, r = R) => ({ x: C + r * Math.cos(rad(deg)), y: C + r * Math.sin(rad(deg)) });

/** Node angles: start at top (-90deg), walk clockwise. */
const ANGLES = NODES.map((_, i) => -90 + i * 72);

function arcPath(a1: number, a2: number) {
  const p1 = pos(a1);
  const p2 = pos(a2);
  return `M ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y}`;
}

const GAP = 17; // degrees of gap around each node
const ARCS = ANGLES.map((a, i) => arcPath(a + GAP, ANGLES[(i + 1) % NODES.length] + (i === NODES.length - 1 ? 360 : 0) - GAP));

export default function SystemLoop({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const drawDelay = (i: number) => (reduced ? 0 : 0.25 + i * 0.15);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[460px]",
        "motion-safe:animate-[spin_60s_linear_infinite] hover:[animation-play-state:paused]",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-auto w-full"
        role="img"
        aria-label="Patient acquisition system loop: discovery, trust, conversion, follow-up and measurement, with measurement feeding back to discovery"
      >
        <defs>
          <marker id="loop-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0.5 L7.5 4 L0 7.5" fill="none" stroke="#14B8A6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* faint guide ring */}
        <circle cx={C} cy={C} r={R} fill="none" stroke="#CBD5E1" strokeOpacity={0.45} strokeWidth={1} strokeDasharray="1 7" />

        {/* connecting arcs (last one is the optimize return) */}
        {ARCS.map((d, i) => {
          const isReturn = i === ARCS.length - 1;
          return (
            <motion.path
              key={`arc-${i}`}
              d={d}
              fill="none"
              stroke="#14B8A6"
              strokeWidth={isReturn ? 1.6 : 1.4}
              strokeDasharray={isReturn ? "5 6" : undefined}
              strokeLinecap="round"
              markerEnd="url(#loop-arrow)"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.55, ease: EASE_OUT, delay: drawDelay(i) },
                opacity: { duration: 0.2, delay: drawDelay(i) },
              }}
              className={isReturn ? "motion-safe:animate-pulse" : undefined}
            />
          );
        })}

        {/* optimize label on the return arc */}
        {(() => {
          const mid = pos(-90 + 4 * 72 + 36, R + 2); // midpoint of return arc
          return (
            <motion.text
              x={mid.x}
              y={mid.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#0E9488"
              fontSize={11}
              fontWeight={500}
              letterSpacing={1.6}
              fontFamily="'IBM Plex Mono', ui-monospace, monospace"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: reduced ? 0 : 1.15 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              className="motion-safe:animate-[spin_60s_linear_infinite_reverse]"
            >
              OPTIMIZE
            </motion.text>
          );
        })()}

        {/* nodes */}
        {NODES.map((label, i) => {
          const p = pos(ANGLES[i]);
          return (
            <motion.g
              key={label}
              initial={reduced ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: drawDelay(i) }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            >
              <circle cx={p.x} cy={p.y} r={NODE_R} fill="#0B1F3A" />
              <circle cx={p.x} cy={p.y} r={NODE_R} fill="none" stroke="#14B8A6" strokeOpacity={0.6} strokeWidth={1.2} />
              <circle cx={p.x} cy={p.y} r={NODE_R + 6} fill="none" stroke="#14B8A6" strokeOpacity={0.18} strokeWidth={1} />
              <g
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                className="motion-safe:animate-[spin_60s_linear_infinite_reverse]"
              >
                <text
                  x={p.x}
                  y={p.y - 4}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize={label.length > 9 ? 9.5 : 10.5}
                  fontWeight={600}
                  letterSpacing={0.8}
                  fontFamily="'IBM Plex Mono', ui-monospace, monospace"
                >
                  {label}
                </text>
                <text
                  x={p.x}
                  y={p.y + 12}
                  textAnchor="middle"
                  fill="#2DD4BF"
                  fontSize={9}
                  fontWeight={500}
                  letterSpacing={1.2}
                  fontFamily="'IBM Plex Mono', ui-monospace, monospace"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
