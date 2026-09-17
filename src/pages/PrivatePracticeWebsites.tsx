import { motion } from "framer-motion";
import { Link } from "react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import SectionHeading from "@/components/SectionHeading";
import RelatedLinks from "@/components/RelatedLinks";
import CtaBand from "@/components/CtaBand";
import WebsiteMockup from "@/components/pages/private-practice-websites/WebsiteMockup";
import AnatomyExplorer from "@/components/pages/private-practice-websites/AnatomyExplorer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  IconBrowser,
  IconChart,
  IconChatLoop,
  IconCompass,
  IconDocument,
  IconInbox,
  IconLayers,
  IconMapPin,
  IconSearchLens,
  IconShield,
  IconTarget,
  IconTick,
} from "@/components/icons";
import { EASE_OUT, fadeUp, staggerParent } from "@/lib/motion";
import { faqPageSchema } from "@/lib/schema";

const CV_LIST = [
  "Qualifications listed chronologically",
  "Publications dump",
  "One paragraph biography",
  "A phone number in the footer",
];

const PATIENT_QUESTIONS = [
  "What do you specialise in?",
  "Do you treat my condition?",
  "Which procedures do you perform?",
  "Where do you practise?",
  "Which hospitals are you affiliated with?",
  "How do I make an enquiry?",
];

interface Tile {
  title: string;
  line: string;
  icon: ReactNode;
}

const TILE_GROUPS: { label: string; tiles: Tile[] }[] = [
  {
    label: "Positioning",
    tiles: [
      { title: "Professional positioning", line: "A clear statement of who you help and how.", icon: <IconCompass /> },
      { title: "Doctor biography", line: "Written for researching patients, not committees.", icon: <IconDocument /> },
      { title: "Credentials", line: "Qualifications and fellowships, properly presented.", icon: <IconShield /> },
      { title: "Specialty & subspecialty structure", line: "Expertise organised so patients can navigate it.", icon: <IconLayers /> },
    ],
  },
  {
    label: "Clarity",
    tiles: [
      { title: "Conditions pages", line: "The conditions you treat, in language patients use.", icon: <IconDocument /> },
      { title: "Procedures pages", line: "What each procedure involves and who it helps.", icon: <IconTarget /> },
      { title: "Locations & hospital affiliations", line: "Where you practise, unambiguous and complete.", icon: <IconMapPin /> },
      { title: "Patient-facing clarity", line: "Plain-language summaries alongside clinical terminology.", icon: <IconChatLoop /> },
    ],
  },
  {
    label: "Measurement",
    tiles: [
      { title: "Mobile usability", line: "Designed for between-appointments reading.", icon: <IconBrowser /> },
      { title: "Search foundations", line: "Structured so Google can properly understand and rank every page.", icon: <IconSearchLens /> },
      { title: "Contact journey", line: "Clear CTAs, forms and phone — never a scavenger hunt.", icon: <IconInbox /> },
      { title: "Analytics & enquiry tracking", line: "Calls, forms and sources measured from day one.", icon: <IconChart /> },
    ],
  },
];

const PROCESS = [
  { title: "Discover & position", body: "We learn the practice, the specialty and the patients — then agree the positioning." },
  { title: "Structure & design", body: "Site architecture and page design around how patients evaluate specialists." },
  { title: "Build & write", body: "We build the site and write the content with your review; clinical accuracy stays with you." },
  { title: "Launch & measure", body: "Launch with tracking in place — calls, forms and enquiry sources from day one." },
];

const FAQ = [
  {
    q: "Do you write the content?",
    a: "Yes, with the doctor's review; clinical accuracy always stays with the doctor.",
  },
  {
    q: "Will it work on mobile?",
    a: "Mobile-first; most prospective patients research on phones.",
  },
  {
    q: "Can you rebuild an existing site?",
    a: "Yes; we audit first and keep what works.",
  },
  {
    q: "How is it measured?",
    a: "Calls, forms, enquiry source and trends are tracked from launch.",
  },
];

