// Written content for /styleguide and styleguide.md: rules, do/don'ts,
// voice examples, asset and template catalogues. Values are pulled from
// tokens.ts / componentValues.ts wherever they exist in code, so this file
// holds words and decisions, not numbers. The brand foundation, values and
// guiding principles are verbatim from Brand Guidelines v1.0 (October 2026),
// except where noted: when the deck and the live site differ, the site wins.
import { brandColors, deepNavy, hex, lineHeights, px, fontFamily, typeScale, mobileBreakpoint } from './tokens';
import { componentValues as cv } from './componentValues';

export const meta = {
  title: 'BiomEdit digital style guide',
  lastUpdated: '2026-10-25',
  version: '1.0',
  url: 'https://www.biomedit.com/styleguide/',
  mdUrl: 'https://www.biomedit.com/styleguide.md',
  promptUrl: 'https://www.biomedit.com/styleguide/prompt.txt',
};

/** Visible placeholder marker. Same text in the page and the Markdown. */
export const ph = (what: string) => `[Placeholder — ${what}]`;

/** "#2B3682 (--color-navy)" */
export const v = (token: string) => `${hex(token)} (${token})`;

/** Turns "var(--text-eyebrow)" into "16px (--text-eyebrow)" for rule text. */
export function cssText(value: string): string {
  return value.replace(/var\((--[\w-]+)\)/g, (_, n: string) => {
    const step = typeScale.find((s) => s.name === n);
    if (step) return `${step.desktop}px (${n})`;
    const h = hex(n);
    return h ? `${h} (${n})` : n;
  }).replace(/(\d*\.?\d+)rem/g, (_, r) => `${parseFloat(r) * 16}px`);
}

const navy = brandColors.find((c) => c.key === 'navy')!;
const teal = brandColors.find((c) => c.key === 'teal')!;

export const contact = {
  name: ph('brand contact name and title'),
  email: ph('brand contact email'),
  files: ph('shared drive location for source files'),
};

export const changelog = [
  { date: '2026-10-25', note: 'First version. Built from the live site code and Brand Guidelines v1.0 (October 2026). Where the deck and the site differ, this guide follows the site.' },
];

export interface Section {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  rules: string[];
  dos: string[];
  donts: string[];
}

export const foundation = {
  intro: 'These reflect not only how BiomEdit works today, but how we will work tomorrow. Focused on keeping us unique, so we stand out among other biotechs, and built around our Programmable Veterinary Biologics™ platform.',
  items: [
    { label: 'Mission: our map', text: 'We engineer living biologics to prevent disease, treat conditions, and improve animal health.' },
    { label: 'Vision: our compass', text: 'Transform health by creating programmable biologic solutions that advance care and well-being.' },
    { label: 'Offering', text: 'Pioneering Programmable Veterinary Biologics™' },
    { label: 'Capability', text: 'BiomEdit pioneers Programmable Veterinary Biologics™ from discovery through commercialization to address critical challenges in animal health.' },
  ],
  values: [
    { name: 'Lead with Science', text: 'We start with the science. We ask the right questions, generate relevant evidence, and use what we learn to determine the best path forward.' },
    { name: 'Execute with Clarity', text: 'We are clear about what we are delivering, how we will get there, and who is accountable. We stay focused, make decisions, and drive results.' },
    { name: 'Build Together', text: 'We bring different disciplines and perspectives to our work. We challenge our teammates constructively, learn collectively, and trust each other to deliver.' },
    { name: 'Pioneer with Purpose', text: 'We established our Programmable Veterinary Biologics™ platform to target important challenges in animal health. Technology alone is not the goal. We focus our product innovation where it can address significant unmet needs and deliver meaningful impact.' },
  ],
};

