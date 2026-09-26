import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import take from './take.json';
import { C, F, type Layout } from './theme.ts';
import { END_START, FPS, TAKE_FPS } from './timeline.ts';
import { cameraAt, layersAt, outForSrc } from './warp.ts';

type Ev = { t: number; type: string; x?: number; y?: number; label?: string };
const EV = take as Ev[];
const MOVES = EV.filter(e => e.type === 'm' || e.type === 'c');
const CLICKS = EV.filter(e => e.type === 'c')
  .map(c => ({ ...c, out: outForSrc(c.t) }))
  .filter((c): c is Ev & { out: number } => c.out !== null);
export const CLICK_TIMES = CLICKS.map(c => c.out);

export const GEOM = {
  h: { W: 1920, H: 1080, x: 140, y: 58, w: 1640, bar: 38, vpH: 922.5 },
  v: { W: 1080, H: 1920, x: 40, y: 400, w: 1000, bar: 38, vpH: 1080 },
};

export function camera(layout: Layout, t: number) {
  const g = GEOM[layout], { cx, cy, z } = cameraAt(t);
  const visW = layout === 'h' ? 1920 / z : Math.min(1080 * (g.w / g.vpH), 1920 / (z * 1.3));
  const s = g.w / visW, hw = g.w / (2 * s), hh = g.vpH / (2 * s);
  const x = hw * 2 >= 1920 ? 960 : Math.min(Math.max(cx, hw), 1920 - hw);
  const y = hh * 2 >= 1080 ? 540 : Math.min(Math.max(cy, hh), 1080 - hh);
  return { s, tx: g.w / 2 - x * s, ty: g.vpH / 2 - y * s };
}

function cursorAt(src: number) {
  let i = MOVES.findIndex(m => m.t > src);
  if (i === -1) i = MOVES.length;
  const a = MOVES[Math.max(0, i - 1)], b = MOVES[Math.min(MOVES.length - 1, i)];
  if (!a) return { x: 960, y: 540 };
  if (!b || b === a || b.t - a.t > 0.2) return { x: a.x!, y: a.y! };
  const k = (src - a.t) / (b.t - a.t);
  return { x: a.x! + (b.x! - a.x!) * k, y: a.y! + (b.y! - a.y!) * k };
}

function urlFor(src: number) {
  if (src < 10) return 'pautapronta.com/criar';
  if (src < 50.6) return 'pautapronta.com/criar/chat';
  if (src < 114) return 'pautapronta.com/criar/buscando';
  if (src < 192.6) return 'pautapronta.com/criar/outline/6cd59f0c';
  if (src < 780) return 'pautapronta.com/criar/gerando/d74f882a';
  if (src < 817) return 'pautapronta.com/criar/pronto/d74f882a';
  return 'pautapronta.com/validacao/d74f882a';
}

const Cursor: React.FC<{ pressed: number }> = ({ pressed }) => (
  <svg width={30} height={30} viewBox="0 0 24 24" style={{ transform: `scale(${1 - 0.18 * pressed})`, transformOrigin: '3px 2px', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.35))' }}>
    <path d="M3 2 L3 19 L7.6 14.9 L10.6 21.4 L13.4 20.1 L10.5 13.8 L16.8 13.8 Z" fill={C.ink} stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);

