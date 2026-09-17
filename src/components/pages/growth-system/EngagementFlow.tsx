import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { EASE_OUT, fadeUp, staggerParent } from "@/lib/motion";

const STEPS = [
  {
    num: "01",
    title: "Growth Review",
    text: "A structured look at where the practice stands across all six stages — visibility, positioning, website, enquiry handling and measurement.",
    hint: "One structured review",
  },
  {
    num: "02",
    title: "Strategy",
    text: "The findings become a plan: what to fix first, what to build next, and what each piece is expected to contribute.",
    hint: "Weeks vary by scope",
  },
  {
    num: "03",
    title: "Build",
    text: "The agreed work is delivered — websites, search, content, enquiry systems — in a sequence that respects the six stages.",
    hint: "Weeks vary by scope",
  },
  {
    num: "04",
    title: "Measure & Grow",
    text: "Results are tracked against the plan, reported plainly, and the system is refined as the evidence accumulates.",
    hint: "Ongoing",
  },
];

/** Section 3 — How engagements work: 4-step connector flow with detail cards. */
export default function EngagementFlow() {
  return (
    <section id="how-engagements-work" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="Working together"
          title="Structured. Measured. Calm."
          lede="Every engagement begins with the Growth Review — never with a package. What follows is decided by what the review finds."
        />

        <motion.ol
          variants={staggerParent(0.1, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* connector line */}
          <motion.span
            aria-hidden="true"
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1, ease: EASE_OUT } },
            }}
            className="absolute left-0 right-0 top-[13px] hidden h-px origin-left bg-grey-300 lg:block"
          />
          {STEPS.map((step) => (
            <motion.li key={step.num} variants={fadeUp} className="relative">
              <span
                aria-hidden="true"
                className="mb-5 hidden h-[27px] w-[27px] items-center justify-center rounded-full border border-teal-500/50 bg-white lg:flex"
              >
                <span className="h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <div className="h-full rounded-[10px] border border-grey-300 bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-teal-600">
                    {step.num}
                  </span>
                  <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-grey-500">
                    {step.hint}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-grey-700">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