export const sections: Record<string, Section> = {
  logo: {
    id: 'logo',
    eyebrow: 'Logo',
    title: 'Use the files as supplied',
    intro: `The double-helix E and the navy and teal pair. Use full colour on light grounds and the reversed version on dark grounds.`,
    rules: [
      `Full colour logo: navy ${hex('--color-navy')} and teal ${hex('--color-teal')}. Use on white and ${v('--cool-100')} grounds.`,
      `Reversed logo: all white. Use on deep navy ${hex('--navy-deep-bg')}, dark surfaces ${hex('--cool-800')}, and photography with a clear area.`,
      'Clear space: keep at least X clear on all four sides, where X is the height of the E. Measure from the edge of the artwork, not the edge of the file. ' + ph('X to be confirmed against the master artwork'),
      'Digital minimum size: 28px tall. Below that, switch to the E mark rather than shrinking further.',
      'E mark minimum size: ' + ph('E mark minimum, px'),
    ],
    dos: [
      'Use the SVG on the web and the PNG only where SVG is not supported.',
      'Keep the clear space free of type, graphics, image edges, rules and other logos. The page edge counts as an element.',
      'Use the reversed logo on any dark ground.',
    ],
    donts: [
      'Do not stretch or compress the logo.',
      'Do not rotate or angle it.',
      'Do not recolor it.',
      'Do not add shadows or effects.',
      'Do not place it on a busy image.',
      'Do not use the full colour logo on dark grounds.',
    ],
  },
  color: {
    id: 'color',
    eyebrow: 'Color',
    title: 'Navy and teal lead. Accents label.',
    intro: 'Navy and teal do the identifying. Everything else stays neutral until it has a reason not to be.',
    rules: [
      `Navy ${v('--color-navy')}: structure and primary action. Mastheads, primary buttons, table headers, the wordmark itself.`,
      `Teal ${v('--color-teal')}: attention and interaction. Links, active nav, eyebrows, the one figure you want read first.`,
      deepNavy ? `Deep navy ${v('--navy-deep-bg')}: full-bleed fields only, such as the closing call-to-action band. Flat navy reads too saturated across a large area.` : '',
      `Orange ${v('--color-orange')}, green ${v('--color-green')} and amber ${v('--color-amber')} are categorical accents: they label a category, they do not decorate. Three on one page is usually too many.`,
      `Neutrals: the cool ramp, ${hex('--cool-100')} to ${hex('--cool-900')}. Every step has a blue undertone. Page field ${v('--cool-100')}, borders ${v('--cool-200')}, body copy ${v('--cool-700')} or ${v('--cool-900')}, headings ${v('--cool-900')}.`,
      `Text under 24px uses ${v('--cool-700')} or darker on light fields. ${v('--cool-500')} fails AA for small text (see the contrast table); keep it for large text, rules and empty values.`,
      `Dark theme: swap the accent, not the hue. Navy becomes ${navy.dark.resolved.toUpperCase()} and teal becomes ${teal.dark.resolved.toUpperCase()} on dark grounds. Light-theme navy and teal fail contrast on dark fields.`,
      'Light is the default for the website, documents and social. Dark is for emphasis: one full-bleed band, or an entire investor deck.',
      `White text on amber fails contrast. Amber fills take dark text (${v('--cool-900')}).`,
    ].filter(Boolean),
    dos: [
      'Use navy for the primary action and teal for links and highlights.',
      'Default to the neutral ramp; reach for an accent only when a category genuinely differs.',
      'Use the dark-theme accent values on any dark background.',
      'Check contrast against the table below before setting text on color.',
    ],
    donts: [
      'Do not invent tints, gradients or new colors.',
      'Do not use orange, green or amber as decoration.',
      'Do not set body copy in an accent color.',
      'Do not use logo navy for large full-bleed fields; use deep navy.',
    ],
  },
  typography: {
    id: 'typography',
    eyebrow: 'Typography',
    title: 'One typeface, one scale',
    intro: `${fontFamily} in Regular 400 and Bold 700 for everything. Hierarchy comes from size and space, not from adding fonts or weights.`,
    rules: [
      `Typeface: ${fontFamily} Regular 400 and Bold 700 only. There is no medium or semibold.`,
      `Scale: ${typeScale.filter((s) => s.name !== '--text-caption').map((s) => s.desktop).sort((a, b) => a - b).join(', ')}px on a 1.333 ratio, plus ${px('--text-caption')}px for captions. Stay on the steps; if a headline does not fit, cut words rather than invent a size.`,
      `Body copy: ${px('--text-body')}px at ${lineHeights.body} line-height. Headings: Bold at ${lineHeights.heading} line-height.`,
      `On screens under ${mobileBreakpoint}px wide, headings step down one to two sizes and body copy drops to ${typeScale.find((s) => s.name === '--text-body')?.mobile}px (see the mobile column).`,
      `Eyebrows: ${cssText(cv.eyebrow.fontSize)} Bold, uppercase, ${cv.eyebrow.letterSpacing} letter-spacing. Caps with letter-spacing are only for eyebrows, nav and stat labels.`,
      'Headlines and subheads are sentence case. One idea per headline.',
      'Body copy measure: roughly 70 characters per line, regardless of container width.',
      `Captions, footnotes and legal lines: ${px('--text-caption')}px, ${v('--cool-700')}, sentence case. Say what is happening and why it matters. (The deck shows captions in cool-500, which fails AA at this size; the site uses cool-700.)`,
      'Accent face: PT Serif italic, for pull quotes only, about once per page. Never in headlines, body copy, buttons, labels, tables or interface.',
      'Species names are italic in body copy, for example Clostridium perfringens (set in italic).',
    ],
    dos: [
      'Use sentence case for headlines, subheads and buttons.',
      'Make hierarchy with size and space.',
      'Keep body copy to about 70 characters per line.',
      'Use PT Serif italic for one pull quote per page at most.',
    ],
    donts: [
      'Do not use sizes between the steps.',
      'Do not use other typefaces or weights.',
      'Do not set headlines in all caps.',
      'Do not set running copy in PT Serif.',
      'Do not use images of text.',
    ],
  },
  imagery: {
    id: 'imagery',
    eyebrow: 'Imagery and graphics',
    title: 'Photographs carry the evidence. The graphic carries the idea.',
    intro: 'They do different jobs, and they stay out of the same frame.',
    rules: [
      'Photography has two registers, both true to life. Cool light for science; warm light for animals.',
      'Science, cool: real benches, real equipment, people doing actual work. Cool white light, visible detail, no motion blur.',
      'Science, macro: in close on the hands and the sample. Shallow depth of field, cool light, the procedure legible at a glance.',
      'Animals, warm: healthy birds at flock scale inside commercial housing. Production settings shown honestly.',
      'People, in place: producers and veterinarians with their animals. The relationship is the subject, not the camera.',
      'Use photos full-bleed or full-column width inside a module, in clean editorial color, at their native aspect ratio wherever the module allows.',
      'The flowing data graphic reads left to right: raw data (a library of strains, screened at scale), flowing (the engineering resolving into a candidate), the product (one node: a licensed product).',
      'Crop to one movement. Full artwork is 1920×1080 for 16:9. In square or narrow frames, scale to 250–400%, anchor the movement that matches the copy, and bleed off at least two edges.',
      'Match the crop to the claim: the data field for library and discovery, the ribbons for platform and engineering, the node for a licensed product.',
      'Image borders: full bleed (0 radius, no stroke) when the image meets the page or module edge; inset (6px radius, no stroke, 40px clear) inside the layout; framed card (6px radius, 1px ' + hex('--cool-200') + ' border, 20px padding) when the image carries a caption or sits in a grid of cards.',
    ],
    dos: [
      'Show real work, real animals and real settings.',
      'Name the assay, site or species in captions.',
      'Let cropped graphics bleed off the edge.',
      'Use the subtle neutral graphic as the default; it works behind running copy.',
    ],
    donts: [
      'Do not use black and white, heavy grain or filters.',
      'Do not use blue-lit "sci-fi" labs or gloved hands holding glowing vials.',
      'Do not use photography as background texture behind copy.',
      'Do not combine a photograph and the graphic in one frame.',
      'Do not use drop shadows, strokes heavier than 1px, colored or double borders, or circle and pill crops on images.',
    ],
  },
  components: {
    id: 'components',
    eyebrow: 'UI components',
    title: 'The building blocks on the site',
    intro: 'Live components from the site. Each shows its states, the rule in writing and a snippet you can reproduce outside the codebase.',
    rules: [
      `Buttons: ${cv.button.radius} radius, PT Sans Bold ${cv.button.fontSize}, padding ${cssText(cv.button.padding)}. The primary button is filled amber ${v('--color-amber')} with dark ${v('--cool-900')} text: one per view. The secondary button is a navy ${v('--color-navy')} outline, 1.5px, on white.`,
      `White text on amber fails contrast; amber buttons always take dark text.`,
      `Text call to action: PT Sans Bold ${cv.ctaLink.fontSize}, ${cssText(cv.ctaLink.color)}, 1px underline, trailing arrow. This is the default call to action.`,
      `Hover: an opacity dip to ${cv.ctaLink.hoverOpacity || '0.75'} or a shift to teal. Never scale, lift or bounce.`,
      `Category tags: ${cv.badge.fontSize} Bold uppercase, ${cv.badge.letterSpacing} letter-spacing, ${cv.badge.radius} radius, on a 12% tint of the category color. Used to label news categories and pipeline focus areas.`,
      'Calls to action are sentence case: "Explore our pipeline", not "Explore Our Pipeline".',
      'Shadows appear in two places only: the open navigation menu and an expanded pipeline card. Everything else is flat, with 1px hairlines.',
    ],
    dos: [
      'Use one filled primary button per view.',
      'Prefer the text call to action for secondary actions.',
      'Keep a visible focus outline on every interactive element.',
    ],
    donts: [
      'Do not use pill-shaped buttons.',
      'Do not add shadows, gradients or scale effects to buttons.',
      'Do not put white text on amber.',
      'Do not use the orange tag color for small text elsewhere; at 11px it falls below AA contrast.',
    ],
  },
  modules: {
    id: 'modules',
    eyebrow: 'Content modules',
    title: 'The modules the site is built from',
    intro: 'These are the content modules used on biomedit.com, shown live with sample copy. Use them as layout references for web pages, landing pages and decks.',
    rules: [
      `Every module opens with a 1px divider in ${cssText(cv.module.dividerColor)}, then a ${cssText(cv.module.gap)} gap, then its content.`,
      'Content sits in a 1280px column with 40px side gutters. Full-bleed bands run edge to edge.',
      'Headings inside modules are sentence case. Eyebrows, where used, sit above the heading in caps.',
      'Cards and images inside modules use a 6px radius; cards have a 1px ' + hex('--cool-200') + ' border.',
      'Close most pages with the deep navy band (ModuleBlueText) and one call to action.',
    ],
    dos: ['Pick the module whose shape matches the content.', 'Keep one idea per module.'],
    donts: ['Do not stack two full-bleed bands back to back.', 'Do not nest cards inside cards.'],
  },
  templates: {
    id: 'templates',
    eyebrow: 'Digital templates',
    title: 'Files to start from',
    intro: 'Start from a template rather than a blank canvas. Sizes are in pixels.',
    rules: [
      'Presentations: 1920×1080, seven masters each. Light for internal, scientific and most external decks; dark for investor and partner decks and events.',
      'Social and ad units: one idea, one call to action, the logo at or above its 28px minimum.',
      'Email signature: live text, not an image. Content in order: name, title, BiomEdit, phone, website. Pronouns optional. Falls back to Arial in most email clients. Logo as a hosted PNG at 2× resolution, displayed at 28px tall. No banners, quotes, social icons or legal blocks unless Legal requires them.',
    ],
    dos: ['Use the template for the size you need.', 'Keep text on social graphics to a headline and one line.'],
    donts: ['Do not resize a template to a different aspect ratio; use the matching template.', 'Do not add banners or images to the email signature.'],
  },
  voice: {
    id: 'voice',
    eyebrow: 'Voice and copy',
    title: 'Scannable, and specific',
    intro: 'Headings, rules and short leads carry the argument on their own. Numbers, species, sites and stages instead of adjectives.',
    rules: [
      'Write in the third person ("BiomEdit") or as "we".',
      'Headlines and calls to action are sentence case.',
      'No emoji. No exclamation points.',
      'Use numbers instead of adjectives: a figure, a species, a site or a stage.',
      'Use ™ on Programmable Veterinary Biologics™ and ® on BiomElix® and Guided Biotics® on the first mention in each section.',
      'CPerf LLV* carries its asterisk, and the asterisk footnote ("*Clostridium Perfringens Alpha Toxin and NetB Antibody Fragment, Live Limosilactobacillus Vector") appears on the same page.',
      'Regulatory claims use approved wording only. Do not paraphrase efficacy or licensure statements.',
      'Approved licensure lines: "BiomEdit\'s First-of-its-Kind Engineered Bacterial Biologic for Poultry Receives Conditional Licensure from USDA" (press release headline) and "USDA has issued a conditional license for the product CPerf LLV* in accordance with regulation 9 CFR 102.6." (site footnote).',
      'Species names are italic: Clostridium perfringens, Salmonella.',
    ],
    dos: [
      'Lead with the fact, then the evidence.',
      'Name the species, the site or the stage.',
      'Flag anything unconfirmed as a placeholder until it is real.',
    ],
    donts: [
      'Do not use emoji or exclamation points.',
      'Do not use hype words such as "revolutionary", "game-changing" or "cutting-edge".',
      'Do not drop the ™, ® or * marks.',
      'Do not reword regulatory or efficacy claims.',
    ],
  },
};

