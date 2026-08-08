const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'utf8');
const lines = c.split('\n');

// Find $C400 code
console.log('=== Bank 30 $C400 entry ===');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('0F:C400') && lines[i].includes('C ')) {
    for (let j = Math.max(0, i - 2); j < Math.min(lines.length, i + 60); j++) {
      console.log((j + 1) + ': ' + lines[j].trim().substring(0, 140));
    }
    break;
  }
}

// Also find Bank 30's MMC3 init code that maps Bank 00+02
// Look for ORA #$06 / STA $8000 / LDA #$00 / STA $8001
console.log('\n=== Bank 30: MMC3 R6=0 (Bank00) R7=2 (Bank02) init ===');
let found = 0;
for (let i = 0; i < lines.length; i++) {
  const ctx = lines.slice(Math.max(0, i - 3), i + 5).join('').toUpperCase();
  if (ctx.includes('ORA #$06') && ctx.includes('STA $8000') && 
      ctx.includes('STA $8001')) {
    // check what bank value follows: #$00 for Bank 00
    const nearby = lines.slice(i, i + 5).join('').toUpperCase();
    if (nearby.includes('LDA #$00') && nearby.includes('8001')) {
      for (let j = Math.max(0, i - 4); j < Math.min(lines.length, i + 8); j++) {
        console.log((j + 1) + ': ' + lines[j].trim().substring(0, 140));
      }
      console.log('---');
      found++;
      if (found >= 3) break;
    }
  }
}
