// search-rom-in-ram.mjs — find ROM deploy data sequences in RAM
import fs from 'fs';

const ram = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K-stage1_0.ram');
const bin = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K_stage1_0.bin');

// ROM unit data from config area at 0x1801B6 (count=12 list)
const romUnitData = bin.slice(0x1801C0, 0x180210); // 80 bytes
console.log('=== ROM unit data (0x1801C0-0x180210) ===');
for (let i = 0; i < romUnitData.length; i += 16) {
  const row = Array.from(romUnitData.slice(i, i + 16));
  const hex = row.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  console.log(`  ${hex}`);
}

// Search for 4-byte sequences from ROM in RAM
console.log('\n=== Searching ROM sequences in RAM ===');
for (let romOff = 0x1801C0; romOff < 0x180210; romOff += 2) {
  if (romOff + 3 >= bin.length) break;
  const seq = bin.slice(romOff, romOff + 4);
  // Skip all-zero sequences
  if (seq.every(b => b === 0)) continue;
  
  // Search in RAM (full 64KB)
  for (let ramOff = 0; ramOff < ram.length - 3; ramOff++) {
    if (ram[ramOff] === seq[0] && ram[ramOff+1] === seq[1] && 
        ram[ramOff+2] === seq[2] && ram[ramOff+3] === seq[3]) {
      const ramAddr = 0xFF0000 + ramOff;
      const seqHex = Array.from(seq).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
      console.log(`  ROM 0x${romOff.toString(16).toUpperCase()}: [${seqHex}] → RAM 0x${ramAddr.toString(16).toUpperCase()}`);
    }
  }
}
