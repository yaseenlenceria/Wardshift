import { memo } from "react";
import type { ComponentType, SVGProps } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import NoGuaranteeNote from "@/components/NoGuaranteeNote";
import {
  IconBrowser,
  IconChatLoop,
  IconInbox,
  IconSearchLens,
  IconShield,
  IconTarget,
} from "@/components/icons";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";

/* ---------- funnel visual: high-intent search -> practice response ---------- */

interface FunnelStep {
  label: string;
  caption: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const FUNNEL_STEPS: FunnelStep[] = [
  {
    label: "High-intent search",
    caption: "\u201cprivate hip replacement consultation\u201d",
    icon: IconSearchLens,
  },
  {
    label: "Relevant ad",
    caption: "Written to match the search — nothing more",
    icon: IconTarget,
  },
  {
    label: "Specialist landing page",
    caption: "Focused on one condition or procedure",
    icon: IconBrowser,
  },
  {
    label: "Trust",
    caption: "Credentials, clarity and reassurance",
    icon: IconShield,
  },
  {
    label: "Enquiry",
    caption: "A call or a form — tracked either way",
    icon: IconInbox,
  },
  {
    label: "Practice response",
    caption: "The system hands over to your team",
    icon: IconChatLoop,
  },
];

const CARD_H = 68;
const CARD_GAP = 16;
const TRACK_H = FUNNEL_STEPS.length * CARD_H + (FUNNEL_STEPS.length - 1) * CARD_GAP;
const LINE_H = TRACK_H - CARD_H;

/** Teal dot travelling down the connector on a 5s loop. Isolated + memoised. */
const TravelDot = memo(function TravelDot({ disabled }: { disabled: boolean }) {
  if (disabled) return null;
  return (
    <motion.span
      aria-hidden="true"
      className="absolute -left-[3.5px] top-0 block h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.7)]"
      animate={{ y: [0, LINE_H - 8] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    />
  );
});

function FunnelVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[400px]" aria-hidden="true">
      {/* connector line, drawn on mount */}
      <div
        className="absolute left-4 w-px"
        style={{ top: CARD_H / 2, height: LINE_H }}
      >
        <motion.div
          className="h-full w-px origin-top bg-teal-500/60"
          initial={reduced ? false : { scaleY: 0 }}
          animate={reduced ? undefined : { scaleY: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.9 }}
        />
        <TravelDot disabled={reduced} />
      </div>

      <ol className="relative flex flex-col" style={{ gap: CARD_GAP }}>
        {FUNNEL_STEPS.map((step, i) => (
          <motion.li
            key={step.label}
            className="relative"
            initial={reduced ? false : { opacity: 0, y: -16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 + i * 0.1 }}
          >
            {/* node on the line */}
            <span className="absolute left-4 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-teal-500 bg-white" />
            <div
              className="ml-10 flex items-center gap-3.5 rounded-[10px] border border-grey-300 bg-white px-4 shadow-card"
              style={{ height: CARD_H }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-100/70 text-teal-600">
                <step.icon width={18} height={18} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-navy-800">
                  {step.label}
                </p>
                <p className="mt-0.5 truncate text-[12px] leading-snug text-grey-500">
                  {step.caption}
                </p>
              </div>
              <span className="ml-auto font-mono text-[10px] font-medium text-grey-300">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- hero section ---------- */

export default function AdsHero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 pb-20 pt-10 lg:grid-cols-2 lg:pb-28 lg:pt-14">
        <div className="max-w-[560px]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "How We Help", href: "/how-we-help/" },
              { label: "Google Ads" },
            ]}
          />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
            className="eyebrow mt-8 text-teal-600"
          >
            Google Ads
          </motion.p>
          <WordReveal
            as="h1"
            text="Google Ads for Private Doctors."
            wordDelay={0.045}
            duration={0.7}
            className="mt-4 max-w-[52ch] text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
          />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 }}
            className="mt-5 max-w-[52ch] font-display text-[19px] font-medium italic leading-[1.5] text-navy-800/60"
          >
            &ldquo;Am I wasting money on marketing?&rdquo;
          </motion.p>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
            className="mt-5 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
          >
            Appear at the exact moment a patient searches for your treatment — and
            know precisely what every enquiry cost. Paid search captures demand that
            already exists and routes it to pages built to earn trust and enquiries.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
            className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <Link
              to="/growth-review/?service=google-ads"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
            >
              See Where Your Budget Goes
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="#campaign-build"
              className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/50 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
            >
              How campaigns are built ↓
            </a>
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-7 space-y-1"
          >
            <NoGuaranteeNote />
            <p className="text-[13px] leading-relaxed tracking-[0.01em] text-grey-500">
              Campaigns are managed to measurable cost-per-enquiry discipline.
            </p>
          </motion.div>
        </div>

        <FunnelVisual reduced={reduced} />
      </div>
    </section>
  );
}
