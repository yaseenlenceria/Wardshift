import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { CircleSlash, Gauge, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import {
  IconBrowser,
  IconChart,
  IconDocument,
  IconLayers,
  IconMapPin,
  IconSearchLens,
} from "@/components/icons";
import { fadeUp, staggerParent } from "@/lib/motion";

interface Tile {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const TILES: Tile[] = [
  { title: "Search intent mapping", icon: IconSearchLens },
  { title: "Keyword architecture", icon: IconLayers },
  { title: "Negative keywords", icon: CircleSlash },
  { title: "Specialist landing pages", icon: IconBrowser },
  { title: "Geographic targeting", icon: IconMapPin },
  { title: "Call tracking", icon: Phone },
  { title: "Form tracking", icon: IconDocument },
  { title: "Conversion measurement", icon: IconChart },
  { title: "Budget management & optimization", icon: Gauge },
];

export default function CampaignBuild() {
  return (
    <section id="campaign-build" className="bg-white">
      <div className="mx-auto max-w-site px-6 py-20 lg:py-32">
        <SectionHeading
          eyebrow="Campaign structure"
          title="Discipline Over Spend."
          lede="The difference between an expensive campaign and an effective one is structure. Every campaign is assembled from nine components — each one in place to protect budget and route the right searches to the right pages."
        />
        <motion.ul
          variants={staggerParent(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TILES.map((tile) => (
            <motion.li
              key={tile.title}
              variants={fadeUp}
              className="group flex items-center gap-4 rounded-[10px] border border-grey-300 bg-white p-5 transition-colors duration-200 hover:border-teal-500/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-paper text-navy-800 transition-colors duration-200 group-hover:bg-teal-100/70 group-hover:text-teal-600">
                <tile.icon width={20} height={20} />
              </span>
              <span className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-navy-800">
                {tile.title}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
