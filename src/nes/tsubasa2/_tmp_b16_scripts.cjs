// Dump bank16 $89BF 脚本指针表 + 各脚本数据 (ram_0518 索引)
const fs = require('fs');
function parseBank(tsPath) {
  const s = fs.readFileSync(tsPath, 'utf8');
  const m = s.match(/= \[([\s\S]*?)\];/);
  if (!m) throw new Error('no array: ' + tsPath);
  const bytes = [];
  for (const tok of m[1].match(/0x[0-9a-fA-F]+/g) || []) bytes.push(parseInt(tok, 16));
  return bytes;
}
const B16 = parseBank('./src/game/data/prg-bank-16.ts');
console.log('bank16 bytes:', B16.length);
function b16(cpu) { const off = cpu - 0x8000; return off >= 0 && off < B16.length ? B16[off] : 0; }
function b16u16(cpu) { return b16(cpu) | (b16(cpu + 1) << 8); }

console.log('=== $89BF 脚本指针表 (前 12 项) ===');
for (let i = 0; i < 12; i++) {
  const ptr = b16u16(0x89bf + i * 2);
  // 打印脚本前 20 字节
  const bytes = [];
  for (let k = 0; k < 20; k++) bytes.push(b16(ptr + k).toString(16).padStart(2, '0'));
  console.log(`idx ${i}: ptr=$${ptr.toString(16)}: ${bytes.join(' ')}`);
}

// 也打印 $8006 用 LDX #$89 → $89BF? $8006: LDX #$89; ...; ram_0518 ASL → Y; (ram_005D=$BF89) 错, 看 $8006: LDX #$89; STA ram_005E=$89... 实际 (ram_005D)=$89BF
// 表在 bank16 CPU $89BF → 数据区
