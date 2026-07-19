const fs = require('fs');
const CDL_CODE = 1, CDL_DATA = 2;
const BANK_SIZE = 16384, PRG_BANKS = 24;

const BASE = 'src/nes/tsubasa/romdata/';
const CDL_PATH = BASE + 'Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl';
const PRG_PATH = BASE + 'Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能-strippeddata.prg.bin';

const cdl = fs.readFileSync(CDL_PATH);
let prg = fs.readFileSync(PRG_PATH);

// Handle possible iNES header
const hasHeader = prg[0] === 0x4E && prg[1] === 0x45 && prg[2] === 0x53 && prg[3] === 0x1A;
if (hasHeader) { prg = prg.subarray(16); }
if (prg.length < PRG_BANKS * BANK_SIZE) { console.log('WARNING: PRG too small!', prg.length); process.exit(1); }

console.log(`CDL=${cdl.length} PRG=${prg.length} hasHeader=${hasHeader}`);

// ====== 1. Per-bank ======
console.log('\n=== Per-Bank ===');
let bd = [];
for (let b = 0; b < PRG_BANKS; b++) {
  const s = b * BANK_SIZE;
  let co = 0, da = 0;
  for (let i = s; i < s + BANK_SIZE; i++) { if (cdl[i] === CDL_CODE) co++; else if (cdl[i] === CDL_DATA) da++; }
  if (co + da > 0) { bd.push({ b, co, da }); console.log(`B${b.toString(16).padStart(2,'0').toUpperCase()}: C=${String(co).padStart(5)} D=${String(da).padStart(5)}`); }
}

// ====== 2. Known tables ======
console.log('\n=== Known tables ===');
const tabs = [
  ['statBlock05', 5, 0xABDC], ['statBlock03', 3, 0x951B], ['skills', 9, 0x9620],
  ['typeMarkers09', 9, 0x9360], ['classType', 0xC, 0x86B8], ['pointerTable', 0xC, 0x8DC2],
  ['actionTable', 9, 0x9720],
];
for (const [n, bank, addr] of tabs) {
  const off = bank * BANK_SIZE + (addr - 0x8000);
  let d = 0; for (let i = 0; i < 64; i++) if (cdl[off + i] === CDL_DATA) d++;
  console.log(`  ${n}: ${d}/64 DATA`);
}

// ====== 3. Bank 0C deep dive ======
console.log('\n=== Bank 0C: full data regions ===');
const b0c = 0xC * BANK_SIZE;
let dr = [], inD = false, rs = 0;
for (let i = b0c; i < b0c + BANK_SIZE; i++) {
  const addr = 0x8000 + (i - b0c);
  if (cdl[i] === CDL_DATA && !inD) { inD = true; rs = addr; }
  else if (cdl[i] !== CDL_DATA && inD) {
    inD = false; if (addr - rs >= 1) dr.push({ s: rs, e: addr - 1 });
  }
}
if (inD) dr.push({ s: rs, e: 0xBFFF });
for (const r of dr) {
  const poff = b0c + (r.s - 0x8000), sz = r.e - r.s + 1;
  const hex = Array.from(prg.slice(poff, poff + Math.min(32, sz))).map(b => b.toString(16).padStart(2, '0')).join(' ');
  console.log(`  0x${r.s.toString(16).padStart(4,'0')}-0x${r.e.toString(16).padStart(4,'0')} (${sz}B): ${hex}`);
}

// ====== 4. Tsubasa attr block search ======
console.log('\n=== Tsubasa attr block body in PRG+CDL ===');
const body = [0xE4, 0xFC, 0x01, 0x10, 0x06, 0x02, 0xF5, 0x16, 0xFC, 0x01, 0x03, 0xA4, 0x07, 0x2D];
for (let b = 0; b < PRG_BANKS; b++) {
  const s = b * BANK_SIZE;
  for (let i = s; i < s + BANK_SIZE - body.length; i++) {
    let m = true;
    for (let j = 0; j < body.length; j++) { if (prg[i + j] !== body[j]) { m = false; break; } }
    if (m) {
      const addr = 0x8000 + (i - s);
      let marks = ''; for (let j = 0; j < body.length; j++) marks += cdl[i + j] === CDL_DATA ? 'D' : cdl[i + j] === CDL_CODE ? 'C' : '.';
      console.log(`  Bank ${b.toString(16).padStart(2,'0')} CPU 0x${addr.toString(16).padStart(4,'0')}: CDL=[${marks}]`);
      // Dump context
      const ctx = Array.from(prg.slice(i - 6, i + body.length + 8)).map(b => b.toString(16).padStart(2,'0')).join(' ');
      console.log(`    context: ${ctx}`);
    }
  }
}

