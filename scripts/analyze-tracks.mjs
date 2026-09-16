#!/usr/bin/env node
/**
 * HABIBCORE® — sound-set feature analysis.
 *
 * Decodes every slugged track in /public/Music and measures, from the
 * audio itself (nothing guessed):
 *   bpm     — onset-envelope autocorrelation (60–180 BPM search window)
 *   energy  — integrated RMS mapped from -30..0 dBFS to 0..1
 *   bright  — mean zero-crossing rate, normalised (harsh/bright vs warm/dark)
 *   mood    — bucket derived from the three, with rules ordered so the
 *             genre-typical readings land where they should
 *
 * Output: one JSON row per file on stdout — paste-worthy into
 * src/data/tracks.ts. Re-run after adding songs:
 *   node scripts/analyze-tracks.mjs
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve(process.cwd(), 'public/Music');
const SR = 22050, FRAME = 1024, HOP = 512;

const analyze = (file) => new Promise((resolve, reject) => {
  const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', path.join(DIR, file), '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { stdio: ['ignore', 'pipe', 'inherit'] });
  const chunks = [];
  ff.stdout.on('data', (c) => chunks.push(c));
  ff.on('error', reject);
  ff.on('close', (code) => code === 0 ? resolve(Buffer.concat(chunks)) : reject(new Error(file + ' → ffmpeg exit ' + code)));
});

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.mp3')).sort()) {
  let buf;
  try { buf = await analyze(file); } catch (e) { console.log(JSON.stringify({ file, BROKEN: true })); continue; }
  const n = Math.floor(buf.length / 4);
  if (n < SR * 5) { console.log(JSON.stringify({ file, BROKEN: true })); continue; }
  const x = new Float32Array(n);
  for (let i = 0; i < n; i++) x[i] = buf.readFloatLE(i * 4);

  const frames = Math.floor((n - FRAME) / HOP);
  const rms = new Float32Array(frames), zcr = new Float32Array(frames);
  for (let f = 0; f < frames; f++) {
    let s = 0, z = 0, prev = x[f * HOP];
    for (let i = 0; i < FRAME; i++) { const v = x[f * HOP + i]; s += v * v; if ((v >= 0) !== (prev >= 0)) z++; prev = v; }
    rms[f] = Math.sqrt(s / FRAME); zcr[f] = z / FRAME;
  }

  let sum = 0; for (let i = 0; i < n; i++) sum += x[i] * x[i];
  const rmsDb = 20 * Math.log10(Math.sqrt(sum / n) + 1e-9);
  const energy = +clamp((rmsDb + 30) / 30, 0, 1).toFixed(2);
  const zcrMean = zcr.reduce((a, b) => a + b, 0) / frames;
  const bright = +clamp((zcrMean - 0.02) / 0.18, 0, 1).toFixed(2);

  /* onset envelope → autocorrelation → tempo */
  const onset = new Float32Array(frames);
  for (let f = 1; f < frames; f++) onset[f] = Math.max(0, rms[f] - rms[f - 1]);
  const secPerLag = HOP / SR;
  const minLag = Math.round(60 / 180 / secPerLag), maxLag = Math.round(60 / 60 / secPerLag);
  let best = -1, bestLag = 0;
  for (let lag = minLag; lag <= maxLag; lag++) {
    let s = 0, c = 0;
    for (let f = 0; f + lag < frames; f++) { s += onset[f] * onset[f + lag]; c++; }
    s /= c;
    if (s > best) { best = s; bestLag = lag; }
  }
  let bpm = Math.round(60 / (bestLag * secPerLag));
  if (bpm < 82) bpm *= 2; /* half-time pull */
  bpm = clamp(bpm, 60, 200);

  /* mood bucket — rules ordered: quiet → chill, drill window → drill,
     bright+hard → rage, dark+mid → night, loud+up → party, rest → groove */
  let mood;
  if (energy < 0.44) mood = 'CHILL';
  else if (bpm >= 128 && bpm <= 158 && energy >= 0.5) mood = 'DRILL';
  else if (bpm >= 118 && bright >= 0.55) mood = 'RAGE';
  else if (bright < 0.35 && energy < 0.6) mood = 'NIGHT';
  else if (bpm >= 110 && energy >= 0.68) mood = 'PARTY';
  else if (bpm >= 96 && energy >= 0.55) mood = 'PARTY';
  else if (bpm >= 92 || energy >= 0.55) mood = 'GROOVE';
  else mood = 'NIGHT';

  console.log(JSON.stringify({ file, bpm, energy, bright, mood, dB: +rmsDb.toFixed(1) }));
}
