import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import { EASE_OUT, fadeUp, staggerParent } from "@/lib/motion";
import { ARTICLES } from "@/components/pages/insights/articles";

const [featured, ...indexArticles] = ARTICLES;

/** Section 1 — editorial masthead hero. */
function Masthead() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 pt-[72px] lg:pt-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="eyebrow text-teal-600"
            >
              Insights
            </motion.p>
            <WordReveal
              text="The Business of Private Practice."
              as="h1"
              wordDelay={0.045}
              className="mt-5 text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-navy-800 lg:text-[64px]"
            />
          </div>

          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="max-w-[46ch] self-end border-l-2 border-teal-600/40 pl-5 lg:pb-2"
          >
            <p className="text-[15px] leading-[1.7] text-grey-500">
              WardShift Insights is an ongoing resource for private doctors and consultants —
              considered writing on visibility, positioning, enquiries and measurement. New
              pieces are added as the series grows; we publish when there is something worth
              saying.
            </p>
          </motion.aside>
        </div>

        {/* hairline rule draw */}
        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.5 }}
          className="mt-12 origin-left border-0 border-t border-grey-300"
        />

        {/* mono dateline strip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-grey-500"
        >
          WardShift Insights · Ongoing series · Private practice growth
        </motion.p>
      </div>
    </section>
  );
}

/** Section 2 — featured essay card (navy, texture grid). */
function FeaturedEssay() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <Link
            to={featured.path}
            className="group relative block overflow-hidden rounded-[10px] bg-navy-900 p-8 transition-shadow duration-200 hover:shadow-card-hover lg:p-14"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-400">
                  Essay
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-navy-100/50">
                  Featured
                </span>
              </div>
              <h2 className="mt-6 max-w-[20ch] font-display text-[28px] font-medium leading-[1.15] tracking-[-0.015em] text-white transition-colors duration-200 group-hover:text-teal-400 lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.7] text-navy-100/75 lg:text-[17px]">
                {featured.standfirst}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="flex gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-navy-100/70"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-navy-100/50">
                  {featured.readTime}
                </span>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-teal-400">
                Read
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/** Section 3 — editorial list index of the remaining articles. */
function ArticleIndex() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 pb-20 lg:pb-24">
        <p className="eyebrow text-teal-600">The series so far</p>
        <motion.ol
          variants={staggerParent(0.06, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 border-t border-grey-300"
        >
          {indexArticles.map((article, i) => (
            <motion.li key={article.path} variants={fadeUp} className="border-b border-grey-300">
              <Link
                to={article.path}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 py-6 transition-colors duration-200 hover:bg-white sm:gap-x-8 lg:py-7"
              >
                <span className="font-mono text-[13px] font-medium tracking-[0.14em] text-grey-500 transition-colors duration-200 group-hover:text-teal-600">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <span>
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <span className="rounded-full border border-grey-300 px-2.5 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-grey-500">
                      {article.category}
                    </span>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-grey-500 sm:hidden">
                      {article.readTime}
                    </span>
                  </span>
                  <span className="mt-2.5 block font-display text-[21px] font-medium leading-[1.25] tracking-[-0.01em] text-navy-800 transition-colors duration-200 group-hover:text-teal-600 lg:text-2xl">
                    {article.title}
                  </span>
                  <span className="mt-1.5 block max-w-[62ch] text-[14.5px] leading-[1.6] text-grey-500">
                    {article.standfirst}
                  </span>
                </span>
                <span className="hidden items-center gap-6 sm:flex">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-grey-500">
                    {article.readTime}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-teal-600 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/** Section 4 — series note + quiet CTA row. */
function SeriesNote() {
  return (
    <section className="border-t border-grey-300 bg-white">
      <motion.div
        variants={staggerParent(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-[680px] px-6 py-[72px] text-center lg:py-24"
      >
        <motion.p variants={fadeUp} className="eyebrow text-teal-600">
          An ongoing series
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-5 font-display text-[24px] font-medium leading-[1.35] tracking-[-0.01em] text-navy-800 lg:text-[28px]"
        >
          Insights grows with WardShift's client work — no content-calendar filler, published
          when there is something worth saying.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8"
        >
          <Link
            to="/growth-review/"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-teal-600 transition-colors duration-150 hover:text-navy-800"
          >
            Book a Growth Review
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            to="/growth-system/"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-teal-600 transition-colors duration-150 hover:text-navy-800"
          >
            Explore the Growth System
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Insights() {
  return (
    <>
      <Seo
        title="Insights — The Business of Private Practice | WardShift"
        description="Editorial thinking on private-practice growth: websites, search behaviour, referral validation, positioning, enquiries and measurement — from WardShift."
        path="/insights/"
      />
      <Masthead />
      <FeaturedEssay />
      <ArticleIndex />
      <SeriesNote />
    </>
  );
}
