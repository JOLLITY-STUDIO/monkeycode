// dump bank30 中 $CC02-$CC4A 子程 ($C530)
const fs = require('fs');
const c = fs.readFileSync('asm/bank30/code_main.s', 'utf8').split(/\r?\n/);
let found = 0;
c.forEach((l, i) => {
  if (found > 0 && found < 90) {
    console.log((i + 1) + ': ' + l);
    found++;
  }
  if (/CC02\s+;/ .test(l) || /^CC02/.test(l.trim())) {
    if (found === 0) { found = 1; console.log((i + 1) + ': ' + l); }
  }
});
