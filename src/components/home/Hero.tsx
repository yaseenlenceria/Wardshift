import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { ArrowRight, Search } from "lucide-react";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import WordReveal from "@/components/WordReveal";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ---------- idle float wrapper (isolated perpetual animation) ---------- */
const Float = memo(function Float({
  children,
  phase = 0,
  disabled = false,
}: {
  children: ReactNode;
  phase?: number;
  disabled?: boolean;
}) {
  if (disabled) return <>{children}</>;
  return (
    <motion.div
      animate={{ y: [0, -4, 0, 4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: phase }}
    >
      {children}
    </motion.div>
  );
});

/* ---------- looping typewriter ---------- */
function useTypewriter(text: string, disabled: boolean) {
  const [shown, setShown] = useState(disabled ? text : "");
  useEffect(() => {
    if (disabled) {
      const timer = setTimeout(() => setShown(text), 0);
      return () => clearTimeout(timer);
    }
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (!deleting) {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          deleting = true;
          timer = setTimeout(tick, 3400); // hold the finished query
          return;
        }
        timer = setTimeout(tick, 55 + Math.random() * 55);
      } else {
        i -= 2;
        setShown(text.slice(0, Math.max(0, i)));
        if (i <= 0) {
          deleting = false;
          timer = setTimeout(tick, 700);
          return;
        }
        timer = setTimeout(tick, 22);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [text, disabled]);
  return shown;
}

/* ---------- visibility stack with re-order rise ---------- */
interface StackRow {
  id: string;
  name: string;
  before: number;
  after: number;
}

const STACK: StackRow[] = [
  { id: "a", name: "Competitor A", before: 1, after: 1 },
  { id: "you", name: "Your Practice", before: 8, after: 3 },
  { id: "b", name: "Competitor B", before: 3, after: 4 },
];

function VisibilityStack({ reduced }: { reduced: boolean }) {
  const [improved, setImproved] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      const timer = setTimeout(() => setImproved(true), 0);
      return () => clearTimeout(timer);
    }
    let on = false;
    const cycle = () => {
      on = !on;
      setImproved(on);
    };
    const first = setTimeout(cycle, 2600);
    const interval = setInterval(cycle, 6000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [reduced]);

  const rows = [...STACK].sort((x, y) => (improved ? x.after - y.after : x.before - y.before));

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
          Local search positions
        </p>
        <AnimatePresence mode="wait">
          <motion.span
            key={improved ? "after" : "before"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "font-mono text-[10px] font-medium uppercase tracking-[0.14em]",
              improved ? "text-teal-600" : "text-grey-500",
            )}
          >
            {improved ? "WardShift improvement" : "Today"}
          </motion.span>
        </AnimatePresence>
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map((row) => {
          const isYou = row.id === "you";
          const pos = improved ? row.after : row.before;
          return (
            <motion.li
              key={row.id}
              layout="position"
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3.5 py-2.5 transition-colors duration-500",
                isYou
                  ? improved
                    ? "border-teal-500/60 bg-teal-100/50 shadow-[0_0_20px_rgba(20,184,166,0.15)]"
                    : "border-grey-300 bg-grey-100/60"
                  : "border-grey-300/70 bg-white",
              )}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isYou && improved ? "bg-teal-500" : "bg-grey-300",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "text-[13.5px] font-semibold",
                    isYou ? (improved ? "text-navy-800" : "text-grey-500") : "text-grey-700",
                  )}
                >
                  {row.name}
                </span>
              </span>
              <span
                className={cn(
                  "font-mono text-[10.5px] font-medium uppercase tracking-[0.1em]",
                  isYou && improved ? "text-teal-600" : "text-grey-500",
                )}
              >
                Position {pos}
                {isYou && improved && <span className="ml-1.5" aria-hidden="true">↑</span>}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- enquiry notification (appears, rests, repeats) ---------- */
const EnquiryNote = memo(function EnquiryNote({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <div className="flex items-center gap-2.5 rounded-lg border border-teal-500/40 bg-white px-3.5 py-2.5 shadow-card">
        <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
        <span className="text-[12px] font-medium text-navy-800">New appointment enquiry received</span>
      </div>
    );
  }
  return (
    <motion.div
      className="flex items-center gap-2.5 rounded-lg border border-teal-500/40 bg-white px-3.5 py-2.5 shadow-card"
      animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -4] }}
      transition={{ duration: 6, times: [0, 0.12, 0.82, 1], repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-50 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
      </span>
      <span className="text-[12px] font-medium text-navy-800">New appointment enquiry received</span>
    </motion.div>
  );
});

/* ---------- hero visual ---------- */

const JOURNEY_STEPS = ["Potential patient", "Search", "Result", "Profile", "Website", "Enquiry"];

