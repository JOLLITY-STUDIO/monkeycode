const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_02');
const out = [];
const wanted = ['A372', 'A3AB', 'A8A3', 'A8B7', 'A8A8', 'AA75', 'AA47', 'A2E8', 'A2F8', 'A484'];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/\b(?:01|02|00):([0-9A-F]{4}):/i);
    if (m && wanted.includes(m[1].toUpperCase())) {
      out.push(f + ' L' + (i + 1) + ': ' + lines[i].trim());
    }
  }
}
fs.writeFileSync(path.join(process.cwd(), '_grep02_out.txt'), out.join('\n'), 'utf8');
