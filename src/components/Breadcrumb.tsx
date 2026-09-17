import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { breadcrumbSchema } from "@/lib/schema";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  className?: string;
}

/** `Home / Section / Current` — Inter 13px, grey-500, current page navy-800. */
export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const { pathname } = useLocation();
  const schema = breadcrumbSchema(items, pathname);
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[13px]", className)}>
      {/* BreadcrumbList JSON-LD mirroring the visible trail below. */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-grey-300" aria-hidden="true" />}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="text-grey-500 transition-colors duration-150 hover:text-teal-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-navy-800">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
