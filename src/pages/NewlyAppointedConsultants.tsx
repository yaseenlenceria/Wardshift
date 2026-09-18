import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, ArrowDown, ChevronRight } from "lucide-react";
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
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ---------------------------------- data ---------------------------------- */

const PHASES = [
  {
    chip: "Phase 1",
    title: "Foundation",
    timeframe: "Weeks 1–4 — indicative pacing",
    items: [
      "Professional positioning",
      "Domain & digital identity",
      "Website — built around patients, not a CV",
      "Professional profiles",
      "Practice locations & listings",
      "Analytics installed",
      "Enquiry system designed",
    ],
    footer: "Outcome: a coherent, measurable presence exists.",
    startHere: true,
  },
  {
    chip: "Phase 2",
    title: "Visibility",
    timeframe: "Weeks 5–9 — indicative pacing",
    items: [
      "Search foundations — technical + architecture",
      "Important service pages",
      "Local presence where eligible",
      "Initial condition / procedure content",
      "Reputation process begun",
    ],
    footer: "Outcome: the right searches start finding accurate answers.",
    startHere: false,
  },
  {
    chip: "Phase 3",
    title: "Growth",
    timeframe: "Weeks 10–13 — indicative pacing",
    items: [
      "Organic expansion",
      "Paid search where appropriate",
      "Conversion improvements",
      "Measurement review against baseline",
      "Next-stage planning",
    ],
    footer: "Outcome: growth becomes a managed system, not a hope.",
    startHere: false,
  },
];

const FIX_LATER = [
  {
    title: "Rebuilding a fragmented website",
    copy: "A rushed site eventually has to be torn down and rebuilt around patients.",
  },
  {
    title: "Correcting inconsistent profiles",
    copy: "Mismatched listings take months of tedious work to align after the fact.",
  },
  {
    title: "Reclaiming your name search",
    copy: "The wrong results get harder to displace the longer they sit unchallenged.",
  },
  {
    title: "Retrofitting measurement",
    copy: "Without a baseline, nobody can say what changed, when, or why.",
  },
];

const AVOID = [
  {
    struck: "A website that's a digital CV",
    instead: "Instead: a website built around patients — what they need, what they ask, how they decide.",
  },
  {
    struck: "Profiles that contradict each other",
    instead: "Instead: one accurate story, consistent everywhere your name appears.",
  },
  {
    struck: "Growth you can't measure",
    instead: "Instead: measurement installed from day one, so every step is visible.",
  },
];

const FAQS = [
  {
    q: "When should I start?",
    a: "Ideally before or as you begin private practice — the foundation is cheapest to build before anything exists. Second-best is now.",
  },
  {
    q: "Do I need a big budget at the start?",
    a: "No. The framework sequences spend deliberately: foundations first, paid growth only when the practice is ready to convert it.",
  },
  {
    q: "What if I've already started piecemeal?",
    a: "The Growth Review audits what already exists. We keep what's sound, fix what isn't, and fold it into the right order of operations.",
  },
];

/* ------------------------------ hero backdrop ----------------------------- */

function HeroBackdrop() {
  const reduced = usePrefersReducedMotion();
  return (
    <>
      <img
        src="/texture-grid.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M-40 560 L1240 120"
          fill="none"
          stroke="#2DD4BF"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 2, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path
          d="M1212 132 L1240 120 L1234 150"
          fill="none"
          stroke="#2DD4BF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 2.1 }}
        />
      </svg>
    </>
  );
}

/** Dark-variant breadcrumb for the navy hero (shared Breadcrumb is light-only). */
function DarkBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px]">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="text-navy-100/60 transition-colors duration-150 hover:text-teal-400">
            Home
          </Link>
        </li>
        <li className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-white/20" aria-hidden="true" />
          <Link
            to="/who-we-help/"
            className="text-navy-100/60 transition-colors duration-150 hover:text-teal-400"
          >
            Who We Help
          </Link>
        </li>
        <li className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-white/20" aria-hidden="true" />
          <span aria-current="page" className="text-white">
            Newly Appointed Consultants
          </span>
        </li>
      </ol>
    </nav>
  );
}

