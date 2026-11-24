// The list of pages for search engines, built from the files in src/pages.
import type { APIRoute } from 'astro';

// @ts-ignore
const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .map((f) => f.replace(/^\./, '').replace(/\.astro$/, '').replace(/\/index$/, ''))
  .filter((p) => p !== '/404')
  .map((p) => (p === '' ? '/' : p))
  .sort();

// Date each page's content last really changed (YYYY-MM-DD). Update a page's entry when you edit it;
// do not set dates that did not happen, search engines compare them with what they find on the page.
const DEFAULT_LASTMOD = '2026-11-23';
const lastmod: Record<string, string> = {
  // '/platform/power': '2026-12-02',
};

export const GET: APIRoute = ({ site }) => {
  const urls = pages
    .map((p) => `  <url><loc>${new URL(p === '/' ? p : `${p}/`, site).href}</loc><lastmod>${lastmod[p] ?? DEFAULT_LASTMOD}</lastmod></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
