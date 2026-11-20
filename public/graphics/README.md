# BiomEdit — Flowing Data Background Graphics

18 background graphics generated from the Figma component **Flowing data final — Editable copy** (BiomEdit file, page *Flowing data revised*). All colors come from the Figma variable collection **Surface**.

Each graphic is delivered in four formats:

| Folder | Format | Size | Use for |
|---|---|---|---|
| `svg/` | SVG, transparent background | 1920 × 1080 viewBox (scalable) | Website (CSS backgrounds), PowerPoint 365 |
| `svg-themeable/` | SVG, transparent, colors driven by CSS variables | 1920 × 1080 viewBox | Recoloring, tinting and opacity changes (see **Recoloring, tinting and opacity**) |
| `png/` | PNG, transparent background | 3840 × 2160 (2×) | Google Slides, Keynote, email, anywhere SVG isn't supported |
| `full-bleed/` | PNG, brand background baked in | 3840 × 2160 (2×) | Drop-in slide backgrounds, social, quick mockups |

> **Important:** the transparent SVG/PNG files are designed to sit on a specific background color (listed below). Many of them use white or light overlays and will look invisible on a white page or in a file preview. Always pair a transparent file with its background color — or use the `full-bleed` version.

---

## Background color mapping

### Brand duotones
Full brand color background with a single-color, semi-transparent overlay.

| Graphic name | Background (variable) | Background hex | Graphic color(s) | Tone | Figma frame |
|---|---|---|---|---|---|
| `biomedit-flow-duotone-deepblue-white` | deep-blue | `#2B3682` | white | Dark | flowing-duotone-deep-blue |
| `biomedit-flow-duotone-teal-white` | teal | `#0369B2` | white | Dark | flowing-duotone-teal |
| `biomedit-flow-duotone-emberorange-white` | ember-orange | `#DA6A2A` | white | Dark | flowing-duotone-ember-orange |
| `biomedit-flow-duotone-navy-amber` | navyDeepBg | `#262E62` | amber `#F59E0B` | Dark | flowing-duotone-navy-amber |
| `biomedit-flow-duotone-green-white` | green | `#16A34A` | white | Dark | flowing-duotone-green |
| `biomedit-flow-duotone-amber-ink` | amber | `#F59E0B` | gray-900 `#1C1F28` | Light | flowing-duotone-amber-ink |

### Multicolor
Brand colors distributed through the tiles, threads and dots; each ribbon is a distinct brand color.

| Graphic name | Background (variable) | Background hex | Graphic color(s) | Tone | Figma frame |
|---|---|---|---|---|---|
| `biomedit-flow-spectrum-white-fullcolor` | backgroud-secondary / white | `#FFFFFF` | deep-blue, teal, ember-orange, amber, green + grays | Light | flowing-multi-full-spectrum-light |
| `biomedit-flow-warm-gray100-emberamber` | gray-100 / backgroud-primary | `#F1F3F6` | ember-orange, amber, deep-blue + grays | Light | flowing-multi-warm-light |
| `biomedit-flow-cool-white-bluetealgreen` | backgroud-secondary / white | `#FFFFFF` | deep-blue, teal, green + grays | Light | flowing-multi-cool-light |
| `biomedit-flow-spectrum-navy-brights` | navyDeepBg | `#262E62` | teal, amber, ember-orange, green + white | Dark | flowing-multi-navy |
| `biomedit-flow-spectrum-gray900-fullcolor` | gray-900 | `#1C1F28` | all five brand colors + white | Dark | flowing-multi-ink |
| `biomedit-flow-warm-deepblue-amberember` | deep-blue | `#2B3682` | amber, ember-orange, teal + white | Dark | flowing-multi-deep-blue-warm |

### Neutral (gray) duotones
Gray-only palette, light and dark.

