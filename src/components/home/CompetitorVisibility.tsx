import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CRITERIA = [
  "Position in search",
  "Reviews",
  "Profile completeness",
  "Treatment pages",
  "Website experience",
  "Contact clarity",
];

interface Clinic {
  name: string;
  you?: boolean;
  /** 0–3 signal strength per criterion — visibility signals, not clinical quality */
  scores: number[];
}

const CLINICS: Clinic[] = [
  { name: "Clinic A", scores: [3, 3, 2, 3, 2, 3] },
  { name: "Clinic B", scores: [2, 2, 3, 2, 3, 2] },
  { name: "Your Practice", you: true, scores: [1, 2, 1, 2, 1, 2] },
];

function Dots({ score, you, reduced, delay }: { score: number; you?: boolean; reduced: boolean; delay: number }) {
  return (
    <span className="flex gap-1" aria-label={`Signal strength ${score} of 3`}>
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className={cn(
            "h-2 w-2 rounded-full",
            dot < score ? (you ? "bg-teal-500" : "bg-navy-800/70") : "bg-grey-300/70",
          )}
          initial={reduced ? false : { opacity: 0, scale: 0.5 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + dot * 0.06 }}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

/**
 * Section — comparison moment. Patients compare before they contact; this shows
 * three listings side by side on visibility signals only. Urgency without
 * aggression: clinical quality is never questioned.
 */
export default function CompetitorVisibility() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="border-t border-grey-300/60 bg-paper">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="The Comparison Moment"
          title="Patients compare before they contact."
          lede="Before anyone calls, the shortlist is compared side by side. This is what that comparison can look like — visibility signals only, never clinical quality."
        />

        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {CLINICS.map((clinic, c) => (
            <motion.div
              key={clinic.name}
              variants={fadeUp}
              className={cn(
                "rounded-[10px] border bg-white p-6 shadow-card",
                clinic.you ? "border-teal-500/50" : "border-grey-300",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-semibold text-navy-800">{clinic.name}</p>
                {clinic.you && (
                  <span className="rounded-full bg-teal-100 px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.08em] text-teal-600">
                    You
                  </span>
                )}
              </div>
              <ul className="mt-5 space-y-3.5 border-t border-grey-300/60 pt-5">
                {CRITERIA.map((criterion, i) => (
                  <li key={criterion} className="flex items-center justify-between gap-3">
                    <span className="text-[12.5px] font-medium text-grey-700">{criterion}</span>
                    <Dots score={clinic.scores[i]} you={clinic.you} reduced={reduced} delay={0.2 + i * 0.1 + c * 0.05} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500"
        >
          Illustrative comparison — digital signal strength, not clinical quality
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 max-w-[40ch] font-display text-xl font-medium leading-[1.4] text-navy-800 lg:text-2xl"
        >
          Clinical quality and digital visibility are not always the same thing.
        </motion.p>
      </div>
    </section>
  );
}
