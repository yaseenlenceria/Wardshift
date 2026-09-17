import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Field, FormSuccess, inputClass, isValidEmail } from "@/components/pages/forms/fields";
import { fadeUp, staggerParent, usePrefersReducedMotion } from "@/lib/motion";
import { submitForm } from "@/lib/forms";

interface FormValues {
  name: string;
  email: string;
  organisation: string;
  role: string;
  message: string;
  website: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL: FormValues = { name: "", email: "", organisation: "", role: "", message: "", website: "" };

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  const set = (key: keyof FormValues) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!isValidEmail(values.email)) next.email = "Please enter a valid email address.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    setSubmitError(null);
    const result = await submitForm("contact", {
      name: values.name,
      email: values.email,
      organisation: values.organisation,
      role: values.role,
      message: values.message,
      website: values.website,
    });
    setSending(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setSubmitError(result.message);
    }
  };

  if (submitted) {
    return (
      <FormSuccess
        title="Thank you — your message has been received."
        message="We'll respond as soon as we can. If you're looking to grow your practice, the Growth Review is the best starting point."
        linkLabel="Book a Growth Review instead →"
        linkHref="/growth-review/"
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
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={(e) => set("website")(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <motion.div variants={fadeUp} className="grid gap-5 sm:grid-cols-2">
        <Field id="ct-name" label="Name" required error={errors.name}>
          <input
            id="ct-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "ct-name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>
        <Field id="ct-email" label="Email" required error={errors.email}>
          <input
            id="ct-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "ct-email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp} className="grid gap-5 sm:grid-cols-2">
        <Field id="ct-organisation" label="Practice / Organisation">
          <input
            id="ct-organisation"
            type="text"
            autoComplete="organization"
            value={values.organisation}
            onChange={(e) => set("organisation")(e.target.value)}
            className={inputClass(false)}
          />
        </Field>
        <Field id="ct-role" label="Role / Specialty">
          <input
            id="ct-role"
            type="text"
            value={values.role}
            onChange={(e) => set("role")(e.target.value)}
            className={inputClass(false)}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Field id="ct-message" label="Message" required error={errors.message}>
          <textarea
            id="ct-message"
            rows={5}
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "ct-message-error" : undefined}
            className={inputClass(Boolean(errors.message), "h-auto min-h-[140px] py-3 resize-y")}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp}>
        {submitError && (
          <p role="alert" className="mb-3 text-[14px] font-medium text-red-600">
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-navy-800 px-6 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {sending ? "Sending…" : "Send Message"}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </motion.div>

      <motion.p variants={fadeUp} className="text-[13px] leading-[1.6] tracking-[0.01em] text-grey-500">
        Your details are used only to respond to your message — see our{" "}
        <Link to="/privacy/" className="font-medium text-teal-600 underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </motion.p>
    </motion.form>
  );
}
