// 临时: 扫描 scroll-scan.json 在 f377-f390 与 f50 的 mid-frame $2005 写; 检查 f450 chr-switches
const fs = require('fs');
const scan = JSON.parse(fs.readFileSync('output/emu-full/scroll-scan.json', 'utf8'));
const ks = Object.keys(scan).map(Number).sort((a, b) => a - b);
console.log('scroll-scan keys:', ks.length, 'first', ks[0], 'last', ks[ks.length - 1]);
for (const f of [49, 50, 51, 375, 376, 377, 378, 379, 380, 381, 382, 383, 449, 450]) {
  const v = scan[String(f)];
  console.log('scan f' + f + ':', v ? JSON.stringify(v) : 'MISS');
}
const cs = JSON.parse(fs.readFileSync('output/emu-full/frame-0450/chr-switches.json', 'utf8'));
console.log('f450 chr-switches:', JSON.stringify(cs).slice(0, 800));
