import { readFileSync } from 'fs';
import NES from './src/jsnes/src/nes.js';

const ROM = new Uint8Array(readFileSync('rom.nes'));
const nes = new NES({ onFrame: () => {}, emulateSound: false });
nes.loadROM(ROM);

for (let i = 0; i < 30; i++) nes.frame();
let scene = nes.cpu.mem[0x26];
if (scene !== 0) {
  for (let i = 0; i < 600; i++) {
    nes.frame();
    scene = nes.cpu.mem[0x26];
    if (scene === 0) break;
  }
}
console.log('Scene:', scene);
nes.frame();

const ppu = nes.ppu;
let nt0nz = 0, nt1nz = 0, vram0nz = 0;
for (let i = 0; i < 1024; i++) {
  if (ppu.nameTable[0].tile[i]) nt0nz++;
  if (ppu.nameTable[1].tile[i]) nt1nz++;
  if (ppu.vramMem[i]) vram0nz++;
}
console.log('nameTable[0] non-zero:', nt0nz);
console.log('nameTable[1] non-zero:', nt1nz);
console.log('vramMem[0..1023] non-zero:', vram0nz);
console.log('nameTable[0].attrib non-zero:', Array.from(ppu.nameTable[0].attrib).filter(x => x).length);
console.log('nameTable[1].attrib non-zero:', Array.from(ppu.nameTable[1].attrib).filter(x => x).length);
console.log('curNt:', ppu.curNt);
console.log('regHT:', ppu.regHT, 'regVT:', ppu.regVT, 'regH:', ppu.regH, 'regV:', ppu.regV);
console.log('curX:', ppu.curX, 'scanline:', ppu.scanline);
