// The flowing-data background graphics in public/graphics/ (see its
// README.md, the source of truth for pairings). One entry per graphic,
// used by the style guide's asset library and post builder, the
// /graphics/manifest.json endpoint and the download kits. File names encode
// the background pairing, so paths are derived from `name`, never typed.

export type Tone = 'dark' | 'light';
export type Category = 'duotone' | 'multicolor' | 'neutral' | 'social';
/** Where text sits best on the graphic, away from its focal point. */
export type TextSide = 'left' | 'right' | 'top' | 'bottom';

export interface Graphic {
  name: string;
  category: Category;
  label: string;
  bgToken: string;   // Figma Surface variable
  bgHex: string;
  graphicColors: string[];
  tone: Tone;
  size: [number, number];
  focus: string | null;
  /** Social crops only: what the size is for. */
  format?: string;
  /** Default text side in the post builder. */
  textSide: TextSide;
  files: { svg: string; svgThemeable: string; png: string; fullBleed: string; thumb: string };
}

type Row = Omit<Graphic, 'files' | 'size' | 'focus' | 'textSide'> & { size?: [number, number]; focus?: string; textSide?: TextSide };

const core = (r: Row): Graphic => ({
  size: [1920, 1080], focus: null, textSide: 'left', ...r,
  files: {
    svg: `/graphics/svg/${r.name}.svg`,
    svgThemeable: `/graphics/svg-themeable/${r.name}.svg`,
    png: `/graphics/png/${r.name}.png`,
    fullBleed: `/graphics/full-bleed/${r.name}-fullbleed.png`,
    thumb: `/styleguide/thumbs/${r.name}.webp`,
  },
});
const social = (r: Row & { size: [number, number]; focus: string; format: string; textSide: TextSide }): Graphic => ({
  ...r,
  category: 'social',
  files: {
    svg: `/graphics/social/svg/${r.name}.svg`,
    svgThemeable: `/graphics/social/svg-themeable/${r.name}.svg`,
    png: `/graphics/social/png/${r.name}.png`,
    fullBleed: `/graphics/social/full-bleed/${r.name}-fullbleed.png`,
    thumb: `/styleguide/thumbs/${r.name}.webp`,
  },
});