export const voiceExamples = [
  { before: 'A Revolutionary, Game-Changing Approach to Animal Health!', after: 'Engineering a new chapter in animal health' },
  // "After" is the approved wording from the Products page, verbatim.
  { before: 'Our product dramatically reduces deaths from disease.', after: 'Demonstrated 48.7% reduction in NE-associated mortality in broiler chickens, from 13.1% in challenged controls to 6.6% in birds receiving CPerf LLV* in a pivotal study reviewed by USDA Center for Veterinary Biologics (CVB) supporting conditional licensure.' },
  { before: 'Learn More About Our Amazing Science 🚀', after: 'Discover our science' },
  { before: 'We use cutting-edge biotech for lots of species.', after: 'Our Programmable Veterinary Biologics™ platform has programs in poultry, swine, cattle, dogs and cats.' },
];

export const principles = [
  { title: 'One typeface, one scale', text: `PT Sans in Regular and Bold, on eight sizes 1.333 apart. Where a headline will not fit, cut words rather than invent a size. PT Serif italic about once per page, and not in the interface.` },
  { title: 'Neutral until proven otherwise', text: 'Most of a page is the cool ramp. Navy and teal identify; orange, green and amber label a category rather than decorate one.' },
  { title: 'Hairlines, almost never shadows', text: 'One border weight, 4px and 6px radii. Depth comes from flat contrast and space; the only shadows are on the open navigation menu and an expanded pipeline card.', note: 'Adapted from the deck ("Hairlines, not shadows") to match the live site.' },
  { title: 'Photographs or motifs, not both', text: 'Real photography carries evidence at full width. Motifs sit on flat color, cropped and bled off the edge.' },
  { title: 'Scannable, and specific', text: 'Headings, rules and short leads carry the argument on their own. Numbers, species, sites and stages instead of adjectives — and placeholders flagged in amber until they are real.' },
  { title: 'Accessible, with one clear path', text: 'AA contrast as the floor, real text over images of text, visible focus, and meaning never carried by color alone. One primary action per page; pipeline, science and partnering always within a step.' },
];

