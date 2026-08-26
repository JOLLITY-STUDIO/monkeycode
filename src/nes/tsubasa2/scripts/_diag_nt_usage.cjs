// 采样片头 NT 使用: 每帧各 NT 非零 tile 数量, 记录变化点
const fs = require('fs');
let last = null;
const report = [];
for (let f = 10; f <= 4100; f++) {
  const d = 'output/emu-full/frame-' + String(f).padStart(4, '0');
  if (!fs.existsSync(d + '/nt.json')) continue;
  const nt = JSON.parse(fs.readFileSync(d + '/nt.json', 'utf8'));
  const sig = nt.map((n) => n.tile.slice(0, 960).filter((v) => v !== 0).length).join(',');
  if (sig !== last) {
    report.push('f' + f + ' NTnz=[' + sig + ']');
    last = sig;
  }
}
console.log(report.join('\n'));
