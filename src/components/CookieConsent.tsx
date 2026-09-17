import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePrefersReducedMotion } from "@/lib/motion";

export const CONSENT_KEY = "ws-cookie-consent";
export const CONSENT_EVENT = "ws-cookie-consent-changed";
export const REOPEN_EVENT = "ws-reopen-cookie-banner";

export type ConsentValue = "accepted" | "essential";

export function getConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "essential" ? value : null;
  } catch {
    return null;
  }
}

/** Global cookie consent banner. Analytics anywhere on the site must be gated
 *  on getConsent() === "accepted" (subscribe to CONSENT_EVENT for changes). */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();

  const decide = (value: ConsentValue) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Storage unavailable (e.g. private mode): honour the choice for this visit only.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
    setVisible(false);
  };

  useEffect(() => {
    if (getConsent()) return;
    const timer = setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 800);
    const reopen = () => {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    };
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(REOPEN_EVENT, reopen);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className={`fixed inset-x-0 bottom-0 z-[70] transition-transform duration-300 ${
        reduced ? "" : visible ? "translate-y-0" : "translate-y-full"
      } ${visible ? "" : "pointer-events-none"}`}
    >
      <div className="border-t border-white/10 bg-navy-950 text-white shadow-[0_-12px_40px_rgba(11,31,58,0.35)]">
        <div className="mx-auto flex max-w-site flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-[14px] leading-relaxed text-navy-100/85">
            We use essential storage to run this site and remember your choice. Analytics are
            privacy-conscious and load only with your consent — never ads or cross-site
            tracking.{" "}
            <Link to="/cookies/" className="font-semibold text-teal-400 underline underline-offset-4">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex flex-shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => decide("essential")}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 px-5 text-[14px] font-semibold text-white transition-colors duration-150 hover:border-teal-400 hover:text-teal-400"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-teal-500 px-5 text-[14px] font-semibold text-navy-950 transition-colors duration-150 hover:bg-teal-400"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
