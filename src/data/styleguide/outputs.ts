// Builds the AI-friendly files served alongside /styleguide:
// styleguide.md, prompt.txt, tokens.json and tokens.css. Same data as the
// page (tokens.ts, componentValues.ts, content.ts), so they can't drift.
import {
  allRootTokens, brandColors, deepNavy, neutrals, semanticPairs, typeScale,
  contrastPairs, lineHeights, fontFamily, mobileBreakpoint, hexToRgb, px,
} from './tokens';
import {
  meta, contact, changelog, foundation, sections, voiceExamples, principles,
  logoAssets, graphicAssets, photoExamples, templates, modules,
} from './content';

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

  out.push(sectionMd('logo'), '', '### Logo files', '',
    table(['File', 'Use'], logoAssets.map((a) => [a.placeholder ? a.label : `[${a.label}](${site}${a.file})`, a.use])), '');

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

  out.push(sectionMd('imagery'), '', '### Flowing data graphic files', '',
    table(['File', 'Use'], graphicAssets.map((a) => [`[${a.label}](${site}${a.file})`, a.use])), '',
    '### Photography examples', '', list(photoExamples.map((p) => `${p.label}: ${p.use}`)), '');

  out.push(sectionMd('components'), '', '### Snippets', '', 'See the page for copyable HTML/CSS for each component.', '');

  out.push(sectionMd('modules'), '', '### Modules', '',
    table(['Module', 'What it is', 'Rule', 'Used on'], modules.map((m) => [m.name, m.summary, m.rule, m.usedOn])), '');

  out.push(sectionMd('templates'), '', '### Templates', '',
    table(['Group', 'Template', 'Size (px)', 'Use', 'File'], templates.map((t) => [t.group, t.name, t.size, t.use, `[Placeholder — ${t.name} file]`])), '');

  out.push(sectionMd('voice'), '', '### Before and after', '',
    ...voiceExamples.flatMap((e) => [`- Before: ${e.before}`, `  After: ${e.after}`]), '');

  out.push('## Guiding principles', '', ...principles.map((p, i) => `${i + 1}. **${p.title}.** ${p.text}`), '');

  out.push('## Changelog', '', list(changelog.map((c) => `${c.date}: ${c.note}`)), '');
  return out.join('\n');
}

export function buildPrompt(): string {
  const navy = brandColors.find((c) => c.key === 'navy')!;
  const teal = brandColors.find((c) => c.key === 'teal')!;
  const accents = brandColors.filter((c) => !['navy', 'teal'].includes(c.key));
  const steps = typeScale.filter((s) => s.name !== '--text-caption').map((s) => s.desktop).sort((a, b) => a - b).join(', ');
  return `You are creating a digital asset for BiomEdit, an animal health biotechnology company. Follow these brand rules exactly. The full guide is at ${meta.mdUrl}; read it if you can.

VOICE
- Third person ("BiomEdit") or "we". Plain, specific, confident.
- Sentence case for every headline and button. Never title case or all caps (caps only for small eyebrow labels).
- No emoji. No exclamation points. No hype words ("revolutionary", "game-changing", "cutting-edge").
- Use numbers, species, sites and stages instead of adjectives.
- Keep ™ on "Programmable Veterinary Biologics™" and ® on "BiomElix®" and "Guided Biotics®" (first mention).
- Product name: CPerf LLV* with the asterisk. If you use it, include this footnote: "*Clostridium Perfringens Alpha Toxin and NetB Antibody Fragment, Live Limosilactobacillus Vector".
- Never invent or reword efficacy or regulatory claims. Approved licensure lines: "BiomEdit's First-of-its-Kind Engineered Bacterial Biologic for Poultry Receives Conditional Licensure from USDA" and "USDA has issued a conditional license for the product CPerf LLV* in accordance with regulation 9 CFR 102.6." Approved efficacy line: "Demonstrated 48.7% reduction in NE-associated mortality in broiler chickens, from 13.1% in challenged controls to 6.6% in birds receiving CPerf LLV* in a pivotal study reviewed by USDA Center for Veterinary Biologics (CVB) supporting conditional licensure."

COLOR (hex)
- Navy ${up(navy.light.resolved)}: primary action, headings on light, the logo. Teal ${up(teal.light.resolved)}: links, eyebrows, the one highlight.
- Deep navy ${deepNavy ? up(deepNavy.resolved) : ''}: large full-bleed backgrounds only.
- Neutrals: ${neutrals.map((n) => up(n.resolved)).join(', ')} (light to dark). Page field ${up(neutrals[0]?.resolved ?? '')}; text ${up(neutrals[neutrals.length - 1]?.resolved ?? '')}.
- Accents, for labelling categories only, never decoration: ${accents.map((a) => `${a.key} ${up(a.light.resolved)}`).join(', ')}.
- On dark backgrounds use white text and the dark accents: navy ${up(navy.dark.resolved)}, teal ${up(teal.dark.resolved)}.
- Light backgrounds are the default. No gradients, no new colors, no tints. Never white text on amber.

TYPE
- ${fontFamily} only, Regular 400 and Bold 700. If unavailable, Arial.
- Sizes from this scale only (px): ${steps}; captions ${px('--text-caption')}.
- Headlines Bold. Body ${px('--text-body')}px at ${lineHeights.body} line-height.
- Eyebrows: small Bold uppercase with wide letter-spacing, above the headline.
- PT Serif italic only for one pull quote, never headlines or body.

LAYOUT
- Generous space, flat color, 1px hairline borders. Radius 4px on buttons, 6px on cards and images.
- One idea and one call to action per asset. Primary button: amber ${up(brandColors.find((c) => c.key === 'amber')!.light.resolved)} fill with dark ${up(neutrals[neutrals.length - 1]?.resolved ?? '')} Bold text, 4px radius, sentence case. Secondary: navy outline on white.
- Photography is real and true to life: cool light for labs, warm light for animals. Never stock "sci-fi" labs, glowing vials, filters or black and white. Do not put text over busy photos.
- The flowing-data line graphic may sit on flat color, cropped and bleeding off the edge. Never combine it with a photo. Use the supplied files only, never draw your own version: ${site}/styleguide/assets/flowing-data-final.svg (neutral, on light) or flowing-data-white.svg (on dark); other colorways are listed in the full guide.
- Logo: use the supplied file (${site}/styleguide/assets/biomedit-logo-colour.svg on light, biomedit-logo-white.svg on dark), at least 28px tall, with clear space around it. Never recolor, stretch or add effects.

MUST NOT
- Emoji, exclamation points, title case, hype words.
- Gradients, glows, drop shadows, 3D, neon, stock imagery.
- Invented statistics or claims, including "first", "only" or other superlatives beyond the approved lines, or missing ™/®/* marks.
- Any value marked [Placeholder — …] in the guide: leave it as a placeholder, do not guess.
`;
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
