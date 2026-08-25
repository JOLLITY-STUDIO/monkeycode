const fs = require('fs');
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + '/' + e.name;
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'asm') continue;
      walk(p);
    } else if (p.endsWith('.ts')) {
      const s = fs.readFileSync(p, 'utf8');
      const lines = s.split('\n');
      lines.forEach((l, i) => {
        // Match addresses in range $0600..$06FF
        const matches = l.match(/0x06[0-9a-f]{2}/g);
        if (!matches) return;
        for (const m of matches) {
          const addr = parseInt(m, 16);
          if (addr >= 0x0680 && addr <= 0x06ff) {
            console.log(p + ':' + (i + 1) + ': ' + m + ' | ' + l.trim());
            return;
          }
        }
      });
    }
  }
}
walk('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game');
walk('d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm');
