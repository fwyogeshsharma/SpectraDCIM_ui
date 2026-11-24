import { defineConfig } from 'astro/config';

export default defineConfig({
  // Public address of the site. On Netlify the URL variable (the primary domain) is used; otherwise set SITE_URL when building for deployment (see deploy/deploy.sh).
  site: process.env.SITE_URL || process.env.URL || 'http://localhost:4321',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
