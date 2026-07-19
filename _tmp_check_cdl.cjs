const fs = require('fs');
const CDL_CODE = 1, CDL_DATA = 2;
const BANK_SIZE = 16384;
const PRG_BANKS = 24;

const CDL_PATH = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl';
const PRG_PATH = 'src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.prg.bin';

const cdl = fs.readFileSync(CDL_PATH);
const prg = fs.readFileSync(PRG_PATH);

// ========== 1. Full per-bank summary ==========
console.log('=== All Banks: code/data counts ===');
let totalCode = 0, totalData = 0;
for (let b = 0; b < PRG_BANKS; b++) {
  const start = b * BANK_SIZE;
  let code = 0, data = 0;
  for (let i = start; i < start + BANK_SIZE; i++) {
    if (cdl[i] === CDL_CODE) code++;
    else if (cdl[i] === CDL_DATA) data++;
  }
  if (code > 0 || data > 0) {
    console.log(`Bank ${b.toString(16).toUpperCase().padStart(2,'0')}: code=${code.toString().padStart(5)} data=${data.toString().padStart(5)}`);
  }
  totalCode += code; totalData += data;
}
console.log(`TOTAL: code=${totalCode} data=${totalData}`);

// ========== 2. Find ALL data reads across ALL banks (filter to 0x1000-0x3FFF within bank) ==========
console.log('\n=== Data reads in 0x9000-0xBFFF range per bank ===');
for (let b = 0; b < PRG_BANKS; b++) {
  const start = b * BANK_SIZE;
  // 0x9000-0xBFFF = offset 0x1000-0x3FFF within bank
  let count = 0;
  const ranges = [];
  let inRange = false, rs = 0;
  for (let i = start + 0x1000; i < start + 0x4000; i++) {
    if (cdl[i] === CDL_DATA && !inRange) { inRange = true; rs = 0x8000 + (i - start); }
    else if (cdl[i] !== CDL_DATA && inRange) {
      inRange = false;
      ranges.push({ s: rs, e: 0x8000 + (i - 1 - start) });
      count += (0x8000 + (i - start)) - rs;
    }
  }
  if (inRange) { ranges.push({ s: rs, e: 0xBFFF }); count += 0xC000 - rs; }
  
  if (count > 0) {
    const detail = ranges.map(r => `0x${r.s.toString(16).padStart(4,'0')}-0x${r.e.toString(16).padStart(4,'0')}`).join(', ');
    console.log(`Bank ${b.toString(16).toUpperCase().padStart(2,'0')}: ${count} bytes in 0x9000-0xBFFF: ${detail}`);
    
    // Dump some bytes from the first range
    const roff = ranges[0].s - 0x8000 + b * BANK_SIZE;
    const hex = Array.from(prg.slice(roff, Math.min(roff + 32, roff + ranges[0].e - ranges[0].s + 1)))
      .map(b => b.toString(16).padStart(2,'0')).join(' ');
    console.log(`  hex: ${hex}`);
  }
}

// ========== 3. Specifically find Tsubasa attr block bytes ==========
console.log('\n=== Search for Tsubasa attr block body bytes in CDL data ===');
const tsubasaBody = [0xE4, 0xFC, 0x01, 0x10, 0x06, 0x02, 0xF5, 0x16, 0xFC, 0x01, 0x03, 0xA4, 0x07, 0x2D];

// Search in PRG
for (let b = 0; b < PRG_BANKS; b++) {
  const start = b * BANK_SIZE;
  for (let i = start; i < start + BANK_SIZE - tsubasaBody.length; i++) {
    let match = true;
    for (let j = 0; j < tsubasaBody.length; j++) {
      if (prg[i + j] !== tsubasaBody[j]) { match = false; break; }
    }
    if (match) {
      const cpuAddr = 0x8000 + (i - start);
      // Check CDL marks
      let cdlMarks = [];
      for (let j = 0; j < tsubasaBody.length; j++) {
        cdlMarks.push(cdl[i + j] === CDL_DATA ? 'D' : cdl[i + j] === CDL_CODE ? 'C' : '.');
      }
      console.log(`Found in Bank ${b.toString(16).toUpperCase().padStart(2,'0')} at CPU 0x${cpuAddr.toString(16).padStart(4,'0')}:`);
      console.log(`  CDL marks: ${cdlMarks.join('')}`);
    }
  }
}

// ========== 4. Scan Bank 0F code regions (if any) ==========
console.log('\n=== Bank 0F full scan ===');
const b0f = 0x0F * BANK_SIZE;
let codeRanges = [];
let inCode = false, cs = 0;
for (let i = b0f; i < b0f + BANK_SIZE; i++) {
  const cpuAddr = 0x8000 + (i - b0f);
  if (cdl[i] === CDL_CODE && !inCode) { inCode = true; cs = cpuAddr; }
  else if (cdl[i] !== CDL_CODE && inCode) {
    inCode = false;
    if (cpuAddr - cs >= 4) codeRanges.push({ s: cs, e: cpuAddr - 1 });
  }
}
if (inCode) codeRanges.push({ s: cs, e: 0xBFFF });
console.log(`Bank 0F code ranges: ${codeRanges.length}`);
for (const r of codeRanges) {
  const poff = b0f + (r.s - 0x8000);
  const size = r.e - r.s + 1;
  const hex = Array.from(prg.slice(poff, Math.min(poff + 8, poff + size)))
    .map(b => b.toString(16).padStart(2,'0')).join(' ');
  console.log(`  0x${r.s.toString(16).padStart(4,'0')} (${size}B): ${hex}...`);
}

// ========== 5. Check Bank 05 (statBlock05), Bank 03 (statBlock03), Bank 09 data reads ==========
console.log('\n=== Stat blocks CDL data read check ===');
const checks = [
  { name: 'statBlock05', bank: 5, addr: 0xABDC, len: 64 },
  { name: 'statBlock03', bank: 3, addr: 0x951B, len: 64 },
  { name: 'skills09', bank: 9, addr: 0x9620, len: 64 },
  { name: 'classType', bank: 0x0C, addr: 0x86B8, len: 64 },
];
for (const chk of checks) {
  const off = chk.bank * BANK_SIZE + (chk.addr - 0x8000);
  let dcount = 0;
  for (let i = 0; i < chk.len; i++) {
    if (cdl[off + i] === CDL_DATA) dcount++;
  }
  console.log(`${chk.name}: ${dcount}/${chk.len} bytes marked as DATA`);
}
