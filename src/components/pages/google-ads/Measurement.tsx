import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import { IconTick } from "@/components/icons";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const BULLETS = [
  { title: "Call tracking", note: "Every phone enquiry attributed to its source." },
  { title: "Form tracking", note: "Every submitted enquiry counted and recorded." },
  { title: "Source attribution", note: "Which keyword, ad and page produced each enquiry." },
  { title: "Cost per enquiry", note: "The single number a campaign is managed against." },
  { title: "Trend reporting", note: "Direction over time — not snapshots in isolation." },
];

const METRICS = [
  { label: "Impressions", value: 12400 },
  { label: "Clicks", value: 486 },
  { label: "Calls", value: 31 },
  { label: "Forms", value: 24 },
  { label: "Cost / enquiry", value: 38 },
];

/** Count-up that renders instantly under reduced motion. */
function useCountUp(target: number, start: boolean, reduced: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);
  return value;
}

function Metric({ label, value, start, reduced }: { label: string; value: number; start: boolean; reduced: boolean }) {
  const v = useCountUp(value, start, reduced);
  return (
    <div className="rounded-lg border border-grey-100 bg-paper px-4 py-3">
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-grey-500">
        {label}
      </p>
      <p className="mt-1 font-display text-[26px] font-medium leading-none text-navy-800">
        {v.toLocaleString("en")}
      </p>
    </div>
  );
}

function AdsDashboard({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[10px] border border-grey-300 bg-white p-6 shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-navy-800">
          Campaign overview — last 30 days
        </p>
        <IllustrativeBadge />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {METRICS.slice(0, 3).map((m) => (
          <Metric key={m.label} label={m.label} value={m.value} start={inView} reduced={reduced} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {METRICS.slice(3).map((m) => (
          <Metric key={m.label} label={m.label} value={m.value} start={inView} reduced={reduced} />
        ))}
      </div>

      <div className="mt-5 border-t border-grey-100 pt-4">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-grey-500">
          Enquiries — trend
        </p>
        <svg viewBox="0 0 320 90" className="mt-2 w-full" aria-hidden="true">
          <g stroke="#EDF1F5" strokeWidth="1">
            <path d="M0 22 H320 M0 44 H320 M0 66 H320" />
          </g>
          <motion.path
            d="M4 74 L48 68 L92 70 L136 58 L180 52 L224 38 L268 30 L316 18"
            fill="none"
            stroke="#14B8A6"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={reduced ? undefined : { pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.4 }}
          />
          <circle cx="316" cy="18" r="3" fill="#14B8A6" />
        </svg>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-grey-500">
          Calls + forms, weekly
        </p>
      </div>
    </motion.div>
  );
}

export default function Measurement() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-32">
        <div>
          <SectionHeading
            eyebrow="Measurement"
            title="Every Enquiry Accounted For."
            lede="Reports speak in enquiries and costs, not impressions and jargon."
          />
          <motion.ul
            variants={staggerParent(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-9 space-y-4"
          >
            {BULLETS.map((b) => (
              <motion.li key={b.title} variants={fadeUp} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100/70 text-teal-600">
                  <IconTick width={13} height={13} />
                </span>
                <div>
                  <p className="text-[15.5px] font-semibold text-navy-800">{b.title}</p>
                  <p className="mt-0.5 text-[14.5px] leading-[1.6] text-grey-700">{b.note}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <AdsDashboard reduced={reduced} />
      </div>
    </section>
  );
}
