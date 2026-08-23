// 全库扫描 input_mask / controller_1 写入
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
function walk(d) {
  let o = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '_tmp_out' || e.name === 'dist') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) o.push(...walk(p));
    else if (/\.(ts|js)$/.test(e.name)) o.push(p);
  }
  return o;
}
for (const f of walk(root)) {
  const s = fs.readFileSync(f, 'utf8');
  if (/input_mask|controller_1/.test(s)) {
    const l = s.split(/\r?\n/);
    l.forEach((x, i) => {
      if (/input_mask|controller_1/.test(x) && /set\(|write\(|store|store\./.test(x)) {
        console.log(`${f.replace(root + '/', '')}:${i + 1}: ${x.trim()}`);
      }
    });
  }
}
