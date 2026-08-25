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
        const matches = l.match(/0x07[0-9a-f]{2}/g);
        if (!matches) return;
        const seen = new Set();
        for (const m of matches) {
          const addr = parseInt(m, 16);
          if (addr >= 0x0700 && addr <= 0x07ff && !seen.has(addr)) {
            seen.add(addr);
            console.log(p + ':' + (i + 1) + ': ' + m + ' | ' + l.trim());
          }
        }
      });
    }
  }
}
walk('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game');
walk('d:/studio/github/monkeycode/src/nes/tsubasa2/src/asm');
