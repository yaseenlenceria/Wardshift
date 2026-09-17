import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import {
  IconBrowser,
  IconCompass,
  IconDocument,
  IconLayers,
  IconMapPin,
  IconSearchLens,
  IconShield,
  IconTarget,
} from "@/components/icons";
import { fadeUp, staggerParent } from "@/lib/motion";

interface CoverTile {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const TILES: CoverTile[] = [
  { title: "Specialty", icon: IconCompass },
  { title: "Subspecialty", icon: IconTarget },
  { title: "Clinical interests", icon: IconSearchLens },
  { title: "Conditions treated", icon: IconDocument },
  { title: "Procedures performed", icon: IconLayers },
  { title: "Hospital affiliations", icon: IconShield },
  { title: "Practice locations", icon: IconMapPin },
  { title: "Professional biography", icon: IconBrowser },
];

export default function PositioningCovers() {
  return (
    <section id="positioning-covers" className="bg-white">
      <div className="mx-auto max-w-site px-6 py-20 lg:py-32">
        <SectionHeading
          eyebrow="Scope"
          title="Eight Things a Patient Should Never Have to Guess."
          lede="Positioning covers the complete picture of a consultant's practice — each element stated plainly and structured precisely."
        />
        <motion.ul
          variants={staggerParent(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TILES.map((tile) => (
            <motion.li
              key={tile.title}
              variants={fadeUp}
              className="group rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-paper text-navy-800 transition-colors duration-200 group-hover:bg-teal-100/70 group-hover:text-teal-600">
                <tile.icon width={20} height={20} />
              </span>
              <h3 className="mt-4 text-[16px] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
                {tile.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.55] text-grey-500">
                Stated plainly, structured precisely.
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
