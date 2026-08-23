const fs = require('fs');
const pat = /STA \$004[D-E]|LDA \$004[D-E]/;
for (const f of ['code_render.s', 'code_scene.s', 'code_sub.s', 'code_util.s', 'code_main.s', 'data_tail.s', 'bank02/code_sub.s', 'bank02/code_main.s']) {
  const p = 'src/asm/bank00/' + f.replace('bank02/', '');
  if (f.startsWith('bank02/')) continue;
  if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, 'utf8');
  const lines = t.split(/\r?\n/);
  const hits = lines.map((l, i) => ({ l, i })).filter(o => pat.test(o.l));
  if (hits.length) console.log('== ' + f + ' ==');
  for (const h of hits) console.log((h.i + 1) + ': ' + h.l.trim());
}
// bank02
for (const f of ['code_sub.s', 'code_main.s', 'code_data.s']) {
  const p = 'src/asm/bank02/' + f;
  if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, 'utf8');
  const lines = t.split(/\r?\n/);
  const hits = lines.map((l, i) => ({ l, i })).filter(o => pat.test(o.l));
  if (hits.length) console.log('== bank02/' + f + ' ==');
  for (const h of hits) console.log((h.i + 1) + ': ' + h.l.trim());
}
