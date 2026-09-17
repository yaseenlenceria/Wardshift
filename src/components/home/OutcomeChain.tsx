import { motion } from "framer-motion";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import SectionHeading from "@/components/SectionHeading";
import CountUp from "@/components/CountUp";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const CHAIN = [
  { label: "Searches for your speciality", value: 1820, pct: 100 },
  { label: "Relevant visits to your website", value: 420, pct: 62 },
  { label: "Treatment-page engagements", value: 73, pct: 38 },
  { label: "Calls & contact forms", value: 31, pct: 22 },
  { label: "Appointment enquiries", value: 18, pct: 14, highlight: true },
];

const ATTRIBUTION = [
  { enquiry: "Appointment enquiry #1", source: "“knee specialist near me” → treatment page" },
  { enquiry: "Appointment enquiry #2", source: "“private cardiologist” → Google profile → call" },
  { enquiry: "Appointment enquiry #3", source: "“dermatologist near me” → local search → form" },
  { enquiry: "Appointment enquiry #4", source: "Consultant name search → profile → WhatsApp" },
];

/**
 * Section — connect activity to outcomes. Not a marketing funnel: an outcome
 * chain showing how visibility becomes enquiries, plus the attribution panel
 * that ties every enquiry back to the search that produced it.
 */
export default function OutcomeChain() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="From Activity to Outcome"
          title="Every enquiry has a story. We make it visible."
          lede="Not a marketing funnel — a connected chain from the first search to the appointment enquiry, measured at every step."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          {/* outcome chain */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-[10px] border border-grey-300 bg-white p-6 shadow-card lg:p-8"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
                The outcome chain — one month
              </p>
              <IllustrativeBadge className="px-2 py-0.5 text-[9px]" />
            </div>

            <ol className="mt-7 space-y-5">
              {CHAIN.map((step, i) => (
                <li key={step.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[13.5px] font-semibold text-navy-800">{step.label}</span>
                    <span className="font-mono text-[15px] font-medium tracking-[0.02em] text-navy-800">
                      <CountUp to={step.value} />
                    </span>
                  </div>
                  <div className="mt-2 h-9 overflow-hidden rounded-md bg-grey-100">
                    <motion.div
                      className={
                        step.highlight
                          ? "flex h-full origin-left items-center rounded-md bg-teal-500"
                          : "flex h-full origin-left items-center rounded-md bg-navy-800/85"
                      }
                      style={{ width: `${step.pct}%` }}
                      initial={reduced ? false : { scaleX: 0 }}
                      whileInView={reduced ? undefined : { scaleX: 1 }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 + i * 0.28 }}
                    >
                      {step.highlight && (
                        <span className="whitespace-nowrap px-3 font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-navy-950">
                          The outcome
                        </span>
                      )}
                    </motion.div>
                  </div>
                  {i < CHAIN.length - 1 && (
                    <div className="ml-4 mt-1.5 h-3 w-px bg-grey-300" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </motion.div>

          {/* attribution side panel */}
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-[10px] border border-navy-700 bg-navy-800 p-6 lg:sticky lg:top-24 lg:p-7"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-teal-400">
                Which search produced each enquiry?
              </p>
            </motion.div>
            <motion.ul variants={staggerParent(0.1)} className="mt-6 space-y-3">
              {ATTRIBUTION.map((row) => (
                <motion.li
                  key={row.enquiry}
                  variants={fadeUp}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <p className="text-[12.5px] font-semibold text-white">{row.enquiry}</p>
                  <p className="mt-1 text-[12px] leading-[1.55] text-navy-100/70">{row.source}</p>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="mt-5 border-t border-white/10 pt-4">
              <IllustrativeBadge className="border-white/20 px-2 py-0.5 text-[9px] text-navy-100/70" />
              <p className="mt-3 text-[12px] leading-[1.6] text-navy-100/60">
                This is the difference between activity and accountability: every enquiry traced
                back to the search, page or profile that produced it.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
