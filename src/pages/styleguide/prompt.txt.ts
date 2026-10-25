// /styleguide/prompt.txt — short ready-to-paste brief for AI tools.
import type { APIRoute } from 'astro';
import { buildPrompt } from '../../data/styleguide/outputs';

export const prerender = true;
export const GET: APIRoute = () =>
  new Response(buildPrompt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
