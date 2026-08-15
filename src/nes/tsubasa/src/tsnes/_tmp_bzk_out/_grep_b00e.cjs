// 提取 bank_00.asm: $9AB8-$9B07, $9EED-$9F69 主循环, $9EA2-$9EE2 表
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_00.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');

function dump(start, end, label) {
  console.log(`\n===== ${label} =====`);
  for (const line of lines) {
    const m = line.match(/00:([0-9A-F]{4}):/);
    if (!m) continue;
    const addr = parseInt(m[1], 16);
    if (addr >= start && addr <= end) {
      console.log(line.replace(/\s+$/, ''));
    }
  }
}
dump(0x9AB8, 0x9B07, '$9AB8-$9B07 调色板源');
dump(0x9EED, 0x9F69, '$9EED 主循环');
dump(0x9ED1, 0x9EE5, '$9EA2 表尾部');
console.log('\ndone');
