import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import ReputationHero from "@/components/pages/digital-reputation/ReputationHero";
import PatientChecks from "@/components/pages/digital-reputation/PatientChecks";
import TheWork from "@/components/pages/digital-reputation/TheWork";
import EthicsCharter from "@/components/pages/digital-reputation/EthicsCharter";
import ReputationFaq, { FAQS as REPUTATION_FAQS } from "@/components/pages/digital-reputation/ReputationFaq";
import { faqPageSchema } from "@/lib/schema";

export default function DigitalReputation() {
  return (
    <>
      <Seo
        title="Digital Reputation for Doctors & Consultants | WardShift"
        description="Your reputation exists online before you enter the room. WardShift strengthens the search results and profiles patients see when researching a doctor."
        path="/digital-reputation/"
        schema={faqPageSchema(REPUTATION_FAQS)}
      />
      <ReputationHero />
      <PatientChecks />
      <TheWork />
      <EthicsCharter />
      <ReputationFaq />
      <RelatedLinks
        items={[
          {
            category: "Service",
            title: "Consultant Positioning",
            href: "/consultant-positioning/",
          },
          {
            category: "Service",
            title: "Search Visibility",
            href: "/search-visibility/",
          },
          {
            category: "Service",
            title: "Private Practice Websites",
            href: "/private-practice-websites/",
          },
        ]}
      />
      <CtaBand
        title="What does a patient find when they search your name?"
        support="A Growth Review maps what patients currently find — and what it would take to make it accurate, consistent and credible."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="Strengthen positioning →"
        secondaryHref="/consultant-positioning/"
      />
    </>
  );
}
