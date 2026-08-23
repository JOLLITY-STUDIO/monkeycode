const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'src', 'asm');
function walk(d, out) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p, out);
    else if (f.name.endsWith('.s')) out.push(p);
  }
}
const files = [];
walk(root, files);
// search absolute references to the row-buffer slot region ($0578-$05DF) and $0568
for (const p of files) {
  const c = fs.readFileSync(p, 'utf8').split('\n');
  c.forEach((l, i) => {
    const t = l.trim();
    if (/\$05[6-9A-D][0-9A-F]|\$05E[0-9A-F]/.test(t) && /(STA|LDA|LDY|SBC|ADC|DEC|INC|CMP|BCS|BEQ)/.test(t)) {
      console.log(p.replace(root, '') + ':' + (i + 1) + ': ' + t);
    }
  });
}
