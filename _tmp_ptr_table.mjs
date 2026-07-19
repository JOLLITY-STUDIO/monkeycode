import fs from 'fs';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const HEADER = 0x10;
const BANK_SIZE = 0x4000;

// Pointer table at CPU 0xA9DA in bank 15 (0x8000-0xBFFF), data pointers likely to bank 14 (0xC000-0xFFFF)
const bank15Base = 15 * BANK_SIZE + HEADER;
const bank14Base = 14 * BANK_SIZE + HEADER;
const ptrTableCpu = 0xA9DA;
const ptrTableOff = bank15Base + (ptrTableCpu - 0x8000);

function romOffsetForCpu(addr, bank) {
  // bank 0-15: CPU mapping depends on mapper. For now assume linear banks 0x8000-0xBFFF.
  // For bank 14 (0xC000-0xFFFF), offset = bank14Base + (addr - 0xC000)
  // For bank 15 (0x8000-0xBFFF), offset = bank15Base + (addr - 0x8000)
  if (addr >= 0x8000 && addr < 0xC000) return bank15Base + (addr - 0x8000);
  if (addr >= 0xC000 && addr <= 0xFFFF) return bank14Base + (addr - 0xC000);
  return null;
}

// Read pointer table until we hit a non-pointer or end of block (0xAB85)
const endCpu = 0xAB85;
const tableBytes = rom.subarray(ptrTableOff, bank15Base + (endCpu - 0x8000) + 1);
const ptrs = [];
for (let i = 0; i < tableBytes.length - 1; i += 2) {
  const lo = tableBytes[i];
  const hi = tableBytes[i + 1];
  const addr = (hi << 8) | lo;
  ptrs.push(addr);
}
console.log('Pointer table @CPU 0xA9DA, entries:', ptrs.length);
console.log(ptrs.map((a, i) => `${i}: 0x${a.toString(16)}`).join('\n'));

// Dump first 64 bytes of each pointer target
for (let i = 0; i < Math.min(40, ptrs.length); i++) {
  const p = ptrs[i];
  const off = romOffsetForCpu(p, 0);
  if (off === null || off >= rom.length) { console.log(`  ${i}: invalid pointer 0x${p.toString(16)}`); continue; }
  const data = rom.subarray(off, off + 64);
  console.log(`\n--- Entry ${i} @CPU 0x${p.toString(16)} (ROM 0x${off.toString(16)}) ---`);
  for (let j = 0; j < 64; j += 16) {
    const line = data.subarray(j, j + 16);
    const hex = Array.from(line).map(b => b.toString(16).padStart(2, '0')).join(' ');
    const ascii = Array.from(line).map(b => b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.').join('');
    console.log(`  0x${(p + j).toString(16).padStart(4,'0')}: ${hex} |${ascii}|`);
  }
}

// Also check if any of the pointer targets contain 0x94 or 0x1A
console.log('\n--- Searching for 0x94 and 0x1A in each entry ---');
for (let i = 0; i < Math.min(ptrs.length, 40); i++) {
  const p = ptrs[i];
  const off = romOffsetForCpu(p, 0);
  if (off === null) continue;
  const data = rom.subarray(off, off + 256);
  const has94 = data.includes(0x94);
  const has1A = data.includes(0x1A);
  const has94_1A = [];
  for (let j = 0; j < data.length - 1; j++) if (data[j] === 0x94 && data[j + 1] === 0x1A) has94_1A.push(j);
  if (has94_1A.length) console.log(`  Entry ${i}: ば pattern [94,1A] at offset(s) ${has94_1A.map(x=>'0x'+x.toString(16)).join(', ')}`);
}
