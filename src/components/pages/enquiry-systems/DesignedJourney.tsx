import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface JourneyStage {
  title: string;
  happens: string;
  actor: string;
  standard: string;
}

const STAGES: JourneyStage[] = [
  {
    title: "New Enquiry",
    happens: "An enquiry arrives by form, phone note, or message — captured once, with its source.",
    actor: "System",
    standard: "Every enquiry is recorded with source, time and detail — nothing lives only in an inbox.",
  },
  {
    title: "Acknowledged",
    happens: "The enquirer receives an immediate confirmation that sets expectations.",
    actor: "System",
    standard: "Automated administrative acknowledgement within minutes — never clinical content.",
  },
  {
    title: "Practice Contact",
    happens: "The enquiry is routed to the right person on the administrative team.",
    actor: "Practice",
    standard: "Clear ownership and response-time expectations, matched to how the practice runs.",
  },
  {
    title: "Appointment Request",
    happens: "The enquirer is offered clear appointment options with no friction.",
    actor: "Practice",
    standard: "Straightforward options and next steps — no ambiguity about what happens next.",
  },
  {
    title: "Booked",
    happens: "The appointment is confirmed with preparation details.",
    actor: "Practice",
    standard: "Written confirmation plus the practical details a patient needs before attending.",
  },
  {
    title: "Administrative Follow-Up",
    happens: "Reminders, instructions and records are handled automatically.",
    actor: "System",
    standard: "Administrative reminders and a complete outcome record for every enquiry.",
  },
];

/**
 * Section 3 — the six-stage designed enquiry journey. Desktop: GSAP-pinned
 * horizontal scrub; stage cards activate left-to-right as the teal line
 * draws. Mobile: vertical timeline with the same scrub behaviour (no pin).
 * GSAP-only subtree — do not nest Framer Motion components inside.
 */
export default function DesignedJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hBarRef = useRef<HTMLDivElement>(null);
  const vBarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const setAll = (active: boolean) => {
      cardRefs.current.forEach((el) => el?.setAttribute("data-active", active ? "true" : "false"));
      if (hBarRef.current) hBarRef.current.style.transform = `scaleX(${active ? 1 : 0})`;
      if (vBarRef.current) vBarRef.current.style.transform = `scaleY(${active ? 1 : 0})`;
    };

    if (reduced) {
      setAll(true);
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            if (hBarRef.current) hBarRef.current.style.transform = `scaleX(${p})`;
            const activeCount = Math.min(STAGES.length, Math.floor(p * STAGES.length + 0.0001));
            for (let i = 0; i < STAGES.length; i++) {
              cardRefs.current[i]?.setAttribute(
                "data-active",
                i < activeCount ? "true" : "false",
              );
            }
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            if (vBarRef.current) vBarRef.current.style.transform = `scaleY(${p})`;
            const activeCount = Math.min(STAGES.length, Math.floor(p * STAGES.length + 0.0001));
            for (let i = 0; i < STAGES.length; i++) {
              cardRefs.current[STAGES.length + i]?.setAttribute(
                "data-active",
                i < activeCount ? "true" : "false",
              );
            }
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef}>
      {/* Desktop: pinned horizontal journey */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-6 h-0.5 bg-white/10" aria-hidden="true" />
        <div
          ref={hBarRef}
          className="absolute left-0 right-0 top-6 h-0.5 origin-left bg-teal-500"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />
        <ol className="relative grid grid-cols-6 gap-4 pt-0">
          {STAGES.map((stage, i) => (
            <li
              key={stage.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-active="false"
              className="group"
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border font-mono text-xs font-medium transition-colors duration-300",
                  "border-white/15 bg-navy-900 text-navy-100",
                  "group-data-[active=true]:border-teal-400 group-data-[active=true]:bg-teal-500 group-data-[active=true]:text-navy-950",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className={cn(
                  "mt-5 rounded-[10px] border border-white/10 bg-navy-800/60 p-4 transition-all duration-300",
                  "group-data-[active=true]:-translate-y-1 group-data-[active=true]:border-teal-400/50 group-data-[active=true]:bg-navy-700",
                )}
              >
                <p className="text-[15px] font-semibold leading-snug text-navy-100/70 transition-colors duration-300 group-data-[active=true]:text-white">
                  {stage.title}
                </p>
                <p className="mt-2 text-[13px] leading-[1.6] text-navy-100/60">{stage.happens}</p>
                <p className="mt-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-teal-400">
                  Acts: {stage.actor}
                </p>
                <p className="mt-2 border-t border-white/10 pt-2 text-[12px] leading-[1.6] text-navy-100/50">
                  {stage.standard}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="relative pl-12 lg:hidden">
        <div className="absolute bottom-2 left-5 top-2 w-0.5 bg-white/10" aria-hidden="true" />
        <div
          ref={vBarRef}
          className="absolute bottom-2 left-5 top-2 w-0.5 origin-top bg-teal-500"
          style={{ transform: "scaleY(0)" }}
          aria-hidden="true"
        />
        <ol className="space-y-6">
          {STAGES.map((stage, i) => (
            <li
              key={stage.title}
              ref={(el) => {
                cardRefs.current[STAGES.length + i] = el;
              }}
              data-active="false"
              className="group relative"
            >
              <span
                className={cn(
                  "absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[11px] font-medium transition-colors duration-300",
                  "border-white/15 bg-navy-900 text-navy-100",
                  "group-data-[active=true]:border-teal-400 group-data-[active=true]:bg-teal-500 group-data-[active=true]:text-navy-950",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className={cn(
                  "rounded-[10px] border border-white/10 bg-navy-800/60 p-4 transition-colors duration-300",
                  "group-data-[active=true]:border-teal-400/50 group-data-[active=true]:bg-navy-700",
                )}
              >
                <p className="text-[15px] font-semibold text-navy-100/70 transition-colors duration-300 group-data-[active=true]:text-white">
                  {stage.title}
                </p>
                <p className="mt-2 text-[13px] leading-[1.6] text-navy-100/60">{stage.happens}</p>
                <p className="mt-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-teal-400">
                  Acts: {stage.actor}
                </p>
                <p className="mt-2 border-t border-white/10 pt-2 text-[12px] leading-[1.6] text-navy-100/50">
                  {stage.standard}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
