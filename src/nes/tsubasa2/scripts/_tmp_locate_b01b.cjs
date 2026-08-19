const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', '_tmp_bzk_out', 'bank_01');
const targets = ['00:8FEF', '00:9DEE', '00:9023', '00:902E', '00:9045', '00:9013', '00:8231', '00:8402', '00:8474', '00:84D8', '00:82A9', '00:8464', '00:88CA', '00:9FEE', '00:B0C0'];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  lines.forEach((ln, i) => {
    const m = ln.match(/(\d\d:[0-9A-F]{4}):/);
    if (m && targets.includes(m[1])) {
      console.log(`\n=== ${f} line ${i + 1}: ${m[1]} ===`);
      for (let j = Math.max(0, i - 3); j < Math.min(lines.length, i + 45); j++) console.log(lines[j]);
    }
  });
}
