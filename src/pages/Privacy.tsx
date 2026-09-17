import { Link } from "react-router";
import Seo from "@/components/Seo";
import LegalPage from "@/components/pages/legal/LegalPage";
import type { LegalSection } from "@/components/pages/legal/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who We Are",
    body: (
      <>
        <p>
          WardShift provides growth services to private medical practices — covering strategy,
          websites, search visibility, patient acquisition, reputation, enquiry systems and
          measurement.
        </p>
        <p>
          For the purposes of this website, WardShift is the point of contact for privacy
          questions and data requests, reachable via the website{" "}
          <Link to="/contact/">contact page</Link>.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What We Collect",
    body: (
      <>
        <p>We collect the following categories of personal data through this website:</p>
        <ul>
          <li>
            <span className="font-semibold text-navy-800">Form submissions</span> — when you use
            the contact form or request a Practice Growth Review: your name, role/specialty,
            practice or organisation, email address, phone number and the content of your
            message.
          </li>
          <li>
            <span className="font-semibold text-navy-800">Technical data</span> — analytics
            cookies, device and browser information, and pages visited.
          </li>
          <li>
            <span className="font-semibold text-navy-800">Correspondence</span> — records of
            our exchanges with you when you contact us.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How We Use It",
    body: (
      <>
        <p>Personal data submitted through this website is used to:</p>
        <ul>
          <li>Respond to your enquiries and messages.</li>
          <li>Prepare and deliver Practice Growth Reviews.</li>
          <li>Improve the website and its content.</li>
          <li>Measure site performance.</li>
        </ul>
        <p>
          Your data is never sold, and never shared with third parties for their own marketing
          purposes.
        </p>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal Bases (GDPR)",
    body: (
      <>
        <p>Where the GDPR or equivalent data protection law applies, we rely on:</p>
        <ul>
          <li>
            <span className="font-semibold text-navy-800">Consent</span> — for form submissions
            you choose to send us.
          </li>
          <li>
            <span className="font-semibold text-navy-800">Legitimate interest</span> — for site
            analytics and responding to enquiries directed at us.
          </li>
          <li>
            <span className="font-semibold text-navy-800">Contractual necessity</span> — where
            processing is required to deliver a client engagement.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "analytics-cookies",
    title: "Analytics & Cookies",
    body: (
      <>
        <p>
          We use privacy-conscious analytics to understand how the site is used and to improve
          it. Cookies fall into two groups:
        </p>
        <ul>
          <li>
            <span className="font-semibold text-navy-800">Strictly necessary</span> — required
            for the site to function.
          </li>
          <li>
            <span className="font-semibold text-navy-800">Analytics</span> — aggregated,
            anonymised usage measurement.
          </li>
        </ul>
        <p>
          You can opt out at any time through your browser settings by blocking or deleting
          cookies. Full details — including how to change your consent choice — are in our{" "}
          <Link to="/cookies/">Cookie Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: (
      <p>
        Enquiry data is retained only as long as needed to respond to you and for reasonable
        follow-up. You may request deletion of your personal data at any time — see{" "}
        <a href="#your-rights">Your Rights</a> below.
      </p>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    body: (
      <p>
        We apply appropriate technical and organisational measures to protect personal data.
        In the interest of honesty: no system is ever 100% secure, and we cannot guarantee
        absolute security — but we treat the protection of your information as a core
        responsibility, not an afterthought.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: (
      <>
        <p>
          Depending on your jurisdiction, you may have the right to access, rectify, erase,
          restrict or object to the processing of your personal data, and the right to data
          portability.
        </p>
        <p>
          To exercise any of these rights, contact us via the{" "}
          <Link to="/contact/">contact page</Link>. You also have the right to raise a concern
          with your local data protection authority.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    body: (
      <p>
        WardShift operates internationally, and data may be processed in jurisdictions other
        than your own. Where this happens, we apply appropriate safeguards consistent with
        applicable data protection law.
      </p>
    ),
  },
  {
    id: "children-patients",
    title: "Children & Patients",
    body: (
      <>
        <p>
          This website is directed at healthcare professionals and practices, not at patients
          or children, and is not intended for anyone seeking medical care.
        </p>
        <p>
          <span className="font-semibold text-navy-800">Please never submit clinical or
          patient-identifiable information through any form on this site.</span> Our forms are
          for professional enquiries only; patient data should always go through the relevant
          doctor's own practice systems.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this policy from time to time. Updated versions will be posted on this
        page with a revised "last updated" date above.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about this policy or about how your data is handled? Reach us via the{" "}
        <Link to="/contact/">contact page</Link> and we'll respond.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | WardShift"
        description="How WardShift collects, uses and protects personal data submitted through this website. Privacy policy for wardshift.com."
        path="/privacy/"
      />
      <LegalPage
        crumb="Privacy"
        heading="Privacy Policy"
        metaLines={["Last updated: 17 September 2026", "Applies to: wardshift.com"]}
        sections={SECTIONS}
      />
    </>
  );
}
