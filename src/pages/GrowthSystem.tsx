import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import FrameworkStrip from "@/components/pages/growth-system/FrameworkStrip";
import StageSections from "@/components/pages/growth-system/StageSections";
import EngagementFlow from "@/components/pages/growth-system/EngagementFlow";
import ReviewCovers from "@/components/pages/growth-system/ReviewCovers";
import Principles from "@/components/pages/growth-system/Principles";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const H1_WORDS = [
  "FOUND",
  "→",
  "UNDERSTOOD",
  "→",
  "TRUSTED",
  "→",
  "CONTACTED",
  "→",
  "MEASURED",
  "→",
  "GROWN",
];

/** Hero H1: stage names reveal word-by-word, arrows draw between them. */
function FrameworkH1() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <h1 className="mt-5 font-display text-[38px] font-medium leading-[1.15] tracking-[-0.02em] text-white lg:text-[56px]">
        {H1_WORDS.map((w, i) =>
          w === "→" ? (
            <span key={`a-${i}`} aria-hidden="true" className="mx-2 text-teal-400">
              →
            </span>
          ) : (
            <span key={w}> {w}</span>
          ),
        )}
      </h1>
    );
  }

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      aria-label="Found, Understood, Trusted, Contacted, Measured, Grown"
      className="mt-5 font-display text-[38px] font-medium leading-[1.15] tracking-[-0.02em] text-white lg:text-[56px]"
    >
      {H1_WORDS.map((word, i) =>
        word === "→" ? (
          <motion.span
            key={`arrow-${i}`}
            aria-hidden="true"
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: {
                opacity: 1,
                scaleX: 1,
                transition: { duration: 0.4, ease: EASE_OUT, delay: 0.15 + i * 0.15 },
              },
            }}
            className="mx-1.5 inline-block origin-left text-teal-400 lg:mx-2.5"
          >
            →
          </motion.span>
        ) : (
          <span key={word} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
            <motion.span
              variants={{
                hidden: { y: "100%" },
                visible: {
                  y: "0%",
                  transition: { duration: 0.7, ease: EASE_OUT, delay: 0.15 + i * 0.15 },
                },
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ),
      )}
    </motion.h1>
  );
}

export default function GrowthSystem() {
  return (
    <>
      <Seo
        title="The Growth System: Found, Understood, Trusted | WardShift"
        description="The Growth System connects every stage of the private patient journey: Found, Understood, Trusted, Contacted, Measured, Grown. See how engagements work."
        path="/growth-system/"
      />

      {/* Section 1 — dark hero with framework strip */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(/noise.png)", backgroundSize: "512px 512px" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-28">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Growth System" }]}
            className="[&_a]:text-navy-100/60 [&_a:hover]:text-teal-400 [&_span]:text-white"
          />
          <motion.div
            variants={staggerParent(0.08)}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-10 max-w-[880px] text-center"
          >
            <motion.p variants={fadeUp} className="eyebrow text-teal-400">
              The WardShift Growth System
            </motion.p>
            <FrameworkH1 />
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-[56ch] text-[18px] leading-[1.65] text-navy-100/80 lg:text-xl"
            >
              Private-practice growth is a system, not a tactic. Every WardShift engagement is
              organised around these six stages — because each one decides whether the next can
              work.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row"
            >
              <Link
                to="/growth-review/"
                className="group inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-navy-950 transition-colors duration-150 hover:bg-teal-400"
              >
                Book a Growth Review
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="#how-engagements-work"
                className="text-[15px] font-semibold text-white underline decoration-teal-400/50 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-400"
              >
                How engagements work ↓
              </a>
            </motion.div>
          </motion.div>

          <div className="mx-auto max-w-site">
            <FrameworkStrip />
          </div>
        </div>
      </section>

      {/* Section 2 — the six stages in depth, with scroll-spy rail */}
      <div className="bg-paper">
        <StageSections />
      </div>

      {/* Section 3 — how engagements work */}
      <EngagementFlow />

      {/* Section 4 — what a Growth Review covers */}
      <ReviewCovers />

      {/* Section 5 — principles */}
      <Principles />

      <RelatedLinks
        items={[
          {
            category: "Services",
            title: "How We Help — the full capability system",
            href: "/how-we-help/",
          },
          {
            category: "Audiences",
            title: "Who We Help — private doctors & new consultants",
            href: "/who-we-help/",
          },
          {
            category: "Editorial",
            title: "Insights — the business of private practice",
            href: "/insights/",
          },
        ]}
      />

      <CtaBand
        title="See your practice through the six stages."
        support="A Growth Review maps your practice against the full system — visibility, positioning, website, enquiry handling and measurement."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="How we help →"
        secondaryHref="/how-we-help/"
      />
    </>
  );
}
