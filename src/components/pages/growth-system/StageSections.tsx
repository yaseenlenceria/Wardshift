import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import WordReveal from "@/components/WordReveal";
import { IconTick } from "@/components/icons";
import { fadeUp, staggerParent } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface StageDetail {
  num: string;
  id: string;
  name: string;
  meaning: string;
  work: string[];
  measures: string[];
  links: { label: string; href: string }[];
}

const STAGES: StageDetail[] = [
  {
    num: "01",
    id: "stage-found",
    name: "FOUND",
    meaning:
      "Patients can't choose a doctor they can't find. Before anything else can work — positioning, reputation, websites — the practice has to appear in the places patients actually look: the searches they type, the names they validate, the recommendations they check.",
    work: [
      "Search visibility across relevant queries",
      "Google presence, structured and complete",
      "Referral validation — what a referred patient finds",
      "Specialty and subspecialty searches",
      "Location and proximity searches",
    ],
    measures: ["Discovery queries", "Search presence", "Referral validations"],
    links: [
      { label: "Search Visibility", href: "/search-visibility/" },
      { label: "Google Ads", href: "/google-ads/" },
    ],
  },
  {
    num: "02",
    id: "stage-understood",
    name: "UNDERSTOOD",
    meaning:
      "Discovery without comprehension loses the patient. Within seconds of arriving, a prospective patient decides whether this doctor treats their problem. Clarity of specialty, conditions and procedures — in patient language — is what turns a visit into a considered option.",
    work: [
      "Specialty and subspecialty made legible",
      "Conditions treated, in patient language",
      "Procedures explained without jargon",
      "Practice locations and how to attend",
      "Professional positioning that reads clearly",
    ],
    measures: ["Page engagement", "Condition & procedure reads", "Positioning clarity"],
    links: [
      { label: "Consultant Positioning", href: "/consultant-positioning/" },
      { label: "Private Practice Websites", href: "/private-practice-websites/" },
    ],
  },
  {
    num: "03",
    id: "stage-trusted",
    name: "TRUSTED",
    meaning:
      "Patients verify before they contact. Credentials, affiliations, the quality of what they read and the professional presence they encounter all feed a quiet judgement: is this the right doctor for me? Trust is built from evidence, not claims.",
    work: [
      "Credentials presented where patients look",
      "Professional reputation across the web",
      "Website quality as a trust signal",
      "Hospital and clinic affiliations",
      "Authority built through considered content",
    ],
    measures: ["Profile completeness", "Credential visibility", "Reputation signals"],
    links: [
      { label: "Digital Reputation", href: "/digital-reputation/" },
      { label: "Private Practice Websites", href: "/private-practice-websites/" },
    ],
  },
  {
    num: "04",
    id: "stage-contacted",
    name: "CONTACTED",
    meaning:
      "The moment of enquiry must be effortless. A patient who has decided to make contact should never be slowed by a buried phone number, a confusing form or an unclear next step. Every obstacle at this stage costs a patient who was already persuaded.",
    work: [
      "Phone contact that is answered and logged",
      "Forms that are short, clear and reassuring",
      "Appointment enquiries routed properly",
      "Clear calls to action on every page",
      "Professional administrative communication",
    ],
    measures: ["Enquiry completion", "Response time", "Contact drop-off"],
    links: [{ label: "Practice Enquiry Systems", href: "/practice-enquiry-systems/" }],
  },
  {
    num: "05",
    id: "stage-measured",
    name: "MEASURED",
    meaning:
      "What isn't measured can't be improved. A practice that knows where enquiries come from, what happens to them and which efforts produce them can make calm, informed decisions — and stop spending on what doesn't work.",
    work: [
      "Calls and forms tracked to source",
      "Channels and campaigns attributed",
      "Conversion from visit to enquiry",
      "Enquiry outcomes followed through",
      "Reporting a practice can actually read",
    ],
    measures: ["Source attribution", "Conversion by channel", "Enquiry outcomes"],
    links: [{ label: "CRM & Follow-Up", href: "/crm-follow-up/" }],
  },
  {
    num: "06",
    id: "stage-grown",
    name: "GROWN",
    meaning:
      "Systems compound. With the earlier stages working and measured, growth becomes a matter of deliberate optimization — expanding what works, refining what doesn't, and aligning the whole system with the goals of the practice.",
    work: [
      "Continuous optimization of what works",
      "Search expansion into new queries",
      "Content that builds authority over time",
      "Paid acquisition where it earns its cost",
      "Practice strategy around real objectives",
    ],
    measures: ["Compounding visibility", "Enquiry quality", "Capacity alignment"],
    links: [
      { label: "Practice Growth Strategy", href: "/practice-growth-strategy/" },
      { label: "Patient Acquisition", href: "/patient-acquisition/" },
    ],
  },
];

