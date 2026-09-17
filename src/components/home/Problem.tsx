import { motion } from "framer-motion";
import { Link } from "react-router";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import SectionHeading from "@/components/SectionHeading";
import CountUp from "@/components/CountUp";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CHECKLIST = [
  "Find them",
  "Understand the specialty",
  "Know what they treat",
  "Know where they practise",
  "Trust what they see",
  "Make contact",
];

const GAP_BARS = [
  { label: "Clinical reputation", value: 92, strong: true },
  { label: "Online visibility", value: 46, strong: false },
  { label: "Patient understanding", value: 58, strong: false },
  { label: "Online trust", value: 67, strong: false },
  { label: "Measurement", value: 28, strong: false },
];

function TickItem({ label }: { label: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <li className="flex items-center gap-2.5 rounded-full border border-grey-300 bg-paper px-4 py-2.5">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <motion.path
          d="m4.5 12.5 5 5L19.5 6.5"
          stroke="#0E9488"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: reduced ? { pathLength: 1 } : { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 0.3, ease: "easeOut" } },
          }}
        />
      </svg>
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-grey-700">
        {label}
      </span>
    </li>
  );
}

/**
 * The Practice Growth Gap: five dimensions of a private practice, scored and
 * animated on scroll. Clinical reputation runs far ahead of everything around
 * it — the gap WardShift works on. Illustrative figures, badged.
 */
function GapVisual() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="rounded-[10px] border border-grey-300 bg-paper p-6 shadow-card lg:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
          The Practice Growth Gap
        </p>
        <IllustrativeBadge className="px-2 py-0.5 text-[9px]" />
      </div>

      <div className="mt-7 space-y-6">
        {GAP_BARS.map((bar, i) => (
          <div key={bar.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[13.5px] font-semibold text-navy-800">{bar.label}</span>
              <span
                className={cn(
                  "font-mono text-[11px] font-medium tracking-[0.08em]",
                  bar.strong ? "text-navy-800" : "text-grey-500",
                )}
              >
                <CountUp to={bar.value} suffix="%" />
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-grey-100">
              <motion.div
                className={cn(
                  "h-full origin-left rounded-full",
                  bar.strong ? "bg-navy-800" : "bg-grey-300",
                )}
                style={{ width: `${bar.value}%` }}
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={reduced ? undefined : { scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 + i * 0.12 }}
              />
            </div>
          </div>
        ))}
      </div>

      <motion.p
        className="mt-6 border-t border-grey-300/60 pt-4 font-mono text-[10px] uppercase leading-[1.8] tracking-[0.12em] text-teal-600"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        ↑ The gap between clinical reputation and everything around it
      </motion.p>
    </div>
  );
}

/** Section 2 — The Practice Growth Gap. */
export default function Problem() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="max-w-prose">
            <SectionHeading
              eyebrow="The Gap"
              title="Being an excellent doctor does not automatically make you visible online."
            />
            <motion.div
              variants={staggerParent(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.p variants={fadeUp} className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-grey-700">
                Patients can only choose you if they can find you, understand what you do and
                trust what they see.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-[58ch] font-mono text-[11px] font-medium uppercase leading-[2] tracking-[0.12em] text-grey-500"
              >
                Weak Google visibility · Few recent reviews · An outdated website · No idea where
                enquiries come from
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-[32ch] font-display text-2xl font-medium leading-[1.35] text-navy-800"
              >
                WardShift brings the two together — clinical reputation and digital visibility.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-7">
                <Link
                  to="/growth-review/?focus=visibility"
                  className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600"
                >
                  See where your clinic is losing visibility
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <GapVisual />
          </motion.div>
        </div>

        {/* what patients need — tight chip strip */}
        <motion.div
          variants={staggerParent(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-14 border-t border-grey-300/70 pt-8"
        >
          <motion.p variants={fadeUp} className="eyebrow text-teal-600">
            What patients need
          </motion.p>
          <motion.ul
            variants={staggerParent(0.07)}
            className="mt-5 flex flex-wrap gap-2.5"
            aria-label="What patients need"
          >
            {CHECKLIST.map((item) => (
              <TickItem key={item} label={item} />
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
