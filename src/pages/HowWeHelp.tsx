import { motion } from "framer-motion";
import { Link } from "react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import SectionHeading from "@/components/SectionHeading";
import JourneyFlow from "@/components/JourneyFlow";
import RelatedLinks from "@/components/RelatedLinks";
import CtaBand from "@/components/CtaBand";
import CapabilityMap from "@/components/pages/how-we-help/CapabilityMap";
import {
  IconBrowser,
  IconSearchLens,
  IconLayers,
  IconTarget,
  IconShield,
  IconCompass,
  IconInbox,
  IconChatLoop,
  IconChart,
} from "@/components/icons";
import { fadeUp, staggerParent } from "@/lib/motion";
import type { ServiceLink } from "@/lib/site";

interface Capability extends ServiceLink {
  tags: string[];
  icon: ReactNode;
}

const CAPABILITIES: Capability[] = [
  {
    title: "Private Practice Websites",
    href: "/private-practice-websites/",
    descriptor:
      "A doctor's website should be more than a digital CV. We build sites around how patients actually evaluate specialists — positioning, credentials, conditions, procedures and a clear contact journey.",
    tags: ["POSITIONING", "SEARCH FOUNDATIONS", "ENQUIRY TRACKING"],
    icon: <IconBrowser />,
  },
  {
    title: "Search Visibility",
    href: "/search-visibility/",
    descriptor:
      "Be discoverable for the searches that matter: doctor-name, specialty, condition, procedure, location and referral-validation searches.",
    tags: ["TECHNICAL FOUNDATIONS", "LOCAL SEARCH", "AUTHORITY"],
    icon: <IconSearchLens />,
  },
  {
    title: "Patient Acquisition",
    href: "/patient-acquisition/",
    descriptor:
      "A connected system — discovery, trust, conversion, follow-up and measurement — not a single advertising channel.",
    tags: ["SYSTEM DESIGN", "LANDING PAGES", "MEASUREMENT"],
    icon: <IconLayers />,
  },
  {
    title: "Google Ads",
    href: "/google-ads/",
    descriptor:
      "Measurable campaigns that capture relevant high-intent searches and route them to specialist landing pages.",
    tags: ["HIGH-INTENT SEARCH", "CONVERSION TRACKING", "BUDGET CONTROL"],
    icon: <IconTarget />,
  },
  {
    title: "Digital Reputation",
    href: "/digital-reputation/",
    descriptor:
      "Your reputation exists online before you enter the room. We strengthen what patients find while researching you.",
    tags: ["PROFILES", "ACCURACY", "ETHICAL REVIEWS"],
    icon: <IconShield />,
  },
  {
    title: "Consultant Positioning",
    href: "/consultant-positioning/",
    descriptor:
      "Make specialist expertise easier to understand without oversimplifying it — specialty, subspecialty, conditions, procedures and affiliations, clearly presented.",
    tags: ["CLARITY", "MESSAGING", "BIOGRAPHY"],
    icon: <IconCompass />,
  },
  {
    title: "Enquiry Systems",
    href: "/practice-enquiry-systems/",
    descriptor:
      "Don't lose the enquiry after you've earned it. Structured journeys from first contact to booked appointment.",
    tags: ["ACKNOWLEDGEMENT", "ROUTING", "FOLLOW-THROUGH"],
    icon: <IconInbox />,
  },
  {
    title: "CRM & Follow-Up",
    href: "/crm-follow-up/",
    descriptor:
      "Central enquiry tracking, source attribution, reminders and reporting — organised for a practice, not a sales floor.",
    tags: ["TRACKING", "REMINDERS", "REPORTING"],
    icon: <IconChatLoop />,
  },
  {
    title: "Growth Strategy",
    href: "/practice-growth-strategy/",
    descriptor:
      "Start with the objective, then choose the channels. Strategy connects everything to what the practice actually wants.",
    tags: ["OBJECTIVES", "PRIORITIES", "ROADMAP"],
    icon: <IconChart />,
  },
];

const STAGES = [
  { label: "FOUND", description: "Search Visibility, Google Ads" },
  { label: "UNDERSTOOD", description: "Consultant Positioning, Websites" },
  { label: "TRUSTED", description: "Digital Reputation, Websites" },
  { label: "CONTACTED", description: "Websites, Enquiry Systems" },
  { label: "MEASURED", description: "CRM, Analytics, Ads tracking" },
  { label: "GROWN", description: "Growth Strategy, all channels" },
];

