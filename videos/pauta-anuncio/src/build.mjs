// Anúncio "Primeiro e certo" v3 — plantão contra o relógio (1080×1920, 45 s).
// Tudo o que aparece do produto é real: pauta A2ADDE (MP das bets, 27/09/2026) e regravações das telas.
// Cronômetro = tempo real do caminho limpo: 6 min 08 s (geração 5 min 07 s; a 1ª tentativa de
// pesquisa, que falhou, ficou fora da conta). Toques: posição exata gravada no navegador.
// v3: trechos da jornada em vídeos separados com fundido, telas mais longas, transições entre cenas.
import fs from 'node:fs';
import { C, FONT_FACES } from '../../pauta-explicativo/src/lib.mjs';

const ROOT = new URL('../', import.meta.url);
const R = { bg: '#0b1420', ink: '#f0eadf', ink2: '#aab3bf', gold: '#c6b278', butter: '#e8c873', alarm: '#ff5a4e', navy: '#24456b' };
const RS = "Georgia,'Liberation Serif',serif";

// ——— linha do tempo (s) ———
const CS = 8.2;                 // começa a jornada real
const XF = 0.4;                 // fundido entre trechos da jornada
// trechos gravados: [arquivo, duração]; cada um começa XF antes do fim do anterior
const PIECES = [['jA', 7.0], ['jB', 3.433], ['jC', 7.533], ['jD', 3.633], ['jE', 3.833]];
const PS = []; PIECES.forEach(([, d], i) => PS.push(i ? PS[i - 1] + PIECES[i - 1][1] - XF : 0));
const JD = PS.at(-1) + PIECES.at(-1)[1];
const WINc = PS[4] + XF, WIN = CS + WINc;
const CAR = WIN + 2.0, PROOF = CAR + 4.0, END = PROOF + 5.8, DUR = +(END + 4.6).toFixed(2);
// toques (trecho, tempo no trecho, x/y em px CSS do celular de 360 px) — gravados
const TAPS = [[0, 1.38, 177, 376, 'Toque na bolha'], [0, 3.79, 180, 473, 'Gerar pauta'], [0, 6.0, 247, 592, 'Confirmar'],
  [2, 0.76, 82, 347, 'Jornalístico'], [2, 2.776, 249, 316, 'Carrossel'], [2, 4.8, 127, 330, 'Editorial'], [2, 6.32, 180, 322, 'Gerar minha versão']]
  .map(([p, t, x, y, l]) => [+(PS[p] + t).toFixed(3), x, y, l]);
// cronômetro real: [tempo na jornada, segundos]
const CLK = [[PS[0] + 1.38, 0], [PS[0] + 6.0, 6], [PS[2], 13], [PS[3], 61], [WINc, 368]];
const STEPS = [[0, 'RADAR · EM ALTA AGORA'], [PS[0] + 3.79, 'GERAR PAUTA'], [PS[0] + 6.0, 'COMPLEMENTAR COM O ACERVO REP'], [PS[1], 'PESQUISA NA COBERTURA · 13 FONTES'], [PS[2], 'ÂNGULO · TOM · FORMATO'], [PS[3], 'A REDAÇÃO ESCREVENDO · AO VIVO'], [WINc, 'PRONTO PARA PUBLICAR']];
// narração (arquivo, início no anúncio, legenda)
const VO = [['v1', 0.25, 'O assunto explodiu. Você precisa postar agora… e não pode errar.'], ['v2', 5.2, 'Abrir aba por aba? Não dá tempo.'],
  ['v3', CS + 0.3, 'No Pauta Pronta, você toca no assunto que está em alta no Radar…'], ['v4', CS + PS[1] + 0.2, 'a redação pesquisa a cobertura inteira…'],
  ['v5', CS + PS[2] + 0.3, 'você escolhe o ângulo e o formato…'], ['v6', CS + PS[3] + 0.15, 'e ela escreve por você. Com fonte.'], ['v7', WIN + 0.35, 'Seis minutos. Pronto.'],
  ['v8', PROOF + 0.3, 'E cada fato leva direto à matéria de origem.'], ['v9', END + 0.4, 'Pauta Pronta. Chegue primeiro. Chegue certo.']];
