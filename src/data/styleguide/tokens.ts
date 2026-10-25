// Reads src/styles/tokens.css at build time and turns it into structured
// data for /styleguide and its generated files (styleguide.md,
// tokens.json, tokens.css, prompt.txt). Nothing here hard-codes a value:
// change tokens.css and every output follows on the next build.
import tokensCss from '../../styles/tokens.css?raw';

export interface Token {
  name: string;        // e.g. "--color-navy"
  value: string;       // as written in tokens.css, e.g. "#2B3682" or "var(--cool-100)"
  resolved: string;    // final value with var() references followed, e.g. "#F1F3F6"
}

function blockBody(css: string, selectorPattern: RegExp): string {
  const m = selectorPattern.exec(css);
  if (!m) return '';
  let depth = 0;
  const start = css.indexOf('{', m.index);
  for (let i = start; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) return css.slice(start + 1, i);
    }
  }
  return '';
}

function declarations(body: string): Record<string, string> {
  const out: Record<string, string> = {};
  const clean = body.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of clean.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

const rootDecls = declarations(blockBody(tokensCss, /^:root\s*\{/m));
const mobileDecls = declarations(blockBody(blockBody(tokensCss, /@media\s*\(max-width:\s*(\d+)px\)\s*\{/), /:root\s*\{/));
const darkDecls = declarations(blockBody(tokensCss, /\[data-theme="dark"\]\s*\{/));
export const mobileBreakpoint = Number(/@media\s*\(max-width:\s*(\d+)px\)/.exec(tokensCss)?.[1] ?? 0);

function resolve(value: string, scope: Record<string, string> = rootDecls, seen = new Set<string>()): string {
  return value.replace(/var\((--[\w-]+)\)/g, (_, name: string) => {
    if (seen.has(name)) return value;
    const next = scope[name] ?? rootDecls[name];
    return next ? resolve(next, scope, new Set([...seen, name])) : name;
  });
}

const tok = (name: string, value: string, scope = rootDecls): Token => ({ name, value, resolved: resolve(value, scope) });

export const allRootTokens: Token[] = Object.entries(rootDecls).map(([n, v]) => tok(n, v));

// ---- color ----------------------------------------------------------------

const brandNames = ['navy', 'teal', 'orange', 'green', 'amber'] as const;
export type BrandName = (typeof brandNames)[number];

export interface BrandColor {
  key: BrandName;
  light: Token;   // --color-navy
  dark: Token;    // --color-navy-dark (the dark-theme accent)
}

export const brandColors: BrandColor[] = brandNames
  .filter((k) => rootDecls[`--color-${k}`])
  .map((k) => ({
    key: k,
    light: tok(`--color-${k}`, rootDecls[`--color-${k}`]),
    dark: tok(`--color-${k}-dark`, rootDecls[`--color-${k}-dark`] ?? rootDecls[`--color-${k}`]),
  }));

export const deepNavy: Token | undefined = rootDecls['--navy-deep-bg'] ? tok('--navy-deep-bg', rootDecls['--navy-deep-bg']) : undefined;

export const neutrals: Token[] = Object.entries(rootDecls)
  .filter(([n]) => /^--cool-\d+$/.test(n))
  .map(([n, v]) => tok(n, v));

export interface SemanticPair { name: string; light: Token; dark: Token }
export const semanticPairs: SemanticPair[] = Object.keys(darkDecls).map((n) => ({
  name: n,
  light: tok(n, rootDecls[n] ?? ''),
  dark: tok(n, darkDecls[n], { ...rootDecls, ...darkDecls }),
}));

// ---- type -------------------------------------------------------------------

export interface TypeStep { name: string; desktop: number; mobile: number | null }
export const typeScale: TypeStep[] = Object.entries(rootDecls)
  .filter(([n]) => n.startsWith('--text-') && /px$/.test(rootDecls[n]))
  .map(([n, v]) => ({
    name: n,
    desktop: parseFloat(v),
    mobile: mobileDecls[n] ? parseFloat(mobileDecls[n]) : null,
  }))
  .sort((a, b) => b.desktop - a.desktop);

export const px = (name: string) => typeScale.find((s) => s.name === name)?.desktop ?? 0;

// Base element rules that aren't custom properties but are still decisions
// made in tokens.css (heading/body line-heights, font family).
const bodyRule = blockBody(tokensCss, /^p\s*\{/m);
const headingRule = blockBody(tokensCss, /^h1, h2, h3, h4, h5, h6\s*\{/m);
export const lineHeights = {
  heading: Number(/line-height:\s*([\d.]+)/.exec(headingRule)?.[1] ?? 0),
  body: Number(/line-height:\s*([\d.]+)/.exec(bodyRule)?.[1] ?? 0),
};
export const fontFamily = /font-family:\s*'([^']+)'/.exec(blockBody(tokensCss, /^body\s*\{/m))?.[1] ?? '';

// ---- helpers ----------------------------------------------------------------

export function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

function luminance([r, g, b]: [number, number, number]) {
  const lin = (c: number) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrastRatio(fg: string, bg: string): number {
  const a = hexToRgb(fg), b = hexToRgb(bg);
  if (!a || !b) return 0;
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100;
}

export const findToken = (name: string): Token | undefined => allRootTokens.find((t) => t.name === name);
export const hex = (name: string): string => (findToken(name)?.resolved ?? '').toUpperCase();

// Common foreground/background pairs, by token name, so the table follows
// the tokens. "AA" = 4.5:1 for normal text, 3:1 for large (24px+, or 19px+ bold).
const pairDefs: { fg: string; bg: string; use: string }[] = [
  { fg: '--cool-900', bg: '#FFFFFF', use: 'Headings on white' },
  { fg: '--cool-900', bg: '--cool-100', use: 'Headings and body on the page field' },
  { fg: '--cool-700', bg: '#FFFFFF', use: 'Secondary body copy on white' },
  { fg: '--cool-500', bg: '#FFFFFF', use: 'Captions on white' },
  { fg: '--cool-500', bg: '--cool-100', use: 'Captions on the page field' },
  { fg: '--color-navy', bg: '#FFFFFF', use: 'Links and navy text on white' },
  { fg: '--color-teal', bg: '#FFFFFF', use: 'Eyebrows and teal text on white' },
  { fg: '#FFFFFF', bg: '--color-navy', use: 'White text on navy buttons' },
  { fg: '#FFFFFF', bg: '--navy-deep-bg', use: 'White text on deep navy bands' },
  { fg: '#FFFFFF', bg: '--color-teal', use: 'White text on teal' },
  { fg: '#FFFFFF', bg: '--cool-800', use: 'White text on dark surfaces' },
  { fg: '--cool-900', bg: '--color-amber', use: 'Dark text on amber buttons' },
  { fg: '#FFFFFF', bg: '--color-amber', use: 'White text on amber (avoid)' },
  { fg: '--color-orange', bg: '#FFFFFF', use: 'Orange text on white' },
  { fg: '--color-green', bg: '#FFFFFF', use: 'Green text on white' },
  { fg: '--cool-300', bg: '--cool-800', use: 'Dark theme body copy' },
  { fg: '--color-navy-dark', bg: '--cool-900', use: 'Dark theme navy accent' },
  { fg: '--color-teal-dark', bg: '--cool-800', use: 'Dark theme teal accent' },
  { fg: '--color-teal-dark', bg: '--navy-deep-bg', use: 'Teal eyebrow on deep navy' },
];

const asHex = (v: string) => (v.startsWith('--') ? hex(v) : v.toUpperCase());

export const contrastPairs = pairDefs
  .filter((p) => asHex(p.fg) && asHex(p.bg))
  .map((p) => {
    const ratio = contrastRatio(asHex(p.fg), asHex(p.bg));
    return {
      ...p,
      fgHex: asHex(p.fg),
      bgHex: asHex(p.bg),
      ratio,
      aaNormal: ratio >= 4.5,
      aaLarge: ratio >= 3,
    };
  });
