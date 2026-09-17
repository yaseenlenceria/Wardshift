import { useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface FrameworkStage {
  num: string;
  name: string;
  short: string;
}

const FRAMEWORK_STAGES: FrameworkStage[] = [
  { num: "01", name: "FOUND", short: "Patients can't choose a doctor they can't find." },
  { num: "02", name: "UNDERSTOOD", short: "Discovery without comprehension loses the patient." },
  { num: "03", name: "TRUSTED", short: "Patients verify before they contact." },
  { num: "04", name: "CONTACTED", short: "The moment of enquiry must be effortless." },
  { num: "05", name: "MEASURED", short: "What isn't measured can't be improved." },
  { num: "06", name: "GROWN", short: "Systems compound." },
];

/**
 * Hero framework strip: six nodes on the teal ascent line, each expandable.
 * Desktop horizontal / mobile vertical. Dark-section styling.
 */
export default function FrameworkStrip() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative mt-14"
      aria-label="The six stages of the WardShift Growth System"
    >
      {/* connecting line — desktop horizontal */}
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT, delay: 0.2 } },
        }}
        className="absolute left-0 right-0 top-[13px] hidden h-px origin-left bg-teal-400/40 lg:block"
      />
      {/* connecting line — mobile vertical */}
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { scaleY: 0 },
          visible: { scaleY: 1, transition: { duration: 1.1, ease: EASE_OUT, delay: 0.2 } },
        }}
        className="absolute bottom-4 left-[13px] top-[13px] w-px origin-top bg-teal-400/40 lg:hidden"
      />

      <ol className="relative grid gap-3 pl-10 lg:grid-cols-6 lg:gap-4 lg:pl-0">
        {FRAMEWORK_STAGES.map((stage, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={stage.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE_OUT, delay: 0.25 + i * 0.15 },
                },
              }}
              className="relative lg:flex lg:flex-col"
            >
              {/* node dot */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-10 top-1 flex h-[27px] w-[27px] items-center justify-center rounded-full border transition-colors duration-200 lg:static lg:mb-4",
                  isOpen
                    ? "border-teal-400 bg-teal-400/15"
                    : "border-teal-400/40 bg-navy-900",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors duration-200",
                    isOpen ? "bg-teal-400" : "bg-teal-400/40",
                  )}
                />
              </span>

              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={cn(
                  "w-full rounded-[10px] border p-4 text-left transition-all duration-200",
                  isOpen
                    ? "border-teal-400/50 bg-navy-700/70"
                    : "border-white/10 bg-navy-700/40 hover:border-teal-400/30 hover:bg-navy-700/60",
                )}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-teal-400">
                    {stage.num}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-mono text-[13px] text-teal-400 transition-transform duration-200",
                      isOpen && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </span>
                <span className="mt-2 block font-display text-[17px] font-medium tracking-[0.02em] text-white">
                  {stage.name}
                </span>
                <motion.span
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="block overflow-hidden"
                >
                  <span className="block pt-3 text-[13px] leading-[1.6] text-navy-100/75">
                    {stage.short}
                  </span>
                </motion.span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}
