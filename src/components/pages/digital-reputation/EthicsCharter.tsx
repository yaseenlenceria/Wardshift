import { motion } from "framer-motion";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";

const CHARTER = [
  "We never generate fake reviews.",
  "We never buy reviews.",
  "We never review-gate — filtering who is invited to leave feedback.",
  "We never suppress legitimate criticism.",
  "We never claim medical superiority.",
];

export default function EthicsCharter() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[720px] px-6 py-20 lg:py-32">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.98, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="rounded-[10px] border border-grey-300 bg-white p-8 shadow-card sm:p-12"
        >
          <p className="eyebrow text-center text-teal-600">Ethics, in writing</p>
          <h2 className="mt-4 text-center text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]">
            Where We Draw the Line.
          </h2>
          <div className="mx-auto mt-8 max-w-[520px] border-t border-grey-300 pt-8">
            <ul className="space-y-5">
              {CHARTER.map((line, i) => (
                <li key={line} className="flex items-start gap-3.5">
                  <motion.span
                    aria-hidden="true"
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={reduced ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.15 + i * 0.12 }}
                    className="mt-[11px] h-[2px] w-6 shrink-0 origin-left bg-teal-500"
                  />
                  <span className="text-[16.5px] font-medium leading-[1.6] text-navy-800">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-grey-100 pt-8 text-center font-display text-[19px] italic leading-[1.55] text-grey-700">
              “A reputation built on accuracy is the only kind worth having — and
              the only kind we build.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
