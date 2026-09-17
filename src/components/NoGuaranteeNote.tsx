import { cn } from "@/lib/utils";

/**
 * Caption line used on SEO / Ads and measurement-related pages.
 */
export default function NoGuaranteeNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-[13px] leading-relaxed tracking-[0.01em] text-grey-500", className)}>
      We never guarantee rankings, positions, or patient volume.
    </p>
  );
}
