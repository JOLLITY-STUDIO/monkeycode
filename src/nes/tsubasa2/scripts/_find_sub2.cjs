const fs = require('fs');
const pat = /\$9BA9|\$9BCA|\$9EFB|\$9F7E/;
for (const f of ['code_render.s', 'code_scene.s', 'code_sub.s', 'code_util.s', 'code_main.s', 'data_tail.s']) {
  const p = 'src/asm/bank00/' + f;
  const t = fs.readFileSync(p, 'utf8');
  const lines = t.split(/\r?\n/);
  const hits = lines.map((l, i) => ({ l, i })).filter(o => pat.test(o.l));
  if (hits.length) console.log('== ' + f + ' ==');
  for (const h of hits) console.log((h.i + 1) + ': ' + h.l.trim());
}
