import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router";
import { ArrowRight } from "lucide-react";
import { Field, FormSuccess, inputClass, isValidEmail } from "@/components/pages/forms/fields";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";

const FOCUS_OPTIONS = [
  { value: "overall", label: "Overall growth" },
  { value: "website", label: "Website" },
  { value: "search-visibility", label: "Search visibility" },
  { value: "google-ads", label: "Google Ads" },
  { value: "reputation", label: "Reputation" },
  { value: "enquiry-crm", label: "Enquiry handling / CRM" },
  { value: "positioning", label: "Positioning" },
  { value: "not-sure", label: "Not sure yet" },
];

/** Accepts ?focus= values used by CTAs elsewhere on the site. */
const FOCUS_ALIASES: Record<string, string> = {
  overall: "overall",
  growth: "overall",
  website: "website",
  websites: "website",
  search: "search-visibility",
  seo: "search-visibility",
  visibility: "search-visibility",
  "search-visibility": "search-visibility",
  ads: "google-ads",
  "google-ads": "google-ads",
  "paid-search": "google-ads",
  reputation: "reputation",
  enquiry: "enquiry-crm",
  enquiries: "enquiry-crm",
  "enquiry-handling": "enquiry-crm",
  crm: "enquiry-crm",
  "follow-up": "enquiry-crm",
  "enquiry-crm": "enquiry-crm",
  positioning: "positioning",
  "not-sure": "not-sure",
  "not-sure-yet": "not-sure",
};

interface FormValues {
  name: string;
  role: string;
  practice: string;
  email: string;
  phone: string;
  focus: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL: FormValues = {
  name: "",
  role: "",
  practice: "",
  email: "",
  phone: "",
  focus: "",
  message: "",
};

export default function GrowthReviewForm() {
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Pre-select the interest field from ?focus= query param.
  useEffect(() => {
    const focus = searchParams.get("focus");
    if (!focus) return;
    const mapped = FOCUS_ALIASES[focus.toLowerCase()];
    if (mapped) {
      const timer = setTimeout(() => {
        setValues((v) => ({ ...v, focus: mapped }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const set = (key: keyof FormValues) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Front-end only: validate and show the success state (no backend call).
    event.preventDefault();
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.role.trim()) next.role = "Please enter your role or specialty.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!isValidEmail(values.email)) next.email = "Please enter a valid email address.";
    if (!values.focus) next.focus = "Please select what you'd like to improve.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <FormSuccess
        title="Thank you — your request has been received."
        message="We'll be in touch to arrange your review."
        linkLabel="Explore the Growth System while you wait →"
        linkHref="/growth-system/"
      />
    );
  }

  const fieldMotion = reduced
    ? {}
    : {
        variants: staggerParent(0.04, 0.1),
        initial: "hidden" as const,
        animate: "visible" as const,
      };

  return (
    <motion.form {...fieldMotion} noValidate onSubmit={handleSubmit} className="space-y-5">
      <motion.div variants={fadeUp}>
        <Field id="gr-name" label="Full name" required error={errors.name}>
          <input
            id="gr-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "gr-name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp} className="grid gap-5 sm:grid-cols-2">
        <Field id="gr-role" label="Role / Specialty" required error={errors.role}>
          <input
            id="gr-role"
            type="text"
            placeholder="e.g. Consultant Orthopaedic Surgeon"
            value={values.role}
            onChange={(e) => set("role")(e.target.value)}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? "gr-role-error" : undefined}
            className={inputClass(Boolean(errors.role))}
          />
        </Field>
        <Field id="gr-practice" label="Practice name">
          <input
            id="gr-practice"
            type="text"
            autoComplete="organization"
            value={values.practice}
            onChange={(e) => set("practice")(e.target.value)}
            className={inputClass(false)}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp} className="grid gap-5 sm:grid-cols-2">
        <Field id="gr-email" label="Email" required error={errors.email}>
          <input
            id="gr-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "gr-email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>
        <Field id="gr-phone" label="Phone">
          <input
            id="gr-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            className={inputClass(false)}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Field id="gr-focus" label="What would you like to improve?" required error={errors.focus}>
          <select
            id="gr-focus"
            value={values.focus}
            onChange={(e) => set("focus")(e.target.value)}
            aria-invalid={Boolean(errors.focus)}
            aria-describedby={errors.focus ? "gr-focus-error" : undefined}
            className={inputClass(Boolean(errors.focus), values.focus ? "" : "text-grey-500/70")}
          >
            <option value="" disabled>
              Select an option
            </option>
            {FOCUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Field id="gr-message" label="Message">
          <textarea
            id="gr-message"
            rows={4}
            placeholder="Tell us briefly about your practice and goals"
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
            className={inputClass(false, "h-auto min-h-[112px] py-3 resize-y")}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp}>
        <button
          type="submit"
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-navy-800 px-6 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
        >
          Request My Growth Review
          <ArrowRight
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </motion.div>

      <motion.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.08em] text-grey-500">
        Protected from spam. Please do not include patient-identifiable or clinical information.
      </motion.p>
      <motion.p variants={fadeUp} className="text-[13px] leading-[1.6] tracking-[0.01em] text-grey-500">
        Your details are used only to respond to your request and are never shared — see our{" "}
        <Link to="/privacy/" className="font-medium text-teal-600 underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </motion.p>
    </motion.form>
  );
}