export interface Asset { file: string; label: string; use: string; placeholder?: boolean }
const A = '/styleguide/assets/';
export const logoAssets: Asset[] = [
  { file: `${A}biomedit-logo-colour.svg`, label: 'Full colour logo (SVG)', use: 'Default on white and cool-100 grounds. Use on the web.' },
  { file: `${A}biomedit-logo-colour.png`, label: 'Full colour logo (PNG, 1687×412)', use: 'Where SVG is not supported: email, some social tools.' },
  { file: `${A}biomedit-logo-white.svg`, label: 'Reversed logo (SVG)', use: 'On deep navy, dark surfaces and photography with a clear area.' },
  { file: `${A}biomedit-logo-white.png`, label: 'Reversed logo (PNG, 1687×412)', use: 'Reversed, where SVG is not supported.' },
  { file: '', label: 'One-color logo, black', use: ph('one-color logo artwork'), placeholder: true },
  { file: '', label: 'E mark, full colour and reversed', use: ph('E mark artwork'), placeholder: true },
  { file: '', label: 'App icon / favicon, 512×512', use: ph('app icon artwork'), placeholder: true },
];

export const graphicAssets: Asset[] = [
  { file: `${A}flowing-data-final.svg`, label: 'Neutral gray', use: 'The default. Subtle background on white or cool-100; works behind running copy.' },
  { file: `${A}flowing-data-white.svg`, label: 'White', use: 'Subtle linework on dark or colored fields.' },
  { file: `${A}flowing-data-sky.svg`, label: 'Teal duotone', use: 'Colorized field for section breaks and bands. White type only; nothing else on the field.' },
  { file: `${A}flowing-data-navy-teal.svg`, label: 'Navy to teal', use: 'Colorized field in the brand pair.' },
  { file: `${A}flowing-data-warm-to-cool.svg`, label: 'Warm to cool', use: 'Mixed color, on light. Only where multiple programs, payloads or species are the subject.' },
  { file: `${A}flowing-data-warm-to-cool-dark.svg`, label: 'Warm to cool, dark', use: 'Mixed color on deep gray. Once per document at most.' },
];

