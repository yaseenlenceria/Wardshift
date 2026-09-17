import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import Seo from "@/components/Seo";
import WordReveal from "@/components/WordReveal";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ---------------------------------- data ---------------------------------- */

interface AudiencePath {
  label: string;
  title: string;
  copy: string;
  href: string;
  external: boolean; // true = route link, false = in-page anchor
}

const PATHS: AudiencePath[] = [
  {
    label: "Path 01",
    title: "Private Doctors",
    copy: "You've built clinical expertise and a professional reputation; the digital side hasn't kept pace.",
    href: "/private-doctors/",
    external: true,
  },
  {
    label: "Path 02",
    title: "Consultants",
    copy: "Balancing clinical commitments with a growing private practice that needs structure.",
    href: "#consultants",
    external: false,
  },
  {
    label: "Path 03",
    title: "Specialists",
    copy: "Deep expertise in a defined area that patients struggle to find or understand.",
    href: "#specialists",
    external: false,
  },
  {
    label: "Path 04",
    title: "Surgeons",
    copy: "Procedure-led practices where high-intent searches and referral validation decide enquiries.",
    href: "#surgeons",
    external: false,
  },
  {
    label: "Path 05",
    title: "Newly Appointed Consultants",
    copy: "Starting private practice — the best moment to build the foundation correctly.",
    href: "/newly-appointed-consultants/",
    external: true,
  },
  {
    label: "Path 06",
    title: "Established Private Practices",
    copy: "Multiple clinicians, locations or services — growth now needs coordination and measurement.",
    href: "#established",
    external: false,
  },
];

interface StageProfile {
  id: string;
  label: string;
  title: string;
  situation: string;
  needs: string[];
  links: { label: string; href: string }[];
}

const PROFILES: StageProfile[] = [
  {
    id: "consultants",
    label: "Stage profile — Consultants",
    title: "Consultants",
    situation:
      "You hold a substantive clinical role and a growing private list. The practice runs on evenings and goodwill — enquiries arrive through scattered channels, your name search shows a patchwork of directories, and nothing is measured because there is no time to measure it.",
    needs: [
      "A website that reflects your actual practice, not a directory entry",
      "A name search that resolves to you, clearly and consistently",
      "Enquiries handled properly around clinical commitments",
      "Measurement that fits a practice run alongside everything else",
    ],
    links: [
      { label: "Private Practice Websites", href: "/private-practice-websites/" },
      { label: "Enquiry Systems", href: "/practice-enquiry-systems/" },
    ],
  },
  {
    id: "specialists",
    label: "Stage profile — Specialists",
    title: "Specialists",
    situation:
      "Your expertise is deep and defined — but patients rarely search in your terminology. The gap between what you do and what patients type costs appropriate enquiries, and generic marketing dilutes the very specialism that sets the practice apart.",
    needs: [
      "Expertise explained in language patients actually use",
      "Condition and procedure pages built to be found",
      "Profiles that match across every directory and listing",
      "Enquiries filtered for relevance, not just volume",
    ],
    links: [
      { label: "Consultant Positioning", href: "/consultant-positioning/" },
      { label: "Search Visibility", href: "/search-visibility/" },
    ],
  },
  {
    id: "surgeons",
    label: "Stage profile — Surgeons",
    title: "Surgeons",
    situation:
      "Procedure-led practices live on high-intent searches and referral validation. Patients compare carefully, verify the name they were given, and expect every touchpoint — from search result to first phone call — to carry the same professionalism as the operating theatre.",
    needs: [
      "High-intent procedure searches captured and measured",
      "Referred patients validated, not quietly lost online",
      "Hospital listings and your own presence connected",
      "Advertising used where appropriate — never indiscriminately",
    ],
    links: [
      { label: "Google Ads", href: "/google-ads/" },
      { label: "Search Visibility", href: "/search-visibility/" },
    ],
  },
  {
    id: "established",
    label: "Stage profile — Established practices",
    title: "Established Private Practices",
    situation:
      "Multiple clinicians, locations or services have outgrown piecemeal marketing. What once worked — a website here, a listing there — now needs coordination: shared enquiry handling, consolidated measurement, and a strategy sequenced against the practice's actual objectives.",
    needs: [
      "A coordinated presence across clinicians and locations",
      "Enquiry handling and follow-up that scale with the team",
      "Measurement consolidated into one honest picture",
      "Growth sequenced against objectives, not habit",
    ],
    links: [
      { label: "Growth Strategy", href: "/practice-growth-strategy/" },
      { label: "CRM & Follow-Up", href: "/crm-follow-up/" },
    ],
  },
];

