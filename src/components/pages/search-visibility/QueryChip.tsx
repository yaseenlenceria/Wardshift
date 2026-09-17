import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Mock search query chip that types its query character-by-character
 * (40ms/char) when scrolled into view. Renders the full text instantly
 * under prefers-reduced-motion.
 */
export default function QueryChip({ query, className }: { query: string; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduced) return;
    if (!inView) return;
    let pos = 0;
    const timer = setInterval(() => {
      pos += 1;
      setText(query.slice(0, pos));
      if (pos >= query.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [inView, query, reduced]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-full border border-grey-300 bg-paper px-3.5 py-1.5 font-mono text-[11.5px] text-grey-700",
        className,
      )}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.3 15.3 20.5 20.5" />
      </svg>
      <span className="truncate">
        {reduced ? query : text}
        {!reduced && inView && text.length < query.length ? (
          <span className="ml-0.5 inline-block h-3 w-[1.5px] translate-y-[2px] animate-caret-blink bg-teal-500" aria-hidden="true" />
        ) : null}
      </span>
    </span>
  );
}