const VLEN = Object.fromEntries(VO.map(([k]) => [k, +fs.readFileSync(new URL(`assets/voice/${k}-t.dur`, ROOT), 'utf8')]));

// ——— celular grande ———
const PH = { w: 700, pad: 12, top: 330 }; PH.left = (1080 - PH.w) / 2;
const VW = PH.w - 2 * PH.pad, VH = Math.round(VW * 2340 / 1080), K = VW / 360;
const pt = (x, y) => [PH.left + PH.pad + x * K, PH.top + PH.pad + y * K];   // ponto na tela
const ZOOM = 1.55, FOCUS = [540, 980];
const TABS = [['Agência Brasil', 'Bets que continuarem no ar após prazo serão bloqueadas'], ['Folha de S.Paulo', 'Governo precisará compensar perda de R$ 6,8 bi em receitas com bets'],
  ['O Globo', 'Fazenda estima R$ 1,7 bilhão depositado nas bets'], ['Poder360', 'Entenda o plano de Lula que proíbe bets e lança Desenrola 3.0'],
  ['Metrópoles', 'Além das bets, jogos como o "Jogo do Tigrinho" estão proibidos'], ['Sul21', 'MP proíbe bets e determina devolução de saldo ao apostador']];

const css = `${FONT_FACES}
#root{position:absolute;inset:0;overflow:hidden;background:radial-gradient(120% 80% at 50% 45%, #1b3150 0%, #0e1a2b 55%, ${R.bg} 100%);color:${R.ink};font-family:'Bricolage Grotesque',sans-serif;}
.sc{position:absolute;inset:0;opacity:0;}
#glowR{position:absolute;inset:0;background:radial-gradient(60% 40% at 50% 38%, rgba(255,90,78,.28), rgba(255,90,78,0) 70%);opacity:0;}
/* gancho */
#notif{position:absolute;left:54px;right:54px;top:130px;padding:28px 32px;border-radius:36px;background:rgba(245,242,236,.96);color:#111;display:flex;gap:24px;box-shadow:0 30px 70px -20px rgba(0,0,0,.7);}
#notif i{flex:none;width:88px;height:88px;border-radius:22px;background:${R.alarm};color:#fff;font-style:normal;display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:22px;line-height:1.1;text-align:center;}
#notif b{display:block;font-size:30px;letter-spacing:.08em;color:${R.alarm};}
#notif span{display:block;margin-top:6px;font-size:40px;line-height:1.16;font-weight:700;}
#notif em{position:absolute;right:34px;top:28px;font-style:normal;font-size:26px;color:#777;}
#h1{position:absolute;left:66px;right:66px;top:640px;font-weight:800;font-size:132px;line-height:.98;letter-spacing:-3px;}
#h1 span{display:inline-block;}
#h2{position:absolute;left:66px;right:66px;top:1000px;font-weight:800;font-size:78px;line-height:1.06;letter-spacing:-1px;color:${R.ink2};}
#h2 b{color:${R.butter};}
/* jeito de sempre */
.tab{position:absolute;left:90px;width:900px;box-sizing:border-box;padding:28px 32px;border-radius:26px;background:#e6e6e6;color:#222;filter:grayscale(1);box-shadow:0 20px 40px -20px rgba(0,0,0,.6);}
.tab small{display:block;font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.12em;text-transform:uppercase;color:#666;}
.tab b{display:block;margin-top:8px;font-family:${RS};font-weight:400;font-size:42px;line-height:1.12;}
#aba{position:absolute;left:0;right:0;top:1420px;text-align:center;font-weight:800;font-size:120px;letter-spacing:-3px;}
#strike{position:absolute;left:170px;top:1500px;width:740px;height:14px;background:${R.alarm};transform-origin:0 50%;}
#nodt{position:absolute;left:0;right:0;top:1580px;text-align:center;font-weight:800;font-size:74px;color:${R.alarm};}
/* HUD */
#hud{position:absolute;left:0;right:0;top:0;height:330px;z-index:8;opacity:0;background:linear-gradient(${R.bg} 0%, rgba(11,20,32,.92) 70%, rgba(11,20,32,0) 100%);}
#rec{position:absolute;left:0;right:0;top:54px;display:flex;justify-content:center;gap:14px;align-items:center;font-family:'JetBrains Mono',monospace;font-size:26px;letter-spacing:.2em;color:${R.ink2};}
#rec i{width:18px;height:18px;border-radius:50%;background:${R.alarm};box-shadow:0 0 16px ${R.alarm};}
#clock{position:absolute;left:0;right:0;top:86px;text-align:center;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:150px;line-height:1.05;letter-spacing:-4px;color:#fff;text-shadow:0 0 40px rgba(255,90,78,.45);}
#step{position:absolute;left:40px;right:40px;top:262px;height:40px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:30px;letter-spacing:.14em;color:${R.butter};}
#step span{position:absolute;left:0;right:0;opacity:0;}
/* câmera + celular */
#cam{position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:0 0;}
#halo{position:absolute;left:${PH.left - 160}px;top:${PH.top + 120}px;width:${PH.w + 320}px;height:${VH - 100}px;border-radius:50%;background:radial-gradient(closest-side, rgba(232,200,115,.30), rgba(232,200,115,0));}
#ph{position:absolute;left:${PH.left}px;top:${PH.top}px;width:${PH.w}px;height:${VH + 2 * PH.pad}px;box-sizing:border-box;padding:${PH.pad}px;border-radius:78px;background:#05070a;box-shadow:0 0 0 3px #3a4a5e, 0 50px 90px -30px #000;}
#ph .scr{position:relative;width:${VW}px;height:${VH}px;border-radius:66px;overflow:hidden;background:#f7f3ec;}
#ph video{position:absolute;left:0;top:0;width:${VW}px;height:${VH}px;opacity:0;}
.touch{position:absolute;width:86px;height:86px;margin:-43px 0 0 -43px;border-radius:50%;background:rgba(255,255,255,.55);border:4px solid #fff;box-shadow:0 6px 18px rgba(0,0,0,.35);opacity:0;z-index:5;}
.rip{position:absolute;width:86px;height:86px;margin:-43px 0 0 -43px;border-radius:50%;border:6px solid ${R.butter};opacity:0;z-index:5;}
.tlab{position:absolute;padding:10px 20px;border-radius:999px;background:${R.butter};color:#111;font-weight:800;font-size:30px;white-space:nowrap;opacity:0;z-index:6;box-shadow:0 8px 20px rgba(0,0,0,.35);}
#flash{position:absolute;inset:0;background:#fff;opacity:0;z-index:9;}
#stamp{position:absolute;left:0;right:0;top:1640px;text-align:center;opacity:0;z-index:7;}
#stamp span{display:inline-block;padding:18px 40px;border-radius:999px;background:${R.gold};color:${R.bg};font-family:'JetBrains Mono',monospace;font-weight:600;font-size:44px;letter-spacing:.12em;box-shadow:0 0 50px rgba(198,178,120,.6);}
/* legenda da narração */
#subsbg{position:absolute;left:0;right:0;top:1770px;bottom:0;z-index:7;background:linear-gradient(rgba(11,20,32,0), rgba(11,20,32,.85) 45%);}
#subs{position:absolute;left:60px;right:60px;top:1838px;height:60px;z-index:8;}
#subs div{position:absolute;left:0;right:0;text-align:center;font-weight:700;font-size:34px;line-height:1.15;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.8);opacity:0;}
/* resultado */
#res{background:linear-gradient(#f6f1e8,#ece4d6);color:#111;}
#res h2,#proof h2{position:absolute;left:70px;right:70px;top:110px;margin:0;font-weight:800;font-size:80px;line-height:1.02;letter-spacing:-2px;}
#res h2 em{font-style:normal;color:${C.navy};}
#fan{position:absolute;left:0;top:420px;width:1080px;height:1200px;}
#fan img{position:absolute;left:180px;top:0;width:720px;height:900px;border-radius:14px;box-shadow:0 40px 70px -30px rgba(0,0,0,.55);transform-origin:50% 100%;}
#res .meta{position:absolute;left:0;right:0;top:1480px;display:flex;justify-content:center;gap:14px;}
#res .meta span{padding:12px 22px;border-radius:999px;background:#111;color:#fff;font-family:'JetBrains Mono',monospace;font-size:24px;letter-spacing:.08em;}
/* prova */
#proof{background:linear-gradient(#f6f1e8,#ece4d6);color:#111;}
#s1{position:absolute;left:40px;top:-230px;width:1000px;border-radius:12px;box-shadow:0 30px 60px -30px rgba(0,0,0,.4);}
#mk{position:absolute;left:112px;top:690px;width:610px;height:50px;background:rgba(232,200,115,.7);mix-blend-mode:multiply;transform-origin:0 50%;}
#cit{position:absolute;left:50px;right:50px;top:900px;padding:34px 36px;background:#fffdf8;border:2px solid #111;border-radius:22px;box-shadow:10px 10px 0 #111;}
#cit small{display:block;font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.16em;color:#666;}
#cit p{margin:16px 0 0;font-size:36px;line-height:1.3;}
#cit a{color:#1a55c4;text-decoration:underline;font-weight:700;}
#jc{position:absolute;left:130px;top:250px;width:820px;height:1180px;border-radius:50px;overflow:hidden;box-shadow:0 0 0 14px #05070a, 0 40px 80px -30px rgba(0,0,0,.6);background:#fff;}
#jc img{width:820px;display:block;}
#tapV{left:790px;top:1150px;}
#proof .tag{position:absolute;left:0;right:0;top:1480px;text-align:center;}
#proof .tag span{display:inline-block;padding:16px 30px;border-radius:999px;background:#3f7a3a;color:#fff;font-family:'JetBrains Mono',monospace;font-size:30px;letter-spacing:.1em;box-shadow:0 10px 30px rgba(63,122,58,.45);}
.bot{position:absolute;left:60px;right:60px;top:1600px;text-align:center;font-weight:800;font-size:68px;line-height:1.06;letter-spacing:-1px;}
/* fecho */
#end{background:radial-gradient(100% 70% at 50% 40%, #16263a, ${R.bg});}
#end .l1,#end .l2{position:absolute;left:0;right:0;text-align:center;font-family:${RS};font-size:136px;line-height:1;letter-spacing:-2px;}
#end .l1{top:440px;} #end .l2{top:600px;color:${R.gold};}
#end .rule{position:absolute;left:340px;right:340px;top:790px;height:3px;background:${R.gold};transform-origin:50% 50%;}
#end .brand{position:absolute;left:0;right:0;top:900px;display:flex;justify-content:center;align-items:center;gap:22px;font-family:'Newsreader',serif;font-size:78px;}
#end .rep{position:absolute;left:0;right:0;top:1030px;display:flex;justify-content:center;align-items:center;gap:16px;font-family:'JetBrains Mono',monospace;font-size:24px;letter-spacing:.2em;color:${R.gold};}
#end .rep img{height:46px;} #end .rep b{font-family:Arial,sans-serif;font-size:34px;letter-spacing:0;color:${R.ink};}
#end .cta{position:absolute;left:0;right:0;top:1200px;display:flex;justify-content:center;}
#end .cta div{padding:36px 58px;border-radius:999px;background:linear-gradient(${R.butter},${R.gold});color:${R.bg};text-align:center;font-weight:800;font-size:48px;line-height:1.15;box-shadow:0 20px 60px -10px rgba(232,200,115,.45);}
#end .cta small{display:block;font-size:30px;font-weight:600;}
#end .url{position:absolute;left:0;right:0;top:1450px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:36px;letter-spacing:.2em;color:${R.ink2};}
`;

