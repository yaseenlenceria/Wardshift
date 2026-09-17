import { motion } from "framer-motion";
import type { ReactNode } from "react";
import WordReveal from "@/components/WordReveal";
import { fadeUp, staggerParent } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  titleClassName?: string;
}

/**
 * Eyebrow (mono teal) → H2 (Fraunces, word-stagger reveal) → lede paragraph.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerParent(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn("max-w-[720px]", align === "center" && "mx-auto text-center", className)}
    >
      <motion.p
        variants={fadeUp}
        className={cn("eyebrow", dark ? "text-teal-400" : "text-teal-600")}
      >
        {eyebrow}
      </motion.p>
      <WordReveal
        text={title}
        as="h2"
        className={cn(
          "mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] lg:text-[44px]",
          dark ? "text-white" : "text-navy-800",
          titleClassName,
        )}
      />
      {lede ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mt-5 max-w-[68ch] text-[17px] leading-[1.7] lg:text-lg",
            dark ? "text-navy-100/80" : "text-grey-700",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
