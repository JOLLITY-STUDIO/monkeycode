const fs = require('fs');
const path = require('path');

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.ts')) out.push(p);
  }
}
const files = [];
walk(path.join(__dirname, 'src'), files);

let report = '';
const names = ['SPRITE_UPLOAD', 'SPRITE_UPLOAD2', 'TINY_TABLE', 'SCROLL_DX', 'SCROLL_DY'];
for (const n of names) {
  report += '=== ' + n + ' ===\n';
  for (const f of files) {
    if (f.includes('bank02-tables.ts')) continue; // skip definition
    const s = fs.readFileSync(f, 'utf8');
    if (s.includes(n)) {
      report += '  ' + f + '\n';
    }
  }
}
report += '\ndone\n';
fs.writeFileSync(path.join(__dirname, '_scan_usage.txt'), report, 'utf8');
