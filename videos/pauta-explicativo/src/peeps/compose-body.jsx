const h = React.createElement;
const g = (props, ...c) => h('g', props, ...c);
function wrap(map, type, el) { return map && map[type] ? g({ transform: map[type] }, el) : el; }
// Monta um peep (busto/effigy) com grupos nomeados para animação
export function peep({ body, head, faces, acc, beard, id }) {
  const B = BODY[body.type], H = HEAD[head.type];
  const faceEls = faces.map((f, i) => g({ className: `pf pf-${f.type}`, 'data-face': f.type, style: i ? { opacity: 0 } : undefined }, h(FACE[f.type], f.options)));
  const headGroup = g({ className: 'peep-head' },
    g({ transform: 'translate(342, 190)' }, wrap(OFF.createHair, head.type, h(H, head.options))),
    g({ transform: 'translate(531, 366)', className: 'peep-faces' }, ...faceEls),
    beard ? g({ transform: 'translate(495, 518)' }, wrap(OFF.createBeard, beard.type, h(BEARD[beard.type], beard.options))) : null,
    acc ? g({ transform: 'translate(419, 421)' }, wrap(OFF.createAccessory, acc.type, h(ACC[acc.type], acc.options))) : null);
  return renderToStaticMarkup(
    h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '184.2162 210.7875 940.2703 1130.5875', overflow: 'visible', id },
      g({ className: 'peep' },
        g({ className: 'peep-body', transform: 'translate(147, 639)' }, h(B, body.options)),
        wrap(OFF.createHead, body.type, headGroup))));
}
const ink = '#0a0a0a';
const cast = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
for (const [name, spec] of Object.entries(cast)) {
  const o = (x) => ({ outlineColor: ink, ...x });
  const svg = peep({
    id: name,
    body: { type: spec.body, options: o(spec.bodyOpts) },
    head: { type: spec.head, options: o({ skinColor: spec.skin, ...(spec.headOpts || {}) }) },
    faces: spec.faces.map(t => ({ type: t, options: o({}) })),
    acc: spec.acc ? { type: spec.acc, options: o({}) } : null,
    beard: spec.beard ? { type: spec.beard, options: o({}) } : null,
  });
  let out = svg;
  if (spec.body === 'Computer') {
    // tira o desenho da tampa do notebook: subpaths 2–3 do preenchimento e 8–9 do contorno
    const drop = { 2: [2, 3], 3: [8, 9] };
    let k = -1;
    out = out.replace(/<g class="peep-body"[^>]*>(?:<path[^>]*>(?:<\/path>)?){4}/, (grp) => grp.replace(/<path d="([^"]+)"/g, (m, d) => {
      k += 1;
      return drop[k] ? `<path d="${d.split(/(?=M)/).filter((_, i) => !drop[k].includes(i)).join('')}"` : m;
    }));
  }
  fs.writeFileSync(`${process.argv[3]}/${name}.svg`, out);
  console.log(name, svg.length);
}
