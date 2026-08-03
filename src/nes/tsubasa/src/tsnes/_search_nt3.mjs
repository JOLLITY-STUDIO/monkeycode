import fs from 'fs';

const c = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8');
console.log('len:', c.length);

// Find BC6E and show context
const idx = c.indexOf('BC6E');
if (idx >= 0) {
  console.log('\n=== BC6E context ===');
  console.log(c.substring(Math.max(0, idx - 300), idx + 500));
}

// Also look for patterns like the NT tile sequence
// The tiles: 28 29 2C 2D 38 37 39 3C 3D
// In asm they could be: db $28,$29,$2C,$2D... or .db $28,$29... or .byte $28,$29...
const patterns = [
  /$28,?\s*\$29,?\s*\$2C,?\s*\$2D/,
  /db\s+\$28,?\s*\$29,?\s*\$2C,?\s*\$2D/,
  /\.db\s+\$28,?\s*\$29,?\s*\$2C,?\s*\$2D/,
  /\.byte\s+\$28,?\s*\$29,?\s*\$2C,?\s*\$2D/,
  /\$28.*\$29.*\$2C.*\$2D/,
];

console.log('\n=== Is this bank 01? ===');
console.log(c.substring(0, 300));

console.log('\n=== Searching for tile sequence patterns ===');
let found = false;
for (const pat of patterns) {
  const m = c.match(pat);
  if (m) {
    console.log('FOUND with pattern:', pat.source);
    console.log('at index:', m.index);
    console.log('context:');
    // Fix: substring instead of substr
    const start = Math.max(0, m.index - 50);
    const end = Math.min(c.length, m.index + 200);
    console.log(c.substring(start, end));
    found = true;
    break;
  }
}
if (!found) {
  console.log('No direct tile sequence match. Searching for individual tiles...');
  const tilesToFind = ['$28', '$29', '$2C', '$2D', '$38', '$37', '$39', '$3C', '$3D'];
  for (const t of tilesToFind) {
    const idx = c.indexOf(' ' + t + ',');
    if (idx >= 0) {
      console.log(`  ${t} found at ${idx}`);
    }
  }
}
