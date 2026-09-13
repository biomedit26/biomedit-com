import { config, fields, collection } from '@keystatic/core';

// CMS for the News section, backed by Keystatic Cloud: editors log in at
// the /keystatic route on the live site (https://biomedit.netlify.app for
// now, until DNS cuts over to biomedit.com) and edits are committed to
// GitHub on their behalf via the Keystatic GitHub App — no local dev
// server or git access needed on their end.
//
// Schema mirrors src/content/config.ts's `news` collection field-for-field
// — keep the two in sync if either changes.
const newsCategories = [
  { label: 'Press Release', value: 'press-release' },
  { label: 'Article', value: 'article' },
  { label: 'Event', value: 'event' },
  { label: 'In the News', value: 'in-the-news' },
  { label: 'Videos & Podcasts', value: 'videos-podcasts' },
];

export default config({
  storage: { kind: 'cloud' },
  cloud: { project: 'biomedit-web/biomedit-com' },
  collections: {
    news: collection({
      label: 'News',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      // Puts a "Preview" link in the entry editor pointed at the Netlify
      // branch deploy for the `preview` branch (set up in Netlify's
      // Branches and deploy contexts settings). Hardcoded to that one
      // branch rather than using Keystatic's {branch} token — Netlify
      // doesn't serve a matching `main--biomedit.netlify.app` alias for
      // the production branch, so a {branch}-templated URL would 404 the
      // moment someone previews from `main` instead of `preview`.
      previewUrl: 'https://preview--biomedit.netlify.app/news/{slug}',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
        category: fields.select({
          label: 'Category',
          options: newsCategories,
          defaultValue: 'article',
        }),
        secondaryCategory: fields.select({
          label: 'Secondary category (optional)',
          description: 'Lets one post also surface under a second filter pill on /news — e.g. a podcast episode that’s both Videos & Podcasts and In the News.',
          options: [{ label: 'None', value: '' }, ...newsCategories],
          defaultValue: '',
        }),
        image: fields.image({
          label: 'Image',
          description: 'Optional — leave blank to fall back to the video thumbnail or a placeholder. Uploads land in public/images/news and commit to the repo alongside the entry.',
          directory: 'public/images/news',
          publicPath: '/images/news/',
        }),
        imageAlt: fields.text({ label: 'Image alt text' }),
        lead: fields.text({ label: 'Lead / summary', multiline: true, validation: { isRequired: true } }),
        source: fields.text({ label: 'Source (third-party reposts only, e.g. "Feedstuffs (Informa Markets)")' }),
        videoUrl: fields.text({ label: 'Video URL (YouTube or direct file — embeds a player when set)' }),
        metaTitle: fields.text({ label: 'Meta title override (optional SEO)' }),
        metaDescription: fields.text({ label: 'Meta description override (optional SEO)', multiline: true }),
        content: fields.markdoc({
          label: 'Body',
          extension: 'md',
          // Inline images dropped into the body need an absolute /images/...
          // path (matching the hero `image` field above) — this collection
          // is flat one-file-per-post (no per-entry folder), so a relative
          // path Astro would try to resolve as a build-time import doesn't
          // have anywhere valid to resolve *from*, and breaks the entire
          // site build the moment one is inserted. An absolute path is
          // passed through as a literal URL instead, sidestepping that.
          options: {
            image: {
              directory: 'public/images/news',
              publicPath: '/images/news/',
            },
          },
        }),
      },
    }),
  },
});
