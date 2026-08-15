// 提取 bank_30.asm $CC02/$CCD2 例程
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_30.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');

const ranges = [
  ['$CC02', 0xCC02, 0xCC60],
  ['$CCD2', 0xCCD2, 0xCD20],
  ['$CF1F', 0xCF1F, 0xCF50],
];

for (const [name, start, end] of ranges) {
  console.log(`\n===== ${name} =====`);
  for (const line of lines) {
    const m = line.match(/0F:([0-9A-F]{4}):/);
    if (!m) continue;
    const addr = parseInt(m[1], 16);
    if (addr >= start && addr <= end) {
      console.log(line.replace(/\s+$/, ''));
    }
  }
}
console.log('\ndone');
