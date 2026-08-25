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
        if (/0x0468|spriteY|setSpriteY/.test(l)) {
          console.log(p + ':' + (i + 1) + ': ' + l);
        }
      });
    }
  }
}
walk('d:/studio/github/monkeycode/src/nes/tsubasa2/src/game');
