const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgStart = 16;
const bankSize = 8192;
// 扫描全部 32 个 PRG bank 找 F8 B8 / FA B8 / F8 BA / FA BA
const pats = [
  [0xf8, 0xb8], [0xfa, 0xb8], [0xf8, 0xba], [0xfa, 0xba],
  [0xf8, 0x00, 0xb8], [0xfa, 0x00, 0xb8], [0xf8, 0x00, 0xba], [0xfa, 0x00, 0xba],
];
for (let b = 0; b < 32; b++) {
  const base = prgStart + b * bankSize;
  for (let off = 0; off < bankSize - 4; off++) {
    for (const p of pats) {
      let m = true;
      for (let k = 0; k < p.length; k++) {
        if (p[k] === 0x00) continue; // 通配
        if (rom[base + off + k] !== p[k]) { m = false; break; }
      }
      if (m) {
        console.log('bank' + b + ' off$' + off.toString(16).toUpperCase() + ': ' + p.map(x => '0x' + x.toString(16).toUpperCase()).join(' '));
      }
    }
  }
}
console.log('scan done');
