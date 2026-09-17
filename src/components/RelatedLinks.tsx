import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerParent } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface RelatedLinkItem {
  category: string;
  title: string;
  href: string;
}

interface RelatedLinksProps {
  items: RelatedLinkItem[];
  className?: string;
}

/** "Continue exploring" — 3 cards above the CTA band on content pages. */
export default function RelatedLinks({ items, className }: RelatedLinksProps) {
  return (
    <section className={cn("mx-auto max-w-site px-6 pb-24", className)}>
      <div className="border-t border-grey-300 pt-14">
        <p className="eyebrow text-teal-600">Continue exploring</p>
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-8 grid gap-5 md:grid-cols-3"
        >
          {items.map((item) => (
            <motion.div key={item.href} variants={fadeUp}>
              <Link
                to={item.href}
                className="group flex h-full flex-col justify-between rounded-[10px] border border-grey-300 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover"
              >
                <div>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-teal-600">
                    {item.category}
                  </p>
                  <h3 className="mt-3 font-sans text-lg font-semibold leading-[1.35] tracking-[-0.01em] text-navy-800">
                    {item.title}
                  </h3>
                </div>
                <ArrowRight
                  className="mt-6 h-4 w-4 text-teal-600 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
