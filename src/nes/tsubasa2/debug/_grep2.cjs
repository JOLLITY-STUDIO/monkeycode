const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, 'trace');
const targets = ['C4B9', '00ED', 'C4C4', '8B1C', '8B0D'];
const stats = {};
for (const t of targets) stats[t] = 0;
const samples = {};
for (const t of targets) samples[t] = [];

for (let s = 1; s <= 10; s++) {
  const f = path.join(dir, `cpu_seg${String(s).padStart(3, '0')}.log`);
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  for (const l of lines) {
    for (const t of targets) {
      if (l.includes(t)) {
        stats[t]++;
        if (samples[t].length < 8) samples[t].push(`seg${s} ${l.trim().slice(0, 100)}`);
      }
    }
  }
}
console.log(JSON.stringify(stats, null, 1));
for (const t of targets) {
  console.log(`\n=== ${t} 样例 ===`);
  console.log(samples[t].join('\n') || '(无)');
}