export default function HowWeHelp() {
  return (
    <>
      <Seo
        title="How WardShift Helps Private Practices Grow | WardShift"
        description="From websites and search visibility to acquisition, enquiry systems and measurement — how WardShift builds the growth side of private medical practice."
        path="/how-we-help/"
      />

      {/* Section 1 — Page hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 pb-20 pt-12 lg:pb-28 lg:pt-16">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "How We Help" }]} />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-[minmax(0,720px)_1fr]">
            <div>
              <p className="eyebrow text-teal-600">How We Help</p>
              <WordReveal
                as="h1"
                text="The Growth Side of Private Practice."
                wordDelay={0.045}
                duration={0.7}
                className="mt-5 text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
              />
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
                className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
              >
                Doctors handle the clinical work. WardShift works on the growth side — the strategy,
                presence, systems and measurement that help prospective patients find you, trust you
                and contact your practice.
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.45 }}
                className="mt-6 max-w-[52ch] text-[17px] leading-[1.7] text-grey-500"
              >
                Each capability works alone. Together they form the WardShift Growth System.{" "}
                <Link
                  to="/growth-system/"
                  className="group inline-flex items-center gap-1.5 font-semibold text-teal-600 transition-colors duration-150 hover:text-teal-500"
                >
                  See the Growth System
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              </motion.p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <CapabilityMap />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — The nine capabilities */}
      <section className="bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            eyebrow="The Nine Capabilities"
            title="One Company. Every Part of the Growth Side."
            lede="Each capability is a discipline in its own right. Explore them individually — or see how they connect below."
          />
          <motion.div
            variants={staggerParent(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {CAPABILITIES.map((cap) => (
              <motion.div key={cap.href} variants={fadeUp} className="h-full">
                <Link
                  to={cap.href}
                  className="group flex h-full flex-col rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                    {cap.icon}
                  </span>
                  <h3 className="mt-5 font-sans text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
                    {cap.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.65] text-grey-700">{cap.descriptor}</p>
                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {cap.tags.map((tag, ti) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + ti * 0.03, duration: 0.25 }}
                        className="rounded-full border border-grey-300 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-grey-500"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1.5 pt-1 text-[14px] font-semibold text-teal-600">
                    Explore
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3 — How capabilities connect */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <SectionHeading
            dark
            eyebrow="One System"
            title="Every Capability Serves the Journey."
            lede="The WardShift Growth System follows six stages. Each capability exists to move a practice from one stage to the next."
          />
          <div className="mt-14">
            <JourneyFlow dark steps={STAGES} />
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-14"
          >
            <Link
              to="/growth-system/"
              className="group inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-navy-950 transition-colors duration-150 hover:bg-teal-400"
            >
              Explore the Growth System
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Who it's for */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={staggerParent(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p variants={fadeUp} className="eyebrow text-teal-600">
                Who It&rsquo;s For
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[40px]"
              >
                Built for Private Medical Practice.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 max-w-[58ch] text-[17px] leading-[1.7] text-grey-700">
                WardShift works with private doctors, consultants, specialists and surgeons —
                including dermatologists, dentists, physiotherapists and private clinics — from
                newly appointed consultants building their first private practice to established
                practices ready to measure and grow.
              </motion.p>
              <motion.ul variants={fadeUp} className="mt-7 space-y-3">
                {[
                  { label: "Private Doctors", href: "/private-doctors/" },
                  { label: "Newly Appointed Consultants", href: "/newly-appointed-consultants/" },
                  { label: "Who We Help", href: "/who-we-help/" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="group inline-flex items-center gap-2 text-[15px] font-semibold text-teal-600 transition-colors duration-150 hover:text-teal-500"
                    >
                      {l.label}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-[10px] bg-navy-800 p-8 lg:p-10"
            >
              <h3 className="font-display text-[24px] font-medium leading-[1.2] tracking-[-0.01em] text-white">
                Start with a Growth Review.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-navy-100/75">
                A structured look at your practice&rsquo;s visibility, positioning, website, enquiry
                handling and measurement — and a clear set of priorities.
              </p>
              <Link
                to="/growth-review/"
                className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-navy-950 transition-colors duration-150 hover:bg-teal-400"
              >
                Book a Growth Review
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <RelatedLinks
        items={[
          { category: "Framework", title: "Growth System", href: "/growth-system/" },
          { category: "Audiences", title: "Who We Help", href: "/who-we-help/" },
          { category: "Editorial", title: "Insights", href: "/insights/" },
        ]}
      />

      <CtaBand
        title="Not sure where your practice stands?"
        support="The Growth Review examines visibility, positioning, website, enquiry handling and measurement."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
      />
    </>
  );
}
