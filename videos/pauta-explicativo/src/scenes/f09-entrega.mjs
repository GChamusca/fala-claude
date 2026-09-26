// Frame 9 — Pronto para revisar. device-surface-showcase (Adapt: progresso 0→100% e carrossel deslizando).
import { C, GRAIN, header, headerJs, LOGO_MARK } from '../lib.mjs';

const P = { x: 200, y: 250, w: 440, h: 800 };
const IMG_W = P.w - 28;
const CAPTION = [
  'Em setembro de 2026, o governo confirmou a intenção de distribuir as canetas emagrecedoras pelo SUS, mas sem data de início: a oferta não será imediata.',
  'Segundo a Folha de S.Paulo, a Gazeta do Povo e A Tarde, a oferta depende de análise da Conitec, de decisão do Ministério da Saúde e de definição de protocolo e financiamento.',
];
export default {
  id: 'f09-entrega',
  duration: 10,
  css: `
#f09-phone{position:absolute;left:${P.x}px;top:${P.y}px;width:${P.w}px;height:${P.h}px;box-sizing:border-box;border:5px solid ${C.ink};border-radius:60px;background:${C.ink};box-shadow:12px 12px 0 ${C.butterDeep};overflow:hidden;}
#f09-screen{position:absolute;left:14px;top:14px;right:14px;bottom:14px;border-radius:46px;background:#fffdf8;overflow:hidden;}
#f09-top{display:flex;align-items:center;gap:12px;padding:40px 22px 14px;font-weight:700;font-size:22px;}
#f09-view{position:relative;width:${IMG_W}px;height:${Math.round(IMG_W * 1.25)}px;overflow:hidden;background:${C.cream};}
#f09-strip{display:flex;width:${IMG_W * 4}px;height:100%;}
#f09-strip img{width:${IMG_W}px;height:100%;object-fit:cover;display:block;}
#f09-dots{display:flex;justify-content:center;gap:8px;padding:14px;}
#f09-dots i{display:block;width:9px;height:9px;border-radius:50%;background:${C.rule};}
#f09-dots i.on{background:${C.navy};}
#f09-bars{padding:0 22px;}
#f09-bars b{display:block;height:10px;border-radius:5px;background:${C.creamDeep};margin-top:10px;}
#f09-prog{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;background:${C.cream};}
#f09-ring{width:210px;height:210px;}
#f09-pct{position:absolute;top:calc(50% - 60px);font-family:'Newsreader',serif;font-size:62px;}
#f09-plab{margin-top:150px;font-size:18px;color:${C.mute};text-align:center;}
#f09-cap{position:absolute;left:760px;top:300px;width:1040px;box-sizing:border-box;padding:34px 40px;border:3px solid ${C.ink};border-radius:26px;background:${C.paper};box-shadow:10px 10px 0 ${C.ink};}
#f09-cap .mono{font-size:19px;color:${C.mute};}
#f09-cap p{margin:14px 0 0;font-family:'Newsreader',serif;font-size:33px;line-height:1.38;}
#f09-acts{position:absolute;left:760px;top:862px;display:flex;gap:16px;}
.f09-a{padding:18px 30px;border:3px solid ${C.ink};border-radius:999px;background:${C.paper};font-size:26px;font-weight:700;}
.f09-a.pri{background:${C.navy};color:${C.paper};box-shadow:5px 5px 0 ${C.ink};}
`,
  html: `

${header('f09', '07 · Entrega', 'Texto, arte e legenda.', 'Prontos pra revisar.')}
<div id="f09-phone"><div id="f09-screen">
  <div id="f09-top">${LOGO_MARK(34)}pautapronta</div>
  <div id="f09-view"><div id="f09-strip">${[1, 2, 3, 4].map((n) => `<img src="assets/slides/slide-${n}.jpg" alt="Slide ${n} do carrossel">`).join('')}</div></div>
  <div id="f09-dots">${[0, 1, 2, 3].map((i) => `<i id="f09-dot${i}"${i ? '' : ' class="on"'}></i>`).join('')}</div>
  <div id="f09-bars"><b style="width:92%"></b><b style="width:70%"></b></div>
  <div id="f09-prog"><svg id="f09-ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="${C.creamDeep}" stroke-width="10"></circle><circle id="f09-arc" cx="60" cy="60" r="52" fill="none" stroke="${C.navy}" stroke-width="10" stroke-linecap="round" transform="rotate(-90 60 60)"></circle></svg><div id="f09-pct">0%</div><div id="f09-plab" class="mono">Montando sua<br>publicação</div></div>
</div></div>
<div id="f09-cap"><span class="mono">Legenda editorial</span>${CAPTION.map((c, i) => `<p id="f09-p${i}">${c}</p>`).join('')}</div>
<div id="f09-acts"><div class="f09-a">Mais curta</div><div class="f09-a">Mais detalhada</div><div class="f09-a pri">Pedir um ajuste</div></div>
`,
  js: `
${headerJs('f09', 0.1)}
tl.fromTo('#f09-phone', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.3);
// progresso 0 → 100%
const arc = document.querySelector('#f09-arc'), AL = 2 * Math.PI * 52, pct = document.querySelector('#f09-pct'), o = { v: 0 };
tl.fromTo(arc, { strokeDasharray: AL, strokeDashoffset: AL }, { strokeDashoffset: 0, duration: 2.2, ease: 'power1.inOut' }, 0.8);
tl.fromTo(o, { v: 0 }, { v: 100, duration: 2.2, ease: 'power1.inOut', onUpdate: () => { pct.textContent = Math.round(o.v) + '%'; } }, 0.8);
tl.to('#f09-prog', { opacity: 0, duration: 0.5, ease: 'power2.out' }, 3.2);
// slides deslizam como no Instagram
for (let i = 1; i < 4; i++) {
  const t = 3.4 + i * 1.3;
  tl.to('#f09-strip', { x: -${IMG_W} * i, duration: 0.6, ease: 'power3.inOut' }, t);
  tl.set('#f09-dot' + (i - 1), { backgroundColor: '${C.rule}' }, t + 0.3);
  tl.set('#f09-dot' + i, { backgroundColor: '${C.navy}' }, t + 0.3);
}
// legenda e botões de ajuste
tl.fromTo('#f09-cap', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 3.6);
tl.fromTo('#f09-p0', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 4.1);
tl.fromTo('#f09-p1', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 5.4);
tl.fromTo('.f09-a', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.15 }, 7.6);
`,
  sfx: [['chime', 3.0, 0.35], ['whoosh-short', 4.7, 0.3], ['whoosh-short', 6.0, 0.3], ['whoosh-short', 7.3, 0.3], ['pop', 7.6, 0.3]],
};
