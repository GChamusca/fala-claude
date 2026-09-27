// Anúncio "Primeiro e certo" — plantão contra o relógio (1080×1920, ~23,5 s).
// Tudo o que aparece do produto é gravação/arquivo real de 27/09/2026 (pauta A2ADDE, MP das bets).
// Cronômetro = tempo real do caminho limpo: 6 min 08 s (geração 5 min 07 s; a 1ª tentativa de
// pesquisa, que falhou, ficou fora da conta).
import fs from 'node:fs';
import { C, FONT_FACES } from '../../pauta-explicativo/src/lib.mjs';

const ROOT = new URL('../', import.meta.url);
const R = { bg: '#111820', panel: '#18212b', ink: '#f0eadf', ink2: '#aaa79e', gold: '#b19a60', goldBri: '#c6b278', red: '#ce8277', alarm: '#e0483e' };
const RS = "Georgia,'Liberation Serif',serif";
const DUR = 23.5;

// ——— tempos (s) ———
const RS0 = 2.4;                                   // começa a corrida
const SEG = [0, 1.5, 2.3, 2.9, 3.7, 5.3, 7.0, 8.4]; // fronteiras no vídeo pp-jornada.mp4
const CLK = [0, 2, 4, 6, 13, 61, 368, 368];        // cronômetro real (s) em cada fronteira
const WIN = RS0 + 7.0;                             // 9,4 s: post pronto
const RES = 10.6, PROOF = 13.6, END = 18.2;
const STEP = ['RADAR · 162 MATÉRIAS · 40 VEÍCULOS', 'GERAR PAUTA', 'COMPLEMENTAR COM O ACERVO REP', 'PESQUISA · 13 FONTES', 'ÂNGULO · TOM · FORMATO', 'A REDAÇÃO ESCREVENDO · AO VIVO', 'CARROSSEL PRONTO'];
// toques gravados (tempo no vídeo, x/y em px CSS do celular de 360 px)
const TAPS = [[0.63, 181, 375], [1.58, 180, 473], [2.41, 247, 592], [4.41, 82, 515], [4.48, 249, 390], [4.54, 127, 390], [5.23, 180, 390]];

