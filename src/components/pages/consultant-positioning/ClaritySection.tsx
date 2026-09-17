import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";

interface Segment {
  text: string;
  highlight?: number; // index into CHIPS when this phrase is highlighted
}

const CHIPS = [
  { label: "Specialty & subspecialty" },
  { label: "Conditions treated" },
  { label: "Procedures performed" },
];

const SEGMENTS: Segment[] = [
  { text: "A consultant with fellowship training in a defined " },
  { text: "specialty and subspecialty", highlight: 0 },
  { text: ", managing a focused range of " },
  { text: "conditions", highlight: 1 },
  { text: " and performing " },
  { text: "specific procedures", highlight: 2 },
  { text: " within a structured, multi-disciplinary practice." },
];

const PRINCIPLES = [
  {
    title: "Clinical accuracy stays with the doctor",
    note: "Every word is verified by you. Nothing publishes without clinical sign-off.",
  },
  {
    title: "Patient language leads the structure",
    note: "The surface reads clearly for patients; the clinical precision sits intact beneath it.",
  },
];

export default function ClaritySection() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(/noise.png)", backgroundSize: "512px 512px" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[880px] px-6 py-20 lg:py-32">
        <SectionHeading
          dark
          align="center"
          eyebrow="Clarity, not simplification"
          title="Precise for Peers. Clear for Patients."
          lede="Positioning never removes clinical precision — it layers patient-facing clarity on top of it. We never oversimplify clinical claims and never claim medical superiority."
        />

        {/* before/after typographic demo */}
        <div className="mt-14 rounded-[10px] border border-white/[0.08] bg-navy-800/60 p-7 sm:p-10">
          {/* extracted chips */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {CHIPS.map((chip, i) => (
              <motion.span
                key={chip.label}
                initial={reduced ? false : { opacity: 0, scale: 0.85, y: 8 }}
                whileInView={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.4 + i * 0.5 }}
                className="rounded-full border border-teal-400/40 bg-teal-400/10 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-teal-400"
              >
                {chip.label}
              </motion.span>
            ))}
          </div>

          <div className="mx-auto my-8 h-px max-w-[120px] bg-white/[0.08]" aria-hidden="true" />

          {/* original paragraph, intact, with sequential highlights */}
          <p className="mx-auto max-w-[62ch] text-center text-[15px] leading-[1.9] text-navy-100/60">
            {SEGMENTS.map((seg, i) => {
              if (seg.highlight === undefined) {
                return <span key={i}>{seg.text}</span>;
              }
              const idx = seg.highlight;
              return (
                <motion.span
                  key={i}
                  className="relative inline"
                  initial={reduced ? false : { color: "rgba(220,230,242,0.6)" }}
                  whileInView={reduced ? undefined : { color: "#2DD4BF" }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.25, delay: 0.4 + idx * 0.5 }}
                >
                  {seg.text}
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] origin-left rounded-full bg-teal-400"
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={reduced ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.25, ease: EASE_OUT, delay: 0.4 + idx * 0.5 }}
                  />
                </motion.span>
              );
            })}
          </p>
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-navy-100/40">
            The original clinical text remains intact beneath the clarity layer
          </p>
        </div>

        {/* two principles */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + i * 0.1 }}
              className="rounded-[10px] border border-white/[0.08] bg-navy-800/60 p-6"
            >
              <p className="text-[16px] font-semibold tracking-[-0.01em] text-white">{p.title}</p>
              <p className="mt-2 text-[14.5px] leading-[1.65] text-navy-100/70">{p.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
