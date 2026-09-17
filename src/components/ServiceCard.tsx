import { Link } from "react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  descriptor: string;
  href: string;
  className?: string;
}

/**
 * White card, hairline border, teal icon chip, whole card is a link.
 * Hover: lift + teal border + arrow nudge (CSS transitions, 200ms).
 */
export default function ServiceCard({ icon, title, descriptor, href, className }: ServiceCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group flex h-full flex-col rounded-[10px] border border-grey-300 bg-white p-6",
        "transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-card-hover",
        className,
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
        {icon}
      </span>
      <h3 className="mt-5 font-sans text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-navy-800">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-[1.65] text-grey-700">{descriptor}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-teal-600">
        Learn more
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
