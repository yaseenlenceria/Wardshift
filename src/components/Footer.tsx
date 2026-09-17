import { Link } from "react-router";
import { SERVICE_LINKS } from "@/lib/site";
import { REOPEN_EVENT } from "@/components/CookieConsent";

const COMPANY_LINKS = [
  { label: "Who We Help", href: "/who-we-help/" },
  { label: "Growth System", href: "/growth-system/" },
  { label: "Insights", href: "/insights/" },
  { label: "About", href: "/about/" },
  { label: "Growth Review", href: "/growth-review/" },
  { label: "Contact", href: "/contact/" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Cookies", href: "/cookies/" },
  { label: "Disclaimer", href: "/disclaimer/" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-site px-6 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="WardShift — home" className="inline-block">
              <img
                src="/logo-light.png"
                alt="WardShift — The Growth Side of Private Practice"
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-navy-100/80">
              The growth side of private practice — strategy, presence and enquiry systems for private
              doctors, consultants and specialists.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-teal-400">
              Growth services, not medical advice
            </p>
          </div>

          <nav aria-label="Services">
            <h3 className="eyebrow text-teal-400">How We Help</h3>
            <ul className="mt-5 space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[14px] text-navy-100/80 transition-colors duration-150 hover:text-teal-400"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="eyebrow text-teal-400">Company</h3>
            <ul className="mt-5 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[14px] text-navy-100/80 transition-colors duration-150 hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="eyebrow text-teal-400">Legal &amp; Trust</h3>
            <ul className="mt-5 space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[14px] text-navy-100/80 transition-colors duration-150 hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
                  className="text-left text-[14px] text-navy-100/80 transition-colors duration-150 hover:text-teal-400"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-navy-100/60">
              Ethical, evidence-led growth work. We never guarantee rankings, positions or patient volume.
            </p>
          </nav>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-[13px] text-navy-100/60">
            © {year} WardShift. All rights reserved. ·{" "}
            <a
              href="mailto:hello@wardshift.com"
              className="transition-colors duration-150 hover:text-teal-400"
            >
              hello@wardshift.com
            </a>
          </p>
          <p className="mt-2 text-[13px] text-navy-100/60">
            WardShift provides practice growth services; nothing on this site is medical advice. Sample
            figures on this site are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
