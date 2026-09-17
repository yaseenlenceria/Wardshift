import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import ContactHero from "@/components/pages/contact/ContactHero";
import OtherRoutes from "@/components/pages/contact/OtherRoutes";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact WardShift | WardShift"
        description="Contact WardShift — the growth side of private practice. General enquiries, or book a Practice Growth Review to examine your visibility, website, enquiries and measurement."
        path="/contact/"
      />
      <ContactHero />
      <OtherRoutes />
      <RelatedLinks
        items={[
          { category: "Conversion", title: "Book a Practice Growth Review", href: "/growth-review/" },
          { category: "Company", title: "About WardShift", href: "/about/" },
          { category: "Editorial", title: "Insights on the business of private practice", href: "/insights/" },
        ]}
      />
      <CtaBand
        title="Ready for a structured look at your practice?"
        support="The Practice Growth Review examines your visibility, positioning, website, enquiry handling and measurement."
        primaryLabel="Book a Growth Review"
        primaryHref="/growth-review/"
      />
    </>
  );
}
