const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank30');
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const L = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  L.forEach((ln, i) => {
    if (/\$C421|\$9EFB|\$9E2A|JSR \$A000|JSR \$8000|0019/.test(ln)) {
      const from = Math.max(0, i - 2), to = Math.min(L.length - 1, i + 4);
      console.log(`=== ${f}:${i + 1} ===`);
      for (let j = from; j <= to; j++) console.log(L[j]);
      console.log('');
    }
  });
}
