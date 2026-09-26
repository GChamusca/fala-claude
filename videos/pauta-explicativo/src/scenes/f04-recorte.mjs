// Frame 4 — A Editora pergunta o recorte. agent-progress-theater (Adapt: conversa até a confirmação).
import { C, GRAIN, header, headerJs, cast, castJs, faceJs, blinkJs, nodJs } from '../lib.mjs';

const OPTS = ['Eficácia e segurança', 'Impacto no mercado', 'Preços e acesso', 'Regulação no Brasil'];
export default {
  id: 'f04-recorte',
  duration: 9,
  css: `
#f04-chat{position:absolute;left:120px;top:270px;width:1180px;height:740px;box-sizing:border-box;border:3px solid ${C.ink};border-radius:30px;background:${C.cream};box-shadow:12px 12px 0 ${C.ink};overflow:hidden;}
#f04-bar{display:flex;align-items:center;gap:12px;padding:22px 34px;border-bottom:2px solid ${C.rule};font-size:20px;}
#f04-bar i{width:12px;height:12px;border-radius:50%;background:${C.butterDeep};display:block;}
.f04-m{position:absolute;max-width:900px;box-sizing:border-box;padding:20px 26px;border-radius:22px;font-size:30px;line-height:1.35;}
.f04-u{right:34px;background:${C.ink};color:${C.paper};border-bottom-right-radius:6px;}
.f04-e{left:34px;background:${C.paper};border:2px solid ${C.ink};border-bottom-left-radius:6px;font-family:'Newsreader',serif;font-size:33px;}
#f04-m1{top:100px;}
#f04-m2{top:180px;}
#f04-opts{position:absolute;left:34px;top:336px;display:flex;flex-wrap:nowrap;gap:12px;}
.f04-o{white-space:nowrap;padding:12px 20px;border:2px solid ${C.ink};border-radius:999px;background:${C.paper};font-size:24px;font-weight:600;}
#f04-m3{top:450px;}
#f04-m4{top:600px;}
#f04-dots{position:absolute;left:34px;top:600px;display:flex;gap:10px;padding:22px 26px;border:2px solid ${C.ink};border-radius:22px;background:${C.paper};}
#f04-dots i{width:14px;height:14px;border-radius:50%;background:${C.mute};display:block;}
#f04-name{position:absolute;left:1440px;top:1010px;font-size:20px;color:${C.mute};}
`,
  html: `

${header('f04', '02 · Recorte', 'A Editora pergunta', 'o que importa pra você.')}
${cast('f04', 'editor', { left: 1370, top: 400, size: 440, bg: C.cream, h: 640, dx: -50, dy: -20 })}
<div id="f04-chat">
  <div id="f04-bar" class="mono"><i></i>Assistente editorial</div>
  <div id="f04-m1" class="f04-m f04-u">Canetas emagrecedoras</div>
  <div id="f04-m2" class="f04-m f04-e">Entendi: canetas emagrecedoras. O que mais te interessa destacar?</div>
  <div id="f04-opts">${OPTS.map((o, i) => `<div id="f04-o${i}" class="f04-o">${o}</div>`).join('')}</div>
  <div id="f04-m3" class="f04-m f04-u">Preços e acesso: quem pode receber pelo SUS, quando começa e o que muda pra quem paga caro hoje.</div>
  <div id="f04-dots"><i></i><i></i><i></i></div>
  <div id="f04-m4" class="f04-m f04-e">Boa, esse é um recorte forte. Vou fechar a pauta nesse caminho.</div>
</div>
`,
  js: `
${headerJs('f04')}
tl.fromTo('#f04-chat', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.3);
${castJs('f04', 0.5)}
const msg = (sel, t) => tl.fromTo(sel, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, t);
msg('#f04-m1', 1.0);
msg('#f04-m2', 1.7);
tl.fromTo('.f04-o', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.12 }, 2.3);
${nodJs('f04', 1.7, 1.4, 3)}
// escolha: Preços e acesso
tl.to('#f04-o2', { scale: 0.94, duration: 0.1, ease: 'power2.in' }, 3.7);
tl.fromTo('#f04-o2', { backgroundColor: '${C.paper}', color: '${C.ink}' }, { backgroundColor: '${C.navy}', color: '${C.paper}', duration: 0.2 }, 3.8);
tl.to('#f04-o2', { scale: 1, duration: 0.25, ease: 'power2.out' }, 3.82);
tl.to(['#f04-o0', '#f04-o1', '#f04-o3'], { opacity: 0.4, duration: 0.4 }, 3.8);
msg('#f04-m3', 4.3);
// "digitando…" e resposta final
tl.fromTo('#f04-dots', { opacity: 0 }, { opacity: 1, duration: 0.25 }, 5.6);
tl.fromTo('#f04-dots i', { y: 0 }, { y: -8, duration: 0.22, ease: 'sine.inOut', stagger: 0.12, repeat: 3, yoyo: true }, 5.7);
tl.set('#f04-dots', { opacity: 0 }, 6.6);
msg('#f04-m4', 6.6);
${faceJs('f04', 'Calm', 'Smile', 6.7)}
${blinkJs('f04', 'Calm', 2.9)}
${nodJs('f04', 6.8, 1.2, 4)}
`,
  sfx: [['pop', 1.0, 0.4], ['pop', 1.7, 0.4], ['click-soft', 3.72, 0.6], ['pop', 4.3, 0.4], ['pop', 6.6, 0.4]],
};
