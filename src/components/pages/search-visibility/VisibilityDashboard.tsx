import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import { cn } from "@/lib/utils";

/**
 * Illustrative measurement dashboard card for the Search Visibility page:
 * a visibility trend line with mono labels (VISIBILITY / CLICKS / CALLS).
 * The trend line draws on scroll into view. Sample figures only — carries
 * the IllustrativeBadge.
 */

const LABELS = ["VISIBILITY", "CLICKS", "CALLS"];
const BARS = [42, 58, 51, 66, 74, 70, 84];

export default function VisibilityDashboard({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
      className={cn("rounded-[10px] border border-grey-300 bg-white p-6 shadow-card", className)}
      role="img"
      aria-label="Illustrative dashboard showing visibility, clicks and calls trends with sample data"
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
          Practice visibility — 6 months
        </p>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-teal-600">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />
          Live trend
        </span>
      </div>

      {/* trend chart */}
      <svg viewBox="0 0 320 130" className="mt-5 h-auto w-full" aria-hidden="true">
        {[30, 65, 100].map((y) => (
          <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#EDF1F5" strokeWidth="1" />
        ))}
        <motion.path
          d="M8 104 L52 92 L96 97 L140 78 L184 70 L228 60 L272 44 L312 34"
          fill="none"
          stroke="#14B8A6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.2 }}
        />
        {[[8, 104], [140, 78], [228, 60], [312, 34]].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="#0B1F3A"
            stroke="#14B8A6"
            strokeWidth="1.5"
            initial={reduced ? false : { opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.3, delay: reduced ? 0 : 0.4 + i * 0.2 }}
          />
        ))}
      </svg>

      {/* metric bars */}
      <div className="mt-5 space-y-3">
        {LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-grey-500">
              {label}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-grey-100">
              <motion.div
                className="h-full origin-left rounded-full bg-teal-500"
                style={{ width: `${BARS[i * 2]}%` }}
                initial={reduced ? false : { scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: reduced ? 0 : 0.5 + i * 0.12 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-grey-300/60 pt-4">
        <IllustrativeBadge />
      </div>
    </motion.div>
  );
}