export const photoExamples: Asset[] = [
  { file: '', label: 'Science, cool: lab bioreactor pair', use: ph('photo lab-bioreactor-pair.jpg'), placeholder: true },
  { file: '', label: 'Science, macro: lab scientist', use: ph('photo lab-scientist-opt.jpg'), placeholder: true },
  { file: '', label: 'Animals, warm: broiler flock indoors', use: ph('photo broiler-flock-indoor.png'), placeholder: true },
  { file: '', label: 'People, in place: farmer with pig', use: ph('photo farmer-with-pig-opt2.jpg'), placeholder: true },
];

export interface Template { group: string; name: string; size: string; use: string }
export const templates: Template[] = [
  { group: 'Presentations', name: 'BiomEdit Template Light', size: '1920 × 1080', use: 'Internal, scientific and most external decks. Seven masters.' },
  { group: 'Presentations', name: 'BiomEdit Template Dark', size: '1920 × 1080', use: 'Investor and partner decks, events. Seven masters.' },
  { group: 'Social', name: 'Square', size: '1080 × 1080', use: 'Feed posts.' },
  { group: 'Social', name: 'Vertical', size: '1080 × 1920', use: 'Stories and Reels.' },
  { group: 'Social', name: 'Banner', size: '1584 × 396', use: 'LinkedIn page and profile header.' },
  { group: 'Social', name: 'Link post', size: '1200 × 627', use: 'Link previews and LinkedIn link posts.' },
  { group: 'Ad units', name: 'Wide skyscraper', size: '160 × 600', use: 'Display.' },
  { group: 'Ad units', name: 'Leaderboard', size: '728 × 90', use: 'Display.' },
  { group: 'Ad units', name: 'Medium rectangle', size: '300 × 250', use: 'Display.' },
  { group: 'Ad units', name: 'Mobile banner', size: '320 × 50', use: 'Mobile display.' },
  { group: 'Ad units', name: 'Native', size: '1200 × 628', use: 'Image, plus headline and body supplied as text.' },
  { group: 'Email', name: 'Email signature', size: '600 wide', use: 'Live text; logo PNG at 2×, shown 28px tall.' },
];

