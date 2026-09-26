// Frame 3 — Você traz o tema. prompt-type-submit-generate (Adapt: corta no envio).
import { C, GRAIN, header, headerJs, cast, castJs, faceJs, blinkJs, HAND, chars, LOGO_MARK } from '../lib.mjs';

const TEXT = 'Canetas emagrecedoras';
export default {
  id: 'f03-tema',
  duration: 6,
  css: `
#f03-panel{position:absolute;left:760px;top:300px;width:1040px;box-sizing:border-box;padding:40px 48px 48px;border:3px solid ${C.ink};border-radius:30px;background:${C.paper};box-shadow:12px 12px 0 ${C.ink};}
#f03-brand{display:flex;align-items:center;gap:14px;font-family:'Newsreader',serif;font-size:30px;}
#f03-tag{margin-top:34px;font-size:20px;color:${C.navy};}
#f03-q{margin-top:10px;font-size:58px;}
#f03-input{margin-top:30px;height:104px;box-sizing:border-box;padding:0 30px;display:flex;align-items:center;border:3px solid ${C.ink};border-radius:20px;background:#fffdf8;box-shadow:6px 6px 0 ${C.ink};font-size:46px;font-weight:500;}
#f03-caret{display:inline-block;width:4px;height:52px;margin-left:4px;background:${C.navy};}
#f03-btn{margin-top:34px;display:inline-flex;padding:24px 40px;border-radius:999px;background:${C.navy};color:${C.paper};font-size:34px;font-weight:700;box-shadow:6px 6px 0 ${C.ink};}
#f03-ripple{position:absolute;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;border:4px solid ${C.butter};left:1059px;top:723px;}
#f03-hand{position:absolute;left:0;top:0;}
`,
  html: `

${header('f03', '01 · Tema', 'Você traz o tema.', 'Ou um link.')}
${cast('f03', 'ana_computer', { left: 110, top: 400, size: 520, bg: C.butter, h: 720, dx: -60, dy: -40 })}
<div id="f03-panel">
  <div id="f03-brand">${LOGO_MARK(40)}Pauta Pronta</div>
  <div id="f03-tag" class="mono">● Pauta nova · rascunho</div>
  <div id="f03-q" class="display">Sobre o que você quer publicar?</div>
  <div id="f03-input">${chars(TEXT, 'f03-ch')}<span id="f03-caret"></span></div>
  <div id="f03-btn">Criar minha publicação →</div>
</div>
<div id="f03-ripple"></div>
<div id="f03-hand">${HAND('f03-hand-svg')}</div>
`,
  js: `
${headerJs('f03', 0.05)}
${castJs('f03', 0.15)}
${faceJs('f03', 'Blank', 'Calm', 0)}
tl.fromTo('#f03-panel', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.25);
// digitação letra a letra
tl.set('.f03-ch', { opacity: 0 }, 0);
tl.to('.f03-ch', { opacity: 1, duration: 0.01, stagger: 0.095 }, 1.2);
// cursor do texto pisca (finito)
for (let i = 0; i < 6; i++) { tl.set('#f03-caret', { opacity: 0 }, 3.4 + i * 0.5); tl.set('#f03-caret', { opacity: 1 }, 3.65 + i * 0.5); }
${blinkJs('f03', 'Calm', 2.6)}
// mão vai ao botão e clica
tl.fromTo('#f03-hand', { x: 1560, y: 1000, opacity: 0 }, { x: 1035, y: 719, opacity: 1, duration: 1.0, ease: 'power3.inOut' }, 3.3);
tl.to('#f03-hand', { scale: 0.86, duration: 0.1, ease: 'power2.in', transformOrigin: '30% 10%' }, 4.35);
tl.to('#f03-hand', { scale: 1, duration: 0.2, ease: 'power2.out' }, 4.45);
tl.to('#f03-btn', { scale: 0.95, duration: 0.1, ease: 'power2.in' }, 4.35);
tl.to('#f03-btn', { scale: 1, duration: 0.25, ease: 'power2.out' }, 4.45);
tl.fromTo('#f03-ripple', { scale: 0, opacity: 1 }, { scale: 4, opacity: 0, duration: 0.7, ease: 'power2.out' }, 4.4);
${faceJs('f03', 'Calm', 'Smile', 4.6)}
`,
  sfx: [['typing', 1.2, 0.45], ['typing', 2.5, 0.35], ['click', 4.38, 0.6]],
};