/* ------------------------------ hero phase strip --------------------------- */

function PhasePreviewStrip() {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.ol
      variants={staggerParent(0.12, 0.9)}
      initial="hidden"
      animate="visible"
      className="mt-14 grid gap-4 sm:grid-cols-3 sm:gap-0"
    >
      {PHASES.map((phase, i) => (
        <motion.li
          key={phase.chip}
          variants={{
            hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
          }}
          className="relative flex items-center gap-4 sm:flex-col sm:gap-0 sm:px-6"
        >
          {/* connector (desktop) */}
          {i > 0 && (
            <motion.span
              className="absolute left-[-12.5%] top-5 hidden h-px w-1/4 origin-left bg-teal-400/50 sm:block"
              initial={{ scaleX: reduced ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : 1 + i * 0.12, ease: EASE_OUT }}
              aria-hidden="true"
            />
          )}
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal-400/50 bg-navy-900 font-mono text-xs font-medium text-teal-400">
            {i + 1}
          </span>
          <span className="sm:mt-4 sm:text-center">
            <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-400">
              {phase.chip}
            </span>
            <span className="mt-1 block font-display text-lg font-medium tracking-[-0.01em] text-white">
              {phase.title}
            </span>
          </span>
        </motion.li>
      ))}
    </motion.ol>
  );
}

/* --------------------------- warning icon (drawn) -------------------------- */

function WarningIcon({ delay }: { delay: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.path
        d="M12 4 21 19.5H3L12 4Z"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay, ease: EASE_OUT }}
      />
      <path d="M12 10v4" />
      <circle cx="12" cy="16.8" r="0.4" fill="currentColor" />
    </motion.svg>
  );
}

/* ------------------------------ phase panel -------------------------------- */