const logo = (s) => `<svg width="${s}" height="${s}" viewBox="4 4 54 54"><circle cx="32" cy="32" r="22" fill="#05070a"/><circle cx="28" cy="28" r="22" fill="${C.navy}"/><circle cx="36" cy="20" r="5" fill="${C.butter}"/></svg>`;
const tapEls = TAPS.map((t, i) => { const [x, y] = pt(t[1], t[2]); return `<div class="rip" id="rp${i}" style="left:${x}px;top:${y}px"></div><div class="touch" id="tc${i}" style="left:${x}px;top:${y}px"></div><div class="tlab" id="tl${i}" style="left:${x}px;top:${y - 150}px;transform:translateX(-50%)">${t[3]}</div>`; }).join('');

const html = `
<div id="glowR"></div>
<div class="sc" id="hook">
  <div id="notif"><i>AO<br>VIVO</i><div><b>URGENTE</b><span>Governo edita MP que proíbe as bets no Brasil</span></div><em>agora</em></div>
  <div id="h1">${'O assunto explodiu.'.split(' ').map((w) => `<span>${w}</span>`).join(' ')}</div>
  <div id="h2">Você precisa postar.<br><b>E não pode errar.</b></div>
</div>
<div class="sc" id="old">
  ${TABS.map((t, i) => `<div class="tab" id="tab${i}" style="top:${120 + i * 190}px;transform:rotate(${[-2, 1.5, -1, 2, -1.5, 1][i]}deg)"><small>${t[0]}</small><b>${t[1]}</b></div>`).join('')}
  <div id="aba">Aba por aba?</div><div id="strike"></div><div id="nodt">Não dá tempo.</div>
</div>
<div class="sc" id="journey">
  <div id="cam"><div id="halo"></div>
    <div id="ph"><div class="scr"><img src="assets/shots/jA0.jpg" alt="" style="position:absolute;left:0;top:0;width:${VW}px;height:${VH}px;">${PIECES.map(([n, d], i) => `<video class="clip" id="${n}" src="assets/shots/${n}.mp4" muted playsinline data-start="${(CS + PS[i]).toFixed(3)}" data-duration="${d}" data-media-start="0"></video>`).join('')}</div></div>
    ${tapEls}
  </div>
  <div id="stamp"><span>PRONTO EM 06:08</span></div>
</div>
<div id="hud"><div id="rec"><i></i>PLANTÃO · MP DAS BETS</div><div id="clock">00:00</div><div id="step">${STEPS.map((s, i) => `<span id="st${i}">${s[1]}</span>`).join('')}</div></div>
<div class="sc" id="res">
  <h2>Carrossel pronto.<br><em>Com fonte.</em></h2>
  <div id="fan">${[4, 3, 2, 1].map((n) => `<img id="sl${n}" src="assets/shots/slide-${n}.png" alt="Slide ${n}">`).join('')}</div>
  <div class="meta"><span>4 SLIDES</span><span>LEGENDA</span><span>13 FONTES</span><span>VALIDAÇÃO</span></div>
</div>
<div class="sc" id="proof">
  <img id="s1" src="assets/shots/slide-1.png" alt="Slide 1">
  <div id="mk"></div>
  <div id="cit"><small>VALIDAÇÃO · CITAÇÕES NA LEGENDA</small><p><b style="font-family:'JetBrains Mono',monospace">[8]</b> Não se pode mais colocar dinheiro em sites de apostas no Brasil, diz ministro da Fazenda — <b>Jornal do Commercio</b> (25/09/2026) · <a>ver matéria</a></p></div>
  <div id="jc"><img src="assets/shots/jc.png" alt="Matéria do Jornal do Commercio"></div>
  <div class="rip" id="rpV" style="left:790px;top:1150px"></div><div class="touch" id="tcV" style="left:790px;top:1150px"></div>
  <div class="tag" id="tagP"><span>✓ FATO CONFERIDO NA ORIGEM</span></div>
  <div class="bot" id="botP">Cada fato leva à<br>matéria de origem.</div>
</div>
<div class="sc" id="end">
  <div class="l1">Chegue primeiro.</div><div class="l2">Chegue certo.</div><div class="rule"></div>
  <div class="brand">${logo(88)}<span>Pauta Pronta</span></div>
  <div class="rep">COM A INTELIGÊNCIA DO <img src="assets/rep/crow-creme.png" alt=""><b>REP</b></div>
  <div class="cta"><div>Teste com o assunto de hoje<small>1 pauta grátis · sem cartão</small></div></div>
  <div class="url">pautapronta.com</div>
</div>
<div id="subsbg"></div><div id="subs">${VO.map(([k, , s]) => `<div id="sub-${k}">${s}</div>`).join('')}</div>
<div id="flash"></div>`;

