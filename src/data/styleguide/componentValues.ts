// Design decisions that live in component CSS rather than tokens.css
// (button radius, badge size, module divider color...). Read from the
// component source at build time so the style guide follows the
// components instead of restating them.
import buttonSrc from '../../components/Button.astro?raw';
import badgeSrc from '../../components/Badge.astro?raw';
import ctaSrc from '../../components/CTALink.astro?raw';
import sectionSrc from '../../components/modules/ModuleSection.astro?raw';
import introSrc from '../../components/modules/IntroLead.astro?raw';

function rule(src: string, selector: string): string {
  const i = src.indexOf(`${selector} {`);
  if (i < 0) return '';
  return src.slice(i, src.indexOf('}', i));
}
const prop = (block: string, name: string) =>
  new RegExp(`(?:^|[;{\\s])${name}:\\s*([^;\\n]+);`).exec(block)?.[1].trim() ?? '';

const btn = rule(buttonSrc, '.btn');
const btnOutline = rule(buttonSrc, '.btn-outline');
const badge = rule(badgeSrc, '.badge');
const cta = rule(ctaSrc, '.cta-link');
const ctaHover = rule(ctaSrc, '.cta-link:hover');
const section = rule(sectionSrc, '.module-section');
const eyebrow = /\.intro-text \.eyebrow \{([^}]*)\}/.exec(introSrc)?.[1] ?? '';

export const componentValues = {
  button: {
    radius: prop(btn, 'border-radius'),
    fontSize: prop(btn, 'font-size'),
    fontWeight: prop(btn, 'font-weight'),
    padding: prop(btn, 'padding'),
    border: prop(btn, 'border'),
    outlineBackground: prop(btnOutline, 'background'),
  },
  badge: {
    fontSize: prop(badge, 'font-size'),
    letterSpacing: prop(badge, 'letter-spacing'),
    radius: prop(badge, 'border-radius'),
    padding: prop(badge, 'padding'),
  },
  ctaLink: {
    fontSize: prop(cta, 'font-size'),
    fontWeight: prop(cta, 'font-weight'),
    color: prop(cta, 'color'),
    underline: prop(cta, 'border-bottom'),
    hoverOpacity: prop(ctaHover, 'opacity'),
  },
  module: {
    gap: prop(section, 'padding-top'),
    dividerColor: prop(section, '--module-divider-color'),
  },
  eyebrow: {
    fontSize: prop(eyebrow, 'font-size'),
    letterSpacing: prop(eyebrow, 'letter-spacing'),
    color: prop(eyebrow, 'color'),
  },
};
