// Artboards de apresentação no Claude Design: vídeo, plano das cenas e elenco.
// Uso: node src/canvas-boards.mjs <pasta-destino> <blob-id-do-video>
import fs from 'node:fs';
import { C, peep } from './lib.mjs';

const [outDir, videoBlob] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&amp;family=Caveat:wght@400..700&amp;family=JetBrains+Mono:wght@400;500&amp;family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&amp;display=swap';
const MONO = "font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .16em;";
const SERIF = 'font-family: Newsreader, serif;';
const page = (title, body, extraCss = '') => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${title}</title>
<script src="../support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="${FONTS}">
<style>body{margin:0;font-family:'Bricolage Grotesque',sans-serif;color:${C.ink};background:${C.paper}}${extraCss}</style>
</helmet>
${body}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1920,"height":1080}}'>
class Component extends DCLogic { renderVals() { return {}; } }
</script>
</body>
</html>
`;

// 1) Vídeo (render HyperFrames com som)
fs.writeFileSync(`${outDir}/filme.dc.html`, page('Cena 1 — vídeo com som', `<div style="position: relative; width: 1920px; height: 1080px; overflow: hidden; background: ${C.ink};">
<video src="/_blob/${videoBlob}" controls playsinline loop preload="auto" style="display: block; width: 1920px; height: 1080px; background: ${C.ink};"></video>
</div>`));

// 2) Plano das 11 cenas
const ROWS = [
  ['01', 'Mil manchetes', '0:00', 'Grade infinita de manchetes reais; Ana aflita no computador. “Mil manchetes. Mil versões. Qual vira o seu post?”', 'A dor: excesso e versões que se contradizem.'],
  ['02', 'A promessa', '0:08', 'Faixas nas cores da marca revelam o logo. “Pesquisa, analisa e entrega o post pronto. Com fonte.”', 'O valor aparece já na 2ª cena.'],
  ['03', 'Você traz o tema', '0:14', 'Caixa /criar grande; “Canetas emagrecedoras” digitado letra a letra; clique.', 'Começar é simples.'],
  ['04', 'O editor pergunta', '0:20', 'Conversa real: o editor pergunta o recorte; Ana escolhe “Preços e acesso”.', 'Não é gerador genérico: é editorial.'],
  ['05', 'A redação lê', '0:29', 'O Leitor + 200 matérias em grade; a varredura carimba 17; 13 fontes; nomes dos veículos.', 'Prova da pesquisa, com números reais.'],
  ['06', 'Análise', '0:41', 'Trechos voam para Fato, Contexto e Divergência; DCM × A Tarde em choque.', 'Prova da análise.'],
  ['07', 'Ângulos', '0:52', 'Três ângulos com nº de matérias; o recomendado sobe; você escolhe.', 'O controle editorial é seu.'],
  ['08', 'Do seu jeito', '1:00', 'Carrossel · Ilustração · Explicador ligados por linhas até o celular.', 'Sai no formato do seu canal.'],
  ['09', 'Pronto p/ revisar', '1:06', 'Celular monta 0→100%; slides reais deslizam; legenda se escreve.', 'Entrega concreta.'],
  ['10', 'Com fonte', '1:16', 'Documento de validação: [2] [5] [3] ligados às matérias; Ana confere com café.', 'Confiança: cada fato com origem.'],
  ['11', 'Convite', '1:26', '“Seu próximo post nasce da cobertura real.” + logo + Teste grátis.', 'Ação.'],
];
const rows = ROWS.map(([n, t, tm, what, why], i) => `<div style="display: grid; grid-template-columns: 70px 290px 90px minmax(0, 1fr) 390px; gap: 24px; align-items: center; padding: 13px 0; border-top: ${i ? '1px' : '2px'} solid ${i ? C.rule : C.ink};${n === '01' ? ` background: ${C.butter};` : ''}">
<span style="${MONO} font-size: 18px; color: ${C.navy}; padding-left: 12px;">${n}</span>
<span style="${SERIF} font-size: 30px; line-height: 1.1;">${t}</span>
<span style="${MONO} font-size: 16px; color: ${C.mute};">${tm}</span>
<span style="font-size: 20px; line-height: 1.35; color: ${C.inkSoft};">${what}</span>
<span style="${SERIF} font-style: italic; font-size: 22px; line-height: 1.25; color: ${C.navy};">${why}</span>
</div>`).join('\n');
fs.writeFileSync(`${outDir}/plano.dc.html`, page('Plano do vídeo explicativo', `<div style="position: relative; width: 1920px; height: 1080px; overflow: hidden; box-sizing: border-box; padding: 56px 88px; background: ${C.paper};">
<div style="display: flex; justify-content: space-between; align-items: flex-end;">
<div><div style="${MONO} font-size: 18px; color: ${C.navy};">Vídeo explicativo · 1920×1080 · ~94s · 11 cenas</div>
<div style="${SERIF} font-size: 58px; letter-spacing: -1px; margin-top: 8px;">Da cobertura real <span style="font-style: italic; color: ${C.navy};">ao post pronto, com fonte.</span></div></div>
<div style="${MONO} font-size: 15px; color: ${C.mute}; text-align: right; line-height: 1.7;">Cena 01 pronta (faixa amarela)<br>Resto: aguardando sua aprovação</div>
</div>
<div style="margin-top: 30px;">${rows}</div>
<div style="position: absolute; left: 88px; bottom: 52px; ${MONO} font-size: 15px; color: ${C.mute};">Motor: HyperFrames (HTML + GSAP) · cada cena também roda ao vivo aqui no Claude Design · som: efeitos · música: pendente</div>
</div>`));

// 3) Elenco
const CAST = [
  ['ana_computer', 'Ana', 'Social media. Fio condutor: começa aflita, termina tranquila.', C.butter],
  ['leitor', 'O Leitor', 'A pesquisa: lê a cobertura real, matéria por matéria.', C.cream],
  ['analista', 'A Analista', 'A análise: separa fato, contexto e divergência.', C.butter],
  ['editor', 'O Editor', 'Pergunta o recorte que importa pra você.', C.cream],
  ['ana_coffee', 'Ana, no fim', 'Confere o documento de validação e publica.', C.butter],
];
const cast = CAST.map(([p, name, role, bg], i) => `<div style="display: flex; flex-direction: column; align-items: center; gap: 18px; width: 330px;">
<div style="position: relative; width: 330px; height: 470px;">
<div style="position: absolute; left: 25px; top: 100px; width: 280px; height: 280px; border-radius: 50%; background: ${bg}; border: 3px solid ${C.ink}; box-shadow: 8px 8px 0 ${C.ink};"></div>
<div style="position: absolute; left: -10px; right: -10px; bottom: 30px; height: 390px; display: flex; justify-content: center;">${peep(p, `cast-${i}`).replace('<svg', '<svg style="height: 390px; width: auto; display: block;"')}</div>
</div>
<div style="${SERIF} font-size: 40px;">${name}</div>
<div style="font-size: 21px; line-height: 1.35; text-align: center; color: ${C.inkSoft};">${role}</div>
</div>`).join('\n');
fs.writeFileSync(`${outDir}/elenco.dc.html`, page('Elenco de personagens', `<div style="position: relative; width: 1920px; height: 1080px; overflow: hidden; box-sizing: border-box; padding: 64px 88px; background: ${C.paper};">
<div style="${MONO} font-size: 18px; color: ${C.navy};">Personagens · Open Peeps (desenho à mão, uso livre) nas cores da marca</div>
<div style="${SERIF} font-size: 58px; letter-spacing: -1px; margin-top: 8px;">A redação do Pauta, <span style="font-style: italic; color: ${C.navy};">em pessoas.</span></div>
<div style="display: flex; justify-content: space-between; margin-top: 80px;">${cast}</div>
</div>`));
console.log('ok', outDir);
