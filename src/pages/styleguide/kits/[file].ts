// /styleguide/kits/biomedit-<id>-kit.zip — download kits, zipped at build
// time from files already in public/ plus the generated prompt files, so a
// kit can never drift from the guide. Kit contents: src/data/styleguide/kits.ts.
import fs from 'node:fs';
import path from 'node:path';
import type { APIRoute, GetStaticPaths } from 'astro';
import { kits, kitUrl, type Kit } from '../../../data/styleguide/kits';
import { buildPrompt, buildCaptionPrompt, buildStartHere } from '../../../data/styleguide/outputs';
import { zip, type ZipEntry } from '../../../utils/zip';

export const prerender = true;

export const getStaticPaths = (() =>
  kits.map((kit) => ({ params: { file: kitUrl(kit).split('/').pop() }, props: { kit } }))) satisfies GetStaticPaths;

const text = (s: string) => new TextEncoder().encode(s);

export const GET: APIRoute = ({ props }) => {
  const kit = props.kit as Kit;
  const root = `BiomEdit ${kit.name}`;
  const entries: ZipEntry[] = [{ path: `${root}/START-HERE.txt`, data: text(buildStartHere(kit)) }];
  if (kit.generated.includes('prompt')) entries.push({ path: `${root}/prompt.txt`, data: text(buildPrompt()) });
  if (kit.generated.includes('caption-prompt')) entries.push({ path: `${root}/caption-prompt.txt`, data: text(buildCaptionPrompt()) });
  for (const f of kit.files) {
    const data = new Uint8Array(fs.readFileSync(path.join(process.cwd(), 'public', f.src)));
    entries.push({ path: `${root}/${f.dir}/${path.basename(f.src)}`, data });
  }
  return new Response(zip(entries), { headers: { 'Content-Type': 'application/zip' } });
};
