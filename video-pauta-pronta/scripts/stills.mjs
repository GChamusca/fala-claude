// Renders check stills: node scripts/stills.mjs <composition> <frame,frame,...>
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'node:path';
const [id = 'PautaPronta16x9', list = '45,150'] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id, browserExecutable: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
for (const f of list.split(',').map(Number)) {
  await renderStill({ serveUrl, composition, frame: f, output: `out/stills/${id}-${String(f).padStart(4, '0')}.jpg`, imageFormat: 'jpeg', jpegQuality: 85, browserExecutable: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
  console.log('still', f);
}
