import { motion } from "framer-motion";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

/**
 * Headline with word-level stagger reveal (clip + y:100%), per motion system.
 * Renders a single element whose words animate in sequence on view.
 */
export default function WordReveal({
  text,
  as: Tag = "h2",
  className,
  wordDelay = 0.04,
  duration = 0.6,
  once = true,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  wordDelay?: number;
  duration?: number;
  once?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = MOTION_TAGS[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%" },
              visible: {
                y: "0%",
                transition: { duration, ease: EASE_OUT, delay: i * wordDelay },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
