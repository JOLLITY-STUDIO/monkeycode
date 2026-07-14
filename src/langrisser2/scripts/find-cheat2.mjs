import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, '..', '20260713');
const romPath = join(base, 'Langrisser II (Japan).md');
const asmPath = join(base, 'asm', 'm68k', 'rom.asm');

// Read ROM binary
const rom = readFileSync(romPath);

// Find A10003/A10005/A10009 references
let refs = [];
for (let i = 0; i < rom.length - 3; i++) {
  const v = (rom[i] << 24) | (rom[i+1] << 16) | (rom[i+2] << 8) | rom[i+3];
  if (v === 0x00A10003 || v === 0x00A10005 || v === 0x00A10009) {
    refs.push('0x' + i.toString(16) + ' -> 0x' + v.toString(16));
  }
}
console.log('Controller I/O refs:', refs);
console.log('');

// Search ASM around the first ref area (0x81CE and 0x8744)
// These are in the range $000000-$200000, so the ASM labels will be rom:
// We need to find which lines correspond to these offsets
// The ASM format has comments like: ; $XXXXXX
// Let's search for lines containing "$0081CE" or "$008744"

const asm = readFileSync(asmPath, 'utf8');
const lines = asm.split('\n');

// Find the lines around ROM offsets 0x81CE and 0x8744
for (const target of ['81CE', '81C0', '81D0', '8744', '8740', '8750']) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('$00' + target)) {
      const start = Math.max(0, i - 10);
      const end = Math.min(lines.length - 1, i + 15);
      console.log(`\n=== Around $00${target} (line ${i+1}) ===`);
      for (let j = start; j <= end; j++) {
        console.log(`${(j+1).toString().padStart(6)}: ${lines[j].substring(0, 130)}`);
      }
      break;
    }
  }
}
