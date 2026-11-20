// /styleguide.md — the whole style guide as one Markdown file, generated at
// build time from the same data as the /styleguide page.
import type { APIRoute } from 'astro';
import { buildMarkdown } from '../data/styleguide/outputs';

export const prerender = true;
export const GET: APIRoute = () =>
  new Response(buildMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
