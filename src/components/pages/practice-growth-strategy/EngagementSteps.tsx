import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    label: "Growth Review",
    description: "Diagnose: a structured look at where the practice stands and what it wants to achieve.",
  },
  {
    label: "Strategy",
    description: "Objectives named, channels chosen, and a roadmap sequenced by impact and effort.",
  },
  {
    label: "Build",
    description: "Systems and channels implemented — website, search, enquiry handling, measurement.",
  },
  {
    label: "Measure & Grow",
    description: "Reporting, optimisation and expansion — always against the named objective.",
  },
];

/**
 * Section 4 — the 4-step engagement timeline. Teal line draws on scroll
 * (GSAP scrub); step 1 carries a soft teal pulse marking "start here".
 * GSAP-only subtree — do not nest Framer Motion components inside.
 */
export default function EngagementSteps() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hBarRef = useRef<HTMLDivElement>(null);
  const vBarRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const setAll = (active: boolean) => {
      stepRefs.current.forEach((el) => el?.setAttribute("data-active", active ? "true" : "false"));
      if (hBarRef.current) hBarRef.current.style.transform = `scaleX(${active ? 1 : 0})`;
      if (vBarRef.current) vBarRef.current.style.transform = `scaleY(${active ? 1 : 0})`;
    };

    if (reduced) {
      setAll(true);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 75%",
        end: "bottom 55%",
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;
          if (hBarRef.current) hBarRef.current.style.transform = `scaleX(${p})`;
          if (vBarRef.current) vBarRef.current.style.transform = `scaleY(${p})`;
          const activeCount = Math.min(STEPS.length, Math.floor(p * STEPS.length + 0.0001));
          for (let i = 0; i < STEPS.length; i++) {
            const v = i < activeCount ? "true" : "false";
            stepRefs.current[i]?.setAttribute("data-active", v);
            stepRefs.current[STEPS.length + i]?.setAttribute("data-active", v);
          }
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const chip = (i: number, size: "lg" | "sm") => (
    <span className="relative inline-flex">
      {i === 0 ? (
        <span
          className="absolute inset-0 rounded-full bg-teal-500/40 motion-safe:animate-ping"
          aria-hidden="true"
        />
      ) : null}
      <span
        className={cn(
          "relative flex items-center justify-center rounded-full border font-mono font-medium transition-colors duration-300",
          size === "lg" ? "h-10 w-10 text-xs" : "h-8 w-8 text-[11px]",
          "border-grey-300 bg-white text-grey-500",
          "group-data-[active=true]:border-teal-500 group-data-[active=true]:bg-teal-500 group-data-[active=true]:text-white",
        )}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
    </span>
  );

  return (
    <div ref={rootRef}>
      {/* Desktop: horizontal */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-grey-300" aria-hidden="true" />
        <div
          ref={hBarRef}
          className="absolute left-0 right-0 top-5 h-0.5 origin-left bg-teal-500"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />
        <ol className="relative grid grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.label}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-active="false"
              className="group px-4 first:pl-0 last:pr-0"
            >
              {chip(i, "lg")}
              <p className="mt-4 text-[16px] font-semibold leading-snug text-grey-500 transition-colors duration-300 group-data-[active=true]:text-navy-800">
                {step.label}
              </p>
              <p className="mt-1.5 text-[13.5px] leading-[1.6] text-grey-500">{step.description}</p>
              {i === 0 ? (
                <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-teal-600">
                  Start here
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: vertical */}
      <div className="relative pl-12 lg:hidden">
        <div className="absolute bottom-2 left-4 top-2 w-0.5 bg-grey-300" aria-hidden="true" />
        <div
          ref={vBarRef}
          className="absolute bottom-2 left-4 top-2 w-0.5 origin-top bg-teal-500"
          style={{ transform: "scaleY(0)" }}
          aria-hidden="true"
        />
        <ol className="space-y-8">
          {STEPS.map((step, i) => (
            <li
              key={step.label}
              ref={(el) => {
                stepRefs.current[STEPS.length + i] = el;
              }}
              data-active="false"
              className="group relative"
            >
              <span className="absolute -left-12 top-0">{chip(i, "sm")}</span>
              <p className="text-[15px] font-semibold text-grey-500 transition-colors duration-300 group-data-[active=true]:text-navy-800">
                {step.label}
                {i === 0 ? (
                  <span className="ml-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-teal-600">
                    Start here
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-[13.5px] leading-[1.6] text-grey-500">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
