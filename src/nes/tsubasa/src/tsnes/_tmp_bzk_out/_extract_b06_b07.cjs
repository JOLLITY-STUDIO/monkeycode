// 提取 bank06 场景数据表 + bank07 场景指针表 + 查看 bank00 $8807/$8464 上下文
const fs = require('fs');
const path = require('path');

function parseBank(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/=\s*\[([\s\S]*?)\];/);
  if (!m) return null;
  return m[1].split(',').map(s => parseInt(s.trim(), 16));
}

// ── bank06: 场景数据 (CPU $C000-$DFFF, 数组索引 = cpuAddr - 0xC000)
const b06 = parseBank(path.join(__dirname, '..', 'rom-data', 'prg-bank-06.ts'));
console.log('bank06 length =', b06.length);
// $8920 读地址 = 0xBF00 + id*0x13 (这个地址在 bank06 CPU 空间 $C000..$DFFF? 不对)
// 实际上 $8920 中: EC/ED = id*0x13 + 0xBF00。这是 bank06 的 CPU 地址 $C000 起。
// 等等 bank6 CPU 空间是 $C000-$DFFF。0xBF00 在 $C000 下面。
// 让我输出 bank06 前 0x400 字节看看。
console.log('\nbank06 first 0x200 bytes:');
for (let i = 0; i < 0x200; i += 16) {
  console.log('  ' + b06.slice(i, i + 16).map(v => v.toString(16).padStart(2, '0')).join(' '));
}

// ── bank07: 场景指针表 (CPU $A000 起)
const b07 = parseBank(path.join(__dirname, '..', 'rom-data', 'prg-bank-07.ts'));
console.log('\nbank07 length =', b07.length);
console.log('bank07 $A000 起 64 字节 (场景指针表):');
for (let i = 0; i < 64; i += 16) {
  console.log('  ' + b07.slice(i, i + 16).map(v => v.toString(16).padStart(2, '0')).join(' '));
}

// ── bank00: $8807 和 $8464 上下文 ──
const b00 = parseBank(path.join(__dirname, '..', 'rom-data', 'prg-bank-00.ts'));
console.log('\nbank00 length =', b00.length);
const ctx = (cpuAddr, len) => {
  const off = cpuAddr - 0x8000;
  return b00.slice(off, off + len);
};
console.log('bank00 $8807 上下文 (16B):', ctx(0x8807, 16).map(v => v.toString(16).padStart(2,'0')).join(' '));
console.log('bank00 $8464 上下文 (16B):', ctx(0x8464, 16).map(v => v.toString(16).padStart(2,'0')).join(' '));
console.log('bank00 $8879 上下文 (16B):', ctx(0x8879, 16).map(v => v.toString(16).padStart(2,'0')).join(' '));
console.log('bank00 $9DEE 上下文 (16B):', ctx(0x9DEE, 16).map(v => v.toString(16).padStart(2,'0')).join(' '));
console.log('bank00 $9071 上下文 (32B):', ctx(0x9071, 32).map(v => v.toString(16).padStart(2,'0')).join(' '));
