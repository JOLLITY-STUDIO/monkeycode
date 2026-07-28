// Debug extraction
const fs = require('fs');
const text = fs.readFileSync('tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump.ts', 'utf-8');
const idx = text.indexOf('_PRG_BANK_01');
console.log('_PRG_BANK_01 index:', idx);
if (idx > 0) {
  // Find what leading keyword precedes it
  const before = text.substring(Math.max(0, idx - 5), idx);
  console.log('before:', JSON.stringify(before));
  // Try various patterns
  console.log('matches const:', /const\s+_PRG_BANK_01/.test(text.substring(idx)));
  const endBracket = text.indexOf('];', idx);
  console.log(']; at:', endBracket);
  console.log('Context:\n', text.substring(idx, Math.min(idx + 500, endBracket + 2)));
}
