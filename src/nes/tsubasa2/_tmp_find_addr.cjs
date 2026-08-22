const fs = require('fs');
const targets = ['$C4B9', '$C4B2', '$CEFE', '$C400', '$C503', '$A200'];
for (const f of ['asm/bank30/code_sub.s', 'asm/bank30/code_data.s', 'asm/bank30/code_main.s', 'asm/bank00/code_scene.s']) {
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((x, i) => {
    const t = x.trim();
    if (/;\s*\$[0-9A-F]{4}$/.test(t) || /^\s*JMP \$[0-9A-F]{4}/.test(t) || /^\s*JSR \$[0-9A-F]{4}/.test(t)) {
      const addrMatch = t.match(/\$([0-9A-F]{4})/g);
      if (addrMatch && targets.some((tg) => addrMatch.map((a) => a.toUpperCase()).includes(tg))) {
        console.log(f + ':' + (i + 1) + ': ' + t);
      }
    }
  });
}
