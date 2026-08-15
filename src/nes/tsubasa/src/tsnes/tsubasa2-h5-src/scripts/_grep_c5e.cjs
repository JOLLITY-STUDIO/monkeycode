const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'utf8');
const lines = c.split(/\r?\n/);
for (const pat of ['C50C', 'C515', 'C527', 'C536', 'C539']) {
  console.log('=== $' + pat + ' ===');
  let found = 0;
  lines.forEach((l, i) => {
    if (l.includes('0F:' + pat + ':') && found < 20) { found++; console.log((i + 1) + ': ' + l.trim()); }
  });
  if (!found) console.log('(not found at 0F:' + pat + ')');
}
