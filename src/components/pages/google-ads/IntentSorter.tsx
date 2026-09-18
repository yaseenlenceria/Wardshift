import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { EASE_OUT, staggerParent, fadeUp, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type IntentKind = "high" | "research" | "excluded";

interface Query {
  q: string;
  intent: IntentKind;
  note: string;
}

const QUERIES: Query[] = [
  {
    q: "private hip replacement consultation",
    intent: "high",
    note: "A patient actively seeking a private consultation — exactly the demand a campaign exists to capture. Worth paying for, with a landing page built to convert.",
  },
  {
    q: "hip surgeon consultation fees",
    intent: "high",
    note: "Cost questions come from patients close to a decision. A relevant ad and an honest, well-structured landing page serve them well.",
  },
  {
    q: "hip pain causes",
    intent: "research",
    note: "Early-stage research. Valuable to long-term search visibility, but rarely worth paying for one click at a time.",
  },
  {
    q: "how long does a hip operation take",
    intent: "research",
    note: "Informational intent — better answered by clear website content than by advertising budget.",
  },
  {
    q: "hip replacement public waiting list",
    intent: "excluded",
    note: "This searcher is not looking for private care. Negative keywords keep clicks like this from ever costing the practice.",
  },
  {
    q: "free hip pain exercises pdf",
    intent: "excluded",
    note: "Explicitly cost-free intent — filtered out by negative keywords before it can spend a unit of budget.",
  },
];

const INTENT_META: Record<IntentKind, { label: string; chip: string; tag: string }> = {
  high: {
    label: "High intent",
    chip: "border-teal-400/60 bg-teal-400/10 text-teal-400",
    tag: "text-teal-400",
  },
  research: {
    label: "Research",
    chip: "border-white/15 bg-white/[0.04] text-navy-100/70",
    tag: "text-grey-300",
  },
  excluded: {
    label: "Excluded",
    chip: "border-white/10 bg-transparent text-navy-100/40 line-through",
    tag: "text-grey-500",
  },
};

export default function IntentSorter() {
  const reduced = usePrefersReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const [classified, setClassified] = useState<ReadonlySet<number>>(new Set());

  const pick = (i: number) => {
    setSelected(i);
    setClassified((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  };

  const active = selected !== null ? QUERIES[selected] : null;

  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* noise texture at 3% */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "512px 512px" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-site px-6 py-20 lg:py-32">
        <SectionHeading
          dark
          eyebrow="Search intent"
          title="Not Every Search Deserves Your Budget."
          lede="Some searches are worth paying for; many are not. Choosing carefully — and blocking the rest — is what protects your budget. Select each query to see how it would be read."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* query chips */}
          <motion.div
            variants={staggerParent(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-3"
            role="group"
            aria-label="Sample search queries — select to classify"
          >
            {QUERIES.map((query, i) => {
              const isClassified = classified.has(i);
              const isActive = selected === i;
              const meta = INTENT_META[query.intent];
              return (
                <motion.button
                  key={query.q}
                  type="button"
                  variants={fadeUp}
                  onClick={() => pick(i)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-lg border px-4 py-3.5 text-left font-mono text-[13px] tracking-[0.01em] transition-colors duration-200 focus-visible:outline-none",
                    isClassified
                      ? meta.chip
                      : "border-white/15 bg-white/[0.03] text-navy-100 hover:border-teal-400/50",
                    isActive && !isClassified && "border-teal-400/60",
                    isActive && isClassified && "ring-1 ring-teal-400/40",
                  )}
                >
                  <span>{query.q}</span>
                  {isClassified && (
                    <span
                      className={cn(
                        "shrink-0 text-[10px] font-medium uppercase tracking-[0.14em]",
                        meta.tag,
                      )}
                    >
                      {meta.label}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* detail panel */}
          <div className="min-h-[220px] rounded-[10px] border border-white/[0.08] bg-navy-800/60 p-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={selected}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                >
                  <p className="eyebrow text-teal-400">Classification</p>
                  <p
                    className={cn(
                      "mt-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em]",
                      INTENT_META[active.intent].tag,
                    )}
                  >
                    {INTENT_META[active.intent].label}
                  </p>
                  <p className="mt-3 font-mono text-[15px] leading-relaxed text-white">
                    “{active.q}”
                  </p>
                  <p className="mt-4 text-[15.5px] leading-[1.7] text-navy-100/80">
                    {active.note}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                >
                  <p className="eyebrow text-teal-400">Classification</p>
                  <p className="mt-4 text-[15.5px] leading-[1.7] text-navy-100/70">
                    Select a query on the left to see how the architecture reads
                    it — which searches earn budget, which belong to content,
                    and which are filtered out entirely.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
