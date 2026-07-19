import { readFileSync } from 'fs';

// Read .nes ROM
const rom = readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const prgOffset = 16; // skip iNES header
const prgSize = 256 * 1024; // 256KB PRG

console.log('ROM size:', rom.length, 'bytes');
console.log('PRG starts at offset', prgOffset);
console.log('PRG size:', prgSize, 'bytes');

// Extract Bank $04 (PRG $10000-$13FFF)
const bank4Offset = 0x10000;
const bank4Data = new Uint8Array(rom.slice(prgOffset + bank4Offset, prgOffset + bank4Offset + 0x4000));
console.log('\n=== Bank $04 (PRG $10000-$13FFF) ===');
console.log('Bank $04 size:', bank4Data.length, 'bytes');

// Try to find player-like data structures
// In NES sports games, player stats are typically small values (0-99 decimal, 0x00-0x63)
// arranged in groups of 11 (players per team) or per player record

// Strategy: Search for contiguous regions of bytes where:
// - Values are in range 0x08-0x60 (plausible stats)
// - Arranged in patterns

// First, find all $AA separators (known from previous analysis)
console.log('\n=== $AA separator locations ===');
let aaCount = 0;
for (let i = 0; i < bank4Data.length; i++) {
  if (bank4Data[i] === 0xAA) {
    aaCount++;
    if (aaCount <= 30) {
      console.log(`  $${(0x10000 + i).toString(16)}: $AA`);
    }
  }
}
console.log(`Total $AA separators: ${aaCount}`);

// Look for player stats: contiguous values 0x08-0x60 in groups
console.log('\n=== Groups of 7+ contiguous "stat-like" values (0x08-0x60) ===');
let inGroup = false;
let groupStart = -1;
let groupVals = [];
for (let i = 0; i < bank4Data.length; i++) {
  const b = bank4Data[i];
  if (b >= 0x08 && b <= 0x60) {
    if (!inGroup) {
      inGroup = true;
      groupStart = i;
      groupVals = [b];
    } else {
      groupVals.push(b);
    }
  } else {
    if (inGroup && groupVals.length >= 6) {
      const addr = 0x10000 + groupStart;
      console.log(`  $${addr.toString(16)}: [${groupVals.length}] ${groupVals.map(v => '0x' + v.toString(16).padStart(2,'0')).join(', ')}`);
      if (groupVals.length <= 22) { } // don't skip
    }
    inGroup = false;
    groupVals = [];
  }
}

// Also check CDL to see data regions in Bank $04
const cdl = readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-prg-not-logged-15.13.cdl');
console.log('\n=== CDL data regions in Bank $04 ($10000-$13FFF) ===');
let dataStart = -1;
for (let i = 0; i < bank4Data.length; i++) {
  const cdlByte = cdl[prgOffset - 16 + bank4Offset + i]; // adjust for header offset
  if (cdlByte === 0x02) { // Data
    if (dataStart === -1) dataStart = i;
  } else {
    if (dataStart !== -1) {
      const size = i - dataStart;
      if (size >= 8) {
        const addr = 0x10000 + dataStart;
        const snippet = Array.from(bank4Data.slice(dataStart, Math.min(dataStart + 20, i)))
          .map(v => v.toString(16).padStart(2, '0')).join(' ');
        console.log(`  $${addr.toString(16)}: ${size} bytes: ${snippet}`);
      }
      dataStart = -1;
    }
  }
}

// Look at Bank $04 data near the beginning (non-code region)
console.log('\n=== First 256 bytes of Bank $04 (raw hex) ===');
let hexLine = '';
for (let i = 0; i < Math.min(256, bank4Data.length); i += 16) {
  const addr = (0x10000 + i).toString(16);
  const bytes = Array.from(bank4Data.slice(i, i + 16))
    .map(v => v.toString(16).padStart(2, '0')).join(' ');
  const ascii = Array.from(bank4Data.slice(i, i + 16))
    .map(v => (v >= 0x20 && v < 0x7F) ? String.fromCharCode(v) : '.').join('');
  console.log(`  ${addr}: ${bytes}  ${ascii}`);
}
