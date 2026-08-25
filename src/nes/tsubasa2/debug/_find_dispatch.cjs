// temp: find scene dispatch callers across all PRG banks
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
const prgStart = 16;
const bankSize = 8192;
const prgBanks = 0x30; // 48 banks (384KB-16)/8KB
const bankMap = new Map(); // runtime addr -> bank index

// MMC3: at reset, banks are mapped: R6 (C000) -> bank 0? Standard: $8000=R6? Actually typical initial: 8000=bank0.. no.
// We only need to locate JSR $A486 patterns in raw prg bytes; note bank02 is R7 -> $A000.
function findPattern(arr, pat) {
  const res = [];
  outer: for (let i = 0; i + pat.length <= arr.length; i++) {
    for (let j = 0; j < pat.length; j++) {
      if (arr[i + j] !== pat[j]) continue outer;
    }
    res.push(i);
  }
  return res;
}

// load all prg banks into one buffer
const allPrg = rom.slice(prgStart, prgStart + prgBanks * bankSize);

// JSR $A486 = 20 86 A4
const jsr = findPattern(allPrg, [0x20, 0x86, 0xA4]);
console.log('JSR $A486 occurrences (prg offset):', jsr.map(o => o.toString(16)));

// JSR $8486? (if bank02 mapped at 8000, unlikely but check) = 20 86 84
const jsr2 = findPattern(allPrg, [0x20, 0x86, 0x84]);
console.log('JSR $8486 occurrences:', jsr2.map(o => o.toString(16)));

// look for LDA $0091 / STA $0091 patterns (A5 91 / 85 91)
const lda91 = findPattern(allPrg, [0xA5, 0x91]);
console.log('LDA $0091 count:', lda91.length, lda91.map(o => o.toString(16)).slice(0, 40).join(' '));
const sta91 = findPattern(allPrg, [0x85, 0x91]);
console.log('STA $0091 count:', sta91.length, sta91.map(o => o.toString(16)).slice(0, 40).join(' '));

// dump bank00 (first 8KB) around $9EED -> prg offset 0x1EED
console.log('\n=== bank00 bytes near $9EED (prg off 0x1EED) ===');
console.log([...allPrg.slice(0x1ED0, 0x1F40)].map(x => x.toString(16).padStart(2, '0')).join(' '));

// dump bank00 near $9FA8 (wait routine)  prg off 0x1FA8
console.log('\n=== bank00 bytes near $9FA8 (wait, prg off 0x1FA8) ===');
console.log([...allPrg.slice(0x1FA0, 0x1FD0)].map(x => x.toString(16).padStart(2, '0')).join(' '));
