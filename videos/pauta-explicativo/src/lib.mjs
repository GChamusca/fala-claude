// Utilidades compartilhadas pelas cenas do vídeo explicativo do Pauta Pronta.
import fs from 'node:fs';

const ROOT = new URL('../', import.meta.url);

export const C = {
  paper: '#f7f3ec', cream: '#efe7d8', creamDeep: '#e6dcc7', rule: '#cfc6b3',
  ink: '#0a0a0a', inkSoft: '#2a2622', mute: '#6b665d',
  navy: '#24456b', navyDeep: '#1a3350', butter: '#e8c873', butterDeep: '#d3ae4f',
  rose: '#a8453a', grass: '#5a7d3f', sky: '#4b88a6',
};

// Fontes locais (subconjuntos latin + latin-ext; todas variáveis no eixo de peso).
const F = (family, style, file, range, weights) => `@font-face{font-family:'${family}';font-style:${style};font-weight:${weights};font-display:block;src:url('assets/fonts/${file}') format('woff2');unicode-range:${range};}`;
const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const LATIN_EXT = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';
export const FONT_FACES = [
  F('Newsreader', 'normal', 'newsreader-v26-cY9AfjOCX1hbuyalUrK4397yjA.woff2', LATIN, '200 800'),
  F('Newsreader', 'normal', 'newsreader-v26-cY9AfjOCX1hbuyalUrK439DyjJBG.woff2', LATIN_EXT, '200 800'),
  F('Newsreader', 'italic', 'newsreader-v26-cY9CfjOCX1hbuyalUrK439vCjohC.woff2', LATIN, '200 800'),
  F('Newsreader', 'italic', 'newsreader-v26-cY9CfjOCX1hbuyalUrK439vCgIhCFpY.woff2', LATIN_EXT, '200 800'),
  F('Bricolage Grotesque', 'normal', 'bricolagegrotesque-v9-3y9K6as8bTXq_nANBjzKo3IeZx8z6up5BeSl9D4dj_x9PpZBMlGIInE.woff2', LATIN, '200 800'),
  F('Bricolage Grotesque', 'normal', 'bricolagegrotesque-v9-3y9K6as8bTXq_nANBjzKo3IeZx8z6up5BeSl9D4dj_x9PpZBMlGGInHEVA.woff2', LATIN_EXT, '200 800'),
  F('JetBrains Mono', 'normal', 'jetbrainsmono-v24-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2', LATIN, '100 800'),
  F('JetBrains Mono', 'normal', 'jetbrainsmono-v24-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2', LATIN_EXT, '100 800'),
  F('Caveat', 'normal', 'caveat-Wnz6HAc5bAfYB2Q7ZjYY.woff2', LATIN, '400 700'),
  F('Caveat', 'normal', 'caveat-Wnz6HAc5bAfYB2Q7aDYYmg8.woff2', LATIN_EXT, '400 700'),
].join('\n');

// Personagem Open Peeps inline (SVG gerado por src/peeps), com id próprio por cena.
export function peep(name, id) {
  const svg = fs.readFileSync(new URL(`assets/peeps/${name}.svg`, ROOT), 'utf8');
  return svg.replace(/ id="[^"]*"/, ` id="${id}" class="peep-svg"`);
}

// Quebra um texto em palavras envoltas em máscara (para revelação palavra a palavra).
export const words = (text, cls = 'w') => text.split(' ').map((w) => `<span class="wm"><span class="${cls}">${w}</span></span>`).join(' ');

// Símbolo do Pauta Pronta (círculo navy, sombra ink deslocada, ponto manteiga).
export const LOGO_MARK = (size, id = '') => `<svg ${id ? `id="${id}" ` : ''}width="${size}" height="${size}" viewBox="4 4 54 54" aria-hidden="true"><circle cx="32" cy="32" r="22" fill="${C.ink}"></circle><circle cx="28" cy="28" r="22" fill="${C.navy}"></circle><circle cx="36" cy="20" r="5" fill="${C.butter}"></circle></svg>`;

// Grão de papel determinístico (feTurbulence com semente fixa).
export const GRAIN = (id) => `<svg id="${id}" class="grain" width="1920" height="1080" aria-hidden="true"><filter id="${id}-f"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" stitchTiles="stitch"></feTurbulence><feColorMatrix values="0 0 0 0 0.16  0 0 0 0 0.13  0 0 0 0 0.09  0 0 0 0.55 0"></feColorMatrix></filter><rect width="1920" height="1080" filter="url(#${id}-f)"></rect></svg>`;

// CSS base de toda cena: raiz em papel, tipografia da marca.
export const BASE_CSS = `
${FONT_FACES}
#root{position:absolute;inset:0;overflow:hidden;background:${C.paper};color:${C.ink};font-family:'Bricolage Grotesque',sans-serif;}
#root .grain{position:absolute;inset:0;mix-blend-mode:multiply;opacity:.55;pointer-events:none;}
#root .wm{display:inline-block;overflow:hidden;vertical-align:top;padding:0 .04em .12em;margin:0 -.04em -.12em;}
#root .w{display:inline-block;}
#root .mono{font-family:'JetBrains Mono',monospace;font-weight:500;text-transform:uppercase;letter-spacing:.16em;}
#root .display{font-family:'Newsreader',serif;font-weight:400;letter-spacing:-.02em;}
#root .display em{font-style:italic;color:${C.navy};}
#root .peep-svg{display:block;height:100%;width:auto;overflow:visible;}
`;

// Documento de sub-composição HyperFrames (tudo dentro do <template>).
export function subcomp({ id, css, html, js }) {
  return `<!doctype html>
<html lang="pt-BR">
<head><meta charset="UTF-8" /><title>${id}</title></head>
<body>
<template>
<style>${BASE_CSS}${css}</style>
<div id="root" data-composition-id="${id}" data-width="1920" data-height="1080">
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
</body>
</html>
`;
}