// ——— layout da corrida ———
const PH = { x: 500, y: 300, w: 540, pad: 12 };   // celular da direita (Pauta Pronta)
const VW = PH.w - 2 * PH.pad, VH = Math.round(VW * 2340 / 1080), K = VW / 360;
const LP = { x: 45, y: 430, w: 420, h: 880 };     // celular da esquerda (jeito de sempre)
const TABS = [
  ['Agência Brasil', 'Bets que continuarem no ar após prazo serão bloqueadas, diz Durigan'],
  ['Sul21', 'MP proíbe bets no Brasil e determina devolução de saldo ao apostador'],
  ['ND Mais', 'Governo oficializa fim das bets e Desenrola 3.0 em edição extra do Diário Oficial'],
  ['Folha de S.Paulo', 'Governo precisará compensar perda de R$ 6,8 bi em receitas com bets até 2027'],
  ['O Globo', 'Fazenda estima R$ 1,7 bilhão depositado nas bets que poderão ser devolvidos'],
  ['Poder360', 'Entenda o plano de Lula que proíbe bets e lança Desenrola 3.0'],
  ['Metrópoles', 'Além das bets, jogos como o "Jogo do Tigrinho" estão proibidos no Brasil'],
  ['Jornal do Commercio', 'Não se pode mais colocar dinheiro em sites de apostas, diz ministro'],
];
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const css = `${FONT_FACES}
#root{position:absolute;inset:0;overflow:hidden;background:${R.bg};color:${R.ink};font-family:'Bricolage Grotesque',sans-serif;}
.sc{position:absolute;inset:0;opacity:0;}
.mono{font-family:'JetBrains Mono',monospace;}
/* gancho */
#notif{position:absolute;left:60px;right:60px;top:150px;padding:26px 30px;border-radius:34px;background:rgba(240,234,223,.94);color:#111;display:flex;gap:22px;align-items:flex-start;box-shadow:0 30px 60px -20px rgba(0,0,0,.6);}
#notif i{flex:none;width:84px;height:84px;border-radius:20px;background:${R.alarm};color:#fff;font-style:normal;display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:22px;letter-spacing:.04em;}
#notif b{display:block;font-size:30px;letter-spacing:.06em;}
#notif span{display:block;margin-top:6px;font-size:38px;line-height:1.18;font-weight:600;}
#notif em{position:absolute;right:34px;top:26px;font-style:normal;font-size:26px;color:#666;}
#h1{position:absolute;left:70px;right:70px;top:700px;font-weight:800;font-size:112px;line-height:1.02;letter-spacing:-2px;}
#h2{position:absolute;left:70px;right:70px;top:980px;font-weight:800;font-size:76px;line-height:1.08;letter-spacing:-1px;color:${R.ink2};}
#h2 b{color:${R.ink};}
/* corrida */
#plantao{position:absolute;left:0;right:0;top:62px;display:flex;justify-content:center;gap:16px;align-items:center;font-family:'JetBrains Mono',monospace;font-size:26px;letter-spacing:.2em;color:${R.ink2};z-index:6;}
#plantao i{font-style:normal;padding:6px 14px;background:${R.alarm};color:#fff;letter-spacing:.14em;}
#clock{position:absolute;left:0;right:0;top:100px;text-align:center;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:170px;line-height:1.1;letter-spacing:-4px;color:${R.alarm};z-index:6;font-variant-numeric:tabular-nums;}
#ph{position:absolute;left:${PH.x}px;top:${PH.y}px;width:${PH.w}px;height:${VH + 2 * PH.pad}px;box-sizing:border-box;padding:${PH.pad}px;border-radius:64px;background:#05070a;box-shadow:0 0 0 3px #2a3542, 0 40px 80px -30px #000;z-index:3;transform-origin:50% 0%;}
#ph .scr{position:relative;width:${VW}px;height:${VH}px;border-radius:52px;overflow:hidden;background:#f7f3ec;}
#ph video{position:absolute;left:0;top:0;width:${VW}px;height:${VH}px;}
.tap{position:absolute;width:74px;height:74px;margin:-37px 0 0 -37px;border-radius:50%;border:5px solid ${C.navy};background:rgba(36,69,107,.2);opacity:0;}
#lp{position:absolute;left:${LP.x}px;top:${LP.y}px;width:${LP.w}px;height:${LP.h}px;box-sizing:border-box;padding:10px;border-radius:52px;background:#05070a;box-shadow:0 0 0 3px #2a3542;filter:grayscale(1);z-index:2;}
#lp .scr{position:relative;width:100%;height:100%;border-radius:42px;overflow:hidden;background:#e9e9e9;}
#lp .bar{position:absolute;left:0;right:0;top:0;height:92px;background:#d5d5d5;display:flex;align-items:flex-end;padding:0 18px 12px;gap:8px;z-index:2;}
#lp .bar span{flex:1;height:40px;border-radius:10px 10px 0 0;background:#c2c2c2;font-family:'JetBrains Mono',monospace;font-size:13px;color:#555;overflow:hidden;white-space:nowrap;padding:12px 8px 0;box-sizing:border-box;}
#lp .bar span.on{background:#fafafa;color:#222;}
#lp .page{position:absolute;left:0;right:0;top:92px;padding:26px 24px;}
#lp .page b{display:block;font-family:'JetBrains Mono',monospace;font-size:16px;letter-spacing:.12em;color:#666;text-transform:uppercase;}
#lp .page h3{margin:12px 0 18px;font-family:${RS};font-weight:400;font-size:34px;line-height:1.12;color:#222;}
#lp .page p{height:14px;margin:0 0 14px;border-radius:7px;background:#cfcfcf;}
#abas{position:absolute;left:0;right:0;bottom:26px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:24px;color:#444;z-index:3;}
.lab{position:absolute;top:${PH.y + VH + 2 * PH.pad + 26}px;font-family:'JetBrains Mono',monospace;font-size:24px;letter-spacing:.16em;text-align:center;}
#labL{left:${LP.x}px;width:${LP.w}px;color:#7d828a;top:${LP.y + LP.h + 26}px;}
#labR{left:${PH.x}px;width:${PH.w}px;color:${R.goldBri};}
#step{position:absolute;left:60px;right:60px;top:1600px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:34px;letter-spacing:.08em;color:${R.ink};}
#step span{position:absolute;left:0;right:0;opacity:0;}
#pronto{position:absolute;left:0;right:0;top:1700px;text-align:center;opacity:0;}
#pronto span{display:inline-block;padding:14px 30px;border:4px solid ${R.goldBri};color:${R.goldBri};font-family:'JetBrains Mono',monospace;font-weight:600;font-size:40px;letter-spacing:.2em;}
/* resultado */
#res{background:#f4efe6;color:#111;}
#res h2,#proof h2{position:absolute;left:70px;right:70px;top:120px;margin:0;font-weight:800;font-size:74px;line-height:1.04;letter-spacing:-1px;}
#res h2 em,#proof h2 em{font-style:normal;color:${C.navy};}
#rail{position:absolute;left:130px;top:430px;display:flex;gap:40px;}
#rail img{width:820px;height:1025px;display:block;border-radius:10px;box-shadow:0 30px 60px -30px rgba(0,0,0,.45);}
#res .meta{position:absolute;left:0;right:0;top:1500px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:28px;letter-spacing:.12em;color:#555;}
/* prova */
#proof{background:#f4efe6;color:#111;}
#s1{position:absolute;left:40px;top:-230px;width:1000px;border-radius:12px;box-shadow:0 30px 60px -30px rgba(0,0,0,.4);}
#mk{position:absolute;left:112px;top:690px;width:610px;height:50px;background:rgba(232,200,115,.55);mix-blend-mode:multiply;transform-origin:0 50%;}
#cit{position:absolute;left:50px;right:50px;top:900px;padding:34px 36px;background:#fffdf8;border:2px solid #111;border-radius:22px;box-shadow:10px 10px 0 #111;}
#cit small{display:block;font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.16em;color:#666;}
#cit p{margin:16px 0 0;font-size:36px;line-height:1.3;}
#cit p b{font-family:'JetBrains Mono',monospace;}
#cit a{color:#1a55c4;text-decoration:underline;font-weight:600;}
#link{position:absolute;left:0;top:0;width:1080px;height:1920px;}
#jc{position:absolute;left:130px;top:250px;width:820px;height:1180px;border-radius:50px;overflow:hidden;box-shadow:0 0 0 14px #05070a, 0 40px 80px -30px rgba(0,0,0,.6);background:#fff;}
#jc img{width:820px;display:block;}
#proof .tag{position:absolute;left:0;right:0;top:1500px;text-align:center;}
#proof .tag span{display:inline-block;padding:14px 28px;background:${C.grass};color:#fff;font-family:'JetBrains Mono',monospace;font-size:30px;letter-spacing:.1em;border:3px solid #111;box-shadow:6px 6px 0 #111;}
.bot{position:absolute;left:60px;right:60px;top:1640px;text-align:center;font-weight:800;font-size:66px;line-height:1.08;letter-spacing:-1px;}
/* fecho */
#end .l1,#end .l2{position:absolute;left:0;right:0;text-align:center;font-family:${RS};font-size:136px;line-height:1;letter-spacing:-2px;}
#end .l1{top:470px;} #end .l2{top:630px;color:${R.goldBri};}
#end .brand{position:absolute;left:0;right:0;top:950px;display:flex;justify-content:center;align-items:center;gap:22px;font-family:'Newsreader',serif;font-size:74px;}
#end .rep{position:absolute;left:0;right:0;top:1075px;display:flex;justify-content:center;align-items:center;gap:16px;font-family:'JetBrains Mono',monospace;font-size:24px;letter-spacing:.2em;color:${R.gold};}
#end .rep img{height:46px;} #end .rep b{font-family:Arial,sans-serif;font-size:34px;letter-spacing:0;color:${R.ink};}
#end .cta{position:absolute;left:0;right:0;top:1230px;display:flex;justify-content:center;}
#end .cta div{padding:34px 54px;border-radius:999px;background:${R.goldBri};color:${R.bg};text-align:center;font-weight:800;font-size:46px;line-height:1.15;}
#end .cta small{display:block;font-size:30px;font-weight:600;}
#end .url{position:absolute;left:0;right:0;top:1470px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:36px;letter-spacing:.2em;color:${R.ink2};}
`;

