// 找 Scene0 真入口 $A4C1 (JSR $9A0D opcode = 0x20) 在哪个 PRG bank
const fs = require('fs');
const r = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const p = 16;
const bs = 8192;
for (let b = 0; b < 16; b++) {
  const bank = r.slice(p + b * bs, p + (b + 1) * bs);
  const off = 0x24C1; // CPU $A4C1 - $A000 = $24C1
  if (off >= bs) continue;
  const byte = bank[off];
  console.log(`bank${b} offset 0x${off.toString(16)} byte = 0x${byte.toString(16).padStart(2,'0')} (JSR=$20 expected)`);
}
console.log('---');
// Also check Scene11-14 in bank01
for (const addr of ['A5E8', 'A602', 'A61C', 'A629']) {
  const off = parseInt(addr, 16) - 0xA000;
  console.log(`Scene@$${addr} offset 0x${off.toString(16)}:`);
  for (let b = 0; b < 16; b++) {
    const bank = r.slice(p + b * bs, p + (b + 1) * bs);
    if (off >= bs) continue;
    console.log(`  bank${b}: byte = 0x${bank[off].toString(16).padStart(2,'0')}`);
  }
}
