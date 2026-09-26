// Procedural launch-style track, 120 BPM, 48 s, stereo 44.1 kHz WAV.
// Sections (seconds): 0-4 intro | 4-16 groove A | 16-26 groove B | 26-30 build | 30-42 drop | 42-48 outro
import fs from 'fs';

const SR = 44100, DUR = 48, N = SR * DUR, BPM = 120, BEAT = 60 / BPM, BAR = BEAT * 4;
const L = new Float32Array(N), R = new Float32Array(N);
const padBus = new Float32Array(N), plkBus = new Float32Array(N); // mono buses for reverb
const duck = new Float32Array(N).fill(1);
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;

// Dm – Bb – F – C (one chord per bar), voicings in MIDI
const prog = [
  { root: 38, pad: [62, 65, 69, 72, 76] },   // Dm9-ish
  { root: 34, pad: [62, 65, 69, 70, 74] },   // Bbmaj7/add9
  { root: 41, pad: [60, 65, 69, 72, 77] },   // Fadd9
  { root: 36, pad: [60, 64, 67, 72, 74] },   // Cadd9
];
const chordAt = t => prog[Math.floor(t / BAR) % 4];
const sec = t => t < 4 ? 'intro' : t < 16 ? 'A' : t < 26 ? 'B' : t < 30 ? 'build' : t < 42 ? 'drop' : 'outro';

// --- helpers
function addStereo(i, v, pan = 0) { const g = Math.SQRT1_2; L[i] += v * (g - pan * g); R[i] += v * (g + pan * g); }
function saw(ph) { return 2 * (ph - Math.floor(ph + 0.5)); }

// --- pad: detuned saws, slow lowpass, per bar
for (let bar = 0; bar < DUR / BAR; bar++) {
  const t0 = bar * BAR, c = chordAt(t0), s = sec(t0);
  if (s === 'outro' && t0 >= 46) continue;
  const len = s === 'outro' ? DUR - t0 : BAR + 0.15;
  const cutoffBase = s === 'intro' ? 900 : s === 'build' ? 1400 : s === 'drop' ? 2600 : 1700;
  const amp = s === 'intro' ? 0.05 : s === 'drop' ? 0.055 : 0.045;
  for (const m of c.pad) for (const det of [-0.08, 0.08]) {
    const f = mtof(m + det); let ph = Math.random(), lp = 0;
    for (let k = 0; k < len * SR; k++) {
      const i = Math.floor(t0 * SR) + k; if (i >= N) break;
      const t = k / SR, env = Math.min(1, t / 0.35) * Math.min(1, (len - t) / 0.25);
      ph += f / SR; const x = saw(ph);
      const fc = cutoffBase * (1 + 0.25 * Math.sin(2 * Math.PI * 0.15 * (t0 + t)));
      const a = 1 - Math.exp(-2 * Math.PI * fc / SR); lp += a * (x - lp);
      padBus[i] += lp * env * amp * (s === 'outro' ? Math.max(0, 1 - (t0 + t - 42) / 6) : 1);
    }
  }
}

// --- pluck arpeggio (16ths) from 4 s; brighter in drop
const arpPattern = [0, 2, 4, 1, 3, 2, 4, 3];
for (let step = 0; step * BEAT / 2 < DUR; step++) {
  const t0 = step * BEAT / 2, s = sec(t0);
  if (s === 'intro' && t0 < 2) continue;
  if (s === 'outro' && t0 > 44) break;
  const c = chordAt(t0), m = c.pad[arpPattern[step % 8]] + (s === 'drop' && step % 4 === 0 ? 12 : 0);
  const f = mtof(m), amp = s === 'intro' ? 0.05 : s === 'drop' ? 0.1 : 0.08;
  const bright = s === 'drop' ? 5200 : s === 'build' ? 2400 + (t0 - 26) * 700 : 2600;
  let ph = 0, lp = 0;
  for (let k = 0; k < 0.4 * SR; k++) {
    const i = Math.floor(t0 * SR) + k; if (i >= N) break;
    const t = k / SR, env = Math.exp(-t * 11) * Math.min(1, t / 0.003);
    ph += f / SR; const x = saw(ph) * 0.6 + Math.sin(2 * Math.PI * ph) * 0.4;
    const fc = 300 + bright * Math.exp(-t * 18), a = 1 - Math.exp(-2 * Math.PI * fc / SR);
    lp += a * (x - lp); plkBus[i] += lp * env * amp;
  }
}

// --- bass: root, eighth-note pulse, from 4 s
for (let step = 0; step * BEAT / 2 < DUR; step++) {
  const t0 = step * BEAT / 2, s = sec(t0);
  if (s === 'intro' || t0 >= 44) continue;
  if (s === 'build' && t0 > 29) continue;
  const f = mtof(chordAt(t0).root), amp = s === 'drop' ? 0.22 : 0.16, len = BEAT / 2 * 0.9;
  let ph = 0;
  for (let k = 0; k < len * SR; k++) {
    const i = Math.floor(t0 * SR) + k; if (i >= N) break;
    const t = k / SR, env = Math.min(1, t / 0.005) * Math.exp(-t * 3) * Math.min(1, (len - t) / 0.02);
    ph += f / SR; const x = Math.tanh(1.6 * Math.sin(2 * Math.PI * ph) + 0.3 * Math.sin(4 * Math.PI * ph));
    addStereo(i, x * env * amp * (step % 2 ? 0.75 : 1));
  }
}

