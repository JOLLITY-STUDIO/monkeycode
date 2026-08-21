// 在 bank30/_full.s 找 $CC02 子程正文 (行注释含 ; $CC02)
const fs = require('fs');
const c = fs.readFileSync('asm/bank30/_full.s', 'utf8').split(/\r?\n/);
c.forEach((l, i) => {
  if (/;\s*\$CC02\s*$/.test(l.trim())) {
    console.log('FOUND at line ' + (i + 1) + ': ' + l);
    for (let j = i; j < i + 60; j++) {
      if (j < c.length) console.log((j + 1) + ': ' + c[j]);
    }
    return;
  }
});
console.log('--- done ---');
