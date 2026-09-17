import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  /** Breadcrumb current label, e.g. "Privacy". */
  crumb: string;
  /** H1, e.g. "Privacy Policy". */
  heading: string;
  /** Mono meta lines under the H1, e.g. last-updated + scope. */
  metaLines: string[];
  sections: LegalSection[];
}

/**
 * Shared legal-page layout (Privacy / Terms): paper bg, 720px prose column,
 * sticky scroll-spy TOC in the right rail on xl+, restrained reveals.
 * The CTA band is intentionally omitted on legal pages.
 */
export default function LegalPage({ crumb, heading, metaLines, sections }: LegalPageProps) {
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 pb-[72px] pt-10 lg:pb-32 lg:pt-14">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: crumb }]} />

        <div className="mt-10 max-w-[720px] lg:mt-14">
          <p className="eyebrow text-teal-600">Legal</p>
          <h1 className="mt-4 text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]">
            {heading}
          </h1>
          <div className="mt-6 space-y-1 font-mono text-[12px] tracking-[0.04em] text-grey-500">
            {metaLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-16 xl:grid-cols-[720px_1fr] xl:gap-24">
          {/* Prose column */}
          <div>
            {sections.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className={cn("scroll-mt-28", i > 0 && "mt-12 border-t border-grey-300 pt-12")}
              >
                <h2 className="font-display text-[26px] font-medium leading-[1.25] tracking-[-0.01em] text-navy-800">
                  {section.title}
                </h2>
                <div className="mt-5 max-w-[68ch] space-y-4 text-[16px] leading-[1.75] text-grey-700 [&_a]:font-medium [&_a]:text-teal-600 [&_a]:underline-offset-4 hover:[&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                  {section.body}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Sticky scroll-spy TOC (desktop xl+) */}
          <aside className="hidden xl:block" aria-label="Table of contents">
            <nav className="sticky top-28 border-l border-grey-300">
              <p className="mb-4 pl-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
                On this page
              </p>
              <ul className="space-y-1">
                {sections.map((section) => {
                  const active = section.id === activeId;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={active ? "true" : undefined}
                        className={cn(
                          "-ml-px block border-l-2 py-1.5 pl-4 font-mono text-[12px] tracking-[0.02em] transition-colors duration-150",
                          active
                            ? "border-teal-500 text-teal-600"
                            : "border-transparent text-grey-500 hover:text-navy-800",
                        )}
                      >
                        {section.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </section>
  );
}
