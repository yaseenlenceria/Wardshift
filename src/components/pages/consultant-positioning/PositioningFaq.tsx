import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Is this personal branding?",
    a: "No — there are no logos and no slogans. Positioning is the accurate, structured presentation of real expertise: what you do, for whom, and where, stated so patients can actually understand it.",
  },
  {
    q: "Will patients think we're overselling?",
    a: "The opposite. Clarity reads as confidence; hype reads as doubt. Precise, plain presentation of genuine expertise is the most credible thing a patient can find.",
  },
  {
    q: "Who writes it?",
    a: "Drafted by WardShift, verified by you. Nothing publishes without clinical sign-off — accuracy stays with the doctor at every step.",
  },
];

export default function PositioningFaq() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-prose px-6 py-20 lg:py-32">
        <SectionHeading eyebrow="FAQ" title="Questions About Positioning." />
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`} className="border-grey-300">
              <AccordionTrigger className="text-[16px] font-semibold text-navy-800 hover:text-teal-600 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15.5px] leading-[1.7] text-grey-700">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
