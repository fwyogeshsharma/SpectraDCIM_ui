// Tell Bing and other IndexNow search engines that the pages changed, so they crawl them quickly.
// Run AFTER the site is deployed (the key file must be live):  node scripts/indexnow.mjs https://spectradcim.com
import { readdirSync, readFileSync } from 'node:fs';

const site = (process.argv[2] || process.env.SITE_URL || '').replace(/\/$/, '');
if (!site) { console.error('Usage: node scripts/indexnow.mjs https://yourdomain.com'); process.exit(1); }

const keyFile = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) { console.error('No IndexNow key file found in public/.'); process.exit(1); }
const key = keyFile.replace('.txt', '');
const keyLocation = `${site}/${keyFile}`;

// The key file must be reachable on the live site, or the search engines reject the request.
const live = await fetch(keyLocation).then((r) => (r.ok ? r.text() : ''));
if (live.trim() !== key) { console.error(`Key file not live yet at ${keyLocation}. Deploy first.`); process.exit(1); }

const xml = readFileSync('dist/sitemap.xml', 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList }),
});
console.log(`Submitted ${urlList.length} URLs: HTTP ${res.status} (200/202 = accepted)`);
