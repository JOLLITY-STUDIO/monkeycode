// 从 ROM dump bank09/bank10 的 $A000 指针表 + boot 场景数据 (对应 asm $9085 装载链)
const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
// iNES header 16B; PRG 起 16, 每 bank 8KB
function prgBank(bank) {
  const off = 16 + bank * 8192;
  return rom.slice(off, off + 8192);
}
const out = [];
const b9 = prgBank(9);
const b10 = prgBank(10);

// bank9 指针表 $A000-$A0FF (64 项 16 位)
out.push('=== bank9 $A000 指针表 (前 64 项) ===');
for (let i = 0; i < 64; i++) {
  const lo = b9[i * 2];
  const hi = b9[i * 2 + 1];
  const ptr = lo | (hi << 8);
  out.push('  idx ' + i.toString(16).padStart(2, '0') + ' ($A0' + (i * 2).toString(16).padStart(2, '0') + '): $' + ptr.toString(16).padStart(4, '0'));
}

// $978B 模板 (bank0 32 字节)
out.push('');
out.push('=== 需要 bank0 $978B 模板 (稍后从 bank0 dump) ===');

// bank9 完整 dump 关键区: 看 $A000 之后的数据块
out.push('');
out.push('=== bank9 $A01A (idx 0x0D) 指针指向 ===');
const p0d = b9[0x0d * 2] | (b9[0x0d * 2 + 1] << 8);
out.push('  ptr = $' + p0d.toString(16).padStart(4, '0'));
const rel = p0d - 0xa000;
if (rel >= 0 && rel < 8192) {
  const block = b9.slice(rel, rel + 64);
  out.push('  data: ' + Array.from(block).map((v) => v.toString(16).padStart(2, '0')).join(' '));
}

// 全 64 项指针指向 dump
out.push('');
out.push('=== 各 idx 指针目标 (前 16 字节) ===');
for (let i = 0; i < 64; i++) {
  const ptr = b9[i * 2] | (b9[i * 2 + 1] << 8);
  const r = ptr - 0xa000;
  if (r >= 0 && r < 8192) {
    const block = b9.slice(r, r + 16);
    out.push('  idx ' + i.toString(16).padStart(2, '0') + ' → $' + ptr.toString(16).padStart(4, '0') + ': ' + Array.from(block).map((v) => v.toString(16).padStart(2, '0')).join(' '));
  }
}

// bank10 指针表
out.push('');
out.push('=== bank10 $A000 指针表 (前 64 项) ===');
for (let i = 0; i < 64; i++) {
  const lo = b10[i * 2];
  const hi = b10[i * 2 + 1];
  const ptr = lo | (hi << 8);
  out.push('  idx ' + i.toString(16).padStart(2, '0') + ': $' + ptr.toString(16).padStart(4, '0'));
}

fs.writeFileSync(path.resolve(__dirname, '../debug/boot_scene_dump.txt'), out.join('\n'));
console.log('written, lines=' + out.length);
