import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { EASE_OUT, fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const LEFT_ENDPOINTS = [
  { label: "Website", cy: 80 },
  { label: "Search results", cy: 220 },
  { label: "Professional profiles", cy: 360 },
];

const RIGHT_ENDPOINTS = [
  { label: "Google Ads", cy: 80 },
  { label: "Landing pages", cy: 220 },
  { label: "Enquiry scripts", cy: 360 },
];

const ALL_ENDPOINTS = [...LEFT_ENDPOINTS, ...RIGHT_ENDPOINTS];

/* ---------- desktop SVG diagram ---------- */

function DiagramSvg({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 1000 440"
      className="mx-auto mt-14 hidden w-full max-w-[960px] md:block"
      role="img"
      aria-label="Diagram: positioning feeds website, search results, professional profiles, Google Ads, landing pages and enquiry scripts."
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* connectors */}
      {LEFT_ENDPOINTS.map((ep, i) => (
        <motion.path
          key={ep.label}
          d={`M 405 220 C 350 220, 330 ${ep.cy}, 280 ${ep.cy}`}
          fill="none"
          stroke="#14B8A6"
          strokeWidth="1.5"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.6, ease: "easeInOut", delay: 0.4 + i * 0.08 },
            },
          }}
        />
      ))}
      {RIGHT_ENDPOINTS.map((ep, i) => (
        <motion.path
          key={ep.label}
          d={`M 595 220 C 650 220, 670 ${ep.cy}, 720 ${ep.cy}`}
          fill="none"
          stroke="#14B8A6"
          strokeWidth="1.5"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.6, ease: "easeInOut", delay: 0.4 + (i + 3) * 0.08 },
            },
          }}
        />
      ))}

      {/* central node */}
      <motion.g
        style={{ transformOrigin: "500px 220px" }}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
        }}
      >
        <rect x="405" y="188" width="190" height="64" rx="12" fill="#0B1F3A" />
        <rect
          x="405"
          y="188"
          width="190"
          height="64"
          rx="12"
          fill="none"
          stroke="#14B8A6"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <text
          x="500"
          y="216"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="17"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          Positioning
        </text>
        <text
          x="500"
          y="238"
          textAnchor="middle"
          fill="#2DD4BF"
          fontSize="10"
          fontFamily="'IBM Plex Mono', monospace"
          letterSpacing="2"
        >
          THE SOURCE LAYER
        </text>
      </motion.g>

      {/* endpoints */}
      {ALL_ENDPOINTS.map((ep, i) => {
        const isLeft = i < 3;
        const cx = isLeft ? 170 : 830;
        return (
          <motion.g
            key={ep.label}
            style={{ transformOrigin: `${cx}px ${ep.cy}px` }}
            variants={{
              hidden: { opacity: 0, scale: 0.92 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.35, ease: EASE_OUT, delay: 0.75 + i * 0.08 },
              },
            }}
          >
            <rect
              x={cx - 110}
              y={ep.cy - 26}
              width="220"
              height="52"
              rx="10"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            <circle cx={cx - 110 + 22} cy={ep.cy} r="3" fill="#14B8A6" />
            <text
              x={cx - 110 + 40}
              y={ep.cy + 5}
              fill="#0B1F3A"
              fontSize="15"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              {ep.label}
            </text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}

/* ---------- mobile stacked fallback ---------- */

function DiagramList() {
  return (
    <div className="mx-auto mt-12 max-w-[420px] md:hidden">
      <div className="rounded-[10px] border border-teal-500/40 bg-navy-800 p-5 text-center">
        <p className="text-[16px] font-semibold text-white">Positioning</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-teal-400">
          The source layer
        </p>
      </div>
      <div className="mx-auto h-6 w-px bg-teal-500/50" aria-hidden="true" />
      <motion.ul
        variants={staggerParent(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="space-y-3"
      >
        {ALL_ENDPOINTS.map((ep) => (
          <motion.li
            key={ep.label}
            variants={fadeUp}
            className="flex items-center gap-3 rounded-[10px] border border-grey-300 bg-white px-4 py-3.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />
            <span className="text-[15px] font-semibold text-navy-800">{ep.label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default function PositioningDiagram() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-site px-6 py-20 lg:py-32">
        <SectionHeading
          align="center"
          eyebrow="One layer, every channel"
          title="Positioning Is the Layer Everything Else Reads From."
          lede="Get this right once, and every channel becomes clearer."
        />
        <DiagramSvg reduced={reduced} />
        <DiagramList />
      </div>
    </section>
  );
}
