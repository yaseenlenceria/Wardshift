import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Shared front-end form primitives for the Growth Review and Contact pages.
 * Forms are front-end only: validation + success state, no backend call.
 */

export const labelClass =
  "mb-2 block text-[15px] font-medium text-navy-800";

export function inputClass(hasError: boolean, extra?: string) {
  return cn(
    "h-12 w-full rounded-lg border bg-white px-4 text-[15px] text-navy-800 shadow-none transition-colors duration-150",
    "placeholder:text-grey-500/70 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/60",
    hasError ? "border-red-400" : "border-grey-300",
    extra,
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

/** Label + control + inline error with proper aria wiring. */
export function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? (
          <span className="ml-0.5 text-teal-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[13px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface FormSuccessProps {
  title: string;
  message: string;
  linkLabel?: string;
  linkHref?: string;
}

/** Success state that replaces a submitted form: teal check stroke-draw. */
export function FormSuccess({ title, message, linkLabel, linkHref }: FormSuccessProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="flex flex-col items-center py-10 text-center"
      role="status"
    >
      <svg viewBox="0 0 56 56" className="h-16 w-16" aria-hidden="true">
        {reduced ? (
          <>
            <circle cx="28" cy="28" r="26" fill="none" stroke="#14B8A6" strokeWidth="2" />
            <path
              d="M17 29.5 25 37.5 40 20.5"
              fill="none"
              stroke="#0E9488"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <motion.circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            />
            <motion.path
              d="M17 29.5 25 37.5 40 20.5"
              fill="none"
              stroke="#0E9488"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.35 }}
            />
          </>
        )}
      </svg>
      <h3 className="mt-6 font-display text-[24px] font-medium leading-[1.25] tracking-[-0.01em] text-navy-800">
        {title}
      </h3>
      <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.7] text-grey-700">{message}</p>
      {linkLabel && linkHref ? (
        <Link
          to={linkHref}
          className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600"
        >
          {linkLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </motion.div>
  );
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
