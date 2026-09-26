// Cenas (shots) verticais 1080×1920 reutilizáveis pelos promos. Cada shot: { html, css, js(t0,t1) }.
// Área do visual: y 170–1180. A legenda fica em y ~1230–1560 (fora daqui).
import { C, peep, chars, HAND, LOGO_MARK } from '../../pauta-explicativo/src/lib.mjs';

const NEWS = [
  ['Folha de S.Paulo', 'Governo avalia levar ao SUS caneta prometida por Lula'],
  ['Gazeta do Povo', 'Lula promete canetas, mas não sabe quanto custará'],
  ['A Tarde', 'Canetas de graça no SUS ainda dependem de três etapas'],
  ['Estado de Minas', 'Caneta no SUS: como o preço pode cair na farmácia'],
  ['DCM', 'Lula anuncia canetas no SUS, mas medida tem 3 etapas'],
  ['ND Mais', 'SUS confirma distribuição gratuita de canetas'],
];
const disc = (id, x, y, s, bg) => `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:50%;background:${bg};border:3px solid ${C.ink};box-shadow:10px 10px 0 ${C.ink};"></div>`;
const person = (id, name, x, y, h) => `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;height:${h}px;">${peep(name, id + '-svg')}</div>`;
const face = (p, from, to, t) => `tl.set('#${p} .pf-${from}', { opacity: 0 }, ${t}); tl.set('#${p} .pf-${to}', { opacity: 1 }, ${t});`;
const phone = (id, x, y, w, h, inner) => `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;box-sizing:border-box;border:6px solid ${C.ink};border-radius:64px;background:${C.ink};box-shadow:14px 14px 0 ${C.butterDeep};overflow:hidden;"><div style="position:absolute;left:14px;top:14px;right:14px;bottom:14px;border-radius:50px;background:#fffdf8;overflow:hidden;">${inner}</div></div>`;
const shake = (sel, t, a = 10) => `tl.fromTo('${sel}', { x: 0 }, { x: ${a}, duration: 0.05, repeat: 5, yoyo: true, ease: 'sine.inOut' }, ${t}); tl.set('${sel}', { x: 0 }, ${t + 0.31});`;

// Identidade do REP (client/src/styles/radar/radar.css do rep-brasil) e o corvo (client/public/rep-crow.jpg)
const R = { bg: '#111820', panel: '#18212b', raise: '#202a34', ink: '#f0eadf', ink2: '#aaa79e', ink3: '#8e9089', line: 'rgba(240,234,223,.22)', gold: '#b19a60', goldBri: '#c6b278', red: '#ce8277', green: '#88a08c', paper: '#ddd8cb' };
const RS = "Georgia,'Liberation Serif',serif", RU = "'Segoe UI',Arial,'Liberation Sans',sans-serif";
const CROW = (h, c = 'creme') => `<img src="assets/rep/crow-${c}.png" alt="" style="height:${h}px;width:auto;display:block;">`;
const REPLOCK = (h, c = 'creme') => `<span style="display:inline-flex;align-items:center;gap:${Math.round(h * 0.28)}px;">${CROW(h, c)}<b style="font-family:${RU};font-weight:700;font-size:${Math.round(h * 0.7)}px;letter-spacing:-.02em;line-height:1;color:${c === 'ink' ? R.bg : R.ink};">REP</b></span>`;
// gravação real em tela cheia; a faixa de baixo cobre a interface e segura a legenda. tap = { at, x, y } marca o toque.
const footage = (src, media, dark, tap) => (p, t0, t1) => ({
  dark, footage: true,
  css: `#${p}-v{position:absolute;left:0;top:0;width:1080px;height:1920px;object-fit:cover;}
#${p}-cov{position:absolute;left:0;right:0;top:1130px;bottom:0;background:linear-gradient(to bottom, ${dark ? 'rgba(17,24,32,0)' : 'rgba(247,243,236,0)'}, ${dark ? R.bg : C.paper} 110px);}
#${p}-tap{position:absolute;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;border:6px solid ${dark ? R.goldBri : C.navy};background:${dark ? 'rgba(198,178,120,.25)' : 'rgba(36,69,107,.18)'};opacity:0;}`,
  html: `<video class="clip" id="${p}-v" src="assets/rep/${src}.mp4" muted playsinline data-start="${t0}" data-duration="${(t1 - t0).toFixed(2)}" data-media-start="${media}"></video><div id="${p}-cov"></div>${tap ? `<div id="${p}-tap" style="left:${tap.x}px;top:${tap.y}px;"></div>` : ''}`,
  js: (a) => tap ? `tl.fromTo('#${p}-tap', { scale: 0.4, opacity: 0.95 }, { scale: 1.5, opacity: 0, duration: 0.6, ease: 'power2.out' }, ${(a + tap.at - media).toFixed(2)});` : '',
});

