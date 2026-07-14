import { readFileSync } from 'fs';

// Read ROM binary and ASM
const rom = readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const asm = readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');

// Strategy: Find the global button edge detection and sequence checking code.
// Button edge: (current ^ previous) & current = buttons just pressed
// This uses eor/xor + and pattern
// Let's search ASM for `eor` operations near button reads

// First, find button processing functions - the ones that use $FFFF8178
// but are NOT the ones we already found (shop, menu, etc.)

// Search for XOR/EOR operations with button values
console.log('=== Looking for EOR/XOR patterns near button reads ===');
let eorLines = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('eor') && (lines[i].includes('8178') || lines[i].includes('8179') || lines[i].includes('D0,') || lines[i].includes('D1,') || lines[i].includes('D2,'))) {
    eorLines.push(i);
  }
}

console.log(`Found ${eorLines.length} EOR lines near button values`);
for (const idx of eorLines.slice(0, 15)) {
  const s = Math.max(0, idx - 10);
  const e = Math.min(lines.length - 1, idx + 10);
  console.log(`\n--- Line ${idx+1} ---`);
  for (let j = s; j <= e; j++) {
    console.log(`${(j+1).toString().padStart(7)}: ${lines[j].substring(0, 140)}`);
  }
}

// Search for tables that might contain button sequence - large (>10) byte tables
// with mostly 0x01,0x02,0x04,0x08,0x10,0x40,0x80 values
// Search in ROM data section (0x59000+)
const btnSet = new Set([0x01, 0x02, 0x04, 0x08, 0x10, 0x40, 0x80]);
console.log('\n\n=== Searching ROM data for button-like byte tables ===');

// Option 1: Search for specific subsequences of the cheat code
// True hidden shop: B(0x10) START(0x80) RIGHT(0x08) LEFT(0x04) UP(0x01) DOWN(0x02) 
//                    B(0x10) A(0x40) B(0x10) A(0x40) UP(0x01) DOWN(0x02) LEFT(0x04) RIGHT(0x08) START(0x80)
const seq3 = [0x10, 0x80, 0x08, 0x04, 0x01, 0x02, 0x10, 0x40, 0x10, 0x40, 0x01, 0x02, 0x04, 0x08, 0x80];
// Hidden shop: UP(0x01) DOWN(0x02) LEFT(0x04) RIGHT(0x08) A(0x40) B(0x10) A(0x40) B(0x10) START(0x80) B(0x10)
const seq2 = [0x01, 0x02, 0x04, 0x08, 0x40, 0x10, 0x40, 0x10, 0x80, 0x10];

// Try searching for the sequence as words with big-endian
function searchWords(seq, name) {
  const wordSeq = [];
  for (const b of seq) wordSeq.push(0, b); // pad to word
  const wordBuf = Buffer.from(wordSeq);
  
  let found = [];
  for (let i = 0; i < rom.length - wordBuf.length; i++) {
    if (wordBuf.every((b, j) => rom[i + j] === b)) {
      found.push('ROM 0x' + i.toString(16));
      if (found.length >= 5) break;
    }
  }
  console.log(`  ${name} (word): ${found.length > 0 ? found.join(', ') : 'NOT FOUND'}`);
}

searchWords(seq3, 'seq3');
searchWords(seq2, 'seq2');

// Search for subsequences of length 3-4 that appear in ROM data
for (const [name, seq] of [['seq3', seq3], ['seq2', seq2]]) {
  for (let subLen = 4; subLen <= 6; subLen++) {
    let anyFound = false;
    for (let pos = 0; pos <= seq.length - subLen; pos++) {
      const sub = seq.slice(pos, pos + subLen);
      let found = false;
      for (let i = 0x50000; i < rom.length - subLen && !found; i++) {
        if (sub.every((b, j) => rom[i + j] === b)) {
          found = true;
        }
      }
      anyFound = anyFound || found;
    }
    console.log(`  ${name} sub-${subLen}: ${anyFound ? 'SOME FOUND' : 'ALL NOT FOUND'}`);
  }
}

// Also try: the cheat code might be in a different byte order or reversed
// Try reversed sequences
console.log('\n=== Trying reversed sequences ===');
for (const [name, orig] of [['seq3', seq3], ['seq2', seq2]]) {
  const rev = [...orig].reverse();
  let found = 0;
  for (let i = 0; i < rom.length - rev.length && found < 5; i++) {
    if (rev.every((b, j) => rom[i + j] === b)) found++;
  }
  console.log(`  ${name} reversed: ${found > 0 ? 'FOUND' : 'NOT FOUND'}`);
}

// Try nibble-swapped: B(0x10) -> 0x01, START(0x80) -> 0x08, etc.
console.log('\n=== Trying nibble-swapped ===');
function swapNibble(b) { return ((b & 0x0F) << 4) | ((b & 0xF0) >> 4); }
for (const [name, orig] of [['seq3', seq3], ['seq2', seq2]]) {
  const swapped = orig.map(swapNibble);
  let found = 0;
  for (let i = 0; i < rom.length - swapped.length && found < 5; i++) {
    if (swapped.every((b, j) => rom[i + j] === b)) found++;
  }
  console.log(`  ${name} nibble-swapped: ${found > 0 ? 'FOUND' : 'NOT FOUND'}`);
}
