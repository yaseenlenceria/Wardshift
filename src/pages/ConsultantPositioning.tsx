import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import PositioningHero from "@/components/pages/consultant-positioning/PositioningHero";
import PositioningCovers from "@/components/pages/consultant-positioning/PositioningCovers";
import ClaritySection from "@/components/pages/consultant-positioning/ClaritySection";
import PositioningDiagram from "@/components/pages/consultant-positioning/PositioningDiagram";
import PositioningFaq from "@/components/pages/consultant-positioning/PositioningFaq";

export default function ConsultantPositioning() {
  return (
    <>
      <Seo
        title="Consultant Positioning for Private Practice | WardShift"
        description="Patients don't think in clinical terms. WardShift helps consultants position their specialty, conditions and procedures clearly — without oversimplifying."
        path="/consultant-positioning/"
      />
      <PositioningHero />
      <PositioningCovers />
      <ClaritySection />
      <PositioningDiagram />
      <PositioningFaq />
      <RelatedLinks
        items={[
          {
            category: "Service",
            title: "Private Practice Websites",
            href: "/private-practice-websites/",
          },
          {
            category: "Service",
            title: "Digital Reputation",
            href: "/digital-reputation/",
          },
          {
            category: "Audience",
            title: "Who We Help",
            href: "/who-we-help/",
          },
        ]}
      />
      <CtaBand
        title="Could a patient explain what you do after 30 seconds on your website?"
        support="A Growth Review looks at how your expertise is currently presented — and what clearer positioning would change across every channel."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="See how this shapes websites →"
        secondaryHref="/private-practice-websites/"
      />
    </>
  );
}
