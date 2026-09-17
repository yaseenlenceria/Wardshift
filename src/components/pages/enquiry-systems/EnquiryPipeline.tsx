import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface PipelineStage {
  label: string;
  donePill: string;
  time: string;
}

const STAGES: PipelineStage[] = [
  { label: "New Enquiry", donePill: "Captured", time: "09:02" },
  { label: "Acknowledged", donePill: "Auto-confirmed", time: "09:02" },
  { label: "Practice Contact", donePill: "Routed", time: "09:14" },
  { label: "Appointment Request", donePill: "Options sent", time: "10:40" },
  { label: "Booked", donePill: "Confirmed", time: "11:05" },
  { label: "Administrative Follow-Up", donePill: "Scheduled", time: "T-24h" },
];

/**
 * Hero visual: code-built vertical enquiry pipeline. A teal "enquiry" dot
 * travels down the rail on a 6s loop; each stage's status pill flips from
 * "Pending" to its completed state as the dot passes. With reduced motion
 * the pipeline renders statically with all stages completed.
 */
export default function EnquiryPipeline() {
  const reduced = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const y = useMotionValue(0);

  // Measure the rail so the dot travels exactly from first to last stage.
  useEffect(() => {
    const measure = () => {
      if (railRef.current) setTravel(railRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(y, "change", (v) => {
    if (travel <= 0) return;
    const segment = travel / STAGES.length;
    const idx = Math.min(STAGES.length, Math.floor(v / segment));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  useEffect(() => {
    if (!reduced && travel > 0) y.set(0);
  }, [travel, reduced, y]);

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="rounded-[10px] border border-grey-300 bg-white p-5 shadow-card sm:p-6">
        {/* header */}
        <div className="flex items-center justify-between border-b border-grey-100 pb-3">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
              Practice enquiries
            </p>
            <p className="mt-1 text-[15px] font-semibold text-navy-800">Enquiry journey</p>
          </div>
          <IllustrativeBadge className="border-grey-300 px-2 py-0.5 text-[9px]" />
        </div>

        {/* pipeline */}
        <div ref={railRef} className="relative mt-5">
          {/* rail */}
          <div
            className="absolute bottom-5 left-[13px] top-5 w-px bg-grey-300"
            aria-hidden="true"
          />
          {/* travelling dot */}
          {!reduced && travel > 0 ? (
            <motion.span
              className="absolute left-[9px] top-5 z-10 h-[9px] w-[9px] rounded-full bg-teal-500 shadow-[0_0_0_4px_rgba(20,184,166,0.15)]"
              style={{ y }}
              animate={{ y: travel - 40 }}
              transition={{ duration: 6, ease: "linear", repeat: Infinity, repeatDelay: 0.8 }}
              aria-hidden="true"
            />
          ) : null}

          <ol className="relative space-y-3">
            {STAGES.map((stage, i) => {
              const reached = reduced || i < activeIndex;
              return (
                <motion.li
                  key={stage.label}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3 pl-0"
                >
                  <span
                    className={cn(
                      "relative z-10 mt-3 h-[27px] w-[27px] shrink-0 rounded-full border bg-white transition-colors duration-300",
                      reached ? "border-teal-500" : "border-grey-300",
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        "absolute inset-[7px] rounded-full transition-colors duration-300",
                        reached ? "bg-teal-500" : "bg-grey-300",
                      )}
                    />
                  </span>
                  <div
                    className={cn(
                      "flex flex-1 items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 transition-colors duration-300",
                      reached ? "border-teal-500/40 bg-teal-100/30" : "border-grey-300 bg-paper",
                    )}
                  >
                    <div>
                      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-grey-500">
                        {String(i + 1).padStart(2, "0")} · {stage.time}
                      </p>
                      <p className="mt-0.5 text-[13.5px] font-semibold leading-snug text-navy-800">
                        {stage.label}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.08em] transition-colors duration-300",
                        reached ? "bg-teal-500 text-navy-950" : "bg-grey-100 text-grey-500",
                      )}
                    >
                      {reached ? stage.donePill : "Pending"}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
