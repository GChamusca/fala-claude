// Frame 6 — Separa fato, contexto e divergência. compose: depth-scatter-assemble + grid-card-assemble.
import { C, GRAIN, header, headerJs, cast, castJs, faceJs, blinkJs, nodJs } from '../lib.mjs';

const chip = (n, name) => `<span class="f06-chip"><b>${n}</b>${name}</span>`;
const COLS = [
  ['fato', 'Fato', C.grass, '●', `<p>O governo confirmou a intenção de oferecer as canetas pelo SUS em setembro de 2026.</p>`, chip(2, 'Folha') + chip(7, 'ND Mais') + chip(4, 'DCM')],
  ['ctx', 'Contexto', C.sky, '◐', `<p>A oferta depende da Conitec, de decisão do Ministério da Saúde, de protocolo e de financiamento.</p>`, chip(2, 'Folha') + chip(5, 'Gazeta') + chip(3, 'A Tarde')],
  ['div', 'Divergência', C.rose, '⇄', `<div class="f06-q" id="f06-qa"><span class="mono">DCM · 18/09</span><em>“Lula anuncia canetas no SUS”</em></div><div class="f06-vs mono" id="f06-vs">⇅ versus</div><div class="f06-q" id="f06-qb"><span class="mono">A Tarde · 18/09</span><em>“Ainda dependem de três etapas”</em></div>`, chip(4, 'DCM') + chip(3, 'A Tarde')],
];
export default {
  id: 'f06-analise',
  duration: 11,
  css: `
#f06-rec{position:absolute;left:120px;top:236px;width:1360px;box-sizing:border-box;display:flex;align-items:center;gap:26px;padding:20px 28px;border-radius:20px;background:${C.cream};border:2px solid ${C.rule};}
#f06-rec .mono{flex:none;font-size:18px;line-height:1.5;color:${C.navy};}
#f06-rec p{margin:0;font-family:'Newsreader',serif;font-size:30px;line-height:1.3;border-left:2px solid ${C.rule};padding-left:26px;}
.f06-col{position:absolute;top:376px;width:436px;height:620px;box-sizing:border-box;display:flex;flex-direction:column;border:3px solid ${C.ink};border-radius:24px;background:${C.paper};box-shadow:10px 10px 0 ${C.ink};overflow:hidden;}
.f06-hd{display:flex;justify-content:space-between;align-items:center;padding:18px 24px;color:${C.paper};border-bottom:3px solid ${C.ink};font-size:22px;}
.f06-bd{flex:1;padding:24px;}
.f06-card p{margin:0;font-family:'Newsreader',serif;font-size:34px;line-height:1.3;}
.f06-card{display:flex;flex-direction:column;height:100%;}
.f06-chips{margin-top:auto;display:flex;flex-wrap:wrap;gap:8px;}
.f06-chip{display:inline-flex;align-items:center;gap:8px;padding:5px 14px 5px 5px;border:2px solid ${C.rule};border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:17px;text-transform:uppercase;letter-spacing:.06em;}
.f06-chip b{padding:3px 9px;border-radius:999px;background:${C.navy};color:${C.paper};font-weight:500;}
.f06-q{padding:12px 16px;border-radius:14px;background:${C.cream};border:2px solid ${C.rose};}
.f06-q .mono{display:block;font-size:16px;color:${C.rose};}
.f06-q em{display:block;font-family:'Newsreader',serif;font-size:30px;line-height:1.25;margin-top:4px;}
.f06-vs{text-align:center;font-size:18px;color:${C.mute};margin:12px 0;}
`,
  html: `

${header('f06', '04 · Análise', 'Separa fato, contexto', 'e divergência.', 60)}
<div id="f06-rec"><span class="mono">Recorte<br>proposto</span><p>O que muda no acesso às canetas pelo SUS: quem pode receber, quando começa e o impacto para quem hoje paga caro.</p></div>
${COLS.map(([id, lab, col, g, body, chips], i) => `<div id="f06-${id}" class="f06-col" style="left:${120 + i * 466}px;"><div class="f06-hd mono" style="background:${col};"><span>${lab}</span><span>${g}</span></div><div class="f06-bd"><div id="f06-${id}-card" class="f06-card">${body}<div class="f06-chips">${chips}</div></div></div></div>`).join('')}
${cast('f06', 'analista', { left: 1530, top: 470, size: 340, bg: C.butter, h: 560, dx: -20, dy: 0 })}
`,
  js: `
${headerJs('f06')}
tl.fromTo('#f06-rec', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.5);
tl.fromTo('.f06-col', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12 }, 0.9);
${castJs('f06', 0.7)}
// cada trecho voa da Analista para a sua coluna
const fly = (sel, t) => tl.fromTo(sel, { x: 700, y: -160, rotation: 8, scale: 0.7, opacity: 0 }, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'expo.out' }, t);
fly('#f06-fato-card p', 2.0);
tl.fromTo('#f06-fato .f06-chip', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out', stagger: 0.12 }, 2.9);
fly('#f06-ctx-card p', 4.6);
tl.fromTo('#f06-ctx .f06-chip', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out', stagger: 0.12 }, 5.5);
fly('#f06-qa', 7.1);
tl.fromTo('#f06-vs', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 7.8);
fly('#f06-qb', 8.0);
tl.fromTo('#f06-div .f06-chip', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out', stagger: 0.12 }, 8.9);
${nodJs('f06', 2.0, 1.2, 4)}
${nodJs('f06', 4.6, 1.2, 4)}
${faceJs('f06', 'Explaining', 'Smile', 9.4)}
${blinkJs('f06', 'Smile', 10.3)}
`,
  sfx: [['whoosh-short', 2.0, 0.4], ['click-soft', 2.9, 0.4], ['whoosh-short', 4.6, 0.4], ['click-soft', 5.5, 0.4], ['whoosh-short', 7.1, 0.4], ['whoosh-short', 8.0, 0.4], ['click-soft', 8.9, 0.4]],
};