| Graphic name | Background (variable) | Background hex | Graphic color(s) | Tone | Figma frame |
|---|---|---|---|---|---|
| `biomedit-flow-neutral-white-gray700` | white | `#FFFFFF` | gray-700 `#4A5161` (+ gray-300 accents) | Light | flowing-gray-light-white |
| `biomedit-flow-neutral-gray100-gray800` | gray-100 | `#F1F3F6` | gray-800 `#333846` (+ white accents) | Light | flowing-gray-light-100 |
| `biomedit-flow-neutral-gray300-gray900` | gray-300 | `#CBD0D9` | gray-900 `#1C1F28` (+ white accents) | Light | flowing-gray-light-300 |
| `biomedit-flow-neutral-gray900-white` | gray-900 | `#1C1F28` | white (+ gray-700 accents) | Dark | flowing-gray-dark-900 |
| `biomedit-flow-neutral-gray800-gray200` | gray-800 | `#333846` | gray-200 `#E2E5EA` (+ gray-900 accents) | Dark | flowing-gray-dark-800 |
| `biomedit-flow-neutral-gray600-white` | gray-600 | `#666D7E` | white (+ gray-900 accents) | Dark | flowing-gray-dark-600 |

**Tone** indicates which text color to pair on top: *Dark* backgrounds → white / light text; *Light* backgrounds → text-primary `#1C1F28`.

---

## File naming

`biomedit-flow-{style}-{background}-{graphic color}`

- **style** — `duotone`, `spectrum` / `warm` / `cool` (multicolor), or `neutral`
- **background** — the brand background color the graphic is designed for
- **graphic color** — the overlay color, or `fullcolor` / palette for multicolor

Full-bleed PNGs add the suffix `-fullbleed`.

---

## Usage

### Web (CSS)
```css
.hero {
  background-color: #2B3682; /* deep-blue */
  background-image: url("/graphics/svg/biomedit-flow-duotone-deepblue-white.svg");
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
}
```
Use `background-position: right center` to keep the concentric target visible on narrow screens.

### PowerPoint (Microsoft 365)
1. Set the slide background to the mapped hex color (*Format Background → Solid fill*).
2. *Insert → Pictures* → choose the SVG, then stretch to the full slide (16:9).
3. Send to back. Or simply use the `full-bleed` PNG as the slide background.

### Google Slides / Keynote
Use the `full-bleed` PNG as the slide background, or the transparent `png/` file over a matching solid background.

---

## Social share backgrounds (`social/`)

12 zoomed-in compositions cropped from the graphics above at standard social sizes. Each one enlarges a source graphic 1.4×–3.2× and frames a different focal area (the target, the ribbon crossover, the tile dissolve, the ribbon peak, the open tile field, or the converging threads), with the focal point near a rule-of-thirds line to leave open space for text.

Same formats: `social/svg/` (transparent), `social/svg-themeable/` (CSS-variable colors), `social/png/` (transparent, 2×), `social/full-bleed/` (brand background, 2×). PNGs are exported at 2× the listed size for crisp display on high-density screens; platforms downscale automatically.

### Sizes used

| Format | Size (px) | Ratio | Platform |
|---|---|---|---|
| Feed square | 1080 × 1080 | 1:1 | Instagram and LinkedIn feed |
| Feed portrait | 1080 × 1350 | 4:5 | Instagram feed (recommended), LinkedIn portrait |
| Story / Reel | 1080 × 1920 | 9:16 | Instagram Stories & Reels |
| LinkedIn post | 1200 × 627 | 1.91:1 | LinkedIn link / landscape image post |
| LinkedIn square | 1200 × 1200 | 1:1 | LinkedIn square post |
| LinkedIn profile background | 1584 × 396 | 4:1 | Personal profile banner (max 8 MB) |
| LinkedIn company cover | 1512 × 256 | ~6:1 | Company page cover (current spec; replaces 1128 × 191) |

### Background color mapping

