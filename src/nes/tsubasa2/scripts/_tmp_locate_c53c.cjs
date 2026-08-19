const fs = require('fs');
const path = require('path');
for (const d of ['bank_30', 'bank_31']) {
  const dir = path.join(__dirname, '..', '_tmp_bzk_out', d);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();
  for (const f of files) {
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      if (/\b(00:C53C|00:F30F|00:F329|00:CD6C|00:CD89)\b/.test(lines[i])) {
        console.log(`\n=== ${d}/${f} line ${i + 1} ===`);
        for (let j = Math.max(0, i - 4); j < Math.min(lines.length, i + 26); j++) console.log(lines[j]);
        i += 25;
      }
    }
  }
}
