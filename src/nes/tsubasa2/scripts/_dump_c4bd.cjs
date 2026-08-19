const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_30');
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((l, i) => {
    const m = l.match(/0F:C4([0-9A-F]{2}):/);
    if (m) {
      const a = parseInt(m[1], 16);
      if (a >= 0x90 && a <= 0xE0) console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 105));
    }
  });
}