| Graphic name | Size | Background (variable) | Background hex | Source graphic | Focus | Tone |
|---|---|---|---|---|---|---|
| `biomedit-social-square-1080x1080-deepblue-target` | 1080×1080 | deep-blue | `#2B3682` | duotone-deepblue-white | Target | Dark |
| `biomedit-social-square-1080x1080-spectrum-crossing` | 1080×1080 | white | `#FFFFFF` | spectrum-white-fullcolor | Ribbon crossover | Light |
| `biomedit-social-portrait-1080x1350-gray900-dissolve` | 1080×1350 | gray-900 | `#1C1F28` | neutral-gray900-white | Tile dissolve | Dark |
| `biomedit-social-portrait-1080x1350-deepbluewarm-converge` | 1080×1350 | deep-blue | `#2B3682` | warm-deepblue-amberember | Converging threads | Dark |
| `biomedit-social-story-1080x1920-teal-crossing` | 1080×1920 | teal | `#0369B2` | duotone-teal-white | Ribbon crossover | Dark |
| `biomedit-social-story-1080x1920-ink-converge` | 1080×1920 | gray-900 | `#1C1F28` | spectrum-gray900-fullcolor | Converging threads into target | Dark |
| `biomedit-linkedin-post-1200x627-emberorange-peak` | 1200×627 | ember-orange | `#DA6A2A` | duotone-emberorange-white | Ribbon peak | Dark |
| `biomedit-linkedin-post-1200x627-neutralwhite-field` | 1200×627 | white | `#FFFFFF` | neutral-white-gray700 | Tile field | Light |
| `biomedit-linkedin-square-1200x1200-navyamber-target` | 1200×1200 | navyDeepBg | `#262E62` | duotone-navy-amber | Target | Dark |
| `biomedit-linkedin-banner-1584x396-cool-flow` | 1584×396 | white | `#FFFFFF` | cool-white-bluetealgreen | Ribbon flow | Light |
| `biomedit-linkedin-banner-1584x396-gray800-dissolve` | 1584×396 | gray-800 | `#333846` | neutral-gray800-gray200 | Tile dissolve | Dark |
| `biomedit-linkedin-cover-1512x256-green-flow` | 1512×256 | green | `#16A34A` | duotone-green-white | Ribbon flow | Dark |

**Naming:** `biomedit-{social|linkedin}-{format}-{size}-{palette}-{focus}`; full-bleed PNGs add `-fullbleed`.

**Banner tip:** on the LinkedIn profile background, the profile photo covers the lower-left area on desktop and the center-left on mobile. Keep logos and text toward the right half.

Figma source: section *Flowing data — social crops* on page *Flowing data revised*. Each frame holds a scaled instance of **Flowing data final — Editable copy**.

---

## Recoloring, tinting and opacity

Every graphic can be recolored, tinted and faded. **Only use colors from the brand palette** (the Surface tokens listed under *Instructions for Claude Code → Step 3*), never off-palette hex values.

### Which file to use

| Need | Use | Why |
|---|---|---|
| Graphic exactly as designed | `svg/` | Fixed colors, smallest and simplest |
| Change colors, tint or opacity on the website | `svg-themeable/` (inline) or `svg/` (CSS mask) | Colors are CSS variables with the original colors as fallbacks |
| Change colors for slides or social | Ask AI to edit a `svg-themeable/` file, or use a design tool | See *Working with AI* below |
| Only fade or tint a PNG | `png/` with an overlay or opacity | PNG pixels can't be recolored per shape |

### How the themeable SVGs work
Each shape's color is a CSS variable with the original color as its fallback. The file looks identical to `svg/` until a variable is overridden. Per-shape opacity, which creates the depth effect, is kept exactly as it is.

| Graphic type | Variables | Meaning |
|---|---|---|
| **Duotone and neutral** (`duotone-*`, `neutral-*` and their social crops) | `--flow-color` | Main overlay color (tiles, ribbons, threads, target) |
| | `--flow-accent` | Secondary accent tiles (about 15% of tiles). Not present in every social crop. |
| **Multicolor** (`spectrum-*`, `warm-*`, `cool-*` and their social crops) | `--color-deep-blue`, `--color-teal`, `--color-ember-orange`, `--color-amber`, `--color-green`, `--color-white`, `--color-gray-400` … `--color-gray-900` | The brand tokens, so remapping a token recolors every shape that uses it |
| **All** | `--flow-opacity` | Opacity of the whole graphic, from 0 to 1 (default 1) |

