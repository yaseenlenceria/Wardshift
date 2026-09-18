import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent } from "@/lib/motion";

const WORK_AREAS = [
  {
    title: "Presence audit",
    note: "A complete map of everything patients currently find — every result, profile and listing.",
  },
  {
    title: "Profile building & correction",
    note: "Claiming, completing and correcting the profiles that represent you professionally.",
  },
  {
    title: "Information consistency programme",
    note: "One accurate record of locations, contact details and specialty — kept in step everywhere.",
  },
  {
    title: "Website credibility signals",
    note: "The structure, evidence and clarity that make a website worth trusting.",
  },
  {
    title: "Ethical review requests",
    note: "Where appropriate and permitted, patients are invited to share honest feedback — universally, never gated, never selective.",
  },
  {
    title: "Reputation monitoring & alerts",
    note: "Ongoing watch over your presence, so drift and inaccuracy are corrected before patients see them.",
  },
];

export default function TheWork() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "512px 512px" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-site px-6 py-20 lg:py-32">
        <SectionHeading
          dark
          eyebrow="The work"
          title="Accuracy First. Then Strength."
          lede="Reputation work starts by making what exists correct — then builds depth, consistency and credibility on top of it."
        />
        <motion.ul
          variants={staggerParent(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3"
        >
          {WORK_AREAS.map((area) => (
            <motion.li
              key={area.title}
              variants={fadeUp}
              className="group bg-navy-900 p-7 transition-colors duration-200 hover:bg-navy-800"
            >
              <h3 className="text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-white">
                {area.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.65] text-navy-100/70">{area.note}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
