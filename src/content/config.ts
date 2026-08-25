import { defineCollection, z } from 'astro:content';

// Point your Obsidian vault at src/content/notes.
// Every markdown file you save there needs this frontmatter:
//
// ---
// title: "Some title"
// date: 2026-07-08
// summary: "One line, optional"
// ---

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
  }),
});

// News & Insights posts — one markdown file per post in src/content/news.
// `category` drives the pill filter on /news (press-release | article |
// event | in-the-news | videos-podcasts — `event` is defined but currently
// unused by any post; the Events top-level nav item is deferred, see
// design_handoff_field_notes). `secondaryCategory` lets one post also
// surface under a second filter pill (e.g. a podcast episode that's both
// Videos & Podcasts and In the News) without duplicating the file.
// `source` is only set for third-party reposts (e.g. "Feedstuffs (Informa
// Markets)") and is shown in place of the category label in the article
// hero. `image`/`imageAlt` are optional — posts without an assigned image
// fall back to a video-derived thumbnail (see videoUrl) or a plain
// placeholder. `videoUrl` accepts a YouTube URL (any common format) or a
// direct video file URL; when set, the article page embeds a real player
// instead of a text link. `metaTitle`/`metaDescription` are optional SEO
// overrides — metaTitle feeds the <title> tag (can be tighter than the
// on-page <h1>), metaDescription feeds <meta name="description"> and the
// Open Graph tags, falling back to `lead` when omitted.
const newsCategories = ['press-release', 'article', 'event', 'in-the-news', 'videos-podcasts'] as const;
const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(newsCategories),
    secondaryCategory: z.enum(newsCategories).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    lead: z.string(),
    source: z.string().optional(),
    videoUrl: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

export const collections = { notes, news };
