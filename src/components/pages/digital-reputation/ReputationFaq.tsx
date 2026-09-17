import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Can you remove a negative review?",
    a: "Legitimate criticism stays. What we do is ensure the overall picture is accurate — that profiles are properly managed, information is correct, and genuine patient feedback can exist in context.",
  },
  {
    q: "How do ethical review requests work?",
    a: "Where appropriate and permitted, patients may be invited to share honest feedback — universally, never selectively. We never filter who is asked, never incentivise positive sentiment, and never gate reviews.",
  },
  {
    q: "How is reputation measured?",
    a: "Through profile completeness, information accuracy, search-result quality and review presence trends — observable, verifiable signals rather than vague scores.",
  },
];

export default function ReputationFaq() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-prose px-6 py-20 lg:py-32">
        <SectionHeading eyebrow="FAQ" title="Questions About Reputation." />
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
