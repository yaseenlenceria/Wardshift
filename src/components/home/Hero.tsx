import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
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
    <div className="flex items-center gap-1.5 text-[12px] text-grey-500">
      <MapPin className="h-3.5 w-3.5 shrink-0 text-grey-400" aria-hidden="true" />
      <span className="font-semibold text-amber-500">{value}</span>
      <span className="flex text-amber-400" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-3 w-3 fill-current stroke-current" />
        ))}
      </span>
      <span>{reviews}</span>
    </div>
  );
}

function SearchResultsVisual({ reduced }: { reduced: boolean }) {
  const [improved, setImproved] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      const timer = setTimeout(() => setImproved(true), 0);
      return () => clearTimeout(timer);
    }

    const first = setTimeout(() => setImproved(true), 2500);
    const interval = setInterval(() => setImproved((current) => !current), 6000);
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
    <motion.div
      className="w-full overflow-hidden rounded-[16px] border border-grey-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
    >
      {/* Browser top chrome */}
      <div className="flex items-center border-b border-grey-200 bg-[#fbfcfd] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-3 w-3 rounded-full bg-[#ef4444]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#f59e0b]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#22c55e]" aria-hidden="true" />
        </div>
        <div className="mx-auto flex max-w-[380px] flex-1 items-center justify-center">
          <span className="truncate rounded-full bg-[#f1f5f9] px-4 py-1 font-mono text-[10.5px] text-grey-600 sm:text-[11px]">
            google.com/search?q=knee+specialist+near+me
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="space-y-4 p-4 sm:p-6">
        {/* Search bar */}
        <div className="flex items-center gap-3 rounded-full border border-grey-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.04)] sm:px-5">
          <Search className="h-4 w-4 shrink-0 text-grey-400" aria-hidden="true" />
          <span className="truncate text-[14px] font-medium text-navy-900">
            knee specialist near me
          </span>
        </div>

        {/* Local Results Panel (Full Width) */}
        <div className="rounded-[12px] border border-grey-200 bg-white p-4 sm:p-5">
          <div className="border-b border-grey-100 pb-2.5">
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-grey-500">
              Local results
            </p>
          </div>

          <ul className="mt-3 space-y-2.5">
            {positionedResults.map((result) => (
              <motion.li
                key={result.name}
                layout="position"
                transition={{ duration: 0.55, ease: EASE_OUT }}
                className={cn(
                  "rounded-[10px] border p-3.5 transition-all duration-300",
                  result.active
                    ? "border-teal-400/90 bg-[#f0fdfa] shadow-[0_0_18px_rgba(20,184,166,0.12)]"
                    : "border-grey-200 bg-white hover:border-grey-300",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={cn(
                        "text-[14px] leading-tight",
                        result.active ? "font-bold text-navy-900" : "font-semibold text-grey-800",
                      )}
                    >
                      {result.name}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-snug text-grey-500">
                      {result.meta}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
                      result.active
                        ? "border border-teal-200/80 bg-white text-teal-600 shadow-2xs"
                        : "bg-grey-100 text-grey-600",
                    )}
                  >
                    POS {result.position}
                  </span>
                </div>
                <div className="mt-2.5">
                  <StarRating value={result.rating} reviews={result.reviews} />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Bottom organic Google result */}
        <div className="rounded-[12px] border border-grey-200 bg-white p-4 sm:p-5">
          <p className="text-[13px] font-semibold text-[#1a0dab] sm:text-[14px]">
            Your Practice | Consultant Knee Specialist
          </p>
          <p className="mt-0.5 text-[11.5px] font-medium text-[#006621]">
            www.example.co.uk/knee-specialist
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-grey-600">
            Shows the practice moving from position 3 to position 1 as visibility improves.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- hero visual ---------- */
function HeroVisual({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { y: parallaxY }}
      className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
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
