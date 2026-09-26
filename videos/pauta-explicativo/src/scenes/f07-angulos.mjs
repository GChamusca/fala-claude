// Frame 7 — Três ângulos, você escolhe. grid-card-assemble (Adapt) + cursor-ui-demo.
import { C, GRAIN, header, headerJs, HAND } from '../lib.mjs';

const CARDS = [
  ['Alternativa', 'Próximos passos e prazos', 'O cronograma da Conitec, a decisão do Ministério e o protocolo clínico.', 7],
  ['Recomendado', 'A promessa e sua execução', 'O anúncio de distribuição gratuita e as etapas que ainda faltam.', 13],
  ['Alternativa', 'O que já mudou no mercado', 'Fim da patente, genéricos e o preço para quem paga hoje.', 4],
];
export default {
  id: 'f07-angulos',
  duration: 8,
  css: `
.f07-card{position:absolute;top:300px;width:540px;height:440px;box-sizing:border-box;padding:34px;display:flex;flex-direction:column;border:3px solid ${C.ink};border-radius:26px;background:${C.paper};box-shadow:10px 10px 0 ${C.ink};}
.f07-tag{font-size:18px;color:${C.mute};}
.f07-t{margin-top:18px;font-family:'Newsreader',serif;font-size:50px;line-height:1.05;}
.f07-d{margin-top:16px;font-size:26px;line-height:1.35;color:${C.inkSoft};}
.f07-n{margin-top:auto;display:flex;align-items:center;gap:14px;font-size:18px;color:${C.mute};}
.f07-n i{display:block;height:12px;border-radius:6px;background:${C.navy};}
#f07-c1 .f07-tag{display:inline-block;align-self:flex-start;padding:6px 14px;border-radius:999px;background:${C.butter};color:${C.ink};}
#f07-btn{margin-top:22px;align-self:flex-start;padding:16px 28px;border-radius:999px;background:${C.navy};color:${C.paper};font-size:24px;font-weight:700;box-shadow:5px 5px 0 ${C.ink};}
#f07-check{position:absolute;right:26px;top:26px;width:56px;height:56px;border-radius:50%;background:${C.grass};border:3px solid ${C.ink};color:${C.paper};font-size:32px;line-height:50px;text-align:center;}
#f07-quote{position:absolute;left:420px;top:830px;width:1080px;box-sizing:border-box;padding:22px 30px;border-radius:20px;background:${C.cream};border:2px solid ${C.rule};}
#f07-quote .mono{font-size:18px;color:${C.navy};}
#f07-quote p{margin:8px 0 0;font-family:'Newsreader',serif;font-style:italic;font-size:32px;line-height:1.3;}
`,
  html: `

${header('f07', '05 · Ângulo', 'Três caminhos, cada um com fontes.', 'Você escolhe.')}
${CARDS.map(([tag, t, d, n], i) => `<div id="f07-c${i}" class="f07-card" style="left:${120 + i * 580}px;"><span class="f07-tag mono">${tag}</span><div class="f07-t">${t}</div><div class="f07-d">${d}</div>${i === 1 ? '<div id="f07-btn">Usar este ângulo</div><div id="f07-check">✓</div>' : ''}<div class="f07-n mono"><i style="width:${n * 16}px"></i>${n} matérias</div></div>`).join('')}
<div id="f07-quote"><span class="mono">Trecho que apoia · Folha de S.Paulo · 18/09</span><p>“Após promessa de campanha de Lula, o Ministério da Saúde avalia pedir o uso de canetas emagrecedoras no SUS para a Conitec.”</p></div>
<div id="f07-hand" style="position:absolute;left:0;top:0;">${HAND('f07-hand-svg')}</div>
`,
  js: `
${headerJs('f07', 0.1)}
tl.fromTo('.f07-card', { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 }, 0.5);
tl.fromTo('.f07-n i', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 }, 1.2);
// o recomendado sobe; os outros recuam
tl.to('#f07-c1', { y: -26, boxShadow: '14px 14px 0 ${C.navy}', borderColor: '${C.navy}', duration: 0.7, ease: 'power3.out' }, 2.4);
tl.to(['#f07-c0', '#f07-c2'], { opacity: 0.45, duration: 0.6 }, 2.5);
tl.fromTo('#f07-quote', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 3.2);
// clique em "Usar este ângulo"
tl.fromTo('#f07-hand', { x: 1500, y: 1000, opacity: 0 }, { x: 850, y: 612, opacity: 1, duration: 1.0, ease: 'power3.inOut' }, 4.6);
tl.to('#f07-hand', { scale: 0.86, duration: 0.1, transformOrigin: '30% 10%' }, 5.65);
tl.to('#f07-hand', { scale: 1, duration: 0.2 }, 5.75);
tl.to('#f07-btn', { scale: 0.94, duration: 0.1 }, 5.65);
tl.to('#f07-btn', { scale: 1, duration: 0.25 }, 5.75);
tl.fromTo('#f07-check', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' }, 5.8);
`,
  sfx: [['pop', 0.5, 0.3], ['pop', 0.65, 0.3], ['pop', 0.8, 0.3], ['whoosh-short', 2.4, 0.35], ['click', 5.68, 0.6], ['chime', 5.8, 0.3]],
};