const logo = (s) => `<svg width="${s}" height="${s}" viewBox="4 4 54 54"><circle cx="32" cy="32" r="22" fill="#05070a"/><circle cx="28" cy="28" r="22" fill="${C.navy}"/><circle cx="36" cy="20" r="5" fill="${C.butter}"/></svg>`;

const html = `
<div class="sc" id="hook">
  <div id="notif"><i>AO<br>VIVO</i><div><b>URGENTE</b><span>Governo edita MP que proíbe as bets no Brasil</span></div><em>agora</em></div>
  <div id="h1">O assunto explodiu.</div>
  <div id="h2">Você precisa postar.<br><b>E não pode errar.</b></div>
</div>
<div class="sc" id="race">
  <div id="lp"><div class="scr"><div class="bar">${TABS.slice(0, 4).map((t, i) => `<span class="${i === 0 ? 'on' : ''}" id="tb${i}">${t[0]}</span>`).join('')}</div>
    ${TABS.map((t, i) => `<div class="page" id="pg${i}" style="opacity:${i ? 0 : 1}"><b>${t[0]}</b><h3>${t[1]}</h3>${'<p></p>'.repeat(14)}</div>`).join('')}
    <div id="abas">aba <span id="abaN">1</span> de 13</div></div></div>
  <div id="ph"><div class="scr"><video class="clip" id="vid" src="assets/shots/pp-jornada.mp4" muted playsinline data-start="${RS0}" data-duration="${(SEG.at(-1)).toFixed(2)}" data-media-start="0"></video>
    ${TAPS.map((t, i) => `<div class="tap" id="tap${i}" style="left:${Math.round(t[1] * K)}px;top:${Math.round(t[2] * K)}px"></div>`).join('')}</div></div>
  <div class="lab" id="labL">DO JEITO DE SEMPRE</div>
  <div class="lab" id="labR">COM O PAUTA PRONTA</div>
  <div id="step">${STEP.map((s, i) => `<span id="st${i}">${s}</span>`).join('')}</div>
  <div id="pronto"><span>PRONTO · ${mmss(368)}</span></div>
</div>
<div id="plantao"><i>PLANTÃO</i>MP DAS BETS · 27/09</div>
<div id="clock">00:00</div>
<div class="sc" id="res">
  <h2>Carrossel pronto.<br><em>Com fonte.</em></h2>
  <div id="rail">${[1, 2, 3, 4].map((n) => `<img src="assets/shots/slide-${n}.png" alt="Slide ${n}">`).join('')}</div>
  <div class="meta">4 SLIDES · LEGENDA · 13 FONTES · VALIDAÇÃO</div>
</div>
<div class="sc" id="proof">
  <img id="s1" src="assets/shots/slide-1.png" alt="Slide 1">
  <div id="mk"></div>
  <div id="cit"><small>VALIDAÇÃO · CITAÇÕES NA LEGENDA</small><p><b>[8]</b> Não se pode mais colocar dinheiro em sites de apostas no Brasil, diz ministro da Fazenda — <b style="font-family:inherit">Jornal do Commercio</b> (25/09/2026) · <a id="ver">ver matéria</a></p></div>
  <div id="jc"><img src="assets/shots/jc.png" alt="Matéria do Jornal do Commercio"></div>
  <div class="tap" id="tapV" style="left:790px;top:1150px"></div>
  <div class="tag" id="tagP"><span>✓ FATO CONFERIDO NA ORIGEM</span></div>
  <div class="bot" id="botP">Cada fato leva à<br>matéria de origem.</div>
</div>
<div class="sc" id="end">
  <div class="l1">Chegue primeiro.</div>
  <div class="l2">Chegue certo.</div>
  <div class="brand">${logo(84)}<span>Pauta Pronta</span></div>
  <div class="rep">COM A INTELIGÊNCIA DO <img src="assets/rep/crow-creme.png" alt=""><b>REP</b></div>
  <div class="cta"><div>Teste com o assunto de hoje<small>1 pauta grátis · sem cartão</small></div></div>
  <div class="url">pautapronta.com</div>
</div>`;

