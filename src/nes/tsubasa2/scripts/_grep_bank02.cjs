// grep bank02 asm 中 $001B / $001E / 输入相关读写
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank02');
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const L = t.split(/\r?\n/);
  L.forEach((ln, i) => {
    if (/001B|001E|9CE7|9CE6|9CE5/.test(ln)) {
      console.log(`${f}:${i + 1}: ${ln.trim()}`);
    }
  });
}
