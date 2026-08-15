// 提取 bank_00.asm 调色板/场景例程
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_00.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');

const ranges = [
  ['$9A43/$9A71/$9AA2 调色板链', 0x9A35, 0x9B10],
  ['$99F0 衰减', 0x99F0, 0x9A35],
  ['$9B7F/$9B91', 0x9B7F, 0x9BA0],
  ['$8895 场景选择', 0x8895, 0x8920],
  ['$8920 场景数据', 0x8920, 0x8976],
  ['$890C/$88FB', 0x890C, 0x8976],
  ['$8AF7 场景加载', 0x8AF7, 0x8B80],
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
