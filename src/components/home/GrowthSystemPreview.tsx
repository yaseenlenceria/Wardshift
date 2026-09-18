import { useRef, useState } from "react";
import type { ComponentType } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CountUp from "@/components/CountUp";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import { IconShield } from "@/components/icons";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type VisualKind = "found" | "understood" | "trusted" | "contacted" | "measured" | "grown";

interface Stage {
  num: string;
  name: string;
  short: string;
  items: string[];
  visual: VisualKind;
}

const STAGES: Stage[] = [
  {
    num: "01",
    name: "FOUND",
    short: "Patients can't choose a doctor they can't find.",
    items: ["Search visibility", "Google", "Referral validation", "Specialty searches", "Location searches"],
    visual: "found",
  },
  {
    num: "02",
    name: "UNDERSTOOD",
    short: "Discovery without comprehension loses the patient.",
    items: ["Specialty", "Subspecialty", "Conditions", "Procedures", "Locations & positioning"],
    visual: "understood",
  },
  {
    num: "03",
    name: "TRUSTED",
    short: "Patients verify before they contact.",
    items: ["Credentials", "Professional reputation", "Website quality", "Hospital affiliations", "Authority"],
    visual: "trusted",
  },
  {
    num: "04",
    name: "CONTACTED",
    short: "The moment of enquiry must be effortless.",
    items: ["Phone", "Forms", "Appointment enquiries", "Clear CTAs", "Administrative communication"],
    visual: "contacted",
  },
  {
    num: "05",
    name: "MEASURED",
    short: "What isn't measured can't be improved.",
    items: ["Calls", "Forms", "Sources", "Campaigns", "Conversion & enquiry outcomes"],
    visual: "measured",
  },
  {
    num: "06",
    name: "GROWN",
    short: "Systems compound.",
    items: ["Optimization", "Search expansion", "Content", "Paid acquisition", "Practice strategy"],
    visual: "grown",
  },
];

const H2_WORDS = ["FOUND", "→", "UNDERSTOOD", "→", "TRUSTED", "→", "CONTACTED", "→", "MEASURED", "→", "GROWN"];

function FrameworkH2() {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.h2
      variants={fadeUp}
      className="mt-4 font-display text-[28px] font-medium leading-[1.2] tracking-[-0.015em] text-white lg:text-[40px]"
    >
      {H2_WORDS.map((word, i) =>
        word === "→" ? (
          <motion.span
            key={`arrow-${i}`}
            aria-hidden="true"
            className="mx-1.5 inline-block text-teal-400 lg:mx-2.5"
            animate={reduced ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          >
            →
          </motion.span>
        ) : (
          <span key={word}>{word}</span>
        ),
      )}
    </motion.h2>
  );
}

/* ---------------- stage mini-visuals (all sample data, badged on the panel) ---------------- */

const enter = (i: number, reduced: boolean) => ({
  initial: reduced ? false : { opacity: 0, y: 14 },
  animate: reduced ? undefined : { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT, delay: 0.15 + i * 0.08 },
});

