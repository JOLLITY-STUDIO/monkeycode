// 临时: bank28 $8C06/$8C3B/$8C7F/$868E/$879C asm 上下文
const fs = require('fs');
const files = ['asm/bank28/_full.s', 'asm/bank28/code_main.s', 'asm/bank28/code_sub.s', 'asm/bank28/data_tables.s'];
const lines = [];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const ls = fs.readFileSync(f, 'utf8').split('\n');
  ls.forEach((l, i) => lines.push({ f, i, l }));
}
const targets = ['$8C06', '$8C3B', '$8C7F', '$8C47', '$868E', '$879C', '$8A3F'];
const hits = [];
lines.forEach((o, i) => {
  if (targets.some(t => o.l.includes(t))) hits.push(i);
});
const seen = new Set();
for (const i of hits) {
  for (let k = Math.max(0, i - 6); k < Math.min(lines.length, i + 22); k++) {
    if (seen.has(k)) continue;
    seen.add(k);
    const o = lines[k];
    console.log(`${o.f.split('/').pop()}:${String(o.i + 1).padStart(4)}|${o.l}`);
  }
  console.log('====');
}
