import { useEffect, useState } from "react";

/** Shared easing / timing tokens from the WardShift motion system. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
export const EASE_STANDARD = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const fadeUp = {
  hidden: { opacity: 0.3, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const staggerParent = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
