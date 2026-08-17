const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}
const files = walk(root, []);
const re = /'ram_00e[0-9a-fA-F]'|`ram_\$?\{?[^`]*00E6[^`]*`?|'ram_00E[0-9A-F]'|'ram_00e[0-9a-f]'/g;
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = re.exec(txt)) !== null) {
    const ln = txt.slice(0, m.index).split('\n').length;
    console.log(`${f}:${ln}: ${m[0]}`);
  }
}
// 也检查模板拼接形式
const re2 = /ram_\$\{/g;
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = re2.exec(txt)) !== null) {
    const ln = txt.slice(0, m.index).split('\n').length;
    const line = txt.split('\n')[ln - 1].trim();
    if (/E6|0468|0454|003A|FFE0|FF19|00E6/i.test(line)) console.log(`TPL ${f}:${ln}: ${line.slice(0, 120)}`);
  }
}
