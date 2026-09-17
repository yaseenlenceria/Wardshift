import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import SectionHeading from "@/components/SectionHeading";
import RelatedLinks from "@/components/RelatedLinks";
import CtaBand from "@/components/CtaBand";
import NoGuaranteeNote from "@/components/NoGuaranteeNote";
import SearchVisual from "@/components/pages/search-visibility/SearchVisual";
import VisibilityDashboard from "@/components/pages/search-visibility/VisibilityDashboard";
import QueryChip from "@/components/pages/search-visibility/QueryChip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EASE_OUT, fadeUp, staggerParent } from "@/lib/motion";
import { faqPageSchema } from "@/lib/schema";

const SEARCH_TYPES = [
  {
    title: "Doctor-name searches",
    query: "dr a. example cardiologist",
    body: "After a referral or recommendation, patients search your name. What appears is your first consultation room.",
  },
  {
    title: "Specialty searches",
    query: "private cardiologist",
    body: "Patients who know the specialty but not the doctor.",
  },
  {
    title: "Condition searches",
    query: "chest pain private assessment",
    body: "Patients searching symptoms and conditions they want investigated.",
  },
  {
    title: "Procedure searches",
    query: "private echocardiogram",
    body: "High-intent searches from patients who know what they need.",
  },
  {
    title: "Location searches",
    query: "cardiologist near me",
    body: "Proximity-driven discovery through local search and maps.",
  },
  {
    title: "Referral-validation searches",
    query: "checking the name a GP or friend provided",
    body: "The quiet majority of private-practice searches.",
  },
];

const LAYERS = [
  {
    label: "Authority & presence",
    body: "Professional authority, local search presence, and Google profiles where the practice is eligible.",
  },
  {
    label: "Content & intent",
    body: "Service pages, condition and procedure content where appropriate — planned around what patients actually search for.",
  },
  {
    label: "Technical foundations",
    body: "The foundation: a fast, well-structured website that Google can properly understand and rank.",
  },
];

const FAQ = [
  {
    q: "Can you guarantee first position?",
    a: "No. No ethical provider can; we build durable visibility and report transparently.",
  },
  {
    q: "How long does search visibility take?",
    a: "It compounds over months; referral-validation improvements can be quicker than competitive specialty terms.",
  },
  {
    q: "Do you work with Google Business Profiles?",
    a: "Where a practice is eligible, yes — profiles are part of local visibility.",
  },
  {
    q: "What about AI search?",
    a: "Clear structure, accurate profiles and authoritative content are the foundations AI tools draw on; we build for both.",
  },
];

export default function SearchVisibility() {
  return (
    <>
      <Seo
        title="Search Visibility for Private Doctors & Consultants | WardShift"
        description="Help the right patients find your practice. WardShift builds search visibility across doctor-name, specialty, condition, procedure, location and referral-validation searches."
        path="/search-visibility/"
        schema={faqPageSchema(FAQ)}
      />

      {/* Section 1 — Page hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 pb-20 pt-12 lg:pb-28 lg:pt-16">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "How We Help", href: "/how-we-help/" },
              { label: "Search Visibility" },
            ]}
          />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-teal-600">Search Visibility</p>
              <WordReveal
                as="h1"
                text="Help the Right Patients Find Your Practice."
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
                &ldquo;Why are other clinics appearing above me on Google?&rdquo;
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
                className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
              >
                Be there when patients nearby are searching for your speciality. Patients search in
                more ways than one — visibility means being present, and credible, across every
                kind of search that leads to your door.
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
                  See How Visible Your Practice Is
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href="#six-searches"
                  className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/50 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
                >
                  The six searches ↓
                </a>
              </motion.div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.55 }}
              >
                <NoGuaranteeNote className="mt-6" />
              </motion.div>
            </div>
            <SearchVisual />
          </div>
        </div>
      </section>

      {/* Section 2 — Six ways patients search */}
      <section id="six-searches" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="Search Behaviour"
            title="Six Ways Patients Search."
            lede="Visibility is a system, not a ranking trick. Each kind of search needs its own foundations."
          />
          <motion.div
            variants={staggerParent(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {SEARCH_TYPES.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="flex h-full flex-col rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-teal-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-sans text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
                  {s.title}
                </h3>
                <QueryChip query={s.query} className="mt-4 self-start" />
                <p className="mt-4 text-[15px] leading-[1.65] text-grey-700">{s.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3 — What visibility is built from */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            dark
            eyebrow="The Work"
            title="Visibility Is Engineered, Not Wished For."
            lede="Durable visibility is built in layers — each one depending on the layer beneath it."
          />
          <div className="mt-14 max-w-[880px]">
            {/* layers render top-first visually; build upward means foundation animates first */}
            {LAYERS.map((layer, i) => (
              <div key={layer.label}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: (LAYERS.length - 1 - i) * 0.12 }}
                  className="rounded-[10px] border border-white/10 bg-navy-700 p-6 lg:p-7"
                >
                  <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-teal-400">
                    Layer {LAYERS.length - i}
                  </p>
                  <h3 className="mt-2 font-sans text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-white">
                    {layer.label}
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.65] text-navy-100/70">
                    {layer.body}
                  </p>
                </motion.div>
                {i < LAYERS.length - 1 ? (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE_OUT, delay: (LAYERS.length - 1 - i) * 0.12 + 0.15 }}
                    className="flex origin-top justify-center py-1"
                    aria-hidden="true"
                  >
                    <svg width="20" height="30" viewBox="0 0 20 30" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 27V5" />
                      <path d="M4.5 10.5 10 4.5l5.5 6" />
                    </svg>
                  </motion.div>
                ) : null}
              </div>
            ))}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="mt-8 border-l-2 border-teal-500/50 pl-5 text-[14px] leading-[1.7] text-navy-100/70"
            >
              We measure positions and trends honestly — and never promise specific rankings.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section 4 — Measurement */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={staggerParent(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p variants={fadeUp} className="eyebrow text-teal-600">
                Measurement
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
              >
                Measured, Not Assumed.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 max-w-[58ch] text-[17px] leading-[1.7] text-grey-700">
                We track search visibility, relevant visitors, and what those visitors do — calls,
                forms and enquiries by source — so visibility work is accountable to outcomes, not
                vanity metrics.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-6">
                <Link
                  to="/growth-system/"
                  className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600 transition-colors duration-150 hover:text-teal-500"
                >
                  See everything we measure
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              </motion.p>
            </motion.div>
            <VisibilityDashboard />
          </div>
        </div>
      </section>

      {/* Section 5 — FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[880px] px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="Questions"
            title="Search Visibility Questions, Answered."
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
          { category: "Service", title: "Patient Acquisition", href: "/patient-acquisition/" },
          { category: "Service", title: "Private Practice Websites", href: "/private-practice-websites/" },
          { category: "Service", title: "Digital Reputation", href: "/digital-reputation/" },
        ]}
      />

      <CtaBand
        title="How visible is your practice today?"
        primaryLabel="See How Visible Your Practice Is"
        primaryHref="/growth-review/"
        secondaryLabel="Explore patient acquisition →"
        secondaryHref="/patient-acquisition/"
      />
    </>
  );
}
