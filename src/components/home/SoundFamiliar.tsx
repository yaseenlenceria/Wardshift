import { motion } from "framer-motion";
import { fadeUp, staggerParent } from "@/lib/motion";

const QUESTIONS = [
  "Why are other clinics appearing above me on Google?",
  "Why am I not getting enough private patients?",
  "Is my website actually bringing me patients?",
  "Are my Google reviews helping me?",
  "Where are my enquiries coming from?",
  "Am I wasting money on marketing?",
];

/**
 * Section 1.5 — Sound familiar? The questions doctors actually ask, as
 * scannable quote cards, ending in the clinical-vs-growth pivot.
 */
export default function SoundFamiliar() {
  return (
    <section className="border-t border-grey-300/60 bg-paper">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-24">
        <motion.div
          variants={staggerParent(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p variants={fadeUp} className="eyebrow text-teal-600">
            Sound familiar?
          </motion.p>

          <motion.ul
            variants={staggerParent(0.07)}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Questions doctors ask us"
          >
            {QUESTIONS.map((question) => (
              <motion.li
                key={question}
                variants={fadeUp}
                className="rounded-[10px] border border-grey-300 bg-white p-5 shadow-card"
              >
                <span
                  className="font-display text-[26px] leading-none text-teal-500"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="mt-1 font-display text-[17px] font-medium italic leading-[1.45] text-navy-800">
                  {question}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-[46ch] font-display text-[22px] font-medium leading-[1.4] text-navy-800 lg:text-[26px]"
          >
            If any of these sound familiar, the issue usually isn&rsquo;t clinical — it&rsquo;s the
            growth side.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-mono text-[11px] font-medium uppercase leading-[1.8] tracking-[0.14em] text-grey-500"
          >
            For specialists, surgeons, dentists, dermatologists, physiotherapists and private
            clinics — anyone whose patients search before they call
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