Each themeable SVG's root element also has `class="biomedit-flow"` and `aria-hidden="true"`, because the graphics are decorative.

> **Important:** CSS variables only reach the SVG when it's **inline** in the page's HTML. When an SVG is used as `background-image`, `<img>` or in PowerPoint, the variables can't reach it and it shows its default colors. For background use, recolor with the **mask** technique instead.

### Recipes

**1. Fade a graphic (any format).** Put it on its own layer and set opacity, so text above stays at full strength:
```css
.hero { position: relative; background-color: var(--color-deep-blue); }
.hero::before {
  content: ""; position: absolute; inset: 0; z-index: 0;
  background: url("/graphics/svg/biomedit-flow-duotone-deepblue-white.svg") right center / cover no-repeat;
  opacity: 0.4;
}
.hero > * { position: relative; z-index: 1; }
```

**2. Recolor a duotone as a background, in any brand color (mask technique).** The SVG becomes a stencil, and its transparency (the depth) is kept:
```css
.hero::before {
  content: ""; position: absolute; inset: 0;
  background-color: var(--color-amber);              /* ← new graphic color */
  -webkit-mask: url("/graphics/svg/biomedit-flow-duotone-deepblue-white.svg") right center / cover no-repeat;
          mask: url("/graphics/svg/biomedit-flow-duotone-deepblue-white.svg") right center / cover no-repeat;
  opacity: 1;                                          /* ← optional fade */
}
```
Only use this with duotone and neutral files. Accent tiles take the same color, and multicolor graphics turn single-color.

**3. Recolor inline (themeable SVG).** In Astro, inline the file and set variables on a wrapper:
```astro
---
import raw from "../../public/graphics/svg-themeable/biomedit-flow-duotone-deepblue-white.svg?raw";
// crop like background-size: cover, anchored right (keeps the target in view)
const flow = raw.replace("<svg ", '<svg preserveAspectRatio="xMaxYMid slice" ');
---
<div class="flow-bg" style="--flow-color: var(--color-amber); --flow-accent: var(--color-gray-900); --flow-opacity: .8" set:html={flow} />
```
```css
.flow-bg { position: absolute; inset: 0; pointer-events: none; }
.flow-bg svg { width: 100%; height: 100%; display: block; }
```
Adjust the import path to the component's location. Each themeable file has unique internal IDs, so several graphics can be inlined on one page without conflicts.

**4. Remap brand colors in a multicolor graphic (inline).**
```css
.flow-campaign-warm {
  --color-teal: var(--color-ember-orange);
  --color-green: var(--color-amber);
}
```
Scope these overrides to the graphic's wrapper, never to `:root`, so the rest of the site keeps its real token values.

**5. Tint the whole graphic.** Put a brand color over the graphic with a blend mode:
```css
.hero::after { content: ""; position: absolute; inset: 0; background: var(--color-teal); mix-blend-mode: color; opacity: .6; }
```
`color` keeps the depth and swaps the hue. `soft-light` and `overlay` give subtler washes.

### PowerPoint, Keynote, Canva and Figma
- **Opacity:** select the picture, then *Format Picture → Transparency* (PowerPoint), the *Opacity* slider (Keynote and Canva), or layer opacity (Figma).
- **Recolor:** in PowerPoint 365, insert the SVG, right-click, choose *Convert to Shape*, then select all shapes and set the fill. This loses the per-shape opacity on some versions, so check the result. A safer option is to ask AI for a recolored SVG file (below), or recolor in Figma using the source component.
- **Tint:** place a brand-color rectangle over the image and set its transparency to 40–70%.

### Working with AI (prompt template for marketers)
Paste this into Claude (or any AI) together with a `svg-themeable/` file:

