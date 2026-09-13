import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Internal/reference pages that exist for dev use, not for search — kept
// out of the sitemap so they don't get indexed alongside real site content.
const EXCLUDED_FROM_SITEMAP = [/\/styleguide\/?$/, /\/content-modules\/?$/, /\/home-video\/?$/, /\/notes(\/|$)/, /\/series-c\/?$/];

export default defineConfig({
  site: 'https://biomedit.com',
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDED_FROM_SITEMAP.some((pattern) => pattern.test(page)),
    }),
  ],
});
