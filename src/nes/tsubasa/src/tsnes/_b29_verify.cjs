/** 快速核验 bank29 关键结构区: 22B块/指针表/阵容区 */
const fs = require('fs');
const path = require('path');

// 从 rom-data/prg-bank-29.ts 读取
const src = fs.readFileSync(path.join('rom-data', 'prg-bank-29.ts'), 'utf8');
const hexes = [...src.matchAll(/0x([0-9a-fA-F]{2})/g)].map(m => parseInt(m[1], 16));
console.log('总字节数:', hexes.length);

// 1) 指针表区 0x1AB0-0x1AF6 (从 full dump 看, 55 55 开头可能不是表起点)
console.log('\n=== 0x1AA8-0x1B08 (指针表候选区) ===');
for (let off = 0x1AA8; off < 0x1B08; off += 16) {
  const row = hexes.slice(off, off + 16);
  console.log(off.toString(16).padStart(4, '0') + ': ' + row.map(b => b.toString(16).padStart(2, '0')).join(' '));
}

// 2) 找所有 2字节LE指针指向 0xBA00-0xBFFF 的位置(从0x1A00开始找)
console.log('\n=== 从 0x1A90 起, 2字节LE指针值在 $BA00-$BFFF 的位置 ===');
const ptrs = [];
for (let off = 0x1A90; off < 0x1B00; off += 2) {
  const lo = hexes[off], hi = hexes[off + 1];
  const v = (hi << 8) | lo;
  if (v >= 0xBA00 && v <= 0xBFFF) ptrs.push({ off, v: '0x' + v.toString(16).toUpperCase() });
}
console.log('找到', ptrs.length, '个指针:');
for (let i = 0; i < ptrs.length; i += 8) {
  console.log(ptrs.slice(i, i + 8).map(p => p.off.toString(16).padStart(4, '0') + '→' + p.v).join('  '));
}

// 3) 阵容区 0x1AF8 起: 每 16B 一行
console.log('\n=== 0x1AF8-0x1D00 (阵容区) ===');
for (let off = 0x1AF8; off < 0x1D00; off += 16) {
  const row = hexes.slice(off, off + 16);
  console.log(off.toString(16).padStart(4, '0') + ': ' + row.map(b => b.toString(16).padStart(2, '0')).join(' '));
}

// 4) 0x1D00+ 是否全 FF
const after = hexes.slice(0x1D00);
const ffCount = after.filter(b => b === 0xFF).length;
console.log('\n=== 0x1D00-0x1FFF ===');
console.log('长度:', after.length, ' FF个数:', ffCount, ' 其他:', after.length - ffCount);
console.log('非FF样本:', after.filter(b => b !== 0xFF).slice(0, 30).map(b => b.toString(16).padStart(2, '0')).join(' '));
