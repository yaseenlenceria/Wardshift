import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Cluster {
  name: string;
  essence: string;
  services: { label: string; href: string }[];
}

const CLUSTERS: Cluster[] = [
  {
    name: "Visibility",
    essence: "Be there when the right patients search.",
    services: [
      { label: "Search Visibility", href: "/search-visibility/" },
      { label: "Google Business Profile presence", href: "/search-visibility/" },
      { label: "Treatment visibility", href: "/search-visibility/" },
    ],
  },
  {
    name: "Trust",
    essence: "Make your offline reputation visible online.",
    services: [
      { label: "Digital Reputation", href: "/digital-reputation/" },
      { label: "Consultant Positioning", href: "/consultant-positioning/" },
    ],
  },
  {
    name: "Conversion",
    essence: "Turn interest into a clear next step.",
    services: [
      { label: "Private Practice Websites", href: "/private-practice-websites/" },
      { label: "Practice Enquiry Systems", href: "/practice-enquiry-systems/" },
    ],
  },
  {
    name: "Measurement",
    essence: "Know what every enquiry came from.",
    services: [
      { label: "CRM & Follow-Up", href: "/crm-follow-up/" },
      { label: "Call & form tracking", href: "/crm-follow-up/" },
    ],
  },
  {
    name: "Infrastructure & Growth",
    essence: "The engine and the plan behind it all.",
    services: [
      { label: "Google Ads", href: "/google-ads/" },
      { label: "Patient Acquisition", href: "/patient-acquisition/" },
      { label: "Growth Strategy", href: "/practice-growth-strategy/" },
    ],
  },
];

/** Section — services reorganised into five clusters around the clinical work. */
export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading
          eyebrow="Everything Around the Clinical Work"
          title="You focus on the clinical work. We work on what happens around it."
          lede="Nine connected services, organised around five jobs: being found, being trusted, being contacted, being measured — and growing on the evidence."
        />

        <motion.div
          variants={staggerParent(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6"
        >
          {CLUSTERS.map((cluster, i) => (
            <motion.div
              key={cluster.name}
              variants={fadeUp}
              className={cn(
                "group rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover",
                i < 3 ? "lg:col-span-2" : "lg:col-span-3",
              )}
            >
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-600">
                {String(i + 1).padStart(2, "0")} · {cluster.name}
              </p>
              <p className="mt-3 text-[15px] font-medium leading-[1.5] text-navy-800">
                {cluster.essence}
              </p>
              <ul className="mt-5 space-y-1 border-t border-grey-300/60 pt-4">
                {cluster.services.map((service) => (
                  <li key={service.label}>
                    <Link
                      to={service.href}
                      className="group/link flex items-center justify-between gap-3 rounded-md px-2 py-2 text-[14px] font-medium text-grey-700 transition-colors duration-150 hover:bg-grey-100 hover:text-teal-600"
                    >
                      {service.label}
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 text-grey-300 transition-all duration-150 group-hover/link:translate-x-0.5 group-hover/link:text-teal-500"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10"
        >
          <Link
            to="/how-we-help/"
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600"
          >
            How we help — overview
            <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