export const graphics: Graphic[] = [
  // Brand duotones
  core({ name: 'biomedit-flow-duotone-deepblue-white', category: 'duotone', label: 'Deep blue', bgToken: 'deep-blue', bgHex: '#2B3682', graphicColors: ['white'], tone: 'dark' }),
  core({ name: 'biomedit-flow-duotone-teal-white', category: 'duotone', label: 'Teal', bgToken: 'teal', bgHex: '#0369B2', graphicColors: ['white'], tone: 'dark' }),
  core({ name: 'biomedit-flow-duotone-emberorange-white', category: 'duotone', label: 'Ember orange', bgToken: 'ember-orange', bgHex: '#DA6A2A', graphicColors: ['white'], tone: 'dark' }),
  core({ name: 'biomedit-flow-duotone-navy-amber', category: 'duotone', label: 'Navy and amber', bgToken: 'navyDeepBg', bgHex: '#262E62', graphicColors: ['amber'], tone: 'dark' }),
  core({ name: 'biomedit-flow-duotone-green-white', category: 'duotone', label: 'Green', bgToken: 'green', bgHex: '#16A34A', graphicColors: ['white'], tone: 'dark' }),
  core({ name: 'biomedit-flow-duotone-amber-ink', category: 'duotone', label: 'Amber and ink', bgToken: 'amber', bgHex: '#F59E0B', graphicColors: ['gray-900'], tone: 'light' }),
  // Multicolor
  core({ name: 'biomedit-flow-spectrum-white-fullcolor', category: 'multicolor', label: 'Full spectrum, light', bgToken: 'white', bgHex: '#FFFFFF', graphicColors: ['deep-blue', 'teal', 'ember-orange', 'amber', 'green', 'grays'], tone: 'light' }),
  core({ name: 'biomedit-flow-warm-gray100-emberamber', category: 'multicolor', label: 'Warm, light', bgToken: 'gray-100', bgHex: '#F1F3F6', graphicColors: ['ember-orange', 'amber', 'deep-blue', 'grays'], tone: 'light' }),
  core({ name: 'biomedit-flow-cool-white-bluetealgreen', category: 'multicolor', label: 'Cool, light', bgToken: 'white', bgHex: '#FFFFFF', graphicColors: ['deep-blue', 'teal', 'green', 'grays'], tone: 'light' }),
  core({ name: 'biomedit-flow-spectrum-navy-brights', category: 'multicolor', label: 'Brights on navy', bgToken: 'navyDeepBg', bgHex: '#262E62', graphicColors: ['teal', 'amber', 'ember-orange', 'green', 'white'], tone: 'dark' }),
  core({ name: 'biomedit-flow-spectrum-gray900-fullcolor', category: 'multicolor', label: 'Full spectrum, ink', bgToken: 'gray-900', bgHex: '#1C1F28', graphicColors: ['deep-blue', 'teal', 'ember-orange', 'amber', 'green', 'white'], tone: 'dark' }),
  core({ name: 'biomedit-flow-warm-deepblue-amberember', category: 'multicolor', label: 'Warm on deep blue', bgToken: 'deep-blue', bgHex: '#2B3682', graphicColors: ['amber', 'ember-orange', 'teal', 'white'], tone: 'dark' }),
  // Neutral
  core({ name: 'biomedit-flow-neutral-white-gray700', category: 'neutral', label: 'Gray on white', bgToken: 'white', bgHex: '#FFFFFF', graphicColors: ['gray-700'], tone: 'light' }),
  core({ name: 'biomedit-flow-neutral-gray100-gray800', category: 'neutral', label: 'Gray on gray-100', bgToken: 'gray-100', bgHex: '#F1F3F6', graphicColors: ['gray-800'], tone: 'light' }),
  core({ name: 'biomedit-flow-neutral-gray300-gray900', category: 'neutral', label: 'Ink on gray-300', bgToken: 'gray-300', bgHex: '#CBD0D9', graphicColors: ['gray-900'], tone: 'light' }),
  core({ name: 'biomedit-flow-neutral-gray900-white', category: 'neutral', label: 'White on ink', bgToken: 'gray-900', bgHex: '#1C1F28', graphicColors: ['white'], tone: 'dark' }),
  core({ name: 'biomedit-flow-neutral-gray800-gray200', category: 'neutral', label: 'Light gray on gray-800', bgToken: 'gray-800', bgHex: '#333846', graphicColors: ['gray-200'], tone: 'dark' }),
  core({ name: 'biomedit-flow-neutral-gray600-white', category: 'neutral', label: 'White on gray-600', bgToken: 'gray-600', bgHex: '#666D7E', graphicColors: ['white'], tone: 'dark' }),
  // Social crops
  social({ name: 'biomedit-social-square-1080x1080-deepblue-target', label: 'Deep blue target', format: 'Feed square', size: [1080, 1080], bgToken: 'deep-blue', bgHex: '#2B3682', graphicColors: ['white'], tone: 'dark', focus: 'target', textSide: 'left', category: 'social' }),
  social({ name: 'biomedit-social-square-1080x1080-spectrum-crossing', label: 'Spectrum crossing', format: 'Feed square', size: [1080, 1080], bgToken: 'white', bgHex: '#FFFFFF', graphicColors: ['deep-blue', 'teal', 'ember-orange', 'amber', 'green', 'grays'], tone: 'light', focus: 'crossing', textSide: 'bottom', category: 'social' }),
  social({ name: 'biomedit-social-portrait-1080x1350-gray900-dissolve', label: 'Ink dissolve', format: 'Feed portrait', size: [1080, 1350], bgToken: 'gray-900', bgHex: '#1C1F28', graphicColors: ['white'], tone: 'dark', focus: 'dissolve', textSide: 'bottom', category: 'social' }),
  social({ name: 'biomedit-social-portrait-1080x1350-deepbluewarm-converge', label: 'Warm converge', format: 'Feed portrait', size: [1080, 1350], bgToken: 'deep-blue', bgHex: '#2B3682', graphicColors: ['amber', 'ember-orange', 'teal', 'white'], tone: 'dark', focus: 'converge', textSide: 'bottom', category: 'social' }),
  social({ name: 'biomedit-social-story-1080x1920-teal-crossing', label: 'Teal crossing', format: 'Story / Reel', size: [1080, 1920], bgToken: 'teal', bgHex: '#0369B2', graphicColors: ['white'], tone: 'dark', focus: 'crossing', textSide: 'bottom', category: 'social' }),
  social({ name: 'biomedit-social-story-1080x1920-ink-converge', label: 'Ink converge', format: 'Story / Reel', size: [1080, 1920], bgToken: 'gray-900', bgHex: '#1C1F28', graphicColors: ['deep-blue', 'teal', 'ember-orange', 'amber', 'green', 'white'], tone: 'dark', focus: 'converge', textSide: 'bottom', category: 'social' }),
  social({ name: 'biomedit-linkedin-post-1200x627-emberorange-peak', label: 'Ember peak', format: 'LinkedIn post', size: [1200, 627], bgToken: 'ember-orange', bgHex: '#DA6A2A', graphicColors: ['white'], tone: 'dark', focus: 'peak', textSide: 'left', category: 'social' }),
  social({ name: 'biomedit-linkedin-post-1200x627-neutralwhite-field', label: 'Neutral field', format: 'LinkedIn post', size: [1200, 627], bgToken: 'white', bgHex: '#FFFFFF', graphicColors: ['gray-700'], tone: 'light', focus: 'field', textSide: 'left', category: 'social' }),
  social({ name: 'biomedit-linkedin-square-1200x1200-navyamber-target', label: 'Navy amber target', format: 'LinkedIn square', size: [1200, 1200], bgToken: 'navyDeepBg', bgHex: '#262E62', graphicColors: ['amber'], tone: 'dark', focus: 'target', textSide: 'left', category: 'social' }),
  social({ name: 'biomedit-linkedin-banner-1584x396-cool-flow', label: 'Cool flow banner', format: 'LinkedIn profile background', size: [1584, 396], bgToken: 'white', bgHex: '#FFFFFF', graphicColors: ['deep-blue', 'teal', 'green', 'grays'], tone: 'light', focus: 'flow', textSide: 'right', category: 'social' }),
  social({ name: 'biomedit-linkedin-banner-1584x396-gray800-dissolve', label: 'Gray dissolve banner', format: 'LinkedIn profile background', size: [1584, 396], bgToken: 'gray-800', bgHex: '#333846', graphicColors: ['gray-200'], tone: 'dark', focus: 'dissolve', textSide: 'right', category: 'social' }),
  social({ name: 'biomedit-linkedin-cover-1512x256-green-flow', label: 'Green flow cover', format: 'LinkedIn company cover', size: [1512, 256], bgToken: 'green', bgHex: '#16A34A', graphicColors: ['white'], tone: 'dark', focus: 'flow', textSide: 'right', category: 'social' }),
];

