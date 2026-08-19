const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_02');
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/\$85DC\b|\$877B\b/.test(l) && !/01:85DC:|01:877B:/.test(l)) {
      console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 100));
    }
  });
}
