import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAMS = [
  'Langrisser II (Japan)_68K-gens-ram-dump.ram',
  'Langrisser II (Japan)_68K-ram-in-title-page.ram',
  '17e953fa-Langrisser II (Japan)_68K-1.ram',
  'otherversionroms/Langrisser II (Japan)_1.2_68K-gens-ram-dump.ram'
];
const readU16 = (ram, addr) => ((ram[addr] << 8) | ram[addr + 1]);
const UNIT_ARRAY = 0x603C;
const UNIT_SIZE = 0x60;

for (const name of RAMS) {
  try {
    const ram = readFileSync(join(__dirname, '..', '20260713', name));
    const scenario = readU16(ram, 0xA49C);
    console.log(`\n=== ${name} (scenario=${scenario}, size=${ram.length}) ===`);
    let found = false;
    for (let i = 0; i < 24; i++) {
      const a = UNIT_ARRAY + i * UNIT_SIZE;
      const cls = ram[a + 8];
      const x = ram[a + 0x16];
      const y = ram[a + 0x17];
      const stat = ram[a + 0x20];
      if (cls !== 0 || x !== 0 || y !== 0 || stat !== 0) {
        console.log(`  Unit ${i}: cls=0x${cls.toString(16).padStart(2,'0')} cmd=${ram[a+1]} x=${x} y=${y} stat=0x${stat.toString(16)}`);
        found = true;
      }
    }
    if (!found) console.log('  No units loaded');
  } catch (e) {
    console.log(`\n=== ${name} (ERROR) ===`);
  }
}
