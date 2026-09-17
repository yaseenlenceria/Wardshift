import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface JourneyStep {
  label: string;
  description: string;
}

interface JourneyFlowProps {
  steps: JourneyStep[];
  dark?: boolean;
  className?: string;
  /** px start offset of the rail relative to the step row */
}

/**
 * Horizontal step flow (desktop) / vertical timeline (mobile) with a teal
 * progress line that draws as scroll progresses (GSAP ScrollTrigger scrub).
 * Active steps get data-active="true" for styling. GSAP-only subtree — do not
 * nest Framer Motion components inside.
 */
export default function JourneyFlow({ steps, dark = false, className }: JourneyFlowProps) {
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
          const activeCount = Math.min(steps.length, Math.floor(p * steps.length + 0.0001));
          // indices 0..n-1 = desktop row, n..2n-1 = mobile timeline
          for (let i = 0; i < steps.length; i++) {
            const v = i < activeCount ? "true" : "false";
            stepRefs.current[i]?.setAttribute("data-active", v);
            stepRefs.current[steps.length + i]?.setAttribute("data-active", v);
          }
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced, steps.length]);

  return (
    <div ref={rootRef} className={className}>
      {/* Desktop: horizontal rail */}
      <div className="relative hidden lg:block">
        <div
          className={cn("absolute left-0 right-0 top-5 h-0.5", dark ? "bg-white/10" : "bg-grey-300")}
          aria-hidden="true"
        />
        <div
          ref={hBarRef}
          className="absolute left-0 right-0 top-5 h-0.5 origin-left bg-teal-500"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}>
          {steps.map((step, i) => (
            <li
              key={step.label}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-active="false"
              className="group px-3 first:pl-0 last:pr-0"
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs font-medium transition-colors duration-300",
                  dark
                    ? "border-white/15 bg-navy-900 text-navy-100 group-data-[active=true]:border-teal-400 group-data-[active=true]:bg-teal-500 group-data-[active=true]:text-navy-950"
                    : "border-grey-300 bg-white text-grey-500 group-data-[active=true]:border-teal-500 group-data-[active=true]:bg-teal-500 group-data-[active=true]:text-white",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={cn(
                  "mt-4 text-[15px] font-semibold leading-snug transition-colors duration-300",
                  dark
                    ? "text-navy-100/70 group-data-[active=true]:text-white"
                    : "text-grey-500 group-data-[active=true]:text-navy-800",
                )}
              >
                {step.label}
              </p>
              <p
                className={cn(
                  "mt-1.5 text-[13.5px] leading-[1.6] transition-colors duration-300",
                  dark ? "text-navy-100/50" : "text-grey-500",
                )}
              >
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="relative pl-10 lg:hidden">
        <div
          className={cn("absolute bottom-2 left-4 top-2 w-0.5", dark ? "bg-white/10" : "bg-grey-300")}
          aria-hidden="true"
        />
        <div
          ref={vBarRef}
          className="absolute bottom-2 left-4 top-2 w-0.5 origin-top bg-teal-500"
          style={{ transform: "scaleY(0)" }}
          aria-hidden="true"
        />
        <ol className="space-y-8">
          {steps.map((step, i) => (
            <li
              key={step.label}
              ref={(el) => {
                stepRefs.current[steps.length + i] = el;
              }}
              data-active="false"
              className="group relative"
            >
              <span
                className={cn(
                  "absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px] font-medium transition-colors duration-300",
                  dark
                    ? "border-white/15 bg-navy-900 text-navy-100 group-data-[active=true]:border-teal-400 group-data-[active=true]:bg-teal-500 group-data-[active=true]:text-navy-950"
                    : "border-grey-300 bg-white text-grey-500 group-data-[active=true]:border-teal-500 group-data-[active=true]:bg-teal-500 group-data-[active=true]:text-white",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={cn(
                  "text-[15px] font-semibold transition-colors duration-300",
                  dark
                    ? "text-navy-100/70 group-data-[active=true]:text-white"
                    : "text-grey-500 group-data-[active=true]:text-navy-800",
                )}
              >
                {step.label}
              </p>
              <p className={cn("mt-1 text-[13.5px] leading-[1.6]", dark ? "text-navy-100/50" : "text-grey-500")}>
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
