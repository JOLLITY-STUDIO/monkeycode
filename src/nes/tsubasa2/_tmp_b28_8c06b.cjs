// 临时: 定位 "; $8C06" 与 "; $8C47" 代码体
const fs = require('fs');
const lines = fs.readFileSync('asm/bank28/_full.s', 'utf8').split('\n');
let last = -1;
for (let i = 0; i < lines.length; i++) {
  if (/;\s*\$8C0[0-9A-F]|;\s*\$8C4[0-9A-F]|;\s*\$8C7F/.test(lines[i])) {
    last = i;
    break;
  }
}
if (last >= 0) {
  for (let k = Math.max(0, last - 5); k < Math.min(lines.length, last + 90); k++) {
    console.log(`${String(k + 1).padStart(4)}|${lines[k]}`);
  }
}
