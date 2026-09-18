import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { ArrowRight, MapPin, Search, Star } from "lucide-react";
import WordReveal from "@/components/WordReveal";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ---------- search results page visual ---------- */
const LOCAL_RESULTS = [
  {
    name: "Competitor A",
    meta: "Private orthopaedic clinic",
    beforePosition: 1,
    afterPosition: 2,
    rating: "4.9",
    reviews: "186 reviews",
    active: false,
  },
  {
    name: "Your Practice",
    meta: "Consultant knee specialist",
    beforePosition: 3,
    afterPosition: 1,
    rating: "4.7",
    reviews: "64 reviews",
    active: true,
  },
  {
    name: "Competitor B",
    meta: "Sports injury consultant",
    beforePosition: 4,
    afterPosition: 4,
    rating: "4.8",
    reviews: "112 reviews",
    active: false,
  },
];

function StarRating({ value, reviews }: { value: string; reviews: string }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-grey-500">
      <span className="font-semibold text-amber-500">{value}</span>
      <span className="flex text-amber-400" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-2.5 w-2.5 fill-current stroke-current" />
        ))}
      </span>
      {reviews}
    </span>
  );
}

function SearchResultsVisual({ reduced }: { reduced: boolean }) {
  const [improved, setImproved] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      const timer = setTimeout(() => setImproved(true), 0);
      return () => clearTimeout(timer);
    }

    const first = setTimeout(() => setImproved(true), 2200);
    const interval = setInterval(() => setImproved((current) => !current), 6200);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [reduced]);

  const positionedResults = [...LOCAL_RESULTS]
    .map((result) => ({
      ...result,
      position: improved ? result.afterPosition : result.beforePosition,
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <div className="overflow-hidden rounded-[12px] border border-grey-300 bg-[#f8fafc] shadow-card">
      <div className="flex items-center gap-1.5 border-b border-grey-300 bg-white px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
        <span className="ml-2 truncate rounded-full bg-grey-100 px-3 py-1 font-mono text-[10px] text-grey-500">
          google.com/search?q=knee+specialist+near+me
        </span>
      </div>

      <div className="p-4">
        <div className="rounded-full border border-grey-300 bg-white px-4 py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2.5">
            <Search className="h-4 w-4 shrink-0 text-grey-500" aria-hidden="true" />
            <span className="truncate text-[13px] text-navy-800">knee specialist near me</span>
          </div>
        </div>

        <div className="mt-4 rounded-[10px] border border-grey-300 bg-white p-3">
          <div className="border-b border-grey-300 pb-2">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
              Local results
            </p>
          </div>

          <ul className="mt-2 space-y-2">
            {positionedResults.map((result, i) => (
              <motion.li
                key={result.name}
                layout="position"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.25 + i * 0.08 }}
                className={cn(
                  "rounded-lg border p-3",
                  result.active
                    ? improved
                      ? "border-teal-500 bg-teal-100/70 shadow-[0_0_22px_rgba(20,184,166,0.16)]"
                      : "border-teal-500/60 bg-teal-100/45"
                    : "border-grey-300 bg-white",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={cn("text-[13px] font-semibold leading-tight", result.active ? "text-navy-800" : "text-grey-700")}>
                      {result.name}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-grey-500">{result.meta}</p>
                  </div>
                  <span className={cn("rounded-full px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.08em]", result.active ? "bg-white text-teal-600" : "bg-grey-100 text-grey-500")}>
                    Pos {result.position}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-grey-400" aria-hidden="true" />
                  <StarRating value={result.rating} reviews={result.reviews} />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-3 rounded-[10px] border border-grey-300 bg-white p-3">
          <p className="text-[12px] font-semibold text-[#1a0dab]">Your Practice | Consultant Knee Specialist</p>
          <p className="mt-1 text-[11px] text-[#006621]">www.example.co.uk/knee-specialist</p>
          <p className="mt-1 text-[11px] leading-snug text-grey-500">
            Shows the practice moving from position 3 to position 1 as visibility improves.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- hero visual ---------- */

function HeroVisual({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
    >
      <SearchResultsVisual reduced={reduced} />
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
