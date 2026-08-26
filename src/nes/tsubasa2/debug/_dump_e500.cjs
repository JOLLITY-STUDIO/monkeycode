// 临时 dump: CPU $E500 流 (bank31 @ 0x3E500) + $978B 模板 (bank0 @ 0x178B) + bank9/10 $A000 表
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prg = rom.subarray(16);
console.log('rom size', rom.length, 'prg size', prg.length);

// CPU $E500 -> PRG 0x3E500 (fixed bank 31)
const offE500 = 31 * 0x2000 + 0x500;
console.log('\n=== CPU $E500 stream (PRG 0x' + offE500.toString(16) + ') 0x100 bytes ===');
console.log(Array.from(prg.subarray(offE500, offE500 + 0x100)).map((b) => b.toString(16).padStart(2, '0')).join(' '));

// CPU $978B -> bank0? 找到实际位置
console.log('\n=== search 978B template candidate ===');
for (let b = 0; b < 32; b++) {
  const off = b * 0x2000 + 0x178b;
  console.log('bank' + b + '@0x' + off.toString(16) + ': ' + Array.from(prg.subarray(off, off + 8)).map((x) => x.toString(16).padStart(2, '0')).join(' '));
}

// bank 9/10 $A000 table (32 entries u16)
console.log('\n=== bank9 $A000 table (index < $6D) ===');
for (let i = 0; i < 16; i++) {
  const off = 9 * 0x2000 + i * 2;
  console.log('idx ' + i + ': $' + prg[off + 1].toString(16) + prg[off].toString(16).padStart(2, '0'));
}
console.log('\n=== bank10 $A000 table (index >= $6D) ===');
for (let i = 0; i < 8; i++) {
  const off = 10 * 0x2000 + i * 2;
  console.log('idx ' + i + ': $' + prg[off + 1].toString(16) + prg[off].toString(16).padStart(2, '0'));
}
