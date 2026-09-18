import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent } from "@/lib/motion";

const ARTICLES = [
  {
    title: "Why a Doctor's Website Is Not a Digital CV",
    category: "Websites",
    excerpt:
      "A list of credentials is not a patient journey. What a specialist website needs to do instead.",
    readTime: "6 min read",
  },
  {
    title: "The Referral Validation Search",
    category: "Search",
    excerpt:
      "Even referred patients look you up before they call. What that search needs to confirm.",
    readTime: "5 min read",
  },
  {
    title: "What to Build Before Your First Private Patient",
    category: "New Consultants",
    excerpt:
      "The digital foundations worth putting in place before private practice begins.",
    readTime: "7 min read",
  },
];

/** Section 9 — Insights preview (image-free navy article cards + editorial visual). */
export default function InsightsPreview() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Insights" title="Thinking on the Business of Private Practice." />
          <Link
            to="/insights/"
            className="group mb-1 inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600"
          >
            All Insights
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-12 overflow-hidden rounded-[10px] shadow-card"
        >
          <img
            src="/img-consultant-desk.webp"
            alt="A consultant's desk with a laptop showing rising analytics, coffee and a notebook"
            className="h-52 w-full object-cover object-center sm:h-64"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-md bg-navy-950/70 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            Where the growth side gets measured
          </figcaption>
        </motion.figure>

        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-5 md:grid-cols-3"
        >
          {ARTICLES.map((article) => (
            <motion.div key={article.title} variants={fadeUp} className="h-full">
              <Link
                to="/insights/"
                className="group flex h-full flex-col rounded-[10px] border border-navy-700 bg-navy-800 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-card-hover"
              >
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-teal-400">
                  {article.category}
                </p>
                <h3 className="mt-4 font-display text-[22px] font-medium leading-[1.25] text-white transition-colors duration-200 group-hover:text-teal-100">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-navy-100/70">
                  {article.excerpt}
                </p>
                <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-navy-100/50">
                  {article.readTime}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
