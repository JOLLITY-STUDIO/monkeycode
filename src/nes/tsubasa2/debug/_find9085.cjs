const fs = require('fs');
const path = require('path');
const root = 'src/asm/bank00';
const targets = ['9085', '9086', '9b91', '9e7c', '9e36', '9e0c', '9b5e', '9b28'];
for (const f of fs.readdirSync(root)) {
  if (!f.endsWith('.s')) continue;
  const p = path.join(root, f);
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    for (const t of targets) {
      if (l.includes('; $' + t) || l.includes('; $' + t.toUpperCase())) {
        console.log(p + ':' + (i + 1) + ': ' + l);
        break;
      }
    }
  });
}
