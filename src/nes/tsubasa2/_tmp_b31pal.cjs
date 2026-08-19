// Extract fixed-bank palette table at CPU $FBCC (bank31), rows A*8
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const bank31Base = 16 + 31 * 0x2000; // ROM offset of bank31 start
const cpu = (a) => bank31Base + (a - 0xe000);
const out = [];
for (let id = 0; id < 8; id++) {
  const off = cpu(0xfbcc + id * 8);
  const row = [...rom.subarray(off, off + 16)];
  out.push(`id=${id.toString(16).padStart(2, '0')} cpu=${(0xfbcc + id * 8).toString(16).toUpperCase()} row=${row.map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
}
fs.writeFileSync('_tmp_b31pal.txt', out.join('\n'));
console.log(out.join('\n'));
