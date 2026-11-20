// Builds the AI-friendly files served alongside /styleguide:
// styleguide.md, prompt.txt, tokens.json and tokens.css. Same data as the
// page (tokens.ts, componentValues.ts, content.ts), so they can't drift.
import {
  allRootTokens, brandColors, deepNavy, neutrals, semanticPairs, typeScale,
  contrastPairs, lineHeights, fontFamily, mobileBreakpoint, hexToRgb, px,
} from './tokens';
import {
  meta, contact, changelog, foundation, sections, voiceExamples, principles,
  photoExamples, templates, modules, approvedLines,
} from './content';
import { graphics } from './graphics';
import { kits, kitUrl, logoFiles, type Kit } from './kits';

const site = 'https://www.biomedit.com';
const rgb = (h: string) => (hexToRgb(h) ?? []).join(', ');
const up = (s: string) => s.toUpperCase();

const roles: Record<string, string> = {
  navy: 'Structure and primary action',
  teal: 'Attention and interaction',
  orange: 'Categorical accent',
  green: 'Categorical accent: achieved, positive',
  amber: 'Categorical accent: pending, caution',
};
const neutralRoles: Record<string, string> = {
  '--cool-100': 'Page field', '--cool-200': 'Hairline borders', '--cool-300': 'Rules, dividers',
  '--cool-400': 'Empty values', '--cool-500': 'Large text, rules, empty values (fails AA for small text)', '--cool-600': 'Chart neutrals',
  '--cool-700': 'Body copy (secondary)', '--cool-800': 'Dark surfaces', '--cool-900': 'Headings and body copy',
};
export const colorRole = (key: string) => roles[key] ?? '';
export const neutralRole = (name: string) => neutralRoles[name] ?? '';

const stepJob: Record<string, string> = {
  '--text-display': 'Hero statement. One per page.',
  '--text-h2': 'Largest page headlines.',
  '--text-h3': 'Page titles (IntroLead) and module headlines.',
  '--text-h4': 'Card titles, large stat figures.',
  '--text-h5': 'Card and sub-module headings.',
  '--text-h6': 'Small headings and lead-ins.',
  '--text-body': 'Running copy. The default.',
  '--text-eyebrow': 'Eyebrows, nav, stat labels (uppercase).',
  '--text-caption': 'Captions, footnotes, legal lines.',
};
export const stepRole = (name: string) => stepJob[name] ?? '';

