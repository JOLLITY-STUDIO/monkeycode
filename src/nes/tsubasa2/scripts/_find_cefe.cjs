const fs = require('fs');
const path = require('path');
for (const f of fs.readdirSync('src/asm/bank30')) {
  if (!f.endsWith('.s')) continue;
  const lines = fs.readFileSync(path.join('src/asm/bank30', f), 'utf8').split(/\r?\n/);
  const map = {};
  lines.forEach((s, i) => {
    const m = s.match(/;\s*\$([0-9A-F]{4})/);
    if (m && !map[m[1]]) map[m[1]] = i;
  });
  for (const t of ['CEFE', 'CF1C', 'C6BE', 'C821', 'C76E']) {
    const i = map[t];
    if (i === undefined) continue;
    console.log(`\n############ ${f} $${t} @line ${i + 1} ############`);
    for (let j = Math.max(0, i - 2); j < Math.min(lines.length, i + 70); j++) {
      console.log(`${String(j + 1).padStart(4)}|${lines[j]}`);
    }
  }
}