export interface ModuleInfo { name: string; id: string; summary: string; rule: string; usedOn: string }
export const modules: ModuleInfo[] = [
  { name: 'IntroLead', id: 'module-intro-lead', summary: 'Page opener: eyebrow, page title, lead paragraph, optional image.', rule: 'One per page, at the top. The title is the page h1 at the h3 step.', usedOn: 'Most top-level pages' },
  { name: 'Module11', id: 'module-11', summary: 'One-column text module with an optional call to action.', rule: 'A heading and up to three short paragraphs.', usedOn: 'Products, Investors & Partners' },
  { name: 'Module21', id: 'module-21', summary: 'Two-thirds text, one-third image.', rule: 'Use when one photo supports the text; image at 6px radius.', usedOn: 'Products' },
  { name: 'ModuleCards2', id: 'module-cards-2', summary: 'Two cards side by side, each with heading, copy and optional image.', rule: 'Use for paired items of equal weight. Cards have a 1px border and 6px radius.', usedOn: 'Products' },
  { name: 'FactList', id: 'module-fact-list', summary: 'Rows of a short label or figure on the left and copy on the right.', rule: 'Lead each row with a number or a one-word label.', usedOn: 'Products' },
  { name: 'EntryList', id: 'module-entry-list', summary: 'A labelled list of title and description pairs.', rule: 'Use for awards, grants and other dated or named entries.', usedOn: 'Investors & Partners' },
  { name: 'FloatingCard', id: 'module-floating-card', summary: 'A white card with 6px radius floating on the page field.', rule: 'Use to set apart one summary block, such as the pipeline brief.', usedOn: 'Homepage' },
  { name: 'ModulePlainText', id: 'module-plain-text', summary: 'Plain text, or a large pull quote in PT Serif italic.', rule: 'The pull-quote variant is the one place PT Serif appears; once per page.', usedOn: 'Pipeline' },
  { name: 'ModuleDarkText', id: 'module-dark-text', summary: 'Text on a dark cool-800 band, optionally with a quote and photos.', rule: 'Use teal-dark for eyebrows and white for text on the dark band.', usedOn: 'Homepage, Products' },
  { name: 'ModuleBlueText', id: 'module-blue-text', summary: 'The closing call-to-action band on deep navy with the wave photo.', rule: 'Closes most pages. One heading, one call to action.', usedOn: 'Most top-level pages' },
  { name: 'PipelineTracker', id: 'module-pipeline-tracker', summary: 'The six-stage pipeline board with focus-area and species filters (shown as a screenshot of the live Pipeline page).', rule: 'Pipeline data shown publicly only. Stage columns are fixed.', usedOn: 'Pipeline' },
  { name: 'ModuleSection and FullBleedBand', id: 'module-wrappers', summary: 'The wrappers every module sits in: the divider-and-gap rhythm, and edge-to-edge color bands.', rule: 'Every module starts with the divider and gap.', usedOn: 'Every page' },
];
