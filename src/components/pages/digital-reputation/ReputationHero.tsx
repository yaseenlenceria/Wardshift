import { memo, useEffect, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import {
  IconBrowser,
  IconDocument,
  IconMapPin,
  IconShield,
} from "@/components/icons";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ---------- search-result mirror visual (fictional) ---------- */

type Status = "accurate" | "outdated";

interface ResultRow {
  kind: string;
  title: string;
  source: string;
  icon: typeof IconBrowser;
  status: Status;
}

const ROWS: ResultRow[] = [
  {
    kind: "Website",
    title: "Dr A. Example — Consultant Specialist",
    source: "Practice website · dr-example.example",
    icon: IconBrowser,
    status: "accurate",
  },
  {
    kind: "Profile",
    title: "Dr A. Example — Specialist Directory Profile",
    source: "Professional directory listing",
    icon: IconDocument,
    status: "accurate",
  },
  {
    kind: "Hospital listing",
    title: "Consultant Page — Partner Hospital",
    source: "Hospital website · last updated unknown",
    icon: IconShield,
    status: "outdated",
  },
  {
    kind: "Map entry",
    title: "Dr A. Example — Practice Location",
    source: "Map & local listing",
    icon: IconMapPin,
    status: "accurate",
  },
];

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em]",
        status === "accurate"
          ? "border-teal-500/30 bg-teal-100/60 text-teal-600"
          : "border-amber-300/60 bg-amber-50 text-amber-700",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "accurate" ? "bg-teal-500" : "bg-amber-500",
        )}
        aria-hidden="true"
      />
      {status === "accurate" ? "Accurate" : "Outdated"}
    </span>
  );
}

/** One pill that flips Outdated → Accurate on a 4s loop, demonstrating correction. */
const CorrectingPill = memo(function CorrectingPill({ disabled }: { disabled: boolean }) {
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    if (disabled) return;
    const id = window.setInterval(() => setFixed((f) => !f), 4000);
    return () => window.clearInterval(id);
  }, [disabled]);

  if (disabled) return <StatusPill status="accurate" />;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={fixed ? "accurate" : "outdated"}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="inline-flex"
      >
        <StatusPill status={fixed ? "accurate" : "outdated"} />
      </motion.span>
    </AnimatePresence>
  );
});

function SearchMirrorVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="rounded-[10px] border border-grey-300 bg-white p-5 shadow-card sm:p-6">
        {/* search bar */}
        <div className="flex items-center gap-2.5 rounded-full border border-grey-300 bg-paper px-4 py-2.5">
          <Search className="h-3.5 w-3.5 text-grey-500" aria-hidden="true" />
          <span className="text-[13px] text-grey-700">Dr A. Example</span>
          <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.1em] text-grey-500">
            Fictional search
          </span>
        </div>

        <ul className="mt-5 space-y-3">
          {ROWS.map((row, i) => (
            <motion.li
              key={row.title}
              initial={reduced ? false : { opacity: 0, x: 24 }}
              animate={reduced ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.5 + i * 0.08 }}
              className="flex items-start gap-3.5 rounded-lg border border-grey-100 bg-white p-3.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper text-navy-800">
                <row.icon width={18} height={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-navy-800">
                  {row.title}
                </p>
                <p className="mt-0.5 truncate text-[11.5px] text-grey-500">{row.source}</p>
                <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-grey-500">
                  {row.kind}
                </p>
              </div>
              {row.status === "outdated" ? (
                <CorrectingPill disabled={reduced} />
              ) : (
                <motion.span
                  initial={reduced ? false : { scale: 0.8, opacity: 0 }}
                  animate={reduced ? undefined : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25, ease: EASE_OUT, delay: 0.75 + i * 0.08 }}
                >
                  <StatusPill status="accurate" />
                </motion.span>
              )}
            </motion.li>
          ))}
        </ul>

        <p className="mt-4 border-t border-grey-100 pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-grey-500">
          Consistency check — fictional results, illustrative only
        </p>
      </div>
    </div>
  );
}

/* ---------- hero section ---------- */

export default function ReputationHero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 pb-20 pt-10 lg:grid-cols-2 lg:pb-28 lg:pt-14">
        <div className="max-w-[560px]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "How We Help", href: "/how-we-help/" },
              { label: "Digital Reputation" },
            ]}
          />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
            className="eyebrow mt-8 text-teal-600"
          >
            Digital Reputation
          </motion.p>
          <WordReveal
            as="h1"
            text="Your Reputation Exists Online Before You Enter the Room."
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
            &ldquo;Are my Google reviews helping me?&rdquo;
          </motion.p>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
            className="mt-5 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
          >
            Turn a strong clinical reputation into visible online trust. Before a
            patient ever meets you, they meet your search results — WardShift makes
            sure what they find is accurate, consistent and worthy of the reputation
            you've built clinically.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
            className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <Link
              to="/growth-review/"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
            >
              See What Patients Find
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="#patient-checks"
              className="text-[15px] font-semibold text-navy-800 underline decoration-teal-500/50 decoration-2 underline-offset-8 transition-colors duration-150 hover:text-teal-600"
            >
              What patients check ↓
            </a>
          </motion.div>
        </div>

        <SearchMirrorVisual reduced={reduced} />
      </div>
    </section>
  );
}
