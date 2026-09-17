#!/usr/bin/env node
/**
 * Prune out/Music down to the shipped playlist after `next build`.
 *
 * The static export copies EVERYTHING in /public — the gitignored WAV
 * masters and raw downloads live there too (~35MB of files the site must
 * never ship). This keeps exactly the tracks listed in src/data/tracks.ts.
 *
 * Usage:   npm run build && node scripts/prune-out-music.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const outMusic = path.resolve(process.cwd(), 'out', 'Music');
// Plain-node safe: parse the file list out of tracks.ts instead of importing
// TypeScript (stock Node can't resolve a .ts specifier here).
const tracksSrc = await fs.readFile(path.resolve(process.cwd(), 'src/data/tracks.ts'), 'utf8');
const trackFiles = [...tracksSrc.matchAll(/file:\s*'\/Music\/([^']+)'/g)].map((m) => m[1]);
if (!trackFiles.length) throw new Error('prune-out-music: no track files parsed from src/data/tracks.ts');
const keep = new Set(trackFiles);

await fs.rm(outMusic, { recursive: true, force: true });
for (const file of trackFiles) {
  const src = path.resolve(process.cwd(), 'public', 'Music', file);
  await fs.mkdir(outMusic, { recursive: true });
  await fs.copyFile(src, path.join(outMusic, file));
  const { size } = await fs.stat(src);
  console.log(`ok  ${file}  (${(size / 1048576).toFixed(1)} MB)`);
}
console.log(`pruned out/Music → ${trackFiles.length} playlist tracks`);

// Cloudflare Pages rejects any file over 25 MiB at upload time. Raw masters in
// public/projects (e.g. the 77 MB Leadway CSW film) get copied into out/ by the
// static export but are never referenced by the site — drop anything over the
// cap so the deploy succeeds.
const LIMIT = 25 * 1024 * 1024;
const outRoot = path.resolve(process.cwd(), 'out');
let oversized = 0;
async function pruneLarge(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) await pruneLarge(p);
    else if ((await fs.stat(p)).size > LIMIT) {
      await fs.rm(p);
      console.log(`dropped oversized (>25 MiB, Pages cap)  ${path.relative(process.cwd(), p)}`);
      oversized += 1;
    }
  }
}
await pruneLarge(outRoot);
if (oversized) console.log(`removed ${oversized} oversized file(s) from out/`);