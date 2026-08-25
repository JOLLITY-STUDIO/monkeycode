const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.resolve(__dirname, '../src/core/cpu.ts'), 'utf8');
const pats = ['this.pc', 'this.PC', 'this.programCounter', ' pc;', ' pc =', 'pc:'];
for (const p of pats) {
  let i = 0, n = 0;
  while ((i = src.indexOf(p, i)) >= 0 && n < 5) {
    console.log('--- "' + p + '" @' + i);
    console.log(src.slice(Math.max(0, i - 60), i + 120));
    console.log();
    i += p.length; n++;
  }
}
