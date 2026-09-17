import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const QUERIES = [
  "knee specialist near me",
  "private orthopaedic consultant",
  "dermatologist near me",
  "private cardiologist",
  "shoulder specialist",
];

/**
 * Rotating typewriter across the example queries: type → hold → delete → next.
 * Reduced motion renders the first query statically.
 */
function RotatingSearch({ reduced }: { reduced: boolean }) {
  const [qi, setQi] = useState(0);
  const [shown, setShown] = useState(reduced ? QUERIES[0] : "");
  const [holding, setHolding] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const query = QUERIES[qi];
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!deleting) {
        i += 1;
        setShown(query.slice(0, i));
        if (i >= query.length) {
          setHolding(true);
          deleting = true;
          timer = setTimeout(tick, 2400);
          return;
        }
        timer = setTimeout(tick, 48 + Math.random() * 52);
      } else {
        setHolding(false);
        i -= 3;
        setShown(query.slice(0, Math.max(0, i)));
        if (i <= 0) {
          timer = setTimeout(() => setQi((v) => (v + 1) % QUERIES.length), 350);
          return;
        }
        timer = setTimeout(tick, 20);
      }
    };
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [qi, reduced]);

  return (
    <div className="mx-auto mt-10 w-full max-w-[620px]">
      <div className="flex items-center gap-3 rounded-full border border-grey-300 bg-white px-5 py-4 shadow-card">
        <Search className="h-5 w-5 shrink-0 text-grey-500" aria-hidden="true" />
        <span className="min-h-[24px] text-[16px] text-navy-800 sm:text-[18px]">
          {shown}
          <span
            className="ml-0.5 inline-block h-5 w-px translate-y-1 animate-pulse bg-teal-500 motion-reduce:animate-none"
            aria-hidden="true"
          />
        </span>
      </div>

      {/* results hint resolving while the query holds */}
      <div className="mx-auto mt-5 max-w-[460px] space-y-2.5" aria-hidden="true">
        {[0, 1, 2].map((row) => (
          <motion.div
            key={`${qi}-${row}`}
            className="flex items-center gap-2.5"
            initial={reduced ? false : { opacity: 0, x: -8 }}
            animate={reduced ? undefined : holding ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: row * 0.14 }}
          >
            <span
              className={row === 0 ? "h-2 w-2 shrink-0 rounded-full bg-teal-500" : "h-2 w-2 shrink-0 rounded-full bg-grey-300"}
            />
            <span className="h-2 flex-1 rounded bg-navy-800/10" />
            <span className="h-2 w-10 shrink-0 rounded bg-grey-300/60" />
          </motion.div>
        ))}
      </div>
      <p className="mt-5 text-center font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-grey-500">
        Real patients type real searches — every day
      </p>
    </div>
  );
}

/** Section — "Your next patient may already be searching." */
export default function SearchingNow() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="border-t border-grey-300/60 bg-paper">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-28">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="eyebrow text-teal-600">
            Right now
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[22ch] text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]"
          >
            Your next patient may already be searching.
          </motion.h2>
        </motion.div>

        <RotatingSearch reduced={reduced} />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-[38ch] text-center font-display text-xl font-medium leading-[1.4] text-navy-800 lg:text-2xl"
        >
          But what happens next determines who receives the enquiry.
        </motion.p>
      </div>
    </section>
  );
}
