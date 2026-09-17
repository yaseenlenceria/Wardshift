import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { label: "Need", desc: "“My knee has been hurting for months.” A symptom or concern prompts the search for private care." },
  { label: "Search", desc: "The patient types it into a search box — and the results appear." },
  { label: "Found", desc: "Several clinic listings surface. Being excellent is irrelevant if you can't be found." },
  { label: "Understood", desc: "The patient opens a website: who is this doctor, what do they specialise in, can they treat my problem, where are they, what happens next." },
  { label: "Trusted", desc: "Reviews, qualifications, profile, treatments and reputation converge into trust." },
  { label: "Contacted", desc: "Phone, form, WhatsApp or an appointment enquiry — the moment of contact must be effortless." },
  { label: "Measured", desc: "The enquiry connects back to the search term, landing page, Google profile, campaign, source and location." },
];

// Steps 1–3 get one scroll segment each; 4–7 slightly faster.
const WEIGHTS = [1, 1, 1, 0.7, 0.7, 0.7, 0.7];
const TOTAL_WEIGHT = WEIGHTS.reduce((a, b) => a + b, 0);
const THRESHOLDS = WEIGHTS.reduce<number[]>((acc, w, i) => {
  acc.push((acc[i - 1] ?? 0) + w / TOTAL_WEIGHT);
  return acc;
}, []);

/**
 * Section 4 — The Private Patient Journey. GSAP-only subtree: pinned horizontal
 * sequence on desktop (pin ~180vh), vertical timeline on mobile (no pin).
 */
