const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
function walk(d) {
  let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const e of es) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.s$/.test(e.name)) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      lines.forEach((l, i) => {
        if (/JSR \$8AF7/.test(l)) {
          // 往前找 3 行 LDA #
          const ctx = [];
          for (let k = Math.max(0, i - 4); k <= i; k++) ctx.push(lines[k].trim().slice(0, 100));
          console.log('--- ' + p.replace(dir, 'asm') + ':' + (i + 1));
          ctx.forEach(c => console.log('   ' + c));
        }
      });
    }
  }
}
walk(dir);
console.log('scan done');
