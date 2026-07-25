import { readFileSync, writeFileSync } from 'fs';

const cdl = readFileSync('src/legacy/romdata/Captain Tsubasa II - Super Striker (Japan)-openning-tecmo显示到黑屏未出现人物289帧.cdl');

// CDL: 32 x 16KB slots. PRG=0-15, CHR=16-31
// MMC3 bank N (8KB) = CDL slot floor(N/2) @ offset (N%2)*8192

for (let b = 0; b < 16; b++) {
  const cdlSlot = Math.floor(b / 2);
  const halfOff = (b % 2) * 8192;
  const off = cdlSlot * 16384 + halfOff;
  let code = 0, data = 0;
  let dataRanges = [];
  for (let i = 0; i < 8192; i++) {
    const byte = cdl[off + i];
    if (byte & 1) code++;
    if (byte & 2) {
      data++;
      // Track data ranges
      const absAddr = 0x8000 + i;
      if (dataRanges.length === 0 || absAddr > dataRanges[dataRanges.length - 1].end + 1) {
        dataRanges.push({ start: absAddr, end: absAddr, size: 1 });
      } else {
        dataRanges[dataRanges.length - 1].end = absAddr;
        dataRanges[dataRanges.length - 1].size++;
      }
    }
  }
  const label = `MMC3 bank ${String(b).padStart(2)}`;
  if (code + data > 0) {
    console.log(`${label}: code=${code} data=${data} total=${code+data}`);
    for (const r of dataRanges) {
      console.log(`  data: $${r.start.toString(16).toUpperCase()}-$${r.end.toString(16).toUpperCase()} (${r.size}B)`);
    }
  } else {
    console.log(`${label}: (未访问)`);
  }
}

// Also check CHR 0,10,14,15
for (const b of [16, 26, 30, 31]) {
  const off = b * 16384;
  let code = 0, data = 0;
  for (let i = 0; i < 16384; i++) {
    const byte = cdl[off + i];
    if (byte & 1) code++;
    if (byte & 2) data++;
  }
  console.log(`CHR bank ${b-16}: code=${code} data=${data} total=${code+data}`);
}

// ===== DETAIL: Check MMC3 bank 13 specifically =====
console.log('\n===== MMC3 bank 13: who calls it? =====');
const b13Slot = Math.floor(13 / 2); // slot 6
const b13Half = (13 % 2) * 8192;     // second half
const b13Off = b13Slot * 16384 + b13Half;
console.log(`MMC3 bank 13 = CDL slot ${b13Slot}, offset $${b13Off.toString(16)}`);

let d13 = 0, c13 = 0;
let dataR13 = [];
for (let i = 0; i < 8192; i++) {
  const byte = cdl[b13Off + i];
  if (byte & 1) c13++;
  if (byte & 2) {
    d13++;
    const absAddr = 0x8000 + i;
    if (dataR13.length === 0 || absAddr > dataR13[dataR13.length - 1].end + 1) {
      dataR13.push({ start: absAddr, end: absAddr, size: 1 });
    } else {
      dataR13[dataR13.length - 1].end = absAddr;
      dataR13[dataR13.length - 1].size++;
    }
  }
}
console.log(`MMC3 bank 13 (tecmo289): code=${c13} data=${d13}`);
for (const r of dataR13) {
  console.log(`  data accessed: $${r.start.toString(16).toUpperCase()}-$${r.end.toString(16).toUpperCase()} (${r.size}B)`);
}

// Now check who WRITES to $8000/$8001 (MMC3 bank switch reg) that selects bank 13
// MMC3 bank regs: $8000=bank select, $8001=bank data
// bank 13 in $8000-$9FFF would need: $8000=$06 (select $8000-$9FFF), $8001=$0D (bank 13)
// But we need to check the CODE that did this, which is in other CDL data
console.log('\n===== More detail: What CODE talks to MMC3 regs? =====');
// Look at CDL slot 0 (bank 0+1) for writes to 0x8000/0x8001
const b0Off = 0;
let bankSelWrites = 0;
for (let i = 0; i < 16384; i++) {
  if (cdl[b0Off + i] & 1) bankSelWrites++;
}
console.log(`MMC3 bank 0+1 code bytes (tecmo289): ${bankSelWrites}`);
