import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NAV = ["About", "Conditions", "Procedures", "Locations", "Contact"];
const CHIPS = ["INTERVENTIONAL CARDIOLOGY", "CHEST PAIN", "ECHOCARDIOGRAPHY"];

export const MOCKUP_LABEL = "Example consultant website concept";

/**
 * Fictional consultant website mockup — code-built browser frame, never a
 * screenshot. Used on the Private Practice Websites hero. Slightly tilted,
 * interior elements pop sequentially after the frame lands.
 */
export default function WebsiteMockup({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const pop = (i: number) => ({
    initial: reduced ? { opacity: 1 } : { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.35, ease: EASE_OUT, delay: reduced ? 0 : 0.65 + i * 0.08 },
  });

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        initial={reduced ? { opacity: 1, rotate: -1 } : { opacity: 0, x: 48, rotate: -3 }}
        animate={{ opacity: 1, x: 0, rotate: -1 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="overflow-hidden rounded-[10px] border border-grey-300 bg-white shadow-card-hover"
        role="img"
        aria-label="Example consultant website concept — fictional specialist website mockup"
      >
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-grey-300/70 bg-grey-100 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-grey-300" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey-300" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey-300" aria-hidden="true" />
          <span className="ml-3 flex-1 rounded-md bg-white px-3 py-1 font-mono text-[10.5px] text-grey-500">
            dr-a-example.example
          </span>
        </div>

        {/* site header */}
        <div className="flex items-center justify-between border-b border-grey-300/50 px-5 py-3.5">
          <div>
            <p className="font-display text-[14.5px] font-semibold text-navy-800">Dr A. Example</p>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-grey-500">
              Consultant Cardiologist
            </p>
          </div>
          <nav className="hidden items-center gap-4 sm:flex" aria-hidden="true">
            {NAV.map((item) => (
              <span
                key={item}
                className={cn(
                  "text-[11px] font-medium",
                  item === "Contact" ? "text-teal-600" : "text-grey-700",
                )}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>

        {/* hero block */}
        <div className="px-5 pb-5 pt-6 sm:px-7">
          <motion.p {...pop(0)} className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-teal-600">
            Consultant Cardiologist
          </motion.p>
          <motion.p
            {...pop(1)}
            className="mt-2 max-w-[38ch] font-display text-[19px] font-medium leading-[1.25] tracking-[-0.01em] text-navy-800 sm:text-[22px]"
          >
            Specialist assessment and treatment of heart conditions, explained clearly.
          </motion.p>

          <div className="mt-4 flex flex-wrap gap-2">
            {CHIPS.map((chip, i) => (
              <motion.span
                key={chip}
                {...pop(2 + i)}
                className="rounded-full border border-grey-300 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-grey-700"
              >
                {chip}
              </motion.span>
            ))}
          </div>

          <motion.p {...pop(5)} className="mt-4 text-[11.5px] leading-[1.6] text-grey-500">
            MBBS (Hons) · FRCP · PhD — Fellow of the national cardiology society
          </motion.p>

          <motion.span
            {...pop(6)}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-teal-500 px-4 py-2.5 text-[12px] font-semibold text-navy-950"
          >
            Request an Appointment
            <span aria-hidden="true">→</span>
          </motion.span>

          {/* below-fold hint: conditions grid */}
          <div className="mt-6 border-t border-grey-300/50 pt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-grey-500">
              Conditions
            </p>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {["Chest pain", "Palpitations", "Breathlessness"].map((c, i) => (
                <motion.div
                  key={c}
                  {...pop(7 + i)}
                  className="rounded-md border border-grey-300/70 bg-paper px-2.5 py-2 text-[10.5px] font-medium text-grey-700"
                >
                  {c}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* label bar */}
      <motion.p
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        initial="hidden"
        animate="visible"
        transition={{ delay: reduced ? 0 : 0.9, duration: 0.4 }}
        className="mt-4 text-center font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-grey-500"
      >
        <span className="text-navy-800">{MOCKUP_LABEL}</span>
        {" — "}fictional specialist, illustrative content.
      </motion.p>
    </div>
  );
}
