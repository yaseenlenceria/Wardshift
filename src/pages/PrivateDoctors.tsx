import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, ArrowDown, Lock } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import Seo from "@/components/Seo";
import WordReveal from "@/components/WordReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { faqPageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ---------------------------------- data ---------------------------------- */

const GATES = [
  { label: "Referral", x: 4, y: 86 },
  { label: "Name search", x: 27, y: 70 },
  { label: "Profiles", x: 50, y: 54 },
  { label: "Website", x: 73, y: 34 },
  { label: "Contact", x: 96, y: 12 },
];

const DIFFERENCES = [
  {
    title: "Professional reputation",
    copy: "Built over years of clinical work — and damaged quickly by careless marketing.",
  },
  {
    title: "Patient trust",
    copy: "Earned through clarity and credibility, never through persuasion or pressure.",
  },
  {
    title: "Referral validation",
    copy: "Referred patients verify the name they were given before they ever make contact.",
  },
  {
    title: "Specialist expertise",
    copy: "It must be explained clearly — without being diluted into generalities.",
  },
  {
    title: "Search behaviour",
    copy: "Patients research differently than consumers: carefully, privately, and over time.",
  },
  {
    title: "Practice location",
    copy: "Patients weigh travel, hospitals and convenience alongside reputation.",
  },
  {
    title: "Enquiry handling",
    copy: "Administrative tone matters; every reply reflects the practice itself.",
  },
  {
    title: "Healthcare communication",
    copy: "Accuracy and ethics are non-negotiable — in every sentence, on every channel.",
  },
  {
    title: "Measurement",
    copy: "Growth means appropriate enquiries and outcomes — not vanity metrics.",
  },
];

const CONTRAST_ROWS: { ordinary: string; required: string }[] = [
  { ordinary: "Attention", required: "Trust" },
  { ordinary: "Clicks", required: "Appropriate enquiries" },
  { ordinary: "Persuasion", required: "Clarity" },
  { ordinary: "Volume", required: "Relevance" },
  { ordinary: "Campaigns", required: "Systems" },
];

const GROWTH_STAGES = ["Found", "Understood", "Trusted", "Contacted", "Measured", "Grown"];

const FAQS = [
  {
    q: "I rely on referrals. Why does digital matter?",
    a: "Referrals are validated online. A referred patient will search your name before booking — and a weak digital presence quietly loses patients who were already primed to choose you.",
  },
  {
    q: "Will this feel too commercial for medicine?",
    a: "WardShift's work is designed to read as professional and credible — never sales-driven. The goal is clarity about your expertise, not persuasion.",
  },
  {
    q: "I'm with hospital groups and clinics already — where does my own presence fit?",
    a: "Your personal presence connects referrals, hospital listings and patient research into one clear picture — so every route a patient takes leads to the same, accurate story.",
  },
];

/* --------------------------- trust-journey diagram ------------------------ */