// câmera: aproxima em cada toque; toques próximos (<1,9 s) passam direto de um ao outro
const camTo = (x, y, s) => ({ x: +(FOCUS[0] - x * s).toFixed(1), y: +(FOCUS[1] - y * s).toFixed(1), scale: s });
let camJs = '';
TAPS.forEach((t, i) => {
  const T = CS + t[0], [x, y] = pt(t[1], t[2]), c = camTo(x, y, ZOOM), prev = TAPS[i - 1], next = TAPS[i + 1];
  const from = prev && t[0] - prev[0] < 2.4 ? 0.7 : 0.85;
  camJs += `tl.to('#cam', { x: ${c.x}, y: ${c.y}, scale: ${c.scale}, duration: ${from}, ease: 'power2.inOut' }, ${(T - from - 0.05).toFixed(2)});\n`;
  if (!next || next[0] - t[0] >= 2.4) camJs += `tl.to('#cam', { x: 0, y: 0, scale: 1, duration: 0.85, ease: 'power2.inOut' }, ${(T + 1.0).toFixed(2)});\n`;
  camJs += `tl.fromTo('#tc${i}', { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out', immediateRender: false }, ${(T - 0.3).toFixed(2)});
tl.to('#tc${i}', { scale: 0.78, duration: 0.08, yoyo: true, repeat: 1 }, ${T.toFixed(2)});
tl.to('#tc${i}', { opacity: 0, duration: 0.2 }, ${(T + 0.25).toFixed(2)});
tl.fromTo('#rp${i}', { opacity: 1, scale: 0.6 }, { opacity: 0, scale: 2.6, duration: 0.55, ease: 'power2.out', immediateRender: false }, ${T.toFixed(2)});
tl.fromTo('#tl${i}', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.2, immediateRender: false }, ${(T - 0.28).toFixed(2)});
tl.to('#tl${i}', { opacity: 0, duration: 0.15 }, ${(T + 0.3).toFixed(2)});\n`;
});
const clkJs = `tl.fromTo(prog, { t: 0 }, { t: ${JD}, duration: ${JD}, ease: 'none', onUpdate: showClk, immediateRender: false }, ${CS});`;
const stepJs = STEPS.map(([t], i) => `tl.set('#st${i}', { opacity: 1 }, ${(CS + t).toFixed(2)});${STEPS[i + 1] ? ` tl.set('#st${i}', { opacity: 0 }, ${(CS + STEPS[i + 1][0]).toFixed(2)});` : ''}`).join('\n');
const subJs = VO.map(([k, t], i) => { const e = VO[i + 1] ? Math.min(t + VLEN[k] + 0.35, VO[i + 1][1] - 0.05) : t + VLEN[k] + 0.6; return `tl.fromTo('#sub-${k}', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.2, immediateRender: false }, ${t.toFixed(2)}); tl.to('#sub-${k}', { opacity: 0, duration: 0.15 }, ${e.toFixed(2)});`; }).join('\n');

