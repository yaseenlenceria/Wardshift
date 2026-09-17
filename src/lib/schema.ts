/**
 * JSON-LD schema builders. All content comes from real on-page data
 * (breadcrumb trails, FAQ accordions, article metadata) — nothing invented.
 *
 * URLs use the public WardShift domain so Vercel preview URLs do not leak into
 * canonical structured data.
 */
import { absoluteSiteUrl } from "@/lib/site-url";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

function absoluteUrl(path: string): string {
  return absoluteSiteUrl(path);
}

/** BreadcrumbList matching the visible <Breadcrumb> trail. */
export function breadcrumbSchema(items: BreadcrumbItem[], currentPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href ?? currentPath),
    })),
  };
}

/** FAQPage built from a page's actual FAQ accordion data. */
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export interface ArticleSchemaMeta {
  path: string;
  title: string;
  standfirst: string;
  datePublished: string;
  dateModified: string;
}

/** Article schema for Insights articles, authored by the WardShift organization. */
export function articleSchema(meta: ArticleSchemaMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.standfirst,
    image: [absoluteUrl("/og-image.png")],
    author: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: "WardShift",
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: "WardShift",
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    inLanguage: "en-GB",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(meta.path),
    },
  };
}
