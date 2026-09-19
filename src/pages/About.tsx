import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import AboutHero from "@/components/pages/about/AboutHero";
import WhySection from "@/components/pages/about/WhySection";
import Beliefs from "@/components/pages/about/Beliefs";
import { Capabilities, HowWeWork } from "@/components/pages/about/HowWeWork";

export default function About() {
  return (
    <>
      <Seo
        title="About WardShift | The Growth Side of Private Practice"
        description="WardShift exists because clinical excellence and patient discoverability are different disciplines. Learn what we believe and how we work with private doctors."
        path="/about/"
      />
      <AboutHero />
      <WhySection />
      <Beliefs />
      <HowWeWork />
      <Capabilities />
      <RelatedLinks
        items={[
          { category: "Framework", title: "The WardShift Growth System", href: "/growth-system/" },
          { category: "Audiences", title: "Who we help", href: "/who-we-help/" },
          { category: "Editorial", title: "Insights on the business of private practice", href: "/insights/" },
        ]}
      />
      <CtaBand
        title="Talk to a company that understands private practice."
        support="Book a Practice Growth Review — a structured, honest look at the growth side of your practice."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
        secondaryLabel="Contact us →"
        secondaryHref="/contact/"
      />
    </>
  );
}
