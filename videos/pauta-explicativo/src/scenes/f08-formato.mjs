// Frame 8 — Do seu jeito. compose (avatar-cloud-network: conectores com pontos viajando até o celular).
import { C, GRAIN, header, headerJs } from '../lib.mjs';

const OPTS = [['Formato', 'Carrossel', 370], ['Estilo', 'Ilustração', 560], ['Tom', 'Explicador', 750]];
const PHONE = { x: 1300, y: 170, w: 420, h: 840 };
const path = (y) => `M 700 ${y + 60} C 980 ${y + 60}, 1040 ${PHONE.y + PHONE.h / 2}, ${PHONE.x - 6} ${PHONE.y + PHONE.h / 2}`;
export default {
  id: 'f08-formato',
  duration: 6,
  css: `
.f08-opt{position:absolute;left:120px;width:580px;height:120px;box-sizing:border-box;padding:18px 30px;display:flex;flex-direction:column;justify-content:center;border:3px solid ${C.ink};border-radius:22px;background:${C.paper};box-shadow:8px 8px 0 ${C.ink};}
.f08-opt .mono{font-size:19px;color:${C.mute};}
.f08-opt b{font-family:'Newsreader',serif;font-weight:400;font-size:50px;line-height:1.05;}
.f08-opt i{position:absolute;right:26px;top:36px;width:44px;height:44px;border-radius:50%;background:${C.navy};color:${C.paper};font-style:normal;font-size:24px;line-height:44px;text-align:center;}
#f08-lines{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible;}
#f08-phone{position:absolute;left:${PHONE.x}px;top:${PHONE.y}px;width:${PHONE.w}px;height:${PHONE.h}px;box-sizing:border-box;border:5px solid ${C.ink};border-radius:60px;background:${C.ink};box-shadow:12px 12px 0 ${C.butterDeep};overflow:hidden;}
#f08-screen{position:absolute;left:14px;top:14px;right:14px;bottom:14px;border-radius:46px;background:${C.cream};overflow:hidden;display:flex;align-items:center;justify-content:center;}
#f08-img{position:relative;display:block;width:100%;height:auto;}
#f08-wait{position:absolute;left:0;right:0;top:48%;text-align:center;font-size:20px;color:${C.mute};}
`,
  html: `

${header('f08', '06 · Formato, estilo e tom', 'No seu formato.', 'No seu tom.')}
${OPTS.map(([k, v, y], i) => `<div id="f08-o${i}" class="f08-opt" style="top:${y}px;"><span class="mono">${k}</span><b>${v}</b><i>✓</i></div>`).join('')}
<svg id="f08-lines" viewBox="0 0 1920 1080" aria-hidden="true">${OPTS.map(([, , y], i) => `<path id="f08-l${i}" d="${path(y)}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round" opacity="0"></path><path id="f08-d${i}" d="${path(y)}" fill="none" stroke="${C.navy}" stroke-width="16" stroke-linecap="round" opacity="0"></path>`).join('')}</svg>
<div id="f08-phone"><div id="f08-screen"><span id="f08-wait" class="mono">montando…</span><img id="f08-img" src="assets/slides/slide-1.jpg" alt="Slide 1 do carrossel"></div></div>
`,
  js: `
${headerJs('f08', 0.1)}
tl.fromTo('.f08-opt', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.25 }, 0.5);
tl.fromTo('.f08-opt i', { scale: 0 }, { scale: 1, duration: 0.35, ease: 'power3.out', stagger: 0.25 }, 1.1);
tl.fromTo('#f08-phone', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.8);
// linhas pontilhadas se desenham e um ponto percorre cada uma até o celular
for (let i = 0; i < 3; i++) {
  const l = document.querySelector('#f08-l' + i), d = document.querySelector('#f08-d' + i), L = d.getTotalLength();
  tl.fromTo(l, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.0 + i * 0.15);
  tl.set(d, { strokeDasharray: '0.1 ' + (L + 40), strokeDashoffset: 0, opacity: 0 }, 0);
  tl.set(d, { opacity: 1 }, 2.4 + i * 0.3);
  tl.to(d, { strokeDashoffset: -L, duration: 1.1, ease: 'power2.inOut' }, 2.4 + i * 0.3);
  tl.set(d, { opacity: 0 }, 3.5 + i * 0.3);
}
tl.fromTo('#f08-img', { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 4.2);
tl.to('#f08-phone', { scale: 1.02, duration: 0.25, ease: 'power2.out' }, 4.2);
tl.to('#f08-phone', { scale: 1, duration: 0.35, ease: 'power2.inOut' }, 4.45);
`,
  sfx: [['click-soft', 1.1, 0.4], ['click-soft', 1.35, 0.4], ['click-soft', 1.6, 0.4], ['whoosh-short', 2.4, 0.3], ['whoosh-short', 3.0, 0.3], ['sparkle', 4.2, 0.35]],
};
