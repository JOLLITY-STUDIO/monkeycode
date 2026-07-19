import fs from 'fs';
const BASE = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能';
const rom = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes');
const cdl = fs.readFileSync(`${BASE}.cdl`);
const prg = fs.readFileSync(`${BASE}.prg.bin`);

const HEADER = 0x10;
const BANK_SIZE = 0x4000;
const PRG_SIZE = rom.length - HEADER;
console.log('ROM size:', rom.length, 'PRG size:', PRG_SIZE, 'banks:', PRG_SIZE / BANK_SIZE);
console.log('CDL bytes:', cdl.length, 'prg.bin bytes:', prg.length);

const CODE_FLAG = 1;
const DATA_FLAG = 2;
let code = 0, data = 0, both = 0;
const dataRanges = {};
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
console.log('CDL code flags:', code, 'data flags:', data, 'both:', both);
console.log('Data-read ranges per PRG bank:');
for (const bank of Object.keys(dataRanges).sort((a,b)=>+a-+b)) {
  for (const [s, e] of dataRanges[bank]) {
    console.log(`  bank ${bank} 0x${s.toString(16).padStart(4,'0')}-0x${e.toString(16).padStart(4,'0')} (${e-s+1} bytes) CPU 0x${(0x8000+s).toString(16)}`);
  }
}

// Show first 64 bytes of prg.bin
console.log('\nprg.bin first 64 bytes:');
for (let i = 0; i < Math.min(64, prg.length); i += 16) {
  console.log('  ' + Array.from(prg.subarray(i, i+16)).map(b => b.toString(16).padStart(2,'0')).join(' '));
}

// Count nonzero in prg.bin
let nonzero = 0;
for (const b of prg) if (b) nonzero++;
console.log('prg.bin nonzero:', nonzero, '/', prg.length);
