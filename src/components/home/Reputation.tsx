import { motion } from "framer-motion";
import { Link } from "react-router";
import SectionHeading from "@/components/SectionHeading";
import { IconShield } from "@/components/icons";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const SIGNALS = [
  "Reviews",
  "Doctor profile",
  "Google profile",
  "Qualifications",
  "Treatment expertise",
  "Patient experience",
];

/**
 * Section — reputation convergence. A clinical reputation earned offline only
 * works when its signals are visible online: animated connector lines draw the
 * signals into a central Visible Trust card. No figures — nothing to badge.
 */
export default function Reputation() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="max-w-prose">
            <SectionHeading
              eyebrow="Reputation"
              title="Your reputation already exists. The question is whether patients can see it."
            />
            <motion.div
              variants={staggerParent(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.p variants={fadeUp} className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-grey-700">
                Years of clinical work have already built something valuable. WardShift makes that
                reputation visible where patients actually look — clearly, accurately and without
                exaggeration.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-7">
                <Link
                  to="/digital-reputation/"
                  className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600"
                >
                  How digital reputation works
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              </motion.p>
            </motion.div>
          </div>

          {/* convergence visual */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="grid items-center gap-10 sm:grid-cols-[1fr_auto] sm:gap-16">
              {/* signals */}
              <div className="rounded-[10px] border border-grey-300 bg-paper p-6 shadow-card">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
                  Clinical reputation — earned offline
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-2.5">
                  {SIGNALS.map((signal, i) => (
                    <motion.li
                      key={signal}
                      initial={reduced ? false : { opacity: 0, y: 12 }}
                      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 + i * 0.09 }}
                      className="flex items-center gap-2 rounded-lg border border-grey-300/80 bg-white px-3 py-2.5"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-navy-800/60" aria-hidden="true" />
                      <span className="text-[12.5px] font-medium leading-snug text-navy-800">{signal}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* visible trust card */}
              <motion.div
                initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 1 }}
                className="relative z-10 rounded-[10px] border border-teal-500/50 bg-white p-6 text-center shadow-[0_0_36px_rgba(20,184,166,0.14)] sm:w-[220px]"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <IconShield className="h-6 w-6" />
                </span>
                <p className="mt-4 font-display text-[22px] font-medium leading-tight text-navy-800">
                  Visible Trust
                </p>
                <p className="mt-2 text-[12.5px] leading-[1.55] text-grey-500">
                  What patients actually see when they look you up
                </p>
              </motion.div>
            </div>

            {/* connector lines drawing signals → trust (desktop) */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
              aria-hidden="true"
            >
              {SIGNALS.map((signal, i) => {
                const y = 22 + i * 11.5;
                return (
                  <motion.path
                    key={signal}
                    d={`M 34 ${y} C 52 ${y}, 62 50, 76 50`}
                    fill="none"
                    stroke="#14B8A6"
                    strokeOpacity="0.45"
                    strokeWidth="1.4"
                    vectorEffect="non-scaling-stroke"
                    initial={reduced ? undefined : { pathLength: 0 }}
                    whileInView={reduced ? undefined : { pathLength: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: "easeInOut", delay: 0.45 + i * 0.12 }}
                  />
                );
              })}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
