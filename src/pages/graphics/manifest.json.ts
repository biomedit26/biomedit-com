// /graphics/manifest.json — machine-readable list of the background
// graphics in public/graphics/ (one entry per graphic, with its paired
// background, text tone, files and theming variables), as specified in
// public/graphics/README.md. Built from src/data/styleguide/graphics.ts; the
// theming defaults are read from each svg-themeable file at build time.
import fs from 'node:fs';
import path from 'node:path';
import type { APIRoute } from 'astro';
import { graphics } from '../../data/styleguide/graphics';

export const prerender = true;

const site = 'https://www.biomedit.com';
const tokenName: Record<string, string> = {
  'deep-blue': '--color-deep-blue', teal: '--color-teal', 'ember-orange': '--color-ember-orange',
  amber: '--color-amber', green: '--color-green', navyDeepBg: '--color-navy-deep', white: '--color-white',
};
const token = (t: string) => tokenName[t] ?? `--color-${t}`;

function themingVars(file: string): Record<string, string> {
  const svg = fs.readFileSync(path.join(process.cwd(), 'public', file), 'utf8');
  const vars: Record<string, string> = {};
  for (const m of svg.matchAll(/var\((--[\w-]+),\s*(#[0-9A-Fa-f]{3,8})\)/g)) vars[m[1]] ??= m[2].toUpperCase();
  return vars;
}

export const GET: APIRoute = () => {
  const entries = graphics.map((g) => {
    const variables = themingVars(g.files.svgThemeable);
    const duo = '--flow-color' in variables;
    const abs = (p: string) => `${site}${p}`;
    return {
      name: g.name,
      label: g.label,
      category: g.category,
      ...(g.format ? { format: g.format } : {}),
      background: { token: token(g.bgToken), figmaVariable: g.bgToken, hex: g.bgHex },
      graphicColors: g.graphicColors,
      tone: g.tone,
      textColor: g.tone === 'dark' ? '#FFFFFF' : '#1C1F28',
      size: g.size,
      focus: g.focus,
      files: {
        svg: abs(g.files.svg),
        svgThemeable: abs(g.files.svgThemeable),
        png: abs(g.files.png),
        fullBleed: abs(g.files.fullBleed),
      },
      theming: { mode: duo ? 'duotone' : 'multicolor', variables, maskSafe: duo },
    };
  });
  const body = {
    $about: 'BiomEdit flowing-data background graphics. Always pair a transparent file with its background color, or use the full-bleed PNG. Dark tone takes white text; light tone takes #1C1F28 text.',
    styleguide: `${site}/styleguide/`,
    readme: `${site}/graphics/README.md`,
    graphics: entries,
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
