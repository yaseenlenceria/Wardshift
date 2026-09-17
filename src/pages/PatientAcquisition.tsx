import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import SectionHeading from "@/components/SectionHeading";
import RelatedLinks from "@/components/RelatedLinks";
import CtaBand from "@/components/CtaBand";
import SystemLoop from "@/components/pages/patient-acquisition/SystemLoop";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconTick } from "@/components/icons";
import { EASE_OUT, fadeUp, staggerParent } from "@/lib/motion";
import { faqPageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const PARTS = [
  {
    title: "Discovery",
    body: "Be present where relevant patients look: search, local results, referral validation.",
    tags: [
      { label: "Search Visibility", href: "/search-visibility/" },
      { label: "Google Ads", href: "/google-ads/" },
    ],
  },
  {
    title: "Trust",
    body: "What patients find must withstand scrutiny: credentials, profiles, a credible website.",
    tags: [
      { label: "Digital Reputation", href: "/digital-reputation/" },
      { label: "Websites", href: "/private-practice-websites/" },
    ],
  },
  {
    title: "Conversion",
    body: "Clear positioning and landing pages that make the next step obvious.",
    tags: [{ label: "Positioning", href: "/consultant-positioning/" }],
  },
  {
    title: "Follow-Up",
    body: "Every enquiry acknowledged, routed and followed through administratively.",
    tags: [
      { label: "Enquiry Systems", href: "/practice-enquiry-systems/" },
      { label: "CRM", href: "/crm-follow-up/" },
    ],
  },
  {
    title: "Measurement",
    body: "Know your sources, costs and conversion rates — then improve them.",
    tags: [{ label: "Growth System", href: "/growth-system/" }],
  },
];

const HYPE = ["Unlimited patients", "Patient machine", "Pack your clinic", "Guaranteed patients"];

const WARDSHIFT_LANGUAGE = [
  "Appropriate prospective patients",
  "Relevant private-practice enquiries",
  "Measurable growth",
  "Systems that respect the clinical relationship",
];

const CHANNELS = [
  {
    title: "Search (organic)",
    body: "Durable visibility for the searches that matter, built on sound technical foundations and honest content.",
    worksWith: "Website structure, content, authority",
  },
  {
    title: "Paid search",
    body: "Measurable campaigns that capture relevant high-intent searches at the moment they happen.",
    worksWith: "Landing pages, call tracking, budgets",
  },
  {
    title: "Landing pages",
    body: "Focused pages that make the next step obvious for the right patient — and easy to measure.",
    worksWith: "Positioning, enquiry forms, analytics",
  },
  {
    title: "Reputation",
    body: "Accurate, credible profiles and presence that withstand the scrutiny of researching patients.",
    worksWith: "Websites, local search, referrals",
  },
];

const FAQ = [
  {
    q: "Is this just lead generation?",
    a: "No. Lead generation is one channel; acquisition is the whole system from discovery to measurement.",
  },
  {
    q: "How fast will enquiries grow?",
    a: "Paid channels can move within weeks; organic compounds. We set expectations by objective, not promises.",
  },
  {
    q: "Do you work with our practice manager?",
    a: "Yes — enquiry handling only works when the practice's administrative team is part of the design.",
  },
];

/** A single acquisition-part band; the number chip fills teal while centred in the viewport. */
function PartBand({ part, index }: { part: (typeof PARTS)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const centred = useInView(ref, { once: false, amount: 0.7 });

  return (
    <motion.li
      ref={ref}
      variants={fadeUp}
      className="grid gap-5 border-t border-grey-300 py-10 last:border-b md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12"
    >
      <span
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border font-mono text-sm font-medium transition-colors duration-500",
          centred
            ? "border-teal-500 bg-teal-500 text-white"
            : "border-grey-300 bg-white text-grey-500",
        )}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-display text-[26px] font-medium leading-[1.2] tracking-[-0.01em] text-navy-800 lg:text-[30px]">
          {part.title}
        </h3>
        <p className="mt-2 max-w-[56ch] text-[15.5px] leading-[1.65] text-grey-700">{part.body}</p>
      </div>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {part.tags.map((tag) => (
          <Link
            key={tag.href}
            to={tag.href}
            className="rounded-full border border-grey-300 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-grey-700 transition-colors duration-150 hover:border-teal-500/50 hover:text-teal-600"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </motion.li>
  );
}

/** Hype phrase with a strike line that draws across on scroll. */
function StrikeItem({ text, index }: { text: string; index: number }) {
  return (
    <li className="text-[15.5px] leading-[1.6] text-grey-500">
      <span className="relative inline-block">
        {text}
        <motion.span
          className="absolute left-0 top-1/2 h-px w-full origin-left bg-grey-500"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.2, delay: 0.2 + index * 0.2, ease: "easeOut" }}
          aria-hidden="true"
        />
      </span>
    </li>
  );
}

export default function PatientAcquisition() {
  return (
    <>
      <Seo
        title="Patient Acquisition for Private Practice | WardShift"
        description="Patient acquisition is a system, not a channel. WardShift connects discovery, trust, conversion, follow-up and measurement for appropriate private-practice enquiries."
        path="/patient-acquisition/"
        schema={faqPageSchema(FAQ)}
      />

      {/* Section 1 — Page hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 pb-20 pt-12 lg:pb-28 lg:pt-16">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "How We Help", href: "/how-we-help/" },
              { label: "Patient Acquisition" },
            ]}
          />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-teal-600">Patient Acquisition</p>
              <WordReveal
                as="h1"
                text="Patient Acquisition for Private Practice."
                wordDelay={0.045}
                duration={0.7}
                className="mt-5 text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
              />
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="mt-5 max-w-[52ch] font-display text-[19px] font-medium italic leading-[1.5] text-navy-800/60"
              >
                &ldquo;Why am I not getting enough private patients?&rdquo;
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
                className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
              >
                More of the right patients, through a system — not a single advertising channel.
                Search, website, reputation, paid acquisition, landing pages, enquiry handling and
                measurement, working together.
              </motion.p>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.45 }}
                className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center"
              >
                <Link
                  to="/growth-review/"
                  className="group inline-flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500"
                >
                  Find Your Patient Acquisition Gaps
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href="#five-parts"
                  className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/50 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
                >
                  The five parts ↓
                </a>
              </motion.div>
            </div>
            <SystemLoop />
          </div>
        </div>
      </section>

      {/* Section 2 — The five parts */}
      <section id="five-parts" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="The Five Parts"
            title="A System, Not a Channel."
            lede="Each part earns appropriate prospective patient enquiries on its own. Connected, they compound."
          />
          <motion.ol
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14"
          >
            {PARTS.map((part, i) => (
              <PartBand key={part.title} part={part} index={i} />
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Section 3 — What we don't do */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                dark
                eyebrow="What We Don't Do"
                title="A Word on Language."
                lede="Healthcare growth must be ethical, accurate and sustainable. Language matters because trust matters."
              />
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-navy-100/50">
                  Not this
                </p>
                <ul className="mt-5 space-y-4">
                  {HYPE.map((h, i) => (
                    <StrikeItem key={h} text={h} index={i} />
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
                  This
                </p>
                <ul className="mt-5 space-y-4">
                  {WARDSHIFT_LANGUAGE.map((w, i) => (
                    <motion.li
                      key={w}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-3 text-[15.5px] leading-[1.6] text-white"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-400">
                        <IconTick width={12} height={12} strokeWidth={2} />
                      </span>
                      {w}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Channels within the system */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="Channels"
            title="Channels Within the System."
            lede="No channel works alone here. Each one is designed, measured and improved as part of the whole."
          />
          <motion.div
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CHANNELS.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                className="flex h-full flex-col rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
              >
                <h3 className="font-sans text-lg font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
                  {c.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.65] text-grey-700">{c.body}</p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.25 }}
                  className="mt-5 h-px w-full origin-left bg-grey-300"
                  aria-hidden="true"
                />
                <p className="mt-3 font-mono text-[10.5px] font-medium uppercase leading-[1.6] tracking-[0.1em] text-grey-500">
                  Works with: <span className="text-teal-600">{c.worksWith}</span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5 — FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[880px] px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="Questions"
            title="Acquisition Questions, Answered."
            align="center"
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 text-left"
          >
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={item.q} value={`faq-${i}`} className="border-grey-300">
                  <AccordionTrigger className="text-left text-[16px] font-semibold text-navy-800 hover:text-teal-600 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-[1.7] text-grey-700">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <RelatedLinks
        items={[
          { category: "Service", title: "Google Ads", href: "/google-ads/" },
          { category: "Service", title: "Enquiry Systems", href: "/practice-enquiry-systems/" },
          { category: "Service", title: "Growth Strategy", href: "/practice-growth-strategy/" },
        ]}
      />

      <CtaBand
        title="Build the system, not just the channel."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="See the Growth System →"
        secondaryHref="/growth-system/"
      />
    </>
  );
}
