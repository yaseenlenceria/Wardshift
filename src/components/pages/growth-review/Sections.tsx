import { motion } from "framer-motion";
import { Minus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { IconTick } from "@/components/icons";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const AFTER_STEPS = [
  {
    title: "We review your request",
    detail: "Within normal business hours, we read what you've told us and look at the practice as it stands today.",
  },
  {
    title: "We schedule a conversation",
    detail: "A short call to understand your practice, your goals and what prompted the review.",
  },
  {
    title: "You receive your Growth Review",
    detail: "A clear written picture of where the practice stands and what to build first.",
  },
];

const IS_ITEMS = [
  "Structured",
  "Evidence-based",
  "Specific to your practice",
  "Obligation-free",
];

const ISNT_ITEMS = [
  "A sales script",
  "A generic automated report",
  "A guarantee of results",
  "Medical or business advice",
];

const FAQS = [
  {
    q: "Is the Growth Review free?",
    a: "Details are confirmed when we respond to your request; the review is designed to be genuinely useful either way.",
  },
  {
    q: "How long does it take?",
    a: "The conversation is short; the review is prepared carefully and delivered promptly.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "No — just tell us about your practice and what you'd like to improve.",
  },
  {
    q: "What if we're not a fit?",
    a: "We'll say so honestly and point you in a useful direction.",
  },
];

/** Section 2 — What Happens After (3-step flow with drawing connector). */
export function AfterSteps() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced
    ? {}
    : {
        variants: staggerParent(0.12),
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 },
      };

  return (
    <section className="border-t border-grey-300 bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="What happens after"
          title="Three Steps. No Pressure."
        />
        <motion.div {...reveal} className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Connector line (draws left → right on desktop) */}
          {!reduced && (
            <motion.div
              aria-hidden="true"
              className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-teal-400 md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, ease: EASE_OUT }}
            />
          )}
          {AFTER_STEPS.map((step, i) => (
            <motion.div key={step.title} variants={fadeUp} className="relative">
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-teal-500/40 bg-white font-mono text-[13px] font-medium tracking-[0.08em] text-teal-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-sans text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[36ch] text-[15px] leading-[1.7] text-grey-700">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** Section 3 — What a Review Is (and Isn't), dark. */
export function IsAndIsnt() {
  const reduced = usePrefersReducedMotion();
  const col = (x: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, x },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, ease: EASE_OUT },
        };
  const listReveal = reduced
    ? {}
    : {
        variants: staggerParent(0.08),
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 },
      };

  return (
    <section className="bg-navy-900">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="Set expectations"
          title="What a Review Is — and Isn't."
          dark
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div {...col(-24)} className="rounded-[10px] border border-white/[0.08] bg-navy-800/60 p-7 lg:p-9">
            <p className="eyebrow text-teal-400">A Growth Review is</p>
            <motion.ul {...listReveal} className="mt-6 space-y-4">
              {IS_ITEMS.map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-teal-400 [&>svg]:h-4 [&>svg]:w-4">
                    <IconTick />
                  </span>
                  <span className="text-[16px] leading-[1.6] text-white">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div {...col(24)} className="rounded-[10px] border border-white/[0.08] bg-navy-800/60 p-7 lg:p-9">
            <p className="eyebrow text-grey-500">A Growth Review isn't</p>
            <motion.ul {...listReveal} className="mt-6 space-y-4">
              {ISNT_ITEMS.map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-grey-500">
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-[16px] leading-[1.6] text-navy-100/80">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Section 4 — FAQ accordion + closing nudge strip. */
export function FaqAndClosing() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced
    ? {}
    : {
        variants: staggerParent(0.08),
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 },
      };

  const scrollToForm = () => {
    const el = document.getElementById("growth-review-form");
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    const first = el.querySelector<HTMLElement>("input, select, textarea, button");
    first?.focus({ preventScroll: true });
  };

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[880px] px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="Questions"
          title="Before You Ask."
          align="center"
        />
        <motion.div {...reveal} className="mt-12">
          <Accordion type="single" collapsible className="rounded-[10px] border border-grey-300 bg-white px-6">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`} className="border-grey-300">
                <AccordionTrigger className="py-5 text-left font-sans text-[16px] font-semibold text-navy-800 hover:no-underline [&>svg]:text-teal-600">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-[1.7] text-grey-700">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div {...reveal} className="mt-16 text-center lg:mt-20">
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-[34ch] font-display text-[22px] font-medium leading-[1.35] tracking-[-0.01em] text-navy-800 lg:text-2xl"
          >
            Doctors handle the clinical work. Let us look at the growth side.
          </motion.p>
          <motion.div variants={fadeUp}>
            <button
              type="button"
              onClick={scrollToForm}
              className="mt-7 inline-flex h-12 items-center justify-center rounded-lg bg-navy-800 px-6 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
            >
              Request My Growth Review
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