/** Sticky mini-map rail with scroll-spy (desktop only). */
function SpyRail({ active }: { active: number }) {
  const fillFraction = active / (STAGES.length - 1);
  return (
    <nav aria-label="Framework stages" className="sticky top-28 hidden self-start lg:block">
      <p className="eyebrow text-teal-600">The six stages</p>
      <div className="relative mt-6">
        {/* rail track + progressive fill */}
        <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-grey-300" />
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-2 w-px bg-teal-500 transition-all duration-500 ease-out"
          style={{ height: `calc((100% - 16px) * ${fillFraction})` }}
        />
        <ol className="space-y-5">
          {STAGES.map((stage, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <li key={stage.id} className="relative pl-8">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full border transition-colors duration-300",
                    isActive
                      ? "border-teal-500 bg-teal-500"
                      : isPast
                        ? "border-teal-500/60 bg-teal-500/30"
                        : "border-grey-300 bg-white",
                  )}
                />
                <a
                  href={`#${stage.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center gap-3"
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] font-medium tracking-[0.14em] transition-colors duration-300",
                      isActive ? "text-teal-600" : "text-grey-500 group-hover:text-teal-600",
                    )}
                  >
                    {stage.num}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[15px] font-medium tracking-[0.02em] transition-colors duration-300",
                      isActive ? "text-navy-800" : "text-grey-500 group-hover:text-navy-800",
                    )}
                  >
                    {stage.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

function StageBand({ stage, index }: { stage: StageDetail; index: number }) {
  return (
    <section
      id={stage.id}
      data-stage-band
      className={cn(
        "scroll-mt-28 py-14 lg:py-16",
        index % 2 === 1
          ? "my-2 rounded-[10px] border border-grey-300 bg-white px-6 lg:px-10"
          : "border-t border-grey-300 first:border-t-0 first:pt-0",
      )}
    >
      <motion.div
        variants={staggerParent(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex items-baseline gap-4">
          <motion.span
            variants={fadeUp}
            className="font-mono text-[13px] font-medium tracking-[0.16em] text-teal-600"
          >
            {stage.num}
          </motion.span>
          <WordReveal
            text={stage.name}
            as="h3"
            className="font-display text-[28px] font-medium leading-[1.12] tracking-[0.01em] text-navy-800 lg:text-[36px]"
          />
        </div>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-[68ch] text-[17px] leading-[1.7] text-grey-700"
        >
          {stage.meaning}
        </motion.p>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <motion.div variants={fadeUp}>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
              What WardShift does
            </p>
            <ul className="mt-4 space-y-2.5">
              {stage.work.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-grey-700">
                  <IconTick className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
              What we measure
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stage.measures.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-grey-300 bg-white px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-grey-700"
                >
                  {m}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
              Related services
            </p>
            <ul className="mt-4 space-y-2">
              {stage.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-2 text-[15px] font-semibold text-teal-600 transition-colors duration-150 hover:text-navy-800"
                  >
                    {link.label}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Section 2 — the six stages in depth, with a sticky scroll-spy rail.
 * Scroll-spy uses IntersectionObserver (Framer Motion tree — no GSAP here).
 */
export default function StageSections() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const bands = Array.from(root.querySelectorAll<HTMLElement>("[data-stage-band]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = bands.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    bands.forEach((b) => observer.observe(b));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
      <div className="max-w-[720px]">
        <p className="eyebrow text-teal-600">The framework</p>
        <WordReveal
          text="Six stages, one connected system."
          as="h2"
          className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
        />
        <p className="mt-5 max-w-[68ch] text-[17px] leading-[1.7] text-grey-700">
          Each stage decides whether the next can work. A practice that is trusted but not found
          stays invisible; one that is found but not understood loses the patients it attracts.
        </p>
      </div>

      <div ref={rootRef} className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
        <SpyRail active={active} />
        <div>
          {STAGES.map((stage, i) => (
            <StageBand key={stage.id} stage={stage} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