const WHY_STAGE_POINTS = [
  {
    title: "Foundations differ by stage",
    copy: "A first website and a multi-location rebuild are different projects with different risks and different correct answers.",
  },
  {
    title: "Budgets sequence differently",
    copy: "Early practices fund foundations; established practices fund coordination and scale. The order matters more than the amount.",
  },
  {
    title: "Measurement matures with the practice",
    copy: "From “are we being found?” to “which channels produce appropriate enquiries?” — the questions evolve with the practice.",
  },
];

/* --------------------------------- pieces --------------------------------- */

function Tick({ delay }: { delay: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-5 w-5 shrink-0 text-teal-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.path
        d="M4 10.5 8.2 14.5 16 6"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay, ease: EASE_OUT }}
      />
    </motion.svg>
  );
}

function PathCard({ path, index }: { path: AudiencePath; index: number }) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-600">
          {path.label}
        </p>
        {path.external ? (
          <ArrowRight
            className="h-4 w-4 text-teal-600 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        ) : (
          <ArrowDown
            className="h-4 w-4 text-grey-500 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-teal-600"
            aria-hidden="true"
          />
        )}
      </div>
      <h3 className="mt-4 font-display text-[24px] font-medium leading-[1.2] tracking-[-0.015em] text-navy-800">
        {path.title}
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-[1.65] text-grey-700">
        <span className="font-semibold text-navy-800">You might be here if — </span>
        {path.copy}
      </p>
    </>
  );

  const classes = cn(
    "group flex h-full flex-col rounded-[10px] border border-grey-300 bg-white p-6",
    "transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover",
  );

  return (
    <motion.li variants={fadeUp} className="h-full">
      {path.external ? (
        <Link to={path.href} className={classes} aria-label={`${path.title} — read the full page`}>
          {inner}
        </Link>
      ) : (
        <a href={path.href} className={classes} aria-label={`${path.title} — jump to profile below`}>
          {inner}
        </a>
      )}
      <span className="sr-only">{index + 1} of 6</span>
    </motion.li>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function WhoWeHelp() {
  return (
    <>
      <Seo
        title="Who WardShift Helps — Private Doctors, Consultants & Specialists | WardShift"
        description="WardShift is built around specialist private practice — private doctors, consultants, surgeons, dentists, dermatologists, physiotherapists and established physician-led clinics."
        path="/who-we-help/"
      />

      {/* Section 1 — Hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 pb-20 pt-12 lg:pb-24 lg:pt-16">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Who We Help" }]} />
          <div className="mx-auto mt-12 max-w-[760px] text-center">
            <p className="eyebrow text-teal-600">Who We Help</p>
            <WordReveal
              text="Built Around Specialist Private Practice."
              as="h1"
              className="mt-4 text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
              wordDelay={0.045}
              duration={0.7}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mx-auto mt-6 max-w-[68ch] text-[18px] leading-[1.65] text-grey-700 lg:text-xl"
            >
              WardShift works with private doctors, consultants, specialists, surgeons and
              physician-led practices — at every stage from first private patient to established
              multi-location practice.
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mx-auto mt-7 flex max-w-[720px] flex-wrap justify-center gap-2"
              aria-label="Specialisms we work with"
            >
              {[
                "Orthopaedic & joint specialists",
                "Dermatologists",
                "Dentists & specialist dental clinics",
                "Physiotherapists",
                "Surgeons",
                "Private clinics & clinic owners",
              ].map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-grey-300 bg-white px-3.5 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-grey-700"
                >
                  {chip}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Section 2 — Six paths */}
      <section className="border-t border-grey-300/60 bg-white">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <motion.ul
            variants={staggerParent(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {PATHS.map((path, i) => (
              <PathCard key={path.title} path={path} index={i} />
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Section 3 — Stage profiles */}
      <section className="bg-paper">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <div className="max-w-[720px]">
            <p className="eyebrow text-teal-600">Stage Profiles</p>
            <WordReveal
              text="Four Situations We See Every Week."
              as="h2"
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
            />
          </div>

          <div className="mt-16 space-y-20 lg:space-y-24">
            {PROFILES.map((profile, i) => {
              const fromRight = i % 2 === 1;
              return (
                <motion.article
                  key={profile.id}
                  id={profile.id}
                  initial={{ opacity: 0, x: fromRight ? 32 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  className="grid scroll-mt-24 gap-10 border-t border-grey-300 pt-12 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={cn(fromRight && "lg:order-2")}>
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-600">
                      {profile.label}
                    </p>
                    <h3 className="mt-3 font-display text-[28px] font-medium leading-[1.15] tracking-[-0.015em] text-navy-800 lg:text-[34px]">
                      {profile.title}
                    </h3>
                    <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.7] text-grey-700">
                      {profile.situation}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {profile.links.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-teal-600"
                        >
                          <span className="underline decoration-teal-500/40 decoration-2 underline-offset-4 transition-colors duration-150 group-hover:decoration-teal-500">
                            {link.label}
                          </span>
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className={cn(fromRight && "lg:order-1")}>
                    <div className="rounded-[10px] border border-grey-300 bg-white p-6 lg:p-7">
                      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-grey-500">
                        Common needs at this stage
                      </p>
                      <ul className="mt-5 space-y-4">
                        {profile.needs.map((need, j) => (
                          <li key={need} className="flex items-start gap-3">
                            <Tick delay={0.15 + j * 0.12} />
                            <span className="text-[15px] leading-[1.6] text-grey-700">{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4 — Why stage matters */}
      <section className="bg-navy-900">
        <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
          <motion.div
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto max-w-[820px] text-center"
          >
            <motion.p variants={fadeUp} className="eyebrow text-teal-400">
              Why Stage Matters
            </motion.p>
            <WordReveal
              text="A New Practice and an Established Practice Need Different Systems."
              as="h2"
              className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-white lg:text-[44px]"
            />
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-navy-100/80"
            >
              The Growth Review starts by understanding where your practice is — not by selling a
              package.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto mt-14 grid max-w-[1000px] gap-10 md:grid-cols-3 md:gap-8"
          >
            {WHY_STAGE_POINTS.map((point) => (
              <motion.div
                key={point.title}
                variants={fadeUp}
                className="border-t hairline-dark pt-6"
              >
                <h3 className="font-sans text-[17px] font-semibold leading-[1.35] text-white">
                  {point.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-navy-100/70">{point.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5 — Related + CTA */}
      <RelatedLinks
        className="pt-16 lg:pt-24"
        items={[
          {
            category: "Who We Help",
            title: "Private Doctors",
            href: "/private-doctors/",
          },
          {
            category: "Who We Help",
            title: "Newly Appointed Consultants",
            href: "/newly-appointed-consultants/",
          },
          {
            category: "Framework",
            title: "The WardShift Growth System",
            href: "/growth-system/",
          },
        ]}
      />
      <CtaBand
        title="Whichever stage you're at — start with clarity."
        support="A structured review of where your practice stands, and what the correct next steps look like."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="How we help →"
        secondaryHref="/how-we-help/"
      />
    </>
  );
}
