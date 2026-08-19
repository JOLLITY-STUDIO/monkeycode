const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_02');
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/A8CE|A8B7|A8A3|A8A8|AA47|AA75/.test(l)) {
      console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 105));
    }
  });
}
