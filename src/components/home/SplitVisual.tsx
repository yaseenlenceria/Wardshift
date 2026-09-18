import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconCompass,
  IconDocument,
  IconLayers,
  IconMapPin,
  IconSearchLens,
  IconShield,
} from "@/components/icons";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

const LEFT_ITEMS: { label: string; icon: ReactNode }[] = [
  { label: "Qualifications", icon: <IconDocument className="h-4 w-4" /> },
  { label: "Experience", icon: <IconLayers className="h-4 w-4" /> },
  { label: "Hospital appointments", icon: <IconMapPin className="h-4 w-4" /> },
  { label: "Research", icon: <IconSearchLens className="h-4 w-4" /> },
  { label: "Expertise", icon: <IconCompass className="h-4 w-4" /> },
  { label: "Professional reputation", icon: <IconShield className="h-4 w-4" /> },
];

const RIGHT_ITEMS = [
  "Google",
  "Website",
  "Profiles",
  "Content",
  "Reputation",
  "Contact journey",
];

/**
 * Section 3 — Signature split visual. GSAP-only subtree (ScrollTrigger scrub):
 * panels slide in, the teal bridge draws outward from the WardShift mark with
 * travelling data pulses, and the tiles activate as the connection reaches them.
 */
export default function SplitVisual() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const bridgeL = root.querySelector<HTMLElement>("[data-bridge='left']");
    const bridgeR = root.querySelector<HTMLElement>("[data-bridge='right']");
    const leftPanel = root.querySelector<HTMLElement>("[data-panel='left']");
    const rightPanel = root.querySelector<HTMLElement>("[data-panel='right']");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-item]"));
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-node]"));
    const referral = root.querySelector<HTMLElement>("[data-referral]");
    const pulses = Array.from(root.querySelectorAll<HTMLElement>("[data-pulse]"));
    const glowRing = root.querySelector<HTMLElement>("[data-glow-ring]");

    if (reduced) {
      gsap.set([bridgeL, bridgeR], { scaleX: 1 });
      items.forEach((el) => el.setAttribute("data-lit", "true"));
      nodes.forEach((el) => el.setAttribute("data-lit", "true"));
      if (referral) gsap.set(referral, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([bridgeL, bridgeR], { scaleX: 0 });
      gsap.set(leftPanel, { x: -40, opacity: 0 });
      gsap.set(rightPanel, { x: 40, opacity: 0 });
      if (referral) gsap.set(referral, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "center center",
          scrub: 0.5,
        },
      });

      tl.to([leftPanel, rightPanel], { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" })
        .to([bridgeL, bridgeR], { scaleX: 1, duration: 0.4, ease: "power1.inOut" }, "-=0.05")
        .to(referral, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, "-=0.1");

      // activate tiles + connection nodes sequentially through the same scrub window
      items.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: root,
          start: `${58 + i * 3}% 60%`,
          onEnter: () => el.setAttribute("data-lit", "true"),
          onLeaveBack: () => el.setAttribute("data-lit", "false"),
        });
      });
      nodes.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: root,
          start: `${56 + i * 2}% 60%`,
          onEnter: () => el.setAttribute("data-lit", "true"),
          onLeaveBack: () => el.setAttribute("data-lit", "false"),
        });
      });

      // travelling data pulses along the bridge (center → panels), infinite
      pulses.forEach((dot, i) => {
        const lane = dot.parentElement;
        if (!lane) return;
        const w = lane.clientWidth;
        if (w <= 0) return; // lanes hidden on mobile
        const dir = dot.dataset.pulse === "left" ? -1 : 1;
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7, delay: 1.2 + i * 0.9 });
        tl.set(dot, { x: 0, opacity: 0 })
          .to(dot, { opacity: 1, duration: 0.3, ease: "none" })
          .to(dot, { x: dir * Math.max(0, w - 8), duration: 1.9, ease: "none" }, "<")
          .to(dot, { opacity: 0, duration: 0.35, ease: "none" });
      });

      // slow breathing glow around the mark
      if (glowRing) {
        gsap.to(glowRing, {
          opacity: 0.85,
          scale: 1.12,
          duration: 2.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-navy-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "url(/texture-grid.svg)", backgroundSize: "400px 400px" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(/noise.webp)", backgroundSize: "512px 512px" }}
        aria-hidden="true"
      />
      {/* soft teal aura behind the bridge */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/[0.07] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-site items-center gap-10 px-6 py-[72px] lg:grid-cols-[1fr_auto_1fr] lg:py-32">
        {/* LEFT — what you've built */}
        <div data-panel="left" className="rounded-[10px] border border-white/15 bg-navy-900/60 p-7">
          <p className="eyebrow text-teal-400">What you've built</p>
          <h3 className="mt-3 font-display text-[26px] font-medium text-white">Clinical Reputation.</h3>
          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {LEFT_ITEMS.map((item) => (
              <li
                key={item.label}
                data-item
                className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3 transition-all duration-300 data-[lit=true]:border-teal-400/40 data-[lit=true]:bg-teal-400/[0.06]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-navy-100/50 transition-colors duration-300 group-data-[lit=true]:border-teal-400/50 group-data-[lit=true]:text-teal-400">
                  {item.icon}
                </span>
                <span className="text-[13.5px] font-medium leading-snug text-navy-100/60 transition-colors duration-300 group-data-[lit=true]:text-white">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          {/* professional standing meter — pure visual, no figures */}
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-navy-100/50">
                Professional standing
              </span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-teal-400">
                Earned clinically
              </span>
            </div>
            <div className="mt-3 flex gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((seg) => (
                <span
                  key={seg}
                  data-item
                  className="h-1.5 flex-1 rounded-full bg-white/10 transition-colors duration-500 data-[lit=true]:bg-teal-400"
                />
              ))}
            </div>
          </div>
        </div>

        {/* CENTER — WardShift bridge */}
        <div className="flex flex-col items-center gap-5 lg:w-[280px]">
          <div className="flex w-full items-center justify-center gap-0">
            {/* left lane */}
            <span className="relative hidden h-0.5 flex-1 lg:block" aria-hidden="true">
              <span data-bridge="left" className="absolute inset-0 origin-right bg-teal-400/70" />
              <span
                data-node
                className="absolute -left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-teal-400/40 bg-navy-900 transition-all duration-300 data-[lit=true]:border-teal-400 data-[lit=true]:bg-teal-400 data-[lit=true]:shadow-[0_0_12px_rgba(45,212,191,0.7)]"
              />
              {[0, 1].map((i) => (
                <span
                  key={i}
                  data-pulse="left"
                  className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-teal-400 opacity-0 shadow-[0_0_8px_rgba(45,212,191,0.9)]"
                />
              ))}
            </span>

            {/* mark */}
            <span className="relative flex h-24 w-24 shrink-0 items-center justify-center">
              <span
                data-glow-ring
                className="absolute inset-0 rounded-full border border-teal-400/50 opacity-40"
                aria-hidden="true"
              />
              <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-teal-400 bg-navy-900 shadow-[0_0_36px_rgba(20,184,166,0.25)]">
                <img src="/logo-mark-light.webp" alt="" className="h-10 w-auto" />
              </span>
            </span>

            {/* right lane */}
            <span className="relative hidden h-0.5 flex-1 lg:block" aria-hidden="true">
              <span data-bridge="right" className="absolute inset-0 origin-left bg-teal-400/70" />
              <span
                data-node
                className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-teal-400/40 bg-navy-900 transition-all duration-300 data-[lit=true]:border-teal-400 data-[lit=true]:bg-teal-400 data-[lit=true]:shadow-[0_0_12px_rgba(45,212,191,0.7)]"
              />
              {[0, 1].map((i) => (
                <span
                  key={i}
                  data-pulse="right"
                  className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-teal-400 opacity-0 shadow-[0_0_8px_rgba(45,212,191,0.9)]"
                />
              ))}
            </span>
          </div>

          <p className="max-w-[260px] text-center text-[13.5px] leading-[1.6] text-navy-100/70">
            WardShift works here — bridging clinical expertise with patient discoverability.
          </p>

          {/* live-looking validation card */}
          <div
            data-referral
            className="flex items-center gap-3 rounded-lg border border-teal-400/30 bg-navy-800/80 px-4 py-3 shadow-[0_0_24px_rgba(20,184,166,0.12)]"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-400" />
            </span>
            <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-teal-100">
              Referral validated
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-400">
              <path d="m4.5 12.5 5 5L19.5 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* RIGHT — what patients see */}
        <div data-panel="right" className="rounded-[10px] border border-white/15 bg-navy-900/60 p-7">
          <p className="eyebrow text-teal-400">What patients see</p>
          <h3 className="mt-3 font-display text-[26px] font-medium text-white">
            Patient Discoverability.
          </h3>
          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {RIGHT_ITEMS.map((item) => (
              <li
                key={item}
                data-item
                className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3 transition-all duration-300 data-[lit=true]:border-teal-400/40 data-[lit=true]:bg-teal-400/[0.06]"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-white/15 transition-all duration-300 group-data-[lit=true]:bg-teal-400 group-data-[lit=true]:shadow-[0_0_8px_rgba(45,212,191,0.8)]"
                  aria-hidden="true"
                />
                <span className="text-[13.5px] font-medium leading-snug text-navy-100/60 transition-colors duration-300 group-data-[lit=true]:text-white">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          {/* discoverability meter — the side WardShift builds */}
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-navy-100/50">
                Digital presence
              </span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-teal-400">
                Built with WardShift
              </span>
            </div>
            <div className="mt-3 flex gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((seg) => (
                <span
                  key={seg}
                  data-item
                  className="h-1.5 flex-1 rounded-full bg-white/10 transition-colors duration-500 data-[lit=true]:bg-teal-400"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
