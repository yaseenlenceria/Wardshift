import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Check, Copy } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import WordReveal from "@/components/WordReveal";
import ContactForm from "@/components/pages/contact/ContactForm";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

/** Email chip: mono, click-to-copy with a 200ms "Copied" tooltip. */
function EmailChip() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("hello@wardshift.com");
    } catch {
      // Clipboard unavailable — the address is visible text regardless.
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={copy}
        className="group inline-flex items-center gap-2 rounded-full border border-grey-300 bg-white px-4 py-2 font-mono text-[13px] font-medium tracking-[0.02em] text-navy-800 transition-colors duration-150 hover:border-teal-500/50 hover:bg-teal-100"
        aria-label="Copy email address hello@wardshift.com"
      >
        hello@wardshift.com
        {copied ? (
          <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-grey-500 transition-colors duration-150 group-hover:text-teal-600" aria-hidden="true" />
        )}
      </button>
      {copied ? (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-navy-800 px-2 py-1 font-mono text-[11px] text-white"
          role="status"
        >
          Copied
        </motion.span>
      ) : null}
    </span>
  );
}

/** Section 1 — Hero copy (left) + contact form card (right). */
export default function ContactHero() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced
    ? {}
    : {
        variants: staggerParent(0.08),
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 pb-[72px] pt-10 lg:pb-32 lg:pt-14">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[40%_60%] lg:gap-14">
          {/* LEFT — copy */}
          <motion.div {...reveal}>
            <motion.p variants={fadeUp} className="eyebrow text-teal-600">
              Contact
            </motion.p>
            <WordReveal
              text="Talk to WardShift."
              as="h1"
              wordDelay={0.045}
              className="mt-4 text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-navy-800 lg:text-[56px]"
            />
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-grey-700 lg:text-xl"
            >
              Questions about working together, the Growth System, or whether WardShift is
              right for your practice — send a message and we'll respond.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7">
              <EmailChip />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-9 rounded-[10px] border border-grey-300 bg-navy-100/30 p-6 lg:p-7"
            >
              <p className="eyebrow text-teal-600">Looking to grow?</p>
              <p className="mt-3 text-[15px] leading-[1.7] text-grey-700">
                The Practice Growth Review is the best starting point — a structured look at
                your visibility, positioning, website, enquiries and measurement.
              </p>
              <Link
                to="/growth-review/"
                className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-5 py-3 text-[15px] font-semibold tracking-[0.01em] text-navy-950 transition-colors duration-150 hover:bg-teal-400"
              >
                Book a Growth Review
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-8 font-mono text-[12px] leading-[1.7] tracking-[0.02em] text-grey-500"
            >
              WardShift works with private practices internationally. No clinical enquiries can
              be handled here — patients should contact their doctor's practice directly.
            </motion.p>
          </motion.div>

          {/* RIGHT — form card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="rounded-lg border border-grey-300 bg-white p-6 shadow-card sm:p-8"
          >
            <h2 className="font-display text-[24px] font-medium leading-[1.25] tracking-[-0.01em] text-navy-800">
              Send a message
            </h2>
            <div className="mt-7">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