export { REPLOCK };
export const SHOTS = {
  // 500 abas se multiplicando por cima da Ana
  abas: (p) => {
    const tabs = Array.from({ length: 36 }, (_, i) => `<div class="${p}-tab" style="left:${60 + (i % 6) * 160}px;top:${200 + Math.floor(i / 6) * 150 + (i % 2) * 30}px;transform:rotate(${((i * 37) % 11) - 5}deg);"><b>${NEWS[i % 6][0]}</b><span>${NEWS[i % 6][1]}</span></div>`).join('');
    return {
      css: `.${p}-tab{position:absolute;width:300px;height:170px;box-sizing:border-box;padding:14px 16px;border:3px solid ${C.ink};border-radius:14px 14px 10px 10px;background:${C.paper};box-shadow:6px 6px 0 ${C.ink};overflow:hidden;}
.${p}-tab b{display:block;font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:${C.navy};padding-bottom:8px;border-bottom:2px solid ${C.rule};}
.${p}-tab span{display:block;margin-top:8px;font-family:'Newsreader',serif;font-size:24px;line-height:1.15;}
#${p}-count{position:absolute;right:60px;top:190px;padding:14px 26px;border-radius:999px;background:${C.rose};color:${C.paper};border:3px solid ${C.ink};font-family:'JetBrains Mono',monospace;font-size:40px;font-weight:600;box-shadow:6px 6px 0 ${C.ink};z-index:5;}`,
      html: `${disc(p + '-disc', 190, 470, 700, C.butter)}${person(p + '-ana', 'ana_computer', 150, 400, 800)}${tabs}<div id="${p}-count">+<span id="${p}-n">1</span> abas</div>`,
      js: (t0, t1) => `tl.fromTo('#${p}-disc', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-ana', { y: 700 }, { y: 0, duration: 0.45, ease: 'power3.out' }, ${t0});
tl.fromTo('.${p}-tab', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'back.out(2)', stagger: { each: ${((t1 - t0 - 0.5) / 36).toFixed(3)}, from: 'random' } }, ${t0 + 0.25});
const o = { v: 1 }, el = document.querySelector('#${p}-n');
tl.fromTo(o, { v: 1 }, { v: 500, duration: ${(t1 - t0 - 0.3).toFixed(2)}, ease: 'power2.in', onUpdate: () => { el.textContent = Math.round(o.v); } }, ${t0 + 0.2});
tl.fromTo('#${p}-count', { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, ${t0 + 0.2});
${shake('#' + p + '-count', t1 - 0.5, 12)}`,
    };
  },

  // 200 matérias → 17 no recorte
  leitura: (p) => {
    let seed = 5; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const sel = new Set(); while (sel.size < 17) sel.add(Math.floor(rnd() * 200));
    const cells = Array.from({ length: 200 }, (_, i) => `<i class="${p}-c ${p}-r${Math.floor(i / 10)}${sel.has(i) ? ` ${p}-s` : ''}" style="left:${150 + (i % 10) * 80}px;top:${230 + Math.floor(i / 10) * 44}px;"></i>`).join('');
    return {
      css: `.${p}-c{position:absolute;width:66px;height:34px;box-sizing:border-box;border:2px solid ${C.ink};border-radius:7px;background:${C.paper};}
#${p}-big{position:absolute;left:0;right:0;top:420px;text-align:center;font-family:'Newsreader',serif;font-size:360px;line-height:1;color:${C.navy};letter-spacing:-10px;text-shadow:10px 10px 0 ${C.butter};}
#${p}-lab{position:absolute;left:0;right:0;top:800px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:34px;letter-spacing:.14em;text-transform:uppercase;}`,
      html: `${cells}<div id="${p}-big">200</div><div id="${p}-lab">matérias lidas</div>`,
      js: (t0, t1) => `const bigEl = document.querySelector('#${p}-big'), labEl = document.querySelector('#${p}-lab');
tl.fromTo('.${p}-c', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.out', stagger: { amount: 0.5, grid: [20, 10], from: 'center' } }, ${t0});
for (let r = 0; r < 20; r++) tl.to('.${p}-r' + r + ':not(.${p}-s)', { backgroundColor: '${C.creamDeep}', borderColor: '${C.rule}', duration: 0.12 }, ${t0 + 0.5} + r * ${((t1 - t0 - 1.4) / 20).toFixed(3)});
tl.to('.${p}-s', { backgroundColor: '${C.navy}', scale: 1.2, duration: 0.2, ease: 'back.out(3)', stagger: 0.03 }, ${(t1 - 0.9).toFixed(2)});
const o = { v: 0 };
tl.fromTo(o, { v: 0 }, { v: 200, duration: ${(t1 - t0 - 1.1).toFixed(2)}, ease: 'power2.out', onUpdate: () => { bigEl.textContent = Math.round(o.v); } }, ${t0 + 0.2});
tl.fromTo(['#${p}-big', '#${p}-lab'], { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'expo.out' }, ${t0 + 0.2});
tl.to(['#${p}-big', '#${p}-lab'], { opacity: 0, scale: 1.3, duration: 0.25 }, ${(t1 - 1.0).toFixed(2)});`,
    };
  },

  // celular com carrossel + selo "com fonte"
  entrega: (p) => ({
    css: `#${p}-strip{position:absolute;left:0;top:90px;display:flex;height:700px;}
#${p}-strip img{width:560px;height:700px;object-fit:cover;display:block;}
.${p}-cite{position:absolute;padding:14px 24px;border-radius:999px;background:${C.butter};border:3px solid ${C.ink};font-family:'JetBrains Mono',monospace;font-size:30px;font-weight:600;box-shadow:6px 6px 0 ${C.ink};}
#${p}-badge{position:absolute;left:170px;top:1030px;padding:18px 34px;border-radius:999px;background:${C.grass};color:${C.paper};border:3px solid ${C.ink};font-family:'JetBrains Mono',monospace;font-size:34px;letter-spacing:.12em;box-shadow:8px 8px 0 ${C.ink};}`,
    html: `${phone(p + '-ph', 230, 180, 620, 960, `<div style="padding:30px 26px 0;display:flex;align-items:center;gap:12px;font-weight:700;font-size:26px;">${LOGO_MARK(38)}pautapronta</div><div id="${p}-strip">${[1, 2, 3, 4].map((n) => `<img src="assets/slides/slide-${n}.jpg" alt="Slide ${n}">`).join('')}</div>`)}
<div class="${p}-cite" id="${p}-c1" style="left:40px;top:420px;">[2] Folha</div><div class="${p}-cite" id="${p}-c2" style="right:40px;top:560px;">[5] Gazeta</div><div class="${p}-cite" id="${p}-c3" style="left:60px;top:760px;">[3] A Tarde</div>
<div id="${p}-badge">✓ COM FONTE</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-ph', { y: 500, rotation: 6 }, { y: 0, rotation: 0, duration: 0.5, ease: 'expo.out' }, ${t0});
tl.to('#${p}-strip', { x: -560, duration: 0.35, ease: 'power3.inOut' }, ${t0 + 0.8});
tl.to('#${p}-strip', { x: -1120, duration: 0.35, ease: 'power3.inOut' }, ${t0 + 1.5});
tl.fromTo('.${p}-cite', { scale: 0, rotation: -12 }, { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2.5)', stagger: 0.12 }, ${(t1 - 1.1).toFixed(2)});
tl.fromTo('#${p}-badge', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2.5)' }, ${(t1 - 0.8).toFixed(2)});`,
  }),

  // post errado recebendo comentários
  erro: (p) => {
    const cm = [['@marina.jor', 'fonte?'], ['@leitor_atento', 'isso tá errado…'], ['@ana.lu', 'não foi isso que o ministério disse'], ['@pedro_c', 'apaga isso 😬']];
    return {
      css: `#${p}-post{position:absolute;left:110px;top:200px;width:860px;box-sizing:border-box;border:3px solid ${C.ink};border-radius:30px;background:#fffdf8;box-shadow:12px 12px 0 ${C.ink};overflow:hidden;}
#${p}-post header{display:flex;align-items:center;gap:14px;padding:22px 26px;font-weight:700;font-size:28px;}
#${p}-post header i{display:block;width:52px;height:52px;border-radius:50%;background:${C.butter};border:3px solid ${C.ink};}
#${p}-img{height:420px;background:${C.navy};color:${C.paper};display:flex;align-items:center;justify-content:center;text-align:center;padding:0 60px;font-family:'Newsreader',serif;font-size:60px;line-height:1.1;}
#${p}-stamp{position:absolute;left:170px;top:470px;padding:14px 30px;border:6px solid ${C.rose};color:${C.rose};font-family:'JetBrains Mono',monospace;font-weight:600;font-size:44px;letter-spacing:.1em;transform:rotate(-10deg);background:rgba(247,243,236,.92);}
.${p}-cm{position:absolute;left:140px;width:800px;box-sizing:border-box;padding:16px 22px;border:3px solid ${C.ink};border-radius:20px;background:${C.paper};box-shadow:6px 6px 0 ${C.ink};font-size:30px;}
.${p}-cm b{color:${C.navy};margin-right:10px;}`,
      html: `<div id="${p}-post"><header><i></i>seu_perfil</header><div id="${p}-img">“SUS já distribui canetas emagrecedoras de graça”</div><div style="padding:20px 26px;font-size:26px;color:${C.mute};">♡ 12 &nbsp; 💬 48 comentários</div></div>
${cm.map(([u, t], i) => `<div class="${p}-cm" style="top:${760 + i * 105}px;left:${120 + (i % 2) * 60}px;"><b>${u}</b>${t}</div>`).join('')}<div id="${p}-stamp">NÃO ERA BEM ASSIM</div>`,
      js: (t0, t1) => `tl.fromTo('#${p}-post', { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'expo.out' }, ${t0});
tl.fromTo('.${p}-cm', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, ease: 'power3.out', stagger: ${((t1 - t0 - 1.6) / 4).toFixed(2)} }, ${t0 + 0.8});
tl.fromTo('#${p}-stamp', { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, ${(t1 - 0.8).toFixed(2)});
${shake('#' + p + '-post', t1 - 0.55, 14)}`,
    };
  },

  // documento de validação vertical
  validacao: (p) => ({
    css: `#${p}-doc{position:absolute;left:80px;top:190px;width:920px;box-sizing:border-box;padding:40px 44px;border:3px solid ${C.ink};border-radius:30px;background:#fffdf8;box-shadow:12px 12px 0 ${C.ink};font-family:'Newsreader',serif;font-size:50px;line-height:1.35;}
#${p}-doc .mono{display:block;font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.14em;color:${C.navy};margin-bottom:14px;}
.${p}-hl{background:linear-gradient(${C.butter},${C.butter}) no-repeat 0 88%/0% 44%;}
.${p}-sup{font-family:'JetBrains Mono',monospace;font-size:26px;color:${C.navy};font-weight:600;vertical-align:super;}
.${p}-src{position:absolute;left:80px;width:920px;box-sizing:border-box;padding:18px 24px;border:3px solid ${C.ink};border-radius:20px;background:${C.paper};box-shadow:7px 7px 0 ${C.ink};font-size:28px;font-weight:600;}
.${p}-src span{display:block;margin-top:6px;font-family:'JetBrains Mono',monospace;font-size:18px;color:${C.mute};font-weight:400;letter-spacing:.08em;}`,
    html: `<div id="${p}-doc"><span class="mono">DOCUMENTO DE VALIDAÇÃO</span>Segundo a <span class="${p}-hl">Folha</span><span class="${p}-sup">[2]</span> e a <span class="${p}-hl">Gazeta do Povo</span><span class="${p}-sup">[5]</span>, a oferta pelo SUS ainda depende da Conitec.</div>
<div class="${p}-src" id="${p}-s1" style="top:760px;">[2] Governo avalia levar ao SUS caneta prometida por Lula<span>FOLHA DE S.PAULO · 18/09 · VER MATÉRIA ↗</span></div>
<div class="${p}-src" id="${p}-s2" style="top:930px;">[5] Lula promete canetas, mas não sabe quanto custará<span>GAZETA DO POVO · 24/09 · VER MATÉRIA ↗</span></div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-doc', { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'expo.out' }, ${t0});
tl.fromTo('.${p}-hl', { backgroundSize: '0% 44%' }, { backgroundSize: '100% 44%', duration: 0.35, ease: 'power2.out', stagger: 0.35 }, ${t0 + 0.5});
tl.fromTo('.${p}-src', { x: 400, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'expo.out', stagger: 0.35 }, ${t0 + 1.1});`,
  }),

  // Ana confere, com a nota à mão
  confere: (p) => ({
    css: `#${p}-note{position:absolute;left:0;right:0;top:250px;text-align:center;font-family:'Caveat',cursive;font-weight:700;font-size:96px;line-height:1;color:${C.rose};transform:rotate(-3deg);}
#${p}-check{position:absolute;left:760px;top:640px;width:170px;height:170px;border-radius:50%;background:${C.grass};border:4px solid ${C.ink};color:${C.paper};font-size:110px;line-height:160px;text-align:center;box-shadow:8px 8px 0 ${C.ink};}`,
    html: `${disc(p + '-disc', 220, 520, 640, C.butter)}${person(p + '-ana', 'ana_coffee', 170, 430, 780)}<div id="${p}-note">você confere<br>antes de publicar</div><div id="${p}-check">✓</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-disc', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-ana', { y: 700 }, { y: 0, duration: 0.45, ease: 'power3.out' }, ${t0});
${face(p + '-ana', 'Calm', 'Smile', t0 + 0.6)}
tl.fromTo('#${p}-note', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, ${t0 + 0.2});
tl.fromTo('#${p}-check', { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.35, ease: 'back.out(3)' }, ${t0 + 0.8});`,
  }),

  // 18h, cliente cobrando no chat
  cobranca: (p) => {
    const ms = ['viu isso??', 'precisamos postar sobre isso', 'já saiu?', 'e aí???', 'o concorrente já postou 👀'];
    return {
      css: `#${p}-clock{position:absolute;left:0;right:0;top:180px;text-align:center;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:200px;letter-spacing:-4px;color:${C.rose};}
#${p}-lab{position:absolute;left:0;right:0;top:400px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:30px;letter-spacing:.2em;text-transform:uppercase;}
.${p}-m{position:absolute;left:90px;max-width:760px;box-sizing:border-box;padding:18px 26px;border-radius:26px 26px 26px 6px;background:${C.paper};border:3px solid ${C.ink};box-shadow:6px 6px 0 ${C.ink};font-size:36px;}
.${p}-m b{display:block;font-family:'JetBrains Mono',monospace;font-size:18px;letter-spacing:.12em;color:${C.grass};margin-bottom:4px;}`,
      html: `<div id="${p}-clock"><span id="${p}-h">17:52</span></div><div id="${p}-lab">o assunto explodiu</div>${ms.map((m, i) => `<div class="${p}-m" style="top:${510 + i * 130}px;left:${90 + (i % 2) * 110}px;"><b>CLIENTE · AGORA</b>${m}</div>`).join('')}`,
      js: (t0, t1) => `const h = document.querySelector('#${p}-h'), o = { v: 52 };
tl.fromTo(o, { v: 52 }, { v: 60, duration: 0.8, ease: 'power2.in', onUpdate: () => { const m = Math.round(o.v); h.textContent = m >= 60 ? '18:00' : '17:' + m; } }, ${t0});
tl.fromTo('#${p}-clock', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'expo.out' }, ${t0});
${shake('#' + p + '-clock', t0 + 0.8, 14)}
tl.fromTo('#${p}-lab', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${t0 + 0.9});
tl.fromTo('.${p}-m', { scale: 0.5, opacity: 0, transformOrigin: '0% 100%' }, { scale: 1, opacity: 1, duration: 0.22, ease: 'back.out(2)', stagger: ${((t1 - t0 - 1.4) / 5).toFixed(2)} }, ${t0 + 1.1});`,
    };
  },

  // caixa de tema digitando
  tema: (p) => ({
    css: `#${p}-box{position:absolute;left:70px;top:420px;width:940px;box-sizing:border-box;padding:40px;border:3px solid ${C.ink};border-radius:30px;background:${C.paper};box-shadow:12px 12px 0 ${C.ink};}
#${p}-q{font-family:'Newsreader',serif;font-size:56px;line-height:1.1;}
#${p}-in{margin-top:28px;height:110px;box-sizing:border-box;padding:0 26px;display:flex;align-items:center;border:3px solid ${C.ink};border-radius:20px;background:#fffdf8;font-size:48px;font-weight:600;}
#${p}-btn{margin-top:28px;display:inline-flex;padding:24px 36px;border-radius:999px;background:${C.navy};color:${C.paper};font-size:36px;font-weight:700;box-shadow:6px 6px 0 ${C.ink};}`,
    html: `<div id="${p}-box"><div id="${p}-q">Sobre o que você quer publicar?</div><div id="${p}-in">${chars('Canetas emagrecedoras', p + '-ch')}</div><div id="${p}-btn">Criar publicação →</div></div><div id="${p}-hand" style="position:absolute;left:0;top:0;">${HAND(p + '-hs')}</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-box', { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'expo.out' }, ${t0});
tl.set('.${p}-ch', { opacity: 0 }, 0);
tl.to('.${p}-ch', { opacity: 1, duration: 0.01, stagger: ${((t1 - t0 - 0.6) / 21).toFixed(3)} }, ${t0 + 0.2});
tl.fromTo('#${p}-hand', { x: 900, y: 1300, opacity: 0 }, { x: 280, y: 800, opacity: 1, duration: 0.3, ease: 'power3.out' }, ${(t1 - 0.4).toFixed(2)});
tl.to('#${p}-btn', { scale: 0.93, duration: 0.08, yoyo: true, repeat: 1 }, ${(t1 - 0.1).toFixed(2)});`,
  }),

  // feed onde todo mundo já postou
  atrasado: (p) => {
    const posts = [['@portal_da_hora', 'há 3 h'], ['@concorrente', 'há 2 h'], ['@agencia.mais', 'há 1 h'], ['@todo.mundo', 'há 40 min']];
    return {
      css: `.${p}-p{position:absolute;left:90px;width:900px;height:180px;box-sizing:border-box;padding:22px 26px;border:3px solid ${C.ink};border-radius:24px;background:${C.paper};box-shadow:8px 8px 0 ${C.ink};display:flex;gap:22px;align-items:center;}
.${p}-p i{flex:none;width:130px;height:130px;border-radius:16px;background:${C.navy};}
.${p}-p b{display:block;font-size:30px;}
.${p}-p span{display:block;margin-top:8px;font-family:'Newsreader',serif;font-size:34px;line-height:1.1;}
.${p}-p em{margin-left:auto;align-self:flex-start;font-style:normal;font-family:'JetBrains Mono',monospace;font-size:20px;color:${C.rose};}
#${p}-you{position:absolute;left:0;right:0;top:1000px;text-align:center;font-family:'Caveat',cursive;font-weight:700;font-size:90px;color:${C.rose};transform:rotate(-2deg);}`,
      html: `${posts.map(([u, t], i) => `<div class="${p}-p" style="top:${190 + i * 200}px;"><i style="background:${[C.navy, C.rose, C.grass, C.sky][i]}"></i><div><b>${u}</b><span>Canetas emagrecedoras no SUS: o que se sabe</span></div><em>${t}</em></div>`).join('')}<div id="${p}-you">e você: ainda nem começou</div>`,
      js: (t0, t1) => `tl.fromTo('.${p}-p', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out', stagger: 0.35 }, ${t0});
tl.fromTo('#${p}-you', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, ${(t1 - 1.0).toFixed(2)});`,
    };
  },

  // bolhas do Radar
  radar: (p) => {
    const B = [['Soberania e combate às facções', 237, '↑100%', 540, 560, 175], ['STF valida reajuste do Bolsa Família', 452, '↓71%', 260, 330, 150], ['Empate em Minas, vantagem em SP', 213, '↑72%', 830, 330, 140], ['Mensagens ampliam crise no STF', 165, '↑61%', 230, 850, 130], ['Casa Branca barra jornalistas', 109, '↑100%', 850, 820, 125], ['Greve nacional dos Correios', 45, '↑99%', 560, 1030, 100]];
    return {
      css: `.${p}-b{position:absolute;box-sizing:border-box;border-radius:50%;background:${C.navy};color:${C.paper};border:4px solid ${C.ink};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 22px;font-family:'Newsreader',serif;line-height:1.1;}
.${p}-b small{display:block;margin-top:8px;font-family:'JetBrains Mono',monospace;font-size:20px;}
.${p}-b i{position:absolute;right:0;top:4%;padding:5px 12px;border-radius:999px;background:${C.butter};color:${C.ink};border:3px solid ${C.ink};font-style:normal;font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:600;}
#${p}-tag{position:absolute;left:0;right:0;top:170px;z-index:3;text-align:center;font-family:'JetBrains Mono',monospace;font-size:28px;letter-spacing:.2em;color:${C.navy};}`,
      html: `<div id="${p}-tag">RADAR · EM ALTA AGORA</div>${B.map(([t, n, tr, cx, cy, r], i) => `<div class="${p}-b" id="${p}-b${i}" style="left:${cx - r}px;top:${cy - r}px;width:${2 * r}px;height:${2 * r}px;font-size:${Math.round(r * 0.2)}px;">${t}<small>${n} matérias</small><i>${tr}</i></div>`).join('')}`,
      js: (t0, t1) => `tl.fromTo('.${p}-b', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.8)', stagger: 0.1 }, ${t0});
tl.fromTo('#${p}-tag', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${t0});
tl.to('#${p}-b0', { scale: 1.1, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: 3 }, ${t0 + 1.0});`,
    };
  },

  // clique na bolha → gerar pauta
  clique: (p) => ({
    css: `#${p}-b{position:absolute;left:315px;top:300px;width:450px;height:450px;box-sizing:border-box;border-radius:50%;background:${C.navy};color:${C.paper};border:5px solid ${C.butter};box-shadow:0 0 0 8px ${C.ink};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 50px;font-family:'Newsreader',serif;font-size:50px;line-height:1.1;}
#${p}-go{position:absolute;left:140px;top:840px;padding:30px 40px;border-radius:20px;background:${C.navy};color:${C.paper};font-family:'JetBrains Mono',monospace;font-size:32px;letter-spacing:.08em;box-shadow:8px 8px 0 ${C.ink};}
#${p}-ok{position:absolute;left:250px;top:1030px;padding:18px 34px;border-radius:999px;background:${C.grass};color:${C.paper};border:3px solid ${C.ink};font-family:'JetBrains Mono',monospace;font-size:30px;box-shadow:6px 6px 0 ${C.ink};}`,
    html: `<div id="${p}-b">Soberania e combate às facções<small style="font-family:'JetBrains Mono',monospace;font-size:24px;margin-top:10px;">237 matérias · ↑100%</small></div><div id="${p}-go">GERAR PAUTA SOBRE ESTE ASSUNTO →</div><div id="${p}-ok">✓ pauta criada</div><div id="${p}-hand" style="position:absolute;left:0;top:0;">${HAND(p + '-hs')}</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-b', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-go', { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'expo.out' }, ${t0 + 0.15});
tl.fromTo('#${p}-hand', { x: 900, y: 1400 }, { x: 520, y: 880, duration: 0.45, ease: 'power3.out' }, ${t0 + 0.3});
tl.to('#${p}-go', { scale: 0.93, duration: 0.08, yoyo: true, repeat: 1 }, ${t0 + 0.8});
tl.fromTo('#${p}-ok', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.5)' }, ${t0 + 1.0});`,
  }),

  // IA genérica inventando
  inventa: (p) => ({
    css: `#${p}-card{position:absolute;left:90px;top:260px;width:900px;box-sizing:border-box;padding:40px;border:3px solid ${C.ink};border-radius:30px;background:#eef0f2;box-shadow:12px 12px 0 ${C.ink};font-size:42px;line-height:1.35;color:#3b3f45;}
#${p}-card small{display:block;font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.14em;color:#7a8089;margin-bottom:14px;}
#${p}-src{display:inline-block;margin-top:24px;padding:10px 20px;border-radius:12px;background:${C.rose};color:${C.paper};font-family:'JetBrains Mono',monospace;font-size:30px;}
#${p}-stamp{position:absolute;left:210px;top:840px;padding:16px 34px;border:7px solid ${C.rose};color:${C.rose};font-family:'JetBrains Mono',monospace;font-weight:600;font-size:64px;letter-spacing:.12em;transform:rotate(-8deg);background:rgba(247,243,236,.9);}`,
    html: `<div id="${p}-card"><small>RESPOSTA DE IA GENÉRICA</small>Segundo especialistas, 73% dos brasileiros já usam canetas pelo SUS desde o início do ano.<br><span id="${p}-src">fonte: ???</span></div><div id="${p}-stamp">INVENTADO</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-card', { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-src', { scale: 0 }, { scale: 1, duration: 0.25, ease: 'back.out(3)' }, ${t0 + 0.5});
tl.fromTo('#${p}-stamp', { scale: 2.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, ${t0 + 0.9});
${shake('#' + p + '-card', t0 + 1.12, 16)}`,
  }),

  // ——— série Inteligência ———

  // a base: contador de matérias + veículos acompanhados
  base: (p) => {
    const outlets = ['UOL', 'Folha', 'Metrópoles', 'CNN Brasil', 'Brasil 247', 'Gazeta do Povo', 'Estado de Minas', 'A Tarde', 'DCM', 'ND Mais'];
    return {
      css: `#${p}-big{position:absolute;left:0;right:0;top:200px;text-align:center;font-family:'Newsreader',serif;font-size:260px;line-height:1;color:${C.navy};letter-spacing:-8px;text-shadow:10px 10px 0 ${C.butter};}
#${p}-lab{position:absolute;left:0;right:0;top:480px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:34px;letter-spacing:.16em;text-transform:uppercase;}
#${p}-chips{position:absolute;left:60px;right:60px;top:600px;display:flex;flex-wrap:wrap;justify-content:center;gap:18px;}
.${p}-o{padding:16px 26px;border-radius:999px;background:${C.paper};border:3px solid ${C.ink};box-shadow:5px 5px 0 ${C.ink};font-size:34px;font-weight:700;}
.${p}-o.more{background:${C.rose};color:${C.paper};font-family:'JetBrains Mono',monospace;font-weight:600;}`,
      html: `<div id="${p}-big">0</div><div id="${p}-lab">matérias lidas hoje</div><div id="${p}-chips">${outlets.map((o) => `<span class="${p}-o">${o}</span>`).join('')}<span class="${p}-o more">+92 veículos</span></div>`,
      js: (t0, t1) => `const el = document.querySelector('#${p}-big'), o = { v: 0 };
tl.fromTo(o, { v: 0 }, { v: 5374, duration: ${(t1 - t0 - 0.6).toFixed(2)}, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('pt-BR'); } }, ${t0 + 0.1});
tl.fromTo(['#${p}-big', '#${p}-lab'], { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'expo.out' }, ${t0});
tl.fromTo('.${p}-o', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2.5)', stagger: ${((t1 - t0 - 1.0) / 11).toFixed(3)} }, ${t0 + 0.5});`,
    };
  },

  // folga: Ana tranquila, zero abas
  folga: (p) => ({
    css: `#${p}-pill{position:absolute;left:0;right:0;top:220px;display:flex;justify-content:center;}
#${p}-pill span{padding:16px 34px;border-radius:999px;background:${C.grass};color:${C.paper};border:3px solid ${C.ink};font-family:'JetBrains Mono',monospace;font-size:44px;font-weight:600;box-shadow:6px 6px 0 ${C.ink};}`,
    html: `${disc(p + '-disc', 220, 470, 640, C.butter)}${person(p + '-ana', 'ana_coffee', 170, 380, 780)}<div id="${p}-pill"><span>0 abas abertas</span></div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-disc', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-ana', { y: 700 }, { y: 0, duration: 0.45, ease: 'power3.out' }, ${t0});
${face(p + '-ana', 'Calm', 'Smile', t0 + 0.5)}
tl.fromTo('#${p}-pill span', { scale: 0, rotation: -10 }, { scale: 1, rotation: 0, duration: 0.35, ease: 'back.out(2.5)' }, ${t0 + 0.3});`,
  }),

  // um assunto absorvendo matérias
  assunto: (p) => ({
    css: `#${p}-card{position:absolute;left:140px;top:430px;width:800px;box-sizing:border-box;padding:44px;border:4px solid ${C.ink};border-radius:30px;background:${C.navy};color:${C.paper};box-shadow:12px 12px 0 ${C.ink};text-align:center;z-index:2;}
#${p}-card b{display:block;font-family:'Newsreader',serif;font-weight:400;font-size:72px;line-height:1.05;}
#${p}-card span{display:inline-block;margin-top:24px;padding:10px 22px;border-radius:999px;background:${C.butter};color:${C.ink};font-family:'JetBrains Mono',monospace;font-size:30px;font-weight:600;}
.${p}-n{position:absolute;width:260px;box-sizing:border-box;padding:12px 16px;border:3px solid ${C.ink};border-radius:12px;background:${C.paper};box-shadow:5px 5px 0 ${C.ink};font-family:'Newsreader',serif;font-size:22px;line-height:1.15;}
.${p}-n i{display:block;font-style:normal;font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:${C.navy};margin-bottom:6px;}`,
    html: `${NEWS.map(([v, t], i) => `<div class="${p}-n" id="${p}-n${i}" style="left:${[40, 780, 60, 760, 400, 420][i]}px;top:${[190, 220, 900, 930, 170, 1000][i]}px;"><i>${v}</i>${t}</div>`).join('')}<div id="${p}-card"><b>Canetas emagrecedoras no SUS</b><span><b id="${p}-c" style="display:inline;font:inherit;">0</b> matérias</span></div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-card', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.8)' }, ${t0});
tl.fromTo('.${p}-n', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)', stagger: 0.08 }, ${t0 + 0.2});
${NEWS.map((_, i) => `tl.to('#${p}-n${i}', { x: ${410 - [40, 780, 60, 760, 400, 420][i]}, y: ${560 - [190, 220, 900, 930, 170, 1000][i]}, scale: 0.3, opacity: 0, duration: 0.35, ease: 'power3.in' }, ${(t1 - 1.1 + i * 0.1).toFixed(2)});`).join('\n')}
const el = document.querySelector('#${p}-c'), o = { v: 0 };
tl.fromTo(o, { v: 0 }, { v: 24, duration: ${(t1 - t0 - 0.5).toFixed(2)}, ease: 'power1.inOut', onUpdate: () => { el.textContent = Math.round(o.v); } }, ${t0 + 0.2});
tl.to('#${p}-card', { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1 }, ${(t1 - 0.4).toFixed(2)});`,
  }),

  // três ângulos do mesmo assunto
  angulos: (p) => {
    const A = [['RECOMENDADO', 'A promessa e sua execução', 13, C.butter], ['ALTERNATIVA', 'O que já mudou no mercado', 4, C.paper], ['ALTERNATIVA', 'Próximos passos e prazos', 7, C.paper]];
    return {
      css: `#${p}-t{position:absolute;left:0;right:0;top:180px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:28px;letter-spacing:.2em;color:${C.navy};}
.${p}-a{position:absolute;left:90px;width:900px;box-sizing:border-box;padding:28px 34px;border:4px solid ${C.ink};border-radius:26px;box-shadow:10px 10px 0 ${C.ink};}
.${p}-a i{display:block;font-style:normal;font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.14em;color:${C.navy};}
.${p}-a b{display:block;margin-top:10px;font-family:'Newsreader',serif;font-weight:400;font-size:54px;line-height:1.05;}
.${p}-a span{position:absolute;right:28px;top:24px;font-family:'JetBrains Mono',monospace;font-size:22px;}`,
      html: `<div id="${p}-t">1 ASSUNTO · 3 ÂNGULOS</div>${A.map(([k, t, n, bg], i) => `<div class="${p}-a" id="${p}-a${i}" style="top:${250 + i * 290}px;background:${bg};transform:rotate(${[-1.5, 1, -0.5][i]}deg);"><i>${k}</i><b>${t}</b><span>${n} matérias</span></div>`).join('')}`,
      js: (t0, t1) => `tl.fromTo('#${p}-t', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${t0});
${A.map((_, i) => `tl.fromTo('#${p}-a${i}', { x: ${i % 2 ? 1100 : -1100} }, { x: 0, duration: 0.4, ease: 'expo.out' }, ${(t0 + 0.1 + i * (t1 - t0 - 0.6) / 3).toFixed(2)});`).join('\n')}`,
    };
  },

  // quantas matérias sustentam cada ângulo + clique
  escolhe: (p) => {
    const A = [['A promessa e sua execução', 13], ['Próximos passos e prazos', 7], ['O que já mudou no mercado', 4]];
    return {
      css: `#${p}-t{position:absolute;left:0;right:0;top:190px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:28px;letter-spacing:.2em;color:${C.navy};}
.${p}-r{position:absolute;left:90px;width:900px;}
.${p}-r b{display:block;font-family:'Newsreader',serif;font-weight:400;font-size:44px;margin-bottom:12px;}
.${p}-bar{height:70px;border:3px solid ${C.ink};border-radius:14px;background:${C.navy};box-shadow:6px 6px 0 ${C.ink};transform-origin:0 50%;display:flex;align-items:center;justify-content:flex-end;padding-right:20px;box-sizing:border-box;color:${C.paper};font-family:'JetBrains Mono',monospace;font-size:30px;font-weight:600;}
#${p}-go{position:absolute;left:230px;top:1000px;padding:26px 44px;border-radius:999px;background:${C.butter};border:3px solid ${C.ink};box-shadow:8px 8px 0 ${C.ink};font-size:40px;font-weight:700;}`,
      html: `<div id="${p}-t">MATÉRIAS QUE SUSTENTAM CADA ÂNGULO</div>${A.map(([t, n], i) => `<div class="${p}-r" style="top:${280 + i * 220}px;"><b>${t}</b><div class="${p}-bar" id="${p}-bar${i}" style="width:${Math.round(260 + n * 48)}px;${i ? `background:${C.sky};` : ''}">${n}</div></div>`).join('')}<div id="${p}-go">Usar este ângulo ✓</div><div id="${p}-hand" style="position:absolute;left:0;top:0;">${HAND(p + '-hs')}</div>`,
      js: (t0, t1) => `tl.fromTo('#${p}-t', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${t0});
tl.fromTo('.${p}-bar', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'expo.out', stagger: 0.18 }, ${t0 + 0.1});
tl.fromTo('#${p}-go', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.5)' }, ${t0 + 0.9});
tl.fromTo('#${p}-hand', { x: 900, y: 1500, opacity: 0 }, { x: 520, y: 1040, opacity: 1, duration: 0.4, ease: 'power3.out' }, ${(t1 - 0.9).toFixed(2)});
tl.to('#${p}-go', { scale: 0.93, duration: 0.08, yoyo: true, repeat: 1 }, ${(t1 - 0.45).toFixed(2)});
tl.to('#${p}-go', { backgroundColor: '${C.grass}', color: '${C.paper}', duration: 0.1 }, ${(t1 - 0.35).toFixed(2)});`,
    };
  },

  // quem moveu o assunto (dados reais do Radar)
  quem: (p) => {
    const Q = [['UOL', 30], ['Metrópoles', 18], ['Brasil 247', 18], ['CNN Brasil', 13], ['Folha', 11]];
    return {
      css: `#${p}-t{position:absolute;left:0;right:0;top:190px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:28px;letter-spacing:.2em;color:${C.navy};}
#${p}-s{position:absolute;left:0;right:0;top:240px;text-align:center;font-family:'Newsreader',serif;font-size:46px;}
.${p}-row{position:absolute;left:90px;display:flex;align-items:center;gap:22px;}
.${p}-row b{width:260px;text-align:right;font-size:40px;}
.${p}-bar{height:90px;border:3px solid ${C.ink};border-radius:14px;box-shadow:6px 6px 0 ${C.ink};transform-origin:0 50%;}
.${p}-row em{font-style:normal;font-family:'JetBrains Mono',monospace;font-size:36px;font-weight:600;}`,
      html: `<div id="${p}-t">QUEM MOVEU O ASSUNTO</div><div id="${p}-s">Soberania e combate às facções</div>${Q.map(([v, n], i) => `<div class="${p}-row" style="top:${350 + i * 150}px;"><b>${v}</b><div class="${p}-bar" style="width:${n * 17}px;background:${[C.navy, C.sky, C.sky, C.sky, C.sky][i]};"></div><em>${n}</em></div>`).join('')}`,
      js: (t0, t1) => `tl.fromTo(['#${p}-t', '#${p}-s'], { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.3 }, ${t0});
tl.fromTo('.${p}-row', { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'expo.out', stagger: 0.12 }, ${t0 + 0.1});
tl.fromTo('.${p}-bar', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out', stagger: 0.12 }, ${t0 + 0.25});`,
    };
  },

  // cresceu 100% hoje: linha subindo
  cresceu: (p) => ({
    css: `#${p}-big{position:absolute;left:0;right:0;top:190px;text-align:center;font-family:'Newsreader',serif;font-size:250px;line-height:1;color:${C.grass};letter-spacing:-6px;text-shadow:8px 8px 0 ${C.ink};}
#${p}-svg{position:absolute;left:90px;top:520px;width:900px;height:520px;}
#${p}-lab{position:absolute;left:90px;right:90px;top:1070px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:28px;letter-spacing:.1em;}`,
    html: `<div id="${p}-big">↑<span id="${p}-n">0</span>%</div><svg id="${p}-svg" viewBox="0 0 900 520"><line x1="0" y1="500" x2="900" y2="500" stroke="${C.ink}" stroke-width="4"/><polyline id="${p}-ln" points="0,470 150,455 300,460 450,400 600,300 750,160 880,40" fill="none" stroke="${C.navy}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><circle id="${p}-dot" cx="880" cy="40" r="24" fill="${C.butter}" stroke="${C.ink}" stroke-width="5" opacity="0"/></svg><div id="${p}-lab">237 MATÉRIAS · EM ALTA AGORA</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-ln', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: ${(t1 - t0 - 0.6).toFixed(2)}, ease: 'power2.in' }, ${t0 + 0.1});
tl.fromTo('#${p}-dot', { opacity: 0, scale: 0, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)' }, ${(t1 - 0.5).toFixed(2)});
const el = document.querySelector('#${p}-n'), o = { v: 0 };
tl.fromTo(o, { v: 0 }, { v: 100, duration: ${(t1 - t0 - 0.5).toFixed(2)}, ease: 'power2.in', onUpdate: () => { el.textContent = Math.round(o.v); } }, ${t0 + 0.1});
tl.fromTo('#${p}-big', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-lab', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${t0 + 0.4});`,
  }),

  // prompt em branco, cursor piscando
  prompt: (p) => ({
    css: `#${p}-box{position:absolute;left:70px;top:520px;width:940px;height:300px;box-sizing:border-box;padding:40px;border:3px solid ${C.ink};border-radius:30px;background:#fffdf8;box-shadow:12px 12px 0 ${C.ink};font-size:48px;color:#a9a39a;}
#${p}-car{display:inline-block;width:5px;height:60px;background:${C.ink};vertical-align:middle;margin-right:10px;}
#${p}-send{position:absolute;right:30px;bottom:30px;width:90px;height:90px;border-radius:50%;background:#d8d2c7;}
#${p}-note{position:absolute;left:0;right:0;top:300px;text-align:center;font-family:'Caveat',cursive;font-weight:700;font-size:100px;color:${C.rose};transform:rotate(-3deg);}`,
    html: `<div id="${p}-note">e agora?</div><div id="${p}-box"><span id="${p}-car"></span>Pergunte qualquer coisa<div id="${p}-send"></div></div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-box', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-car', { opacity: 1 }, { opacity: 0, duration: 0.01, repeat: ${Math.floor((t1 - t0) / 0.45)}, yoyo: true, repeatDelay: 0.44 }, ${t0 + 0.2});
tl.fromTo('#${p}-note', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, ${(t0 + (t1 - t0) * 0.55).toFixed(2)});`,
  }),

  // ——— séries REP e Redação ———

  // REP: o corvo, a sigla e o que ele faz (identidade do rep-brasil.com)
  rep: (p) => ({
    dark: true,
    css: `#${p}-crow{position:absolute;left:0;right:0;top:230px;display:flex;justify-content:center;}
#${p}-crow img{height:380px;width:auto;}
#${p}-w{position:absolute;left:0;right:0;top:640px;text-align:center;font-family:${RU};font-weight:700;font-size:210px;line-height:1;letter-spacing:-.02em;color:${R.ink};}
#${p}-rule{position:absolute;left:250px;right:250px;top:880px;height:2px;background:${R.gold};transform-origin:50% 50%;}
#${p}-full{position:absolute;left:0;right:0;top:910px;text-align:center;font-family:${RU};font-weight:600;font-size:30px;letter-spacing:.3em;text-transform:uppercase;color:${R.gold};}
#${p}-sub{position:absolute;left:130px;right:130px;top:990px;text-align:center;font-family:${RS};font-style:italic;font-size:44px;line-height:1.2;color:${R.ink2};}`,
    html: `<div id="${p}-crow">${CROW(380)}</div><div id="${p}-w">REP</div><div id="${p}-rule"></div><div id="${p}-full">Radar de Eventos Públicos</div><div id="${p}-sub">o radar da imprensa brasileira · ao vivo</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-crow img', { y: 60, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-w', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, ${t0 + 0.25});
tl.fromTo('#${p}-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.inOut' }, ${t0 + 0.5});
tl.fromTo(['#${p}-full', '#${p}-sub'], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.15 }, ${t0 + 0.7});`,
  }),

  // o acervo: 773.856 matérias, 102 veículos, 115 feeds (/api/stats de 26/set) — painel "Volume geral" do REP
  acervo: (p) => {
    const outlets = ['G1', 'CNN Brasil', 'UOL', 'Folha', 'Estadão', 'Metrópoles', 'O Globo', 'Valor', 'O Antagonista', 'Gazeta do Povo'];
    return {
      dark: true,
      css: `#${p}-k{position:absolute;left:0;right:0;top:200px;text-align:center;font-family:${RU};font-weight:600;font-size:28px;letter-spacing:.24em;color:${R.gold};}
#${p}-big{position:absolute;left:0;right:0;top:250px;text-align:center;font-family:${RS};font-size:210px;line-height:1;color:${R.goldBri};letter-spacing:-4px;font-feature-settings:"onum" 1;}
#${p}-lab{position:absolute;left:0;right:0;top:480px;text-align:center;font-family:${RU};font-size:30px;color:${R.ink2};}
#${p}-chips{position:absolute;left:60px;right:60px;top:580px;display:flex;flex-wrap:wrap;justify-content:center;gap:16px;}
.${p}-o{padding:14px 24px;border-radius:999px;border:1.5px solid ${R.line};background:${R.panel};color:${R.ink};font-family:${RU};font-size:30px;font-weight:600;}
.${p}-o.more{border-color:${R.gold};color:${R.gold};}
#${p}-stats{position:absolute;left:90px;right:90px;top:960px;display:grid;grid-template-columns:1fr 1fr;gap:18px;}
#${p}-stats div{padding:18px 24px;border:1.5px solid ${R.line};border-radius:18px;background:${R.panel};}
#${p}-stats b{display:block;font-family:${RS};font-weight:400;font-size:64px;line-height:1;color:${R.goldBri};}
#${p}-stats span{display:block;margin-top:6px;font-family:${RU};font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:${R.ink3};}`,
      html: `<div id="${p}-k">REP · TOTAL INDEXADO</div><div id="${p}-big">0</div><div id="${p}-lab">matérias no banco de notícias do REP</div><div id="${p}-chips">${outlets.map((o) => `<span class="${p}-o">${o}</span>`).join('')}<span class="${p}-o more">+92</span></div><div id="${p}-stats"><div><b>102</b><span>veículos</span></div><div><b>115</b><span>feeds</span></div></div>`,
      js: (t0, t1) => `const el = document.querySelector('#${p}-big'), o = { v: 0 };
tl.fromTo(o, { v: 0 }, { v: 773856, duration: ${(t1 - t0 - 0.4).toFixed(2)}, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('pt-BR'); } }, ${t0 + 0.1});
tl.fromTo(['#${p}-k', '#${p}-big', '#${p}-lab'], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'expo.out', stagger: 0.06 }, ${t0});
tl.fromTo('.${p}-o', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'back.out(2)', stagger: ${((t1 - t0 - 1.2) / 11).toFixed(3)} }, ${t0 + 0.4});
tl.fromTo('#${p}-stats div', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out', stagger: 0.12 }, ${(t1 - 0.8).toFixed(2)});`,
    };
  },

  // uma matéria vira bolha e ganha as classificações (campos reais dos agentes do REP)
  etiquetas: (p) => {
    const T = ['categoria', 'tipo de matéria', 'relevância', 'protagonista', 'ação principal', 'objeto', 'escopo', 'entidades', 'papel de cada ator', 'trecho de evidência', 'tópico canônico', 'subtema', 'âncora narrativa', 'matérias similares', 'confiança', 'categoria secundária'];
    return {
      dark: true,
      css: `#${p}-card{position:absolute;left:150px;top:190px;width:780px;box-sizing:border-box;padding:26px 32px;border:1.5px solid ${R.line};border-radius:18px;background:${R.panel};z-index:2;}
#${p}-card i{display:block;font-style:normal;font-family:${RU};font-weight:600;font-size:20px;letter-spacing:.2em;color:${R.gold};}
#${p}-card b{display:block;margin-top:10px;font-family:${RS};font-weight:500;font-size:44px;line-height:1.12;color:${R.ink};}
#${p}-grid{position:absolute;left:50px;right:50px;top:470px;display:flex;flex-wrap:wrap;justify-content:center;gap:14px;}
.${p}-t{white-space:nowrap;padding:12px 22px;border-radius:999px;border:1.5px solid ${R.line};background:${R.raise};color:${R.ink};font-family:${RU};font-size:28px;font-weight:600;}
.${p}-t.g{border-color:rgba(177,154,96,.6);color:${R.goldBri};}
.${p}-t.h{border-color:rgba(235,234,228,.96);background:${R.paper};color:${R.bg};}
#${p}-n{position:absolute;left:0;right:0;top:1050px;text-align:center;font-family:${RS};font-size:84px;line-height:1;color:${R.ink};}
#${p}-n em{font-style:normal;color:${R.goldBri};}`,
      html: `<div id="${p}-card"><i>FOLHA DE S.PAULO</i><b>Governo avalia levar ao SUS caneta prometida por Lula</b></div><div id="${p}-grid">${T.map((t, i) => `<span class="${p}-t${i % 3 === 1 ? ' g' : i % 3 === 2 ? ' h' : ''}">${t}</span>`).join('')}</div><div id="${p}-n"><em>+30</em> classificações</div>`,
      js: (t0, t1) => `tl.fromTo('#${p}-card', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }, ${t0});
tl.fromTo('.${p}-t', { y: -200, scale: 0, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)', stagger: ${((t1 - t0 - 1.1) / T.length).toFixed(3)} }, ${t0 + 0.3});
tl.fromTo('#${p}-n', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.5)' }, ${(t1 - 0.7).toFixed(2)});`,
    };
  },

  // matérias se conectando (análise cruzada), no escuro do Radar
  cruza: (p) => {
    let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const pts = Array.from({ length: 40 }, () => [100 + rnd() * 880, 220 + rnd() * 900]);
    const edges = [];
    pts.forEach((a, i) => { pts.forEach((b, j) => { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 230) edges.push([a, b]); }); });
    return {
      dark: true,
      css: `#${p}-svg{position:absolute;left:0;top:0;width:1080px;height:1920px;}`,
      html: `<svg id="${p}-svg" viewBox="0 0 1080 1920">${edges.map(([a, b]) => `<line class="${p}-e" x1="${a[0].toFixed(0)}" y1="${a[1].toFixed(0)}" x2="${b[0].toFixed(0)}" y2="${b[1].toFixed(0)}" stroke="${R.gold}" stroke-opacity=".7" stroke-width="3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`).join('')}${pts.map(([x, y], i) => `<circle class="${p}-d" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${i % 5 ? 16 : 26}" fill="${i % 5 ? R.panel : R.paper}" stroke="${i % 5 ? R.ink3 : '#ebeae4'}" stroke-width="2"/>`).join('')}</svg>`,
      js: (t0, t1) => `tl.fromTo('.${p}-d', { opacity: 0, scale: 0, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)', stagger: { amount: 0.6, from: 'random' } }, ${t0});
tl.to('.${p}-e', { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', stagger: { amount: ${(t1 - t0 - 1.2).toFixed(2)}, from: 'random' } }, ${t0 + 0.7});`,
    };
  },

  // matriz de evidências (agente evidence_matrix): fato / declaração / hipótese / lacuna
  matriz: (p) => {
    const K = [['FATO', R.green, 'Conitec analisa incorporação ao SUS'], ['DECLARAÇÃO', R.ink2, 'Governo anuncia distribuição gratuita'], ['HIPÓTESE', R.gold, 'Preço pode cair com genéricos'], ['LACUNA', R.red, 'Custo total ainda não divulgado']];
    return {
      dark: true,
      css: `#${p}-t{position:absolute;left:0;right:0;top:190px;text-align:center;font-family:${RU};font-weight:600;font-size:26px;letter-spacing:.24em;color:${R.gold};}
.${p}-r{position:absolute;left:80px;width:920px;height:190px;box-sizing:border-box;display:flex;align-items:center;gap:26px;padding:0 28px;border:1.5px solid ${R.line};border-radius:20px;background:${R.panel};}
.${p}-r b{flex:none;width:250px;padding:12px 0;text-align:center;border:1.5px solid currentColor;border-radius:999px;font-family:${RU};font-size:24px;font-weight:700;letter-spacing:.12em;}
.${p}-r span{font-family:${RS};font-size:40px;line-height:1.12;color:${R.ink};}`,
      html: `<div id="${p}-t">MATRIZ DE EVIDÊNCIAS</div>${K.map(([k, c, s], i) => `<div class="${p}-r" style="top:${260 + i * 220}px;"><b style="color:${c};">${k}</b><span>${s}</span></div>`).join('')}`,
      js: (t0, t1) => `tl.fromTo('#${p}-t', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${t0});
tl.fromTo('.${p}-r', { x: -1100 }, { x: 0, duration: 0.35, ease: 'expo.out', stagger: ${((t1 - t0 - 0.6) / 4).toFixed(2)} }, ${t0 + 0.1});`,
    };
  },

  // teia de entidades (agente entity_web), com bolhas no estilo do Radar
  teia: (p) => {
    const N = [['Governo', 540, 360, 1], ['Oposição', 200, 760, 0], ['Órgão de controle', 880, 760, 0], ['Setor privado', 540, 1060, 0]];
    const E = [[1, 0, 'acusa'], [2, 0, 'investiga'], [3, 0, 'apoia'], [1, 3, 'negocia com']];
    return {
      dark: true,
      css: `.${p}-n{position:absolute;width:250px;height:250px;margin:-125px 0 0 -125px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 24px;box-sizing:border-box;font-family:${RS};font-weight:500;font-size:40px;line-height:1.08;z-index:2;}
.${p}-n.hot{background:${R.paper};border:2px solid rgba(235,234,228,.96);color:#121820;}
.${p}-n.warm{border:2px solid rgba(177,154,96,.6);background:radial-gradient(110% 110% at 50% 38%,#232a2c,${R.panel} 72%);color:${R.ink};}
.${p}-lb{position:absolute;transform:translate(-50%,-50%);padding:10px 20px;border-radius:999px;border:1.5px solid ${R.line};background:${R.raise};color:${R.goldBri};font-family:${RU};font-size:28px;font-weight:700;z-index:3;}
#${p}-svg{position:absolute;left:0;top:0;width:1080px;height:1920px;}`,
      html: `<svg id="${p}-svg" viewBox="0 0 1080 1920">${E.map(([a, b]) => `<line class="${p}-e" x1="${N[a][1]}" y1="${N[a][2]}" x2="${N[b][1]}" y2="${N[b][2]}" stroke="${R.gold}" stroke-width="3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`).join('')}</svg>${N.map(([n, x, y, h]) => `<div class="${p}-n ${h ? 'hot' : 'warm'}" style="left:${x}px;top:${y}px;">${n}</div>`).join('')}${E.map(([a, b, r]) => `<span class="${p}-lb" style="left:${(N[a][1] + N[b][1]) / 2}px;top:${(N[a][2] + N[b][2]) / 2}px;">${r}</span>`).join('')}`,
      js: (t0, t1) => `tl.fromTo('.${p}-n', { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.1 }, ${t0});
${E.map((_, i) => `tl.to('.${p}-e:nth-child(${i + 1})', { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, ${(t0 + 0.4 + i * (t1 - t0 - 0.9) / 4).toFixed(2)});
tl.fromTo('.${p}-lb:nth-of-type(${i + 1})', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(3)' }, ${(t0 + 0.6 + i * (t1 - t0 - 0.9) / 4).toFixed(2)});`).join('\n')}`,
    };
  },

  // ——— gravações reais (Playwright, 1080×1920) ———
  // Radar público do REP (rep-brasil.com): bolhas vivas; o clique acontece em 2,98 s da gravação
  repradar: footage('rep-radar', 0, true),
  repmergulho: footage('rep-radar', 1.7, true, { at: 2.98, x: 555, y: 595 }),
  // Radar dentro do Pauta Pronta (painel logado): o clique acontece em 3,22 s da gravação
  ppradar: footage('pp-radar', 0.2, false),
  ppbolhas: footage('pp-radar', 1.6, false),
  ppclique: footage('pp-radar', 3.1, false, { at: 3.22, x: 543, y: 504 }),


  // colar o link
  link: (p) => ({
    css: `#${p}-box{position:absolute;left:70px;top:420px;width:940px;box-sizing:border-box;padding:40px;border:3px solid ${C.ink};border-radius:30px;background:${C.paper};box-shadow:12px 12px 0 ${C.ink};}
#${p}-q{font-family:'Newsreader',serif;font-size:52px;line-height:1.1;}
#${p}-in{margin-top:28px;height:110px;box-sizing:border-box;padding:0 26px;display:flex;align-items:center;gap:16px;border:3px solid ${C.ink};border-radius:20px;background:#fffdf8;font-family:'JetBrains Mono',monospace;font-size:30px;overflow:hidden;white-space:nowrap;}
#${p}-url{color:${C.sky};text-decoration:underline;}
#${p}-paste{position:absolute;left:620px;top:300px;padding:14px 26px;border-radius:14px;background:${C.ink};color:${C.paper};font-family:'JetBrains Mono',monospace;font-size:30px;}
#${p}-btn{margin-top:28px;display:inline-flex;padding:24px 36px;border-radius:999px;background:${C.navy};color:${C.paper};font-size:36px;font-weight:700;box-shadow:6px 6px 0 ${C.ink};}`,
    html: `<div id="${p}-paste">⌘V colar</div><div id="${p}-box"><div id="${p}-q">Tema ou link da matéria</div><div id="${p}-in">🔗 <span id="${p}-url">folha.uol.com.br/…/caneta-no-sus</span></div><div id="${p}-btn">Criar pauta →</div></div><div id="${p}-hand" style="position:absolute;left:0;top:0;">${HAND(p + '-hs')}</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-box', { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-paste', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(3)' }, ${t0 + 0.5});
tl.to('#${p}-paste', { opacity: 0, duration: 0.15 }, ${t0 + 1.0});
tl.fromTo('#${p}-url', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.2, ease: 'power3.out' }, ${t0 + 0.9});
tl.fromTo('#${p}-in', { backgroundColor: '#fffdf8' }, { backgroundColor: '${C.butter}', duration: 0.15, yoyo: true, repeat: 1 }, ${t0 + 0.9});
tl.fromTo('#${p}-hand', { x: 900, y: 1300, opacity: 0 }, { x: 280, y: 800, opacity: 1, duration: 0.3, ease: 'power3.out' }, ${(t1 - 0.5).toFixed(2)});
tl.to('#${p}-btn', { scale: 0.93, duration: 0.08, yoyo: true, repeat: 1 }, ${(t1 - 0.15).toFixed(2)});`,
  }),

  // o link consulta o acervo do REP
  busca: (p) => {
    const R = NEWS.map((n, i) => { const a = (i / NEWS.length) * Math.PI * 2 - Math.PI / 2; return [...n, 540 + Math.cos(a) * 330, 660 + Math.sin(a) * 400]; });
    return {
      css: `#${p}-c{position:absolute;left:340px;top:570px;width:400px;box-sizing:border-box;padding:20px;border:4px solid ${C.ink};border-radius:20px;background:#111820;color:#f0eadf;box-shadow:8px 8px 0 ${C.butter};font-family:'JetBrains Mono',monospace;font-size:22px;text-align:center;z-index:2;display:flex;flex-direction:column;align-items:center;gap:8px;}
#${p}-c small{font-family:${RU};font-size:20px;letter-spacing:.2em;color:#b19a60;}
.${p}-n{position:absolute;width:250px;margin-left:-125px;margin-top:-50px;box-sizing:border-box;padding:10px 14px;border:3px solid ${C.ink};border-radius:12px;background:${C.paper};box-shadow:5px 5px 0 ${C.ink};font-family:'Newsreader',serif;font-size:20px;line-height:1.15;z-index:2;}
.${p}-n i{display:block;font-style:normal;font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:${C.navy};margin-bottom:4px;}
#${p}-svg{position:absolute;left:0;top:0;width:1080px;height:1920px;}
#${p}-lab{position:absolute;left:0;right:0;top:1130px;text-align:center;}
#${p}-lab span{padding:14px 28px;border-radius:999px;background:${C.grass};color:${C.paper};border:3px solid ${C.ink};font-family:'JetBrains Mono',monospace;font-size:32px;box-shadow:6px 6px 0 ${C.ink};}`,
      html: `<svg id="${p}-svg" viewBox="0 0 1080 1920">${R.map(([, , x, y]) => `<line class="${p}-e" x1="540" y1="660" x2="${x.toFixed(0)}" y2="${y.toFixed(0)}" stroke="${C.navy}" stroke-width="5" stroke-dasharray="1" stroke-dashoffset="1" pathLength="1"/>`).join('')}</svg><div id="${p}-c"><span>🔗 link colado ↓</span>${REPLOCK(48)}<small>ACERVO</small></div>${R.map(([v, t, x, y]) => `<div class="${p}-n" style="left:${x.toFixed(0)}px;top:${y.toFixed(0)}px;"><i>${v}</i>${t}</div>`).join('')}<div id="${p}-lab"><span>24 matérias relacionadas</span></div>`,
      js: (t0, t1) => `tl.fromTo('#${p}-c', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }, ${t0});
tl.to('.${p}-e', { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out', stagger: 0.12 }, ${t0 + 0.3});
tl.fromTo('.${p}-n', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)', stagger: 0.12 }, ${t0 + 0.5});
tl.fromTo('#${p}-lab span', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.5)' }, ${(t1 - 0.8).toFixed(2)});`,
    };
  },

  // uma matéria só: um lado
  umlado: (p) => ({
    css: `#${p}-card{position:absolute;left:140px;top:320px;width:800px;box-sizing:border-box;padding:40px;border:4px solid ${C.ink};border-radius:28px;background:#fffdf8;box-shadow:12px 12px 0 ${C.ink};overflow:hidden;}
#${p}-card i{display:block;font-style:normal;font-family:'JetBrains Mono',monospace;font-size:24px;letter-spacing:.1em;color:${C.navy};}
#${p}-card b{display:block;margin-top:14px;font-family:'Newsreader',serif;font-weight:400;font-size:62px;line-height:1.08;}
#${p}-shade{position:absolute;left:50%;top:0;right:0;bottom:0;background:${C.creamDeep};}
#${p}-tag{position:absolute;left:0;right:0;top:860px;text-align:center;font-family:'Caveat',cursive;font-weight:700;font-size:100px;color:${C.rose};transform:rotate(-3deg);}`,
    html: `<div id="${p}-card"><i>GAZETA DO POVO</i><b>Lula promete canetas, mas não sabe quanto custará</b><div id="${p}-shade"></div></div><div id="${p}-tag">1 de 24 matérias</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-card', { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-shade', { scaleX: 0, transformOrigin: '100% 50%' }, { scaleX: 1, duration: 0.4, ease: 'power3.inOut' }, ${t0 + 0.7});
tl.fromTo('#${p}-tag', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, ${t0 + 1.0});`,
  }),

  // a mesma história em vários veículos
  cobertura: (p) => ({
    css: `.${p}-k{position:absolute;left:90px;width:900px;box-sizing:border-box;padding:22px 28px;border:3px solid ${C.ink};border-radius:22px;background:${C.paper};box-shadow:7px 7px 0 ${C.ink};}
.${p}-k i{display:block;font-style:normal;font-family:'JetBrains Mono',monospace;font-size:20px;letter-spacing:.1em;text-transform:uppercase;color:${C.navy};}
.${p}-k b{display:block;margin-top:6px;font-family:'Newsreader',serif;font-weight:400;font-size:38px;line-height:1.1;}`,
    html: NEWS.slice(0, 5).map(([v, t], i) => `<div class="${p}-k" style="top:${190 + i * 195}px;transform:rotate(${[-1, 1, -0.5, 0.8, -1.2][i]}deg);"><i>${v}</i><b>${t}</b></div>`).join(''),
    js: (t0, t1) => `tl.fromTo('.${p}-k', { x: (i) => (i % 2 ? 1100 : -1100) }, { x: 0, duration: 0.35, ease: 'expo.out', stagger: ${((t1 - t0 - 0.5) / 5).toFixed(2)} }, ${t0});`,
  }),

  // as quatro funções de uma redação
  mesas: (p) => {
    const M = [['analista', 'PESQUISA'], ['leitor', 'CHECAGEM'], ['editor', 'ANÁLISE'], ['ana_computer', 'TEXTO']];
    return {
      css: `.${p}-m{position:absolute;width:440px;height:470px;box-sizing:border-box;border:4px solid ${C.ink};border-radius:26px;background:${C.paper};box-shadow:8px 8px 0 ${C.ink};overflow:hidden;}
.${p}-m .fig{position:absolute;left:50%;bottom:-10px;height:380px;transform:translateX(-50%);}
.${p}-m b{position:absolute;left:0;right:0;top:18px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:30px;letter-spacing:.14em;}`,
      html: M.map(([n, l], i) => `<div class="${p}-m" style="left:${i % 2 ? 580 : 60}px;top:${190 + Math.floor(i / 2) * 510}px;background:${[C.butter, C.paper, C.paper, C.butter][i]};"><b>${l}</b><div class="fig">${peep(n, `${p}-f${i}`)}</div></div>`).join(''),
      js: (t0, t1) => `tl.fromTo('.${p}-m', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)', stagger: ${((t1 - t0 - 0.4) / 4).toFixed(2)} }, ${t0});`,
    };
  },

  // a redação inteira: as quatro mesas se encolhem
  redacao: (p) => {
    const M = ['analista', 'leitor', 'editor', 'ana_computer'];
    return {
      css: `.${p}-m{position:absolute;width:440px;height:470px;box-sizing:border-box;border:4px solid ${C.ink};border-radius:26px;background:${C.paper};box-shadow:8px 8px 0 ${C.ink};overflow:hidden;}
.${p}-m .fig{position:absolute;left:50%;bottom:-10px;height:380px;transform:translateX(-50%);}
#${p}-big{position:absolute;left:0;right:0;top:560px;text-align:center;font-family:'Newsreader',serif;font-size:110px;line-height:1;color:${C.paper};text-shadow:6px 6px 0 ${C.ink};z-index:3;}
#${p}-veil{position:absolute;inset:0;background:${C.navy};opacity:0;z-index:2;}`,
      html: `${M.map((n, i) => `<div class="${p}-m" style="left:${i % 2 ? 580 : 60}px;top:${190 + Math.floor(i / 2) * 510}px;"><div class="fig">${peep(n, `${p}-f${i}`)}</div></div>`).join('')}<div id="${p}-veil"></div><div id="${p}-big">1 redação<br>inteira</div>`,
      js: (t0, t1) => `tl.fromTo('#${p}-veil', { opacity: 0 }, { opacity: 0.85, duration: 0.3 }, ${t0 + 0.2});
tl.fromTo('#${p}-big', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, ${t0 + 0.3});
tl.to('.${p}-m', { scale: 0.92, duration: ${(t1 - t0).toFixed(2)}, ease: 'none' }, ${t0});`,
    };
  },

  // tudo cabe no celular
  mao: (p) => ({
    css: `.${p}-row{display:flex;align-items:center;gap:14px;margin:18px 22px 0;padding:18px 20px;border:3px solid ${C.ink};border-radius:18px;background:${C.paper};font-size:30px;font-weight:700;}
.${p}-row i{font-style:normal;margin-left:auto;padding:4px 12px;border-radius:999px;background:${C.grass};color:${C.paper};font-family:'JetBrains Mono',monospace;font-size:20px;}`,
    html: `${disc(p + '-disc', 190, 330, 700, C.butter)}${phone(p + '-ph', 250, 220, 580, 930, `<div style="padding:30px 26px 6px;display:flex;align-items:center;gap:12px;font-weight:700;font-size:26px;">${LOGO_MARK(38)}pautapronta</div>${['Pesquisa', 'Checagem', 'Análise', 'Texto'].map((l) => `<div class="${p}-row">${l}<i>✓ pronto</i></div>`).join('')}`)}`,
    js: (t0, t1) => `tl.fromTo('#${p}-disc', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-ph', { y: 600, rotation: 8 }, { y: 0, rotation: 0, duration: 0.45, ease: 'expo.out' }, ${t0});
tl.fromTo('.${p}-row', { x: 400, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, ease: 'back.out(2)', stagger: 0.14 }, ${t0 + 0.35});`,
  }),

  // fecho: logo + CTA
  fecho: (p) => ({
    css: `#${p}-lock{position:absolute;left:0;right:0;top:360px;display:flex;flex-direction:column;align-items:center;gap:20px;}
#${p}-name{font-family:'Newsreader',serif;font-size:150px;line-height:.95;letter-spacing:-4px;}
#${p}-cta{position:absolute;left:0;right:0;top:880px;display:flex;justify-content:center;}
#${p}-btn{padding:34px 48px;border-radius:999px;background:${C.navy};color:${C.paper};font-size:46px;font-weight:700;box-shadow:10px 10px 0 ${C.ink};text-align:center;line-height:1.2;}
#${p}-btn span{display:block;font-size:30px;color:${C.butter};font-weight:600;}
#${p}-url{position:absolute;left:0;right:0;top:1100px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:38px;letter-spacing:.2em;}`,
    html: `<div id="${p}-lock">${LOGO_MARK(200, p + '-mark')}<div id="${p}-name">Pauta Pronta</div></div><div id="${p}-cta"><div id="${p}-btn">Teste grátis<span>uma pauta, sem cartão</span></div></div><div id="${p}-url">pautapronta.com</div>`,
    js: (t0, t1) => `tl.fromTo('#${p}-mark', { scale: 0, rotation: -120, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.5, ease: 'expo.out' }, ${t0});
tl.fromTo('#${p}-name', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, ${t0 + 0.15});
tl.fromTo('#${p}-btn', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, ${t0 + 0.5});
tl.fromTo('#${p}-url', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${t0 + 0.8});
tl.to('#${p}-btn', { scale: 1.06, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: 3 }, ${t0 + 1.2});`,
  }),

  // fecho das séries REP: Pauta Pronta + selo "com a inteligência do REP" (corvo)
  fechorep: (p) => {
    const f = SHOTS.fecho(p);
    return {
      css: f.css + `
#${p}-rep{position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center;}
#${p}-rep > div{display:inline-flex;align-items:center;gap:22px;padding:18px 30px 18px 34px;border-radius:999px;background:${R.bg};box-shadow:8px 8px 0 ${C.butter};}
#${p}-rep i{font-style:normal;font-family:${RU};font-size:24px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${R.gold};}
#${p}-lock{top:420px !important;}`,
      html: `<div id="${p}-rep"><div><i>com a inteligência do</i>${REPLOCK(64)}</div></div>` + f.html,
      js: (t0, t1) => f.js(t0, t1) + `
tl.fromTo('#${p}-rep > div', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, ${t0 + 0.6});`,
    };
  },
};
