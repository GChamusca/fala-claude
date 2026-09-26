// Gera compose-entry.jsx com imports estáticos de TODAS as peças (esbuild não resolve require dinâmico)
import fs from 'node:fs';
const B = new URL('../../node_modules/@opeepsfun/open-peeps/build', import.meta.url).pathname;
const dirs = { body: 'body/effigy', head: 'head', face: 'face', acc: 'accessory', beard: 'beard' };
let imp = "import React from 'react';\nimport { renderToStaticMarkup } from 'react-dom/server';\nimport fs from 'node:fs';\n";
let maps = {};
for (const [k, d] of Object.entries(dirs)) {
  const names = fs.readdirSync(`${B}/${d}`).filter(f => f.endsWith('.js') && f !== 'index.js').map(f => f.slice(0, -3));
  maps[k] = names;
  for (const n of names) imp += `import ${k}_${n} from '@opeepsfun/open-peeps/build/${d}/${n}.js';\n`;
}
for (const [k, names] of Object.entries(maps)) imp += `const ${k.toUpperCase()} = {${names.map(n => `${n}: ${k}_${n}`).join(', ')}};\n`;
// offsets extraídos do Effigy.js
const src = fs.readFileSync(`${B}/Effigy.js`, 'utf8');
const off = {};
for (const fn of ['createHair', 'createBeard', 'createAccessory', 'createHead']) {
  const start = src.indexOf(`var ${fn} =`);
  const end = src.indexOf('\n};', start);
  const chunk = src.slice(start, end);
  const re = /\.type === "(\w+)"\) \{\s*return React\.createElement\("g", \{ transform: '([^']+)' \}/g;
  off[fn] = {}; let m; while ((m = re.exec(chunk))) off[fn][m[1]] = m[2];
}
imp += `const OFF = ${JSON.stringify(off)};\n`;
imp += fs.readFileSync(new URL('./compose-body.jsx', import.meta.url), 'utf8');
fs.writeFileSync(new URL('./.compose-entry.jsx', import.meta.url), imp);
console.log(Object.fromEntries(Object.entries(maps).map(([k, v]) => [k, v.length])), Object.fromEntries(Object.entries(off).map(([k, v]) => [k, Object.keys(v).length])));
