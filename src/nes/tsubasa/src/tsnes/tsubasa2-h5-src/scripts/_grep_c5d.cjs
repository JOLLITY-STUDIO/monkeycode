const fs = require('fs');
const path = require('path');
const DIR = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
// 查看 bank_30 和 bank_31 的地址范围
for (const f of ['bank_30.asm', 'bank_31.asm', 'bank_32.asm']) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p)) { console.log(f + ' not exist'); continue; }
  const c = fs.readFileSync(p, 'utf8');
  const lines = c.split(/\r?\n/);
  const addr = [];
  lines.forEach((l, i) => {
    const m = l.match(/0D:([0-9A-F]{4}):/);
    if (m) addr.push(parseInt(m[1], 16));
  });
  console.log(f + ': lines=' + lines.length + ' addr range: $' + (addr.length ? addr[0].toString(16).toUpperCase() : '-') + '..$' + (addr.length ? addr[addr.length - 1].toString(16).toUpperCase() : '-'));
}
// 检查 C000-C5FF 在哪个文件
for (const f of fs.readdirSync(DIR).filter(f => /\.asm$/.test(f))) {
  const c = fs.readFileSync(path.join(DIR, f), 'utf8');
  const lines = c.split(/\r?\n/);
  let count = 0;
  lines.forEach(l => {
    const m = l.match(/0D:(C0[0-9A-F]{2}):/);
    if (m) count++;
  });
  if (count > 0) console.log(f + ': C000-C0FF lines=' + count);
}
