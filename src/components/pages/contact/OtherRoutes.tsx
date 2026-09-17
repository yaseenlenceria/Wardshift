import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const ROUTES = [
  {
    eyebrow: "Editorial",
    title: "Insights",
    detail: "Read our thinking on the business of private practice.",
    href: "/insights/",
  },
  {
    eyebrow: "Framework",
    title: "Growth System",
    detail: "See the framework behind every engagement.",
    href: "/growth-system/",
  },
  {
    eyebrow: "Company",
    title: "About",
    detail: "Why WardShift exists and how we work.",
    href: "/about/",
  },
];

/** Section 2 — Other routes (3 cards). */
export default function OtherRoutes() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="border-t border-grey-300 bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading eyebrow="Other routes" title="Keep Exploring." />
        <motion.div
          variants={reduced ? undefined : staggerParent(0.08)}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {ROUTES.map((route) => (
            <motion.div key={route.href} variants={fadeUp} className="h-full">
              <Link
                to={route.href}
                className="group flex h-full flex-col justify-between rounded-[10px] border border-grey-300 bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
              >
                <div>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-teal-600">
                    {route.eyebrow}
                  </p>
                  <h3 className="mt-3 font-sans text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
                    {route.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-grey-700">{route.detail}</p>
                </div>
                <ArrowRight
                  className="mt-6 h-4 w-4 text-teal-600 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
