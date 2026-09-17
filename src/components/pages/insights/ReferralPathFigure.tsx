import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const STEPS = [
  { num: "01", label: "Referral given", detail: "A name, spoken or written" },
  { num: "02", label: "Name searched", detail: "The patient looks the doctor up" },
  { num: "03", label: "Results scanned", detail: "Listings, profiles, the website" },
  { num: "04", label: "Decision made", detail: "Contact — or quiet hesitation" },
];

/**
 * Code-built figure for "The Referral Validation Search": the path a referred
 * patient walks in the minutes after receiving a doctor's name. No numbers,
 * no data — a journey diagram only.
 */
export default function ReferralPathFigure() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-[10px] border border-grey-300 bg-white p-6 lg:p-8"
      aria-label="Diagram: the referral validation path from referral to contact decision"
    >
      <figcaption className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
        The referral validation path
      </figcaption>

      <div className="relative mt-6">
        {/* connector line */}
        <motion.span
          aria-hidden="true"
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1, ease: EASE_OUT, delay: 0.2 } },
          }}
          className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-teal-500/40 sm:block"
        />
        <ol className="relative grid gap-5 sm:grid-cols-4 sm:gap-3">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.num}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE_OUT, delay: 0.25 + i * 0.18 },
                },
              }}
              className="flex gap-3 sm:block"
            >
              <span
                aria-hidden="true"
                className="mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-teal-500 bg-white sm:mt-0"
              />
              <div className="sm:mt-3">
                <p className="font-mono text-[10.5px] font-medium tracking-[0.12em] text-teal-600">
                  {step.num}
                </p>
                <p className="mt-1 text-[14.5px] font-semibold leading-[1.35] text-navy-800">
                  {step.label}
                </p>
                <p className="mt-1 text-[12.5px] leading-[1.5] text-grey-500">{step.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.figure>
  );
}
