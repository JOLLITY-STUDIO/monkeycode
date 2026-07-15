import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROMS = [
  ['base', join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin')],
  ['v1.2', join(__dirname, '..', '20260713', 'otherversionroms', 'Langrisser II (Japan) (v1.2-gens-rom-dump_68K.bin')]
];

for (const [name, path] of ROMS) {
  const rom = readFileSync(path);
  const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
  const readU16 = (addr) => ((rom[addr] << 8) | rom[addr + 1]);
  const cfgPtr = readU32(0x18005E) & 0xFFFFFF;
  console.log(`\n=== ${name} ROM Stage 1 ===`);
  console.log(`Config pointer: 0x${cfgPtr.toString(16).padStart(6,'0')}`);
  for (let off = 0; off <= 0xC; off += 4) {
    const ptr = readU32(cfgPtr + off) & 0xFFFFFF;
    console.log(`  +0x${off.toString(16)} ptr=0x${ptr.toString(16).padStart(6,'0')} count=${readU16(ptr)}`);
  }
  // Dump first 48 bytes of +4, +8, +C lists
  for (const off of [4, 8, 0xC]) {
    const ptr = readU32(cfgPtr + off) & 0xFFFFFF;
    const bytes = [];
    for (let i = 0; i < 48; i++) bytes.push(rom[ptr + i].toString(16).padStart(2,'0'));
    console.log(`  +0x${off.toString(16)} data: ${bytes.join(' ')}`);
  }
}
