import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent } from "@/lib/motion";

interface Outcome {
  name: string;
  statement: string;
  behind: string[];
  href: string;
}

const OUTCOMES: Outcome[] = [
  {
    name: "Be discovered",
    statement: "Patients should find your practice when they search for your speciality.",
    behind: ["SEO", "Local search", "Google Business Profile", "Content", "Treatment pages"],
    href: "/search-visibility/",
  },
  {
    name: "Be understood",
    statement: "Make it immediately clear who you help, what you treat and why your expertise matters.",
    behind: ["Website strategy", "Copy", "Information architecture", "Treatment pages"],
    href: "/consultant-positioning/",
  },
  {
    name: "Be trusted",
    statement: "Make your online presence support the clinical reputation you have built offline.",
    behind: ["Reviews", "Reputation", "Profiles", "Trust signals"],
    href: "/digital-reputation/",
  },
  {
    name: "Be contacted",
    statement: "Make the next step clear and easy.",
    behind: ["Conversion", "Calls", "Forms", "Booking pathways"],
    href: "/practice-enquiry-systems/",
  },
  {
    name: "Be measured",
    statement: "Understand what is actually producing opportunities.",
    behind: ["Analytics", "Call tracking", "Form tracking", "Search performance"],
    href: "/crm-follow-up/",
  },
  {
    name: "Grow",
    statement: "Use the data to continuously improve the system.",
    behind: ["Search growth", "Content", "Conversion improvement", "Campaigns"],
    href: "/practice-growth-strategy/",
  },
];

/** Section — What We Actually Improve: outcomes first, mechanics underneath. */
export default function Outcomes() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="What We Actually Improve"
          title="The outcome comes first. The technical work sits underneath."
          lede="Everything WardShift does maps to one of six outcomes for your practice."
        />

        <motion.div
          variants={staggerParent(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {OUTCOMES.map((outcome) => (
            <motion.div key={outcome.name} variants={fadeUp} className="h-full">
              <Link
                to={outcome.href}
                className="group flex h-full flex-col rounded-[10px] border border-grey-300 bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
              >
                <h3 className="font-display text-[24px] font-medium tracking-[-0.01em] text-navy-800">
                  {outcome.name}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-grey-700">
                  {outcome.statement}
                </p>
                <div className="mt-5 border-t border-grey-300/60 pt-4">
                  <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-grey-500">
                    Behind the scenes
                  </p>
                  <p className="mt-2 font-mono text-[11px] font-medium uppercase leading-[1.9] tracking-[0.08em] text-navy-800/70">
                    {outcome.behind.join(" · ")}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-teal-600">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