// cronômetro: segmentos lineares sincronizados com a gravação
const clockJs = SEG.slice(0, -1).map((s, i) => `tl.fromTo(clk, { v: ${CLK[i]} }, { v: ${CLK[i + 1]}, duration: ${(SEG[i + 1] - s).toFixed(2)}, ease: 'none', onUpdate: showClk }, ${(RS0 + s).toFixed(2)});`).join('\n');
const stepJs = STEP.map((_, i) => `tl.set('#st${i}', { opacity: 1 }, ${(RS0 + SEG[i]).toFixed(2)});${i < STEP.length - 1 ? ` tl.set('#st${i}', { opacity: 0 }, ${(RS0 + SEG[i + 1]).toFixed(2)});` : ''}`).join('\n');
const tapJs = TAPS.map((t, i) => `tl.fromTo('#tap${i}', { scale: 0.4, opacity: 0.9 }, { scale: 1.4, opacity: 0, duration: 0.45, ease: 'power2.out', immediateRender: false }, ${(RS0 + t[0]).toFixed(2)});`).join('\n');
// esquerda: abas trocando devagar (o relógio corre, a leitura não)
const tabJs = [1, 2, 3].map((i) => { const t = (RS0 + 1.6 + i * 1.8).toFixed(2); return `tl.set('#pg${i - 1}', { opacity: 0 }, ${t}); tl.set('#pg${i}', { opacity: 1 }, ${t}); tl.set('#tb${i - 1}', { backgroundColor: '#c2c2c2', color: '#555' }, ${t}); tl.set('#tb${i}', { backgroundColor: '#fafafa', color: '#222' }, ${t});`; }).join('\n') + `\ntl.fromTo(aba, { v: 1 }, { v: 4, duration: 5.4, ease: 'steps(3)', onUpdate: () => { abaEl.textContent = Math.round(aba.v); } }, ${(RS0 + 1.6 + 1.8).toFixed(2)} - 0.001 - 1.8);`;

