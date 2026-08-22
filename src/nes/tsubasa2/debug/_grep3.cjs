const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, 'trace');

// 搜 trace 里 $001B 相关写操作 + $9F04 附近指令
const hits = {};
const patterns = ['001B', '9F04', '9EED', '9F0A'];
for (const t of patterns) hits[t] = [];
for (let s = 1; s <= 10; s++) {
  const f = path.join(dir, `cpu_seg${String(s).padStart(3, '0')}.log`);
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  for (const l of lines) {
    for (const t of patterns) {
      if (l.includes(t) && hits[t].length < 15) {
        hits[t].push(`seg${s} ${l.trim().slice(0, 110)}`);
      }
    }
  }
}
for (const t of patterns) {
  console.log(`\n=== ${t} ===`);
  console.log(hits[t].join('\n') || '(无)');
}
