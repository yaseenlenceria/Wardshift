import Seo from "@/components/Seo";
import RelatedLinks from "@/components/RelatedLinks";
import BookingCalendarSection from "@/components/BookingCalendar";
import HeroAndForm from "@/components/pages/growth-review/HeroAndForm";
import {
  AfterSteps,
  FaqAndClosing,
  IsAndIsnt,
  FAQS as REVIEW_FAQS,
} from "@/components/pages/growth-review/Sections";
import { faqPageSchema } from "@/lib/schema";

export default function GrowthReview() {
  return (
    <>
      <Seo
        title="Book a Practice Growth Review | WardShift"
        description="A structured look at your practice's visibility, positioning, website, enquiry handling and measurement. Book a WardShift Practice Growth Review."
        path="/growth-review/"
        schema={faqPageSchema(REVIEW_FAQS)}
      />
      <HeroAndForm />
      <BookingCalendarSection
        eyebrow="Book directly"
        title="Pick a Time. Skip the Form."
        lede="Choose a slot on our calendar and the Growth Review conversation is booked — thirty minutes, no obligation. Prefer to write first? The request form above works too."
      />
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