const js = `
const clk = { v: 0 }, clkEl = document.querySelector('#clock'), aba = { v: 1 }, abaEl = document.querySelector('#abaN');
const showClk = () => { const s = Math.floor(clk.v); clkEl.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
// ——— gancho ———
tl.set('#hook', { opacity: 1 }, 0);
tl.fromTo('#notif', { y: -260, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 0.15);
tl.fromTo('#h1', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0.75);
tl.fromTo('#h2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, 1.35);
tl.fromTo(['#plantao', '#clock'], { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.9);
tl.to('#hook', { opacity: 0, duration: 0.2 }, ${RS0 - 0.1});
// ——— corrida ———
tl.set('#race', { opacity: 1 }, ${RS0 - 0.1});
tl.fromTo('#ph', { x: 600 }, { x: 0, duration: 0.4, ease: 'power3.out' }, ${RS0 - 0.1});
tl.fromTo('#lp', { x: -520 }, { x: 0, duration: 0.4, ease: 'power3.out' }, ${RS0 - 0.1});
tl.fromTo('.lab', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${RS0 + 0.2});
${clockJs}
${stepJs}
${tapJs}
${tabJs}
tl.to('#lp .page', { y: -120, duration: ${(WIN - RS0).toFixed(2)}, ease: 'none' }, ${RS0});
// ——— vitória: o relógio trava em dourado ———
tl.to('#clock', { color: '${R.goldBri}', scale: 1.08, duration: 0.12, ease: 'power2.out' }, ${WIN});
tl.to('#clock', { scale: 1, duration: 0.3, ease: 'power2.out' }, ${WIN + 0.12});
tl.to(['#lp', '#labL'], { opacity: 0.25, duration: 0.3 }, ${WIN});
tl.fromTo('#pronto', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, ${WIN + 0.05});
tl.to('#ph', { x: -230, scale: 1.08, duration: 0.6, ease: 'power3.inOut' }, ${WIN + 0.25});
tl.to(['#lp', '#labL', '#labR', '#step'], { opacity: 0, duration: 0.3 }, ${WIN + 0.25});
tl.to('#race', { opacity: 0, duration: 0.25 }, ${RES - 0.2});
tl.to(['#plantao', '#clock'], { opacity: 0, duration: 0.2 }, ${RES - 0.2});
// ——— resultado real ———
tl.set('#res', { opacity: 1 }, ${RES - 0.05});
tl.fromTo('#res h2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, ${RES});
tl.fromTo('#rail', { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }, ${RES});
tl.to('#rail', { x: -860, duration: 0.45, ease: 'power3.inOut' }, ${RES + 1.1});
tl.to('#rail', { x: -1720, duration: 0.45, ease: 'power3.inOut' }, ${RES + 2.0});
tl.fromTo('#res .meta', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${RES + 0.6});
tl.to('#res', { opacity: 0, duration: 0.2 }, ${PROOF - 0.1});
// ——— prova: frase do post -> citação -> matéria real ———
tl.set('#proof', { opacity: 1 }, ${PROOF - 0.1});
tl.fromTo('#s1', { scale: 0.85, y: 200 }, { scale: 1, y: 0, duration: 0.6, ease: 'expo.out' }, ${PROOF});
tl.fromTo('#mk', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, ${PROOF + 0.6});
tl.fromTo('#cit', { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }, ${PROOF + 1.1});
tl.fromTo('#tapV', { scale: 0.4, opacity: 0.9 }, { scale: 1.5, opacity: 0, duration: 0.5, ease: 'power2.out', immediateRender: false }, ${PROOF + 2.1});
tl.fromTo('#jc', { y: 1900 }, { y: 0, duration: 0.6, ease: 'expo.out' }, ${PROOF + 2.3});
tl.to('#jc img', { y: -120, duration: 1.6, ease: 'sine.inOut' }, ${PROOF + 2.9});
tl.fromTo('#tagP', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.5)' }, ${PROOF + 3.0});
tl.fromTo('#botP', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, ${PROOF + 0.9});
tl.to('#proof', { opacity: 0, duration: 0.25 }, ${END - 0.15});
// ——— fecho REP ———
tl.set('#end', { opacity: 1 }, ${END - 0.1});
tl.fromTo('#end .l1', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, ${END + 0.15});
tl.fromTo('#end .l2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, ${END + 0.95});
tl.fromTo(['#end .brand', '#end .rep'], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.15 }, ${END + 1.9});
tl.fromTo('#end .cta div', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, ${END + 2.4});
tl.fromTo('#end .url', { opacity: 0 }, { opacity: 1, duration: 0.3 }, ${END + 2.8});
tl.to('#end .cta div', { scale: 1.05, duration: 0.35, ease: 'sine.inOut', yoyo: true, repeat: 3 }, ${END + 3.2});
`;

