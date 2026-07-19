import { readFileSync } from 'fs';

const rom = readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const prgOffset = 16;
const prgSize = 256 * 1024;

// Check CDL file - is it aligned with PRG or includes header?
const cdl = readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-prg-not-logged-15.13.cdl');
console.log('CDL size:', cdl.length, 'bytes');
console.log('First 20 bytes of CDL:', Array.from(cdl.slice(0, 20)).map(v => v.toString(16).padStart(2,'0')).join(' '));

// Check bytes at PRG $10000 offset (Bank $04)
const cdlAt10000 = cdl[0x10000];
const cdlAt10010 = cdl[0x10010];
const cdlAt10016 = cdl[0x10016];
console.log(`CDL[0x10000]=0x${cdlAt10000?.toString(16)}, CDL[0x10010]=0x${cdlAt10010?.toString(16)}, CDL[0x10016]=0x${cdlAt10016?.toString(16)}`);

// Check if CDL matches PRG directly (no header offset)
// PRG byte at offset 16 in .nes = PRG address $8000 (Bank $00)
// If CDL is aligned: CDL[0] = first byte of .nes = header ID 'N'
// If CDL is PRG-aligned: CDL[0] = first PRG byte (at offset 16)
const prgByte0 = rom[prgOffset];
console.log('PRG[0] (Bank $00 $8000) =', '0x' + prgByte0.toString(16));

// Let's check what's at CDL offset corresponding to Bank $04
// If CDL includes header: Bank $04 starts at CDL[prgOffset + 0x10000]  
// If CDL is PRG-aligned: Bank $04 starts at CDL[0x10000]
// Bank $04 in PRG corresponds to .nes file offset 16 + 0x10000 = 0x10010

// Actually let me just look at multiple offset hypotheses
// For Bank $00: PRG offset 0x0000, NES offset 0x0010
// For Bank $04: PRG offset 0x10000, NES offset 0x10010
// CDL positions:
//  - With header: [0x10010]
//  - Without header: [0x10000]

console.log('\nCDL values for key Bank $04 offsets:');
for (let off = 0x10000; off <= 0x10020; off++) {
  const b = cdl[off];
  if (b !== 0 && b !== undefined) {
    console.log(`  CDL[0x${off.toString(16)}] = 0x${b.toString(16)}`);
  }
}

// Check around NES+PRG offset
console.log('\nCDL around NES offset 0x10010 (Bank $04 in .nes):');
for (let i = 0x10010; i <= 0x10030; i++) {
  const b = cdl[i];
  if (b !== 0) {
    console.log(`  CDL[0x${i.toString(16)}] = 0x${b.toString(16)}`);
  }
}

// Now let's look at the CDL for Banks $02, $05, $09, $0A
console.log('\n=== CDL Data (0x02) regions in Bank $05 (PRG $14000-$17FFF) ===');
// Using PRG-aligned (no header) offset
const bank5Offset = 0x14000;
const bank5Size = 0x4000;
let dataStart = -1;
for (let i = 0; i < bank5Size; i++) {
  const off = bank5Offset + i;
  if (off >= cdl.length) break;
  const b = cdl[off];
  if (b === 0x02) {
    if (dataStart === -1) dataStart = i;
  } else {
    if (dataStart !== -1 && i - dataStart >= 8) {
      const addr = 0x14000 + dataStart;
      const size = i - dataStart;
      const snippet = Array.from(rom.slice(prgOffset + addr, prgOffset + addr + Math.min(size, 24)))
        .map(v => v.toString(16).padStart(2,'0')).join(' ');
      console.log(`  $${addr.toString(16)}: ${size}B: ${snippet}`);
    }
    dataStart = -1;
  }
}

console.log('\n=== CDL Data (0x02) regions in Bank $02 (PRG $08000-$0BFFF) ===');
dataStart = -1;
for (let i = 0; i < 0x4000; i++) {
  const off = 0x08000 + i;
  if (off >= cdl.length) break;
  const b = cdl[off];
  if (b === 0x02) {
    if (dataStart === -1) dataStart = i;
  } else {
    if (dataStart !== -1 && i - dataStart >= 8) {
      const addr = 0x08000 + dataStart;
      const size = i - dataStart;
      const snippet = Array.from(rom.slice(prgOffset + addr, prgOffset + addr + Math.min(size, 24)))
        .map(v => v.toString(16).padStart(2,'0')).join(' ');
      console.log(`  $${addr.toString(16)}: ${size}B: ${snippet}`);
    }
    dataStart = -1;
  }
}

console.log('\n=== CDL Data (0x02) regions in Bank $09 (PRG $24000-$27FFF) ===');
dataStart = -1;
for (let i = 0; i < 0x4000; i++) {
  const off = 0x24000 + i;
  if (off >= cdl.length) break;
  const b = cdl[off];
  if (b === 0x02) {
    if (dataStart === -1) dataStart = i;
  } else {
    if (dataStart !== -1 && i - dataStart >= 8) {
      const addr = 0x24000 + dataStart;
      const size = i - dataStart;
      const snippet = Array.from(rom.slice(prgOffset + addr, prgOffset + addr + Math.min(size, 24)))
        .map(v => v.toString(16).padStart(2,'0')).join(' ');
      console.log(`  $${addr.toString(16)}: ${size}B: ${snippet}`);
    }
    dataStart = -1;
  }
}

console.log('\n=== CDL Data (0x02) regions in Bank $0A (PRG $28000-$2BFFF) ===');
dataStart = -1;
for (let i = 0; i < 0x4000; i++) {
  const off = 0x28000 + i;
  if (off >= cdl.length) break;
  const b = cdl[off];
  if (b === 0x02) {
    if (dataStart === -1) dataStart = i;
  } else {
    if (dataStart !== -1 && i - dataStart >= 8) {
      const addr = 0x28000 + dataStart;
      const size = i - dataStart;
      const snippet = Array.from(rom.slice(prgOffset + addr, prgOffset + addr + Math.min(size, 24)))
        .map(v => v.toString(16).padStart(2,'0')).join(' ');
      console.log(`  $${addr.toString(16)}: ${size}B: ${snippet}`);
    }
    dataStart = -1;
  }
}

console.log('\n=== CDL Data (0x02) regions in Bank $0C (PRG $30000-$33FFF) ===');
dataStart = -1;
for (let i = 0; i < 0x4000; i++) {
  const off = 0x30000 + i;
  if (off >= cdl.length) break;
  const b = cdl[off];
  if (b === 0x02) {
    if (dataStart === -1) dataStart = i;
  } else {
    if (dataStart !== -1 && i - dataStart >= 8) {
      const addr = 0x30000 + dataStart;
      const size = i - dataStart;
      const snippet = Array.from(rom.slice(prgOffset + addr, prgOffset + addr + Math.min(size, 24)))
        .map(v => v.toString(16).padStart(2,'0')).join(' ');
      console.log(`  $${addr.toString(16)}: ${size}B: ${snippet}`);
    }
    dataStart = -1;
  }
}
