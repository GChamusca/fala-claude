// Frame 2 — A promessa. logo-assemble-lockup (Adapt): faixas se recolhem, logo se monta, promessa.
import { C, words, GRAIN, stripes, LOGO_MARK } from '../lib.mjs';

export default {
  id: 'f02-promessa',
  duration: 6,
  css: `
#f02-lock{position:absolute;left:0;right:0;top:300px;display:flex;justify-content:center;align-items:center;gap:36px;}
#f02-mark{width:170px;height:170px;}
#f02-name{font-size:170px;line-height:.9;letter-spacing:-4px;}
#f02-by{font-family:'Newsreader',serif;font-style:italic;font-size:44px;color:${C.mute};margin-top:10px;}
#f02-line{position:absolute;left:0;right:0;top:640px;text-align:center;font-size:64px;line-height:1.2;color:${C.inkSoft};}
#f02-hl{background:linear-gradient(${C.butter},${C.butter}) no-repeat 0 88%/0% 46%;padding:0 6px;font-style:italic;color:${C.navy};}
#f02-sub{position:absolute;left:0;right:0;top:800px;text-align:center;font-size:24px;color:${C.mute};}
`,
  html: `

<div id="f02-lock">${LOGO_MARK(170, 'f02-mark')}<div><div id="f02-name" class="display">${words('Pauta Pronta')}</div><div id="f02-by"><span class="wm"><span class="w">by REP</span></span></div></div></div>
<div id="f02-line" class="display">${words('Pesquisa, analisa e entrega o post pronto.')} <span class="wm"><span class="w"><span id="f02-hl">Com fonte.</span></span></span></div>
<div id="f02-sub" class="mono">Inteligência editorial que vira post</div>
${stripes('f02')}
`,
  js: `
// faixas (vindas da cena 1) se recolhem para a direita
tl.fromTo('.f02-st', { scaleX: 1, transformOrigin: '100% 50%' }, { scaleX: 0, duration: 0.6, ease: 'power3.inOut', stagger: 0.05 }, 0.25);
tl.fromTo('#f02-mark', { scale: 0, rotation: -90, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.9, ease: 'expo.out' }, 0.8);
tl.fromTo('#f02-name .w', { yPercent: 160 }, { yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 1.05);
tl.fromTo('#f02-by .w', { yPercent: 160 }, { yPercent: 0, duration: 0.6, ease: 'power3.out' }, 1.5);
tl.fromTo('#f02-line .w', { yPercent: 160 }, { yPercent: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07 }, 2.2);
tl.fromTo('#f02-hl', { backgroundSize: '0% 46%' }, { backgroundSize: '100% 46%', duration: 0.6, ease: 'power2.out' }, 3.3);
tl.fromTo('#f02-sub', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 3.8);
`,
  sfx: [['logo-1', 0.8, 0.4], ['sparkle', 3.3, 0.35]],
};
