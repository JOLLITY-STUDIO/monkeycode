const fs = require('fs');
const dirs = ['asm/bank00', 'asm/bank02', 'asm/bank30', 'asm/bank31', 'asm/bank07'];
const re = /00E5|\$E5/;
for (const d of dirs) {
  try {
    const files = fs.readdirSync(d);
    for (const f of files) {
      if (!f.endsWith('.s')) continue;
      const c = fs.readFileSync(d + '/' + f, 'utf8');
      const lines = c.split('\n');
      lines.forEach((l, i) => {
        if (re.test(l) && /(STA|LDX|LDY|STX|STY)\s*\$?00E5|00E5|E5\b/.test(l)) console.log(d + '/' + f + ':' + (i + 1) + ': ' + l.trim());
      });
    }
  } catch (e) { /* skip */ }
}
// 也搜 src/game 里 00E5 相关
function walk(d) {
  let files = [];
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    const s = fs.statSync(p);
    if (s.isDirectory()) files = files.concat(walk(p));
    else if (/\.ts$/.test(f)) files.push(p);
  }
  return files;
}
for (const f of walk('src/game')) {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('00E5') && l.includes('wr(')) console.log(f + ':' + (i + 1) + ': ' + l.trim());
  });
}
console.log('done');
