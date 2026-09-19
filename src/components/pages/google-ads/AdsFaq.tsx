import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQS = [
  {
    q: "How much budget do we need?",
    a: "It depends on your specialty and market. Before anything is spent, we model scenarios — likely click costs, realistic enquiry ranges and the point at which a campaign becomes worthwhile — so the decision is made on numbers, not guesswork.",
  },
  {
    q: "Can you guarantee the top ad position?",
    a: "No — ad positions can't be guaranteed, and we never promise them. Relevance, quality and bidding discipline are what improve efficiency and earn strong placement sustainably.",
  },
  {
    q: "Do ads work without a good website?",
    a: "Rarely. Paid clicks only become enquiries when the page they land on earns trust. That's why specialist landing pages and trust signals are part of the system, not an optional extra.",
  },
  {
    q: "Who owns the ad account?",
    a: "The practice. Full transparency, always — you can see every keyword, every setting and every unit of spend, and the account stays yours whatever happens.",
  },
];

export default function AdsFaq() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-prose px-6 py-20 lg:py-32">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions About Google Ads."
        />
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
