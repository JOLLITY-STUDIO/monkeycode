// dump-raw-ff603c.mjs — dump raw bytes around 0xFF603C
import fs from 'fs';

const ram = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K-stage1_0.ram');
const offset = 0xFF603C - 0xFF0000; // 0x603C

console.log(`=== Raw dump from 0xFF603C (file offset 0x${offset.toString(16).toUpperCase()}) ===\n`);

for (let i = 0; i < 768; i += 16) {
  const addr = 0xFF603C + i;
  const row = Array.from(ram.slice(offset + i, offset + i + 16));
  const hex = row.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  const ascii = row.map(b => (b >= 32 && b < 127) ? String.fromCharCode(b) : '.').join('');
  console.log(`${addr.toString(16).toUpperCase().padStart(6, '0')}: ${hex}  ${ascii}`);
}

// Also dump the ROM config area from the .bin file
console.log(`\n\n=== ROM config area from .bin (Stage 1 config at 0x180196) ===\n`);
const bin = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K_stage1_0.bin');
const romOffset = 0x180196; // stage 1 config pointer target

for (let i = 0; i < 128; i += 16) {
  const addr = romOffset + i;
  const row = Array.from(bin.slice(addr, addr + 16));
  const hex = row.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  const ascii = row.map(b => (b >= 32 && b < 127) ? String.fromCharCode(b) : '.').join('');
  console.log(`${addr.toString(16).toUpperCase().padStart(6, '0')}: ${hex}  ${ascii}`);
}