// ====== 5. Bank 0C code near attr regions ======
console.log('\n=== Bank 0C code regions ===');
let cr = [], inC = false, cs = 0;
for (let i = b0c; i < b0c + BANK_SIZE; i++) {
  const addr = 0x8000 + (i - b0c);
  if (cdl[i] === CDL_CODE && !inC) { inC = true; cs = addr; }
  else if (cdl[i] !== CDL_CODE && inC) { inC = false; if (addr - cs >= 4) cr.push({ s: cs, e: addr - 1 }); }
}
if (inC) cr.push({ s: cs, e: 0xBFFF });
for (const r of cr) {
  const poff = b0c + (r.s - 0x8000), sz = r.e - r.s + 1;
  const hex = Array.from(prg.slice(poff, poff + Math.min(24, sz))).map(b => b.toString(16).padStart(2, '0')).join(' ');
  console.log(`  0x${r.s.toString(16).padStart(4,'0')} (${sz}B): ${hex}${sz>24?'...':''}`);
}

// ====== 6. Bank 16/17 (fixed bank) code ======
console.log('\n=== Fixed bank (16+17) code ===');
for (const fb of [0x16, 0x17]) {
  const s = fb * BANK_SIZE;
  let cr2 = [], inC2 = false, cs2 = 0;
  for (let i = s; i < s + BANK_SIZE; i++) {
    const addr = 0x8000 + (i - s);
    if (cdl[i] === CDL_CODE && !inC2) { inC2 = true; cs2 = addr; }
    else if (cdl[i] !== CDL_CODE && inC2) { inC2 = false; if (addr - cs2 >= 4) cr2.push({ s: cs2, e: addr - 1 }); }
  }
  if (inC2) cr2.push({ s: cs2, e: 0xBFFF });
  console.log(`Bank ${fb.toString(16).padStart(2,'0')}: ${cr2.length} regions`);
  for (const r of cr2) {
    const offInBank = r.s >= 0xC000 ? r.s - 0x4000 : r.s - 0x8000;
    const poff = s + offInBank, sz = r.e - r.s + 1;
    const hex = Array.from(prg.slice(poff, poff + Math.min(16, sz))).map(b => b.toString(16).padStart(2, '0')).join(' ');
    console.log(`  0x${r.s.toString(16).padStart(4,'0')} (${sz}B): ${hex}${sz>16?'...':''}`);
  }
}

// ====== 7. Data reads in ALL banks (0x8000-0xBFFF switchable area) ======
console.log('\n=== All banks: data regions in 0x8000-0xBFFF ===');
for (let b = 0; b < PRG_BANKS; b++) {
  const s = b * BANK_SIZE;
  let dr3 = [], inD3 = false, rs3 = 0;
  for (let i = s; i < s + 0x4000; i++) {
    const addr = 0x8000 + (i - s);
    if (cdl[i] === CDL_DATA && !inD3) { inD3 = true; rs3 = addr; }
    else if (cdl[i] !== CDL_DATA && inD3) {
      inD3 = false; if (addr - rs3 >= 1) dr3.push({ s: rs3, e: addr - 1 });
    }
  }
  if (inD3) dr3.push({ s: rs3, e: 0xBFFF });
  if (dr3.length > 0) {
    for (const r of dr3) {
      const poff = s + (r.s - 0x8000), sz = r.e - r.s + 1;
      const hex = Array.from(prg.slice(poff, poff + Math.min(24, sz))).map(b => b.toString(16).padStart(2, '0')).join(' ');
      console.log(`  B${b.toString(16).padStart(2,'0')} 0x${r.s.toString(16).padStart(4,'0')} (${sz}B): ${hex}${sz>24?'...':''}`);
    }
  }
}
