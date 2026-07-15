import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));
const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
const readU16 = (addr) => ((rom[addr] << 8) | rom[addr + 1]);

for (let LEVEL = 0; LEVEL < 5; LEVEL++) {
  const cfgPtr = readU32(0x18005E + LEVEL * 4) & 0xFFFFFF;
  console.log(`\n=== Stage ${LEVEL+1} config at 0x${cfgPtr.toString(16).padStart(6,'0')} ===`);
  console.log('Config bytes (+0 to +20):');
  for (let r = 0; r < 3; r++) {
    const row = [];
    for (let c = 0; c < 16; c++) row.push(rom[cfgPtr + r*16 + c].toString(16).padStart(2,'0'));
    console.log(`  +0x${(r*16).toString(16).padStart(2,'0')}: ${row.join(' ')}`);
  }
  console.log('Pointers: +4=0x' + readU32(cfgPtr+4).toString(16).padStart(6,'0') + ', +8=0x' + readU32(cfgPtr+8).toString(16).padStart(6,'0') + ', +C=0x' + readU32(cfgPtr+0xC).toString(16).padStart(6,'0'));
  
  // Dump bytes at +4, +8, +0xC pointers
  for (const [name, off] of [['+4', 4], ['+8', 8], ['+C', 0xC]]) {
    const ptr = readU32(cfgPtr + off) & 0xFFFFFF;
    if (ptr && ptr < rom.length - 64) {
      console.log(`  ${name} data at 0x${ptr.toString(16).padStart(6,'0')}:`);
      const row = [];
      for (let i = 0; i < 64; i++) row.push(rom[ptr + i].toString(16).padStart(2,'0'));
      console.log('    ' + row.join(' '));
    }
  }
}
