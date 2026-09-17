import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { IconChart, IconLayers, IconShield } from "@/components/icons";
import { fadeUp, staggerParent } from "@/lib/motion";

const PRINCIPLES = [
  {
    icon: IconLayers,
    title: "Systems over campaigns",
    text: "A campaign ends; a system compounds. We build connected foundations that keep working after any single effort stops.",
  },
  {
    icon: IconChart,
    title: "Measurement over hype",
    text: "Decisions are made on evidence the practice can see — not on promises, projections or vanity metrics.",
  },
  {
    icon: IconShield,
    title: "Ethics over shortcuts",
    text: "Private healthcare carries obligations. We never manufacture urgency, fabricate proof, or trade a doctor's credibility for clicks.",
  },
];

/** Section 5 — Principles (3 columns). */
export default function Principles() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="Principles"
          title="How the work is done."
          lede="The Growth System is a method, but it runs on three commitments that shape every engagement."
        />

        <motion.ul
          variants={staggerParent(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {PRINCIPLES.map((p) => (
            <motion.li
              key={p.title}
              variants={fadeUp}
              className="rounded-[10px] border border-grey-300 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-teal-100">
                <p.icon className="h-[22px] w-[22px] text-teal-600" />
              </span>
              <h3 className="mt-5 text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.65] text-grey-700">{p.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
