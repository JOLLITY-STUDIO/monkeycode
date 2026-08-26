// 临时 dump: Scene14 ($9085/$9147) 真实数据 — 模板 + bank9/10 表 + 行数据块
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prg = rom.subarray(16); // 0x40000 PRG + 0x20000 CHR

// 1. $978B 模板 (bank0 @ 0x178B, 32 字节)
const tpl = prg.subarray(0x178b, 0x178b + 0x20);
console.log('=== $978B template (bank0) 32 bytes ===');
console.log(Array.from(tpl).map((b) => b.toString(16).padStart(2, '0')).join(' '));

// 2. bank9 table @ $A000 = PRG 0x12000, 0x6D entries
console.log('\n=== bank9 table (0x12000) idx 0x00-0x6C ===');
const t9 = [];
for (let i = 0; i < 0x6d; i++) {
  const off = 0x12000 + i * 2;
  const v = (prg[off + 1] << 8) | prg[off];
  t9.push(v);
}
console.log(t9.map((v) => '$' + v.toString(16).padStart(4, '0')).join(' '));

// 3. bank10 table @ $A000 = PRG 0x14000
console.log('\n=== bank10 table (0x14000) idx 0x00-0x5F ===');
const t10 = [];
for (let i = 0; i < 0x60; i++) {
  const off = 0x14000 + i * 2;
  const v = (prg[off + 1] << 8) | prg[off];
  t10.push(v);
}
console.log(t10.map((v) => '$' + v.toString(16).padStart(4, '0')).join(' '));

// 4. Scene14 两个索引: $23 (bank9) / $BD-$6D=$50 (bank10)
//    表项 u16 = CPU 地址, 需要换算 bank 内偏移
const idx23 = 0x23;
const ptr23 = t9[idx23]; // u16 地址
const idx50 = 0x50;
const ptr50 = t10[idx50];
console.log('\n=== idx $23 (bank9) -> $' + ptr23.toString(16) + ' | idx $50 (bank10) -> $' + ptr50.toString(16) + ' ===');

// 这些 u16 指向 bank 内的 CPU 地址 ($A000-$BFFF), 转换 PRG offset = bank*0x2000 + (addr-0xA000)
function bankPtr(bank, addr) {
  return bank * 0x2000 + (addr - 0xa000);
}
function dumpBlock(bank, addr, len, label) {
  const off = bankPtr(bank, addr);
  console.log('\n=== ' + label + ' bank' + bank + ' $' + addr.toString(16) + ' (PRG 0x' + off.toString(16) + ') ' + len + ' bytes ===');
  const bytes = Array.from(prg.subarray(off, off + len));
  for (let r = 0; r < bytes.length; r += 16) {
    console.log(bytes.slice(r, r + 16).map((b) => b.toString(16).padStart(2, '0')).join(' '));
  }
}
dumpBlock(9, ptr23, 0x60, 'idx $23 block');
dumpBlock(10, ptr50, 0x80, 'idx $50 block');
