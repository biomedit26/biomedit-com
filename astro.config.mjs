import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';
import rehypeExternalLinks from 'rehype-external-links';

// Internal/reference pages that exist for dev use, not for search — kept
// out of the sitemap so they don't get indexed alongside real site content.
const EXCLUDED_FROM_SITEMAP = [/\/styleguide(\/.*|\.md)?$/, /\/content-modules\/?$/, /\/home-video\/?$/, /\/notes(\/|$)/, /\/series-c\/?$/, /\/keystatic(\/|$)/, /\/contact-us\/thank-you\/?$/];

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
  // www is the primary domain in Netlify (the bare domain 301s to it), so
  // canonical tags, Open Graph URLs and the sitemap all use www.
  site: 'https://www.biomedit.com',
  // Pre-relaunch addresses. The old site kept news articles at the root
  // (/<slug>/); they now live at /news/<slug>/ with the same slug. Old
  // section pages map to their closest equivalent. Netlify serves these
  // as 301s, so inbound links, search results and old emails keep working.
  redirects: {
    '/home': '/',
    '/about-us': '/about/',
    '/our-people': '/team/',
    '/our-science': '/science/',
    '/biomedit-secures-foundational-patents-for-engineered-probiotic-platform-positioned-to-redefine-animal-health': '/news/biomedit-secures-foundational-patents-for-engineered-probiotic-platform-positioned-to-redefine-animal-health/',
    '/biomedit-initiates-final-field-safety-trial-for-non-antibiotic-poultry-biologic-advancing-toward-usda-conditional-licensure': '/news/biomedit-initiates-final-field-safety-trial-for-non-antibiotic-poultry-biologic-advancing-toward-usda-conditional-licensure/',
    '/biomedit-announces-usda-finding-of-no-significant-impact-letter-for-non-antibiotic-poultry-biologic-clearing-path-to-field-safety-trials': '/news/biomedit-announces-usda-finding-of-no-significant-impact-letter-for-non-antibiotic-poultry-biologic-clearing-path-to-field-safety-trials/',
    '/biomedit-awarded-nearly-2-million-from-bezos-earth-fund-to-advance-ai-model-for-methane-reduction-strategies-in-cattle': '/news/biomedit-awarded-nearly-2-million-from-bezos-earth-fund-to-advance-ai-model-for-methane-reduction-strategies-in-cattle/',
    '/biomedit-advances-first-of-its-kind-engineered-bacteria-product-to-final-development-phase-secures-series-b-funding-and-adds-key-industry-leadership': '/news/biomedit-advances-first-of-its-kind-engineered-bacteria-product-to-final-development-phase-secures-series-b-funding-and-adds-key-industry-leadership/',
    '/ceo-aaron-schacht-speaks-at-ferment-conference': '/news/ceo-aaron-schacht-speaks-at-ferment-conference/',
    '/how-it-works-pipeline-project-be-101': '/news/how-it-works-pipeline-project-be-101/',
    '/biomedit-announces-advancement-of-a-first-of-its-kind-engineered-bacteria-product-into-full-pivotal-development-to-combat-necrotic-enteritis-in-broiler-chickens': '/news/biomedit-announces-advancement-of-a-first-of-its-kind-engineered-bacteria-product-into-full-pivotal-development-to-combat-necrotic-enteritis-in-broiler-chickens/',
    '/biomedits-aaron-schacht-named-visionary-ceo-in-sp-global-animal-health-awards': '/news/biomedits-aaron-schacht-named-visionary-ceo-in-sp-global-animal-health-awards/',
    '/researchers-of-new-scientific-review-paper-call-for-additional-research-to-fill-critical-gaps-in-understanding-methane-producing-microbes-in-gut-of-livestock': '/news/researchers-of-new-scientific-review-paper-call-for-additional-research-to-fill-critical-gaps-in-understanding-methane-producing-microbes-in-gut-of-livestock/',
    '/biomedit-awarded-grant-to-develop-microbiome-based-solution-to-reduce-methane-emissions-and-enhance-production-efficiency-of-cattle-in-africa-and-south-asia': '/news/biomedit-awarded-grant-to-develop-microbiome-based-solution-to-reduce-methane-emissions-and-enhance-production-efficiency-of-cattle-in-africa-and-south-asia/',
    '/athian-and-biomedit-announce-first-of-its-kind-collaboration-to-develop-sustainability-protocols-and-products-in-parallel': '/news/athian-and-biomedit-announce-first-of-its-kind-collaboration-to-develop-sustainability-protocols-and-products-in-parallel/',
    '/indiana-biosciences-research-institute-and-biomedit-announce-integrated-drug-discovery-collaboration': '/news/indiana-biosciences-research-institute-and-biomedit-announce-integrated-drug-discovery-collaboration/',
    '/the-ios-of-synthetic-biology-is-here-and-thanks-to-this-incubator-the-apps-are-rolling-in': '/news/the-ios-of-synthetic-biology-is-here-and-thanks-to-this-incubator-the-apps-are-rolling-in/',
    '/nutreco-invests-in-biomedit-strengthening-its-partnership-to-transform-feed-additives-through-biome-actives': '/news/nutreco-invests-in-biomedit-strengthening-its-partnership-to-transform-feed-additives-through-biome-actives/',
    '/microbiome-biotech-company-biomedit-appoints-chairman-and-board-of-directors': '/news/microbiome-biotech-company-biomedit-appoints-chairman-and-board-of-directors/',
    '/groundbreaking-collaboration-between-nutreco-and-biomedit-aims-to-transform-feed-additives-through-microbiome-technology': '/news/groundbreaking-collaboration-between-nutreco-and-biomedit-aims-to-transform-feed-additives-through-microbiome-technology/',
    '/biomedit-acquires-folium-science-technology-and-pipeline-assets-to-expand-programmable-veterinary-biologics-capabilities': '/news/biomedit-acquires-folium-science-technology-and-pipeline-assets-to-expand-programmable-veterinary-biologics-capabilities/',
  },
  output: 'hybrid',
  adapter: netlify(),
  markdown: {
    // Every link in news article bodies (Content collections, e.g.
    // src/content/news/*.md) that points off-site opens in a new tab —
    // applies automatically to every post, current and future, rather
    // than needing target="_blank" hand-added to each markdown link.
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDED_FROM_SITEMAP.some((pattern) => pattern.test(page)),
    }),
    react(),
    keystatic(),
  ],
});
