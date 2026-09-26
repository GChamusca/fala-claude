// Frame 1 — Mil manchetes (hook). overwhelm-surround (Adapt) + kinetic-type-beats.
import { C, peep, words, GRAIN } from '../lib.mjs';

// Manchetes reais da cobertura usada na pauta de exemplo (veículo · data · título).
const NEWS = [
  ['Folha de S.Paulo · 18/09', 'Governo avalia levar ao SUS caneta prometida por Lula, mas oferta não seria imediata'],
  ['Gazeta do Povo · 24/09', 'Lula promete canetas, mas não sabe quanto custará, quem vai receber nem quando'],
  ['A Tarde · 18/09', 'Canetas de graça no SUS ainda dependem de três etapas'],
  ['Estado de Minas · 24/09', 'Caneta no SUS: entenda como o preço pode cair na farmácia'],
  ['DCM · 18/09', 'Lula anuncia canetas no SUS, mas medida tem três etapas'],
  ['ND Mais · 18/09', 'SUS confirma distribuição gratuita de canetas'],
];
const COLS = 14, ROWS = 10;
const tiles = Array.from({ length: COLS * ROWS }, (_, i) => {
  const [src, h] = NEWS[(i * 7 + Math.floor(i / COLS) * 3) % NEWS.length];
  const tone = i % 11 === 3 ? ' t-butter' : i % 13 === 6 ? ' t-navy' : i % 5 === 1 ? ' t-cream' : '';
  return `<div class="t${tone}"><span class="t-src mono">${src}</span><span class="t-h">${h}</span></div>`;
}).join('');

