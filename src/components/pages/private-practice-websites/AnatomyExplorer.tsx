import { useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * "Anatomy of the Page" — interactive annotated mockup of the fictional
 * consultant website (simplified). Hovering or focusing an annotation
 * highlights the matching region (teal outline, rest dimmed).
 * Dark-section component (navy-900).
 */

interface Annotation {
  id: string;
  title: string;
  body: string;
}

const ANNOTATIONS: Annotation[] = [
  {
    id: "positioning",
    title: "Positioning line",
    body: "One sentence that tells the right patient they are in the right place — specialty, focus and intent.",
  },
  {
    id: "structure",
    title: "Specialty & conditions structure",
    body: "Conditions and procedures organised the way patients search for them, not the way a CV lists them.",
  },
  {
    id: "credentials",
    title: "Credentials & affiliations",
    body: "Qualifications, fellowships and hospital affiliations placed where researching patients expect them.",
  },
  {
    id: "locations",
    title: "Locations",
    body: "Where the doctor practises, clearly stated — supporting both patient decisions and local search.",
  },
  {
    id: "contact",
    title: "Contact journey",
    body: "A visible, unambiguous next step: request an appointment, call, or send an enquiry.",
  },
  {
    id: "tracking",
    title: "Tracking",
    body: "The invisible layer: analytics and enquiry-source tracking that make the website measurable.",
  },
];

function Region({
  id,
  active,
  onActivate,
  className,
  children,
  dashed = false,
}: {
  id: string;
  active: string | null;
  onActivate: (id: string | null) => void;
  className?: string;
  children: ReactNode;
  dashed?: boolean;
}) {
  const isActive = active === id;
  const dimmed = active !== null && !isActive;
  return (
    <button
      type="button"
      onMouseEnter={() => onActivate(id)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(id)}
      onBlur={() => onActivate(null)}
      onClick={() => onActivate(isActive ? null : id)}
      aria-pressed={isActive}
      className={cn(
        "block w-full rounded-md border text-left transition-all duration-200",
        dashed ? "border-dashed" : "border-solid",
        isActive
          ? "border-teal-400 shadow-[0_0_0_1px_#2DD4BF]"
          : "border-white/10 hover:border-white/25",
        dimmed && "opacity-35",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default function AnatomyExplorer() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const t = reduced ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
      {/* Simplified annotated mockup */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={t}
        className="overflow-hidden rounded-[10px] border border-white/10 bg-navy-800"
        role="img"
        aria-label="Simplified example consultant website with six annotated regions"
      >
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden="true" />
          <span className="ml-3 flex-1 rounded bg-white/5 px-3 py-1 font-mono text-[10px] text-navy-100/50">
            dr-a-example.example
          </span>
        </div>

        <div className="space-y-2.5 p-4 sm:p-5">
          <Region id="positioning" active={active} onActivate={setActive} className="px-4 py-3.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-400">
              01 · Positioning line
            </p>
            <p className="mt-1.5 font-display text-[15px] font-medium leading-snug text-white">
              Specialist assessment and treatment of heart conditions, explained clearly.
            </p>
          </Region>

          <Region id="structure" active={active} onActivate={setActive} className="px-4 py-3.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-400">
              02 · Specialty &amp; conditions structure
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Chest pain", "Palpitations", "Echocardiography"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-medium text-navy-100/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </Region>

          <Region id="credentials" active={active} onActivate={setActive} className="px-4 py-3.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-400">
              03 · Credentials &amp; affiliations
            </p>
            <p className="mt-1.5 text-[11.5px] text-navy-100/70">
              MBBS (Hons) · FRCP · PhD — hospital affiliations listed
            </p>
          </Region>

          <Region id="locations" active={active} onActivate={setActive} className="px-4 py-3.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-400">
              04 · Locations
            </p>
            <div className="mt-1.5 flex gap-2">
              {["Clinic A", "Clinic B"].map((l) => (
                <span
                  key={l}
                  className="rounded border border-white/15 px-2 py-0.5 text-[10px] font-medium text-navy-100/80"
                >
                  {l}
                </span>
              ))}
            </div>
          </Region>

          <Region id="contact" active={active} onActivate={setActive} className="px-4 py-3.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-400">
              05 · Contact journey
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-teal-500 px-3 py-1.5 text-[11px] font-semibold text-navy-950">
              Request an Appointment <span aria-hidden="true">→</span>
            </span>
          </Region>

          <Region id="tracking" active={active} onActivate={setActive} dashed className="px-4 py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-navy-100/50">
              06 · Tracking — analytics + enquiry source (invisible layer)
            </p>
          </Region>
        </div>
      </motion.div>

      {/* Annotation list */}
      <ol className="space-y-1">
        {ANNOTATIONS.map((a, i) => {
          const isActive = active === a.id;
          return (
            <motion.li
              key={a.id}
              initial={reduced ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...(reduced ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT }), delay: reduced ? 0 : i * 0.06 }}
            >
              <button
                type="button"
                onMouseEnter={() => setActive(a.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(a.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(isActive ? null : a.id)}
                aria-pressed={isActive}
                className={cn(
                  "flex w-full items-start gap-4 rounded-lg border px-4 py-4 text-left transition-all duration-200",
                  isActive
                    ? "border-teal-400/60 bg-white/5"
                    : "border-transparent hover:border-white/15 hover:bg-white/[0.03]",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-medium transition-colors duration-200",
                    isActive
                      ? "border-teal-400 bg-teal-500 text-navy-950"
                      : "border-white/20 text-navy-100/70",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[15.5px] font-semibold leading-snug text-white">
                    {a.title}
                  </span>
                  <span className="mt-1 block text-[13.5px] leading-[1.6] text-navy-100/60">
                    {a.body}
                  </span>
                </span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
