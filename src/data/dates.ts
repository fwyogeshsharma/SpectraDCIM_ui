// Date (YYYY-MM-DD) each page's content last really changed. Used by the sitemap, the page's structured data
// and the "Last updated" line in the footer. Update a page's entry when you edit it; never set a date that
// did not happen, search engines compare it with what they find on the page.
export const DEFAULT_LASTMOD = '2026-11-23';
export const lastmod: Record<string, string> = {
  // '/platform/power': '2026-12-02',
};
export const lastmodFor = (path: string): string => lastmod[path] ?? DEFAULT_LASTMOD;
