// 提取 bank_00.asm 关键例程
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_00.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');

const ranges = [
  ['$9B28 ppuBufAlloc', 0x9B28, 0x9B65],
  ['$9B5E ppuBufEnd', 0x9B5E, 0x9B80],
  ['$9F69 dataWrite', 0x9F69, 0x9FA8],
  ['$9F89', 0x9F89, 0x9FA8],
  ['$9F96', 0x9F96, 0x9FA8],
  ['$9FA8 bankSwitch', 0x9FA8, 0x9FC0],
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
