// Gera compositions/*.html (sub-composições HyperFrames) e index.html a partir de src/scenes.
// Uso: node src/build.mjs [id-da-cena ...]   (sem argumentos = filme inteiro)
import fs from 'node:fs';
import { subcomp, C, GRAIN } from './lib.mjs';

const ROOT = new URL('../', import.meta.url);
const SFX_DIR = `${process.env.HOME}/.claude/skills/media-use/audio/assets/sfx`;
const ORDER = ['f01-hook', 'f02-promessa', 'f03-tema', 'f03b-radar', 'f04-recorte', 'f05-pesquisa', 'f06-analise', 'f07-angulos', 'f08-formato', 'f09-entrega', 'f10-validacao', 'f11-convite']
  .filter((id) => fs.existsSync(new URL(`scenes/${id}.mjs`, import.meta.url)));

// efeitos agudos mais baixos (pedido do usuário)
const SOFT = { sparkle: 0.45, chime: 0.5, ping: 0.5, click: 0.6, 'click-soft': 0.7, pop: 0.6, 'logo-1': 0.7, typing: 0.7 };
const only = process.argv.slice(2);
const ids = only.length ? only : ORDER;
const scenes = [];
for (const id of ids) scenes.push((await import(`./scenes/${id}.mjs`)).default);

fs.mkdirSync(new URL('compositions/', ROOT), { recursive: true });
fs.mkdirSync(new URL('assets/sfx/', ROOT), { recursive: true });

let t = 0;
const hosts = [];
const audio = [];
scenes.forEach((s, i) => {
  fs.writeFileSync(new URL(`compositions/${s.id}.html`, ROOT), subcomp(s));
  hosts.push(`    <div id="slot-${s.id}" data-composition-id="${s.id}" data-composition-src="compositions/${s.id}.html" data-start="${t}" data-duration="${s.duration}" data-track-index="${1 + (i % 2)}" data-width="1920" data-height="1080"></div>`);
  (s.sfx || []).forEach(([name, at, vol], k) => {
    const src = `assets/sfx/${name}.mp3`;
    if (!fs.existsSync(new URL(src, ROOT))) fs.copyFileSync(`${SFX_DIR}/${name}.mp3`, new URL(src, ROOT));
    audio.push(`    <audio id="sfx-${s.id}-${k}" src="${src}" data-start="${(t + at).toFixed(2)}" data-track-index="${10 + (k % 6)}" data-volume="${(vol * (SOFT[name] ?? 0.8)).toFixed(2)}"></audio>`);
  });
  t += s.duration;
});
const total = +t.toFixed(2);
const MUSIC = process.env.MUSIC || 'assets/music/trilha-1-longa.mp3';
if (fs.existsSync(new URL(MUSIC, ROOT))) audio.unshift(`    <audio id="bgm" src="${MUSIC}" data-start="0" data-duration="${total}" data-track-index="9" data-volume="0.45"></audio>`);

fs.writeFileSync(new URL('index.html', ROOT), `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Pauta Pronta — vídeo explicativo</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: ${C.paper}; }
      #stage { position: relative; width: 100%; height: 100%; overflow: hidden; background: ${C.paper}; }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="main" data-start="0" data-duration="${total}" data-width="1920" data-height="1080">
${hosts.join('\n')}
    <div id="grain-layer" data-start="0" data-duration="${total}" data-track-index="8" style="position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;opacity:.22;z-index:50;">${GRAIN('stage-grain')}</div>
${audio.join('\n')}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
console.log(`ok: ${scenes.length} cena(s), ${total}s, ${audio.length} efeitos`);
