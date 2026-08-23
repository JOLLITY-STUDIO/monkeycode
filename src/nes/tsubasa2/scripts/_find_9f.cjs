const fs = require('fs');
const files = [];
for (const d of ['src/asm/bank00', 'src/asm/bank02']) {
  for (const f of fs.readdirSync(d)) {
    if (f.endsWith('.s')) files.push(d + '/' + f);
  }
}
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (l.includes('$9F89') || l.includes('$9F96') || l.includes('$9FA8') || l.includes('$9EFB')) {
      console.log(f + ':' + (i + 1) + ': ' + l.trim());
    }
  });
}
