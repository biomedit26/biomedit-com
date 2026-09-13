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
        image: fields.text({ label: 'Image path (e.g. /images/example.jpg)', description: 'Optional — leave blank to fall back to the video thumbnail or a placeholder.' }),
        imageAlt: fields.text({ label: 'Image alt text' }),
        lead: fields.text({ label: 'Lead / summary', multiline: true, validation: { isRequired: true } }),
        source: fields.text({ label: 'Source (third-party reposts only, e.g. "Feedstuffs (Informa Markets)")' }),
        videoUrl: fields.text({ label: 'Video URL (YouTube or direct file — embeds a player when set)' }),
        metaTitle: fields.text({ label: 'Meta title override (optional SEO)' }),
        metaDescription: fields.text({ label: 'Meta description override (optional SEO)', multiline: true }),
        content: fields.markdoc({ label: 'Body', extension: 'md' }),
      },
    }),
  },
});
