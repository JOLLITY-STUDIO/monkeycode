const fs = require('fs');
const path = require('path');
const asmDir = path.resolve(__dirname, '../asm');
const files = [];
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (f.endsWith('.s')) out.push(p);
  }
}
walk(asmDir, files);
const re = /(STA|LDA|ORA|AND|EOR|BIT|INC|DEC)\s+\$001E/;
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (re.test(line)) {
      const start = Math.max(0, i - 2);
      const end = Math.min(lines.length, i + 3);
      console.log(`── ${path.relative(asmDir, f)}:${i + 1} ──`);
      for (let j = start; j < end; j++) console.log(lines[j]);
      console.log('');
    }
  });
}
