// 搜索 ROM 中的特定 hex 值
const fs = require('fs');

// 读取 prg-bank-12.ts 文件，直接解析数组
const bank12 = fs.readFileSync(
  'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-12.ts',
  'utf8'
);

// 提取数组中的数字
const matches = bank12.match(/0x[0-9A-Fa-f]{2}/g);
if (!matches) { console.log('No hex values found'); process.exit(1); }

const data = matches.map(m => parseInt(m, 16));
console.log('Bank 12 total bytes:', data.length);

// 搜索 0xF1, 0x08, 0x40
const targets = [0xF1, 0x08, 0x40];
let count = 0;
data.forEach((v, i) => {
  if (targets.includes(v)) {
    console.log('  offset 0x' + (0x8000 + i).toString(16).toUpperCase() + ' = 0x' + v.toString(16).toUpperCase());
    count++;
  }
});
console.log('Total matches:', count);

// 看看 $870D 频率表
console.log('\n=== FREQ_TBL at $870D ===');
for (let i = 0; i < 12; i++) {
  const off = 0x870D - 0x8000 + i * 2;
  const lo = data[off];
  const hi = data[off + 1];
  const period = lo | ((hi & 7) << 8);
  console.log('  [' + i + '] 0x' + (0x870D + i*2).toString(16) + ': lo=0x' + lo.toString(16) + ' hi=0x' + hi.toString(16) + ' => period=' + period + ' (0x' + period.toString(16) + ')');
}

// 看看 $8725 时长表
console.log('\n=== DUR_TBL at $8725 ===');
for (let i = 0; i < 48; i++) {
  const off = 0x8725 - 0x8000 + i;
  process.stdout.write('0x' + data[off].toString(16).padStart(2, '0') + ' ');
  if ((i + 1) % 16 === 0) process.stdout.write('\n');
}
console.log('');

// 看看 $8BDA 音效指针表
console.log('\n=== SE_MAP at $8BDA ===');
for (let i = 0; i < 20; i++) {
  const off = 0x8BDA - 0x8000 + i * 2;
  const lo = data[off];
  const hi = data[off + 1];
  const ptr = (hi << 8) | lo;
  console.log('  sid 0x' + (i + 0x30).toString(16) + ': ptr=$' + ptr.toString(16).toUpperCase().padStart(4, '0') + ' (offset 0x' + (ptr - 0x8000).toString(16) + ')');
}
