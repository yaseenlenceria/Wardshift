import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import WordReveal from "@/components/WordReveal";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ObjectiveCompass from "@/components/pages/practice-growth-strategy/ObjectiveCompass";
import ObjectiveMapper from "@/components/pages/practice-growth-strategy/ObjectiveMapper";
import EngagementSteps from "@/components/pages/practice-growth-strategy/EngagementSteps";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { faqPageSchema } from "@/lib/schema";

/* ---------------- Section 2 — objectives ---------------- */

const OBJECTIVE_CARDS = [
  {
    title: "More appropriate enquiries",
    body: "Enquiries that fit your specialty and scope — not just more volume.",
    pairing: "→ SEARCH + ENQUIRY",
  },
  {
    title: "More subspecialty cases",
    body: "A deliberate shift of caseload toward the work you want more of.",
    pairing: "→ POSITIONING + SEARCH",
  },
  {
    title: "Visibility for a specific service",
    body: "Make one service unmistakably findable to the right patients.",
    pairing: "→ SEARCH + ADS",
  },
  {
    title: "Growth at a particular practice location",
    body: "Concentrate demand exactly where you want the practice to grow.",
    pairing: "→ LOCAL SEARCH + ADS",
  },
  {
    title: "Better referral validation",
    body: "Be as strong online as the recommendation that brought the patient.",
    pairing: "→ REPUTATION + WEBSITE",
  },
  {
    title: "Better enquiry conversion",
    body: "Convert more of the demand your practice already earns.",
    pairing: "→ ENQUIRY + CRM",
  },
  {
    title: "Stronger professional reputation",
    body: "A digital presence worthy of your clinical standing.",
    pairing: "→ REPUTATION + POSITIONING",
  },
  {
    title: "More measurable acquisition",
    body: "Know what each channel costs — and what it returns.",
    pairing: "→ CRM + ADS",
  },
];

/** Mono channel pairing that types in once the card has revealed. */
function TypeIn({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    let id: number | undefined;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            if (id !== undefined) window.clearInterval(id);
            return c;
          }
          return c + 1;
        });
      }, 28);
    }, delay * 1000);
    return () => {
      window.clearTimeout(start);
      if (id !== undefined) window.clearInterval(id);
    };
  }, [inView, reduced, text.length, delay]);

  const shown = reduced ? text : text.slice(0, count);

  return (
    <span ref={ref} className="font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-teal-600">
      <span aria-hidden="true">
        {shown}
        {!reduced && count < text.length ? (
          <span className="animate-caret-blink">|</span>
        ) : null}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

const FAQS = [
  {
    q: "Do we need everything at once?",
    a: "No. The roadmap sequences work by impact and effort — foundations first, then the channels that serve your objective.",
  },
  {
    q: "How long is an engagement?",
    a: "Foundations are built in weeks; growth compounds over months. A Growth Review sets honest expectations before anything begins.",
  },
  {
    q: "What if we already have an agency?",
    a: "WardShift can lead strategy and systems alongside your existing suppliers, giving their work a single objective to serve.",
  },
];

export default function PracticeGrowthStrategy() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Seo
        title="Private Practice Growth Strategy for Doctors | WardShift"
        description="Growth starts with the right objective. WardShift connects websites, search, acquisition and measurement around what your practice actually wants to achieve."
        path="/practice-growth-strategy/"
        schema={faqPageSchema(FAQS)}
      />

      {/* Section 1 — Hero with objective compass */}
      <section className="relative overflow-hidden bg-paper">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rotate-[8deg]"
          style={{
            backgroundImage: "url(/texture-grid.svg)",
            backgroundSize: "400px 400px",
            filter: "invert(1)",
            opacity: 0.05,
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-site items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div className="max-w-[560px]">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "How We Help", href: "/how-we-help/" },
                { label: "Growth Strategy" },
              ]}
            />
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
              className="eyebrow mt-8 text-teal-600"
            >
              Growth Strategy
            </motion.p>
            <WordReveal
              text="Growth Starts With the Right Objective."
              as="h1"
              wordDelay={0.045}
              duration={0.7}
              className="mt-5 max-w-[52ch] text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
            />
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
              className="mt-5 max-w-[52ch] font-display text-[19px] font-medium italic leading-[1.5] text-navy-800/60"
            >
              &ldquo;How do I know the marketing is actually working?&rdquo;
            </motion.p>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.45 }}
              className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
            >
              One clear plan connecting visibility, trust and enquiries to the growth you
              actually want. Strategy means naming the objective first — then choosing the
              channels that serve it.
            </motion.p>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <Link
                to="/growth-review/"
                className="group inline-flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
              >
                Talk About Your Growth Opportunities
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="#objectives"
                className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/60 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
              >
                Objectives we work toward ↓
              </a>
            </motion.div>
          </div>
          <ObjectiveCompass />
        </div>
      </section>

      {/* Section 2 — Objectives, Not Tactics */}
      <section id="objectives" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="Start here"
            title="What Does Your Practice Actually Want?"
            lede="'More patients' is a wish. These are objectives."
          />
          <motion.div
            variants={staggerParent(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {OBJECTIVE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className="group flex flex-col rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
              >
                <h3 className="font-display text-[21px] font-medium leading-[1.25] tracking-[-0.01em] text-navy-800">
                  {card.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.65] text-grey-700">
                  {card.body}
                </p>
                <p className="mt-5 border-t border-grey-100 pt-3">
                  <TypeIn text={card.pairing} delay={0.3 + i * 0.06} />
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3 — Objective → Channel Mapping (dark, interactive) */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="The method"
            title="The Objective Chooses the Channels."
            dark
            lede="Select an objective to see which channels serve it — and why. Channels are never chosen for their own sake."
          />
          <div className="mt-12">
            <ObjectiveMapper />
          </div>
        </div>
      </section>

      {/* Section 4 — How an Engagement Works */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="How an engagement works"
            title="From Review to Compounding Growth."
            lede="A clear sequence: diagnose, design, build, measure. Each step has a purpose and a visible output."
          />
          <div className="mt-14">
            <EngagementSteps />
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-14"
          >
            <Link
              to="/growth-review/"
              className="group inline-flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
            >
              Book a Growth Review
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 5 — FAQ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-prose px-6 pb-24">
          <SectionHeading eyebrow="Common questions" title="Growth Strategy, Answered." />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-10"
          >
            <Accordion type="single" collapsible className="border-t border-grey-300">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`} className="border-grey-300">
                  <AccordionTrigger className="py-5 text-[16px] font-semibold text-navy-800 hover:text-teal-600 hover:no-underline [&>svg]:text-teal-600">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15.5px] leading-[1.7] text-grey-700">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <RelatedLinks
        items={[
          { category: "Framework", title: "The Growth System", href: "/growth-system/" },
          { category: "Service", title: "Patient Acquisition", href: "/patient-acquisition/" },
          { category: "Overview", title: "How We Help", href: "/how-we-help/" },
        ]}
      />

      <CtaBand
        title="Name the objective. We'll design the route."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="Explore the Growth System →"
        secondaryHref="/growth-system/"
      />
    </>
  );
}
