const fs = require('fs');
const s = fs.readFileSync('scripts/_gen_opening_frame_table.cjs', 'utf8').split('\n');
s.forEach((l, i) => {
  if (i < 240 && /scanline|chr|bankMap|chr-switches|\.s\b|\.c\b|buildChrBankMap/.test(l)) {
    console.log((i + 1) + ': ' + l.trim());
  }
});
