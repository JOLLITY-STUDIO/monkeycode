const fs = require('fs');
const files = [];
for (const d of ['src/asm/bank00', 'src/asm/bank01', 'src/asm/bank02', 'src/asm/bank20', 'src/asm/bank21', 'src/asm/bank30', 'src/asm/bank31']) {
  try { for (const f of fs.readdirSync(d)) if (f.endsWith('.s')) files.push(d + '/' + f); } catch (e) {}
}
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/\$05E8|\$0628|05E8|0628/.test(l)) console.log(f + ':' + (i + 1) + ': ' + l.trim());
  });
}
