import fs from 'fs';

const c = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8');

// Look at the full BC6E data table - get a big chunk
const searchFor = '0x003C6E';
const idx = c.indexOf(searchFor);
if (idx >= 0) {
  console.log('=== BC6E data (0x003C6E) ===');
  console.log(c.substring(Math.max(0, idx - 30), idx + 600));
}

// Also check - the NT tile 0x28/0x29/0x2C might come from a lookup 
// where tile index is transformed. Search for any computations
// that OR or ADD to produce tile values
console.log('\n\n=== Search for $28 in raw bytes around $Bxxx ===');
// Let's find the raw hex dump section
// Find regions that list .byte $28
let pos = 0;
let count = 0;
while (count < 5) {
  const m = c.indexOf('.byte $28', pos);
  if (m < 0) break;
  // Check if this is in a data section (D flag)
  const lineStart = c.lastIndexOf('\n', m - 1) + 1;
  const line = c.substring(lineStart, Math.min(c.length, m + 100));
  console.log(`[${count}] ${line.trim().substring(0, 150)}`);
  count++;
  pos = m + 1;
}
if (count === 0) {
  console.log('No .byte $28 found');
  // Try .byte \$28 (escaped)
  let pos2 = 0;
  let count2 = 0;
  while (count2 < 3) {
    const m = c.indexOf('.byte \\$28', pos2);
    if (m < 0) break;
    const lineStart = c.lastIndexOf('\n', m - 1) + 1;
    console.log(`[${count2}] ${c.substring(lineStart, m + 120).trim().substring(0, 150)}`);
    count2++;
    pos2 = m + 1;
  }
}
