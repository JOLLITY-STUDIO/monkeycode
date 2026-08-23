const fs = require('fs');
const path = require('path');
const dir = 'src/asm/bank00';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
for (const file of files) {
  const l = fs.readFileSync(path.join(dir, file), 'utf8').split(/\r?\n/);
  l.forEach((s, i) => {
    if (/;\s*\$99F0|;\s*\$9A0D|;\s*\$9A1F/.test(s)) console.log(file + ':' + (i + 1) + ': ' + s.trim());
  });
}
