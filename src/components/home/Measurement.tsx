import { motion } from "framer-motion";
import { Link } from "react-router";
import CountUp from "@/components/CountUp";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import SectionHeading from "@/components/SectionHeading";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const CHIPS = [
  "Search visibility",
  "Relevant website visitors",
  "Calls",
  "Contact forms",
  "Enquiries",
  "Enquiry source",
  "Cost per enquiry",
  "Appointment requests (where appropriately trackable)",
  "Conversion rates",
  "Growth trends",
];

const SOURCES = [
  { label: "Organic search", pct: 44 },
  { label: "Referral", pct: 26 },
  { label: "Direct", pct: 18 },
  { label: "Paid", pct: 12 },
];

const LEGEND = [
  "Search visibility ↑",
  "Qualified website visits ↑",
  "Calls ↑",
  "Forms ↑",
  "Appointment enquiries ↑",
];


/** Large growth graph: Month 1 → Month 6, line draws on scroll, floating sample cards. */
function GrowthGraph() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="relative rounded-[10px] border border-white/10 bg-navy-800/70 p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-navy-100/60">
            What six months of the system working looks like
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
            {LEGEND.map((row) => (
              <li key={row} className="flex items-center gap-2 text-[12px] font-medium text-navy-100/80">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden="true" />
                {row}
              </li>
            ))}
          </ul>
        </div>
        <IllustrativeBadge className="border-white/20 text-navy-100/70" />
      </div>

      <div className="relative mt-6">
        <svg viewBox="0 0 720 260" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="1">
            <path d="M0 52 H720 M0 104 H720 M0 156 H720 M0 208 H720" />
          </g>
          {/* month axis */}
          <g fill="#DCE6F2" fillOpacity="0.5" fontSize="11" fontFamily="IBM Plex Mono, monospace">
            {["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"].map((m, i) => (
              <text key={m} x={20 + i * 136} y="250">{m}</text>
            ))}
          </g>
          <motion.path
            d="M20 210 L156 196 L292 182 L428 148 L564 108 L700 60 L700 236 L20 236 Z"
            fill="url(#growth-fill)"
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
          <motion.path
            d="M20 210 L156 196 L292 182 L428 148 L564 108 L700 60"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? undefined : { pathLength: 0 }}
            whileInView={reduced ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
          />
          {[
            [292, 182],
            [564, 108],
          ].map(([x, y], i) => (
            <motion.circle
              key={x}
              cx={x}
              cy={y}
              r="4"
              fill="#0A1A33"
              stroke="#2DD4BF"
              strokeWidth="1.5"
              initial={reduced ? undefined : { opacity: 0, scale: 0 }}
              whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.8 + i * 0.35 }}
            />
          ))}
          <motion.circle
            cx="700"
            cy="60"
            r="9"
            fill="none"
            stroke="#2DD4BF"
            strokeOpacity="0.5"
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: [0, 1, 0.35] }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 1.9, repeat: Infinity, repeatType: "mirror" }}
          />
          <circle cx="700" cy="60" r="4" fill="#2DD4BF" />
        </svg>

      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-navy-100/50">
        Enquiries are never patients — sample data for illustration only
      </p>
    </div>
  );
}

function SourcesPanel() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="rounded-[10px] border border-white/10 bg-navy-800/70 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-navy-100/60">
          Enquiry sources
        </span>
        <IllustrativeBadge className="border-white/20 px-2 py-0.5 text-[9px] text-navy-100/70" />
      </div>
      <ul className="mt-5 space-y-4">
        {SOURCES.map((source, i) => (
          <li key={source.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[12.5px] font-medium text-navy-100/80">{source.label}</span>
              <span className="font-mono text-[11px] font-medium text-teal-400">
                <CountUp to={source.pct} suffix="%" />
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="h-full origin-left rounded-full bg-teal-400"
                style={{ width: `${source.pct}%` }}
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={reduced ? undefined : { scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 + i * 0.12 }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-navy-100/50">
        Attribution — sample data
      </p>
    </div>
  );
}

/** Section — Growth should be measurable. */
export default function Measurement() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(/noise.png)", backgroundSize: "512px 512px" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full bg-teal-500/[0.05] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading dark eyebrow="Accountability" title="Growth should be measurable." />
            <motion.div
              variants={staggerParent(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.p variants={fadeUp} className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-navy-100/80">
                You should know what changed, why it changed and whether it is creating
                meaningful opportunities for your practice.
              </motion.p>

              {/* the count, made visible */}
              <motion.div variants={fadeUp} className="mt-10 flex items-end gap-5">
                <p className="font-display text-[88px] font-medium leading-[0.9] text-white lg:text-[104px]">
                  <CountUp to={CHIPS.length} />
                </p>
                <p className="max-w-[20ch] pb-2 font-mono text-[11px] font-medium uppercase leading-[1.7] tracking-[0.14em] text-teal-400">
                  Growth signals tracked on every engagement
                </p>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-10 max-w-[52ch] font-display text-lg italic leading-[1.6] text-teal-100"
              >
                Verified WardShift results and permission-based case studies will be published
                transparently as they become available.
              </motion.p>

              <motion.p variants={fadeUp} className="mt-8">
                <Link
                  to="/growth-review/"
                  className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-400 transition-colors duration-150 hover:text-teal-500"
                >
                  Find out whether your marketing is actually working
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              </motion.p>
            </motion.div>
          </div>

          <div>
            <motion.ul
              variants={staggerParent(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              {CHIPS.map((chip) => (
                <motion.li
                  key={chip}
                  variants={{
                    hidden: { opacity: 0, scale: 0.96 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
                  }}
                  className="rounded-lg border border-white/10 px-3.5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-navy-100/80"
                >
                  {chip}
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-4">
              <SourcesPanel />
            </div>
          </div>
        </div>

        {/* the large growth graph */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14"
        >
          <GrowthGraph />
        </motion.div>
      </div>
    </section>
  );
}