export default function PrivatePracticeWebsites() {
  return (
    <>
      <Seo
        title="Private Practice Websites for Doctors & Consultants | WardShift"
        description="A doctor's website shouldn't be a digital CV. WardShift builds private practice websites around positioning, patient clarity, search foundations and a measurable contact journey."
        path="/private-practice-websites/"
        schema={faqPageSchema(FAQ)}
      />

      {/* Section 1 — Page hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 pb-20 pt-12 lg:pb-28 lg:pt-16">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "How We Help", href: "/how-we-help/" },
              { label: "Private Practice Websites" },
            ]}
          />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-teal-600">Private Practice Websites</p>
              <WordReveal
                as="h1"
                text="Websites Built Around Private Medical Practice."
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
                &ldquo;Is my website actually bringing me patients?&rdquo;
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
                className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
              >
                Turn more of the people already finding you into real enquiries. A doctor&rsquo;s
                website shouldn&rsquo;t just be a digital CV — it should help the right patients
                understand your expertise, trust what they see, and know exactly how to contact
                your practice.
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
                  Request a Website Review
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href="#what-we-build-in"
                  className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/50 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
                >
                  See what it should include ↓
                </a>
              </motion.div>
            </div>
            <WebsiteMockup />
          </div>
        </div>
      </section>

      {/* Section 2 — Not a digital CV */}
      <section className="bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="The Difference"
            title="A Doctor's Website Shouldn't Just Be a Digital CV."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="rounded-[10px] border border-grey-300 bg-grey-100 p-8"
            >
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
                A digital CV says:
              </p>
              <ul className="mt-5 space-y-3.5">
                {CV_LIST.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15.5px] leading-[1.6] text-grey-500">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-grey-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="rounded-[10px] border border-grey-300 border-t-2 border-t-navy-800 bg-white p-8 shadow-card"
            >
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-navy-800">
                A practice website answers:
              </p>
              <ul className="mt-5 space-y-3.5">
                {PATIENT_QUESTIONS.map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-[15.5px] leading-[1.6] text-grey-700">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.3, ease: EASE_OUT }}
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600"
                    >
                      <IconTick width={12} height={12} strokeWidth={2} />
                    </motion.span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-10 font-display text-[22px] font-medium italic leading-[1.4] text-navy-800 lg:text-[26px]"
          >
            Patients don&rsquo;t read CVs. They look for answers.
          </motion.p>
        </div>
      </section>

      {/* Section 3 — What we build in */}
      <section id="what-we-build-in" className="scroll-mt-24 bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="What We Build In"
            title="Twelve Elements. No Padding."
            lede="Every element below exists because a patient, a referrer or a search engine needs it."
          />
          <div className="mt-14 space-y-12">
            {TILE_GROUPS.map((group, gi) => (
              <div key={group.label}>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.6 }}
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-600"
                >
                  {group.label}
                </motion.p>
                <motion.div
                  variants={staggerParent(0.05)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {group.tiles.map((tile) => (
                    <motion.div
                      key={tile.title}
                      variants={fadeUp}
                      transition={{ delay: gi * 0.05 }}
                      className="group rounded-[10px] border border-grey-300 bg-white p-5 transition-colors duration-200 hover:border-teal-500/40"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-600 transition-colors duration-200 group-hover:text-teal-600">
                        {tile.icon}
                      </span>
                      <h3 className="mt-4 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-navy-800">
                        {tile.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-[1.6] text-grey-500">{tile.line}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Anatomy of the page */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            dark
            eyebrow="Anatomy"
            title="Every Element Earns Its Place."
            lede="Hover or tap each annotation to see where it lives on the page. The example below is a fictional consultant website concept."
          />
          <div className="mt-14">
            <AnatomyExplorer />
          </div>
        </div>
      </section>

      {/* Section 5 — Process + FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading eyebrow="Process" title="From First Conversation to Launch." />
              <motion.ol
                variants={staggerParent(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative mt-10 space-y-8 border-l border-grey-300 pl-8"
              >
                {PROCESS.map((step, i) => (
                  <motion.li key={step.title} variants={fadeUp} className="relative">
                    <span
                      className="absolute -left-[41px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-grey-300 bg-white font-mono text-[11px] font-medium text-teal-600"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[17px] font-semibold leading-snug text-navy-800">{step.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-[1.65] text-grey-500">{step.body}</p>
                  </motion.li>
                ))}
              </motion.ol>
            </div>

            <div>
              <SectionHeading eyebrow="Questions" title="Website Questions, Answered." />
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-10"
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
          </div>
        </div>
      </section>

      <RelatedLinks
        items={[
          { category: "Service", title: "Search Visibility", href: "/search-visibility/" },
          { category: "Service", title: "Consultant Positioning", href: "/consultant-positioning/" },
          { category: "Service", title: "Enquiry Systems", href: "/practice-enquiry-systems/" },
        ]}
      />

      <CtaBand
        title="What does your website say to a patient who has just been given your name?"
        primaryLabel="Request a Website Review"
        primaryHref="/growth-review/"
        secondaryLabel="See search visibility →"
        secondaryHref="/search-visibility/"
      />
    </>
  );
}
