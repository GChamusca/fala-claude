// Frame 11 — Fecho e convite. titlecard-reveal + cta-morph-press (Adapt).
import { C, GRAIN, words, cast, castJs, faceJs, blinkJs, LOGO_MARK, HAND } from '../lib.mjs';

export default {
  id: 'f11-convite',
  duration: 8,
  css: `
#f11-a{position:absolute;left:120px;top:340px;font-size:108px;line-height:1.05;}
#f11-lock{position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center;align-items:center;gap:32px;}
#f11-name{font-size:150px;line-height:.9;letter-spacing:-4px;}
#f11-by{font-family:'Newsreader',serif;font-style:italic;font-size:40px;color:${C.mute};margin-top:8px;}
#f11-cta{position:absolute;left:50%;top:600px;transform:translateX(-50%);}
#f11-btn{padding:30px 54px;border-radius:999px;background:${C.navy};color:${C.paper};font-size:44px;font-weight:700;box-shadow:8px 8px 0 ${C.ink};white-space:nowrap;}
#f11-btn span{color:${C.butter};}
#f11-url{position:absolute;left:0;right:0;top:790px;text-align:center;font-size:32px;letter-spacing:.2em;}
#f11-hand{position:absolute;left:0;top:0;}
`,
  html: `

<div id="f11-a" class="display"><div>${words('Seu próximo post')}</div><div>${words('nasce da')} <em>${words('cobertura real.')}</em></div></div>
${cast('f11', 'ana_coffee', { left: 1340, top: 330, size: 480, bg: C.butter, h: 680, dx: -70, dy: -30 })}
<div id="f11-lock">${LOGO_MARK(150, 'f11-mark')}<div><div id="f11-name" class="display">${words('Pauta Pronta')}</div><div id="f11-by">by REP</div></div></div>
<div id="f11-cta"><div id="f11-btn">Teste grátis <span>· uma pauta, sem cartão</span></div></div>
<div id="f11-url" class="mono">pautapronta.com</div>
<div id="f11-hand">${HAND('f11-hand-svg')}</div>
`,
  js: `
tl.fromTo('#f11-a .w', { yPercent: 160 }, { yPercent: 0, duration: 0.85, ease: 'power3.out', stagger: 0.08 }, 0.2);
${castJs('f11', 0.3)}
${faceJs('f11', 'Calm', 'Smile', 1.2)}
${blinkJs('f11', 'Smile', 2.2)}
// a frase e a Ana saem; o logo assenta
tl.to(['#f11-a', '#f11-disc', '#f11-peep'], { y: -40, opacity: 0, duration: 0.5, ease: 'power3.in', stagger: 0.05 }, 3.1);
tl.set('#f11-lock', { opacity: 1 }, 0);
tl.fromTo('#f11-mark', { scale: 0, rotation: -90, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.9, ease: 'expo.out' }, 3.6);
tl.fromTo('#f11-name .w', { yPercent: 160 }, { yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 3.8);
tl.fromTo('#f11-by', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 4.3);
tl.fromTo('#f11-btn', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 4.5);
tl.fromTo('#f11-url', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 5.0);
// clique no botão
tl.fromTo('#f11-hand', { x: 1500, y: 1000, opacity: 0 }, { x: 1180, y: 660, opacity: 1, duration: 0.9, ease: 'power3.inOut' }, 5.2);
tl.to('#f11-btn', { scale: 0.95, duration: 0.1 }, 6.15);
tl.to('#f11-btn', { scale: 1, duration: 0.3 }, 6.25);
tl.to('#f11-hand', { scale: 0.86, duration: 0.1, transformOrigin: '30% 10%' }, 6.15);
tl.to('#f11-hand', { scale: 1, duration: 0.2 }, 6.25);
`,
  sfx: [['impact-bass-1', 3.6, 0.35], ['click', 6.18, 0.6]],
};
