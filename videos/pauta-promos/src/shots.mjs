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
#${p}-tag{position:absolute;left:0;right:0;top:170px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:28px;letter-spacing:.2em;color:${C.navy};}`,
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
};
