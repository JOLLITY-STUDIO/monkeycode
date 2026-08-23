// dump bank12 $8754 16-bit 表 + $8707/$8709/$86F6 附近字节
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgBase = 0x10;
const b12 = rom.slice(prgBase + 12 * 0x2000, prgBase + 13 * 0x2000);
const rel = (a) => a - 0x8000;
console.log('=== $8754 16-bit 时长表 (64 项) ===');
for (let i = 0; i < 64; i++) {
  const off = rel(0x8754) + i * 2;
  const v = b12[off] | (b12[off + 1] << 8);
  if (i % 8 === 0) console.log(`  [${i.toString(16).padStart(2,'0')}-${(i+7).toString(16).padStart(2,'0')}]:`);
  process.stdout.write(`    ${i.toString(16).padStart(2,'0')}:$${v.toString(16).padStart(4,'0')}`);
  if ((i + 1) % 4 === 0) console.log('');
}
console.log('\n=== $86F0-$8710 区域 ===');
for (let off = rel(0x86F0); off < rel(0x8710); off++) {
  console.log(`  $${(0x8000 + off).toString(16)}: $${b12[off].toString(16).padStart(2,'0')}`);
}
console.log('\n=== $8725-$8765 完整时长表 (确认长度) ===');
const dur = [];
for (let i = 0; i < 0x40; i++) dur.push('0x' + b12[rel(0x8725) + i].toString(16).padStart(2, '0'));
console.log('  ' + dur.join(', '));
