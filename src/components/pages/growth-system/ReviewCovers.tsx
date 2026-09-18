import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { IconTick } from "@/components/icons";
import { fadeUp, staggerParent } from "@/lib/motion";

const AREAS = [
  {
    title: "Visibility",
    text: "How the practice appears across the six search types — and where it doesn't appear at all.",
  },
  {
    title: "Positioning",
    text: "How clearly the expertise reads to a patient who has never heard the doctor's name.",
  },
  {
    title: "Website",
    text: "Structure, clarity and the contact journey — whether the site answers or merely documents.",
  },
  {
    title: "Enquiry handling",
    text: "What happens after contact: the phone, the forms, the follow-up, the experience.",
  },
  {
    title: "Measurement",
    text: "What is tracked, what is missing, and whether decisions are being made on evidence.",
  },
];

/** Section 4 — What a Growth Review covers (dark). */
export default function ReviewCovers() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "512px 512px" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          dark
          eyebrow="The starting point"
          title="What a Growth Review covers."
          lede="A Growth Review is a structured assessment of the practice across the stages that decide its growth. No obligation, no package attached."
        />

        <motion.ul
          variants={staggerParent(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {AREAS.map((area) => (
            <motion.li
              key={area.title}
              variants={fadeUp}
              className="rounded-[10px] border border-white/10 bg-navy-700/50 p-5 transition-colors duration-200 hover:border-teal-400/40"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-400/40 bg-teal-400/10">
                <IconTick className="h-4 w-4 text-teal-400" />
              </span>
              <h3 className="mt-4 font-sans text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-white">
                {area.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.65] text-navy-100/70">{area.text}</p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-12 flex flex-col items-start gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <motion.p variants={fadeUp} className="max-w-[52ch] text-[15px] leading-[1.7] text-navy-100/80">
            You receive a clear written picture of where the practice stands — whatever you
            decide next.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/growth-review/"
              className="group inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-navy-950 transition-colors duration-150 hover:bg-teal-400"
            >
              Book a Growth Review
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