const js = `
const prog = { t: 0 }, clkEl = document.querySelector('#clock'), CK = ${JSON.stringify(CLK)};
const showClk = () => { const t = prog.t; let v = 0;
  for (let i = 0; i < CK.length - 1; i++) { const [a, va] = CK[i], [b, vb] = CK[i + 1]; if (t >= a && t <= b) { let k = (t - a) / (b - a); if (i === CK.length - 2) k = k * k; v = va + (vb - va) * k; } }
  if (t > CK[CK.length - 1][0]) v = CK[CK.length - 1][1];
  const s = Math.floor(v); clkEl.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
// ——— gancho ———
tl.set('#hook', { opacity: 1 }, 0);
tl.fromTo('#notif', { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' }, 0.1);
tl.fromTo('#glowR', { opacity: 0 }, { opacity: 1, duration: 0.45, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 0.1);
tl.fromTo('#h1 span', { y: 120, opacity: 0, rotation: 3 }, { y: 0, opacity: 1, rotation: 0, duration: 0.5, ease: 'power3.out', stagger: 0.25 }, 0.6);
tl.fromTo('#h2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 2.3);
tl.to('#notif', { y: -40, opacity: 0.5, duration: 1.5, ease: 'sine.inOut' }, 3.0);
tl.to('#hook', { opacity: 0, scale: 1.05, duration: 0.6, ease: 'power2.inOut' }, 4.6);
// ——— jeito de sempre (entra em fundido sobre o gancho) ———
tl.fromTo('#old', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 4.8);
tl.fromTo('.tab', { y: -700, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.2 }, 4.9);
tl.fromTo('#aba', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.8)' }, 5.6);
tl.fromTo('#strike', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, 6.75);
tl.fromTo('#nodt', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 6.85);
tl.to('.tab', { x: (i) => (i % 2 ? 1200 : -1200), rotation: (i) => (i % 2 ? 10 : -10), duration: 0.7, ease: 'power2.in', stagger: 0.04 }, ${CS - 0.9});
tl.to('#old', { opacity: 0, duration: 0.5, ease: 'power1.in' }, ${CS - 0.5});
// ——— jornada real: celular sobe enquanto a cena anterior se desfaz ———
tl.fromTo('#journey', { opacity: 0 }, { opacity: 1, duration: 0.4 }, ${CS - 0.6});
tl.fromTo('#ph', { y: 1000, rotation: 5 }, { y: 0, rotation: 0, duration: 1.0, ease: 'power3.out' }, ${CS - 0.6});
tl.fromTo('#halo', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, ${CS - 0.3});
tl.fromTo('#hud', { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, ${CS - 0.3});
tl.to('#rec i', { opacity: 0.25, duration: 0.5, yoyo: true, repeat: ${Math.floor((WIN - CS) / 0.5)}, ease: 'sine.inOut' }, ${CS});
// trechos da jornada: cada um entra em fundido sobre o anterior
${PIECES.map(([n], i) => i ? `tl.fromTo('#${n}', { opacity: 0 }, { opacity: 1, duration: ${XF}, ease: 'power1.inOut', immediateRender: false }, ${(CS + PS[i]).toFixed(3)});` : `tl.set('#${n}', { opacity: 1 }, ${CS - 0.6});`).join('\n')}
${camJs}
${clkJs}
${stepJs}
// geração acelerada: câmera recua devagar enquanto o relógio dispara
tl.to('#cam', { scale: 0.94, x: 32, y: 40, duration: ${(WINc - PS[3]).toFixed(2)}, ease: 'sine.inOut' }, ${(CS + PS[3]).toFixed(2)});
// ——— vitória ———
tl.fromTo('#flash', { opacity: 0.55 }, { opacity: 0, duration: 0.6, immediateRender: false }, ${WIN});
tl.to('#clock', { color: '${R.gold}', textShadow: '0 0 50px rgba(198,178,120,.8)', scale: 1.1, duration: 0.25, ease: 'power2.out' }, ${WIN});
tl.to('#clock', { scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, ${WIN + 0.25});
tl.to('#rec i', { background: '${R.gold}', boxShadow: '0 0 16px ${R.gold}', opacity: 1, duration: 0.2 }, ${WIN});
tl.to('#cam', { scale: 1, x: 0, y: -40, duration: 0.8, ease: 'power3.out' }, ${WIN});
tl.to('#halo', { scale: 1.3, opacity: 1, duration: 0.9 }, ${WIN});
tl.fromTo('#stamp', { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.8)' }, ${WIN + 0.2});
// transição: a câmera mergulha na tela do celular e o carrossel aparece
tl.to('#cam', { scale: 2.1, x: -600, y: -1150, duration: 0.9, ease: 'power2.in' }, ${CAR - 0.8});
tl.to(['#hud', '#stamp'], { opacity: 0, duration: 0.4 }, ${CAR - 0.8});
tl.to('#journey', { opacity: 0, duration: 0.45, ease: 'power1.in' }, ${CAR - 0.35});
// ——— carrossel real em leque ———
tl.fromTo('#res', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' }, ${CAR - 0.3});
tl.fromTo('#res h2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, ${CAR});
${[1, 2, 3, 4].map((n, i) => `tl.fromTo('#sl${n}', { y: 900, rotation: 0 }, { y: ${i * 12}, x: ${[0, 150, 290, 420][i]}, rotation: ${[0, 6, 12, 18][i]}, scale: ${[1, 0.94, 0.88, 0.82][i]}, duration: 0.8, ease: 'power3.out' }, ${(CAR - 0.1 + i * 0.14).toFixed(2)});`).join('\n')}
tl.to('#sl1', { x: -420, rotation: -14, scale: 0.86, duration: 0.7, ease: 'power2.inOut' }, ${CAR + 1.5});
tl.to('#sl2', { x: 0, rotation: 0, scale: 1, duration: 0.7, ease: 'power2.inOut' }, ${CAR + 1.5});
tl.to('#sl2', { x: -420, rotation: -14, scale: 0.86, duration: 0.7, ease: 'power2.inOut' }, ${CAR + 2.8});
tl.to('#sl3', { x: 0, rotation: 0, scale: 1, duration: 0.7, ease: 'power2.inOut' }, ${CAR + 2.8});
tl.fromTo('#res .meta span', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.1 }, ${CAR + 0.8});
tl.to('#res', { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, ${PROOF - 0.35});
// ——— prova ———
tl.fromTo('#proof', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, ${PROOF - 0.35});
tl.fromTo('#s1', { scale: 0.88, y: 160 }, { scale: 1, y: 0, duration: 0.9, ease: 'power3.out' }, ${PROOF - 0.3});
tl.fromTo('#mk', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, ${PROOF + 0.8});
tl.fromTo('#botP', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, ${PROOF + 1.0});
tl.fromTo('#cit', { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, ${PROOF + 1.5});
tl.fromTo('#tcV', { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.35, immediateRender: false }, ${PROOF + 2.4});
tl.to('#tcV', { scale: 0.78, duration: 0.1, yoyo: true, repeat: 1 }, ${PROOF + 2.8});
tl.to('#tcV', { opacity: 0, duration: 0.3 }, ${PROOF + 3.1});
tl.fromTo('#rpV', { opacity: 1, scale: 0.6 }, { opacity: 0, scale: 2.6, duration: 0.7, immediateRender: false }, ${PROOF + 2.8});
tl.fromTo('#jc', { y: 1900 }, { y: 0, duration: 0.9, ease: 'power3.out' }, ${PROOF + 3.0});
tl.to('#jc img', { y: -120, duration: 2.2, ease: 'sine.inOut' }, ${PROOF + 3.7});
tl.fromTo('#tagP', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, ${PROOF + 3.9});
tl.to('#proof', { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, ${END - 0.45});
// ——— fecho ———
tl.fromTo('#end', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, ${END - 0.35});
tl.fromTo(['#end .brand', '#end .rep'], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.2 }, ${END + 0.3});
tl.fromTo('#end .l1', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, ${END + 1.4});
tl.fromTo('#end .l2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, ${END + 2.1});
tl.fromTo('#end .rule', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, ${END + 2.4});
tl.fromTo('#end .cta div', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' }, ${END + 2.9});
tl.fromTo('#end .url', { opacity: 0 }, { opacity: 1, duration: 0.5 }, ${END + 3.3});
tl.to('#end .cta div', { scale: 1.04, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: 1 }, ${END + 3.6});
${subJs}
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

// ——— som: música de tensão até a vitória, virada confiante depois; narração por cima ———
const a = (id, src, start, vol, extra = '') => `    <audio id="${id}" src="assets/${src}" data-start="${(+start).toFixed(2)}" data-volume="${vol}"${extra}></audio>`;
const audio = [
  a('ping', 'sfx/ping.mp3', 0.1, 0.8),
  a('mus1', 'sfx/tension2.mp3', 0, 0.42, ` data-duration="${(WIN + 0.05).toFixed(2)}" data-fade-in="0.4" data-fade-out="0.5"`),
  a('mus2', 'sfx/resolve2.mp3', WIN - 0.05, 0.5, ` data-duration="${(DUR - WIN + 0.05).toFixed(2)}" data-fade-out="1.6"`),
  a('hit', 'sfx/hit.mp3', WIN, 0.85),
  a('win', 'sfx/win.mp3', WIN + 0.1, 0.35),
  ...TAPS.map((t, i) => a(`tp${i}`, 'sfx/click.mp3', CS + t[0], 0.45)),
  a('tpV', 'sfx/click.mp3', PROOF + 2.8, 0.45),
  a('w0', 'sfx/whoosh-short.mp3', CS - 0.7, 0.35),
  a('w1', 'sfx/whoosh-short.mp3', CAR - 0.8, 0.3),
  a('w2', 'sfx/whoosh-short.mp3', PROOF - 0.15, 0.3),
  a('w3', 'sfx/whoosh-short.mp3', END - 0.15, 0.3),
  ...VO.map(([k, t]) => a(`vo-${k}`, `voice/${k}-t.mp3`, t, 1)),
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
console.log('ok', { DUR, WIN: WIN.toFixed(2), CAR: CAR.toFixed(2), PROOF: PROOF.toFixed(2), END: END.toFixed(2) });
