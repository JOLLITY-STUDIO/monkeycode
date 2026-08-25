const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const b2 = (cpu) => cpu - 0xa000 + 0x4000;
for (let cpu = 0xA670; cpu < 0xA778; cpu += 16) {
  const bytes = Array.from(prg.slice(b2(cpu), b2(cpu) + 16));
  console.log(`$${cpu.toString(16).toUpperCase()}: ${bytes.map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
}
