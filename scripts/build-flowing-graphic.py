#!/usr/bin/env python3
"""Regenerate the flowing-e/data graphic's three derived assets from its raw
source export.

Source (raw, multi-tone export from design):
  public/images/flowing-data-graphic-0921.svg

Generates:
  src/assets/flowing-e-graphic-recolored.svg  — animated (homepage hero)
  public/images/flowing-e-graphic-static.svg  — static (IntroLead band watermark)
  public/images/flowing-e-background.svg      — static (Who We Are watermark)

All three get every element's fill/stroke flattened to the site's cool-300
tone (#CBD0D9) — the source export's varied grays exist for design-review
contrast only; the shipped assets are always monochrome, blended into their
background via low opacity + blend-mode in CSS. Each element also gets its
own randomized opacity (rather than a flat 1) so the composition reads with
some depth and sits further back visually instead of one uniform-contrast
layer — the concentric circles stay a little more prominent on average
since they're the deliberate closing moment. Static and animated outputs
share the same per-element opacity values (one random draw, reused), so the
animated hero settles into the same look the static watermark shows at rest.

Animation choreography (recolored.svg only): the ~420 rects ("data blocks")
and paths ("flowing shapes") settle in — fade + a small randomized
translate — at randomized per-element delays/durations, so they don't pop
in on a mechanical sweep. The 5 concentric circles then ripple in center-
dot-first once that's mostly resolved, as a closing flourish.

Re-run this after the source SVG changes: `python3 scripts/build-flowing-graphic.py`
"""
import re
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/images/flowing-data-graphic-0921.svg"
OUT_ANIMATED = ROOT / "src/assets/flowing-e-graphic-recolored.svg"
OUT_STATIC = ROOT / "public/images/flowing-e-graphic-static.svg"
OUT_BACKGROUND = ROOT / "public/images/flowing-e-background.svg"

TONE = "#CBD0D9"  # --cool-300 — the site's flat tone-on-tone treatment

src = SRC.read_text()

root_match = re.match(r"<svg([^>]*)>", src)
root_attrs = root_match.group(1)
body = src[root_match.end():]
body = re.sub(r"</svg>\s*$", "", body.strip())

# Every element is a single self-closing tag: <rect .../>, <path .../>, <circle .../>
elements = re.findall(r"<(?:rect|path|circle)\b[^>]*/>", body)
assert len(elements) == body.count("<rect") + body.count("<path") + body.count("<circle"), \
    "source markup isn't the expected flat list of self-closing rect/path/circle tags"


def recolor(tag):
    tag = re.sub(r'fill="#[0-9A-Fa-f]{3,6}"', f'fill="{TONE}"', tag)
    tag = re.sub(r'stroke="#[0-9A-Fa-f]{3,6}"', f'stroke="{TONE}"', tag)
    return tag


rects = [recolor(t) for t in elements if t.startswith("<rect")]
paths = [recolor(t) for t in elements if t.startswith("<path")]
circles = [recolor(t) for t in elements if t.startswith("<circle")]
print(f"rects={len(rects)} paths={len(paths)} circles={len(circles)}")

random.seed(42)  # reproducible builds — one draw, shared by static + animated


def inject(tag, extra):
    idx = tag.index(" ")
    return tag[:idx] + " " + extra + tag[idx:]


# Randomized per-element opacity so the composition has depth instead of
# reading as one flat, uniform-contrast layer — blocks/shapes sit further
# back on average; the concentric circles stay a bit more prominent since
# they're the deliberate closing moment.
block_shape_ops = [round(random.uniform(0.18, 0.75), 2) for _ in range(len(rects) + len(paths))]
circle_ops = [round(random.uniform(0.45, 0.85), 2) for _ in range(len(circles))]

# ---------- static (IntroLead watermark + Who We Are watermark) ----------
static_blocks_shapes = [inject(t, f'opacity="{op}"') for t, op in zip(rects + paths, block_shape_ops)]
static_circles = [inject(t, f'opacity="{op}"') for t, op in zip(circles, circle_ops)]
static_svg = (
    f'<svg{root_attrs}>\n'
    + "".join(static_blocks_shapes) + "\n"
    + "".join(static_circles) + "\n"
    "</svg>\n"
)
OUT_STATIC.write_text(static_svg)
OUT_BACKGROUND.write_text(static_svg)

# ---------- animated (homepage hero) ----------
# Phase 1 — data blocks + flowing shapes, shuffled and randomly staggered
# across [0, 2.8s], each settling over 0.55-1.0s to its own resting opacity.
phase1_source = list(zip(rects + paths, block_shape_ops))
random.shuffle(phase1_source)
phase1 = []
for tag, op in phase1_source:
    delay = round(random.uniform(0, 2.8), 3)
    dur = round(random.uniform(0.55, 1.0), 3)
    dx = round(random.uniform(-16, 16), 2)
    dy = round(random.uniform(-16, 16), 2)
    style = f'style="--delay:{delay}s;--dur:{dur}s;--dx:{dx}px;--dy:{dy}px;--op:{op};"'
    phase1.append(inject(tag, f'class="fg-el" {style}'))

# Phase 2 — the 5 concentric circles, center dot first, rippling outward,
# starting once phase 1 has mostly resolved.
circles_inner_to_outer = list(zip(reversed(circles), reversed(circle_ops)))  # source is outer-ring-first
phase2 = []
base_delay, step = 3.0, 0.22
for i, (tag, op) in enumerate(circles_inner_to_outer):
    delay = round(base_delay + i * step, 3)
    phase2.append(inject(tag, f'class="fg-ring" style="--delay:{delay}s;--op:{op};"'))

style_block = """<style>
.fg-el {
  transform-box: fill-box;
  transform-origin: 0 0;
  opacity: 0;
  animation: fg-settle-o var(--dur) cubic-bezier(0.22, 1.01, 0.36, 1) var(--delay) 1 forwards,
             fg-settle-t var(--dur) cubic-bezier(0.22, 1.01, 0.36, 1) var(--delay) 1 forwards;
}
@keyframes fg-settle-o {
  0% { opacity: 0; }
  100% { opacity: var(--op); }
}
@keyframes fg-settle-t {
  0% { transform: translate(var(--dx), var(--dy)); }
  100% { transform: translate(0, 0); }
}
.fg-ring {
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: fg-ring-o 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay) 1 forwards,
             fg-ring-t 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay) 1 forwards;
}
@keyframes fg-ring-o {
  0% { opacity: 0; }
  100% { opacity: var(--op); }
}
@keyframes fg-ring-t {
  0% { transform: scale(0.55); }
  100% { transform: scale(1); }
}
</style>
"""

animated_svg = (
    f'<svg{root_attrs}>\n'
    + style_block
    + "".join(phase1) + "\n"
    + "".join(phase2) + "\n"
    "</svg>\n"
)
OUT_ANIMATED.write_text(animated_svg)

print("done")
