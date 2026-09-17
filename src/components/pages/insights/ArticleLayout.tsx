import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import { EASE_OUT, fadeUp } from "@/lib/motion";
import { articleSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import type { ArticleMeta } from "./articles";

/* ------------------------------------------------------------------ */
/* Article body primitives — each reveals as its own block on scroll.  */
/* ------------------------------------------------------------------ */

/** Body paragraph — Inter 18px / 1.75. */
export function P({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn("text-[17px] leading-[1.75] text-grey-700 lg:text-lg", className)}
    >
      {children}
    </motion.p>
  );
}

/** Fraunces subhead with comfortable spacing. */
export function H2({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="pt-6 font-display text-[26px] font-medium leading-[1.2] tracking-[-0.015em] text-navy-800 lg:text-[30px]"
    >
      {children}
    </motion.h2>
  );
}

/** Pull quote — Fraunces italic 24px with a teal left border that draws in. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <motion.blockquote
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="relative py-2 pl-7"
    >
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { scaleY: 0 },
          visible: { scaleY: 1, transition: { duration: 0.6, ease: EASE_OUT } },
        }}
        className="absolute bottom-0 left-0 top-0 w-[3px] origin-top rounded-full bg-teal-600"
      />
      <motion.p
        variants={{
          hidden: { opacity: 0, x: -12 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.15 } },
        }}
        className="font-display text-[22px] font-normal italic leading-[1.45] text-navy-800 lg:text-2xl"
      >
        {children}
      </motion.p>
    </motion.blockquote>
  );
}

/** Hairline divider between article movements. */
export function Divider() {
  return (
    <motion.hr
      variants={{
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className="origin-left border-0 border-t border-grey-300"
    />
  );
}

/** The single contextual internal link that closes each article body. */
export function ClosingLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.aside
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="rounded-[10px] border border-grey-300 bg-white p-6"
    >
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-teal-600">
        {label}
      </p>
      <p className="mt-3 text-[15px] leading-[1.65] text-grey-700">{children}</p>
      <Link
        to={href}
        className="group mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-teal-600 transition-colors duration-150 hover:text-navy-800"
      >
        Explore {label.toLowerCase()}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </motion.aside>
  );
}

/* ------------------------------------------------------------------ */
/* Article layout                                                      */
/* ------------------------------------------------------------------ */

interface ArticleLayoutProps {
  meta: ArticleMeta;
  /** Exactly two related articles for the footer block. */
  related: ArticleMeta[];
  children: ReactNode;
  /** Optional code-built figure rendered after the header block. */
  figure?: ReactNode;
}

/**
 * Shared Insights article template: breadcrumb → header block → 720px prose
 * column → footer block with CTA, related articles and All Insights link.
 */
export default function ArticleLayout({ meta, related, children, figure }: ArticleLayoutProps) {
  return (
    <div className="bg-paper">
      <Seo
        title={`${meta.title} | WardShift`}
        description={meta.standfirst}
        path={meta.path}
        schema={articleSchema(meta)}
        type="article"
        publishedTime={meta.datePublished}
        modifiedTime={meta.dateModified}
      />

      <article className="mx-auto max-w-[720px] px-6 pb-24 pt-[72px] lg:pt-24">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights/" },
            { label: meta.title },
          ]}
        />

        {/* Header block */}
        <header className="mt-12">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-teal-600"
          >
            {meta.category} · By WardShift ·{" "}
            <time dateTime={meta.datePublished}>
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(`${meta.datePublished}T00:00:00Z`))}
            </time>{" "}
            · {meta.readTime}
          </motion.p>
          <WordReveal
            text={meta.title}
            as="h1"
            wordDelay={0.045}
            className="mt-4 text-[34px] font-medium leading-[1.12] tracking-[-0.02em] text-navy-800 lg:text-[44px]"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mt-5 text-[18px] leading-[1.65] text-grey-500 lg:text-xl"
          >
            {meta.standfirst}
          </motion.p>
          <motion.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.4 }}
            className="mt-10 origin-left border-0 border-t border-grey-300"
          />
        </header>

        {figure ? <div className="mt-10">{figure}</div> : null}

        {/* Body */}
        <div className="mt-10 space-y-7">{children}</div>

        {/* Footer block */}
        <motion.footer
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 border-t border-grey-300 pt-10"
        >
          <p className="font-display text-xl font-medium leading-[1.4] text-navy-800">
            WardShift works on the growth side of private practice.
          </p>
          <div className="mt-6">
            <Link
              to="/growth-review/"
              className="group inline-flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
            >
              Book a Growth Review
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="mt-12">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-500">
              Related articles
            </p>
            <ul className="mt-4 divide-y divide-grey-300 border-y border-grey-300">
              {related.map((r) => (
                <li key={r.path}>
                  <Link
                    to={r.path}
                    className="group flex items-center justify-between gap-6 py-4 transition-colors duration-150"
                  >
                    <span className="font-display text-[18px] font-medium leading-[1.35] text-navy-800 transition-colors duration-150 group-hover:text-teal-600">
                      {r.title}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-teal-600 transition-transform duration-150 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/insights/"
              className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-teal-600 transition-colors duration-150 hover:text-navy-800"
            >
              All Insights
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.footer>
      </article>
    </div>
  );
}