export default {
  id: 'f01-hook',
  duration: 8.5,
  css: `
#f01-persp{position:absolute;inset:0;perspective:1800px;perspective-origin:62% 38%;}
#f01-plane{position:absolute;left:50%;top:50%;width:4232px;height:1816px;margin-left:-2116px;margin-top:-908px;transform:rotateX(44deg) rotateZ(-21deg);transform-style:preserve-3d;}
#f01-drift{display:grid;grid-template-columns:repeat(${COLS},280px);gap:24px;}
#f01-drift .t{height:160px;box-sizing:border-box;padding:16px 18px;border:2px solid ${C.ink};border-radius:14px;background:${C.paper};box-shadow:5px 5px 0 ${C.ink};display:flex;flex-direction:column;gap:8px;overflow:hidden;}
#f01-drift .t-src{font-size:13px;color:${C.navy};letter-spacing:.12em;}
#f01-drift .t-h{font-family:'Newsreader',serif;font-size:23px;line-height:1.18;color:${C.inkSoft};}
#f01-drift .t-cream{background:${C.cream};}
#f01-drift .t-butter{background:${C.butter};}
#f01-drift .t-navy{background:${C.navy};}
#f01-drift .t-navy .t-src{color:${C.butter};}
#f01-drift .t-navy .t-h{color:${C.paper};}
#f01-veil{position:absolute;inset:0;background:linear-gradient(90deg,rgba(247,243,236,.98) 0%,rgba(247,243,236,.96) 44%,rgba(247,243,236,.62) 60%,rgba(247,243,236,.18) 82%,rgba(247,243,236,.08) 100%);}
#f01-vig{position:absolute;inset:0;background:radial-gradient(120% 90% at 70% 45%,rgba(247,243,236,0) 55%,rgba(247,243,236,.85) 100%);}
#f01-eyebrow{position:absolute;left:128px;top:300px;font-size:24px;color:${C.navy};}
#f01-l1,#f01-l2{position:absolute;left:120px;top:352px;font-size:140px;line-height:1.02;}
#f01-slot{display:inline-block;height:1.14em;overflow:hidden;vertical-align:top;}
#f01-roll{display:block;}
#f01-roll em{display:block;height:1.14em;}
#f01-l2 .ln{display:block;}
.f01-q{position:absolute;left:128px;width:860px;box-sizing:border-box;padding:20px 26px;border:3px solid ${C.ink};border-radius:22px;background:${C.paper};box-shadow:8px 8px 0 ${C.ink};}
.f01-q .mono{font-size:20px;color:${C.rose};}
.f01-q p{margin:6px 0 0;font-family:'Newsreader',serif;font-style:italic;font-size:36px;line-height:1.2;}
#f01-qa{top:586px;}
#f01-qb{top:778px;}
#f01-neq{position:absolute;left:1010px;top:724px;width:84px;height:84px;border-radius:50%;background:${C.rose};border:3px solid ${C.ink};color:${C.paper};font-size:54px;line-height:78px;text-align:center;font-weight:700;box-shadow:5px 5px 0 ${C.ink};}
#f01-disc{position:absolute;left:1190px;top:318px;width:580px;height:580px;border-radius:50%;background:${C.butter};border:3px solid ${C.ink};box-shadow:10px 10px 0 ${C.ink};}
#f01-ana{position:absolute;left:1160px;top:296px;height:784px;}
.f01-chip{position:absolute;display:flex;align-items:center;gap:12px;padding:12px 20px;border:2px solid ${C.ink};border-radius:999px;background:${C.paper};box-shadow:5px 5px 0 ${C.ink};font-size:21px;white-space:nowrap;}
.f01-chip i{display:block;width:13px;height:13px;border-radius:50%;}
#f01-ca{left:1060px;top:176px;}
#f01-cb{left:1480px;top:92px;}
#f01-q-mark{position:absolute;left:1722px;top:292px;width:120px;height:170px;overflow:visible;}
`,
  html: `
<div id="f01-persp"><div id="f01-plane"><div id="f01-drift">${tiles}</div></div></div>
<div id="f01-veil"></div>
<div id="f01-vig"></div>
${GRAIN('f01-grain')}
<div id="f01-eyebrow" class="mono">O dia a dia de quem publica</div>
<div id="f01-l1" class="display"><span class="wm"><span class="w">Mil</span></span> <span class="wm"><span class="w"><span id="f01-slot"><span id="f01-roll"><em>manchetes.</em><em>versões.</em></span></span></span></span></div>
<div id="f01-l2" class="display"><span class="ln">${words('Qual vira')}</span><span class="ln">${words('o seu')} <span class="wm"><span class="w"><em>post?</em></span></span></span></div>
<div id="f01-qa" class="f01-q"><span class="mono">DCM · 18/09</span><p>“Lula anuncia canetas no SUS”</p></div>
<div id="f01-qb" class="f01-q"><span class="mono">A Tarde · 18/09</span><p>“Canetas de graça no SUS ainda dependem de três etapas”</p></div>
<div id="f01-neq">≠</div>
<div id="f01-disc"></div>
<div id="f01-ana">${peep('ana_computer', 'f01-ana-svg')}</div>
<div id="f01-ca" class="f01-chip mono"><i style="background:${C.navy}"></i><span id="f01-count">+48</span>&nbsp;matérias novas</div>
<div id="f01-cb" class="f01-chip mono"><i style="background:${C.rose}"></i>Atualização · 14:02</div>
<svg id="f01-q-mark" viewBox="0 0 120 170" aria-hidden="true"><path id="f01-q-path" d="M22 48 C 20 14, 96 6, 98 44 C 100 76, 58 78, 58 112" fill="none" stroke="${C.navy}" stroke-width="11" stroke-linecap="round"></path><circle id="f01-q-dot" cx="58" cy="150" r="9" fill="${C.navy}"></circle></svg>
`,
  js: `
const R = '#root';
// cena de fundo: cartões entram do centro para fora e o plano desliza devagar
tl.fromTo('#f01-drift .t', { opacity: 0, scale: 0.72 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: { grid: [${ROWS}, ${COLS}], from: 'center', amount: 1.1 } }, 0);
tl.fromTo('#f01-drift', { x: 0, y: 0 }, { x: -300, y: 120, duration: 8.5, ease: 'none' }, 0);
// texto
tl.fromTo('#f01-eyebrow', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.35);
tl.fromTo('#f01-l1 .w', { yPercent: 115 }, { yPercent: 0, duration: 0.85, ease: 'power3.out', stagger: 0.14 }, 0.55);
tl.set('#f01-l2', { opacity: 0 }, 0);
// Ana entra
tl.fromTo('#f01-disc', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.0, ease: 'expo.out' }, 0.7);
tl.fromTo('#f01-ana', { y: 820 }, { y: 0, duration: 1.15, ease: 'power3.out' }, 0.8);
const head = '#f01-ana .peep-head';
gsap.set(head, { svgOrigin: '610 900' });
tl.fromTo(head, { rotation: 0 }, { rotation: -3, duration: 2.2, ease: 'sine.inOut' }, 1.0);
tl.to(head, { rotation: 2.5, duration: 1.4, ease: 'sine.inOut' }, 3.2);
tl.to(head, { rotation: -2, duration: 1.6, ease: 'sine.inOut' }, 4.6);
tl.to(head, { rotation: 1, duration: 2.2, ease: 'sine.inOut' }, 6.2);
// avisos pipocando + contador crescendo
const pop = (sel, t) => tl.fromTo(sel, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' }, t);
pop('#f01-ca', 1.6); pop('#f01-cb', 2.15);
const cnt = { v: 48 }, cel = document.querySelector('#f01-count');
tl.fromTo(cnt, { v: 48 }, { v: 212, duration: 6.6, ease: 'power1.in', onUpdate: () => { cel.textContent = '+' + Math.round(cnt.v); } }, 1.8);
// "Mil manchetes." → "Mil versões." (troca no lugar) + rosto preocupado
tl.fromTo('#f01-roll', { yPercent: 0 }, { yPercent: -50, duration: 0.7, ease: 'power3.inOut' }, 3.25);
tl.set('#f01-ana .pf-Hectic', { opacity: 0 }, 3.4);
tl.set('#f01-ana .pf-Concerned', { opacity: 1 }, 3.4);
tl.fromTo('#f01-qa', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 3.75);
tl.fromTo('#f01-qb', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 4.15);
tl.fromTo('#f01-neq', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }, 4.55);
// saída da linha 1 e entrada da pergunta
tl.to('#f01-l1', { y: -70, opacity: 0, duration: 0.45, ease: 'power3.in' }, 5.55);
tl.to(['#f01-qa', '#f01-qb', '#f01-neq'], { y: 50, opacity: 0, duration: 0.45, ease: 'power3.in', stagger: 0.05 }, 5.55);
tl.set('#f01-l2', { opacity: 1 }, 5.85);
tl.fromTo('#f01-l2 .w', { yPercent: 115 }, { yPercent: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1 }, 5.85);
// "?" desenhado à mão ao lado da cabeça
const qp = document.querySelector('#f01-q-path'); const L = qp.getTotalLength();
tl.set(qp, { opacity: 0 }, 0);
tl.set(qp, { opacity: 1 }, 6.35);
tl.fromTo(qp, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' }, 6.35);
tl.fromTo('#f01-q-dot', { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' }, 7.1);
`,
  sfx: [['whoosh', 0.0, 0.35], ['pop', 1.6, 0.5], ['pop', 2.15, 0.5], ['click-soft', 3.25, 0.6], ['whoosh-short', 5.55, 0.45]],
};
