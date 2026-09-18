import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent } from "@/lib/motion";

const AREAS = [
  { name: "Orthopaedics", note: "“knee specialist near me”" },
  { name: "Dermatology", note: "“private dermatologist”" },
  { name: "Cardiology", note: "“private cardiologist”" },
  { name: "Private Surgery", note: "“private surgeon consultation”" },
  { name: "Dentistry", note: "“cosmetic dentist near me”" },
  { name: "Physiotherapy", note: "“sports physio near me”" },
  { name: "ENT", note: "“private ENT consultant”" },
  { name: "Private Clinics", note: "“private clinic appointments”" },
];

/** Section — specialist areas, with the generated clinic interior imagery. */
export default function SpecialistAreas() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_440px]">
          <div>
            <SectionHeading
              eyebrow="Specialist Areas"
              title="Built around private medical practice."
              lede="Not a generalist agency. WardShift works only around how patients find, evaluate and choose private doctors — speciality by speciality."
            />

            <motion.ul
              variants={staggerParent(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid gap-3 sm:grid-cols-2"
            >
              {AREAS.map((area) => (
                <motion.li
                  key={area.name}
                  variants={fadeUp}
                  className="group flex items-center justify-between gap-4 rounded-[10px] border border-grey-300 bg-white px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-card"
                >
                  <span>
                    <span className="block text-[15px] font-semibold text-navy-800">{area.name}</span>
                    <span className="mt-0.5 block font-mono text-[11px] text-grey-500">{area.note}</span>
                  </span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500/70 transition-transform duration-200 group-hover:scale-125" aria-hidden="true" />
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link
                to="/who-we-help/"
                className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600"
              >
                Who we help
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </motion.p>
          </div>

          {/* generated clinic interior */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <img
              src="/img-clinic-interior.webp"
              alt="A calm, premium private clinic reception in soft morning light"
              className="aspect-[7/8] w-full rounded-[10px] object-cover shadow-card"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-md bg-navy-950/70 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              Where the clinical work happens
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
