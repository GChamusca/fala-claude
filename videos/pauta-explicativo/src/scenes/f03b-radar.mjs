// Frame 3b — Radar: o Pauta também traz o que está em alta. constellation-hub (Adapt) + cursor-ui-demo.
// Assuntos, volumes, tendências e "quem moveu" copiados do Radar real (painel de 7 dias).
import { C, header, headerJs, HAND } from '../lib.mjs';

// [título, matérias, tendência, cx, cy, clara?]
const BUB = [
  ['STF valida reajuste do Bolsa Família', 452, '↓71%', 390, 490],
  ['Casa Branca barra jornalistas', 109, '↑100%', 665, 440],
  ['Relatoria indefinida trava pedidos de prisão', 233, '↓41%', 930, 480],
  ['Greve nacional dos Correios', 45, '↑99%', 205, 700, 1],
  ['Soberania e combate às facções', 237, '↑100%', 645, 660],
  ['Mensagens ampliam crise no STF', 165, '↑61%', 1075, 700],
  ['Prisão enfraquece grupo político', 182, '↓63%', 400, 875],
  ['Empate em Minas, vantagem em São Paulo', 213, '↑72%', 875, 875],
  ['TSE mira rede e deepfake eleitoral', 53, '↑74%', 1115, 920, 1],
];
const R = (n) => Math.round(38 + Math.sqrt(n) * 4.4);
const MOVED = [['UOL Notícias', 30], ['Metrópoles', 18], ['Brasil 247', 18], ['CNN Brasil', 13], ['Folha de S.Paulo', 11]];
const HERO = 4;

