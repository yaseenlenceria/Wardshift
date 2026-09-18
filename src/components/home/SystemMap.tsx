import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

/* Node layout on a 1000×600 canvas: hub left, two node columns, enquiry right. */
const HUB = { x: 150, y: 300 };
const ENQUIRY = { x: 880, y: 300 };

const NODES_COL1 = [
  "Search Visibility",
  "Google Business Profile",
  "Website",
  "Treatment Pages",
  "Reputation",
  "Reviews",
  "Tracking",
];
const NODES_COL2 = [
  "Content",
  "Local Search",
  "Analytics",
  "Conversion",
  "Technical Foundations",
  "Paid Search",
];

const COL1_X = 430;
const COL2_X = 620;
const colY = (count: number, i: number) => 300 + (i - (count - 1) / 2) * 80;

interface MapNode {
  label: string;
  x: number;
  y: number;
  order: number;
}

const NODES: MapNode[] = [
  ...NODES_COL1.map((label, i) => ({ label, x: COL1_X, y: colY(NODES_COL1.length, i), order: i * 2 })),
  ...NODES_COL2.map((label, i) => ({ label, x: COL2_X, y: colY(NODES_COL2.length, i), order: i * 2 + 1 })),
];

function curve(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

/**
 * Section — dark system map. The patient sees the front end; growth depends on
 * the connected system behind it. Lines draw and nodes activate in sequence on
 * scroll. Framer Motion only (scroll reveals, not scroll-scrubbed).
 */
export default function SystemMap() {
  const reduced = usePrefersReducedMotion();

  const draw = (delay: number) => ({
    initial: reduced ? undefined : { pathLength: 0, opacity: 0.25 },
    whileInView: reduced ? undefined : { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.45, ease: "easeInOut" as const, delay },
  });
  const activate = (delay: number) => ({
    initial: reduced ? false : { opacity: 0.35, scale: 0.96 },
    whileInView: reduced ? undefined : { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.35, delay },
  });

  return (
    <section id="system-map" className="relative scroll-mt-24 overflow-hidden bg-navy-950">
      {/* generated dark ascent ribbon, subtle background layer */}
      <img
        src="/img-dark-ascent.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-950" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
        aria-hidden="true"
      />
      {/* small glowing data points */}
      {[
        { top: "12%", left: "8%" },
        { top: "22%", left: "88%" },
        { top: "70%", left: "12%" },
        { top: "82%", left: "78%" },
        { top: "45%", left: "95%" },
      ].map((pos, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-teal-400"
          style={pos}
          animate={reduced ? undefined : { opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          aria-hidden="true"
        />
      ))}

      <div className="relative mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p variants={fadeUp} className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-teal-400/70">
            Going deeper
          </motion.p>
          <SectionHeading
            dark
            eyebrow="Behind the Front End"
            title="The patient only sees the front end. Growth depends on everything behind it."
            className="mt-3"
          />
        </motion.div>

        {/* desktop connected map */}
        <div className="mt-14 hidden lg:block">
          <svg viewBox="0 0 1000 600" className="w-full" role="img" aria-label="System map: Your Practice connects through thirteen growth systems to Patient Enquiry">
            {/* hub → nodes */}
            {NODES.map((n) => (
              <motion.path
                key={`h-${n.label}`}
                d={curve(HUB.x + 58, HUB.y, n.x - 78, n.y)}
                fill="none"
                stroke="#2DD4BF"
                strokeOpacity="0.3"
                strokeWidth="1.2"
                {...draw(0.12 + n.order * 0.025)}
              />
            ))}
            {/* nodes → enquiry */}
            {NODES.map((n) => (
              <motion.path
                key={`e-${n.label}`}
                d={curve(n.x + 78, n.y, ENQUIRY.x - 82, ENQUIRY.y)}
                fill="none"
                stroke="#2DD4BF"
                strokeOpacity="0.22"
                strokeWidth="1.2"
                {...draw(0.42 + n.order * 0.022)}
              />
            ))}

            {/* hub */}
            <motion.g {...activate(0)}>
              <motion.circle
                cx={HUB.x}
                cy={HUB.y}
                r="56"
                fill="none"
                stroke="#2DD4BF"
                strokeOpacity="0.5"
                initial={reduced ? undefined : { scale: 0.9, opacity: 0.4 }}
                animate={reduced ? undefined : { scale: [1, 1.25], opacity: [0.5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
              />
              <circle cx={HUB.x} cy={HUB.y} r="56" fill="#0B1F3A" stroke="#2DD4BF" strokeOpacity="0.7" strokeWidth="1.5" />
              <text x={HUB.x} y={HUB.y - 4} textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">
                Your
              </text>
              <text x={HUB.x} y={HUB.y + 16} textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">
                Practice
              </text>
            </motion.g>

            {/* nodes */}
            {NODES.map((n) => (
              <motion.g key={n.label} {...activate(0.28 + n.order * 0.035)} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
                <rect
                  x={n.x - 78}
                  y={n.y - 17}
                  width="156"
                  height="34"
                  rx="8"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(45,212,191,0.35)"
                  strokeWidth="1"
                />
                <circle cx={n.x - 64} cy={n.y} r="2.5" fill="#2DD4BF" />
                <text x={n.x + 6} y={n.y + 4} textAnchor="middle" fill="#DCE6F2" fontSize="11.5" fontFamily="Inter, sans-serif">
                  {n.label}
                </text>
              </motion.g>
            ))}

            {/* enquiry */}
            <motion.g {...activate(0.95)} style={{ transformOrigin: `${ENQUIRY.x}px ${ENQUIRY.y}px` }}>
              <rect x={ENQUIRY.x - 82} y={ENQUIRY.y - 26} width="164" height="52" rx="10" fill="#14B8A6" />
              <text x={ENQUIRY.x} y={ENQUIRY.y - 2} textAnchor="middle" fill="#050D1A" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
                Patient
              </text>
              <text x={ENQUIRY.x} y={ENQUIRY.y + 16} textAnchor="middle" fill="#050D1A" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
                Enquiry
              </text>
            </motion.g>
          </svg>
        </div>

        {/* mobile compact flow */}
        <motion.div
          variants={staggerParent(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 lg:hidden"
        >
          <motion.p variants={fadeUp} className="rounded-[10px] border border-teal-400/50 bg-navy-800 px-5 py-3.5 text-center text-[15px] font-semibold text-white">
            Your Practice
          </motion.p>
          <div className="mx-auto h-6 w-px bg-teal-400/50" aria-hidden="true" />
          <ul className="grid grid-cols-2 gap-2">
            {NODES.map((n) => (
              <motion.li
                key={n.label}
                variants={fadeUp}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-center text-[12px] font-medium text-navy-100/85"
              >
                {n.label}
              </motion.li>
            ))}
          </ul>
          <div className="mx-auto h-6 w-px bg-teal-400/50" aria-hidden="true" />
          <motion.p variants={fadeUp} className="rounded-[10px] bg-teal-500 px-5 py-3.5 text-center text-[15px] font-bold text-navy-950">
            Patient Enquiry
          </motion.p>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-[40ch] text-center font-display text-xl font-medium leading-[1.4] text-white lg:text-2xl"
        >
          WardShift manages the system around your clinical work.
        </motion.p>
      </div>
    </section>
  );
}