> Recolor this BiomEdit background SVG. Keep every shape, path, and `opacity` value exactly as it is. Only change colors.
> - Set `--flow-color` to **[brand color name + hex]** and `--flow-accent` to **[brand color name + hex]** (duotone), *or* replace **[token]** with **[token]** (multicolor).
> - Overall opacity: **[0–1]**.
> - Use only BiomEdit Surface colors: deep-blue #2B3682, teal #0369B2, ember-orange #DA6A2A, amber #F59E0B, green #16A34A, navy-deep #262E62, white #FFFFFF, gray-100 #F1F3F6 … gray-900 #1C1F28.
> - Return the full SVG with the fallback hex values in each `var(...)` updated to the new colors, so it also works as an image file and in PowerPoint.
> - Name the file `biomedit-flow-custom-{background}-{graphic color}.svg` and tell me which background color to place it on.

**Contrast rule for recolors:** the graphic should stay quieter than any text placed on it. Pick a recolor and opacity so headline text still passes WCAG AA contrast (4.5:1 for body text, 3:1 for large text) against the busiest part of the graphic it overlaps.

---

## Instructions for Claude Code: build an AI-friendly style guide

> **For Claude Code (VS Code extension or CLI).** When the user asks you to "set up the BiomEdit style guide", "add the brand backgrounds", or points you at this file, follow the steps below inside the client's site repository. This README is the source of truth for colors, file names, and pairings. Everything you need is in the tables above.

**Asset location (already in the repo):** `public/graphics/` in the BiomEdit Astro site (`~/Sites/biomedit`). Astro serves `public/` from the site root, so every file is available at `/graphics/...`, for example `/graphics/svg/biomedit-flow-duotone-deepblue-white.svg`.

```
public/graphics/
├── README.md        ← this file (source of truth for pairings)
├── svg/             ← 18 core graphics, transparent (use these on the site)
├── svg-themeable/   ← same 18, colors driven by CSS variables (for recoloring)
├── png/             ← 18 core graphics, transparent PNG @2x
├── full-bleed/      ← 18 core graphics, brand background included, PNG @2x
└── social/{svg,svg-themeable,png,full-bleed}/   ← 12 social-size crops
```

The design master copy lives in Dropbox (`~/Library/CloudStorage/Dropbox/01_PROJECTS/BiomEdit/graphics/`) for Claude Design and slides. **Don't read from or link to Dropbox from the site.** Use only `public/graphics/`. If the user updates the Dropbox set, they re-sync this folder.

### Step 1: Inspect the site first
- This is an **Astro** site deployed on **Netlify**. Static assets go in `public/`, and components and pages in `src/`.
- Look for existing design tokens: global CSS in `src/styles/`, layout files, CSS custom properties, `tailwind.config.*` if present, and any Keystatic theme settings. Reuse their naming conventions. Don't create a parallel token system.
- `public/styleguide/assets/` holds an **older** style-guide set (earlier flowing-data SVGs and logos). Leave it in place. The logos there are still valid, but the `public/graphics/` backgrounds replace the old flowing-data SVGs. Ask before removing or relinking anything that uses the old files.
- Check for an existing `CLAUDE.md`, `AGENTS.md` or `docs/` folder, and follow its conventions.

### Step 2: Use the assets in place
The files are already in `public/graphics/`. **Don't copy, move or rename them.** The names encode the background pairing. Reference them by root-relative URL (`/graphics/...`) in CSS, Astro components and the manifest.
- The website normally only needs `/graphics/svg/`. The PNG, full-bleed and social folders are there for downloads, Open Graph images, slides and social.
- Everything in `public/` deploys publicly. The set is about 15 MB, which is fine for Netlify, but don't import PNGs into pages unless they're needed.

### Step 3: Create design tokens
Add the brand colors (Figma variable collection **Surface**) as CSS custom properties, merging them into the existing token file if there is one:

