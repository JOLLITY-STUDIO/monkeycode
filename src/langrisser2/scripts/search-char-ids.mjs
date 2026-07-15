// search-char-ids.mjs — search for player char IDs in RAM to find unit struct
import fs from 'fs';

const ram = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K-stage1_0.ram');
const bin = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K_stage1_0.bin');

// From ROM config: player chars [0x01, 0x05]
// Search RAM for these as word values (big-endian)
console.log('=== Searching for player char IDs in RAM (as words) ===');
const charIds = [1, 5];
for (const cid of charIds) {
  const hi = (cid >> 8) & 0xFF;
  const lo = cid & 0xFF;
  for (let i = 1; i < ram.length - 1; i++) {
    if (ram[i-1] === hi && ram[i] === lo) {
      // Show surrounding context
      const start = Math.max(0, i - 16);
      const end = Math.min(ram.length, i + 16);
      const ctx = Array.from(ram.slice(start, end)).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
      const ramAddr = 0xFF0000 + start;
      console.log(`  charId=0x${cid.toString(16).padStart(2,'0')}${lo.toString(16).padStart(2,'0')} at RAM 0x${(0xFF0000+i).toString(16).toUpperCase()} (offset ${i})`);
      console.log(`    context: 0x${ramAddr.toString(16).toUpperCase()}: ${ctx}`);
    }
  }
}

// Also search for coordinates within map bounds (1-32, 1-24) near known data
console.log('\n=== Searching RAM for sensible xy pairs within map bounds near 0xFF60xx ===');
for (let i = 0x6000; i < 0x6400; i += 2) {
  const x = ram[i];
  const y = ram[i + 1];
  // Map is 32x24, coordinates should be 1-32, 1-24
  if (x >= 2 && x <= 30 && y >= 2 && y <= 22) {
    // Look at surrounding bytes for structure
    const prev4 = Array.from(ram.slice(i - 4, i)).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    const next4 = Array.from(ram.slice(i + 2, i + 8)).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    const ramAddr = 0xFF0000 + i;
    console.log(`  0x${ramAddr.toString(16).toUpperCase()}: ...${prev4} [${x.toString(16).padStart(2,'0')} ${y.toString(16).padStart(2,'0')}] ${next4}...`);
  }
}
