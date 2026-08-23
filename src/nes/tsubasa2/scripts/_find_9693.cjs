const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank00');
for (const fn of ['code_sub.s', 'code_render.s']) {
  const file = path.join(dir, fn);
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  console.log('=== ' + fn + ' ===');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/\$969[0-9A-Fa-f]/);
    if (m) console.log(String(i + 1).padStart(5) + ': ' + lines[i].trim());
  }
}
