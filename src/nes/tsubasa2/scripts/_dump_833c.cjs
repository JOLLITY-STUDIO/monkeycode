const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_02');
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((l, i) => {
    const m = l.match(/01:([0-9A-F]{4}):/);
    if (m) {
      const a = parseInt(m[1], 16);
      if (a >= 0x8330 && a <= 0x83A5) {
        console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 105));
      }
    }
  });
}
