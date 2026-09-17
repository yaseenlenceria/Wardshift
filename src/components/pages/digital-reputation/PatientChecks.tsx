import { useEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import {
  IconBrowser,
  IconChatLoop,
  IconDocument,
  IconLayers,
  IconMapPin,
  IconSearchLens,
} from "@/components/icons";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

interface Checkpoint {
  title: string;
  note: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const CHECKPOINTS: Checkpoint[] = [
  {
    title: "Search results for your name",
    note: "The first page a patient reads before they ever meet you.",
    icon: IconSearchLens,
  },
  {
    title: "Professional profiles & directories",
    note: "Listings that describe your specialty — complete and correct.",
    icon: IconDocument,
  },
  {
    title: "Information accuracy",
    note: "Locations, phone, specialty — right in every place they appear.",
    icon: IconMapPin,
  },
  {
    title: "Website credibility",
    note: "The structure and signals that tell patients they can trust what they read.",
    icon: IconBrowser,
  },
  {
    title: "Reviews where appropriate",
    note: "Honest feedback, invited ethically — universally, never selectively.",
    icon: IconChatLoop,
  },
  {
    title: "Profile consistency across sources",
    note: "One coherent, accurate story everywhere a patient might look.",
    icon: IconLayers,
  },
];

function CheckCard({ checkpoint }: { checkpoint: Checkpoint }) {
  return (
    <div className="flex h-full flex-col rounded-[10px] border border-grey-300 bg-white p-6 shadow-card">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100/70 text-teal-600">
        <checkpoint.icon width={20} height={20} />
      </span>
      <h3 className="mt-4 text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
        {checkpoint.title}
      </h3>
      <p className="mt-2 text-[14.5px] leading-[1.6] text-grey-700">{checkpoint.note}</p>
    </div>
  );
}

const EDGE_FADE =
  "linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)";

/** Desktop: drag row with snap; mobile: stacked cards. */
export default function PatientChecks() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const row = rowRef.current;
      if (!container || !row) return;
      setDragLimit(Math.max(0, row.scrollWidth - container.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="patient-checks" className="bg-white">
      <div className="mx-auto max-w-site px-6 py-20 lg:py-32">
        <SectionHeading
          eyebrow="What patients check"
          title="What Patients Actually Check."
          lede="Before booking, patients quietly verify. These are the six checkpoints a reputation is measured against."
        />
      </div>

      {/* mobile: stacked */}
      <motion.ul
        variants={staggerParent(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-site gap-5 px-6 pb-20 md:hidden"
      >
        {CHECKPOINTS.map((c) => (
          <motion.li key={c.title} variants={fadeUp}>
            <CheckCard checkpoint={c} />
          </motion.li>
        ))}
      </motion.ul>

      {/* desktop: drag row with edge fades */}
      <div
        ref={containerRef}
        className="relative hidden overflow-hidden pb-20 md:block lg:pb-24"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        <motion.div
          ref={rowRef}
          drag={reduced ? false : "x"}
          dragConstraints={{ left: -dragLimit, right: 0 }}
          dragElastic={0.06}
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex w-max cursor-grab gap-5 px-10 active:cursor-grabbing"
        >
          {CHECKPOINTS.map((c) => (
            <motion.div key={c.title} variants={fadeUp} className="w-[320px] shrink-0 snap-start">
              <CheckCard checkpoint={c} />
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-grey-500">
          Drag to explore
        </p>
      </div>
    </section>
  );
}
