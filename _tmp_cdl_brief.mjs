import fs from 'fs';
const BASE = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(`${BASE}.cdl`);

console.log('ROM size: 0x', rom.length.toString(16), '=', rom.length, 'bytes');
console.log('CDL size:', cdl.length, 'bytes');

const HEADER = 0x10;
const PRG_SIZE = rom.length - HEADER;
const BANK_SIZE = 0x4000;
console.log('PRG ROM size:', PRG_SIZE, 'bytes', 'banks:', PRG_SIZE / BANK_SIZE);

// FCEUX CDL flags
const CODE_FLAG = 1;
const DATA_FLAG = 2;
let code = 0, data = 0, both = 0;
const dataRanges = {}; // by bank -> list of [start, end]
for (let i = 0; i < cdl.length; i++) {
  const f = cdl[i];
  if (f & CODE_FLAG) code++;
  if (f & DATA_FLAG) data++;
  if ((f & CODE_FLAG) && (f & DATA_FLAG)) both++;
  if (f & DATA_FLAG) {
    const bank = Math.floor(i / BANK_SIZE);
    const offset = i % BANK_SIZE;
    if (!dataRanges[bank]) dataRanges[bank] = [];
    const last = dataRanges[bank][dataRanges[bank].length - 1];
    if (last && offset === last[1] + 1) last[1] = offset;
    else dataRanges[bank].push([offset, offset]);
  }
}
console.log('\nCDL code bytes:', code, 'data bytes:', data, 'both:', both);
console.log('\nData-read ranges per PRG bank:');
for (const bank of Object.keys(dataRanges).sort((a,b)=>+a-+b)) {
  const ranges = dataRanges[bank];
  for (const [s, e] of ranges) {
    console.log(`  bank ${bank} 0x${s.toString(16).padStart(4,'0')}-0x${e.toString(16).padStart(4,'0')} (${e - s + 1} bytes)  CPU=0x${(0x8000 + s).toString(16)}`);
  }
}

// Also print what the first few bytes of PRG dump are
const prg = fs.readFileSync(`${BASE}.prg.bin`);
const unused = fs.readFileSync(`${BASE}.unuseddata.prg.bin`);
console.log('\nPRG dump (.prg.bin) size:', prg.length);
console.log('Unused data (.unuseddata.prg.bin) size:', unused.length);
console.log('\nFirst 128 bytes of PRG dump:');
for (let i = 0; i < Math.min(128, prg.length); i += 16) {
  const line = prg.subarray(i, i + 16);
  const hex = Array.from(line).map(b => b.toString(16).padStart(2,'0')).join(' ');
  const ascii = Array.from(line).map(b => b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.').join('');
  console.log(`  ${i.toString(16).padStart(4,'0')}: ${hex} |${ascii}|`);
}

// Find first bytes of each data range in the .prg.bin dump
console.log('\nSearching CDL data ranges in PRG dump for sequences...');
// Not useful directly; dump all .prg.bin as hex compact
if (prg.length) {
  console.log('\nFull PRG dump hex:');
  for (let i = 0; i < prg.length; i += 16) {
    const line = prg.subarray(i, i + 16);
    const hex = Array.from(line).map(b => b.toString(16).padStart(2,'0')).join(' ');
    console.log(`  ${i.toString(16).padStart(4,'0')}: ${hex}`);
  }
}
