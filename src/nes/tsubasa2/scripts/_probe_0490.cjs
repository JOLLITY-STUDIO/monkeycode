const fs = require('fs');
const out = [];
const root = 'src/asm';
for (const dir of fs.readdirSync(root)) {
  const d = root + '/' + dir;
  let stat;
  try { stat = fs.statSync(d); } catch { continue; }
  if (!stat.isDirectory()) continue;
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(d + '/' + f, 'utf8').split(/\r?\n/);
    lines.forEach((l, i) => {
      if (/0490|0491|0492|0493|0494|0495|0496|0497/.test(l)) {
        out.push(dir + '/' + f + ' ' + (i + 1) + ': ' + l.trim());
      }
    });
  }
}
fs.writeFileSync('scripts/_probe_0490.txt', out.join('\n') || 'NONE');
