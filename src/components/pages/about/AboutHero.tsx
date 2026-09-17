import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

/**
 * The real WardShift mark, revealed with a premium clip + scale + fade:
 * the mark rises out of a clipped mask and settles into place.
 */
function AnimatedMark() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <img src="/logo-mark.png" alt="" className="h-16 w-auto" aria-hidden="true" />;
  }

  return (
    <motion.span
      className="inline-block overflow-hidden"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
    >
      <motion.img
        src="/logo-mark.png"
        alt=""
        aria-hidden="true"
        className="h-16 w-auto"
        initial={{ y: "55%", scale: 1.18, opacity: 0 }}
        animate={{ y: "0%", scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
      />
    </motion.span>
  );
}

/** Section 1 — Page hero: centered column, mark draw, word-stagger H1. */
export default function AboutHero() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced
    ? {}
    : {
        variants: staggerParent(0.08),
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.4 },
      };

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 pb-16 pt-10 lg:pb-24 lg:pt-14">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <motion.div {...reveal} className="mx-auto mt-14 max-w-[880px] text-center">
          <motion.div variants={fadeUp} className="flex justify-center">
            <AnimatedMark />
          </motion.div>
          <motion.p variants={fadeUp} className="eyebrow mt-8 text-teal-600">
            About WardShift
          </motion.p>
          <WordReveal
            text="The Gap Between Clinical Excellence and Patient Discoverability."
            as="h1"
            className="mx-auto mt-4 max-w-[20ch] text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
          />
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-[62ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
          >
            WardShift exists because of a simple observation: a doctor can be exceptional
            clinically and still be difficult for the right patients to find, understand and
            contact. Those are different disciplines — and private practice needs both.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-[58ch] font-display text-[21px] font-medium italic leading-[1.5] text-navy-800 lg:text-[24px]"
          >
            We understand exactly how a patient goes from searching for treatment to choosing a
            doctor — and we know how to improve every digital step in that journey.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
