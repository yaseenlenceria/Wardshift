import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { IconChart, IconSearchLens, IconShield, IconTarget } from "@/components/icons";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import type { ReactNode } from "react";

const PRINCIPLES: { icon: ReactNode; title: string; detail: string }[] = [
  {
    icon: <IconSearchLens />,
    title: "Diagnose first",
    detail: "Every engagement begins with a Growth Review — evidence before activity.",
  },
  {
    icon: <IconTarget />,
    title: "Objective-led",
    detail: "The practice's goals choose the channels, never the other way around.",
  },
  {
    icon: <IconShield />,
    title: "Transparent",
    detail: "Clients see what we see — the data, the reasoning and the trade-offs.",
  },
  {
    icon: <IconChart />,
    title: "Built for the long term",
    detail: "Foundations that compound, not campaigns that expire.",
  },
];

const CAPABILITIES = [
  "Strategy",
  "Positioning",
  "Websites",
  "SEO",
  "Local Search",
  "Reputation",
  "Patient Acquisition",
  "Google Ads",
  "Landing Pages",
  "Enquiry Systems",
  "CRM",
  "Follow-Up",
  "Analytics",
  "Measurement",
  "AI & Automation (where appropriate)",
];

/** Section 4 — How We Work. */
export function HowWeWork() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced
    ? {}
    : {
        variants: staggerParent(0.08),
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.25 },
      };

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="How we work"
          title="Principles Before Tactics."
          lede="Every engagement runs the same way: understand first, then build deliberately, then measure honestly."
        />
        <motion.div
          {...reveal}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal-100 text-navy-800 [&>svg]:h-6 [&>svg]:w-6">
                {p.icon}
              </span>
              <h3 className="mt-5 font-sans text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-grey-700">{p.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 rounded-[10px] border border-grey-300 bg-white p-7 lg:p-8"
        >
          <p className="eyebrow text-teal-600">A note on honesty</p>
          <p className="mt-3 max-w-[68ch] text-[16px] leading-[1.7] text-grey-700">
            WardShift is a growing specialist company. We publish verified results and
            permission-based case studies as they become available — and we don't borrow
            credibility in the meantime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/** Section 5 — What We Work On (capability chip wall). */
export function Capabilities() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="border-t border-grey-300 bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="What we work on"
          title="The Full Growth Side, Under One Roof."
        />
        <motion.ul
          variants={reduced ? undefined : staggerParent(0.03)}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 flex max-w-[880px] flex-wrap gap-2.5"
          aria-label="WardShift capabilities"
        >
          {CAPABILITIES.map((cap) => (
            <motion.li
              key={cap}
              variants={fadeUp}
              className="rounded-full border border-grey-300 bg-paper px-4 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-navy-800 transition-colors duration-150 hover:border-teal-500/50 hover:bg-teal-100"
            >
              {cap}
            </motion.li>
          ))}
        </motion.ul>
        <div className="mt-10 border-t border-grey-300 pt-8">
          <Link
            to="/how-we-help/"
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600"
          >
            Explore how we help
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
