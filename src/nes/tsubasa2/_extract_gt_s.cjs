// 提取 OpeningFrameTable.ts f3725-f3785 的 s 字段
const fs = require('fs');
const src = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const idxs = [];
let i = 0;
while (true) {
  const j = src.indexOf('{f:', i);
  if (j < 0) break;
  idxs.push(j);
  i = j + 3;
}
const out = [];
for (const j of idxs) {
  const seg = src.slice(j, j + 4000);
  const fm = seg.match(/^\{f:(\d+)/);
  if (!fm) continue;
  const f = +fm[1];
  if (f < 3725 || f > 3785) continue;
  const sm = seg.match(/s:\{([^}]*)\}/);
  if (sm) out.push(`f${f} s={${sm[1]}}`);
}
console.log(out.join('\n'));
