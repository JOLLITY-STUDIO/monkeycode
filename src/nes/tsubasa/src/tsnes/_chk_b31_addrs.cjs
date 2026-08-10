const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, 'mini-audio/rom-data/prg-bank-31-mini-audio.ts'), 'utf-8');
const m = file.match(/=\s*\[([\s\S]*?)\];/);
const arr = m[1].split(',').map(s => parseInt(s.trim(), 16)).filter(x => !isNaN(x));

function dump(addr, len) {
  const result = [];
  for (let i = 0; i < len; i++) {
    const ad = (addr - 0xE000) + i;
    if (ad >= 0 && ad < 8192) {
      const byte = arr[ad];
      result.push(`$${(addr + i).toString(16).toUpperCase()}: 0x${byte.toString(16).padStart(2, '0')}`);
    }
  }
  return result.join('\n');
}

console.log('=== E58D (附近 JMP $8003) ===');
console.log(dump(0xE58D, 8));
console.log('\n=== E59E ===');
console.log(dump(0xE59E, 20));
console.log('\n=== E6EC ===');
console.log(dump(0xE6EC, 8));
console.log('\n=== E9FF ===');
console.log(dump(0xE9FF, 20));
console.log('\n=== F011 ===');
console.log(dump(0xF011, 20));
console.log('\n=== EE9F (JSR $8000 附近) ===');
console.log(dump(0xEE9F, 30));
console.log('\n=== FFF0 (RESET) ===');
console.log(dump(0xFFF0, 16));

// 统计 E000-EFFF 和 F000-FFFF 的大小
console.log('\n=== 统计 ===');
let eCode = 0;
for (let i = 0; i < 0x1000; i++) {
  if (arr[i] !== 0xFF) eCode++;
}
let fData = 0;
for (let i = 0x1000; i < 0x1FF0; i++) {
  if (arr[i] !== 0xFF) fData++;
}
console.log('$E000-$EFFF 非FF字节:' + eCode + '/' + 0x1000);
console.log('$F000-$FFEF 非FF字节:' + fData + '/' + 0x0FF0);
