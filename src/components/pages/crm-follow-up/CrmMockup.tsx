import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Download, FileText, Inbox, LayoutGrid, Sparkles } from "lucide-react";
import IllustrativeBadge from "@/components/IllustrativeBadge";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { label: "Inbox", icon: Inbox },
  { label: "New", icon: Sparkles },
  { label: "Contacted", icon: FileText },
  { label: "Appointment Requested", icon: CalendarDays },
  { label: "Booked", icon: LayoutGrid },
  { label: "Reports", icon: FileText },
];

type Source = "GOOGLE ADS" | "ORGANIC SEARCH" | "REFERRAL";

interface EnquiryRow {
  initials: string;
  source: Source;
  stage: string;
  altStage?: string; // stage this row advances to on the loop
  reminder: string;
  notes: number;
}

const ROWS: EnquiryRow[] = [
  { initials: "J.M.", source: "GOOGLE ADS", stage: "Contacted", altStage: "Appointment Requested", reminder: "Follow up 14:00", notes: 3 },
  { initials: "R.K.", source: "ORGANIC SEARCH", stage: "New", reminder: "Acknowledge", notes: 1 },
  { initials: "S.T.", source: "REFERRAL", stage: "Booked", reminder: "Pre-visit pack", notes: 5 },
  { initials: "A.B.", source: "ORGANIC SEARCH", stage: "Appointment Requested", reminder: "Confirm slot", notes: 2 },
];

const SOURCE_STYLES: Record<Source, string> = {
  "GOOGLE ADS": "border-navy-800/20 bg-navy-800/5 text-navy-800",
  "ORGANIC SEARCH": "border-teal-600/30 bg-teal-100/60 text-teal-600",
  REFERRAL: "border-grey-300 bg-grey-100 text-grey-700",
};

/**
 * Code-built WardShift CRM interface mockup — fictional data, initials only.
 * One row's stage pill advances ("Contacted → Appointment Requested") on a
 * 5s loop with a teal highlight flash. Reduced motion renders it statically.
 */
function CrmMockup() {
  const reduced = usePrefersReducedMotion();
  const [advanced, setAdvanced] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setAdvanced((v) => !v), 5000);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="w-full">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 40 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
        className="overflow-hidden rounded-[10px] border border-grey-300 bg-white shadow-card"
        role="img"
        aria-label="Illustrative WardShift CRM interface showing a fictional practice enquiry workflow"
      >
        {/* window chrome / top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-grey-100 bg-paper px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-grey-300" aria-hidden="true" />
            <span className="h-2 w-2 rounded-full bg-grey-300" aria-hidden="true" />
            <span className="h-2 w-2 rounded-full bg-teal-500/60" aria-hidden="true" />
            <span className="ml-2 text-[13px] font-semibold text-navy-800">Practice Enquiries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-md border border-grey-300 bg-white px-2.5 py-1.5 font-mono text-[10px] text-grey-500 sm:inline-flex">
              <CalendarDays className="h-3 w-3" aria-hidden="true" />
              Last 30 days
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-navy-800 px-2.5 py-1.5 font-mono text-[10px] font-medium text-white">
              <Download className="h-3 w-3" aria-hidden="true" />
              Export report
            </span>
          </div>
        </div>

        <div className="flex">
          {/* sidebar */}
          <div className="hidden w-[168px] shrink-0 border-r border-grey-100 bg-paper/60 p-3 md:block">
            <ul className="space-y-1">
              {SIDEBAR_ITEMS.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={reduced ? undefined : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.6 + i * 0.06 }}
                >
                  <span
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] font-medium",
                      i === 0 ? "bg-white text-navy-800 shadow-xs" : "text-grey-500",
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* main table */}
          <div className="min-w-0 flex-1 p-3 sm:p-4">
            <div className="hidden grid-cols-[1fr_112px_140px_120px_52px] gap-3 px-3 pb-2 font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-grey-500 sm:grid">
              <span>Enquiry</span>
              <span>Source</span>
              <span>Stage</span>
              <span>Follow-up</span>
              <span className="text-right">Notes</span>
            </div>
            <ul className="space-y-2">
              {ROWS.map((row, i) => {
                const isAdvancing = row.altStage !== undefined;
                const stage = isAdvancing && advanced ? row.altStage! : row.stage;
                return (
                  <motion.li
                    key={row.initials}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.7 + i * 0.06 }}
                    className="grid grid-cols-2 items-center gap-2 rounded-lg border border-grey-100 bg-white px-3 py-2.5 sm:grid-cols-[1fr_112px_140px_120px_52px] sm:gap-3"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 font-mono text-[9.5px] font-medium text-white">
                        {row.initials}
                      </span>
                      <span className="hidden h-1.5 w-10 rounded bg-grey-100 lg:block" aria-hidden="true" />
                    </span>
                    <span>
                      <span
                        className={cn(
                          "inline-block rounded-full border px-2 py-0.5 font-mono text-[8.5px] font-medium tracking-[0.08em]",
                          SOURCE_STYLES[row.source],
                        )}
                      >
                        {row.source}
                      </span>
                    </span>
                    <span>
                      <motion.span
                        key={stage}
                        initial={reduced ? false : { backgroundColor: "rgba(204,251,241,1)" }}
                        animate={reduced ? undefined : { backgroundColor: "rgba(237,241,245,1)" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                          stage === "Booked" ? "text-teal-600" : "text-navy-800",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            stage === "Booked" ? "bg-teal-500" : "bg-navy-800/40",
                          )}
                          aria-hidden="true"
                        />
                        {stage}
                      </motion.span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11.5px] text-grey-500">
                      <Clock className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                      {row.reminder}
                    </span>
                    <span className="text-right font-mono text-[11px] text-grey-500">
                      {row.notes}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* label bar */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="mt-3 flex flex-wrap items-center justify-between gap-2"
      >
        <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-grey-500">
          Illustrative workflow — actual configuration varies by practice.
        </p>
        <IllustrativeBadge className="border-grey-300 px-2 py-0.5 text-[9px]" />
      </motion.div>
    </div>
  );
}

export default memo(CrmMockup);
