// dump-ram-units.mjs — dump the RAM unit array at 0xFF603C from a .ram file
import fs from 'fs';

const ramPath = 'src/langrisser2/20260713/stages/Langrisser II (Japan)_68K-stage1_0.ram';
const ram = fs.readFileSync(ramPath);

// 68K RAM maps to 0xFF0000-0xFFFFFF in the 64KB .ram file
const RAM_BASE = 0xFF0000;
const UNIT_ARRAY = 0xFF603C;
const offset = UNIT_ARRAY - RAM_BASE; // 0x603C

const MAX_UNITS = 32;
const STRIDE = 0x1E;

console.log('=== RAM Unit Array Dump (0xFF603C) ===');
console.log(`File: ${ramPath}`);
console.log(`Offset in ram: 0x${offset.toString(16).toUpperCase()}`);
console.log();

// Read each unit slot
let deadCount = 0;
for (let i = 0; i < MAX_UNITS; i++) {
  const off = offset + i * STRIDE;
  if (off + STRIDE > ram.length) break;
  
  const d = ram.slice(off, off + STRIDE);
  
  // Check if slot is in use (has any non-zero data)
  const active = d.some(b => b !== 0);
  
  if (!active) {
    deadCount++;
    if (deadCount <= 4) {
      console.log(`#${String(i).padStart(2)} | (inactive)`);
    }
    continue;
  }

  deadCount = 0;
  
  // Read key fields (big-endian, 68K is big-endian)
  const readWord = (pos) => {
    if (pos + 1 >= d.length) return 0;
    return (d[pos] << 8) | d[pos + 1];
  };
  
  const classId = d[0x00];
  const cmdId = d[0x1A];
  const x = d[0x06];
  const y = d[0x07];
  const flag = d[0x08];
  const item = d[0x09];
  const hp = readWord(0x0A);
  const mp = readWord(0x0C);
  const status = d[0x0E];
  const level = d[0x18];
  const extra = d[0x1C];
  
  // Team determination
  const teamFlag = flag & 0x0F;
  let team = '??';
  if (teamFlag === 0x00) team = 'PLAYER';
  else if (teamFlag === 0x01) team = 'ENEMY';
  else if (teamFlag === 0x02) team = 'NPC';
  else team = `0x${teamFlag.toString(16).padStart(2, '0')}`;
  
  // Hex dump
  const hex = Array.from(d).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  
  console.log(`#${String(i).padStart(2)} | ${team.padEnd(8)} class=${classId.toString(16).padStart(2, '0').toUpperCase()} cmd=${cmdId.toString(16).padStart(2, '0').toUpperCase()} xy=(${String(x).padStart(3)},${String(y).padStart(3)}) Lv=${level} HP=${hp} flag=${flag.toString(16).padStart(2, '0').toUpperCase()} item=${item.toString(16).padStart(2, '0').toUpperCase()} extra=${extra.toString(16).padStart(2, '0').toUpperCase()}`);
  console.log(`    raw: ${hex}`);
}

console.log();
console.log('=== Summary ===');
console.log(`Total active units found in RAM at 0xFF603C`);
