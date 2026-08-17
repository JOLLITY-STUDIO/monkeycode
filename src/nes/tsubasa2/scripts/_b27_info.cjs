const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_ram.inc', 'utf8').split(/\r?\n/);
const pats = ['ram_002C','ram_002D','ram_0032','ram_0034','ram_003A','ram_003B','ram_003C','ram_003D','ram_003E','ram_003F','ram_0063','ram_0064','ram_00E2','ram_04A5','ram_0515','ram_05E3','ram_05F3','ram_05F4','ram_05F5','ram_05FB','ram_062A'];
for (const p of pats) {
  const hit = c.findIndex(l => l.includes(p) && /equ|=/.test(l));
  console.log(p.padEnd(12), hit >= 0 ? c[hit].trim() : 'N/A');
}
// 也打印 _b27_code.txt
const t = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_b27_code.txt', 'utf8');
console.log('\n=== _b27_code.txt ===\n' + t.slice(0, 3000));
