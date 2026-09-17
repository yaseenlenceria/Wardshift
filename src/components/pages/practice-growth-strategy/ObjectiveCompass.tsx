import { motion } from "framer-motion";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";

const CHANNELS = ["Search", "Website", "Ads", "Reputation", "Enquiry"] as const;

const SIZE = 420;
const CENTER = SIZE / 2;
const RADIUS = 150;

/**
 * Hero visual: a central OBJECTIVE node with channel nodes orbiting it.
 * Connectors radiate outward from the objective — channels serve the
 * objective, never the reverse. The whole ring drifts in a slow 20s orbit
 * while chips counter-rotate to stay upright. Reduced motion: fully static.
 */
export default function ObjectiveCompass() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      role="img"
      aria-label="Diagram: the practice objective at the centre, with Search, Website, Ads, Reputation and Enquiry channels radiating outward from it"
    >
      {/* dashed orbit ring */}
      <div
        className="absolute rounded-full border border-dashed border-grey-300"
        style={{
          left: CENTER - RADIUS,
          top: CENTER - RADIUS,
          width: RADIUS * 2,
          height: RADIUS * 2,
        }}
        aria-hidden="true"
      />

      {/* rotating group: connectors + channel nodes */}
      <motion.div
        className="absolute inset-0"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={reduced ? undefined : { duration: 20, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" fill="none">
          {CHANNELS.map((channel, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const x2 = CENTER + RADIUS * Math.cos(angle);
            const y2 = CENTER + RADIUS * Math.sin(angle);
            return (
              <motion.line
                key={channel}
                x1={CENTER}
                y1={CENTER}
                x2={x2}
                y2={y2}
                stroke="#14B8A6"
                strokeOpacity="0.55"
                strokeWidth="1.5"
                initial={reduced ? undefined : { pathLength: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 + i * 0.09 }}
              />
            );
          })}
        </svg>

        {CHANNELS.map((channel, i) => {
          const angle = (i * 72 - 90) * (Math.PI / 180);
          const left = 50 + (RADIUS / SIZE) * 100 * Math.cos(angle);
          const top = 50 + (RADIUS / SIZE) * 100 * Math.sin(angle);
          return (
            <div
              key={channel}
              className="absolute h-0 w-0"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {/* counter-rotation keeps the chip upright while orbiting */}
              <motion.div
                animate={reduced ? undefined : { rotate: [0, -360] }}
                transition={reduced ? undefined : { duration: 20, ease: "linear", repeat: Infinity }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <motion.span
                    initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                    whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.5 + i * 0.09 }}
                    className="block whitespace-nowrap rounded-full border border-grey-300 bg-white px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-navy-800 shadow-card"
                  >
                    {channel}
                  </motion.span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* center objective node (static, above the ring) */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.25 }}
          className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-navy-800 text-center shadow-card"
        >
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-teal-400">
            Objective
          </span>
          <span className="mt-1 px-3 text-[12px] font-semibold leading-tight text-white">
            Named first
          </span>
        </motion.div>
      </div>
    </div>
  );
}