```css
:root {
  /* Brand */
  --color-deep-blue: #2B3682;
  --color-teal: #0369B2;
  --color-ember-orange: #DA6A2A;
  --color-amber: #F59E0B;
  --color-green: #16A34A;
  --color-navy-deep: #262E62;
  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-100: #F1F3F6;
  --color-gray-200: #E2E5EA;
  --color-gray-300: #CBD0D9;
  --color-gray-400: #AAB1BE;
  --color-gray-500: #868D9E;
  --color-gray-600: #666D7E;
  --color-gray-700: #4A5161;
  --color-gray-800: #333846;
  --color-gray-900: #1C1F28;
  /* Semantic */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);
  --color-text-tertiary: var(--color-gray-500);
  --color-bg-primary: var(--color-gray-100);
  --color-bg-secondary: var(--color-white);
  --color-bg-tertiary: var(--color-gray-200);
  --color-border: var(--color-gray-200);
  --color-link: var(--color-deep-blue);
}
```
If the project uses Tailwind, also map these into `theme.extend.colors`.

### Step 4: Generate a machine-readable manifest
Create `public/graphics/manifest.json` (served at `/graphics/manifest.json`) from the mapping tables in this README, with one entry per graphic:

```json
{
  "name": "biomedit-flow-duotone-deepblue-white",
  "category": "duotone",            // duotone | multicolor | neutral | social
  "background": { "token": "--color-deep-blue", "hex": "#2B3682" },
  "graphicColors": ["white"],
  "tone": "dark",                   // dark → light text, light → text-primary
  "size": [1920, 1080],
  "focus": null,                    // social crops: target | crossing | dissolve | peak | field | converge | flow
  "files": {
    "svg": "/graphics/svg/biomedit-flow-duotone-deepblue-white.svg",
    "svgThemeable": "/graphics/svg-themeable/biomedit-flow-duotone-deepblue-white.svg",
    "png": "/graphics/png/biomedit-flow-duotone-deepblue-white.png",
    "fullBleed": "/graphics/full-bleed/biomedit-flow-duotone-deepblue-white-fullbleed.png"
  },
  "theming": {
    "mode": "duotone",              // duotone → --flow-color/--flow-accent; multicolor → brand tokens
    "variables": { "--flow-color": "#FFFFFF", "--flow-accent": "#262E62" },
    "maskSafe": true                // true for duotone/neutral (CSS mask recolor works); false for multicolor
  }
}
```
Get the `theming.variables` defaults by reading each `svg-themeable` file: collect the distinct `var(--name, #hex)` pairs.
Include all 18 core graphics and all 12 social crops (30 entries). Check that every file path in the manifest exists on disk.

### Step 5: Add background utility classes
Create one CSS class per core graphic that sets the paired background color and the SVG together, so they can never be mismatched:

```css
.bg-flow-duotone-deepblue-white {
  background-color: var(--color-deep-blue);
  background-image: url("/graphics/svg/biomedit-flow-duotone-deepblue-white.svg");
  background-size: cover;
  background-position: right center; /* keeps the concentric target in view */
  background-repeat: no-repeat;
  color: var(--color-white);         /* from tone: dark → white text */
}
```
Rules:
- Text color comes from **tone**: `dark` uses `--color-white`, and `light` uses `--color-text-primary`.
- Always set `background-color` to the mapped token. The SVGs are transparent and many use white overlays.
- On narrow screens, keep `right center` or use `background-position: 70% center`.

### Step 5b: Add recoloring support
Implement the patterns from **Recoloring, tinting and opacity** above, reusing the site's conventions:
1. **Opacity modifier:** a `.bg-flow-faded` modifier (or a `--flow-bg-opacity` custom property) that moves the graphic to a `::before` layer so its opacity can change without fading the content. Text must stay at full opacity.
2. **Mask recolor utility:** `.bg-flow-mask` with `--flow-mask-url` and `--flow-mask-color` custom properties (default color `var(--color-white)`). Only allow it for manifest entries with `"maskSafe": true`.
3. **`FlowBackground.astro` component** in `src/components/`, for inline themeable use. Props:
   - `name` (manifest name)
   - `color`, `accent` (brand token names, not raw hex)
   - `opacity` (0–1)
   - `remap` (object mapping one brand token to another, for multicolor)

   Inline the matching `svg-themeable` file with `?raw` and add `preserveAspectRatio="xMaxYMid slice"`. Set the variables on the wrapper's `style`. Check token names against the Surface token list, and throw a build error for anything off-palette.

   A `?raw` import from `public/graphics/` is confirmed to work with this repo's Vite and is bundled at build time, so it also works on server-rendered (hybrid) routes.
