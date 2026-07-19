import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');
const prg = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.prg.bin');
const unused = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.unuseddata.prg.bin');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');

const BANK = 16384;
const H = 16;

console.log('PRG bin size:', prg.length);
console.log('Unused data size:', unused.length);
console.log('CDL size:', cdl.length);
console.log('Original ROM size:', rom.length);

// PRG bin includes NES header? 393232 = 384KB + 16, so yes
const headerInPrg = prg.subarray(0, 16);
console.log('PRG bin header bytes:', Array.from(headerInPrg).map(v => v.toString(16).padStart(2, '0')).join(' '));

// CDL offset 0 corresponds to PRG ROM byte 0, which is file offset 16 in .nes
function bankOfCdlOffset(off) { return Math.floor(off / BANK); }
function addrOfCdlOffset(off) { return (off % BANK) + 0x8000; }

const stats = {};
for (let i = 0; i < cdl.length; i++) {
  const f = cdl[i];
  const b = bankOfCdlOffset(i);
  stats[b] = stats[b] || { code: 0, data: 0, operand: 0, ppu: 0, other: 0 };
  if (f & 0x01) stats[b].code++;
  if (f & 0x02) stats[b].data++;
  if (f & 0x04) stats[b].operand++;
  if (f & 0x10) stats[b].ppu++;
  if (f & 0x20) stats[b].other++;
}
console.log('\nCDL flags by bank:');
for (const b of Object.keys(stats).sort((a, b) => parseInt(a) - parseInt(b))) {
  const s = stats[b];
  console.log(`Bank ${b.padStart(2)}: code=${s.code.toString().padStart(6)} data=${s.data.toString().padStart(6)} operand=${s.operand.toString().padStart(6)} ppu=${s.ppu.toString().padStart(4)} other=${s.other.toString().padStart(6)}`);
}

// Find data-accessed ranges in bank 0C (pointer/attr block), bank 05, bank 09, bank 01 (roster)
function dumpDataAccessed(bank) {
  const start = bank * BANK;
  const end = start + BANK;
  console.log(`\n--- Data-accessed bytes in Bank ${bank} ---`);
  let last = -2;
  let ranges = [];
  for (let i = start; i < end; i++) {
    if (cdl[i] & 0x02) {
      if (i !== last + 1) ranges.push({ start: i, count: 0 });
      ranges[ranges.length - 1].count++;
      last = i;
    }
  }
  for (const r of ranges.slice(0, 30)) {
    const cpuAddr = addrOfCdlOffset(r.start);
    const data = Array.from(prg.subarray(r.start + 16, r.start + 16 + Math.min(r.count, 16))).map(v => v.toString(16).padStart(2, '0')).join(' ');
    console.log(`  CDL 0x${r.start.toString(16)} CPU 0x${cpuAddr.toString(16)} len=${r.count}: ${data}`);
  }
  return ranges;
}

console.log('\n');
dumpDataAccessed(0x01);
dumpDataAccessed(0x05);
dumpDataAccessed(0x09);
dumpDataAccessed(0x0C);