function PhasePanel({ phase, index }: { phase: (typeof PHASES)[number]; index: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE_OUT }}
      className={cn(
        "relative flex h-full flex-col rounded-[10px] border bg-white p-6 shadow-card lg:p-8",
        phase.startHere ? "border-grey-300 border-t-2 border-t-teal-500" : "border-grey-300",
      )}
    >
      {phase.startHere && (
        <span className="absolute -top-3 left-6 rounded-full bg-teal-500 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-navy-950">
          Start here
        </span>
      )}
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-600">
        {phase.chip}
      </p>
      <h3 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.015em] text-navy-800 lg:text-[30px]">
        {phase.title}
      </h3>
      <p className="mt-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-grey-500">
        {phase.timeframe}
      </p>
      <motion.ul
        variants={staggerParent(0.09, 0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-6 flex-1 space-y-3.5 border-t border-grey-300/70 pt-6"
      >
        {phase.items.map((item) => (
          <motion.li
            key={item}
            variants={{
              hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
            }}
            className="flex items-start gap-3"
          >
            <span
              className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border border-teal-600/50"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 text-teal-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 6.2 5 8.5 9.5 3.5" />
              </svg>
            </span>
            <span className="text-[14.5px] leading-[1.55] text-grey-700">{item}</span>
          </motion.li>
        ))}
      </motion.ul>
      <p className="mt-6 border-t border-grey-300/70 pt-4 text-[13.5px] font-medium italic leading-[1.6] text-navy-800">
        {phase.footer}
      </p>
    </motion.article>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function NewlyAppointedConsultants() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Seo
        title="Newly Appointed Consultants: First 90 Days | WardShift"
        description="Starting private practice? Build the digital foundation correctly from day one — positioning, website, search, reputation and enquiries. First 90 Days framework."
        path="/newly-appointed-consultants/"
        schema={[
          faqPageSchema(FAQS),
          breadcrumbSchema(
            [
              { label: "Home", href: "/" },
              { label: "Who We Help", href: "/who-we-help/" },
              { label: "Newly Appointed Consultants" },
            ],
            "/newly-appointed-consultants/",
          ),
        ]}
      />

      {/* Section 1 — Dark hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-site px-6 pb-[72px] pt-12 lg:pb-28 lg:pt-16">
          <DarkBreadcrumb />
          <div className="mx-auto mt-12 max-w-[860px] text-center">
            <p className="eyebrow text-teal-400">For Newly Appointed Consultants</p>
            <WordReveal
              text="Building Your Private Practice From the Beginning?"
              as="h1"
              className="mt-4 text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-white lg:text-[56px]"
              wordDelay={0.045}
              duration={0.7}
            />
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
              className="mt-5 text-[18px] font-semibold leading-[1.5] text-grey-300 lg:text-xl"
            >
              Build the digital foundation correctly from the start.
            </motion.p>
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="mx-auto mt-5 max-w-[68ch] text-[16px] leading-[1.7] text-navy-100/75 lg:text-[17px]"
            >
              The best time to build a strong digital foundation is before fragmented systems become
              difficult to fix. WardShift's First 90 Days is an implementation framework — a correct
              order of operations, not a promise of results.
            </motion.p>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: EASE_OUT }}
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
                href="#first-90-days"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white underline decoration-teal-400/50 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-400"
              >
                See the First 90 Days
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </div>
          <div className="mx-auto max-w-[960px]">
            <PhasePreviewStrip />
          </div>
        </div>
      </section>

      {/* Section 2 — Why the start matters */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow text-teal-600">The Moment</p>
              <WordReveal
                text="Foundations Are Cheaper Than Repairs."
                as="h2"
                className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
              />
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-grey-700"
              >
                Most consultants assemble their private-practice presence piecemeal — a directory
                listing here, a rushed website there. Two years later, nothing connects and nothing
                measures. Starting correctly means each piece is built to work with the next.
              </motion.p>
            </div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="rounded-[10px] border border-grey-300 bg-white p-6 shadow-card lg:p-7"
            >
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-grey-500">
                The cost of fixing it later
              </p>
              <ul className="mt-5 space-y-5">
                {FIX_LATER.map((row, i) => (
                  <li key={row.title} className="flex items-start gap-3">
                    <WarningIcon delay={0.15 + i * 0.15} />
                    <div>
                      <p className="text-[15px] font-semibold leading-[1.4] text-navy-800">
                        {row.title}
                      </p>
                      <p className="mt-1 text-[14px] leading-[1.6] text-grey-700">{row.copy}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 — The First 90 Days framework */}
      <section id="first-90-days" className="scroll-mt-24 border-t border-grey-300/60 bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="max-w-[760px]">
            <p className="eyebrow text-teal-600">The WardShift First 90 Days</p>
            <WordReveal
              text="A Correct Order of Operations."
              as="h2"
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
            />
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 font-mono text-[11px] font-medium uppercase leading-[1.7] tracking-[0.14em] text-grey-500"
            >
              An implementation framework — not a promise of results. Pacing varies by practice.
            </motion.p>
          </div>

          <div className="relative mt-16">
            {/* desktop connector */}
            <motion.span
              className="absolute -top-5 left-[16.66%] right-[16.66%] hidden h-px origin-left bg-teal-500 lg:block"
              initial={{ scaleX: reduced ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: EASE_OUT }}
              aria-hidden="true"
            />
            {/* mobile connector */}
            <motion.span
              className="absolute bottom-8 left-[-14px] top-2 w-px origin-top bg-teal-500 sm:left-[-20px] lg:hidden"
              initial={{ scaleY: reduced ? 1 : 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: EASE_OUT }}
              aria-hidden="true"
            />
            <div className="grid gap-8 pl-2 sm:pl-4 lg:grid-cols-3 lg:gap-6 lg:pl-0">
              {PHASES.map((phase, i) => (
                <PhasePanel key={phase.chip} phase={phase} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — What you avoid */}
      <section className="bg-navy-900">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="max-w-[720px]">
            <p className="eyebrow text-teal-400">What You Avoid</p>
            <WordReveal
              text="The Three Expensive Mistakes of a Piecemeal Start."
              as="h2"
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-white lg:text-[44px]"
            />
          </div>
          <motion.div
            variants={staggerParent(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
          >
            {AVOID.map((item) => (
              <motion.div key={item.struck} variants={fadeUp} className="border-t hairline-dark pt-6">
                <h3 className="relative inline-block font-sans text-[17px] font-semibold leading-[1.4] text-navy-100/60">
                  {item.struck}
                  <motion.span
                    className="absolute left-0 top-1/2 h-px w-full origin-left bg-teal-400"
                    initial={{ scaleX: reduced ? 1 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-navy-100/80">{item.instead}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5 — Working with WardShift + FAQ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow text-teal-600">Working With WardShift</p>
              <WordReveal
                text="How an Engagement Runs."
                as="h2"
                className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
              />
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="mt-5 space-y-5 text-[16px] leading-[1.7] text-grey-700"
              >
                <p>
                  Most newly appointed consultants begin with a Growth Review — a structured look at
                  objectives, timeline and anything that already exists. From there, the First 90
                  Days runs as a managed implementation in the correct order.
                </p>
                <ol className="space-y-4 border-l-2 border-teal-500/40 pl-5">
                  <li>
                    <span className="font-semibold text-navy-800">Review.</span> Where you are,
                    where the practice needs to be, what exists already.
                  </li>
                  <li>
                    <span className="font-semibold text-navy-800">Foundation build.</span>{" "}
                    <Link
                      to="/consultant-positioning/"
                      className="font-medium text-teal-600 underline decoration-teal-500/40 decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-teal-500"
                    >
                      Positioning
                    </Link>
                    ,{" "}
                    <Link
                      to="/private-practice-websites/"
                      className="font-medium text-teal-600 underline decoration-teal-500/40 decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-teal-500"
                    >
                      website
                    </Link>
                    , profiles, listings and measurement — installed to work together.
                  </li>
                  <li>
                    <span className="font-semibold text-navy-800">Visibility.</span>{" "}
                    <Link
                      to="/search-visibility/"
                      className="font-medium text-teal-600 underline decoration-teal-500/40 decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-teal-500"
                    >
                      Search foundations
                    </Link>
                    , service pages and the beginnings of your professional reputation.
                  </li>
                  <li>
                    <span className="font-semibold text-navy-800">Managed growth.</span> Expansion
                    measured against the baseline, sequenced against the practice's objectives.
                  </li>
                </ol>
                <p>
                  WardShift handles the growth side, in the right order — you handle the clinical
                  one.
                </p>
              </motion.div>
            </div>

            <div>
              <p className="eyebrow text-teal-600">Questions New Consultants Ask</p>
              <Accordion type="single" collapsible className="mt-8 rounded-[10px] border border-grey-300 bg-white px-6">
                {FAQS.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${i}`}
                    className="border-b border-grey-300 last:border-b-0"
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
          </div>
        </div>
      </section>

      {/* Related + CTA */}
      <RelatedLinks
        className="pt-16 lg:pt-24"
        items={[
          {
            category: "Who We Help",
            title: "Private Doctors",
            href: "/private-doctors/",
          },
          {
            category: "How We Help",
            title: "Private Practice Websites",
            href: "/private-practice-websites/",
          },
          {
            category: "Framework",
            title: "The WardShift Growth System",
            href: "/growth-system/",
          },
        ]}
      />
      <CtaBand
        title="Start with a foundation you won't have to rebuild."
        support="A Growth Review maps where you are and what the first 90 days should look like for your practice."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="How WardShift works →"
        secondaryHref="/growth-system/"
      />
    </>
  );
}
