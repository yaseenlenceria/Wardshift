import { Link } from "react-router";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const FLOW_STEPS = [
  "Positioning",
  "Website",
  "Search Presence",
  "Reputation",
  "Enquiry System",
  "Measurement",
];

/** Section 7 — New consultants split with vertical mini-flow. */
export default function NewConsultants() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 py-[72px] lg:grid-cols-2 lg:py-32">
        <div>
          <SectionHeading
            eyebrow="New to Private Practice"
            title="Starting or Expanding Your Private Practice?"
          />
          <motion.div
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p variants={fadeUp} className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-grey-700">
              The best time to build a strong digital foundation is before fragmented systems become
              difficult to fix. WardShift helps newly appointed consultants launch with positioning,
              presence and enquiry systems designed correctly from the start.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                to="/newly-appointed-consultants/"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-teal-500 px-6 py-3 text-[15px] font-semibold tracking-[0.01em] text-teal-600 transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
              >
                Explore New Consultant Growth
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* vertical mini-flow card */}
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="overflow-hidden rounded-[10px] border border-grey-300 bg-paper shadow-card"
        >
          <img
            src="/img-clinic-corridor.webp"
            alt="A modern private clinic corridor in soft daylight"
            className="h-44 w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="p-7">
          <p className="eyebrow text-teal-600">The launch sequence</p>
          <ol className="relative mt-6 space-y-0">
            {FLOW_STEPS.map((step, i) => (
              <motion.li key={step} variants={fadeUp} className="relative flex items-stretch gap-4">
                {/* connector */}
                <span className="flex w-8 flex-col items-center">
                  <span className="z-10 flex h-8 w-8 items-center justify-center rounded-full border border-teal-500/60 bg-white font-mono text-[11px] font-medium text-teal-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < FLOW_STEPS.length - 1 && (
                    <motion.span
                      className="w-0.5 flex-1 origin-top bg-teal-500/50"
                      initial={reduced ? false : { scaleY: 0 }}
                      whileInView={reduced ? undefined : { scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                    />
                  )}
                </span>
                <span className="pb-8 pt-1.5 text-[15px] font-semibold text-navy-800">{step}</span>
              </motion.li>
            ))}
          </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
