import { Link } from "react-router";
import Seo from "@/components/Seo";
import LegalPage from "@/components/pages/legal/LegalPage";
import type { LegalSection } from "@/components/pages/legal/LegalPage";
import { REOPEN_EVENT } from "@/components/CookieConsent";

const SECTIONS: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What Cookies Are",
    body: (
      <p>
        Cookies are small text files stored on your device by a website. They are widely used
        to make websites work, to remember preferences, and to understand how a site is used.
        Similar technologies such as local storage are covered by this policy too.
      </p>
    ),
  },
  {
    id: "cookies-we-use",
    title: "Cookies We Use",
    body: (
      <>
        <p>
          This website keeps things deliberately light. We use only the following:
        </p>
        <ul>
          <li>
            <span className="font-semibold text-navy-800">Strictly necessary</span> — a single
            preference item that remembers your cookie choice, so we don't ask you on every
            visit. This is stored locally in your browser and never used to track you.
          </li>
          <li>
            <span className="font-semibold text-navy-800">Analytics</span> — privacy-conscious,
            aggregated measurement of how the site is used. Analytics are only loaded{" "}
            <span className="font-semibold text-navy-800">after you accept</span> cookies in the
            consent banner. If you choose "Essential only", no analytics run.
          </li>
        </ul>
        <p>
          We do not use advertising cookies, cross-site trackers, social media pixels or
          fingerprinting on this site.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-Party Services",
    body: (
      <>
        <p>
          Two third-party services are involved in operating this site, neither of which is
          used for advertising:
        </p>
        <ul>
          <li>
            <span className="font-semibold text-navy-800">Form delivery</span> — messages you
            send through our forms are processed by Formspark and delivered to our inbox.
            Form submissions are covered in our{" "}
            <Link to="/privacy/">Privacy Policy</Link>.
          </li>
          <li>
            <span className="font-semibold text-navy-800">Web fonts</span> — Google Fonts serves
            the typefaces used on this site. Requests to Google are made to load the fonts
            themselves.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-choices",
    title: "Your Choices",
    body: (
      <>
        <p>
          The first time you visit, the consent banner lets you accept all cookies or continue
          with essential ones only. You can change your decision at any time:
        </p>
        <ul>
          <li>
            Use the{" "}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
              className="font-semibold text-teal-600 underline underline-offset-4"
            >
              cookie settings
            </button>{" "}
            button to show the banner again.
          </li>
          <li>
            Or clear your browser storage for this site — your preference is removed and the
            banner will reappear on your next visit.
          </li>
        </ul>
        <p>
          You can also block or delete cookies through your browser settings at any time. See
          the help pages for{" "}
          <a href="https://support.google.com/chrome/answer/95647" rel="noopener noreferrer" target="_blank" className="text-teal-600 underline underline-offset-4">Chrome</a>,{" "}
          <a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" rel="noopener noreferrer" target="_blank" className="text-teal-600 underline underline-offset-4">Firefox</a>,{" "}
          <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" rel="noopener noreferrer" target="_blank" className="text-teal-600 underline underline-offset-4">Safari</a> or{" "}
          <a href="https://support.microsoft.com/microsoft-edge" rel="noopener noreferrer" target="_blank" className="text-teal-600 underline underline-offset-4">Edge</a>.
        </p>
      </>
    ),
  },
  {
    id: "do-not-track",
    title: "Do Not Track",
    body: (
      <p>
        There is no industry-standard response to browser "Do Not Track" signals. Because our
        analytics only run with your explicit consent, choosing "Essential only" achieves the
        same outcome: no measurement, no tracking.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <p>
        If we add new services that set additional cookies or storage, we will update this
        policy and ask for your consent again where required. The "last updated" date above
        always reflects the current version.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about cookies or this policy? Reach us via the{" "}
        <Link to="/contact/">contact page</Link>.
      </p>
    ),
  },
];

export default function Cookies() {
  return (
    <>
      <Seo
        title="Cookie Policy | WardShift"
        description="Which cookies and local storage wardshift.com uses, the third-party services involved, and how to accept, reject or change your cookie choices at any time."
        path="/cookies/"
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wardshift.com/" },
            { "@type": "ListItem", position: 2, name: "Cookie Policy", item: "https://www.wardshift.com/cookies/" },
          ],
        }}
      />
      <LegalPage
        crumb="Cookies"
        heading="Cookie Policy"
        metaLines={["Last updated: 17 September 2026", "Applies to: wardshift.com"]}
        sections={SECTIONS}
      />
    </>
  );
}
