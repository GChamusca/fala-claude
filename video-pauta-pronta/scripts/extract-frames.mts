// Extracts every take frame the edit needs into public/warp/f<frame>.jpg (run: node scripts/extract-frames.mts).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import { DURATION, FPS, TAKE_FPS } from '../src/timeline.ts';
import { layersAt } from '../src/warp.ts';

const dir = 'public/warp';
fs.mkdirSync(dir, { recursive: true });
const need = new Set<number>();
for (let f = 0; f < DURATION * FPS; f++) for (const l of layersAt(f / FPS)) need.add(Math.round(l.src * TAKE_FPS));
const todo = [...need].filter(n => !fs.existsSync(`${dir}/f${n}.jpg`)).sort((a, b) => a - b);
console.log(`${need.size} frames needed, ${todo.length} to extract`);

const run = (n: number) => new Promise<void>((resolve, reject) => {
  const p = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-ss', (n / TAKE_FPS).toFixed(4), '-i', 'public/take.mp4',
    '-frames:v', '1', '-q:v', '2', `${dir}/f${n}.jpg`]);
  p.on('exit', c => (c === 0 ? resolve() : reject(new Error(`ffmpeg ${n} exited ${c}`))));
});
let i = 0;
await Promise.all(Array.from({ length: Math.max(2, os.cpus().length) }, async () => {
  while (i < todo.length) { const n = todo[i++]; await run(n); }
}));
console.log('done');