function TrustJourney() {
  const reduced = usePrefersReducedMotion();
  const path = GATES.map((g, i) => `${i === 0 ? "M" : "L"} ${g.x} ${g.y}`).join(" ");

  return (
    <div className="rounded-[10px] border border-grey-300 bg-white p-6 shadow-card lg:p-7">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-grey-500">
        How patients actually arrive
      </p>
      <div className="relative mt-6 h-[240px] sm:h-[280px]">
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={path}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d={path}
            fill="none"
            stroke="#14B8A6"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reduced ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduced ? 0 : 2, ease: "linear", delay: 0.3 }}
          />
        </svg>
        {GATES.map((gate, i) => (
          <motion.div
            key={gate.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${gate.x}%`, top: `${gate.y}%` }}
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: reduced ? 0 : 0.3 + i * 0.4, ease: EASE_OUT }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-500/60 bg-white text-teal-600 shadow-card">
              <Lock className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span
              className={cn(
                "mt-2 whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-grey-500",
                i === 0 && "translate-x-3",
                i === GATES.length - 1 && "-translate-x-3",
              )}
            >
              {gate.label}
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-5 border-t border-grey-300/70 pt-4 text-[13px] leading-[1.6] tracking-[0.01em] text-grey-500">
        Every gate is a trust checkpoint. A weakness at any one quietly ends the journey.
      </p>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function PrivateDoctors() {
  return (
    <>
      <Seo
        title="Growth Systems Built Around Private Doctors | WardShift"
        description="Healthcare growth is not local-business marketing. WardShift builds growth systems around the realities of private practice — reputation, trust and measurement."
        path="/private-doctors/"
        schema={faqPageSchema(FAQS)}
      />

      {/* Section 1 — Hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 pb-[72px] pt-12 lg:pb-32 lg:pt-16">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Who We Help", href: "/who-we-help/" },
              { label: "Private Doctors" },
            ]}
          />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow text-teal-600">For Private Doctors</p>
              <WordReveal
                text="Growth Systems Built Around Private Doctors."
                as="h1"
                className="mt-4 text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
                wordDelay={0.045}
                duration={0.7}
              />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-6 max-w-[52ch] text-[18px] leading-[1.65] text-grey-700 lg:text-xl"
              >
                Growing a private medical practice is not like growing a local business. Reputation
                is professional, trust is earned differently, and every touchpoint carries clinical
                weight.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-5 max-w-[52ch] font-mono text-[11px] font-medium uppercase leading-[1.9] tracking-[0.12em] text-grey-500"
              >
                For specialists, surgeons, dermatologists, dentists, physiotherapists and private
                clinics of every size
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.55, ease: EASE_OUT }}
                className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center"
              >
                <Link
                  to="/growth-review/"
                  className="group inline-flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500"
                >
                  Book a Growth Review
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href="#why-healthcare-differs"
                  className="group inline-flex items-center gap-2 text-[15px] font-semibold text-navy-800 underline decoration-grey-300 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600 hover:decoration-teal-500"
                >
                  Why healthcare is different
                  <ArrowDown
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </motion.div>
            </div>
            <TrustJourney />
          </div>
        </div>
      </section>

      {/* Section 2 — Why healthcare growth differs */}
      <section id="why-healthcare-differs" className="scroll-mt-24 border-t border-grey-300/60 bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="max-w-[720px]">
            <p className="eyebrow text-teal-600">Why Healthcare Growth Differs</p>
            <WordReveal
              text="Nine Ways Private Practice Is Not a Local Business."
              as="h2"
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
            />
          </div>
          <motion.ul
            variants={staggerParent(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {DIFFERENCES.map((d) => (
              <motion.li
                key={d.title}
                variants={fadeUp}
                className="rounded-[10px] border border-grey-300 bg-white p-6 transition-colors duration-200 hover:border-teal-500/40"
              >
                <h3 className="font-sans text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-navy-800">
                  {d.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-grey-700">{d.copy}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Section 3 — What this means in practice */}
      <section className="bg-navy-900">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="max-w-[720px]">
            <p className="eyebrow text-teal-400">What This Means in Practice</p>
            <WordReveal
              text="Ordinary Marketing Assumptions Don't Survive Contact With Medicine."
              as="h2"
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-white lg:text-[44px]"
            />
          </div>

          <div className="mt-14 overflow-hidden rounded-[10px] border hairline-dark">
            <div className="grid grid-cols-2 border-b hairline-dark bg-white/[0.03]">
              <p className="px-5 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-navy-100/50 lg:px-8">
                Ordinary marketing assumes
              </p>
              <p className="border-l hairline-dark px-5 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400 lg:px-8">
                Private practice requires
              </p>
            </div>
            <motion.ol
              variants={staggerParent(0.14)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {CONTRAST_ROWS.map((row) => (
                <motion.li
                  key={row.ordinary}
                  variants={fadeUp}
                  className="grid grid-cols-2 border-b hairline-dark last:border-b-0"
                >
                  <div className="flex items-center gap-3 px-5 py-5 lg:px-8">
                    <span
                      className="h-px w-4 shrink-0 bg-navy-100/30"
                      aria-hidden="true"
                    />
                    <span className="text-[15px] font-medium text-navy-100/50 line-through decoration-navy-100/40 decoration-1 lg:text-[17px]">
                      {row.ordinary}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 border-l hairline-dark px-5 py-5 lg:px-8">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-5 w-5 shrink-0 text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 10.5 8.2 14.5 16 6" />
                    </svg>
                    <span className="text-[15px] font-semibold text-white lg:text-[17px]">
                      {row.required}
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* Section 4 — Where WardShift fits */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="max-w-[760px]">
            <p className="eyebrow text-teal-600">Where WardShift Fits</p>
            <WordReveal
              text="Doctors Handle the Clinical Work. WardShift Works on the Growth Side."
              as="h2"
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
            />
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="mt-5 max-w-[68ch] text-[17px] leading-[1.7] text-grey-700"
            >
              Engagements are structured, not open-ended: a Growth Review to understand where the
              practice stands, an objective-led roadmap that sequences the work, and measured
              implementation against that plan. Everything WardShift builds sits inside one
              connected system.
            </motion.p>
          </div>

          {/* Compact Growth System strip */}
          <motion.div
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-14"
          >
            <Link
              to="/growth-system/"
              className="group block rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:border-teal-500/40 hover:shadow-card-hover lg:p-8"
              aria-label="Explore the WardShift Growth System"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-grey-500">
                  The WardShift Growth System
                </p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal-600">
                  Explore
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {GROWTH_STAGES.map((stage, i) => (
                  <motion.li
                    key={stage}
                    variants={fadeUp}
                    className="flex items-center gap-3 rounded-lg border border-grey-300/70 bg-paper px-4 py-3"
                  >
                    <span className="font-mono text-[11px] font-medium text-teal-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-navy-800">
                      {stage}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </Link>
          </motion.div>

          {/* Links in context */}
          <motion.div
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-10 grid gap-5 md:grid-cols-3"
          >
            {[
              {
                label: "Websites",
                href: "/private-practice-websites/",
                copy: "A practice website built around how patients evaluate and contact you.",
              },
              {
                label: "Search",
                href: "/search-visibility/",
                copy: "Being found for the searches that matter — name, specialty, condition.",
              },
              {
                label: "Enquiries",
                href: "/practice-enquiry-systems/",
                copy: "What happens after contact, handled with the tone your practice deserves.",
              },
            ].map((link) => (
              <motion.div key={link.href} variants={fadeUp}>
                <Link to={link.href} className="group block h-full border-t-2 border-navy-800 pt-5">
                  <h3 className="inline-flex items-center gap-2 font-sans text-lg font-semibold tracking-[-0.01em] text-navy-800">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-200 group-hover:bg-[length:100%_2px]">
                      {link.label}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-teal-600 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.65] text-grey-700">{link.copy}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5 — FAQ */}
      <section className="border-t border-grey-300/60 bg-white">
        <div className="mx-auto max-w-prose px-6 py-[72px] lg:py-32">
          <p className="eyebrow text-teal-600">Questions Doctors Ask</p>
          <WordReveal
            text="Fair Questions, Straight Answers."
            as="h2"
            className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
          />
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="border-b border-grey-300 last:border-b"
              >
                <AccordionTrigger className="py-5 text-left text-[17px] font-semibold leading-[1.4] text-navy-800 hover:no-underline [&>svg]:text-teal-600">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15.5px] leading-[1.7] text-grey-700">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related + CTA */}
      <RelatedLinks
        className="pt-16 lg:pt-24"
        items={[
          {
            category: "Who We Help",
            title: "Newly Appointed Consultants",
            href: "/newly-appointed-consultants/",
          },
          {
            category: "How We Help",
            title: "Digital Reputation",
            href: "/digital-reputation/",
          },
          {
            category: "How We Help",
            title: "Search Visibility",
            href: "/search-visibility/",
          },
        ]}
      />
      <CtaBand
        title="Build the growth side of your practice properly."
        support="Start with a structured review of where your practice stands — and what the correct next steps look like."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="Explore the Growth System →"
        secondaryHref="/growth-system/"
      />
    </>
  );
}
