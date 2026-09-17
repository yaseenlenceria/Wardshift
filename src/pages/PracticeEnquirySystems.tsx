import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import WordReveal from "@/components/WordReveal";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { IconTick } from "@/components/icons";
import EnquiryPipeline from "@/components/pages/enquiry-systems/EnquiryPipeline";
import DesignedJourney from "@/components/pages/enquiry-systems/DesignedJourney";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { faqPageSchema } from "@/lib/schema";

/* ---------------- Section 2 — leak cards ---------------- */

const LEAKS = [
  {
    title: "Unacknowledged forms",
    body: "An enquiry arrives and sits silently. Without an immediate confirmation, the enquirer has no idea it was received — and keeps looking.",
  },
  {
    title: "Slow responses",
    body: "Days pass before anyone replies. By then, the prospective patient has often already booked elsewhere.",
  },
  {
    title: "Unclear next steps",
    body: "The practice responds, but nobody says what happens next. Momentum dies in the gap between reply and booking.",
  },
  {
    title: "No follow-up record",
    body: "Nothing is tracked, so nothing can be measured — and the same leak quietly repeats every week.",
  },
];

function CrackIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.path
        d="M13 2.5 10.5 8l3 2.5-2.5 5 2 2.5-1.5 3.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ---------------- Section 4 — checklist ---------------- */

const CHECKLIST = [
  "Notification routing",
  "Acknowledgement templates",
  "Response-time expectations",
  "Follow-up reminders",
  "Source tracking",
  "Enquiry outcome records",
];

const FAQS = [
  {
    q: "Does this replace our reception team?",
    a: "No — it supports them with structure, reminders and visibility, so the team spends its time on people rather than chasing loose ends.",
  },
  {
    q: "Do you automate replies to patients?",
    a: "Only administrative acknowledgements and logistics — never clinical advice. Anything clinical stays with the practice's clinical team.",
  },
  {
    q: "What about urgent medical enquiries?",
    a: "Enquiry systems are administrative. Urgent care routes are always signposted to appropriate services, never handled by automation.",
  },
];

export default function PracticeEnquirySystems() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Seo
        title="Practice Enquiry Systems for Private Doctors | WardShift"
        description="Don't lose the enquiry after you've earned it. WardShift designs administrative enquiry journeys — from first contact to booked appointment — for private practices."
        path="/practice-enquiry-systems/"
        schema={faqPageSchema(FAQS)}
      />

      {/* Section 1 — Hero */}
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
                { label: "Enquiry Systems" },
              ]}
            />
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
              className="eyebrow mt-8 text-teal-600"
            >
              Enquiry Systems
            </motion.p>
            <WordReveal
              text="Don't Lose the Enquiry After You've Earned It."
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
              &ldquo;Why do enquiries stall before they become appointments?&rdquo;
            </motion.p>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.45 }}
              className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
            >
              Convert more of the enquiries you already receive into booked appointments.
              Every enquiry needs a clear administrative journey — acknowledged quickly,
              routed correctly, and followed through.
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
                Find Where Enquiries Are Lost
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="#enquiry-journey"
                className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/60 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
              >
                The enquiry journey ↓
              </a>
            </motion.div>
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 max-w-[52ch] text-[13px] leading-[1.6] tracking-[0.01em] text-grey-500"
            >
              We design administrative journeys only — never automated clinical advice, and
              never emergency medical chat.
            </motion.p>
          </div>
          <EnquiryPipeline />
        </div>
      </section>

      {/* Section 2 — Where Enquiries Leak */}
      <section className="bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="Where enquiries leak"
            title="The Cost of an Undesigned Inbox."
            lede="Most practices don't lose enquiries dramatically — they lose them quietly, at the same four points, every week."
          />
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {LEAKS.map((leak) => (
              <motion.div
                key={leak.title}
                variants={fadeUp}
                className="group rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <CrackIcon />
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold leading-[1.35] tracking-[-0.01em] text-navy-800">
                  {leak.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-grey-700">{leak.body}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-12 border-t border-grey-300 pt-6 font-mono text-xs font-medium uppercase tracking-[0.16em] text-teal-600"
          >
            Every leak is measurable — and fixable.
          </motion.p>
        </div>
      </section>

      {/* Section 3 — The Designed Journey (dark, GSAP) */}
      <section id="enquiry-journey" className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url(/texture-grid.svg)",
            backgroundSize: "400px 400px",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="The designed journey"
            title="Six Stages. No Ambiguity."
            dark
            lede="Every enquiry follows the same visible path. At each stage, someone — or something — owns what happens next."
          />
          <div className="mt-14">
            <DesignedJourney />
          </div>
        </div>
      </section>

      {/* Section 4 — Systems, Not Heroics */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-site items-center gap-12 px-6 py-[72px] lg:grid-cols-2 lg:py-32">
          <motion.div
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-[560px]"
          >
            <motion.p variants={fadeUp} className="eyebrow text-teal-600">
              Systems, not heroics
            </motion.p>
            <WordReveal
              text="Good Enquiry Handling Is Designed, Not Hoped For."
              as="h2"
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
            />
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[68ch] text-[17px] leading-[1.7] text-grey-700"
            >
              We work with your practice's administrative team to design journeys that fit how
              the practice actually runs — then measure what happens. The result is not more
              effort; it is a system that makes the right thing happen by default.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-[10px] border border-grey-300 bg-white p-7 shadow-card"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
              What the system includes
            </p>
            <ul className="mt-5 space-y-4">
              {CHECKLIST.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.15 + i * 0.12 }}
                  className="flex items-center gap-3 border-b border-grey-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                    <IconTick className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15.5px] font-medium text-navy-800">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section 5 — FAQ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-prose px-6 pb-24">
          <SectionHeading eyebrow="Common questions" title="Enquiry Systems, Answered." />
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
          {
            category: "Service",
            title: "CRM & Follow-Up",
            href: "/crm-follow-up/",
          },
          {
            category: "Service",
            title: "Patient Acquisition",
            href: "/patient-acquisition/",
          },
          {
            category: "Service",
            title: "Private Practice Websites",
            href: "/private-practice-websites/",
          },
        ]}
      />

      <CtaBand
        title="Every enquiry your marketing earns deserves a system behind it."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="See CRM & follow-up →"
        secondaryHref="/crm-follow-up/"
      />
    </>
  );
}
