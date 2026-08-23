// 从 ROM 提取 bank12 音频数据表 + 验证 bank15 指针语义
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgBase = 0x10; // iNES header 16B
// PRG 大小 = 最后一个 bank 判定 (取 header byte 4 * 0x4000; 实际 256KB=8×0x4000)
const prgSize = rom[4] * 0x4000;
console.log('PRG size:', prgSize.toString(16), 'ROM total:', rom.length.toString(16));

const bank = (n) => {
  const off = prgBase + n * 0x2000;
  return rom.slice(off, off + 0x2000);
};

// bank12
const b12 = bank(12);
console.log('\n=== bank12 $870D freq table (12×2B) ===');
for (let i = 0; i < 12; i++) {
  const off = 0x870D - 0x8000 + i * 2;
  const lo = b12[off], hi = b12[off + 1];
  console.log(`  ${i}: $${b12[off].toString(16).padStart(2,'0')} $${b12[off+1].toString(16).padStart(2,'0')} → period=${(lo | ((hi&7)<<8)).toString(10)}`);
}
console.log('\n=== bank12 $8725 dur table (64B) ===');
const dur = [];
for (let i = 0; i < 64; i++) dur.push('0x' + b12[0x8725 - 0x8000 + i].toString(16).padStart(2,'0'));
console.log('  ' + dur.join(', '));

console.log('\n=== bank12 $8269 dispatch table ===');
const t8269 = [];
for (let i = 0; i < 16; i++) t8269.push('$' + b12[0x8269 - 0x8000 + i].toString(16).padStart(2,'0'));
console.log('  ' + t8269.join(', '));
console.log('\n=== bank12 $82E4 dispatch table ===');
const t82e4 = [];
for (let i = 0; i < 16; i++) t82e4.push('$' + b12[0x82E4 - 0x8000 + i].toString(16).padStart(2,'0'));
console.log('  ' + t82e4.join(', '));

console.log('\n=== bank12 $84DA dispatch table (命令 $E0-$EF) ===');
const t84da = [];
for (let i = 0; i < 32; i++) t84da.push('$' + b12[0x84DA - 0x8000 + i].toString(16).padStart(2,'0'));
console.log('  ' + t84da.join(', '));

console.log('\n=== bank12 $8BDA SE pointer table (前 40 项) ===');
for (let i = 0; i < 40; i++) {
  const off = 0x8BDA - 0x8000 + i * 2;
  const ptr = b12[off] | (b12[off + 1] << 8);
  console.log(`  seId=${(i + 1).toString(16).padStart(2,'0')} → ptr=$${ptr.toString(16)}`);
  if (ptr === 0xFF00) break;
}

// bank15 验证: $A00D 处字节
const b15 = bank(15);
console.log('\n=== bank15 前 32 字节 ===');
for (let i = 0; i < 32; i++) console.log(`  ${i.toString(16).padStart(2,'0')}: $${b15[i].toString(16).padStart(2,'0')}`);
console.log('\n$A00D 解释 (offset 0x0D):', '0x' + b15[0x0D].toString(16));
console.log('$8000+0x0D 解释 (offset 0x0D):', '0x' + b15[0x0D].toString(16), '(同)');
// 用 $A000 窗口: ptr $A00D → offset $00D → 0xEB; 若 ptr 是 $8000 基址: $800D → offset $00D → 0xEB 同
// 检查 bank15 是否与 bank15-data.ts 一致
const b15ts = require('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/audio/bank15-data.ts');
// TS module 不是 commonjs 直接 require 会失败, 改为读取文件首行对比
console.log('\n对比 bank15-data.ts 前 16 字节 vs ROM:');
const tsLine = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/audio/bank15-data.ts','utf8').split(/\r?\n/).find(l => l.includes('0x04, 0x0D'));
console.log('  TS: ' + (tsLine || 'not found').trim().slice(0, 90));
const romLine = Array.from(b15.slice(0, 16)).map(x => '0x' + x.toString(16).padStart(2,'0')).join(', ');
console.log('  ROM: ' + romLine);
