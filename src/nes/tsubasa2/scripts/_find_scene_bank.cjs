const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
console.log('size:', rom.length);
console.log('header:', Array.from(rom.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' '));
const prgSize = rom[4] * 16384;
const chrSize = rom[5] * 8192;
const mapper = ((rom[6] >> 4) & 0xf) | (rom[7] & 0xf0);
console.log('PRG:', prgSize, 'CHR:', chrSize, 'mapper:', mapper);
const prg = rom.slice(16, 16 + prgSize);
// 扫描跳转表特征数据 C0 A4 59 A5 7B A5 81 A5
const sig = [0xC0, 0xA4, 0x59, 0xA5, 0x7B, 0xA5, 0x81, 0xA5];
for (let i = 0; i + sig.length <= prg.length; i++) {
  let ok = true;
  for (let j = 0; j < sig.length; j++) if (prg[i + j] !== sig[j]) { ok = false; break; }
  if (ok) {
    const bank16 = Math.floor(i / 16384);
    const bank8 = Math.floor(i / 8192);
    console.log('SIG found @ prg offset', i.toString(16), 'bank16=', bank16, 'bank8=', bank8, 'within-bank16-offset=0x' + (i % 16384).toString(16));
  }
}
// 打印每个 16KB bank 的前 32 字节特征（用于识别 bank 内容）
for (let b = 0; b < prg.length / 16384; b++) {
  const off = b * 16384;
  const first = Array.from(prg.slice(off, off + 16)).map(x => x.toString(16).padStart(2, '0')).join(' ');
  console.log('bank16[' + b + '] @0x' + off.toString(16) + ':', first);
}
