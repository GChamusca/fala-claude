// Local preview of a .dc.html artboard: fills {{holes}} from renderVals() at time t and screenshots it.
// usage: node dcrender.mjs <file.dc.html> <outdir> <t,t,...> | --video <fps> <out.mp4>
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const [file, outdir, list] = process.argv.slice(2);
const S = '/tmp/claude-0/-home-user-fala-claude/0d9aa632-2cf5-5345-9e3f-b607d659ec19/scratchpad/cd';
const BLOBS = { e39ece9c429165ffc8e2098f4684f250: 'slide-1.jpg', '5bc807e55cc5f87b740df68c7d3d8df7': 'slide-2.jpg', '4fdd48e9a24b959113fba7241f6c7f68': 'slide-3.jpg', a4555c6454d8d9d0c3d705e155a022f6: 'slide-4.jpg' };
const src = fs.readFileSync(file, 'utf8');
const helmet = src.match(/<helmet>([\s\S]*?)<\/helmet>/)[1];
let tpl = src.match(/<x-dc>([\s\S]*?)<\/x-dc>/)[1].replace(/<helmet>[\s\S]*?<\/helmet>/, '');
tpl = tpl.replace(/<sc-if[\s\S]*?<\/sc-if>/g, '').replace(/<video[\s\S]*?<\/video>/g, '').replace(/<button[\s\S]*?<\/button>/g, '');
const js = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];

fs.mkdirSync(outdir, { recursive: true });
const b = await chromium.launch({ channel: 'chromium' });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.route('**/_blob/*', r => { const id = r.request().url().split('/').pop(); const f = BLOBS[id]; return f ? r.fulfill({ path: path.join(S, f) }) : r.fulfill({ status: 404 }); });
await p.route('http://dc.local/', r => r.fulfill({ contentType: 'text/html', body: `<!doctype html><html><head><meta charset="utf-8">${helmet}</head><body></body></html>` }));
await p.goto('http://dc.local/');
await p.evaluate(({ js, tpl }) => {
  class DCLogic { constructor(pr) { this.props = pr || {}; } setState(o) { Object.assign(this.state, o); } }
  window.DCLogic = DCLogic;
  const Component = new Function('DCLogic', js + '\nreturn Component;')(DCLogic);
  const c = new Component({});
  window.__render = t => {
    c.state.t = t; const r = c.renderVals();
    const get = pth => pth.split('.').reduce((o, k) => (o == null ? undefined : o[k]), r);
    document.body.innerHTML = tpl.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, k) => { const v = get(k); return v == null ? '' : String(v); });
  };
}, { js, tpl });
await p.evaluate(() => document.fonts.ready);
const times = list.split(',').map(Number);
for (const t of times) {
  await p.evaluate(t => window.__render(t), t);
  await p.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))));
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${outdir}/t${t.toFixed(2).padStart(6, '0')}.jpg`, type: 'jpeg', quality: 85 });
}
await b.close();
console.log('rendered', times.length);
