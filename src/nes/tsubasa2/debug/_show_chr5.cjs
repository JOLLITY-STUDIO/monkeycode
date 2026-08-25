// 找 buildChrRom 实现和 CHR 数据源
const fs = require('fs'), path = require('path');
function walk(d) {
  let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== 'dist') out = out.concat(walk(p)); }
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const f of walk('src')) {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('buildChrRom')) console.log('### ' + f);
}
