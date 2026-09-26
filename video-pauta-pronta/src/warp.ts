import { CAMERA, SEGMENTS, type Key } from './timeline.ts';

// Monotone cubic (Fritsch–Carlson): smooth speed ramps that never run the take backwards.
function monotone(keys: Key[]) {
  const n = keys.length, xs = keys.map(k => k[0]), ys = keys.map(k => k[1]);
  const d = xs.slice(0, -1).map((x, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - x));
  const m = xs.map((_, i) => (i === 0 ? d[0] : i === n - 1 ? d[n - 2] : d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2));
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; }
    const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
    if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
  }
  return (x: number) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0; while (x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i], t = (x - xs[i]) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
  };
}

const segFns = SEGMENTS.map(s => ({ ...s, f: monotone(s.keys) }));

export type Layer = { seg: number; src: number; opacity: number };

// Which take moments are visible at output time t (two during a cross-dissolve).
export function layersAt(t: number): Layer[] {
  const out: Layer[] = [];
  segFns.forEach((s, i) => {
    if (t < s.from || t > s.to) return;
    const prev = segFns[i - 1];
    let opacity = 1;
    if (prev && t < prev.to) opacity = (t - s.from) / (prev.to - s.from); // fade in over the overlap
    out.push({ seg: i, src: s.f(t), opacity: Math.max(0, Math.min(1, opacity)) });
  });
  return out;
}

export function srcAt(t: number): number | null {
  const l = layersAt(t);
  return l.length ? l[l.length - 1].src : null;
}

// Map a take time back to output time within a segment (for clicks / typing sounds).
export function outForSrc(src: number): number | null {
  for (const s of segFns) {
    const a = s.keys[0][1], b = s.keys[s.keys.length - 1][1];
    if (src < a || src > b) continue;
    let lo = s.from, hi = s.to;
    for (let k = 0; k < 40; k++) { const mid = (lo + hi) / 2; if (s.f(mid) < src) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  }
  return null;
}

// Camera: Catmull-Rom through keyframes, eased at the ends.
const ease = (x: number) => x * x * (3 - 2 * x);
export function cameraAt(t: number) {
  const K = CAMERA;
  if (t <= K[0][0]) return { cx: K[0][1], cy: K[0][2], z: K[0][3] };
  if (t >= K[K.length - 1][0]) { const k = K[K.length - 1]; return { cx: k[1], cy: k[2], z: k[3] }; }
  let i = 0; while (t > K[i + 1][0]) i++;
  const p0 = K[Math.max(0, i - 1)], p1 = K[i], p2 = K[i + 1], p3 = K[Math.min(K.length - 1, i + 2)];
  const u = ease((t - p1[0]) / (p2[0] - p1[0]));
  const cr = (a: number, b: number, c: number, d: number) =>
    0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);
  // Zoom interpolated in log space so push-ins feel linear.
  const lz = cr(Math.log(p0[3]), Math.log(p1[3]), Math.log(p2[3]), Math.log(p3[3]));
  return { cx: cr(p0[1], p1[1], p2[1], p3[1]), cy: cr(p0[2], p1[2], p2[2], p3[2]), z: Math.exp(lz) };
}
