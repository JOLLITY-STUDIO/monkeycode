const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
// 在全部 PRG 中找 LDA $57 (0xA5 0x57) / STA $57 (0x85 0x57) / LDX $57 (0xA6 0x57)
const hits = [];
for (let i = 0; i < prg.length - 1; i++) {
  if (prg[i] === 0xa5 && prg[i + 1] === 0x57) hits.push(`LDA $57 @ PRG 0x${i.toString(16)}`);
  if (prg[i] === 0x85 && prg[i + 1] === 0x57) hits.push(`STA $57 @ PRG 0x${i.toString(16)}`);
  if (prg[i] === 0xa6 && prg[i + 1] === 0x57) hits.push(`LDX $57 @ PRG 0x${i.toString(16)}`);
}
console.log(hits.join('\n'));
console.log('total', hits.length);
// bank0 $88A8 上下文 12 字节
console.log('bank0 $88A8+12:', JSON.stringify(Array.from(prg.slice(0x08a8, 0x08a8 + 12))));
