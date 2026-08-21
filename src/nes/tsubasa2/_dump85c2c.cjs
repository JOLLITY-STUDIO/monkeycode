// dump asm/bank11/_full.s 中 $85C2-$86A8 段落 (fn_85C2)
const fs = require('fs');
const c = fs.readFileSync('asm/bank11/_full.s', 'utf8').split(/\r?\n/);
let inRange = false;
c.forEach((l, i) => {
  if (/;\s*\$85C2/.test(l)) inRange = true;
  if (inRange) {
    console.log((i + 1) + ': ' + l);
    if (/;\s*\$86A8/.test(l)) inRange = false;
  }
});