function list(items: string[], marker = '-') { return items.map((i) => `${marker} ${i}`).join('\n'); }
function table(head: string[], rows: string[][]) {
  return [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');
}
function sectionMd(key: keyof typeof sections, level = '##') {
  const s = sections[key];
  return [
    `${level} ${s.eyebrow}: ${s.title}`, '', s.intro, '',
    '### Rules', '', list(s.rules), '',
    '### Do', '', list(s.dos), '',
    "### Don't", '', list(s.donts),
  ].join('\n');
}

export function buildMarkdown(): string {
  const out: string[] = [];
  out.push(`# ${meta.title}`, '',
    `Version ${meta.version}, last updated ${meta.lastUpdated}. Source: ${meta.url}`, '',
    'For anyone creating web, social or digital assets for BiomEdit, by hand or with an AI tool. Digital use only; print and stationery are in the Brand Guidelines deck. Values here are generated from the live website code. Anything marked [Placeholder — …] is not decided yet: do not invent a value for it.', '',
    `Contact: ${contact.name}, ${contact.email}. Source files: ${contact.files}`, '');

  out.push('## Brand foundation', '', foundation.intro, '',
    ...foundation.items.flatMap((i) => [`**${i.label}.** ${i.text}`, '']),
    '### Values', '', ...foundation.values.flatMap((x, n) => [`${n + 1}. **${x.name}.** ${x.text}`]), '');

  out.push('## Tools', '',
    `- Post builder: ${meta.url}#make makes a finished, on-brand social image (LinkedIn, Instagram, banners, 16:9) in the browser.`,
    `- Brand prompt for AI tools: ${meta.promptUrl}`,
    `- LinkedIn post prompt: ${site}/styleguide/caption-prompt.txt`,
    `- Background graphics manifest: ${site}/graphics/manifest.json`, '');

  out.push('## Download kits', '', 'Each kit is a zip with a START-HERE.txt inside.', '',
    table(['Kit', 'What is in it', 'For'], kits.map((k) => [`[${k.name}](${site}${kitUrl(k)})`, k.summary, k.for])), '');

  out.push(sectionMd('logo'), '', '### Logo files', '',
    table(['File', 'Use'], logoFiles.map((a) => [`[${a.label}](${site}${a.file})`, a.use])), '');

  out.push(sectionMd('color'), '', '### Brand colors', '',
    table(['Color', 'Token', 'HEX', 'RGB', 'Dark-theme value', 'Role'], [
      ...brandColors.map((c) => [c.key[0].toUpperCase() + c.key.slice(1), `\`${c.light.name}\``, up(c.light.resolved), rgb(c.light.resolved), `${up(c.dark.resolved)} (\`${c.dark.name}\`)`, colorRole(c.key)]),
      ...(deepNavy ? [['Deep navy', `\`${deepNavy.name}\``, up(deepNavy.resolved), rgb(deepNavy.resolved), '—', 'Full-bleed fields only']] : []),
    ]), '', '### Neutrals (cool ramp)', '',
    table(['Token', 'HEX', 'RGB', 'Role'], neutrals.map((n) => [`\`${n.name}\``, up(n.resolved), rgb(n.resolved), neutralRole(n.name)])), '',
    '### Light and dark theme pairs', '',
    table(['Token', 'Light', 'Dark'], semanticPairs.map((p) => [`\`${p.name}\``, up(p.light.resolved), up(p.dark.resolved)])), '',
    '### Contrast (WCAG 2.1)', '', 'AA requires 4.5:1 for normal text and 3:1 for large text (24px and up, or 19px bold).', '',
    table(['Text', 'Background', 'Ratio', 'AA normal', 'AA large', 'Use'], contrastPairs.map((p) => [p.fgHex, p.bgHex, `${p.ratio}:1`, p.aaNormal ? 'Pass' : 'Fail', p.aaLarge ? 'Pass' : 'Fail', p.use])), '');

  out.push(sectionMd('typography'), '', '### Type scale', '',
    `${fontFamily}. Headings ${lineHeights.heading} line-height, body ${lineHeights.body}. Mobile applies under ${mobileBreakpoint}px.`, '',
    table(['Token', 'Desktop', 'Mobile', 'Use'], typeScale.map((s) => [`\`${s.name}\``, `${s.desktop}px`, s.mobile ? `${s.mobile}px` : `${s.desktop}px`, stepRole(s.name)])), '');

  out.push(sectionMd('imagery'), '', '### Background graphics', '',
    `Every graphic, with its paired background color and text tone, is also listed as JSON at ${site}/graphics/manifest.json. "Dark" tone takes white text; "light" takes ${up(neutrals[neutrals.length - 1]?.resolved ?? '')} text.`, '',
    table(['Graphic', 'Size', 'Background', 'Tone', 'Full-bleed PNG', 'SVG (transparent)'], graphics.map((g) => [
      `${g.label}${g.format ? ` (${g.format})` : ''}`, `${g.size[0]}×${g.size[1]}`, `${g.bgHex} (${g.bgToken})`, g.tone,
      `[PNG](${site}${g.files.fullBleed})`, `[SVG](${site}${g.files.svg})`,
    ])), '',
    '### Photography examples', '', list(photoExamples.map((p) => `${p.label}: ${p.use}`)), '');

  out.push(sectionMd('components'), '', '### Snippets', '', 'See the page for copyable HTML/CSS for each component.', '');

  out.push(sectionMd('modules'), '', '### Modules', '',
    table(['Module', 'What it is', 'Rule', 'Used on'], modules.map((m) => [m.name, m.summary, m.rule, m.usedOn])), '');

  out.push(sectionMd('templates'), '', '### Templates', '',
    table(['Group', 'Template', 'Size (px)', 'Use', 'File'], templates.map((t) => [t.group, t.name, t.size, t.use, t.group === 'Social' ? `Post builder: ${meta.url}#make` : `[Placeholder — ${t.name} file]`])), '');

  out.push(sectionMd('voice'), '', '### Before and after', '',
    ...voiceExamples.flatMap((e) => [`- Before: ${e.before}`, `  After: ${e.after}`]), '');

  out.push('## Guiding principles', '', ...principles.map((p, i) => `${i + 1}. **${p.title}.** ${p.text}`), '');

  out.push('## Changelog', '', list(changelog.map((c) => `${c.date}: ${c.note}`)), '');
  return out.join('\n');
}

const voiceRules = () => `- Third person ("BiomEdit") or "we". Plain, specific, confident.
- Sentence case for every headline and button. Never title case or all caps (caps only for small eyebrow labels).
- No emoji. No exclamation points. No hype words ("revolutionary", "game-changing", "cutting-edge").
- Use numbers, species, sites and stages instead of adjectives.
- Keep ™ on "Programmable Veterinary Biologics™" and ® on "BiomElix®" and "Guided Biotics®" (first mention).
- Product name: CPerf LLV* with the asterisk. If you use it, include this footnote: "${approvedLines.footnote}"
- Species names in italics where the format allows: Clostridium perfringens, Salmonella.
- Never invent or reword efficacy or regulatory claims, and no "first", "only" or other superlatives beyond these approved lines:
  - "${approvedLines.licensureHeadline}"
  - "${approvedLines.licensureFootnote}"
  - "${approvedLines.efficacy}"`;

export function buildPrompt(): string {
  const navy = brandColors.find((c) => c.key === 'navy')!;
  const teal = brandColors.find((c) => c.key === 'teal')!;
  const accents = brandColors.filter((c) => !['navy', 'teal'].includes(c.key));
  const steps = typeScale.filter((s) => s.name !== '--text-caption').map((s) => s.desktop).sort((a, b) => a - b).join(', ');
  const ai = kits.find((k) => k.id === 'ai')!;
  return `You are helping create a social media post or other digital asset for BiomEdit, an animal health biotechnology company. Follow these brand rules exactly. The full guide is at ${meta.mdUrl}.

FILES
I have attached BiomEdit's own logo and background files (from the AI starter kit, ${site}${kitUrl(ai)}). Use only these files:
- Logo: biomedit-logo-colour.png on light backgrounds, biomedit-logo-white.png on dark backgrounds.
- E mark (the double-helix E from the logo): biomedit-mark-colour.png or biomedit-mark-white.png, for small spaces.
- Backgrounds: the files ending in -fullbleed.png. Each already has its brand background color.
If you need a file I have not attached, ask me for it. Every file is listed, with its link, at ${site}/graphics/manifest.json (backgrounds) and in the full guide (logos).
Never redraw, retype, recolor or stretch the logo, and never draw your own version of the background graphic. If you are generating an image and cannot place my files exactly, leave a clear space for the logo and tell me where it goes; do not draw a logo.

VOICE
${voiceRules()}

COLOR (hex)
- Navy ${up(navy.light.resolved)}: primary action, headings on light, the logo. Teal ${up(teal.light.resolved)}: links, eyebrows, the one highlight.
- Deep navy ${deepNavy ? up(deepNavy.resolved) : ''}: large full-bleed backgrounds only.
- Neutrals: ${neutrals.map((n) => up(n.resolved)).join(', ')} (light to dark). Page field ${up(neutrals[0]?.resolved ?? '')}; text ${up(neutrals[neutrals.length - 1]?.resolved ?? '')}.
- Accents, for labelling categories only, never decoration: ${accents.map((a) => `${a.key} ${up(a.light.resolved)}`).join(', ')}.
- On dark backgrounds use white text. Never white text on amber.
- No gradients, no new colors, no tints.

TYPE
- ${fontFamily} only, Regular 400 and Bold 700. If unavailable, Arial.
- Sizes from this scale only (px, for web): ${steps}; captions ${px('--text-caption')}.
- Headlines Bold, sentence case, one idea, ideally 8 words or fewer on social graphics.
- Eyebrows: small Bold uppercase with wide letter-spacing, above the headline.

LAYOUT
- One idea and one call to action per asset. Generous space, flat color.
- Text sits in the open space of a background graphic, away from its bright focal point.
- Photos: real and true to life (cool light for labs, warm light for animals). Never put text over a photo; use a 50/50 split with the text on a solid brand color panel. Never combine a photo and the background graphic in one frame.
- Logo at least 28px tall, with clear space around it.

MUST NOT
- Emoji, exclamation points, title case, hype words.
- Gradients, glows, drop shadows, 3D, neon, stock imagery, AI-drawn logos.
- Invented statistics or claims, or missing ™/®/* marks.
- Any value marked [Placeholder — …] in the guide: leave it as a placeholder, do not guess.
`;
}

/** Ready-to-paste prompt for writing the post text itself (LinkedIn first). */
export function buildCaptionPrompt(): string {
  return `Write a LinkedIn post for BiomEdit, an animal health biotechnology company.

TOPIC
[Paste the news, link, press release or your notes here.]

AUDIENCE
Animal health professionals, poultry and livestock producers, veterinarians, investors and partners.

FORMAT
- Give me 3 options: one that states the news plainly, one that leads with the problem it solves, and one that leads with a number.
- First line: the hook, under 140 characters, because LinkedIn cuts off after that.
- Then 2 to 4 short paragraphs, one idea each. 80 to 200 words in total.
- End with one call to action in sentence case and the link, if there is one.
- 3 to 5 relevant hashtags at the very end.
- For each option, also suggest an image headline (8 words or fewer, sentence case) and an eyebrow (1 to 3 words) for the BiomEdit post builder at ${site}/styleguide/#make.

VOICE
${voiceRules()}

Use only facts from the topic above. If something is unclear or a claim isn't in the approved lines, ask me instead of guessing.
`;
}

/** START-HERE.txt inside each download kit. */
export function buildStartHere(kit: Kit): string {
  const lines = [
    `BiomEdit ${kit.name}`,
    '='.repeat(`BiomEdit ${kit.name}`.length),
    '',
    kit.summary,
    `Made for: ${kit.for}.`,
    '',
    `Style guide and post builder: ${meta.url} (password from the brand team)`,
    '',
  ];
  if (kit.id === 'ai') {
    lines.push('HOW TO USE IT WITH AI',
      '1. Unzip this folder.',
      '2. Open ChatGPT, Claude, Copilot or Gemini and start a new chat.',
      '3. Drag in prompt.txt and the logo and background PNGs you want to use.',
      '4. Type what you need, for example: "Write three LinkedIn posts about our USDA conditional license."',
      '5. To write the post text only, paste caption-prompt.txt instead and fill in the topic.',
      '',
      'Tip: AI image tools redraw logos badly. For the image itself, the post builder on the style guide makes a finished, on-brand PNG in a minute. Use AI for the words.',
      '');
  }
  if (kit.files.some((f) => f.dir.startsWith('logos'))) {
    lines.push('LOGOS',
      '- Full colour (-colour) on white and light grounds; white (-white) on dark grounds and photos with a clear area.',
      '- Full logo at least 28px tall on screen. Smaller than that, use the E mark.',
      ...(kit.files.some((f) => f.src.includes('square')) ? ['- Square E marks are for profile pictures and avatars.'] : []),
      '- Never recolor, stretch, rotate or add effects.',
      '');
  }
  if (kit.files.some((f) => f.dir.startsWith('backgrounds') || f.dir.startsWith('graphics'))) {
    lines.push('BACKGROUNDS',
      '- "-fullbleed" PNGs already include their background color: drop them in as they are.',
      '- Transparent PNGs and SVGs must sit on their paired background color (in the file name, and in graphics/README.md).',
      '- Put text in the open space, away from the bright target or crossing.',
      '- Dark backgrounds take white text. Light backgrounds take #1C1F28 text.',
      '- Never put a background graphic and a photo in the same frame.',
      '');
  }
  lines.push('FILES', ...kit.files.map((f) => `- ${f.dir}/${f.src.split('/').pop()}`));
  if (kit.generated.includes('prompt')) lines.push('- prompt.txt (brand rules for AI tools)');
  if (kit.generated.includes('caption-prompt')) lines.push('- caption-prompt.txt (prompt for writing LinkedIn post text)');
  return lines.join('\n') + '\n';
}

export function buildTokensJson() {
  return {
    $source: `${site}/styleguide/`,
    generated: new Date().toISOString().slice(0, 10),
    font: { family: fontFamily, weights: [400, 700], accent: 'PT Serif italic (pull quotes only)' },
    lineHeight: lineHeights,
    color: {
      brand: brandColors.map((c) => ({
        name: c.light.name, value: up(c.light.resolved), role: colorRole(c.key),
        dark: { name: c.dark.name, value: up(c.dark.resolved) },
      })),
      ...(deepNavy ? { deepNavy: { name: deepNavy.name, value: up(deepNavy.resolved), role: 'Full-bleed fields only' } } : {}),
      neutral: neutrals.map((n) => ({ name: n.name, value: up(n.resolved), role: neutralRole(n.name) })),
      semantic: semanticPairs.map((p) => ({ name: p.name, light: up(p.light.resolved), dark: up(p.dark.resolved) })),
    },
    typeScale: typeScale.map((s) => ({ name: s.name, px: s.desktop, mobilePx: s.mobile ?? s.desktop, role: stepRole(s.name) })),
    mobileBreakpointPx: mobileBreakpoint,
  };
}

export function buildTokensCss(): string {
  const lines = allRootTokens.map((t) => `  ${t.name}: ${t.value};`);
  const mobile = typeScale.filter((s) => s.mobile !== null).map((s) => `    ${s.name}: ${s.mobile}px;`);
  const dark = semanticPairs.map((p) => `  ${p.name}: ${p.dark.value};`);
  return `/* BiomEdit design tokens — generated from ${site}/styleguide/ on ${new Date().toISOString().slice(0, 10)}.
   Font: ${fontFamily} 400/700 (Google Fonts). Headings line-height ${lineHeights.heading}; body ${lineHeights.body}. */

:root {
${lines.join('\n')}
}

@media (max-width: ${mobileBreakpoint}px) {
  :root {
${mobile.join('\n')}
  }
}

[data-theme="dark"] {
${dark.join('\n')}
}
`;
}
