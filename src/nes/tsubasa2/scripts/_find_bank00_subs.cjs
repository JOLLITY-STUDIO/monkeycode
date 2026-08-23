// 在 bank00 中定位绘图原语子程序定义（地址注释 ; $XXXX 所在行）
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank00');
const targets = ['98A0', '9B7F', '9B6F', '9B74', '997A', '99F0', '9A0D', '9A35', '98EA', '9FA8', '9F89', '9F96', '9F69', '9FA8', '9EED'];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => {
    const m = l.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/);
    if (m && targets.includes(m[1].toUpperCase())) {
      hits.push(`${i + 1}: ${l.trim()}`);
    }
  });
  if (hits.length) {
    console.log(`== ${f} ==`);
    for (const h of hits) console.log(h);
  }
}
