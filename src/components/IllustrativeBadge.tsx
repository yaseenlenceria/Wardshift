import { cn } from "@/lib/utils";

/**
 * Compliance pill placed on any mock interface or visual showing numbers.
 */
export default function IllustrativeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-grey-500/50 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-grey-500",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />
      Illustrative example — sample data
    </span>
  );
}
