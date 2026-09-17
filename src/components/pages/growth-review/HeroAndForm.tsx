import { motion } from "framer-motion";
import { Link } from "react-router";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import GrowthReviewForm from "@/components/pages/growth-review/GrowthReviewForm";
import { IconTick } from "@/components/icons";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const COVERS = [
  {
    title: "Visibility",
    detail: "why patients searching for your speciality find you — or your competitors",
  },
  {
    title: "Positioning",
    detail: "whether your expertise is obvious within seconds",
  },
  {
    title: "Website",
    detail: "whether your website is quietly winning or losing you enquiries",
  },
  {
    title: "Enquiry handling",
    detail: "where your enquiries come from, and what happens after contact",
  },
  {
    title: "Measurement",
    detail: "whether your marketing is actually producing patients",
  },
];

/** Section 1 — Hero copy (sticky left) + form card (right), above the fold together. */
export default function HeroAndForm() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced
    ? {}
    : {
        variants: staggerParent(0.08),
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 pb-[72px] pt-10 lg:pb-32 lg:pt-14">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Growth Review" }]} />
        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[45%_55%] lg:gap-14">
          {/* LEFT — copy column (sticky on desktop) */}
          <motion.div {...reveal} className="lg:sticky lg:top-24 lg:self-start">
            <motion.p variants={fadeUp} className="eyebrow text-teal-600">
              Practice Growth Review
            </motion.p>
            <WordReveal
              text="Book a Practice Growth Review."
              as="h1"
              wordDelay={0.045}
              className="mt-4 max-w-[16ch] text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
            />
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
            >
              A structured, honest look at the growth side of your practice — and a clear
              picture of what to build first. It answers the questions every practice owner
              asks: why aren&rsquo;t patients finding me, where do my enquiries come from, and
              is my marketing actually working?
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-9 space-y-4" aria-label="What the review covers">
              {COVERS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 [&>svg]:h-4 [&>svg]:w-4">
                    <IconTick />
                  </span>
                  <p className="text-[15px] leading-[1.6] text-grey-700">
                    <span className="font-semibold text-navy-800">{item.title}</span>
                    {" — "}
                    {item.detail}
                  </p>
                </li>
              ))}
            </motion.ul>

            <motion.p variants={fadeUp} className="mt-9 max-w-[52ch] text-[15px] leading-[1.7] text-grey-700">
              <span className="font-semibold text-navy-800">Who it's for:</span> private
              doctors, consultants, specialists, surgeons, dentists, dermatologists,
              physiotherapists and clinic owners — newly appointed or established.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-8 border-t border-grey-300 pt-6 font-mono text-[12px] leading-[1.7] tracking-[0.02em] text-grey-500"
            >
              No obligation · No hard sell · Your details are never shared — see our{" "}
              <Link
                to="/privacy/"
                className="text-teal-600 underline underline-offset-4 hover:text-teal-500"
              >
                Privacy Policy
              </Link>
            </motion.p>
          </motion.div>

          {/* RIGHT — form card */}
          <motion.div
            id="growth-review-form"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="scroll-mt-24 rounded-lg border border-grey-300 bg-white p-6 shadow-card sm:p-8"
          >
            <h2 className="font-display text-[24px] font-medium leading-[1.25] tracking-[-0.01em] text-navy-800">
              Request your Growth Review
            </h2>
            <div className="mt-7">
              <GrowthReviewForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
