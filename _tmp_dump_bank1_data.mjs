import fs from 'fs';
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa/romdata';
const rom = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(p + '/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl');
const H = 16, BANK = 16384;
function bankOffset(bank, addr) { return H + bank * BANK + (addr - 0x8000); }

// Dump all data-accessed regions in Bank 1
cdl.console = console;
console.log('=== Bank 1 data-accessed regions ===');
let ranges = [];
let last = -2;
for (let i = 1 * BANK; i < 2 * BANK; i++) {
  if (cdl[i] & 0x02) {
    if (i !== last + 1) ranges.push({ start: i, count: 0 });
    ranges[ranges.length - 1].count++;
    last = i;
  }
}
for (const r of ranges) {
  const cpu = 0x8000 + (r.start % BANK);
  const fileOff = r.start + H;
  const data = Array.from(rom.subarray(fileOff, fileOff + r.count));
  const hex = data.slice(0, 24).map(v => v.toString(16).padStart(2, '0')).join(' ');
  const printable = data.slice(0, 24).map(v => (v >= 0x20 && v < 0x7f) ? String.fromCharCode(v) : '.').join('');
  console.log(`CDL 0x${r.start.toString(16)} CPU 0x${cpu.toString(16)} len=${r.count}: ${hex} | ${printable}`);
}

// Also dump Bank 1 roster table for comparison
console.log('\n=== Roster table at CPU 0xAA47 ===');
const rosterOff = bankOffset(1, 0xAA47);
for (let i = 0; i < 128; i += 16) {
  const hex = Array.from(rom.subarray(rosterOff + i, rosterOff + i + 16)).map(v => v.toString(16).padStart(2, '0')).join(' ');
  console.log(`0x${(0xAA47 + i).toString(16)}: ${hex}`);
}