const CHIPS = [
  { label: "+12 appointment enquiries", className: "-left-3 top-[6%] sm:-left-8", phase: 0.6 },
  { label: "4.9 ★ patient rating", className: "-right-2 top-[34%] sm:-right-6", phase: 1.8 },
  { label: "Visibility ↑ 34%", className: "-left-2 bottom-[16%] sm:-left-7", phase: 3.0 },
];

function HeroVisual({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const query = useTypewriter("knee specialist near me", reduced);

  return (
    <motion.div ref={ref} style={reduced ? undefined : { y: parallaxY }} className="relative">
      {/* mini journey strip */}
      <ol className="mb-7 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-grey-500">
        {JOURNEY_STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            {label}
            {i < JOURNEY_STEPS.length - 1 && (
              <span className="text-teal-500" aria-hidden="true">→</span>
            )}
          </li>
        ))}
      </ol>

      <div className="relative">
        {/* slowly drawing graph line behind the card */}
        <svg
          viewBox="0 0 440 560"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M-10 520 C 80 500, 150 470, 220 430 S 360 330, 460 260"
            stroke="#14B8A6"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="5 6"
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={reduced ? undefined : { pathLength: 1 }}
            transition={{ duration: 2.6, ease: "easeInOut", delay: 0.8 }}
          />
        </svg>

        {/* main composed card */}
        <motion.div
          className="relative z-10 rounded-[10px] border border-grey-300 bg-white p-5 shadow-card sm:p-6"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
        >
          {/* search box */}
          <div className="flex items-center gap-2.5 rounded-full border border-grey-300 bg-paper px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-grey-500" aria-hidden="true" />
            <span className="min-h-[20px] text-[14px] text-grey-700">
              {query}
              <span
                className="ml-0.5 inline-block h-4 w-px translate-y-[3px] animate-pulse bg-teal-500 motion-reduce:animate-none"
                aria-hidden="true"
              />
            </span>
          </div>

          {/* search demand */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-grey-500">
              Search demand — <span className="text-navy-800">2,400 searches / month</span>
            </p>
            <IllustrativeBadge className="px-2 py-0.5 text-[9px]" />
          </div>

          <VisibilityStack reduced={reduced} />
        </motion.div>

        {/* enquiry notification */}
        <motion.div
          className="relative z-20 mt-4 flex justify-end pr-1 sm:pr-4"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.75 }}
        >
          <EnquiryNote reduced={reduced} />
        </motion.div>

        {/* floating story chips */}
        {CHIPS.map((chip) => (
          <motion.div
            key={chip.label}
            className={cn("absolute z-30 hidden sm:block", chip.className)}
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 1.1 + chip.phase * 0.3 }}
          >
            <Float phase={chip.phase} disabled={reduced}>
              <span className="block rounded-full border border-grey-300 bg-white px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.04em] text-navy-800 shadow-card">
                {chip.label}
              </span>
            </Float>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-grey-500">
        Illustrative example — sample data throughout
      </p>
    </motion.div>
  );
}

/* ---------- hero section ---------- */

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  const scrollToSystemMap = (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById("system-map")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* faint rotated blueprint grid, top-right */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[560px] w-[560px] rotate-[8deg]"
        style={{
          backgroundImage: "url(/texture-grid.svg)",
          backgroundSize: "400px 400px",
          filter: "invert(1)",
          opacity: 0.05,
        }}
        aria-hidden="true"
      />
      {/* single teal hairline ascent behind the visual */}
      <svg
        className="pointer-events-none absolute bottom-0 right-0 hidden w-[60%] lg:block"
        viewBox="0 0 800 160"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 150 L800 20" stroke="#14B8A6" strokeOpacity="0.35" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto grid min-h-[calc(100dvh-72px)] max-w-site items-center gap-14 px-6 py-16 lg:min-h-[720px] lg:grid-cols-2 lg:py-24">
        {/* copy */}
        <div className="max-w-[560px]">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
            className="eyebrow text-teal-600"
          >
            The Growth Side of Private Practice.
          </motion.p>

          <WordReveal
            text="Your clinical reputation should be easier for the right patients to find."
            as="h1"
            wordDelay={0.045}
            duration={0.7}
            className="mt-5 max-w-[52ch] text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
          />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.45 }}
            className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
          >
            WardShift improves how patients discover your practice, understand your expertise,
            build trust, make contact — and how that entire journey is measured.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/growth-review/?focus=visibility"
              className="group inline-flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
            >
              See Where Your Practice Is Losing Visibility
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="#system-map"
              onClick={scrollToSystemMap}
              className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/60 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
            >
              See How WardShift Works ↓
            </a>
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500"
          >
            Private practice growth — Strategy · Websites · Search · Enquiries · Measurement
          </motion.p>
        </div>

        {/* visual */}
        <HeroVisual reduced={reduced} />
      </div>
    </section>
  );
}
