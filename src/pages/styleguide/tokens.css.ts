// /styleguide/tokens.css — the same tokens as drop-in CSS custom properties.
import type { APIRoute } from 'astro';
import { buildTokensCss } from '../../data/styleguide/outputs';

export const prerender = true;
export const GET: APIRoute = () =>
  new Response(buildTokensCss(), { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
