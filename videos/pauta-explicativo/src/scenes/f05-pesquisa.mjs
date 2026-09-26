// Frame 5 — A redação lê a cobertura real. dataviz-countup (Adapt) + grid-card-assemble.
import { C, GRAIN, header, headerJs, cast, castJs, faceJs, blinkJs, nodJs } from '../lib.mjs';

const COLS = 20, ROWS = 10, X0 = 700, Y0 = 290, W = 46, H = 36, G = 9;
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const SEL = new Set(); while (SEL.size < 17) SEL.add(Math.floor(rnd() * COLS * ROWS));
const cards = Array.from({ length: COLS * ROWS }, (_, i) => {
  const c = i % COLS, r = Math.floor(i / COLS);
  return `<div class="f05-c f05-col${c}${SEL.has(i) ? ' f05-sel' : ''}" style="left:${X0 + c * (W + G)}px;top:${Y0 + r * (H + G)}px;"><i></i><i></i></div>`;
}).join('');
const OUT = ['Folha de S.Paulo', 'Gazeta do Povo', 'A Tarde', 'Estado de Minas', 'ND Mais', 'DCM', 'NeoFeed', 'Exame', '+5'];
const SCAN0 = 2.6, SCAN1 = 6.0;

export default {
  id: 'f05-pesquisa',
  duration: 12,
  css: `
.f05-c{position:absolute;width:${W}px;height:${H}px;box-sizing:border-box;padding:7px 6px;border:2px solid ${C.ink};border-radius:7px;background:${C.paper};display:flex;flex-direction:column;gap:5px;}
.f05-c i{display:block;height:4px;border-radius:2px;background:${C.rule};}
.f05-c i+i{width:60%;}
#f05-band{position:absolute;left:${X0 - 40}px;top:${Y0 - 24}px;width:34px;height:${ROWS * (H + G) + 38}px;border-radius:17px;background:linear-gradient(90deg,rgba(232,200,115,0),rgba(232,200,115,.85),rgba(232,200,115,0));}
.f05-stat{position:absolute;top:760px;}
.f05-stat b{display:block;font-family:'Newsreader',serif;font-weight:400;font-size:112px;line-height:1;letter-spacing:-2px;}
.f05-stat span{display:block;margin-top:8px;font-size:22px;color:${C.mute};}
#f05-s1{left:700px;} #f05-s2{left:1070px;} #f05-s3{left:1440px;}
#f05-s2 b,#f05-s3 b{color:${C.navy};}
#f05-rule{position:absolute;left:700px;top:748px;width:1100px;height:2px;background:${C.ink};}
#f05-per{position:absolute;left:700px;top:966px;font-size:21px;color:${C.navy};}
#f05-outs{position:absolute;left:700px;top:1004px;display:flex;gap:10px;flex-wrap:nowrap;}
.f05-o{padding:8px 16px;border:2px solid ${C.ink};border-radius:999px;background:${C.paper};font-size:19px;font-weight:600;white-space:nowrap;}
#f05-legend{position:absolute;left:700px;top:246px;display:flex;gap:26px;font-size:18px;color:${C.mute};}
#f05-legend span{display:inline-flex;align-items:center;gap:8px;}
#f05-legend i{display:block;width:14px;height:14px;border-radius:4px;border:2px solid ${C.ink};}
`,
  html: `

${header('f05', '03 · Pesquisa', 'A redação lê', 'a cobertura real.', 60)}
${cast('f05', 'leitor', { left: 90, top: 430, size: 480, bg: C.butter, h: 660, dx: -70, dy: -20 })}
<div id="f05-legend" class="mono"><span><i style="background:${C.creamDeep}"></i>lida</span><span><i style="background:${C.navy}"></i>entrou no recorte</span></div>
${cards}
<div id="f05-band"></div>
<div id="f05-rule"></div>
<div id="f05-s1" class="f05-stat"><b id="f05-n1">0</b><span class="mono">matérias lidas</span></div>
<div id="f05-s2" class="f05-stat"><b id="f05-n2">0</b><span class="mono">no recorte</span></div>
<div id="f05-s3" class="f05-stat"><b id="f05-n3">0</b><span class="mono">fontes</span></div>
<div id="f05-per" class="mono">Período das matérias · 29/08 → 25/09/2026</div>
<div id="f05-outs">${OUT.map((o) => `<div class="f05-o">${o}</div>`).join('')}</div>
`,
  js: `
${headerJs('f05')}
${castJs('f05', 0.3)}
tl.fromTo('#f05-legend', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.0);
// as 200 matérias entram em cascata
tl.fromTo('.f05-c', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', stagger: { grid: [${ROWS}, ${COLS}], from: 'start', amount: 1.2 } }, 0.7);
tl.fromTo('#f05-rule', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, 1.2);
tl.fromTo('.f05-stat', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, 1.5);
// faixa de leitura varre a grade; cada coluna vira "lida"; 17 são carimbadas em navy
tl.fromTo('#f05-band', { x: 0, opacity: 0 }, { x: ${COLS * (W + G) + 40}, opacity: 1, duration: ${SCAN1 - SCAN0}, ease: 'none' }, ${SCAN0});
tl.to('#f05-band', { opacity: 0, duration: 0.3 }, ${SCAN1});
for (let c = 0; c < ${COLS}; c++) {
  const t = ${SCAN0} + 0.1 + c * ${(SCAN1 - SCAN0) / COLS};
  tl.to('.f05-col' + c + ':not(.f05-sel)', { backgroundColor: '${C.creamDeep}', borderColor: '${C.rule}', duration: 0.25 }, t);
  tl.fromTo('.f05-col' + c + '.f05-sel', { scale: 1 }, { scale: 1.35, backgroundColor: '${C.navy}', duration: 0.18, ease: 'power2.out' }, t);
  tl.to('.f05-col' + c + '.f05-sel', { scale: 1, duration: 0.3, ease: 'power3.out' }, t + 0.18);
}
tl.set('.f05-sel i', { backgroundColor: '${C.butter}' }, ${SCAN1});
const count = (id, to, t, d) => { const o = { v: 0 }, el = document.querySelector(id); tl.fromTo(o, { v: 0 }, { v: to, duration: d, ease: 'power1.out', onUpdate: () => { el.textContent = Math.round(o.v); } }, t); };
count('#f05-n1', 200, ${SCAN0}, ${SCAN1 - SCAN0});
count('#f05-n2', 17, 6.3, 1.0);
count('#f05-n3', 13, 7.2, 1.0);
tl.fromTo('#f05-per', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 8.2);
tl.fromTo('.f05-o', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.12 }, 8.8);
// o Leitor lê: expressão concentrada, piscadas, acena no fim
${blinkJs('f05', 'Driven', 3.2)}
${blinkJs('f05', 'Driven', 6.8)}
${blinkJs('f05', 'Driven', 10.4)}
${nodJs('f05', 9.6, 1.4, 4)}
`,
  sfx: [['whoosh-short', 0.7, 0.35], ['click-soft', 2.6, 0.25], ['click-soft', 3.8, 0.25], ['click-soft', 5.0, 0.25], ['ping', 6.3, 0.35], ['ping', 7.2, 0.35], ['pop', 8.8, 0.3]],
};
