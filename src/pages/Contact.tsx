import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";
import BookingCalendarSection from "@/components/BookingCalendar";
import ContactHero from "@/components/pages/contact/ContactHero";
import OtherRoutes from "@/components/pages/contact/OtherRoutes";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact the WardShift Team | WardShift"
        description="Talk to WardShift about growing your private practice — general enquiries, or book a Growth Review covering visibility, website, enquiries and measurement."
        path="/contact/"
      />
      <ContactHero />
      <OtherRoutes />
      <BookingCalendarSection
        eyebrow="Book a call"
        title="Or Book Straight Into Our Calendar."
        lede="A thirty-minute call to talk through your practice and what you'd like to improve. Pick whatever time suits you — no obligation."
      />
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
