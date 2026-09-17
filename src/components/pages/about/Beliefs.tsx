import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const BELIEFS = [
  {
    statement: "Measurement over hype.",
    detail:
      "If growth can't be measured honestly, it can't be managed. We report evidence, not excitement — and we never invent results.",
  },
  {
    statement: "Ethics in healthcare marketing.",
    detail:
      "No fake reviews, no guaranteed rankings, no exaggerated claims. Trust is the product; we don't counterfeit it.",
  },
  {
    statement: "Systems over one-off campaigns.",
    detail:
      "Campaigns end. Systems compound. We build the connected infrastructure of practice growth.",
  },
];

/** Section 3 — What We Believe (dark). */
export default function Beliefs() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced
    ? {}
    : {
        variants: staggerParent(0.12),
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.25 },
      };

  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <motion.p
          variants={fadeUp}
          {...(reduced
            ? {}
            : { initial: "hidden", whileInView: "visible", viewport: { once: true } })}
          className="eyebrow text-teal-400"
        >
          What we believe
        </motion.p>
        <motion.div {...reveal} className="mt-12 space-y-14 lg:mt-16 lg:space-y-16">
          {BELIEFS.map((belief, i) => (
            <motion.div
              key={belief.statement}
              variants={fadeUp}
              className="grid gap-5 border-t border-white/[0.08] pt-10 first:border-t-0 first:pt-0 sm:grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr]"
            >
              <motion.span
                className="font-mono text-[15px] font-medium tracking-[0.08em]"
                initial={reduced ? false : { color: "#64748B" }}
                whileInView={reduced ? undefined : { color: "#2DD4BF" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.2 }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <div>
                <WordReveal
                  text={belief.statement}
                  as="h3"
                  className="max-w-[24ch] font-display text-[24px] font-medium leading-[1.25] tracking-[-0.01em] text-white lg:text-[28px]"
                />
                <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.7] text-navy-100/80">
                  {belief.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
