// dump PRG bank8 pattern 表（$A000+ tile*17，ROM 0x11010 起）
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const base = 0x11010; // bank8 ROM 偏移
// 场景3 用到 tile 0x00-0x21，dump 前 16 项的 17 字节
const out = [];
for (let t = 0; t < 16; t++) {
  const off = base + t * 17;
  const bytes = [];
  for (let i = 0; i < 17; i++) bytes.push(rom[off + i].toString(16).padStart(2, '0'));
  out.push(`tile 0x${t.toString(16).padStart(2, '0')}: attr=${bytes[0]} nt=[${bytes.slice(1).join(' ')}]`);
}
console.log(out.join('\n'));
// 也 dump 场景3 tile 数据对应的全部 tile index
const tiles = [0x00, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x00, 0x00, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x00, 0x00, 0x00, 0x10, 0x11, 0x12, 0x13, 0x00, 0x00, 0x00, 0x00, 0x00, 0x14, 0x15, 0x00, 0x00, 0x00, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x00, 0x00, 0x1e, 0x1f, 0x20, 0x21, 0x00, 0x00];
const uniq = [...new Set(tiles)].sort((a, b) => a - b);
console.log('\n唯一 tile:', uniq.map(t => '0x' + t.toString(16).padStart(2, '0')).join(' '));
for (const t of uniq) {
  const off = base + t * 17;
  const bytes = [];
  for (let i = 0; i < 17; i++) bytes.push(rom[off + i].toString(16).padStart(2, '0'));
  console.log(`tile 0x${t.toString(16).padStart(2, '0')}: attr=${bytes[0]} nt=[${bytes.slice(1).join(' ')}]`);
}
