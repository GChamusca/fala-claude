import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { C, F, ITALIC, type Layout } from './theme.ts';
import { END_START, HOOK_END, SHOWCASE, STAT_CALLOUT, STEPS } from './timeline.ts';
import { camera, GEOM } from './Stage.tsx';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const SLIDES = [1, 2, 3, 4].map(i => staticFile(`slides/slide-${i}.png`));

// Paper grain, re-seeded every frame.
export const Grain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.16 }}>
      <svg width="100%" height="100%">
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 60} /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Backdrop: React.FC<{ layout: Layout }> = ({ layout }) => {
  const t = useCurrentFrame() / 30;
  const drift = Math.sin(t * 0.4) * 30;
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <AbsoluteFill style={{ background: `radial-gradient(60% 50% at ${50 + drift / 20}% ${layout === 'h' ? 110 : 105}%, ${C.butter}55, transparent 70%)` }} />
      <AbsoluteFill style={{ backgroundImage: `linear-gradient(${C.ink}0d 1px, transparent 1px), linear-gradient(90deg, ${C.ink}0d 1px, transparent 1px)`,
        backgroundSize: '48px 48px', backgroundPosition: `${drift}px ${drift / 2}px`, maskImage: 'radial-gradient(80% 70% at 50% 40%, black, transparent)' }} />
    </AbsoluteFill>
  );
};

// 0 – 3.7 s: approved tagline, kinetic.
export const Hook: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig(), t = frame / fps;
  if (t > HOOK_END + 0.2) return null;
  const v = layout === 'v';
  const line = (d: number) => spring({ frame: frame - Math.round(d * fps), fps, config: { damping: 16, mass: 0.7 } });
  const out = interpolate(t, [3.0, HOOK_END], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const hl = interpolate(t, [1.05, 1.55], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const size = v ? 104 : 112;
  const L = (txt: React.ReactNode, d: number, style: React.CSSProperties = {}) => {
    const k = line(d);
    return <div style={{ overflow: 'hidden', paddingBottom: 6 }}><div style={{ transform: `translateY(${(1 - k) * 110}%)`, opacity: k, ...style }}>{txt}</div></div>;
  };
  const caret = Math.floor(t * 2.2) % 2 === 0 ? 1 : 0;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', transform: `scale(${1 - out * 0.12}) translateY(${-out * 80}px)`, opacity: 1 - out }}>
      <div style={{ width: v ? 940 : 1500, fontFamily: F.serif, color: C.ink, fontSize: size, lineHeight: 1.02, letterSpacing: -2 }}>
        {L(<span style={{ fontFamily: F.mono, fontSize: 22, letterSpacing: 4, color: C.navy }}>● PAUTA PRONTA · BY REP</span>, 0.05, { marginBottom: 28 })}
        {L('Seu próximo post', 0.2)}
        {L(<>nasce da <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
          <span style={{ position: 'absolute', left: -8, right: -8, top: '18%', bottom: '4%', background: C.butter, transformOrigin: 'left', transform: `scaleX(${hl})`, zIndex: 0, borderRadius: 4 }} />
          <span style={{ position: 'relative', ...ITALIC }}>cobertura real.</span></span></>, 0.55)}
        {L(<span style={{ color: C.navy, fontSize: size * 0.62, fontFamily: F.sans, fontWeight: 500, letterSpacing: -1 }}>
          Não de um prompt em branco<span style={{ opacity: caret, color: C.navy }}>|</span></span>, 1.45, { marginTop: 22 })}
      </div>
    </AbsoluteFill>
  );
};

export const StepCards: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig(), t = frame / fps;
  const step = STEPS.find(s => t >= s.from - 0.05 && t <= s.to + 0.35);
  if (!step) return null;
  const inK = spring({ frame: frame - Math.round(step.from * fps), fps, config: { damping: 14, mass: 0.6 } });
  const outK = interpolate(t, [step.to, step.to + 0.3], [0, 1], clamp);
  const v = layout === 'v';
  const box: React.CSSProperties = v
    ? { left: 40, right: 40, top: 70, height: 250, padding: '28px 34px', flexDirection: 'row', alignItems: 'center', gap: 28 }
    : { left: 64, bottom: 44, padding: '20px 30px 20px 22px', flexDirection: 'row', alignItems: 'center', gap: 22 };
  return (
    <div style={{ position: 'absolute', display: 'flex', ...box, background: C.navyDeep, color: '#fff', borderRadius: 22, border: `2px solid ${C.ink}`,
      boxShadow: `8px 8px 0 ${C.ink}`, transform: `translateX(${(1 - inK) * -60}px) translateY(${outK * 24}px) rotate(${(1 - inK) * -3}deg)`, opacity: inK * (1 - outK) }}>
      <div style={{ fontFamily: F.mono, fontSize: v ? 64 : 44, color: C.butter, lineHeight: 1 }}>{step.n}</div>
      <div>
        <div style={{ fontFamily: F.serif, fontSize: v ? 66 : 46, lineHeight: 1.02, letterSpacing: -0.5 }}>{step.title}</div>
        <div style={{ fontFamily: F.sans, fontSize: v ? 30 : 22, color: '#d6dce6', marginTop: 8 }}>{step.sub}</div>
      </div>
    </div>
  );
};