/** FOUND — presence rising across the queries patients actually search. */
function FoundVisual({ reduced }: { reduced: boolean }) {
  const bars: { label: string; h: number }[] = [
    { label: "Specialty", h: 42 },
    { label: "Condition", h: 58 },
    { label: "Procedure", h: 50 },
    { label: "Near me", h: 70 },
    { label: "Name", h: 84 },
    { label: "Referral", h: 94 },
  ];
  return (
    <div className="flex h-full items-end justify-center gap-4 px-4 pb-7 sm:gap-6">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex w-12 flex-col items-center gap-2">
          <div className="relative flex h-36 w-full items-end lg:h-44">
            <motion.div
              className="w-full rounded-t-md bg-gradient-to-t from-teal-500/25 to-teal-400"
              style={{ height: `${bar.h}%` }}
              initial={reduced ? false : { scaleY: 0 }}
              animate={reduced ? undefined : { scaleY: 1 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 + i * 0.1 }}
            />
            <motion.span
              className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.9)]"
              style={{ bottom: `${bar.h}%` }}
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.75 + i * 0.1 }}
              aria-hidden="true"
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-navy-100/50">
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** UNDERSTOOD — clarity sharpening: what the doctor treats becomes legible. */
function UnderstoodVisual({ reduced }: { reduced: boolean }) {
  const chips = ["Specialty", "Subspecialty", "Conditions treated", "Procedures", "Where to attend"];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
      {chips.map((chip, i) => (
        <motion.span
          key={chip}
          className="flex items-center gap-2.5 rounded-full border border-teal-400/40 bg-teal-400/[0.08] px-5 py-2.5 text-[14px] font-medium text-white"
          initial={reduced ? false : { opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          animate={reduced ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.2 + i * 0.12 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-400">
            <path d="m4.5 12.5 5 5L19.5 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {chip}
        </motion.span>
      ))}
    </div>
  );
}

/** TRUSTED — a reputation ring completing as trust signals land. */
function TrustedVisual({ reduced }: { reduced: boolean }) {
  const signals = ["Credentials", "Affiliations", "Reputation", "Authority"];
  return (
    <div className="flex h-full items-center justify-center gap-10 px-6">
      <div className="relative h-40 w-40 lg:h-48 lg:w-48">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="80" cy="80" r="66" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <motion.circle
            cx="80"
            cy="80"
            r="66"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="8"
            strokeLinecap="round"
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={reduced ? undefined : { pathLength: 0.85 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.25 }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-teal-400"
          {...enter(3, reduced)}
        >
          <IconShield className="h-9 w-9" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-navy-100/60">
            Verified signals
          </span>
        </motion.div>
      </div>
      <ul className="hidden space-y-3 sm:block">
        {signals.map((signal, i) => (
          <motion.li key={signal} className="flex items-center gap-2.5 text-[13.5px] text-navy-100/80" {...enter(i, reduced)}>
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" aria-hidden="true" />
            {signal}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/** CONTACTED — enquiries landing and being acknowledged. */
function ContactedVisual({ reduced }: { reduced: boolean }) {
  const rows = ["New enquiry — website form", "New enquiry — phone call", "Appointment request — routed"];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
      <div className="text-center">
        <p className="font-display text-[64px] font-medium leading-none text-white lg:text-[80px]">
          <CountUp to={12} />
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-navy-100/60">
          Enquiries this month — sample
        </p>
      </div>
      <div className="w-full max-w-[340px] space-y-2">
        {rows.map((row, i) => (
          <motion.div
            key={row}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5"
            {...enter(i, reduced)}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />
            <span className="flex-1 text-[12.5px] text-navy-100/80">{row}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-teal-400">Logged</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** MEASURED — every channel counted, nothing anecdotal. */
function MeasuredVisual({ reduced }: { reduced: boolean }) {
  const stats = [
    { label: "Calls", value: 18 },
    { label: "Forms", value: 24 },
    { label: "Sources", value: 7 },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
      <div className="grid w-full max-w-[420px] grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-4 text-center"
            {...enter(i, reduced)}
          >
            <p className="font-display text-[34px] font-medium leading-none text-teal-400">
              <CountUp to={stat.value} />
            </p>
            <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-navy-100/60">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 320 60" className="w-full max-w-[420px]" aria-hidden="true">
        <motion.path
          d="M4 50 L48 44 L92 46 L136 36 L180 32 L224 22 L268 18 L316 8"
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0 }}
          animate={reduced ? undefined : { pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.5 }}
        />
        <circle cx="316" cy="8" r="3" fill="#2DD4BF" />
      </svg>
    </div>
  );
}

/** GROWN — the compounding curve. */
function GrownVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <svg viewBox="0 0 440 190" className="w-full max-w-[520px]" aria-hidden="true">
        <defs>
          <linearGradient id="grown-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="rgba(255,255,255,0.07)" strokeWidth="1">
          <path d="M0 48 H440 M0 96 H440 M0 144 H440" />
        </g>
        <motion.path
          d="M8 168 C 90 160, 130 150, 180 128 S 290 84, 340 52 S 410 24, 428 16 L428 190 L8 190 Z"
          fill="url(#grown-fill)"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.path
          d="M8 168 C 90 160, 130 150, 180 128 S 290 84, 340 52 S 410 24, 428 16"
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduced ? undefined : { pathLength: 0 }}
          animate={reduced ? undefined : { pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.25 }}
        />
        <motion.path
          d="M414 14 L428 16 L422 29"
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.7 }}
        />
        <motion.circle
          cx="428"
          cy="16"
          r="10"
          fill="none"
          stroke="#2DD4BF"
          strokeOpacity="0.5"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: [0, 1, 0.35] }}
          transition={{ duration: 1.6, delay: 1.8, repeat: Infinity, repeatType: "mirror" }}
        />
      </svg>
    </div>
  );
}

const VISUALS: Record<VisualKind, ComponentType<{ reduced: boolean }>> = {
  found: FoundVisual,
  understood: UnderstoodVisual,
  trusted: TrustedVisual,
  contacted: ContactedVisual,
  measured: MeasuredVisual,
  grown: GrownVisual,
};

/* ---------------- section ---------------- */

/** Section 5 — WardShift Growth System preview: interactive stage explorer. */
export default function GrowthSystemPreview() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const stage = STAGES[active];
  const Visual = VISUALS[stage.visual];

  // Scroll-spy: stages auto-advance as the section moves through the viewport.
  // Manual click/hover/focus pauses the spy briefly so the visitor keeps control.
  const sectionRef = useRef<HTMLElement>(null);
  const manualUntil = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 95%"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced || Date.now() < manualUntil.current) return;
    setActive(Math.min(STAGES.length - 1, Math.max(0, Math.floor(p * STAGES.length))));
  });
  const select = (i: number) => {
    manualUntil.current = Date.now() + 7000;
    setActive(i);
  };

  return (
    <section ref={sectionRef} id="growth-system" className="relative overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "512px 512px" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-teal-500/[0.06] blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-[880px] text-center"
        >
          <motion.p variants={fadeUp} className="eyebrow text-teal-400">
            The WardShift Growth System
          </motion.p>
          <FrameworkH2 />
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-navy-100/80">
            One connected system around the clinical work — not a collection of disconnected
            marketing tactics.
          </motion.p>
        </motion.div>

        {/* interactive stage explorer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12"
        >
          {/* stage selector */}
          <div className="relative">
            <span className="absolute bottom-2 left-[7px] top-2 hidden w-px bg-white/10 lg:block" aria-hidden="true" />
            <motion.span
              className="absolute left-[7px] top-2 hidden w-px origin-top bg-teal-400 lg:block"
              style={{ height: "calc(100% - 16px)" }}
              initial={false}
              animate={{ scaleY: (active + 1) / STAGES.length }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              aria-hidden="true"
            />
            <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
              {STAGES.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.name} className="relative shrink-0 lg:shrink lg:pl-8">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-1/2 hidden h-[15px] w-[15px] -translate-y-1/2 rounded-full border transition-colors duration-300 lg:block",
                        isActive
                          ? "border-teal-400 bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.7)]"
                          : i < active
                            ? "border-teal-400/60 bg-teal-400/30"
                            : "border-white/20 bg-navy-900",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => select(i)}
                      onMouseEnter={() => select(i)}
                      onFocus={() => select(i)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "w-full rounded-[10px] border px-4 py-3.5 text-left transition-all duration-200 lg:py-4",
                        isActive
                          ? "border-teal-400/50 bg-navy-700/70 shadow-[0_0_28px_rgba(20,184,166,0.12)]"
                          : "border-white/10 bg-navy-700/30 hover:border-teal-400/30 hover:bg-navy-700/50",
                      )}
                    >
                      <span className="flex items-baseline gap-3">
                        <span
                          className={cn(
                            "font-mono text-[11px] font-medium tracking-[0.14em]",
                            isActive ? "text-teal-400" : "text-navy-100/40",
                          )}
                        >
                          {s.num}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[17px] font-medium tracking-[0.02em] transition-colors duration-200",
                            isActive ? "text-white" : "text-navy-100/60",
                          )}
                        >
                          {s.name}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 hidden font-mono text-[10px] uppercase tracking-[0.16em] text-navy-100/40 lg:block lg:pl-8">
              Stage {stage.num} / 06
            </p>
          </div>

          {/* detail panel */}
          <div className="relative min-h-[520px] overflow-hidden rounded-[10px] border border-white/10 bg-navy-800/60 lg:min-h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.name}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="flex h-full flex-col p-7 lg:p-10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-teal-400">
                      {stage.num}
                    </p>
                    <h3 className="mt-1.5 font-display text-[30px] font-medium tracking-[0.01em] text-white lg:text-[36px]">
                      {stage.name}
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.6] text-navy-100/75">
                      {stage.short}
                    </p>
                  </div>
                  <IllustrativeBadge className="border-white/20 text-navy-100/70" />
                </div>

                <div className="mt-6 min-h-[220px] flex-1 rounded-lg border border-white/[0.07] bg-navy-900/50 lg:min-h-[240px]">
                  <Visual reduced={reduced} />
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-navy-100/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            to="/growth-system/"
            className="group inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-navy-950 transition-colors duration-150 hover:bg-teal-400"
          >
            Explore the Growth System
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
