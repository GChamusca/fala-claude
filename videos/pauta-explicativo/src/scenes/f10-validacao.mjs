// Frame 10 — Cada fato com a fonte. transcript-scroll-artifact-reveal (Adapt: documento → ligações às matérias).
import { C, GRAIN, header, headerJs, cast, castJs, faceJs, blinkJs, nodJs } from '../lib.mjs';

const SRC = [
  [2, 'Governo avalia levar ao SUS caneta prometida por Lula', 'Folha de S.Paulo · 18/09/2026', 290],
  [5, 'Lula promete canetas, mas não sabe quanto custará', 'Gazeta do Povo · 24/09/2026', 440],
  [3, 'Canetas de graça no SUS ainda dependem de três etapas', 'A Tarde · 18/09/2026', 590],
];
const hl = (id, t) => `<span id="f10-h${id}" class="f10-hl">${t}</span>`;
const sup = (n) => `<sup id="f10-s${n}" class="f10-sup">[${n}]</sup>`;
export default {
  id: 'f10-validacao',
  duration: 10,
  css: `
#f10-doc{position:absolute;left:120px;top:270px;width:880px;box-sizing:border-box;padding:36px 42px;border:3px solid ${C.ink};border-radius:26px;background:#fffdf8;box-shadow:10px 10px 0 ${C.ink};}
#f10-doc .mono{font-size:19px;color:${C.navy};}
#f10-doc p{margin:18px 0 0;font-family:'Newsreader',serif;font-size:40px;line-height:1.42;}
.f10-hl{background:linear-gradient(${C.butter},${C.butter}) no-repeat 0 88%/0% 44%;}
.f10-sup{font-family:'JetBrains Mono',monospace;font-size:20px;color:${C.navy};font-weight:600;vertical-align:super;display:inline-block;}
.f10-src{position:absolute;left:1180px;width:620px;height:122px;box-sizing:border-box;padding:16px 22px;border:3px solid ${C.ink};border-radius:20px;background:${C.paper};box-shadow:7px 7px 0 ${C.ink};}
.f10-src b{font-family:'JetBrains Mono',monospace;color:${C.navy};margin-right:8px;}
.f10-src div{font-size:25px;line-height:1.25;font-weight:600;}
.f10-src span{display:block;margin-top:8px;font-size:16px;color:${C.mute};}
#f10-links{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible;}
#f10-note{position:absolute;left:140px;top:890px;font-family:'Caveat',cursive;font-weight:700;font-size:64px;color:${C.rose};transform:rotate(-2deg);white-space:nowrap;}
#f10-noteclip{display:inline-block;overflow:hidden;vertical-align:bottom;}
`,
  html: `

${header('f10', '08 · Documento de validação', 'Cada fato, ligado', 'à matéria de origem.')}
<div id="f10-doc"><span class="mono">Validação · Canetas no SUS</span><p>Segundo a ${hl(0, 'Folha de S.Paulo')}${sup(2)}, a ${hl(1, 'Gazeta do Povo')}${sup(5)} e ${hl(2, 'A Tarde')}${sup(3)}, a oferta depende de análise da Conitec, de decisão do Ministério da Saúde e de definição de protocolo e financiamento.</p></div>
<svg id="f10-links" viewBox="0 0 1920 1080" aria-hidden="true">${SRC.map(([n, , , y], i) => `<path id="f10-l${i}" d="M 1004 ${400 + i * 60} C 1090 ${400 + i * 60}, 1090 ${y + 61}, 1176 ${y + 61}" fill="none" stroke="${C.navy}" stroke-width="4" stroke-linecap="round"></path><circle id="f10-c${i}" cx="1004" cy="${400 + i * 60}" r="9" fill="${C.navy}"></circle>`).join('')}</svg>
${SRC.map(([n, t, s, y], i) => `<div id="f10-src${i}" class="f10-src" style="top:${y}px;"><div><b>[${n}]</b>${t}</div><span class="mono">${s} · ver matéria ↗</span></div>`).join('')}
${cast('f10', 'ana_coffee', { left: 1480, top: 760, size: 300, bg: C.butter, h: 420, dx: -40, dy: -60 })}
<div id="f10-note"><span id="f10-noteclip">você confere antes de publicar ✓</span></div>
`,
  js: `
${headerJs('f10', 0.1)}
tl.fromTo('#f10-doc', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.3);
// marca-texto passa nas fontes citadas
[0, 1, 2].forEach((i) => tl.fromTo('#f10-h' + i, { backgroundSize: '0% 44%' }, { backgroundSize: '100% 44%', duration: 0.5, ease: 'power2.out' }, 1.3 + i * 0.55));
tl.fromTo('.f10-sup', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out', stagger: 0.55 }, 1.6);
// cada citação liga até a matéria de origem
for (let i = 0; i < 3; i++) {
  const p = document.querySelector('#f10-l' + i), L = p.getTotalLength(), t = 3.2 + i * 0.9;
  tl.fromTo('#f10-c' + i, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25 }, t);
  tl.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, t);
  tl.fromTo('#f10-src' + i, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, t + 0.45);
}
${castJs('f10', 5.6)}
${blinkJs('f10', 'Calm', 7.0)}
${faceJs('f10', 'Calm', 'Smile', 7.8)}
${nodJs('f10', 7.9, 1.2, 4)}
// nota à mão se escreve
tl.fromTo('#f10-noteclip', { width: 0 }, { width: 900, duration: 1.4, ease: 'power1.inOut' }, 6.6);
`,
  sfx: [['sparkle', 1.3, 0.3], ['click-soft', 3.2, 0.4], ['click-soft', 4.1, 0.4], ['click-soft', 5.0, 0.4], ['chime', 7.9, 0.3]],
};
