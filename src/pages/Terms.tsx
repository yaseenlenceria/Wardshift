import { Link } from "react-router";
import Seo from "@/components/Seo";
import LegalPage from "@/components/pages/legal/LegalPage";
import type { LegalSection } from "@/components/pages/legal/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About These Terms",
    body: (
      <>
        <p>
          These terms govern your use of the WardShift website. By using this site, you accept
          them.
        </p>
        <p>
          The site is operated by WardShift, contactable via the website{" "}
          <Link to="/contact/">contact page</Link>.
        </p>
      </>
    ),
  },
  {
    id: "what-wardshift-does",
    title: "What WardShift Does",
    body: (
      <p>
        WardShift provides growth services for private medical practices — including strategy,
        websites, search visibility, patient acquisition, reputation, enquiry systems and
        measurement. Content on this site is general information about those services and the
        business of private practice; it is not professional, legal, financial or medical
        advice.
      </p>
    ),
  },
  {
    id: "no-medical-content",
    title: "No Medical Content",
    body: (
      <p>
        Nothing on this site is medical advice. The site is directed at healthcare
        professionals and practices, not at patients seeking care. If you are a patient,
        please contact your doctor's practice directly.
      </p>
    ),
  },
  {
    id: "no-guarantees",
    title: "No Guarantees",
    body: (
      <p>
        WardShift does not guarantee search rankings, advertising positions, enquiry volumes
        or practice growth outcomes. Any figures shown on this site within illustrative
        interface examples are labelled sample data and do not represent promised or typical
        results.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <p>
        All content on this site — including the WardShift name and logo, the Growth System
        and First 90 Days frameworks, text, visuals and design — belongs to WardShift and may
        not be reproduced, distributed or reused without prior written permission.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>
            Misuse the site's forms — including by submitting patient-identifiable or clinical
            information, spam, or false or misleading details.
          </li>
          <li>Scrape, harvest or bulk-extract content or data from the site.</li>
          <li>Misrepresent your identity, practice or affiliation when contacting us.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links & Tools",
    body: (
      <p>
        This site may reference external websites or services. These are not endorsed,
        controlled or operated by WardShift, and we are not responsible for their content,
        availability or practices.
      </p>
    ),
  },
  {
    id: "disclaimers-liability",
    title: "Disclaimers & Limitation of Liability",
    body: (
      <p>
        This website is provided "as is" without warranties of any kind, express or implied.
        To the extent permitted by applicable law, WardShift excludes liability for any loss
        or damage arising from use of, or reliance on, this site or its content.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: (
      <p className="rounded-[10px] border border-dashed border-grey-300 bg-grey-100/60 px-4 py-3 text-[14px] text-grey-500">
        Unless a written client agreement says otherwise, disputes about this website should
        first be raised with WardShift through the contact page so they can be handled directly
        and in good faith.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        These terms may be updated from time to time. The latest version will always be posted
        on this page, with the "last updated" date revised above.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms? Reach us via the{" "}
        <Link to="/contact/">contact page</Link>.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service | WardShift"
        description="Terms of service for using the WardShift website — acceptable use, intellectual property, disclaimers and limitations."
        path="/terms/"
      />
      <LegalPage
        crumb="Terms"
        heading="Terms of Service"
        metaLines={["Last updated: 17 September 2026", "Applies to: wardshift.com"]}
        sections={SECTIONS}
      />
    </>
  );
}
