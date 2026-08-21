// G37: 从 ROM 提取 bank02 分发表 + 各场景入口代码, 核对 BootRouter.TaskIndex 语义
const fs = require('fs');
const path = require('path');

const romPath = path.join(__dirname, 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(romPath);

// NES 头 16 字节, PRG 从 0x10 开始, 每 bank 8KB (bank idx 0-31)
const prgStart = 0x10;
const bank = 2;
const bankOffset = prgStart + bank * 0x2000;
const b = rom.subarray(bankOffset, bankOffset + 0x2000);

function hex8(v) { return '$' + v.toString(16).toUpperCase().padStart(2, '0'); }
function hex16(v) { return '$' + v.toString(16).toUpperCase().padStart(4, '0'); }

// 1) 分发器 $8484-$8490 (asm 基址 $8000) → 运行时 $A484-$A490
console.log('=== 分发器 $8484-$8490 ===');
for (let i = 0x8484; i <= 0x8490; i++) {
  console.log(hex16(0xA000 + (i - 0x8000)) + ' (' + hex16(i) + '): ' + hex8(b[i - 0x8000]));
}

// 2) 分发表 $8491-$84C0 (24 项 16 位)
console.log('\n=== 分发表 $8491 (运行时 $A491) 24 项 ===');
const targets = [];
for (let idx = 0; idx < 24; idx++) {
  const lo = b[0x8491 - 0x8000 + idx * 2];
  const hi = b[0x8491 - 0x8000 + idx * 2 + 1];
  const t = lo | (hi << 8);
  targets.push(t);
  console.log('idx ' + idx + ' → ' + hex16(t) + ' (asm ' + hex16(t - 0x2000) + ')');
}

// 3) 每个入口的代码 (反汇编: 简单打印原始字节)
console.log('\n=== 各入口原始字节 (asm 偏移) ===');
for (let idx = 0; idx < 24; idx++) {
  const rt = targets[idx];
  const asmAddr = rt - 0x2000;
  const off = asmAddr - 0x8000;
  if (off < 0 || off + 32 > 0x2000) { console.log('idx ' + idx + ': 越界 ' + hex16(asmAddr)); continue; }
  const bytes = [];
  for (let i = 0; i < 32; i++) bytes.push(hex8(b[off + i]));
  console.log('idx ' + idx + ' asm ' + hex16(asmAddr) + ': ' + bytes.join(' '));
}
