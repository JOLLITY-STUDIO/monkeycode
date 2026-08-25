// 临时 grep 工具：node debug/_grep.cjs <pattern> <file...>
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const pattern = args[0];
const files = args.slice(1);
const re = new RegExp(pattern, 'i');
for (const f of files) {
  const abs = path.resolve(f);
  if (!fs.existsSync(abs)) { console.log('MISSING', abs); continue; }
  const lines = fs.readFileSync(abs, 'utf8').split(/\r?\n/);
  lines.forEach((ln, i) => {
    if (re.test(ln)) console.log(`${f}:${i + 1}: ${ln.trim()}`);
  });
}
