// /styleguide/tokens.json — design tokens as structured JSON, from tokens.css.
import type { APIRoute } from 'astro';
import { buildTokensJson } from '../../data/styleguide/outputs';

export const prerender = true;
export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildTokensJson(), null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
