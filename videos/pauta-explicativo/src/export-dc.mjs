// Exporta cenas como artboards do Claude Design (.dc.html) que rodam a animação ao vivo (GSAP).
// Uso: node src/export-dc.mjs <blob-id-do-gsap> <pasta-destino> [id-da-cena ...]
import fs from 'node:fs';
import { BASE_CSS, FONT_FACES, C } from './lib.mjs';

const [gsapBlob, outDir, ...ids] = process.argv.slice(2);
if (!gsapBlob || !outDir) throw new Error('uso: node src/export-dc.mjs <blob-id-gsap> <pasta> [cenas]');
const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&amp;family=Caveat:wght@400..700&amp;family=JetBrains+Mono:wght@400;500&amp;family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&amp;display=swap';

// No canvas o grão de papel (filtro SVG) fica de fora; o resto é a mesma cena do vídeo.
const dcCss = (css) => (BASE_CSS + css).replace(FONT_FACES, '').replace(/#root\{position:absolute;inset:0;/, '#root{position:relative;width:1920px;height:1080px;');
const dcHtml = (html) => html.replace(/<svg id="[^"]*" class="grain"[\s\S]*?<\/svg>/g, '');

fs.mkdirSync(outDir, { recursive: true });
for (const id of ids) {
  const s = (await import(`./scenes/${id}.mjs`)).default;
  const file = `${outDir}/${id}.dc.html`;
  fs.writeFileSync(file, `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Cena ${id} — ao vivo</title>
<script src="../support.js"></script>
<script src="/_blob/${gsapBlob}"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="${FONTS}">
<style>body{margin:0;background:${C.paper}}${dcCss(s.css)}</style>
</helmet>
<div id="root" style="position: relative; width: 1920px; height: 1080px; overflow: hidden; background: ${C.paper};">
${dcHtml(s.html)}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1920,"height":1080}}'>
class Component extends DCLogic {
  componentDidMount() {
    if (!window.gsap) return;
    const tl = gsap.timeline({ paused: true });
${s.js.split('\n').map((l) => '    ' + l).join('\n')}
    tl.to({}, { duration: 0 }, ${s.duration});
    this.tl = tl;
    tl.repeat(-1).repeatDelay(1.2).play(0);
    window.__dcSeek = (t) => { tl.pause(); tl.seek(t); };
  }
  componentWillUnmount() { if (this.tl) this.tl.kill(); }
  renderVals() { return {}; }
}
</script>
</body>
</html>
`);
  console.log('ok', file);
}
