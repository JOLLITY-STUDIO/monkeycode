import fs from 'fs';
const t = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = t.split('\n');

// Search for dc.w/dc.b data tables with tile indices in font range (0x080-0x100)
// These would represent hardcoded text like "1994 NCS"
console.log('=== dc.w / dc.b with values in font tile range ($080-$100) ===');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Look for dc.w or dc.b lines with multiple values
  if (/^\s+dc\.[wb]\s+/.test(l)) {
    // Check if line has values in 0x080-0xFF range  
    const vals = l.match(/\$0[89A-Fa-f][0-9A-Fa-f]/g);
    if (vals && vals.length >= 2) {
      console.log(`${(i+1).toString().padStart(7)}: ${l.trim().substring(0, 200)}`);
    }
  }
}

// Also search for immediate tile values used in move instructions 
console.log('\n=== move with font tile values ($080-$100) ===');
let cnt = 0;
for (let i = 0; i < lines.length && cnt < 30; i++) {
  const l = lines[i];
  // move.w #$08x, ...  or move.l with tile values
  if (/\$0[89A-Fa-f][0-9A-Fa-f]/.test(l) && 
      (l.includes('move') || l.includes('add') || l.includes('sub') || l.includes('cmp'))) {
    console.log(`${(i+1).toString().padStart(7)}: ${l.trim().substring(0, 180)}`);
    cnt++;
  }
}
