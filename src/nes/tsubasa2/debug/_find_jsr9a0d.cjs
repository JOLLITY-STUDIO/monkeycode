// 找 JSR $9A0D 字节序列 (20 9A 0D) 在哪个 PRG bank
const fs = require('fs');
const r = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const p = 16;
const bs = 8192;
for (let b = 0; b < 16; b++) {
  const bank = r.slice(p + b * bs, p + (b + 1) * bs);
  for (let i = 0; i < bs - 3; i++) {
    if (bank[i] === 0x20 && bank[i+1] === 0x9A && bank[i+2] === 0x0D) {
      // CPU address depends on which CPU region this bank maps to
      const cpuAddr = 0x8000 + i;
      console.log(`bank${b} offset $${i.toString(16)} = CPU $${cpuAddr.toString(16).padStart(4,'0')} (JSR $9A0D)`);
    }
  }
}

// Also check Scene0 second marker: LDA #$10
console.log('--- LDA #$10 (A2 10 LDX / A9 10 LDA) check ---');
for (let b = 0; b < 16; b++) {
  const bank = r.slice(p + b * bs, p + (b + 1) * bs);
  for (let i = 0; i < bs - 5; i++) {
    // LDA #$10 (A9 10) followed by JSR $9fa8 (20 9F A8)
    if (bank[i] === 0xA9 && bank[i+1] === 0x10 && bank[i+2] === 0x20 && bank[i+3] === 0x9F && bank[i+4] === 0xA8) {
      const cpuAddr = 0x8000 + i;
      console.log(`bank${b} offset $${i.toString(16)} = CPU $${cpuAddr.toString(16).padStart(4,'0')} (LDA #$10 + JSR $9FA8)`);
    }
  }
}
