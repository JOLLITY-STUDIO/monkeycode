import { readFileSync } from 'fs';

const base = 'src/langrisser2/20260713';
const rom = readFileSync(`${base}/Langrisser II (Japan).md`);

// Search for various cheat code encodings
const seqs = [
  // Hidden shop: UP DOWN LEFT RIGHT A B A B START B
  { name: 'shop2', bytes: [0x01,0x02,0x04,0x08,0x40,0x10,0x40,0x10,0x80,0x10] },
  // True hidden shop: B START RIGHT LEFT UP DOWN B A B A UP DOWN LEFT RIGHT START
  { name: 'shop3', bytes: [0x10,0x80,0x08,0x04,0x01,0x02,0x10,0x40,0x10,0x40,0x01,0x02,0x04,0x08,0x80] },
  // shop3 word-sized
  { name: 'shop3w', bytes: [
    0x00,0x10, 0x00,0x80, 0x00,0x08, 0x00,0x04, 0x00,0x01, 0x00,0x02,
    0x00,0x10, 0x00,0x40, 0x00,0x10, 0x00,0x40, 0x00,0x01, 0x00,0x02,
    0x00,0x04, 0x00,0x08, 0x00,0x80
  ]},
];

// Also try with different bit orders (swapped nibbles, etc.)
// Sometimes Genesis games store button bits differently
const altSeq3 = [0x01,0x08,0x08,0x04,0x01,0x02,0x01,0x04,0x01,0x04,0x01,0x02,0x04,0x08,0x08];
// Not sure about this - let me skip alt encodings for now

for (const {name, bytes} of seqs) {
  const search = Buffer.from(bytes);
  let found = [];
  let maxResults = 10;
  for (let i = 0; i < rom.length - search.length && found.length < maxResults; i++) {
    if (search.every((b, j) => rom[i + j] === b)) {
      found.push('ROM 0x' + i.toString(16));
    }
  }
  console.log(`${name} (${bytes.length} bytes): ${found.length > 0 ? found.join(', ') : 'NOT FOUND'}`);
}

// Search ASM for dc.b tables with these button patterns
console.log('\n=== Searching ASM for dc.b byte tables with button patterns ===');
const asm = readFileSync(`${base}/asm/m68k/rom.asm`, 'utf8');
const lines = asm.split('\n');

// Find all dc.b lines
const dcBlines = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.trimStart().startsWith('dc.b')) {
    dcBlines.push(i);
  }
}

console.log(`Total dc.b lines: ${dcBlines.length}`);

// Extract dc.b values and look for tables with >= 8 entries that match button patterns
// Button values: 0x01, 0x02, 0x04, 0x08, 0x10, 0x40, 0x80
const btnSet = new Set([0x01, 0x02, 0x04, 0x08, 0x10, 0x40, 0x80]);

for (let idx = 0; idx < dcBlines.length; idx++) {
  const lineNum = dcBlines[idx];
  // Collect consecutive dc.b lines
  let values = [];
  let j = lineNum;
  while (j < lines.length && lines[j].trimStart().startsWith('dc.b')) {
    const parts = lines[j].match(/\$([0-9a-fA-F]+)/g);
    if (parts) {
      for (const p of parts) {
        const v = parseInt(p.substring(1), 16);
        if (v <= 0xFF) values.push(v);
      }
    }
    j++;
  }
  
  // Check if this table has many button-like values
  if (values.length >= 8) {
    const btnCount = values.filter(v => btnSet.has(v)).length;
    if (btnCount >= values.length * 0.6 || btnCount >= 10) {
      console.log(`\ndc.b table at line ${lineNum+1} (${values.length} entries, ${btnCount} button-like):`);
      console.log('  Values: ' + values.slice(0, 30).map(v => '0x' + v.toString(16).padStart(2,'0')).join(' '));
      if (values.length > 30) console.log('  ...');
    }
  }
  
  // Skip ahead
  idx = dcBlines.findIndex((ln, i) => i > idx && ln >= j) - 1;
  if (idx < 0) break;
}

// Search for state machine patterns: addq.w + cmpi/cmp.w
console.log('\n=== Searching for state machine (counter + cmp) patterns ===');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('addq.w') || l.includes('addq.b') || l.includes('addi.w') || l.includes('addi.b')) {
    // Check nearby lines for comparison
    const nearLines = lines.slice(Math.max(0,i-3), Math.min(lines.length, i+5));
    const nearText = nearLines.join('\n');
    if (nearText.includes('cmpi') || nearText.includes('cmp.w') || nearText.includes('cmp.b') || 
        nearText.includes('beq') || nearText.includes('bne') || nearText.includes('blt') || nearText.includes('ble')) {
      // Check if it looks like a loop counter or sequence counter
      if (l.includes('#$1') || l.includes('#$0') || l.includes('#$F') || l.includes('#$E') || l.includes('#$D') || l.includes('#$C') || l.includes('#$A') || l.includes('#$9') || l.includes('#$8') || l.includes('#$7') || l.includes('#$6') || l.includes('#$5') || l.includes('#$4') || l.includes('#$3') || l.includes('#$2')) {
        // Not obviously a loop counter - print vicinity
        const start = Math.max(0, i - 10);
        const end = Math.min(lines.length - 1, i + 10);
        // Check if the function is in a reasonable code area
        const context = lines.slice(start, end + 1).join('\n');
        if (context.includes('$00') && !context.includes('dc.b') && !context.includes('dc.w') && !context.includes('dc.l')) {
          // Might be real code - let's check for button-related patterns nearby
          for (const btn of ['#$01', '#$02', '#$04', '#$08', '#$10', '#$20', '#$40', '#$80']) {
            if (context.includes(btn + ',d') || context.includes(btn + ');')) {
              console.log(`\n--- Potential button counter at line ${i+1} ---`);
              for (let k = start; k <= end; k++) {
                console.log(`${(k+1).toString().padStart(6)}: ${lines[k].substring(0, 140)}`);
              }
              break;
            }
          }
        }
      }
    }
  }
}

console.log('\n=== Script complete ===');
