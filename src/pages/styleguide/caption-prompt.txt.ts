// /styleguide/caption-prompt.txt — ready-to-paste prompt for writing
// LinkedIn post text in the BiomEdit voice.
import type { APIRoute } from 'astro';
import { buildCaptionPrompt } from '../../data/styleguide/outputs';

export const prerender = true;
export const GET: APIRoute = () =>
  new Response(buildCaptionPrompt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