export const Stage: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig(), t = frame / fps;
  const g = GEOM[layout];
  const layers = layersAt(t);
  if (!layers.length) return null;
  const { s, tx, ty } = camera(layout, t);
  const top = layers[layers.length - 1];

  // Window entrance (after the hook) and exit (into the end card).
  const enter = spring({ frame: frame - Math.round(3.25 * fps), fps, config: { damping: 18, mass: 0.9 } });
  const exit = interpolate(t, [END_START - 0.3, END_START + 0.35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const winTransform = `perspective(2200px) translateY(${(1 - enter) * 160 + exit * 60}px) rotateX(${(1 - enter) * 16}deg) scale(${0.86 + 0.14 * enter - exit * 0.06})`;

  const cur = cursorAt(top.src);
  const cursorVisible = !(top.seg === 0 && top.src > 194) && top.src < 817;
  const press = CLICKS.reduce((m, c) => Math.max(m, interpolate(t - c.out, [-0.05, 0, 0.15], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })), 0);

  return (
    <AbsoluteFill style={{ opacity: enter * (1 - exit) }}>
      <div style={{ position: 'absolute', left: g.x, top: g.y, width: g.w, height: g.bar + g.vpH, transform: winTransform, transformOrigin: '50% 60%',
        borderRadius: 18, border: `2px solid ${C.ink}`, boxShadow: `10px 10px 0 ${C.ink}, 0 40px 80px -30px rgba(26,51,80,.45)`, overflow: 'hidden', background: C.paper }}>
        {/* browser bar */}
        <div style={{ height: g.bar, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: C.cream, borderBottom: `1.5px solid ${C.ink}` }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 11, height: 11, borderRadius: 6, border: `1.5px solid ${C.ink}`, background: i === 0 ? C.butter : 'transparent' }} />)}
          <div style={{ marginLeft: 14, flex: 1, maxWidth: layout === 'h' ? 620 : 640, height: 24, borderRadius: 12, background: C.paper, border: `1px solid rgba(0,0,0,.18)`,
            display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: F.mono, fontSize: 13, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span style={{ color: C.navy, marginRight: 6 }}>●</span>{urlFor(top.src)}
          </div>
        </div>
        {/* viewport with camera */}
        <div style={{ position: 'relative', width: g.w, height: g.vpH, overflow: 'hidden' }}>
          {layers.map(l => (
            <Img key={l.seg} src={staticFile(`warp/f${Math.round(l.src * TAKE_FPS)}.jpg`)}
              style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0',
                transform: `translate(${tx}px, ${ty}px) scale(${s})`, opacity: l.opacity }} />
          ))}
          {/* click ripples */}
          {CLICKS.map((c, i) => {
            const k = (t - c.out) / 0.5;
            if (k < 0 || k > 1) return null;
            const x = c.x! * s + tx, y = c.y! * s + ty;
            return <div key={i} style={{ position: 'absolute', left: x - 34, top: y - 34, width: 68, height: 68, borderRadius: 40,
              border: `3px solid ${C.navy}`, background: `${C.butter}55`, transform: `scale(${0.3 + k * 0.9})`, opacity: 1 - k }} />;
          })}
          {cursorVisible && (
            <div style={{ position: 'absolute', left: cur.x * s + tx - 3, top: cur.y * s + ty - 2 }}><Cursor pressed={press} /></div>
          )}
          {/* fast-forward sheen during the long generation wait */}
          <GenOverlay t={t} layout={layout} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const GenOverlay: React.FC<{ t: number; layout: Layout }> = ({ t, layout }) => {
  const o = interpolate(t, [27.7, 28.0, 29.5, 29.85], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (o <= 0) return null;
  const sweep = ((t - 27.7) * 1.6) % 1;
  return (
    <AbsoluteFill style={{ opacity: o, pointerEvents: 'none' }}>
      <AbsoluteFill style={{ background: `linear-gradient(100deg, transparent ${sweep * 100 - 20}%, rgba(232,200,115,.22) ${sweep * 100}%, transparent ${sweep * 100 + 20}%)` }} />
      <div style={{ position: 'absolute', right: layout === 'h' ? 28 : 20, top: 22, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
        background: C.navyDeep, color: C.butter, borderRadius: 999, fontFamily: F.mono, fontSize: 16, letterSpacing: 1 }}>
        <span>▶▶</span><span style={{ color: '#fff' }}>ACELERADO</span>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 6, background: 'rgba(0,0,0,.08)' }}>
        <div style={{ width: `${interpolate(t, [27.7, 29.85], [4, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`, height: '100%', background: C.butter }} />
      </div>
    </AbsoluteFill>
  );
};

export { FPS };
