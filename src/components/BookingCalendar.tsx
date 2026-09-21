import { useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/motion";

const EMBED_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

interface BookingCalendarSectionProps {
  eyebrow: string;
  title: string;
  lede?: string;
}

/**
 * LeadConnector (GoHighLevel) scheduling calendar embedded in a section.
 * The embed script auto-resizes the iframe once the widget reports its height;
 * the initial inline height is a no-JS fallback.
 */
export default function BookingCalendarSection({ eyebrow, title, lede }: BookingCalendarSectionProps) {
  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const reduced = usePrefersReducedMotion();

  return (
    <section className="border-t border-grey-300 bg-white">
      <div className="mx-auto max-w-site px-6 py-[72px] lg:py-32">
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 overflow-hidden rounded-lg border border-grey-300 bg-white shadow-card"
        >
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/Cii1mixBK2OaTUAqdJOW"
            title="Book a time with WardShift"
            allow="payment"
            scrolling="no"
            loading="lazy"
            style={{ width: "100%", height: "740px", border: "none", overflow: "hidden", display: "block" }}
            className="w-full bg-white"
          />
        </motion.div>
      </div>
    </section>
  );
}
