// 检查 emu-full 哪些帧是新生成的（mtime > 02:40Z）
const fs = require('fs');
const t = Date.parse('2026-08-26T02:40:00Z');
let n = 0, last = 0;
const gaps = [];
for (let i = 1; i <= 4332; i++) {
  const d = 'frame-' + String(i).padStart(4, '0');
  const fp = 'output/emu-full/' + d;
  if (!fs.existsSync(fp)) { gaps.push(i); continue; }
  const s = fs.statSync(fp);
  if (s.mtime.getTime() > t) { n++; last = i; }
}
console.log('new frames:', n, 'last new:', last);
console.log('missing dirs:', gaps.length ? gaps.slice(0, 20) : 'none');
// 检查最新 mtime 的三个帧目录内容完整性
for (const i of [last - 2, last - 1, last]) {
  if (i > 0) {
    const d = 'frame-' + String(i).padStart(4, '0');
    const files = fs.readdirSync('output/emu-full/' + d);
    console.log(d, files.length, 'files', files.join(','));
  }
}
