const fs = require('fs');
const path = require('path');
// 抽样: 每个 seg 开头 100 行 + 搜含 ED / C4B9 / 00ED 的行
for (let s = 1; s <= 2; s++) {
  const f = path.resolve(__dirname, `trace/cpu_seg00${s}.log`);
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  console.log(`===== cpu_seg00${s} 前 15 行 =====`);
  for (const l of lines.slice(0, 15)) if (l.length) console.log(l);
  console.log(`===== cpu_seg00${s} 含 ED 的行 (前 10) =====`);
  let c = 0;
  for (const l of lines) {
    if (l.includes('ED')) { console.log(l.slice(0, 110)); if (++c >= 10) break; }
  }
  console.log(`含 C4B9 行: `);
  c = 0;
  for (const l of lines) {
    if (l.includes('C4B9')) { console.log(l.slice(0, 110)); if (++c >= 10) break; }
  }
}
