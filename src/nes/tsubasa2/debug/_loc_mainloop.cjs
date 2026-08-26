const fs = require('fs');
const dirs = ['src/asm/bank00', 'src/asm/bank02', 'src/asm/bank06'];
const patterns = ['8488', 'A488', '00ED', 'JSR $8488', 'JMP $8488'];
for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.s'))) {
    const lines = fs.readFileSync(dir + '/' + f, 'utf8').split('\n');
    lines.forEach((l, i) => {
      for (const p of patterns) {
        if (l.includes(p)) {
          console.log(dir + '/' + f + ' L' + (i + 1) + ': ' + l.trim());
          break;
        }
      }
    });
  }
}