// --- drums
function kick(t0, amp = 0.7) {
  let ph = 0; for (let k = 0; k < 0.35 * SR; k++) {
    const i = Math.floor(t0 * SR) + k; if (i >= N) break; const t = k / SR;
    const f = 48 + 110 * Math.exp(-t * 28); ph += f / SR;
    addStereo(i, Math.sin(2 * Math.PI * ph) * Math.exp(-t * 7) * amp);
    duck[i] = Math.min(duck[i], 0.45 + 0.55 * Math.min(1, t / 0.18));
  }
}
function hat(t0, amp = 0.06, open = false) {
  let hp = 0, prev = 0; const d = open ? 9 : 45;
  for (let k = 0; k < (open ? 0.25 : 0.06) * SR; k++) {
    const i = Math.floor(t0 * SR) + k; if (i >= N) break; const t = k / SR;
    const x = rnd(); hp = 0.86 * (hp + x - prev); prev = x;
    addStereo(i, hp * Math.exp(-t * d) * amp, 0.35);
  }
}
function clap(t0, amp = 0.16) {
  let bp1 = 0, bp2 = 0;
  for (let k = 0; k < 0.22 * SR; k++) {
    const i = Math.floor(t0 * SR) + k; if (i >= N) break; const t = k / SR;
    const burst = [0, 0.011, 0.022].some(o => t >= o && t < o + 0.008) ? 1 : 0;
    const env = burst ? 1 : Math.exp(-(t - 0.022) * 16) * (t > 0.022 ? 1 : 0);
    const x = rnd(); bp1 += 0.35 * (x - bp1); bp2 += 0.35 * (bp1 - bp2);
    addStereo(i, (bp1 - bp2) * 3 * env * amp, -0.15);
  }
}
for (let b = 0; b * BEAT < DUR; b++) {
  const t = b * BEAT, s = sec(t);
  if (s === 'intro' || s === 'outro') continue;
  if (s === 'build') { // snare-roll style build with kicks thinning out
    if (t < 28) kick(t, 0.55);
    const sub = t < 28 ? 2 : 4; for (let j = 0; j < sub; j++) clap(t + j * BEAT / sub, 0.05 + 0.05 * (t - 26) / 4);
    continue;
  }
  kick(t, s === 'drop' ? 0.8 : 0.6);
  hat(t + BEAT / 2, s === 'drop' ? 0.08 : 0.06, s === 'drop' && b % 2 === 1);
  if (s !== 'A' || t >= 8) { hat(t + BEAT / 4, 0.03); hat(t + 3 * BEAT / 4, 0.03); }
  if ((s === 'B' || s === 'drop') && b % 2 === 1) clap(t);
}

// --- build riser (noise sweep + rising tone) 26 → 30 s, cut dead at 30
{ let lp = 0, ph = 0; const t0 = 26, len = 4;
  for (let k = 0; k < len * SR; k++) {
    const i = Math.floor(t0 * SR) + k, t = k / SR, u = t / len;
    const fc = 400 + 7000 * u * u, a = 1 - Math.exp(-2 * Math.PI * fc / SR); lp += a * (rnd() - lp);
    ph += (220 + 660 * u * u) / SR;
    addStereo(i, (lp * 0.12 + Math.sin(2 * Math.PI * ph) * 0.03) * u * u);
  } }
// --- outro bell on final chord (42 s)
for (const [m, d] of [[77, 0], [81, 0.12], [84, 0.24], [89, 0.36]]) {
  const f = mtof(m); let ph = 0;
  for (let k = 0; k < 4 * SR; k++) {
    const i = Math.floor((42 + d) * SR) + k; if (i >= N) break; const t = k / SR; ph += f / SR;
    plkBus[i] += (Math.sin(2 * Math.PI * ph) + 0.3 * Math.sin(2 * Math.PI * ph * 2.76)) * Math.exp(-t * 1.4) * 0.05;
  }
}

// --- simple stereo reverb (Schroeder combs + allpass) on pad + pluck buses
function reverb(bus, mix, pre = 0.02) {
  const combsL = [1557, 1617, 1491, 1422], combsR = [1277, 1356, 1188, 1116];
  const run = (lens) => {
    const out = new Float32Array(N);
    for (const len of lens) { const buf = new Float32Array(len); let idx = 0, lp = 0;
      for (let i = 0; i < N; i++) { const j = i - Math.floor(pre * SR); const x = j >= 0 ? bus[j] : 0;
        const y = buf[idx]; lp = 0.7 * y + 0.3 * lp; buf[idx] = x + lp * 0.8; idx = (idx + 1) % len; out[i] += y / lens.length; } }
    for (const len of [556, 441]) { const buf = new Float32Array(len); let idx = 0;
      for (let i = 0; i < N; i++) { const b = buf[idx], x = out[i]; const y = -x + b; buf[idx] = x + b * 0.5; idx = (idx + 1) % len; out[i] = y; } }
    return out;
  };
  const wl = run(combsL), wr = run(combsR);
  for (let i = 0; i < N; i++) { L[i] += (bus[i] * (1 - mix) + wl[i] * mix) * duck[i]; R[i] += (bus[i] * (1 - mix) + wr[i] * mix) * duck[i]; }
}
reverb(padBus, 0.45); reverb(plkBus, 0.3, 0.03);

// --- master: gentle glue + limiter + fades
let peak = 0; for (let i = 0; i < N; i++) { L[i] = Math.tanh(L[i] * 1.15); R[i] = Math.tanh(R[i] * 1.15); peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); }
const g = 0.89 / peak;
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28);
buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  const t = i / SR, fade = Math.min(1, t / 0.5) * Math.min(1, (DUR - t) / 1.5);
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g * fade)) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g * fade)) * 32767), 46 + i * 4);
}
fs.writeFileSync(new URL('../public/audio/music.wav', import.meta.url), buf);
console.log('music.wav written, peak', peak.toFixed(2));
