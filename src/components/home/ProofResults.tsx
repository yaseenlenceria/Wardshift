import { motion } from "framer-motion";
import { Link } from "react-router";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent } from "@/lib/motion";

const METRIC_SLOTS = ["Search visibility", "Top-3 rankings", "Monthly enquiries", "Calls"];

const CHANGED = [
  "Treatment pages",
  "Google profile",
  "Local search",
  "Tracking",
  "Reputation signals",
];

/**
 * Section — Proof / Results (id="results", nav anchor). A labelled template
 * shell for the case studies WardShift will publish: no invented numbers, no
 * invented quotes. The structure real results will follow.
 */
export default function ProofResults() {
  return (
    <section id="results" className="scroll-mt-20 border-t border-grey-300/60 bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="Results"
          title="Proof, published properly."
          lede="WardShift is a new kind of specialist practice-growth company. Rather than borrowing credibility, we publish results only when they are verified and permission-based."
        />

        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14"
        >
          {/* case-study shell */}
          <motion.article
            variants={fadeUp}
            className="rounded-[10px] border border-dashed border-grey-500/60 bg-paper p-7 lg:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-[22px] font-medium text-navy-800">
                Private Orthopaedic Practice
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-600/50 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-teal-600">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />
                Case-study template — example structure
              </span>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
                  The problem
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-grey-700">
                  A strong clinical reputation paired with weak local visibility — excellent care
                  that prospective patients simply were not finding.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
                  What changed
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {CHANGED.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-grey-300 bg-white px-3 py-1.5 text-[12px] font-medium text-navy-800"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
                  The metrics
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-3">
                  {METRIC_SLOTS.map((metric) => (
                    <div key={metric} className="rounded-lg border border-grey-300 bg-white px-4 py-3">
                      <dt className="font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-grey-500">
                        {metric}
                      </dt>
                      <dd className="mt-1 font-display text-[26px] font-medium leading-none text-grey-300">
                        —
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* doctor quote placeholder */}
            <div className="mt-8 border-t border-grey-300/60 pt-6">
              <div className="max-w-[640px]">
                <span className="font-display text-[26px] leading-none text-teal-500" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="mt-1 font-display text-[17px] font-medium italic leading-[1.5] text-grey-500">
                  A doctor’s own words will sit here — published only with permission, alongside
                  the verified numbers above.
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-grey-500">
                  — Consultant quote, reserved
                </p>
              </div>
            </div>

            <p className="mt-8 rounded-lg border border-grey-300/70 bg-white px-5 py-4 font-display text-[15px] italic leading-[1.6] text-navy-800">
              Verified WardShift results and permission-based case studies will be published here
              as they become available.
            </p>
          </motion.article>

          <motion.p variants={fadeUp} className="mt-10">
            <Link
              to="/growth-review/"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600"
            >
              Become the first published result
              <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">
                →
              </span>
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
