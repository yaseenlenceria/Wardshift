import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconBrowser,
  IconChatLoop,
  IconCompass,
  IconInbox,
  IconLayers,
  IconSearchLens,
  IconShield,
} from "@/components/icons";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ComponentType, SVGProps } from "react";

type ChannelId = "search" | "websites" | "ads" | "reputation" | "positioning" | "enquiry" | "crm";

const CHANNELS: { id: ChannelId; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { id: "search", label: "Search Visibility", icon: IconSearchLens },
  { id: "websites", label: "Websites", icon: IconBrowser },
  { id: "ads", label: "Ads", icon: IconLayers },
  { id: "reputation", label: "Reputation", icon: IconShield },
  { id: "positioning", label: "Positioning", icon: IconCompass },
  { id: "enquiry", label: "Enquiry Systems", icon: IconInbox },
  { id: "crm", label: "CRM", icon: IconChatLoop },
];

interface Objective {
  label: string;
  channels: ChannelId[];
  rationale: string;
}

const OBJECTIVES: Objective[] = [
  {
    label: "More appropriate enquiries",
    channels: ["search", "websites", "enquiry"],
    rationale:
      "Sharper condition and procedure pages plus a stronger search presence attract better-fit enquiries — and a designed enquiry journey converts them cleanly.",
  },
  {
    label: "More subspecialty cases",
    channels: ["positioning", "search", "websites"],
    rationale:
      "Subspecialty positioning, dedicated condition/procedure content and high-intent search work together to bring the specific cases you want more of.",
  },
  {
    label: "Visibility for a specific service",
    channels: ["search", "ads"],
    rationale:
      "Dedicated service content builds durable organic presence while targeted campaigns capture high-intent demand as rankings mature.",
  },
  {
    label: "Growth at a practice location",
    channels: ["search", "ads"],
    rationale:
      "Local search optimisation and geo-targeted campaigns concentrate visibility precisely where you want the practice to grow.",
  },
  {
    label: "Better referral validation",
    channels: ["reputation", "websites"],
    rationale:
      "A credible website and a strong name-search presence validate the referral when a patient looks you up before booking.",
  },
  {
    label: "Better enquiry conversion",
    channels: ["enquiry", "crm"],
    rationale:
      "A designed enquiry journey and disciplined follow-up convert more of the demand your practice already earns.",
  },
  {
    label: "Stronger professional reputation",
    channels: ["reputation", "positioning"],
    rationale:
      "Clear positioning and a managed professional presence strengthen what patients and referrers find when they research you.",
  },
  {
    label: "More measurable acquisition",
    channels: ["crm", "ads"],
    rationale:
      "Source tracking and reporting connect spend to booked outcomes, so acquisition becomes a measured system rather than a guess.",
  },
];

const DEFAULT_OBJECTIVE = "More subspecialty cases";

/**
 * Section 3 — interactive objective → channel mapper (dark section).
 * Selecting an objective chip highlights the channels that serve it and
 * cross-fades a rationale panel. Fully operable by keyboard (buttons).
 */
export default function ObjectiveMapper() {
  const [selected, setSelected] = useState(DEFAULT_OBJECTIVE);
  const active = OBJECTIVES.find((o) => o.label === selected) ?? OBJECTIVES[1];

  return (
    <div>
      {/* objective chips */}
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Choose a practice objective">
        {OBJECTIVES.map((objective) => {
          const isActive = objective.label === selected;
          return (
            <button
              key={objective.label}
              type="button"
              onClick={() => setSelected(objective.label)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-150",
                isActive
                  ? "border-teal-400 bg-teal-500 text-navy-950"
                  : "border-white/15 bg-white/5 text-navy-100/80 hover:border-teal-400/50 hover:text-white",
              )}
            >
              {objective.label}
            </button>
          );
        })}
      </div>

      {/* channel cards */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {CHANNELS.map((channel, i) => {
          const highlighted = active.channels.includes(channel.id);
          return (
            <motion.div
              key={channel.id}
              animate={
                highlighted
                  ? { y: -4, borderColor: "rgba(45,212,191,0.7)", backgroundColor: "#14305A" }
                  : { y: 0, borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(11,31,58,0.6)" }
              }
              transition={{ duration: 0.3, ease: EASE_OUT, delay: highlighted ? i * 0.1 : 0 }}
              className="rounded-[10px] border p-4"
            >
              <channel.icon
                className={cn("h-5 w-5 transition-colors duration-300", highlighted ? "text-teal-400" : "text-navy-100/40")}
              />
              <p
                className={cn(
                  "mt-3 text-[13px] font-semibold leading-snug transition-colors duration-300",
                  highlighted ? "text-white" : "text-navy-100/50",
                )}
              >
                {channel.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* rationale panel */}
      <div className="mt-6 min-h-[92px] rounded-[10px] border border-white/10 bg-navy-800/60 p-5 sm:min-h-[76px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-teal-400">
              Why these channels
            </p>
            <p className="mt-2 max-w-[68ch] text-[14.5px] leading-[1.65] text-navy-100/85">
              {active.rationale}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
