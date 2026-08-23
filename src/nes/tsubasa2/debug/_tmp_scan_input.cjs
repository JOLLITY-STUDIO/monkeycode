// 扫描 controller_1 / controller_2 / input_mask 的写入点
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
function walk(d) {
  const out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.ts')) out.push(p);
  }
  return out;
}
for (const f of walk(root)) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/controller_1|controller_2|input_mask/.test(l)) {
      console.log(`${f.replace(root + '/', '')}:${i + 1}: ${l.trim()}`);
    }
  });
}
