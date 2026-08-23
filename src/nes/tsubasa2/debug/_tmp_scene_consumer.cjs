const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game';
function walk(d, out) {
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of es) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
}
const files = [];
walk(root, files);
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const hits = [];
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (/0075|0076|0077|getMetatile|METATILE|drawMap|mapDraw|drawScene|renderScene|bank08/i.test(l)) {
      hits.push((i + 1) + ': ' + l.trim().slice(0, 110));
    }
  });
  if (hits.length) {
    console.log('### ' + f);
    hits.slice(0, 14).forEach(h => console.log('  ' + h));
  }
}
