// Generates derived brand files for /styleguide. Run by hand when the logo
// or the graphics in public/graphics/ change, and commit the output:
//
//   node scripts/build-brand-assets.mjs
//
// 1. E mark files, cropped from the master logo SVG (the double-helix E
//    between the M and the D), in public/styleguide/assets/.
// 2. Small WebP previews of every background graphic, for the style guide's
//    asset grid and post builder, in public/styleguide/thumbs/.
//
// public/graphics/ itself is never modified (see its README).
// Uses sharp, which Astro already installs.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ASSETS = path.join(ROOT, 'public/styleguide/assets');
const THUMBS = path.join(ROOT, 'public/styleguide/thumbs');
const GRAPHICS = path.join(ROOT, 'public/graphics');

// ---- 1. E mark ----------------------------------------------------------
const logo = fs.readFileSync(path.join(ASSETS, 'biomedit-logo-colour.svg'), 'utf8');
// Paths 8–11 of the logo are the E (two navy strands, two teal strands).
const ePaths = logo.match(/<path [^>]*><\/path>/g).slice(7, 11);
if (ePaths.length !== 4) throw new Error('Could not find the four E paths in the logo SVG');
const white = (p) => p.replace(/fill="#[0-9A-Fa-f]{6}"/, 'fill="#FFFFFF"');
// Bounds of the E within the logo's 164×40 artboard, measured by rendering.
const E = { x: 87.99, y: 0, w: 18.82, h: 40 };

const svg = (vb, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${vb[2] * 10}" height="${vb[3] * 10}">` +
  (bg ? `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="${bg}"/>` : '') +
  body.join('') + '</svg>\n';

// Tight artwork, transparent.
const tight = [E.x, E.y, E.w, E.h];
// Square artwork: the E fills 64% of the height, centered.
const side = E.h / 0.64;
const square = [E.x + E.w / 2 - side / 2, E.y + E.h / 2 - side / 2, side, side];

const marks = [
  { name: 'biomedit-mark-colour', vb: tight, body: ePaths },
  { name: 'biomedit-mark-white', vb: tight, body: ePaths.map(white) },
  { name: 'biomedit-mark-square-colour', vb: square, body: ePaths, bg: '#FFFFFF' },
  { name: 'biomedit-mark-square-navy', vb: square, body: ePaths.map(white), bg: '#2B3682' },
  { name: 'biomedit-mark-square-deepnavy', vb: square, body: ePaths.map(white), bg: '#262E62' },
  { name: 'biomedit-mark-square-teal', vb: square, body: ePaths.map(white), bg: '#0369B2' },
];
for (const m of marks) {
  const s = svg(m.vb, m.body, m.bg);
  fs.writeFileSync(path.join(ASSETS, `${m.name}.svg`), s);
  // PNG: 1024px on the long side.
  const scale = 1024 / Math.max(m.vb[2], m.vb[3]);
  await sharp(Buffer.from(s), { density: 72 * scale / 10 })
    .resize(Math.round(m.vb[2] * scale), Math.round(m.vb[3] * scale))
    .png().toFile(path.join(ASSETS, `${m.name}.png`));
  console.log('mark', m.name);
}

// ---- 2. Thumbnails ------------------------------------------------------
fs.mkdirSync(THUMBS, { recursive: true });
const sets = [
  { dir: path.join(GRAPHICS, 'full-bleed'), width: 640 },
  { dir: path.join(GRAPHICS, 'social/full-bleed'), width: 640 },
];
for (const { dir, width } of sets) {
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.png'))) {
    const out = path.join(THUMBS, f.replace(/-fullbleed\.png$/, '.webp'));
    await sharp(path.join(dir, f)).resize({ width, height: width, fit: 'inside' }).webp({ quality: 78 }).toFile(out);
  }
  console.log('thumbs', path.relative(ROOT, dir));
}
