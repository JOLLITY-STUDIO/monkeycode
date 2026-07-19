import { NES } from 'jsnes';
import { readFileSync } from 'fs';

const buf = readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const n = new NES({ onStatusUpdate: (m) => console.log('[NES]', m) });
n.loadROM(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength));

console.log('ROM loaded, mapper:', n.rom.mapperType);
console.log('PRG banks:', n.rom.romCount, 'CHR banks:', n.rom.vromCount);
console.log('PC:', n.cpu.regPC.toString(16).padStart(4, '0'));
console.log('mem[0xFFFC]:', n.cpu.mem[0xFFFC].toString(16).padStart(2, '0'));
console.log('mem[0xFFFD]:', n.cpu.mem[0xFFFD].toString(16).padStart(2, '0'));

// Run a few frames
for (let i = 0; i < 60; i++) {
  n.frame();
}

console.log('After 60 frames, PC:', n.cpu.regPC.toString(16).padStart(4, '0'));
console.log('mem[0x0140]:', n.cpu.mem[0x140].toString(16).padStart(2, '0'));
console.log('mem[0x0448]:', n.cpu.mem[0x448].toString(16).padStart(2, '0'));

// Check a few more RAM areas
for (let addr = 0x140; addr <= 0x150; addr++) {
  const v = n.cpu.mem[addr];
  if (v !== 0) console.log(`  mem[$` + addr.toString(16).padStart(4,'0') + '] =', v.toString(16).padStart(2,'0'));
}
