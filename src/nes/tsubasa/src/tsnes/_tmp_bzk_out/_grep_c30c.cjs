// 提取 bank_30.asm 关键例程
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'bank_30.asm');
const lines = fs.readFileSync(file, 'latin1').split('\n');

const ranges = [
  ['$CA97 主循环', 0xCA97, 0xCAF0],
  ['$CAE7 事件注册', 0xCAE7, 0xCB20],
  ['$CC02 精灵调色板区填充', 0xCC02, 0xCC60],
  ['$CCD2 指针推进', 0xCCD2, 0xCD20],
  ['$CF1F 清屏', 0xCF1F, 0xCF80],
  ['$C4B9/$C4BD bank切换', 0xC4B9, 0xC4D0],
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
