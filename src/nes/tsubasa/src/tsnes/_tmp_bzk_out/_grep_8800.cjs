// 提取 bank_00.asm $8800-$88A0 区域, 观察 entryF 返回值的使用方式
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_00.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');
let capture = false;
let count = 0;
for (const line of lines) {
  const m = line.match(/00:([0-9A-F]{4}):/);
  if (!m) continue;
  const addr = parseInt(m[1], 16);
  if (addr >= 0x87F0 && addr <= 0x88A0) {
    console.log(line.replace(/\s+$/, ''));
    count++;
  }
}
console.log(`total ${count}`);
