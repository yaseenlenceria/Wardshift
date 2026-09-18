import { Link } from "react-router";
import Seo from "@/components/Seo";
import LegalPage from "@/components/pages/legal/LegalPage";
import type { LegalSection } from "@/components/pages/legal/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    id: "general-information",
    title: "General Information Only",
    body: (
      <p>
        All content on wardshift.com is published for general informational purposes. It
        relates to the operation, marketing and growth of private medical practices — the
        business side of healthcare. It does not constitute professional advice of any kind,
        and it is not a substitute for advice tailored to your specific circumstances.
      </p>
    ),
  },
  {
    id: "not-medical-advice",
    title: "Not Medical Advice",
    body: (
      <>
        <p>
          Nothing on this website is medical advice, and nothing here is intended for patients.
          WardShift is not a healthcare provider. The site is directed at doctors, consultants
          and practice managers who are considering the growth of their private practice.
        </p>
        <p>
          If you are a patient, please contact your doctor or their practice directly. Please
          also never submit clinical details or patient-identifiable information through any
          form on this site.
        </p>
      </>
    ),
  },
  {
    id: "no-professional-advice",
    title: "No Legal, Financial or Regulatory Advice",
    body: (
      <p>
        Content about private practice covers areas — such as advertising rules, data
        protection and professional standards — where regulations differ by jurisdiction and
        change over time. Comments on such topics are general in nature and are not legal,
        financial, accounting or regulatory advice. Always take specialist professional advice
        before making decisions, and check the rules that apply to your registering body and
        jurisdiction.
      </p>
    ),
  },
  {
    id: "illustrative-figures",
    title: "Illustrative Figures",
    body: (
      <p>
        Interface mock-ups, charts and numbers shown on this site are labelled samples. They
        exist to illustrate how systems work — they are not performance data, client results
        or projections, and they should not be relied on as such. Where we describe outcomes,
        we describe them in general terms because results genuinely vary with market, service
        and execution.
      </p>
    ),
  },
  {
    id: "no-guarantees",
    title: "No Guarantees of Results",
    body: (
      <p>
        We do not guarantee search rankings, advertising positions, enquiry volumes,
        conversions or revenue outcomes. Growth work involves variables outside any agency's
        control. Any engagement terms are set out individually in a written agreement, not on
        this website. See also our{" "}
        <Link to="/terms/">Terms of Use</Link>.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External Links",
    body: (
      <p>
        This site links to third-party resources we consider useful. We don't control those
        sites and aren't responsible for their content, accuracy or practices. A link is not
        an endorsement.
      </p>
    ),
  },
  {
    id: "errors-and-omissions",
    title: "Errors and Omissions",
    body: (
      <p>
        We work hard to keep content accurate and current, but we can't warrant that every
        detail is complete or up to date at all times. If you spot something that looks wrong,
        please tell us via the <Link to="/contact/">contact page</Link> and we'll correct it.
      </p>
    ),
  },
];

export default function Disclaimer() {
  return (
    <>
      <Seo
        title="Disclaimer | WardShift"
        description="wardshift.com content is general information only — not medical, legal or financial advice. Sample figures are illustrative and results are never guaranteed."
        path="/disclaimer/"
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://wardshift.com/" },
            { "@type": "ListItem", position: 2, name: "Disclaimer", item: "https://wardshift.com/disclaimer/" },
          ],
        }}
      />
      <LegalPage
        crumb="Disclaimer"
        heading="Disclaimer"
        metaLines={["Last updated: 17 September 2026", "Applies to: wardshift.com"]}
        sections={SECTIONS}
      />
    </>
  );
}
