import Seo from "@/components/Seo";
import RelatedLinks from "@/components/RelatedLinks";
import HeroAndForm from "@/components/pages/growth-review/HeroAndForm";
import { AfterSteps, FaqAndClosing, IsAndIsnt } from "@/components/pages/growth-review/Sections";

export default function GrowthReview() {
  return (
    <>
      <Seo
        title="Book a Practice Growth Review | WardShift"
        description="A structured look at your practice's visibility, positioning, website, enquiry handling and measurement. Book a WardShift Practice Growth Review."
        path="/growth-review/"
      />
      <HeroAndForm />
      <AfterSteps />
      <IsAndIsnt />
      <FaqAndClosing />
      <RelatedLinks
        items={[
          { category: "Framework", title: "The WardShift Growth System", href: "/growth-system/" },
          { category: "Services", title: "How we help private practices", href: "/how-we-help/" },
          { category: "Contact", title: "Send us a message", href: "/contact/" },
        ]}
      />
    </>
  );
}
