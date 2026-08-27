// grep mirroring constants + getMirroringType in core
const fs = require('fs');
const path = require('path');
function grep(dir, re, label) {
  for (const f of fs.readdirSync(dir)) {
    if (!/\.ts$/.test(f)) continue;
    const c = fs.readFileSync(path.join(dir, f), 'utf8');
    const lines = c.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (re.test(lines[i])) console.log(`${label}/${f}:${i + 1}: ${lines[i].trim().slice(0, 140)}`);
    }
  }
}
grep(path.join(__dirname, 'src', 'core'), /getMirroringType|HORIZONTAL_MIRRORING\s*[:=]|VERTICAL_MIRRORING\s*[:=]/i, 'core');