export const StatCallout: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig(), t = frame / fps;
  const s = STAT_CALLOUT;
  if (t < s.from - 0.1 || t > s.to + 0.4) return null;
  const k = spring({ frame: frame - Math.round(s.from * fps), fps, config: { damping: 12, mass: 0.5 } });
  const o = interpolate(t, [s.to, s.to + 0.3], [1, 0], clamp);
  const n = Math.round(interpolate(t, [s.from, s.from + 0.9], [0, 200], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const v = layout === 'v';
  return (
    <div style={{ position: 'absolute', right: v ? 70 : 130, top: v ? 1560 : 640, transform: `scale(${0.6 + 0.4 * k}) rotate(${(1 - k) * 6}deg)`, opacity: k * o,
      background: C.butter, border: `2px solid ${C.ink}`, boxShadow: `8px 8px 0 ${C.ink}`, borderRadius: 20, padding: v ? '22px 30px' : '18px 26px', textAlign: 'left' }}>
      <div style={{ fontFamily: F.serif, fontSize: v ? 110 : 92, lineHeight: 0.9, color: C.ink }}>{n}</div>
      <div style={{ fontFamily: F.sans, fontSize: v ? 28 : 22, color: C.ink, maxWidth: 300 }}>{s.label}</div>
    </div>
  );
};

// 29.95 s drop: flash of light.
export const Flash: React.FC = () => {
  const t = useCurrentFrame() / 30;
  const o = interpolate(t, [29.9, 30.0, 30.45], [0, 0.75, 0], clamp);
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: `radial-gradient(circle at 40% 55%, #fffaf0, ${C.butter}99 45%, transparent 75%)`, opacity: o, mixBlendMode: 'screen' }} />;
};

