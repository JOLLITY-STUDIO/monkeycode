const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_00');
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (l.includes('A8CE') || l.includes('A8CF')) {
      console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
    }
  });
}
// also show first/last code address lines per file
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  const first = lines.find(l => /:\s*[0-9A-F]{2} [0-9A-F]{2}/.test(l));
  const last = [...lines].reverse().find(l => /:\s*[0-9A-F]{2} [0-9A-F]{2}/.test(l));
  console.log('## ' + f + ' first: ' + (first ? first.trim().slice(0, 80) : '?'));
  console.log('## ' + f + ' last : ' + (last ? last.trim().slice(0, 80) : '?'));
}