4. Never edit the files in `public/graphics/`. All recoloring happens through CSS variables, masks or overlays.

### Step 6: Write the style guide document
Create `docs/STYLEGUIDE.md` (or the location the repo's conventions suggest). Write it for both humans and AI agents:
1. **Purpose and quick rules** at the top, as short imperative bullets an agent can follow, e.g. "Always pair a background graphic with its mapped background color."
2. **Color tokens**: a table with token, hex, Figma variable name and usage.
3. **Background graphics**: a table per category (duotone, multicolor, neutral, social) with:
   - a preview thumbnail as a relative Markdown image link to the SVG
   - the class name
   - the background token
   - the tone
   - recommended use
4. **Pairing rules and do/don't**:
   - Don't place a transparent graphic on a mismatched color.
   - Don't stretch a graphic out of proportion; use `cover`.
   - Don't edit the source SVG files. Recolor with `FlowBackground`, `.bg-flow-mask` or overlays.
   - Only use brand tokens when recoloring; never use off-palette hex.
   - Keep body text off the dense tile area on the left; use the open space.
5. **Recoloring, tinting and opacity**: a short version of the README section, with:
   - live examples of the opacity modifier, the mask recolor and `FlowBackground` (duotone recolor and multicolor remap)
   - the marketer prompt template, copied verbatim
   - the contrast rule (text must pass WCAG AA over the graphic)
6. **Where things live**: links to `manifest.json`, the token file, the utilities file and `FlowBackground.astro`, plus the Figma source (file **BiomEdit**, page **Flowing data revised**, main component **Flowing data final — Editable copy**).
7. **How to add a new graphic**: export from Figma, strip the backdrop so the SVG stays transparent, create its `svg-themeable` version (colors become `var(--token, #hex)` with unique IDs), add it to `manifest.json`, add a utility class, and add a row to the style guide.

Use relative links everywhere so the document renders on GitHub and in VS Code's Markdown preview. From `docs/STYLEGUIDE.md`, the graphics are at `../public/graphics/...`, for example `![](../public/graphics/svg/biomedit-flow-duotone-deepblue-white.svg)`.

### Step 7: Make it discoverable to future AI sessions
Add a short section to the repo's `CLAUDE.md` (create it if missing):
```markdown
## Brand & backgrounds
- Style guide: docs/STYLEGUIDE.md (read before any visual/UI work)
- Background pairings source of truth: public/graphics/README.md (assets served at /graphics/...)
- Background graphics manifest: public/graphics/manifest.json
- Use the `.bg-flow-*` utility classes; never set a background graphic without its paired color.
- To recolor/tint/fade a graphic: use `FlowBackground.astro`, `.bg-flow-mask`, or `.bg-flow-faded`, brand tokens only; never edit files in public/graphics/.
- Colors: use the CSS custom properties in the global token file (e.g. src/styles/); never hard-code hex values.
```

### Step 8: Verify
- Every path in `manifest.json` resolves.
- Every `.bg-flow-*` class has a matching background token and text color.
- Render one dark and one light example (a test page or Storybook story if the project has one) and confirm the graphics show with the right pairings.
- Render one recolored duotone (`FlowBackground` and `.bg-flow-mask`), one remapped multicolor and one faded graphic. Confirm the opacity depth is kept and that text over each passes WCAG AA contrast.
- Report what was added and anything skipped, such as PNGs not copied.