export default {
  id: 'f03b-radar',
  duration: 9.5,
  css: `
#f3r-panel{position:absolute;left:120px;top:250px;width:1100px;height:780px;box-sizing:border-box;border:3px solid ${C.ink};border-radius:28px;background:${C.paper};box-shadow:12px 12px 0 ${C.ink};overflow:hidden;}
#f3r-bar{position:absolute;left:0;right:0;top:0;height:74px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;border-bottom:2px solid ${C.rule};background:${C.cream};}
#f3r-bar .mono{font-size:18px;}
#f3r-pills{display:flex;gap:6px;}
#f3r-pills span{padding:6px 12px;border-radius:8px;font-size:16px;}
#f3r-pills .on{background:${C.creamDeep};color:${C.navy};}
.f3r-b{position:absolute;box-sizing:border-box;border-radius:50%;background:${C.navy};color:${C.paper};border:3px solid ${C.ink};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 16px;font-family:'Newsreader',serif;line-height:1.1;}
.f3r-b.lt{background:${C.cream};color:${C.ink};}
.f3r-b small{display:block;margin-top:6px;font-family:'JetBrains Mono',monospace;font-size:14px;opacity:.85;}
.f3r-b i{position:absolute;right:4%;top:6%;padding:3px 8px;border-radius:999px;background:${C.paper};color:${C.ink};border:2px solid ${C.ink};font-style:normal;font-family:'JetBrains Mono',monospace;font-size:13px;}
#f3r-ring{position:absolute;border-radius:50%;border:6px solid ${C.butter};box-sizing:border-box;}
#f3r-stats{position:absolute;left:1290px;top:270px;width:520px;}
.f3r-s{padding:22px 0;border-bottom:2px solid ${C.rule};}
.f3r-s .mono{font-size:18px;color:${C.mute};}
.f3r-s b{display:block;font-family:'Newsreader',serif;font-weight:400;font-size:84px;line-height:1;margin-top:6px;}
#f3r-detail{position:absolute;left:1270px;top:250px;width:560px;box-sizing:border-box;padding:30px 32px;border:3px solid ${C.ink};border-radius:26px;background:${C.cream};box-shadow:10px 10px 0 ${C.ink};}
#f3r-detail .mono{font-size:16px;color:${C.rose};}
#f3r-detail h3{margin:8px 0 0;font-family:'Newsreader',serif;font-weight:400;font-size:40px;line-height:1.1;}
#f3r-nums{display:flex;gap:30px;margin-top:18px;font-family:'Newsreader',serif;font-size:44px;}
#f3r-nums span{font-family:'JetBrains Mono',monospace;font-size:14px;color:${C.mute};margin-left:8px;text-transform:uppercase;letter-spacing:.14em;}
#f3r-moved{margin-top:18px;}
#f3r-moved .mono{color:${C.navy};}
.f3r-m{display:grid;grid-template-columns:200px minmax(0,1fr) 36px;align-items:center;gap:12px;margin-top:10px;font-family:'Newsreader',serif;font-size:24px;}
.f3r-m em{display:block;height:8px;border-radius:4px;background:${C.creamDeep};}
.f3r-m em b{display:block;height:8px;border-radius:4px;background:${C.navy};}
.f3r-m span{font-family:'JetBrains Mono',monospace;font-size:16px;text-align:right;}
#f3r-go{margin-top:26px;display:inline-flex;padding:18px 26px;border-radius:14px;background:${C.navy};color:${C.paper};font-family:'JetBrains Mono',monospace;font-size:18px;letter-spacing:.1em;text-transform:uppercase;box-shadow:6px 6px 0 ${C.ink};}
#f3r-ripple{position:absolute;left:1532px;top:770px;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;border:4px solid ${C.butter};}
`,
  html: `
${header('f3r', '01 · Ou pelo Radar', 'Sem ideia?', 'O Radar mostra o que está em alta.')}
<div id="f3r-panel">
  <div id="f3r-bar"><span class="mono" style="color:${C.navy};">Radar · todos os assuntos</span><div id="f3r-pills" class="mono"><span>Agora</span><span>24H</span><span class="on">7D</span><span>30D</span></div></div>
  ${BUB.map(([t, n, tr, cx, cy, lt], i) => { const r = R(n); return `<div id="f3r-b${i}" class="f3r-b${lt ? ' lt' : ''}" style="left:${cx - 120 - r}px;top:${cy - 250 - r}px;width:${2 * r}px;height:${2 * r}px;font-size:${Math.round(r * 0.2)}px;">${t}<small>${n} mat.</small><i>${tr}</i></div>`; }).join('')}
  <div id="f3r-ring" style="left:${BUB[HERO][3] - 120 - R(BUB[HERO][1]) - 14}px;top:${BUB[HERO][4] - 250 - R(BUB[HERO][1]) - 14}px;width:${2 * R(BUB[HERO][1]) + 28}px;height:${2 * R(BUB[HERO][1]) + 28}px;"></div>
</div>
<div id="f3r-stats">
  <div class="f3r-s"><span class="mono">Matérias hoje</span><b id="f3r-n1">0</b></div>
  <div class="f3r-s"><span class="mono">Últimos 7 dias</span><b id="f3r-n2">0</b></div>
  <div class="f3r-s"><span class="mono">Veículos acompanhados</span><b id="f3r-n3">0</b></div>
</div>
<div id="f3r-detail">
  <span class="mono">Assunto em alta · ↑100%</span>
  <h3>Lula prepara discurso na ONU com soberania e facções</h3>
  <div id="f3r-nums">229<span>matérias</span> 48<span>veículos</span></div>
  <div id="f3r-moved"><span class="mono">Quem moveu</span>${MOVED.map(([v, n]) => `<div class="f3r-m">${v}<em><b style="width:${Math.round((n / 30) * 100)}%"></b></em><span>${n}</span></div>`).join('')}</div>
  <div id="f3r-go">Gerar pauta sobre este assunto →</div>
</div>
<div id="f3r-ripple"></div>
<div id="f3r-hand" style="position:absolute;left:0;top:0;">${HAND('f3r-hand-svg')}</div>
`,
  js: `
${headerJs('f3r', 0.05)}
tl.fromTo('#f3r-panel', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.25);
tl.fromTo('.f3r-b', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.09 }, 0.7);
tl.fromTo('.f3r-b i', { scale: 0 }, { scale: 1, duration: 0.3, ease: 'power3.out', stagger: 0.09 }, 1.3);
// deriva suave (finita) das bolhas
${BUB.map((_, i) => `tl.to('#f3r-b${i}', { y: ${(i % 2 ? 1 : -1) * (6 + (i % 3) * 3)}, duration: 3.2, ease: 'sine.inOut' }, 1.5);`).join('\n')}
tl.fromTo('#f3r-stats .f3r-s', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, 0.9);
const cnt = (id, to, t, fmt) => { const o = { v: 0 }, el = document.querySelector(id); tl.fromTo(o, { v: 0 }, { v: to, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('pt-BR'); } }, t); };
cnt('#f3r-n1', 5374, 1.1); cnt('#f3r-n2', 37435, 1.2); cnt('#f3r-n3', 102, 1.3);
// clique no assunto em alta
const H = { x: ${BUB[HERO][3] - 24}, y: ${BUB[HERO][4] - 4} };
tl.fromTo('#f3r-hand', { x: 1500, y: 1060, opacity: 0 }, { x: H.x, y: H.y, opacity: 1, duration: 1.0, ease: 'power3.inOut' }, 3.6);
tl.to('#f3r-hand', { scale: 0.86, duration: 0.1, transformOrigin: '30% 10%' }, 4.6);
tl.to('#f3r-hand', { scale: 1, duration: 0.2 }, 4.7);
tl.fromTo('#f3r-ring', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }, 4.65);
tl.to('#f3r-b${HERO}', { scale: 1.06, duration: 0.5, ease: 'power3.out' }, 4.65);
tl.to(${JSON.stringify(BUB.map((_, i) => `#f3r-b${i}`).filter((_, i) => i !== HERO))}, { opacity: 0.25, duration: 0.5 }, 4.7);
// o painel do assunto entra no lugar dos números
tl.to('#f3r-stats', { x: 40, opacity: 0, duration: 0.4, ease: 'power3.in' }, 4.8);
tl.fromTo('#f3r-detail', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 5.1);
tl.fromTo('.f3r-m em b', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 5.6);
// gerar pauta
tl.to('#f3r-hand', { x: 1508, y: 766, duration: 0.9, ease: 'power3.inOut' }, 6.6);
tl.to('#f3r-go', { scale: 0.95, duration: 0.1 }, 7.6);
tl.to('#f3r-go', { scale: 1, duration: 0.25 }, 7.7);
tl.to('#f3r-hand', { scale: 0.86, duration: 0.1 }, 7.6);
tl.to('#f3r-hand', { scale: 1, duration: 0.2 }, 7.7);
tl.fromTo('#f3r-ripple', { scale: 0, opacity: 1 }, { scale: 4, opacity: 0, duration: 0.7, ease: 'power2.out' }, 7.65);
`,
  sfx: [['pop', 0.7, 0.3], ['pop', 1.1, 0.25], ['click', 4.62, 0.6], ['whoosh-short', 5.1, 0.35], ['click', 7.62, 0.6]],
};