fs.mkdirSync(new URL('compositions/', ROOT), { recursive: true });
fs.writeFileSync(new URL('compositions/anuncio.html', ROOT), `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8" /><title>anuncio</title></head><body>
<template>
<style>${css}</style>
<div id="root" data-composition-id="anuncio" data-width="1080" data-height="1920">
${html}
</div>
<script>
(function(){
const tl = gsap.timeline({ paused: true });
${js}
window.__timelines["anuncio"] = tl;
})();
</script>
</template>
</body></html>
`);

// ——— som: tique que acelera, sem música até a vitória ———
const ticks = []; for (let t = RS0 - 0.4, gap = 0.5; t < WIN - 0.05; t += gap, gap = Math.max(0.085, gap * 0.9)) ticks.push(+t.toFixed(2));
const a = (id, src, start, vol, extra = '') => `    <audio id="${id}" src="assets/${src}" data-start="${start}" data-volume="${vol}"${extra}></audio>`;
const audio = [
  a('ping', 'sfx/ping.mp3', 0.15, 0.7),
  a('tension', 'sfx/tension.mp3', 1.9, 0.5, ` data-duration="${(WIN - 1.9).toFixed(2)}" data-fade-in="0.6"`),
  ...ticks.map((t, i) => a(`tk${i}`, 'sfx/tick.mp3', t, (0.35 + 0.35 * i / ticks.length).toFixed(2))),
  ...TAPS.map((t, i) => a(`tp${i}`, 'sfx/click.mp3', (RS0 + t[0]).toFixed(2), 0.3)),
  a('hit', 'sfx/hit.mp3', WIN, 0.9),
  a('win', 'sfx/win.mp3', (WIN + 0.1).toFixed(2), 0.45),
  a('bed', 'sfx/resolve.mp3', (WIN + 0.8).toFixed(2), 0.4, ` data-duration="${(DUR - WIN - 0.8).toFixed(2)}" data-fade-in="1.2" data-fade-out="1.5"`),
  a('w1', 'sfx/whoosh-short.mp3', RES - 0.15, 0.3),
  a('w2', 'sfx/whoosh-short.mp3', PROOF - 0.15, 0.3),
  a('clickV', 'sfx/click.mp3', PROOF + 2.1, 0.45),
  a('w3', 'sfx/whoosh-short.mp3', END - 0.15, 0.3),
  a('vo', 'voice/fecho.mp3', END + 0.15, 1),
].map((l, i) => l.replace('<audio ', `<audio data-track-index="${10 + i}" `)).join('\n');

fs.writeFileSync(new URL('index.html', ROOT), `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>Pauta Pronta — anúncio Primeiro e certo</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>html, body { margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: ${R.bg}; } #stage { position: relative; width: 100%; height: 100%; overflow: hidden; }</style>
  </head>
  <body>
    <div id="stage" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="1080" data-height="1920">
    <div id="slot" data-composition-id="anuncio" data-composition-src="compositions/anuncio.html" data-start="0" data-duration="${DUR}" data-track-index="1" data-width="1080" data-height="1920"></div>
${audio}
    </div>
    <script>const tl = gsap.timeline({ paused: true }); window.__timelines["main"] = tl;</script>
  </body>
</html>
`);
console.log('ok', DUR, 'ticks', ticks.length);
