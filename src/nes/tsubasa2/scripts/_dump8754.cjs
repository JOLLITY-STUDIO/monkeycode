const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const bank12 = prg.slice(12 * 0x2000, 12 * 0x2000 + 0x2000);
console.log('$8754 表（音名频率表）:');
for (let i = 0; i < 76; i++) {
  const lo = bank12[0x754 + i * 2];
  const hi = bank12[0x754 + i * 2 + 1];
  const f = lo | (hi << 8);
  const hz = f > 0 ? Math.round(1789773 / (16 * (f + 1))) : 0;
  process.stdout.write('[' + i + ']=$' + f.toString(16) + '(' + hz + 'Hz) ');
  if ((i + 1) % 6 === 0) console.log();
  if (f === 0 && i > 12) break;
}
