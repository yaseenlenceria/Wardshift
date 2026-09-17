import { motion } from "framer-motion";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

/**
 * Compact vertical split diagram: Clinical Reputation — WardShift — Patient
 * Discoverability. Draws center-out (node first, then connectors + end boxes).
 */
function SplitDiagram({ reduced }: { reduced: boolean }) {
  const box =
    "rounded-[10px] border border-grey-300 bg-white px-5 py-4 text-center shadow-card";
  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, scale: 0.92 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, amount: 0.6 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };
  const line = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { scaleY: 0 },
          whileInView: { scaleY: 1 },
          viewport: { once: true, amount: 0.6 },
          transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="mx-auto flex w-full max-w-[280px] flex-col items-center" aria-hidden="true">
      <motion.div {...reveal(0.35)} className={box}>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
          Clinical reputation
        </p>
        <p className="mt-1 text-[13px] text-grey-500">Built over years of practice</p>
      </motion.div>
      <motion.div {...line(0.25)} className="h-8 w-px origin-top bg-grey-300" />
      <motion.div
        {...reveal(0)}
        className="w-full rounded-[10px] bg-navy-800 px-5 py-4 text-center shadow-card"
      >
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
          WardShift
        </p>
        <p className="mt-1 text-[13px] text-navy-100/80">The growth side, handled</p>
      </motion.div>
      <motion.div {...line(0.25)} className="h-8 w-px origin-top bg-grey-300" />
      <motion.div {...reveal(0.35)} className={box}>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
          Patient discoverability
        </p>
        <p className="mt-1 text-[13px] text-grey-500">Built deliberately, online</p>
      </motion.div>
    </div>
  );
}

/** Section 2 — Why WardShift Exists. */
export default function WhySection() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced
    ? {}
    : {
        variants: staggerParent(0.1),
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 },
      };

  return (
    <section className="border-t border-grey-300 bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div {...reveal}>
            <motion.p variants={fadeUp} className="eyebrow text-teal-600">
              Why WardShift exists
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
            >
              Two disciplines. One practice.
            </motion.h2>
            <div className="mt-6 max-w-[68ch] space-y-5 text-[17px] leading-[1.7] text-grey-700">
              <motion.p variants={fadeUp}>
                Clinical training produces doctors; nothing in it teaches search visibility,
                positioning, websites or enquiry systems.
              </motion.p>
              <motion.p variants={fadeUp}>
                Meanwhile, the patient journey has moved online — discovery, validation, trust
                and first contact now happen before any human conversation.
              </motion.p>
              <motion.p variants={fadeUp}>
                WardShift was built to own that gap professionally: the growth side of private
                practice, handled with the seriousness healthcare deserves.
              </motion.p>
            </div>
          </motion.div>
          <SplitDiagram reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
