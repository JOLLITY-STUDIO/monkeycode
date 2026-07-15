// dump-units-correct-stride.mjs — use stride 0x60 (from asm adda.w #$0060)
import fs from 'fs';

const ram = fs.readFileSync('src/langrisser2/20260713/stages/Langrisser II (Japan)_68K-stage1_0.ram');
const offset = 0xFF603C - 0xFF0000;
const STRIDE = 0x60; // 96 bytes
const MAX = 20;

// Read big-endian word
const rw = (d, pos) => (pos + 1 < d.length) ? (d[pos] << 8) | d[pos + 1] : 0;
// Read big-endian long
const rl = (d, pos) => (pos + 3 < d.length) ? ((d[pos] << 24) | (d[pos+1] << 16) | (d[pos+2] << 8) | d[pos+3]) >>> 0 : 0;

console.log(`=== RAM Unit Array at 0xFF603C (stride=0x${STRIDE.toString(16)}, ${MAX} slots) ===`);
console.log();

for (let i = 0; i < MAX; i++) {
  const off = offset + i * STRIDE;
  if (off + STRIDE > ram.length) break;
  const d = ram.slice(off, off + STRIDE);
  
  // Check if active (first few bytes non-zero)
  const firstWord = rw(d, 0);
  if (firstWord === 0) {
    if (i < 6) {
      const hex = Array.from(d.slice(0, 16)).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
      console.log(`#${String(i).padStart(2)} | EMPTY | first 16 bytes: ${hex}`);
    }
    continue;
  }
  
  // Dump the raw hex - all 96 bytes
  console.log(`\n=== UNIT #${i} ===`);
  for (let row = 0; row < STRIDE; row += 16) {
    const rowData = Array.from(d.slice(row, row + 16));
    const hex = rowData.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    const addr = 0xFF603C + i * STRIDE + row;
    console.log(`  ${addr.toString(16).toUpperCase()}: ${hex}`);
  }
  
  // Try to interpret known fields at common offsets
  console.log(`  --- Interpretation (guessing offsets) ---`);
  console.log(`  +0x00 word:  0x${rw(d, 0).toString(16).padStart(4, '0')}  (class/type?)`);
  console.log(`  +0x06 byte:  0x${d[6].toString(16).padStart(2, '0')}  (x?)`);
  console.log(`  +0x07 byte:  0x${d[7].toString(16).padStart(2, '0')}  (y?)`);
  console.log(`  +0x08 byte:  0x${d[8].toString(16).padStart(2, '0')}  (team/flag?)`);
  console.log(`  +0x09 byte:  0x${d[9].toString(16).padStart(2, '0')}  (item?)`);
  console.log(`  +0x0A word:  0x${rw(d, 0x0A).toString(16).padStart(4, '0')} (${rw(d, 0x0A)})  (HP?)`);
  console.log(`  +0x18 word:  0x${rw(d, 0x18).toString(16).padStart(4, '0')} (${rw(d, 0x18)})  (level?)`);
  console.log(`  +0x1A byte:  0x${d[0x1A].toString(16).padStart(2, '0')}  (cmdId?)`);
  console.log(`  +0x1C byte:  0x${d[0x1C].toString(16).padStart(2, '0')}  (extra?)`);
}

// Also show summary of all active units
console.log(`\n\n=== SUMMARY ===`);
let activeCount = 0;
for (let i = 0; i < MAX; i++) {
  const off = offset + i * STRIDE;
  const d = ram.slice(off, off + STRIDE);
  const firstWord = rw(d, 0);
  if (firstWord !== 0) {
    activeCount++;
    const x = d[6];
    const y = d[7];
    const hp = rw(d, 0x0A);
    const lv = rw(d, 0x18) & 0xFF;
    const flag = d[8];
    const classId = d[0] || firstWord & 0xFF;
    const cmdId = d[0x1A];
    
    let team = '?';
    if (flag === 0x00) team = 'PLAYER';
    else if (flag === 0x01) team = 'ENEMY';
    else if (flag === 0x02) team = 'NPC';
    else team = `0x${flag.toString(16)}`;
    
    console.log(`#${i} | ${team.padEnd(8)} | class=${classId.toString(16).padStart(2,'0')} cmd=${cmdId.toString(16).padStart(2,'0')} | xy=(${String(x).padStart(3)},${String(y).padStart(3)}) | Lv=${lv} HP=${hp} | flag=${flag.toString(16).padStart(2,'0')}`);
  }
}
console.log(`\nTotal active: ${activeCount}`);
