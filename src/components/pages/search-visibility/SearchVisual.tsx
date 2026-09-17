import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Code-built mock search page: one query box that types a query
 * character-by-character (looping between queries, mono caret) with six
 * result cards fanning out below — one per patient search type.
 */

const QUERIES = ["consultant dermatologist", "dr a. example cardiologist", "private echocardiogram"];

const RESULTS: { type: string; title: string; snippet: string }[] = [
  { type: "DOCTOR-NAME", title: "Dr A. Example — Consultant Cardiologist", snippet: "Profile, credentials and contact journey" },
  { type: "SPECIALTY", title: "Private Cardiology Consultation", snippet: "Specialty overview and expertise" },
  { type: "CONDITION", title: "Chest Pain — Private Assessment", snippet: "Condition page in plain language" },
  { type: "PROCEDURE", title: "Private Echocardiogram", snippet: "Procedure page with next steps" },
  { type: "LOCATION", title: "Cardiology Clinics & Locations", snippet: "Local results and map presence" },
  { type: "REFERRAL-VALIDATION", title: "About Dr A. Example", snippet: "Biography that withstands scrutiny" },
];

function useTypewriter(queries: string[], disabled: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (disabled) return;
    let q = 0;
    let pos = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = queries[q];
      if (!deleting) {
        pos += 1;
        setText(current.slice(0, pos));
        if (pos >= current.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 40);
      } else {
        pos -= 1;
        setText(current.slice(0, pos));
        if (pos <= 0) {
          deleting = false;
          q = (q + 1) % queries.length;
          timer = setTimeout(tick, 500);
          return;
        }
        timer = setTimeout(tick, 18);
      }
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [disabled, queries]);

  return text;
}

export default function SearchVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const typedRaw = useTypewriter(QUERIES, reduced === true);
  const typed = reduced ? QUERIES[0] : typedRaw;

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Illustrative mock search results showing the six types of patient search">
      {/* query box */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="mx-auto flex max-w-[420px] items-center gap-3 rounded-full border border-grey-300 bg-white px-5 py-3.5 shadow-card"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.3 15.3 20.5 20.5" />
        </svg>
        <span className="font-mono text-[13px] text-navy-800">
          {typed}
          <span className={cn("ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] bg-teal-500", !reduced && "animate-caret-blink")} aria-hidden="true" />
        </span>
      </motion.div>

      {/* result cards fan */}
      <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
        {RESULTS.map((r, i) => (
          <motion.div
            key={r.type}
            initial={reduced ? false : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: reduced ? 0 : 0.3 + i * 0.09 }}
            className={cn(
              "rounded-lg border border-grey-300 bg-white p-4 shadow-card",
              i % 2 === 0 ? "sm:-rotate-[0.6deg]" : "sm:rotate-[0.6deg]",
            )}
          >
            <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-teal-600">
              {r.type}
            </p>
            <p className="mt-1.5 text-[13.5px] font-semibold leading-snug text-navy-800 underline decoration-grey-300 decoration-1 underline-offset-2">
              {r.title}
            </p>
            <p className="mt-1 text-[12px] leading-[1.5] text-grey-500">{r.snippet}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