// 30.9 – 35.1 s: the four real slides leave the page and fan out in 3D.
export const Showcase: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig(), t = frame / fps;
  const { from, to } = SHOWCASE;
  if (t < from - 0.05 || t > to + 0.05) return null;
  const v = layout === 'v', g = GEOM[layout];
  const back = interpolate(t, [from, from + 0.4, to - 0.45, to], [0, 1, 1, 0], clamp);
  // where the slide sits on the page (take coords ≈ x 220–780, y 250–950) → screen
  const cam = camera(layout, t);
  const px = g.x + (500 * cam.s + cam.tx), py = g.y + g.bar + (600 * cam.s + cam.ty), pw = 560 * cam.s;
  const cw = v ? 400 : 330, ch = cw * 1.25;
  const targets = v
    ? [[-215, -300, -5], [215, -300, 4], [-215, 250, 3], [215, 250, -4]]
    : [[-540, 30, -7], [-180, -20, -2.5], [180, -20, 2.5], [540, 30, 7]];
  const cx = g.W / 2, cy = v ? g.H / 2 + 60 : g.H / 2 + 60;
  const focusIdx = Math.floor((t - (from + 0.45)) / 0.82);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `${C.paper}d9`, backdropFilter: `blur(${back * 14}px)`, opacity: back }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: v ? 150 : 70, textAlign: 'center', opacity: back, transform: `translateY(${(1 - back) * -30}px)` }}>
        <div style={{ fontFamily: F.serif, fontSize: v ? 96 : 84, color: C.ink, letterSpacing: -1.5 }}>Pronto para <span style={{ ...ITALIC, color: C.navy }}>publicar.</span></div>
        <div style={{ fontFamily: F.mono, fontSize: v ? 26 : 22, letterSpacing: 3, color: C.navy, marginTop: 8 }}>ARTE · LEGENDA · FONTES · VALIDAÇÃO</div>
      </div>
      {SLIDES.map((src, i) => {
        const d = from + i * 0.07;
        const k = spring({ frame: frame - Math.round(d * fps), fps, config: { damping: 15, mass: 0.8 } });
        const r = interpolate(t, [to - 0.5 + i * 0.03, to - 0.05], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
        const [tx, ty, rot] = targets[i];
        const fx = cx + tx, fy = cy + ty;
        const x = interpolate(k, [0, 1], [px, fx]) * (1 - r) + px * r, y = interpolate(k, [0, 1], [py, fy]) * (1 - r) + py * r;
        const scaleFromPage = pw / cw;
        const focus = focusIdx === i ? spring({ frame: frame - Math.round((from + 0.45 + i * 0.82) * fps), fps, config: { damping: 11, mass: 0.5 } }) : 0;
        const sc = interpolate(k, [0, 1], [scaleFromPage, 1]) * (1 - r) + scaleFromPage * r;
        const light = ((t - from) * 0.55 + i * 0.18) % 1.4;
        return (
          <div key={i} style={{ position: 'absolute', left: x - cw / 2, top: y - ch / 2, width: cw, height: ch, zIndex: focus > 0.05 ? 10 : i,
            transform: `perspective(1400px) rotateY(${(1 - k) * (i < 2 ? 35 : -35)}deg) rotate(${rot * k * (1 - r)}deg) scale(${sc * (1 + 0.12 * focus)}) translateY(${-18 * focus}px)`,
            borderRadius: 14, overflow: 'hidden', border: `2px solid ${C.ink}`, boxShadow: `${8 + 6 * focus}px ${8 + 6 * focus}px 0 ${C.ink}, 0 30px 60px -20px rgba(0,0,0,.4)`, opacity: Math.min(1, k * 3) }}>
            <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(115deg, transparent ${light * 100 - 30}%, rgba(255,255,255,.35) ${light * 100 - 15}%, transparent ${light * 100}%)` }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// 42 – 48 s: end card.
export const EndCard: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame(), { fps } = useVideoConfig(), t = frame / fps;
  if (t < END_START) return null;
  const v = layout === 'v';
  const k = (d: number) => spring({ frame: frame - Math.round((END_START + d) * fps), fps, config: { damping: 15, mass: 0.7 } });
  const fadeOut = interpolate(t, [47.2, 48], [1, 0], clamp);
  const a = k(0.15), b = k(0.5), c = k(0.9), d = k(1.3);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: fadeOut }}>
      {SLIDES.map((src, i) => {
        const pos = v ? [[-330, -620, -10], [330, -560, 8], [-340, 620, 7], [330, 660, -9]][i] : [[-760, -250, -10], [760, -240, 9], [-720, 260, 8], [740, 270, -8]][i];
        const e = k(0.05 * i);
        return <Img key={i} src={src} style={{ position: 'absolute', left: '50%', top: '50%', width: v ? 300 : 260, borderRadius: 12, border: `2px solid ${C.ink}`,
          boxShadow: `6px 6px 0 ${C.ink}`, opacity: 0.9 * e, transform: `translate(-50%,-50%) translate(${pos[0] * (0.7 + 0.3 * e)}px, ${pos[1] * (0.7 + 0.3 * e) + Math.sin(t * 1.2 + i) * 8}px) rotate(${pos[2]}deg)` }} />;
      })}
      <div style={{ textAlign: 'center', transform: `translateY(${(1 - a) * 30}px)`, opacity: a }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
          {/* mark from pautapronta.com/pautapronta/logos/pauta-pronta-primary-light.svg */}
          <svg width={v ? 92 : 80} height={v ? 92 : 80} viewBox="4 4 54 54">
            <circle cx="32" cy="32" r="22" fill="#1a1610" />
            <circle cx="28" cy="28" r="22" fill={C.navy} />
            <circle cx="36" cy="20" r="5" fill={C.butter} />
          </svg>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: F.serif, fontSize: v ? 96 : 84, color: C.ink, lineHeight: 0.95, letterSpacing: -1.5 }}>Pauta Pronta</div>
            <div style={{ ...ITALIC, fontSize: v ? 30 : 26, color: C.muted }}>by REP</div>
          </div>
        </div>
      </div>
      <div style={{ fontFamily: F.serif, fontSize: v ? 50 : 42, color: C.ink, marginTop: 34, textAlign: 'center', maxWidth: v ? 900 : 1100, opacity: b, transform: `translateY(${(1 - b) * 24}px)` }}>
        Seu próximo post nasce da <span style={{ ...ITALIC, color: C.navy }}>cobertura real.</span>
      </div>
      <div style={{ marginTop: 42, display: 'flex', flexDirection: v ? 'column' : 'row', alignItems: 'center', gap: 22, opacity: c, transform: `scale(${0.9 + 0.1 * c})` }}>
        <div style={{ background: C.navy, color: '#fff', fontFamily: F.sans, fontWeight: 600, fontSize: v ? 40 : 32, padding: v ? '24px 44px' : '20px 38px',
          borderRadius: 999, border: `2px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}` }}>
          Teste grátis <span style={{ color: C.butter }}>· uma pauta, sem cartão</span>
        </div>
      </div>
      <div style={{ marginTop: 34, fontFamily: F.mono, fontSize: v ? 36 : 30, letterSpacing: 3, color: C.ink, opacity: d }}>pautapronta.com</div>
    </AbsoluteFill>
  );
};

// Vertical only: persistent footer under the browser window.
export const Footer: React.FC<{ layout: Layout }> = ({ layout }) => {
  const t = useCurrentFrame() / 30;
  if (layout !== 'v') return null;
  const o = interpolate(t, [3.6, 4.2, END_START - 0.4, END_START], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 90, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: o }}>
      <svg width={44} height={44} viewBox="4 4 54 54"><circle cx="32" cy="32" r="22" fill="#1a1610" /><circle cx="28" cy="28" r="22" fill={C.navy} /><circle cx="36" cy="20" r="5" fill={C.butter} /></svg>
      <div style={{ fontFamily: F.mono, fontSize: 30, letterSpacing: 3, color: C.ink }}>pautapronta.com</div>
    </div>
  );
};