export default function PatientJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    const setStep = (el: Element | null, on: boolean) =>
      el?.setAttribute("data-active", on ? "true" : "false");

    mm.add("(min-width: 1024px)", () => {
      const track = root.querySelector<HTMLElement>("[data-track]");
      const rail = root.querySelector<HTMLElement>("[data-rail-fill]");
      const closings = Array.from(root.querySelectorAll<HTMLElement>("[data-closing]"));
      const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-step-card]"));
      if (!track || !rail) return;

      if (reduced) {
        cards.forEach((c) => setStep(c, true));
        rail.style.transform = "scaleX(1)";
        closings.forEach((c) => (c.style.opacity = "1"));
        return;
      }

      // Base overflow plus a generous extra leftward shift so the final card
      // ("Measured") travels well into the system — landing in the left third
      // of the viewport rather than near the right edge.
      const overflow = () => {
        const base = Math.max(0, track.scrollWidth - root.clientWidth + 48);
        const extra = Math.max(0, root.clientWidth * 0.62 - 150);
        return base + extra;
      };

      const st = ScrollTrigger.create({
        trigger: root.querySelector("[data-pin]") as HTMLElement,
        start: "top 15%",
        end: "+=180%",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const stepProgress = Math.min(p / 0.8, 1);
          rail.style.transform = `scaleX(${stepProgress})`;
          gsap.set(track, { x: -overflow() * stepProgress });
          cards.forEach((card, i) => {
            const threshold = i === 0 ? 0.001 : THRESHOLDS[i - 1];
            setStep(card, stepProgress >= threshold);
          });
          const co = String(Math.max(0, (p - 0.8) / 0.2));
          closings.forEach((c) => (c.style.opacity = co));
        },
      });
      return () => st.kill();
    });

    mm.add("(max-width: 1023px)", () => {
      const railV = root.querySelector<HTMLElement>("[data-rail-fill-mobile]");
      const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-step-row]"));
      if (reduced) {
        rows.forEach((r) => setStep(r, true));
        if (railV) railV.style.transform = "scaleY(1)";
        root.querySelectorAll<HTMLElement>("[data-closing]").forEach((c) => (c.style.opacity = "1"));
        return;
      }
      const triggers: ScrollTrigger[] = [];
      if (railV) {
        triggers.push(
          ScrollTrigger.create({
            trigger: root.querySelector("[data-mobile-list]") as HTMLElement,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.4,
            onUpdate: (self) => {
              railV.style.transform = `scaleY(${self.progress})`;
            },
          }),
        );
      }
      rows.forEach((row) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: row,
            start: "top 72%",
            onEnter: () => setStep(row, true),
            onLeaveBack: () => setStep(row, false),
          }),
        );
      });
      root.querySelectorAll<HTMLElement>("[data-closing]").forEach((closing) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: closing,
            start: "top 85%",
            onEnter: () => gsap.to(closing, { opacity: 1, duration: 0.5 }),
          }),
        );
      });
      return () => triggers.forEach((t) => t.kill());
    });

    return () => mm.revert();
  }, [reduced]);

  const heading = (
    <div className="max-w-[720px]">
      <p className="eyebrow text-teal-600">Before the phone rings</p>
      <h2 className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.015em] text-navy-800 lg:text-[44px]">
        What happens before someone becomes your patient?
      </h2>
    </div>
  );

  const closingLine = (
    <div data-closing style={{ opacity: 0 }} className="mt-12 max-w-[680px]">
      <p className="font-display text-xl font-medium leading-[1.4] text-navy-800 lg:text-2xl">
        WardShift works on everything between the first search and the decision to contact
        your practice.
      </p>
      <Link
        to="/growth-system/"
        className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-600"
      >
        See how we improve every step
        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <section ref={rootRef} id="patient-journey" className="bg-paper">
      {/* Desktop pinned sequence */}
      <div data-pin className="hidden overflow-hidden lg:block">
        <div className="mx-auto max-w-site px-6 pt-32">
          {heading}
          <div className="relative mt-16">
            {/* progress rail */}
            <div className="absolute left-0 right-0 top-0 h-0.5 bg-grey-300" aria-hidden="true" />
            <div
              data-rail-fill
              className="absolute left-0 right-0 top-0 h-0.5 origin-left bg-teal-500"
              style={{ transform: "scaleX(0)" }}
              aria-hidden="true"
            />
            <div data-track className="flex w-max gap-5 pt-10 will-change-transform">
              {STEPS.map((step, i) => (
                <article
                  key={step.label}
                  data-step-card
                  data-active="false"
                  className="group w-[200px] shrink-0 rounded-[10px] border border-grey-300 bg-white p-4 transition-all duration-300 data-[active=true]:-translate-y-2 data-[active=true]:border-teal-500 data-[active=true]:shadow-card"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-grey-300 font-mono text-[11px] font-medium text-grey-500 transition-colors duration-300 group-data-[active=true]:border-teal-500 group-data-[active=true]:bg-teal-500 group-data-[active=true]:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-sans text-[14px] font-semibold leading-snug text-navy-800">
                    {step.label}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-[1.55] text-grey-500">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
          {closingLine}
          <div className="pb-24" />
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="px-6 py-[72px] lg:hidden">
        {heading}
        <div data-mobile-list className="relative mt-12 pl-10">
          <div className="absolute bottom-2 left-4 top-2 w-0.5 bg-grey-300" aria-hidden="true" />
          <div
            data-rail-fill-mobile
            className="absolute bottom-2 left-4 top-2 w-0.5 origin-top bg-teal-500"
            style={{ transform: "scaleY(0)" }}
            aria-hidden="true"
          />
          <ol className="space-y-7">
            {STEPS.map((step, i) => (
              <li key={step.label} data-step-row data-active="false" className="group relative">
                <span className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-grey-300 bg-white font-mono text-[11px] font-medium text-grey-500 transition-colors duration-300 group-data-[active=true]:border-teal-500 group-data-[active=true]:bg-teal-500 group-data-[active=true]:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[15px] font-semibold text-navy-800 transition-colors duration-300 group-data-[active=false]:text-grey-500">
                  {step.label}
                </h3>
                <p className="mt-1 text-[13.5px] leading-[1.6] text-grey-500">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
        {closingLine}
      </div>
    </section>
  );
}
