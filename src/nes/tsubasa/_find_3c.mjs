import { readFileSync } from 'fs';

const rom = readFileSync('rom.nes');
const prg = rom[4];
const base = 16;
const bankSize = 8192;
const names = ['bank_00','bank_01','bank_02','bank_03','bank_04','bank_05',
               'bank_06','bank_07','bank_08','bank_09','bank_10','bank_11',
               'bank_12','bank_13','bank_14','bank_15','bank_30','bank_31'];

for (let b = 0; b < prg; b++) {
  const offset = base + b * bankSize;
  const data = rom.subarray(offset, offset + bankSize);
  const hits = [];
  for (let i = 0; i < bankSize; i++) {
    if (data[i] === 0x3C) {
      hits.push(`  $${i.toString(16).toUpperCase().padStart(4, '0')}: $3C`);
    }
  }
  if (hits.length > 0) {
    const name = b < names.length ? names[b] : `bank_${b}`;
    console.log(`${name} (ROM 0x${offset.toString(16)}): ${hits.length} × $3C`);
    hits.forEach(h => console.log(h));
  }
}
