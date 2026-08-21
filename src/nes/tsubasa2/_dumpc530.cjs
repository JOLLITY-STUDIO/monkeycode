// dump bank30 $CC02-$CC4A ($C530) 与 $FBCC 表引用
const fs = require('fs');
for (const f of ['asm/bank30/_full.s', 'asm/bank30/code_main.s']) {
  if (!fs.existsSync(f)) continue;
  const c = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  let inRange = false;
  c.forEach((l, i) => {
    if (/;\s*\$CC02/.test(l)) inRange = true;
    if (inRange) {
      console.log(f + ':' + (i + 1) + ': ' + l);
      if (/;\s*\$CC42/.test(l)) inRange = false;
    }
  });
}
