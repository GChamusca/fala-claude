// Monta um promo vertical (1080×1920, 15s): cenas cortadas no ritmo da narração + legenda palavra por palavra.
// Uso: node src/build.mjs p1 [trilha]   → escreve compositions/<id>.html e index.html
import fs from 'node:fs';
import { C, FONT_FACES } from '../../pauta-explicativo/src/lib.mjs';
import { SCRIPTS } from './scripts.mjs';
import { SHOTS } from './shots.mjs';

const [id = 'p1', music = 'promo-1'] = process.argv.slice(2);
const ROOT = new URL('../', import.meta.url);
const S = SCRIPTS[id];
const V = JSON.parse(fs.readFileSync(new URL(`assets/voice/${id}.json`, ROOT), 'utf8'));
const DUR = 15, VO = 0.35;
const HL = /quinhentas|abas|duzentas|minutos|fonte|origem|ontem|explodiu|crescendo|clique|inventa|achismo|publicar|revisar|poste|mais\.|melhor|assim|agora|tema/i;

// distribui as palavras da narração pelas linhas do roteiro
let k = 0;
const lines = S.lines.map((l) => { const n = l.say.split(/\s+/).length; const ws = V.words.slice(k, k + n); k += n; return { ...l, ws }; });
lines.forEach((l, i) => { l.t0 = i === 0 ? 0 : +(VO + l.ws[0].s - 0.12).toFixed(2); });
lines.forEach((l, i) => { l.t1 = i < lines.length - 1 ? lines[i + 1].t0 : DUR; });

const P = (i) => `${id}s${i}`;
const shots = lines.map((l, i) => SHOTS[l.shot](P(i)));
const esc = (w) => w.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const caption = lines.map((l, i) => `<div class="cap" id="${id}-cap${i}">${l.ws.map((w, j) => `<span class="cw${HL.test(w.w) ? ' hl' : ''}" id="${id}-w${i}-${j}">${esc(w.w)}</span>`).join(' ')}</div>`).join('');

const css = `${FONT_FACES}
#root{position:absolute;inset:0;overflow:hidden;background:${C.paper};color:${C.ink};font-family:'Bricolage Grotesque',sans-serif;}
#root .shot{position:absolute;inset:0;opacity:0;}
#root .peep-svg{display:block;height:100%;width:auto;overflow:visible;}
#brand{position:absolute;left:60px;top:84px;display:flex;align-items:center;gap:14px;font-family:'Newsreader',serif;font-size:40px;z-index:20;}
.cap{position:absolute;left:50px;right:50px;top:1240px;text-align:center;font-weight:800;font-size:82px;line-height:1.14;letter-spacing:-1px;opacity:0;z-index:20;}
.cw{display:inline-block;padding:0 6px;border-radius:14px;}
.cw.hl{background:${C.butter};box-shadow:5px 5px 0 ${C.ink};border:3px solid ${C.ink};}
#stripes{position:absolute;inset:0;display:flex;flex-direction:column;z-index:30;pointer-events:none;}
#stripes div{flex:1;transform:scaleX(0);}
${shots.map((s) => s.css).join('\n')}`;

const html = `<div id="brand"><svg width="54" height="54" viewBox="4 4 54 54" aria-hidden="true"><circle cx="32" cy="32" r="22" fill="${C.ink}"></circle><circle cx="28" cy="28" r="22" fill="${C.navy}"></circle><circle cx="36" cy="20" r="5" fill="${C.butter}"></circle></svg>Pauta Pronta</div>
${shots.map((s, i) => `<div class="shot" id="${P(i)}">${s.html}</div>`).join('\n')}
${caption}
<div id="stripes">${[C.navy, C.butter, C.rose, C.grass, C.sky].map((c) => `<div style="background:${c}"></div>`).join('')}</div>`;

const last = lines.length - 1;
const js = `${lines.map((l, i) => `tl.set('#${P(i)}', { opacity: 1 }, ${l.t0}); ${i < last ? `tl.set('#${P(i)}', { opacity: 0 }, ${l.t1});` : ''}
tl.fromTo('#${P(i)}', { scale: 1.1 }, { scale: 1, duration: 0.45, ease: 'expo.out' }, ${l.t0});
{ ${shots[i].js(l.t0, l.t1)} }`).join('\n')}
// legenda: cada palavra entra quando é falada
${lines.map((l, i) => `tl.set('#${id}-cap${i}', { opacity: 1 }, ${Math.max(0, (VO + l.ws[0].s - 0.05)).toFixed(2)}); ${i < last ? `tl.set('#${id}-cap${i}', { opacity: 0 }, ${(VO + lines[i + 1].ws[0].s - 0.06).toFixed(2)});` : ''}
${l.ws.map((w, j) => `tl.fromTo('#${id}-w${i}-${j}', { opacity: 0, y: 30, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: 'back.out(3)' }, ${(VO + w.s).toFixed(2)});`).join('\n')}`).join('\n')}
// marca some no fecho; faixas de cor antes do fecho
tl.to('#brand', { opacity: 0, duration: 0.2 }, ${lines[last].t0});
tl.to('#stripes div', { scaleX: 1, transformOrigin: '0% 50%', duration: 0.22, ease: 'power3.in', stagger: 0.03 }, ${(lines[last].t0 - 0.3).toFixed(2)});
tl.to('#stripes div', { scaleX: 0, transformOrigin: '100% 50%', duration: 0.25, ease: 'power3.out', stagger: 0.03 }, ${(lines[last].t0 + 0.02).toFixed(2)});`;

fs.mkdirSync(new URL('compositions/', ROOT), { recursive: true });
fs.writeFileSync(new URL(`compositions/${id}.html`, ROOT), `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8" /><title>${id}</title></head><body>
<template>
<style>${css}</style>
<div id="root" data-composition-id="${id}" data-width="1080" data-height="1920">
${html}
</div>
<script>
(function(){
const tl = gsap.timeline({ paused: true });
${js}
window.__timelines["${id}"] = tl;
})();
</script>
</template>
</body></html>
`);

const cuts = lines.slice(1).map((l, i) => `    <audio id="sfx-cut${i}" src="assets/sfx/whoosh-short.mp3" data-start="${Math.max(0, l.t0 - 0.12).toFixed(2)}" data-track-index="${12 + i}" data-volume="0.28"></audio>`).join('\n');
fs.writeFileSync(new URL('index.html', ROOT), `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>Pauta Pronta — promo ${id}</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>html, body { margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: ${C.paper}; } #stage { position: relative; width: 100%; height: 100%; overflow: hidden; }</style>
  </head>
  <body>
    <div id="stage" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
    <div id="slot-${id}" data-composition-id="${id}" data-composition-src="compositions/${id}.html" data-start="0" data-duration="${DUR}" data-track-index="1" data-width="1080" data-height="1920"></div>
    <audio id="vo" src="assets/voice/${id}.mp3" data-start="${VO}" data-track-index="10" data-volume="1"></audio>
    <audio id="bgm" src="assets/music/${music}.mp3" data-start="0" data-duration="${DUR}" data-track-index="9" data-volume="0.2"></audio>
    <audio id="sfx-logo" src="assets/sfx/logo-1.mp3" data-start="${lines[last].t0}" data-track-index="11" data-volume="0.3"></audio>
${cuts}
    </div>
    <script>const tl = gsap.timeline({ paused: true }); window.__timelines["main"] = tl;</script>
  </body>
</html>
`);
console.log(id, lines.map((l) => `${l.shot}@${l.t0}`).join(' '));
