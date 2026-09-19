import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import AdsHero from "@/components/pages/google-ads/AdsHero";
import CampaignBuild from "@/components/pages/google-ads/CampaignBuild";
import IntentSorter from "@/components/pages/google-ads/IntentSorter";
import Measurement from "@/components/pages/google-ads/Measurement";
import AdsFaq, { FAQS as ADS_FAQS } from "@/components/pages/google-ads/AdsFaq";
import { faqPageSchema } from "@/lib/schema";

export default function GoogleAds() {
  return (
    <>
      <Seo
        title="Google Ads for Private Doctors & Consultants | WardShift"
        description="Measurable Google Ads for private practices — high-intent search campaigns, specialist landing pages, call and form tracking, disciplined budget management."
        path="/google-ads/"
        schema={faqPageSchema(ADS_FAQS)}
      />
      <AdsHero />
      <CampaignBuild />
      <IntentSorter />
      <Measurement />
      <AdsFaq />
      <RelatedLinks
        items={[
          {
            category: "Service",
            title: "Patient Acquisition",
            href: "/patient-acquisition/",
          },
          {
            category: "Service",
            title: "Search Visibility",
            href: "/search-visibility/",
          },
          {
            category: "Service",
            title: "Enquiry Systems",
            href: "/practice-enquiry-systems/",
          },
        ]}
      />
      <CtaBand
        title="Capture the demand that already exists."
        support="Patients are searching for what you do right now. A disciplined campaign makes sure the right ones find you — and that every enquiry is measured."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="Explore patient acquisition →"
        secondaryHref="/patient-acquisition/"
      />
    </>
  );
}
