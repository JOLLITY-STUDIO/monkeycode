// 提取 bank_00.asm: $99F0 衰减, $9AB8-$9B07 调色板源, $9EED 主循环, $9EA2 表
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_00.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');

const ranges = [
  ['$99F0', 0x99F0, 0x9A35],
  ['$9AB8-$9B07', 0x9AB8, 0x9B28],
  ['$9EED 主循环', 0x9EED, 0x9F69],
  ['$9EA2 表(数据)', 0x9E90, 0x9ED0],
];

for (const [name, start, end] of ranges) {
  console.log(`\n===== ${name} =====`);
  for (const line of lines) {
    const m = line.match(/00:([0-9A-F]{4}):/);
    if (!m) continue;
    const addr = parseInt(m[1], 16);
    if (addr >= start && addr <= end) {
      console.log(line.replace(/\s+$/, ''));
    }
  }
}
console.log('\ndone');
