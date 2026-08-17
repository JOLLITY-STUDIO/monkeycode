const fs = require('fs');
const d = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split('\n');

// Find C64E and C400 areas
let c400Line = -1, c64eLine = -1;
d.forEach((l, i) => {
  if (l.includes('0F:8400:')) c400Line = i;
  if (l.includes('0F:864E:')) c64eLine = i;
  if (l.includes('0F:84F3:')) {
    console.log(`Return from C4B2/C4B9 at line ${i+1}: ${l.trim()}`);
  }
});

console.log(`C400 at line ${c400Line+1}, C64E at line ${c64eLine+1}`);

// Print C400-C500 area
console.log('\n=== C400-C500 area ===');
for (let i = c400Line; i < c400Line + 100 && i < d.length; i++) {
  console.log(`${i+1}: ${d[i].trim()}`);
}

// Print C64E onwards
if (c64eLine > 0) {
  console.log('\n=== C64E onwards ===');
  for (let i = c64eLine; i < c64eLine + 80 && i < d.length; i++) {
    console.log(`${i+1}: ${d[i].trim()}`);
  }
}
