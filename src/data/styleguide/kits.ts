// Download kits for /styleguide, zipped at build time by
// src/pages/styleguide/kits/[kit].zip.ts from files already in public/.
// Each kit is sized for one job, so a marketer downloads one thing and has
// everything for it, including a START-HERE.txt that says what's inside.
import { graphics, coreGraphics, socialGraphics } from './graphics';

const A = '/styleguide/assets/';

export interface LogoFile { file: string; label: string; use: string; bg: string; preview?: boolean }
/** Every logo and E mark file, in display order. `bg` is the ground shown behind the preview. */
export const logoFiles: LogoFile[] = [
  { file: `${A}biomedit-logo-colour.svg`, label: 'Logo, full colour (SVG)', use: 'On white and light grounds. Web, slides, documents.', bg: '#FFFFFF', preview: true },
  { file: `${A}biomedit-logo-colour.png`, label: 'Logo, full colour (PNG)', use: 'Where SVG is not supported: email, social tools, Canva.', bg: '#FFFFFF' },
  { file: `${A}biomedit-logo-white.svg`, label: 'Logo, white (SVG)', use: 'On deep blue, dark grounds and the dark graphics.', bg: '#262E62', preview: true },
  { file: `${A}biomedit-logo-white.png`, label: 'Logo, white (PNG)', use: 'White, where SVG is not supported.', bg: '#262E62' },
  { file: `${A}biomedit-mark-colour.svg`, label: 'E mark, full colour (SVG)', use: 'When the full logo would fall under 28px tall, or the name is already on screen.', bg: '#FFFFFF', preview: true },
  { file: `${A}biomedit-mark-colour.png`, label: 'E mark, full colour (PNG)', use: 'E mark on light grounds, transparent background.', bg: '#FFFFFF' },
  { file: `${A}biomedit-mark-white.svg`, label: 'E mark, white (SVG)', use: 'E mark on dark grounds.', bg: '#262E62', preview: true },
  { file: `${A}biomedit-mark-white.png`, label: 'E mark, white (PNG)', use: 'E mark on dark grounds, transparent background.', bg: '#262E62' },
  { file: `${A}biomedit-mark-square-navy.png`, label: 'Square E mark, deep blue (PNG, 1024px)', use: 'Profile pictures and app icons. Upload as is; platforms crop to a circle cleanly.', bg: '#2B3682', preview: true },
  { file: `${A}biomedit-mark-square-deepnavy.png`, label: 'Square E mark, deep navy (PNG, 1024px)', use: 'Profile pictures on dark-mode-heavy platforms.', bg: '#262E62', preview: true },
  { file: `${A}biomedit-mark-square-teal.png`, label: 'Square E mark, teal (PNG, 1024px)', use: 'Event and campaign avatars.', bg: '#0369B2', preview: true },
  { file: `${A}biomedit-mark-square-colour.png`, label: 'Square E mark, white (PNG, 1024px)', use: 'Profile pictures where a light avatar is needed.', bg: '#FFFFFF', preview: true },
  { file: `${A}biomedit-mark-square-navy.svg`, label: 'Square E mark, deep blue (SVG)', use: 'Square mark as a vector.', bg: '#2B3682' },
  { file: `${A}biomedit-mark-square-deepnavy.svg`, label: 'Square E mark, deep navy (SVG)', use: 'Square mark as a vector.', bg: '#262E62' },
  { file: `${A}biomedit-mark-square-teal.svg`, label: 'Square E mark, teal (SVG)', use: 'Square mark as a vector.', bg: '#0369B2' },
  { file: `${A}biomedit-mark-square-colour.svg`, label: 'Square E mark, white (SVG)', use: 'Square mark as a vector.', bg: '#FFFFFF' },
];

const pngLogos = logoFiles.filter((l) => l.file.endsWith('.png')).map((l) => l.file);
const allLogos = logoFiles.map((l) => l.file);

/** A file in the kit: a public/ path, placed in `dir` inside the zip. */
export interface KitFile { src: string; dir: string }
/** A generated text file (filled in by the endpoint from outputs.ts). */
export type Generated = 'prompt' | 'caption-prompt' | 'start-here';

export interface Kit {
  id: string;
  name: string;
  summary: string;
  for: string;
  files: KitFile[];
  generated: Generated[];
}

const put = (dir: string) => (src: string): KitFile => ({ src, dir });
const aiPicks = [
  'biomedit-linkedin-post-1200x627-emberorange-peak',
  'biomedit-linkedin-square-1200x1200-navyamber-target',
  'biomedit-social-square-1080x1080-deepblue-target',
  'biomedit-social-portrait-1080x1350-deepbluewarm-converge',
];

export const kits: Kit[] = [
  {
    id: 'social',
    name: 'Social and LinkedIn kit',
    summary: 'Logos, E marks and all 12 backgrounds cut to LinkedIn and Instagram sizes, as ready-to-use PNGs.',
    for: 'Canva, PowerPoint, LinkedIn and Instagram',
    files: [
      ...pngLogos.map(put('logos')),
      ...socialGraphics.map((g) => put('backgrounds')(g.files.fullBleed)),
    ],
    generated: ['start-here', 'caption-prompt'],
  },
  {
    id: 'ai',
    name: 'AI starter kit',
    summary: 'The brand prompt, the caption prompt, the logos and four backgrounds. Small enough to upload to ChatGPT, Claude or Copilot in one go.',
    for: 'ChatGPT, Claude, Copilot, Gemini',
    files: [
      ...[`${A}biomedit-logo-colour.png`, `${A}biomedit-logo-white.png`, `${A}biomedit-mark-colour.png`, `${A}biomedit-mark-white.png`].map(put('logos')),
      ...aiPicks.map((n) => graphics.find((g) => g.name === n)!).map((g) => put('backgrounds')(g.files.fullBleed)),
    ],
    generated: ['start-here', 'prompt', 'caption-prompt'],
  },
  {
    id: 'slides',
    name: 'Slides kit',
    summary: 'Logos plus all 18 16:9 backgrounds, as full-bleed PNGs (drop in as a slide background) and SVGs.',
    for: 'PowerPoint, Keynote, Google Slides',
    files: [
      ...allLogos.filter((f) => !f.includes('square')).map(put('logos')),
      ...coreGraphics.map((g) => put('backgrounds-png')(g.files.fullBleed)),
      ...coreGraphics.map((g) => put('backgrounds-svg')(g.files.svg)),
    ],
    generated: ['start-here'],
  },
  {
    id: 'logos',
    name: 'Logo kit',
    summary: 'Every logo and E mark file: full colour and white, SVG and PNG, plus square avatars.',
    for: 'Any tool',
    files: allLogos.map(put('logos')),
    generated: ['start-here'],
  },
  {
    id: 'everything',
    name: 'Everything',
    summary: 'All logos and all 30 graphics in every format (SVG, recolorable SVG, transparent PNG, full-bleed PNG), with the graphics README.',
    for: 'Designers and developers',
    files: [
      ...allLogos.map(put('logos')),
      put('graphics')('/graphics/README.md'),
      ...graphics.flatMap((g) => {
        const sub = g.category === 'social' ? 'graphics/social/' : 'graphics/';
        return [
          put(`${sub}svg`)(g.files.svg), put(`${sub}svg-themeable`)(g.files.svgThemeable),
          put(`${sub}png`)(g.files.png), put(`${sub}full-bleed`)(g.files.fullBleed),
        ];
      }),
    ],
    generated: ['start-here', 'prompt', 'caption-prompt'],
  },
];

export const kitUrl = (k: Kit) => `/styleguide/kits/biomedit-${k.id}-kit.zip`;
