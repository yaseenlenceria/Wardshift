import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CtaBandProps {
  title: string;
  support?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

/** Code-drawn subtle teal line-chart motif at 6% opacity — draws in on scroll. */
function ChartMotif() {
  const reduced = usePrefersReducedMotion();
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g stroke="#2DD4BF" strokeWidth="1.5" fill="none">
        <motion.path
          d="M0 280 L180 240 L320 252 L480 190 L640 205 L820 130 L980 145 L1200 60"
          initial={reduced ? undefined : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <path d="M0 300 L180 268 L320 276 L480 228 L640 240 L820 178 L980 188 L1200 110" strokeDasharray="3 6" />
      </g>
      <g fill="#2DD4BF">
        {[180, 480, 820, 1200].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={[240, 190, 130, 60][i]}
            r="3"
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.3 }}
          />
        ))}
      </g>
    </svg>
  );
}

/** Full-width navy CTA band used near the bottom of every page. */
export default function CtaBand({
  title,
  support,
  primaryLabel = "Book a Practice Growth Review",
  primaryHref = "/growth-review/",
  secondaryLabel,
  secondaryHref,
  className,
}: CtaBandProps) {
  return (
    <section className={cn("relative overflow-hidden bg-navy-900", className)}>
      <ChartMotif />
      <div className="relative mx-auto max-w-[880px] px-6 py-24 text-center lg:py-32">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-white lg:text-[44px]"
          >
            {title}
          </motion.h2>
          {support ? (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-navy-100/80"
            >
              {support}
            </motion.p>
          ) : null}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Link
              to={primaryHref}
              className="group inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-navy-950 transition-colors duration-150 hover:bg-teal-400"
            >
              {primaryLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            {secondaryLabel && secondaryHref ? (
              <Link
                to={secondaryHref}
                className="text-[15px] font-semibold text-white underline decoration-teal-400/50 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-400"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
