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
// event). `source` is only set for third-party reposts (e.g. "Feedstuffs
// (Informa Markets)") and is shown in place of the category label in the
// article hero.
const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['press-release', 'article', 'event']),
    image: z.string(),
    imageAlt: z.string(),
    lead: z.string(),
    source: z.string().optional(),
  }),
});

export const collections = { notes, news };
