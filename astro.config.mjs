import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

// Internal/reference pages that exist for dev use, not for search — kept
// out of the sitemap so they don't get indexed alongside real site content.
const EXCLUDED_FROM_SITEMAP = [/\/styleguide\/?$/, /\/content-modules\/?$/, /\/home-video\/?$/, /\/notes(\/|$)/, /\/series-c\/?$/, /\/keystatic(\/|$)/];

// Keystatic's admin UI needs a non-static route, which Astro 4 only allows
// under 'hybrid'/'server' output — hybrid keeps every other route static
// (prerendered at build time, same as before) and only opts Keystatic's
// own routes into server rendering. That requires a deploy adapter for
// `astro build`; since the site already deploys to Netlify, @astrojs/
// netlify's default (Netlify Functions) mode handles that with no changes
// to netlify.toml. Now that the CMS is on Keystatic Cloud (real login,
// not local-storage mode), it's safe to expose /keystatic in production —
// editors authenticate there directly rather than needing a local dev
// server.
export default defineConfig({
  site: 'https://biomedit.com',
  output: 'hybrid',
  adapter: netlify(),
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDED_FROM_SITEMAP.some((pattern) => pattern.test(page)),
    }),
    react(),
    keystatic(),
  ],
});
