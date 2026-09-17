import { useEffect } from "react";
import { absoluteSiteUrl } from "@/lib/site-url";

interface SeoProps {
  title: string;
  description: string;
  /** Canonical path, e.g. "/search-visibility/". */
  path: string;
  /** Optional JSON-LD schema object(s) injected into <head> while mounted. */
  schema?: object | object[];
  /** Emits a robots noindex tag — for the 404 route and other non-indexable pages. */
  noindex?: boolean;
  /** Open Graph content type. */
  type?: "website" | "article";
  /** ISO publication and modification dates for article pages. */
  publishedTime?: string;
  modifiedTime?: string;
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove();
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Per-route head manager: title, description, canonical, OG/Twitter tags, optional JSON-LD. */
export default function Seo({
  title,
  description,
  path,
  schema,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
}: SeoProps) {
  useEffect(() => {
    document.title = title;
    const url = absoluteSiteUrl(path);
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });
    upsertLink("canonical", url);
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    if (type === "article" && publishedTime) {
      upsertMeta('meta[property="article:published_time"]', {
        property: "article:published_time",
        content: publishedTime,
      });
    } else {
      removeMeta('meta[property="article:published_time"]');
    }
    if (type === "article" && modifiedTime) {
      upsertMeta('meta[property="article:modified_time"]', {
        property: "article:modified_time",
        content: modifiedTime,
      });
    } else {
      removeMeta('meta[property="article:modified_time"]');
    }
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: absoluteSiteUrl("/og-image.png"),
    });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: absoluteSiteUrl("/og-image.png"),
    });
  }, [title, description, path, noindex, type, publishedTime, modifiedTime]);

  // Inject per-route JSON-LD structured data; remove it again on unmount.
  useEffect(() => {
    if (!schema) return;
    const items = Array.isArray(schema) ? schema : [schema];
    const scripts = items.map((item) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-seo-schema", "");
      el.textContent = JSON.stringify(item);
      document.head.appendChild(el);
      return el;
    });
    return () => {
      scripts.forEach((el) => el.remove());
    };
  }, [schema]);

  return null;
}
