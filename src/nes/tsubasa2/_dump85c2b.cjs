// dump asm/bank11/_full.s 中 $864D 附近段落
const fs = require('fs');
const c = fs.readFileSync('asm/bank11/_full.s', 'utf8').split(/\r?\n/);
let inRange = false;
c.forEach((l, i) => {
  if (/^\$86(0|1|2|3|4)/.test(l.trim())) inRange = true;
  if (inRange) {
    console.log((i + 1) + ': ' + l);
    if (/^\$868B/.test(l.trim())) inRange = false;
  }
});
