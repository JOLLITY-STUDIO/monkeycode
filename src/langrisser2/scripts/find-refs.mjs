import fs from 'fs';
const t = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = t.split('\n');

// The copyright string is at ROM $000240-$00026F
// Search for any code that references address $000240 or nearby
// Common 68k patterns: lea $000252, aX; movea.l #$000252, aX; move.l #$00000252, dX

console.log('=== References to $000240-$000270 (copyright string area) ===');
const refs = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Look for any absolute long reference to this range
  const m = l.match(/(\$0+0*)(2[4-6][0-9A-Fa-f]|270)/i);
  if (m) {
    const addr = parseInt(m[2], 16);
    if (addr >= 0x240 && addr <= 0x270) {
      refs.push({ line: i + 1, text: l.trim().substring(0, 160), addr });
      if (refs.length < 20) {
        console.log(`L${(i+1).toString().padStart(7)}: ${l.trim().substring(0, 160)}`);
      }
    }
  }
}
console.log(`\nTotal refs: ${refs.length}`);

// Also search for references using pc-relative addressing near this code
console.log('\n=== Code near $000270 and references ===');
let nearLoc270 = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('loc_000270')) {
    nearLoc270 = true;
  }
  if (nearLoc270 && i < 470) {
    console.log(`${(i+1).toString().padStart(5)}: ${lines[i].substring(0, 160)}`);
  }
  if (i > 500) break;
}

// Find who CALLS loc_000270 (the function right after the copyright string)
console.log('\n=== Who calls code at $000270 ===');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (/bsr\.w\s+loc_000270|jsr.*\$0*0270|bra\.w\s+loc_000270/.test(l)) {
    console.log(`${(i+1).toString().padStart(7)}: ${l.trim().substring(0, 160)}`);
  }
}
