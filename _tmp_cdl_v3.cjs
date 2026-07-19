const fs = require('fs');
const CDL_CODE = 1, CDL_DATA = 2;
const BANK_SIZE = 16384, PRG_BANKS = 24;
const BASE = 'src/nes/tsubasa/romdata/';
const CDL_PATH = BASE + 'Captain Tsubasa II - Super Striker (Japan)-球员属性第一关大空翼以及技能.cdl';
const ROM_PATH = BASE + 'Captain Tsubasa II - Super Striker (Japan).nes';

const cdl = fs.readFileSync(CDL_PATH);
const rom = fs.readFileSync(ROM_PATH); // iNES header + PRG
const prg = rom.subarray(16); // strip header

console.log(`CDL=${cdl.length} ROM=${rom.length} PRG=${prg.length}`);

function prgOff(bank, cpuAddr) { return bank * BANK_SIZE + (cpuAddr - 0x8000); }
function cpuAddrOf(bank, off) { return 0x8000 + (off - bank * BANK_SIZE); }

// ====== 1. Verify known tables in ROM match extraction ======
console.log('\n=== ROM spot checks at known tables ===');
const spots = [
  ['statBlock05', 5, 0xABDC, 8],
  ['statBlock05+1', 5, 0xABE4, 8],
  ['statBlock03', 3, 0x951B, 6],
  ['classType', 0xC, 0x86B8, 8],
  ['pointerTable', 0xC, 0x8DC2, 8],
];
for (const [n, b, a, len] of spots) {
  const off = prgOff(b, a);
  const bytes = Array.from(prg.slice(off, off + len));
  console.log(`  ${n} (B${b.toString(16)} 0x${a.toString(16)}): ${bytes.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
}

// ====== 2. Per-bank CDL counts ======
console.log('\n=== Per-bank CDL ===');
for (let b = 0; b < PRG_BANKS; b++) {
  const s = b * BANK_SIZE; let co = 0, da = 0;
  for (let i = s; i < s + BANK_SIZE; i++) { if (cdl[i] === CDL_CODE) co++; else if (cdl[i] === CDL_DATA) da++; }
  if (co + da > 0) console.log(`B${b.toString(16).padStart(2,'0').toUpperCase()}: C=${String(co).padStart(5)} D=${String(da).padStart(5)}`);
}

// ====== 3. Data reads at known tables ======
console.log('\n=== Data reads at known tables (CDL DATA) ===');
const tabs = [
  ['statBlock05', 5, 0xABDC], ['statBlock03', 3, 0x951B], ['skills', 9, 0x9620],
  ['typeMarkers', 9, 0x9360], ['classType', 0xC, 0x86B8], ['pointerTable', 0xC, 0x8DC2],
];
for (const [n, b, a] of tabs) {
  const off = prgOff(b, a); let d = 0;
  for (let i = 0; i < 64; i++) if (cdl[off + i] === CDL_DATA) d++;
  console.log(`  ${n}: ${d}/64`);
}

// ====== 4. Data reads in attr block area (Bank 0C 0x9000-0xBFFF) ======
console.log('\n=== Bank 0C data regions (0x8000-0xBFFF) ===');
const b0c = 0xC * BANK_SIZE;
let dr = [], inD = false, rs = 0;
for (let i = b0c; i < b0c + BANK_SIZE; i++) {
  const addr = 0x8000 + (i - b0c);
  if (cdl[i] === CDL_DATA && !inD) { inD = true; rs = addr; }
  else if (cdl[i] !== CDL_DATA && inD) { inD = false; dr.push({ s: rs, e: addr - 1 }); }
}
if (inD) dr.push({ s: rs, e: 0xBFFF });
if (dr.length === 0) console.log('  NONE');
else for (const r of dr) {
  const poff = b0c + (r.s - 0x8000), sz = r.e - r.s + 1;
  const hex = Array.from(prg.slice(poff, poff + Math.min(32, sz))).map(b => b.toString(16).padStart(2, '0')).join(' ');
  console.log(`  0x${r.s.toString(16).padStart(4,'0')}-0x${r.e.toString(16).padStart(4,'0')} (${sz}B): ${hex}`);
}

// ====== 5. Search for displayed values (16,14,12,11,12,12) in ROM and CDL data ======
console.log('\n=== Search for displayed stat values in ROM ===');
const seq = [0x10, 0x0E, 0x0C, 0x0C, 0x0B, 0x0C];
const seq2 = [0x0C, 0x0E, 0x10, 0x0B, 0x0C, 0x0C]; // different order?
for (let b = 0; b < PRG_BANKS; b++) {
  const s = b * BANK_SIZE;
  for (let i = s; i < s + BANK_SIZE - 6; i++) {
    let m1 = true, m2 = true;
    for (let j = 0; j < 6; j++) { if (prg[i + j] !== seq[j]) m1 = false; if (prg[i + j] !== seq2[j]) m2 = false; }
    if (m1 || m2) {
      const addr = cpuAddrOf(b, i);
      const marks = Array.from({length:6}, (_,j) => cdl[i+j]===CDL_DATA?'D':cdl[i+j]===CDL_CODE?'C':'.').join('');
      console.log(`  ${m1?'seq1':'seq2'} at B${b.toString(16).padStart(2,'0')} CPU 0x${addr.toString(16).padStart(4,'0')} CDL=${marks}`);
    }
  }
}

// Also search for 748 as 16-bit
const mg1 = [0xEC, 0x02], mg2 = [0x02, 0xEC];
console.log('\n=== Search for max guts 748 (0x02EC) ===');
for (let b = 0; b < PRG_BANKS; b++) {
  const s = b * BANK_SIZE;
  for (let i = s; i < s + BANK_SIZE - 2; i++) {
    if ((prg[i] === mg1[0] && prg[i+1] === mg1[1]) || (prg[i] === mg2[0] && prg[i+1] === mg2[1])) {
      const addr = cpuAddrOf(b, i);
      const marks = (cdl[i]===CDL_DATA?'D':cdl[i]===CDL_CODE?'C':'.') + (cdl[i+1]===CDL_DATA?'D':cdl[i+1]===CDL_CODE?'C':'.');
      const ctx = Array.from(prg.slice(i-4, i+6)).map(b=>b.toString(16).padStart(2,'0')).join(' ');
      console.log(`  B${b.toString(16).padStart(2,'0')} CPU 0x${addr.toString(16).padStart(4,'0')} CDL=${marks} ctx=${ctx}`);
    }
  }
}

// ====== 6. Fixed bank code (16/17) -> look for data access patterns ======
console.log('\n=== Fixed bank (16/17) code regions ===');
for (const fb of [0x16, 0x17]) {
  const s = fb * BANK_SIZE;
  let cr = [], inC = false, cs = 0;
  for (let i = s; i < s + BANK_SIZE; i++) {
    const cpu = 0x8000 + (i - s); // in file offset, but CPU is C000-FFFF for fixed bank
    if (cdl[i] === CDL_CODE && !inC) { inC = true; cs = cpu; }
    else if (cdl[i] !== CDL_CODE && inC) { inC = false; if (cpu - cs >= 4) cr.push({ s: cs, e: cpu - 1 }); }
  }
  if (inC) cr.push({ s: cs, e: 0xBFFF });
  console.log(`Bank ${fb.toString(16).padStart(2,'0')} (CPU ${fb===0x16?'$C000-$DFFF':'$E000-$FFFF'}): ${cr.length} regions`);
  for (const r of cr) {
    const realCpu = 0x8000 + r.s; // wrong, but for prg slice it's fine
    const poff = s + (r.s - 0x8000);
    const sz = r.e - r.s + 1;
    const hex = Array.from(prg.slice(poff, poff + Math.min(16, sz))).map(b => b.toString(16).padStart(2, '0')).join(' ');
    console.log(`  CPU 0x${(0x8000 + r.s).toString(16).padStart(4,'0')} -> ${fb===0x16?'$C000':'$E000'} region ${sz}B: ${hex}${sz>16?'...':''}`);
  }
}

// ====== 7. All data regions in switchable bank areas ======
console.log('\n=== All data regions in switchable area (0x8000-0xBFFF) per bank ===');
for (let b = 0; b < PRG_BANKS; b++) {
  const s = b * BANK_SIZE;
  let dr3 = [], inD3 = false, rs3 = 0;
  for (let i = s; i < s + 0x4000; i++) {
    const addr = 0x8000 + (i - s);
    if (cdl[i] === CDL_DATA && !inD3) { inD3 = true; rs3 = addr; }
    else if (cdl[i] !== CDL_DATA && inD3) { inD3 = false; if (addr - rs3 >= 1) dr3.push({ s: rs3, e: addr - 1 }); }
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
