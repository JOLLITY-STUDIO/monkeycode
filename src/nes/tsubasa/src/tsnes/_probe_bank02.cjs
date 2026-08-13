const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'rom-data', 'prg-bank-02.ts'), 'utf8');
const m = src.match(/\[([\s\S]*?)\]/);
const nums = m[1].split(',').map(s => parseInt(s.trim(), 16));
console.log('len =', nums.length, '(0x' + nums.length.toString(16) + ')');
// 尝试不同偏移: 找 4C 1B A2 (JMP $A21B) 模式
for (let i = 0; i < nums.length - 2; i++) {
  if (nums[i] === 0x4C && nums[i+1] === 0x1B && nums[i+2] === 0xA2) {
    console.log('JMP $A21B found at index', i, '→ CPU addr = $' + (0x8000 + i).toString(16));
  }
}
// 找 $A2E8 的 LDA $57: A5 57 30 4C
for (let i = 0; i < nums.length - 3; i++) {
  if (nums[i] === 0xA5 && nums[i+1] === 0x57 && nums[i+2] === 0x30 && nums[i+3] === 0x4C) {
    console.log('entryC found at index', i, '→ CPU addr = $' + (0x8000 + i).toString(16));
  }
}
// 找 AA06: 84 ED E8 A0 00 48 A9 00 91 EC
for (let i = 0; i < nums.length - 8; i++) {
  if (nums[i] === 0x84 && nums[i+1] === 0xED && nums[i+2] === 0xE8) {
    console.log('AA06 found at index', i, '→ CPU addr = $' + (0x8000 + i).toString(16));
  }
}
console.log('head:', nums.slice(0, 8).map(x => x.toString(16)));
console.log('tail:', nums.slice(-8).map(x => x.toString(16)));
