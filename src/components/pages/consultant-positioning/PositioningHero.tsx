import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";

/* ---------- translation visual: clinical text -> structured clarity ---------- */

const CLINICAL_TEXT =
  "Consultant specialist with subspecialty fellowship training; tertiary referral practice encompassing complex primary and revision procedures, multi-disciplinary case review and structured post-operative pathways.";

const FIELDS = [
  { label: "Specialty", value: "Consultant specialist — clearly stated" },
  { label: "Conditions", value: "The problems patients bring, in their words" },
  { label: "Procedures", value: "What is performed, precisely named" },
  { label: "Locations", value: "Where patients are seen" },
];

function TranslationVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[520px]" aria-hidden="true">
      <div className="grid overflow-hidden rounded-[10px] border border-grey-300 bg-white shadow-card sm:grid-cols-[1fr_auto_1fr]">
        {/* clinical source */}
        <motion.div
          className="border-b border-grey-100 bg-paper p-5 sm:border-b-0 sm:border-r"
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
            Clinical record
          </p>
          <motion.p
            className="mt-3 font-mono text-[11px] leading-[1.7] text-grey-500"
            initial={reduced ? false : { opacity: 1, filter: "blur(0px)" }}
            animate={reduced ? undefined : { opacity: 0.55, filter: "blur(0.6px)" }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 1.6 }}
          >
            {CLINICAL_TEXT}
          </motion.p>
        </motion.div>

        {/* bridge arrow */}
        <div className="hidden items-center justify-center px-2 sm:flex">
          <motion.span
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 1.2 }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-500/40 bg-teal-100/60 text-teal-600"
          >
            <MoveRight className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </div>

        {/* restructured output */}
        <div className="p-5">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-teal-600">
            Patient-facing clarity
          </p>
          <ul className="mt-3 space-y-2.5">
            {FIELDS.map((field, i) => (
              <motion.li
                key={field.label}
                initial={reduced ? false : { opacity: 0, y: -12 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.8 + i * 0.09 }}
                className="rounded-lg border border-grey-100 bg-white px-3 py-2"
              >
                <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-grey-500">
                  {field.label}
                </p>
                <p className="mt-0.5 text-[12.5px] font-semibold leading-snug text-navy-800">
                  {field.value}
                </p>
              </motion.li>
            ))}
          </ul>
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mt-3 font-mono text-[9.5px] leading-[1.6] text-grey-500"
          >
            Clinical detail preserved beneath — accuracy is never removed.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ---------- hero section ---------- */

export default function PositioningHero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 pb-20 pt-10 lg:grid-cols-2 lg:pb-28 lg:pt-14">
        <div className="max-w-[560px]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "How We Help", href: "/how-we-help/" },
              { label: "Consultant Positioning" },
            ]}
          />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
            className="eyebrow mt-8 text-teal-600"
          >
            Consultant Positioning
          </motion.p>
          <WordReveal
            as="h1"
            text="Make Your Expertise Easier to Understand."
            wordDelay={0.045}
            duration={0.7}
            className="mt-4 max-w-[52ch] text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
          />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 }}
            className="mt-5 max-w-[52ch] font-display text-[19px] font-medium italic leading-[1.5] text-navy-800/60"
          >
            &ldquo;Why do people search for my service but find competitors?&rdquo;
          </motion.p>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
            className="mt-5 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
          >
            Make your expertise obvious in seconds to the right patients.
            Positioning translates your expertise into clarity — accurately,
            and without diluting it.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
            className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <Link
              to="/growth-review/"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
            >
              See How Your Expertise Reads
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="#positioning-covers"
              className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/50 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
            >
              What positioning covers ↓
            </a>
          </motion.div>
        </div>

        <TranslationVisual reduced={reduced} />
      </div>
    </section>
  );
}
