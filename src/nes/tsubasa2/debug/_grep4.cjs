const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, 'trace');

const patterns = ['9F03', '9F05', '001B', '9EEF', '9EF', '9F0'];
const hits = {};
for (const t of patterns) hits[t] = [];
for (let s = 1; s <= 3; s++) {
  const f = path.join(dir, `cpu_seg${String(s).padStart(3, '0')}.log`);
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  for (const l of lines) {
    for (const t of patterns) {
      if (l.includes(t) && hits[t].length < 10) {
        hits[t].push(`seg${s} ${l.trim().slice(0, 115)}`);
      }
    }
  }
}
for (const t of patterns) {
  console.log(`\n=== ${t} ===`);
  console.log(hits[t].join('\n') || '(无)');
}
