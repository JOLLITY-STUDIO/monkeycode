const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_02');
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((l, i) => {
    const m = l.match(/01:([0-9A-F]{4}):/);
    if (m) {
      const a = parseInt(m[1], 16);
      if (a >= 0xA5D0 && a <= 0xA5E8) console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 105));
      if (a >= 0xA7C0 && a <= 0xA7D8) console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 105));
      if (a >= 0x85D0 && a <= 0x85E9) console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 105));
      if (a >= 0x8770 && a <= 0x8788) console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 105));
    }
  });
}
