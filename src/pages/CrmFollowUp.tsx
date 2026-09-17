import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Bell, ChartLine, Clock, Inbox, MessageSquare, NotebookPen, Route, Send, Tag } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import WordReveal from "@/components/WordReveal";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { IconShield } from "@/components/icons";
import CrmMockup from "@/components/pages/crm-follow-up/CrmMockup";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { faqPageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

/* ---------------- Section 2 — capability tiles ---------------- */

const CAPABILITIES = [
  { icon: Inbox, title: "Central enquiry tracking", body: "Every enquiry in one place — forms, calls and messages — with nothing lost between systems." },
  { icon: Tag, title: "Enquiry source attribution", body: "Each enquiry carries its source, so you know which channel produced it." },
  { icon: NotebookPen, title: "Administrative notes", body: "Structured notes keep context with the enquiry, not in someone's memory." },
  { icon: Bell, title: "Practice notifications", body: "The right person is notified promptly when an enquiry needs attention." },
  { icon: Clock, title: "Follow-up reminders", body: "Reminders surface enquiries that are waiting, before they go quiet." },
  { icon: Route, title: "Appointment-request stages", body: "Clear stages from new enquiry to booked appointment — visible at a glance." },
  { icon: MessageSquare, title: "Appropriate SMS / email", body: "Administrative messages only — confirmations, logistics and instructions." },
  { icon: ChartLine, title: "Reporting & trends", body: "Enquiry volume, response and stage trends, reported plainly." },
  { icon: Send, title: "Conversion measurement", body: "See how many enquiries become booked appointments — and where others stop." },
];

/* ---------------- Section 3 — funnel data (fictional) ---------------- */

const FUNNEL = [
  { label: "Enquiries", value: 128, width: 100 },
  { label: "Contacted", value: 104, width: 81 },
  { label: "Appointments Requested", value: 61, width: 48 },
  { label: "Booked", value: 47, width: 37 },
];

const FUNNEL_RATES = ["81% contacted", "59% requested", "77% booked"];

const BOUNDARIES = [
  "No clinical triage automation — ever",
  "No emergency handling of any kind",
  "Patient data handled under appropriate privacy standards",
  "The practice owns its data",
];

const FAQS = [
  {
    q: "Which CRM do you use?",
    a: "We configure around the practice's needs and existing tools rather than forcing one platform. The workflow is designed first; the tooling follows.",
  },
  {
    q: "Is patient data secure?",
    a: "Systems are configured with privacy-appropriate handling. See our privacy approach for how we think about data.",
    link: { label: "See our privacy approach", href: "/privacy/" },
  },
  {
    q: "Can it send SMS reminders?",
    a: "Where appropriate and consented, administrative reminders — appointments and instructions — can be automated. Never clinical content.",
  },
];

export default function CrmFollowUp() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Seo
        title="Private Practice CRM & Follow-Up Systems | WardShift"
        description="Enquiries lost to slow follow-up cost practices dearly. WardShift designs CRM and follow-up systems so every private enquiry gets a fast, professional response."
        path="/crm-follow-up/"
        schema={faqPageSchema(FAQS)}
      />

      {/* Section 1 — Hero with CRM mockup */}
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
        <div className="relative mx-auto max-w-site px-6 py-16 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[2fr_3fr]">
            <div className="max-w-[560px]">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "How We Help", href: "/how-we-help/" },
                  { label: "CRM & Follow-Up" },
                ]}
              />
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
                className="eyebrow mt-8 text-teal-600"
              >
                CRM &amp; Follow-Up
              </motion.p>
              <WordReveal
                text="Private Practice CRM & Follow-Up Systems."
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
                &ldquo;Where are my enquiries coming from?&rdquo;
              </motion.p>
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.45 }}
                className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
              >
                Know which searches, pages and campaigns are actually creating patient
                enquiries — and what happens to every one of them. WardShift configures
                CRM workflows designed for medical practices, not sales floors.
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
                  See Where Your Enquiries Come From
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href="#crm-workflow"
                  className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/60 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
                >
                  See the workflow ↓
                </a>
              </motion.div>
            </div>
            <div id="crm-workflow" className="scroll-mt-24">
              <CrmMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — What the Practice Sees */}
      <section className="bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="What the practice sees"
            title="One Place for Every Enquiry."
            lede="The operational backbone of a growing practice: visibility, reminders and measurement — built for administrative work, not clinical decisions."
          />
          <motion.div
            variants={staggerParent(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CAPABILITIES.map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeUp}
                className="group rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-100 text-teal-600 transition-colors duration-200 group-hover:bg-teal-500 group-hover:text-navy-950">
                  <cap.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold leading-[1.35] tracking-[-0.01em] text-navy-800">
                  {cap.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-grey-700">{cap.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3 — Source to Outcome (dark funnel) */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-site items-center gap-14 px-6 py-[72px] lg:grid-cols-2 lg:py-32">
          <div className="max-w-[520px]">
            <SectionHeading
              eyebrow="Measurement"
              title="From Enquiry Source to Booked Outcome."
              dark
              lede="When source, stage and outcome live in one system, growth decisions become evidence: which channels produce appropriate enquiries, what they cost, and where the journey loses people."
            />
            <div className="mt-8">
              <IllustrativeBadge className="border-white/20 text-navy-100/70" />
            </div>
          </div>

          <motion.div
            variants={staggerParent(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-[10px] border border-white/10 bg-navy-800/60 p-6"
          >
            <div className="space-y-4">
              {FUNNEL.map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-navy-100/70">
                      {bar.label}
                    </span>
                    <span className="font-mono text-[13px] font-medium text-teal-400">
                      {bar.value}
                    </span>
                  </div>
                  <div className="mt-1.5 h-9 overflow-hidden rounded-md bg-white/5">
                    <motion.div
                      variants={{
                        hidden: { scaleX: 0 },
                        visible: {
                          scaleX: bar.width / 100,
                          transition: { duration: 0.5, ease: EASE_OUT },
                        },
                      }}
                      className="h-full origin-left rounded-md bg-navy-700"
                      style={{ width: "100%" }}
                    >
                      <div className="h-full w-full rounded-md border-r-2 border-teal-400" />
                    </motion.div>
                  </div>
                  {i < FUNNEL_RATES.length ? (
                    <motion.p
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.4, delay: 0.35 } },
                      }}
                      className="mt-1 text-right font-mono text-[9.5px] uppercase tracking-[0.12em] text-navy-100/50"
                    >
                      ↓ {FUNNEL_RATES[i]}
                    </motion.p>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[9.5px] uppercase tracking-[0.12em] text-navy-100/50">
              Sample figures — configured reporting reflects your practice's real data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Boundaries */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className={cn(
              "mx-auto max-w-[720px] rounded-[10px] border border-grey-300 bg-white p-8 text-center shadow-card lg:p-12",
            )}
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
              <IconShield className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-[28px] font-medium leading-[1.15] tracking-[-0.015em] text-navy-800 lg:text-[36px]">
              Designed for Administration. Never for Clinical Advice.
            </h2>
            <ul className="mx-auto mt-8 max-w-[460px] space-y-3 text-left">
              {BOUNDARIES.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 text-[15.5px] leading-[1.6] text-grey-700"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden="true" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section 5 — FAQ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-prose px-6 pb-24">
          <SectionHeading eyebrow="Common questions" title="CRM & Follow-Up, Answered." />
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
                    {faq.link ? (
                      <>
                        {" "}
                        <Link
                          to={faq.link.href}
                          className="font-medium text-teal-600 underline decoration-teal-500/40 underline-offset-4 hover:text-teal-500"
                        >
                          {faq.link.label} →
                        </Link>
                      </>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <RelatedLinks
        items={[
          { category: "Service", title: "Enquiry Systems", href: "/practice-enquiry-systems/" },
          { category: "Service", title: "Growth Strategy", href: "/practice-growth-strategy/" },
          { category: "Framework", title: "The Growth System", href: "/growth-system/" },
        ]}
      />

      <CtaBand
        title="Know exactly what happens to every enquiry."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="See enquiry systems →"
        secondaryHref="/practice-enquiry-systems/"
      />
    </>
  );
}
