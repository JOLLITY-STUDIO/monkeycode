const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'utf8');
const lines = c.split(/\r?\n/);
function dump(addr, n) {
  console.log('=== $' + addr + ' (' + n + ' lines) ===');
  let start = -1;
  lines.forEach((l, i) => {
    if (l.includes('0F:' + addr + ':')) start = i;
  });
  if (start < 0) { console.log('(not found)'); return; }
  for (let i = start; i < Math.min(start + n, lines.length); i++) {
    console.log((i + 1) + ': ' + lines[i].trim());
  }
}
dump('CD7C', 30);   // $C50C 目标
dump('CB0F', 40);   // $C515 目标
dump('CDC9', 20);   // $C536 目标
dump('CDE2', 25);   // $C539 目标