export const coreGraphics = graphics.filter((g) => g.category !== 'social');
export const socialGraphics = graphics.filter((g) => g.category === 'social');

/** Post builder formats. A social crop of the same size is listed first. */
export interface Format { id: string; label: string; platform: string; w: number; h: number; tip?: string }
export const formats: Format[] = [
  { id: 'li-post', label: 'LinkedIn post', platform: 'LinkedIn', w: 1200, h: 627 },
  { id: 'li-square', label: 'LinkedIn square', platform: 'LinkedIn', w: 1200, h: 1200 },
  { id: 'portrait', label: 'Feed portrait', platform: 'LinkedIn, Instagram', w: 1080, h: 1350 },
  { id: 'square', label: 'Feed square', platform: 'Instagram, LinkedIn', w: 1080, h: 1080 },
  { id: 'story', label: 'Story / Reel', platform: 'Instagram', w: 1080, h: 1920, tip: 'Keep text out of the top and bottom 250px, where the app puts its own controls.' },
  { id: 'li-banner', label: 'LinkedIn profile background', platform: 'LinkedIn', w: 1584, h: 396, tip: 'The profile photo covers the lower left. Keep text and logos on the right half.' },
  { id: 'slide', label: 'Slide or video (16:9)', platform: 'Slides, YouTube', w: 1920, h: 1080 },
];

/** Brand colors offered for the photo layout's text panel. */
export const panelColors = [
  { name: 'Deep blue', hex: '#2B3682', tone: 'dark' as Tone },
  { name: 'Deep navy', hex: '#262E62', tone: 'dark' as Tone },
  { name: 'Teal', hex: '#0369B2', tone: 'dark' as Tone },
  { name: 'Ink', hex: '#1C1F28', tone: 'dark' as Tone },
  { name: 'White', hex: '#FFFFFF', tone: 'light' as Tone },
  { name: 'Gray-100', hex: '#F1F3F6', tone: 'light' as Tone },
];
