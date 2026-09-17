export const SITE_ORIGIN =
  (import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") || "https://www.wardshift.com");

export function absoluteSiteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalizedPath}`;
}
