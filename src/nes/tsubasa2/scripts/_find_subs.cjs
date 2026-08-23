// 定位 bank02 中 88FB/890C/8920/8AF7 子程序定义与调用
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank02');
const targets = ['88FB', '890C', '8920', '8AF7', '9A0D', '9FA8', '9A35', '99F0', '9B7F', '98A0', '98EA', 'A1CB'];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => {
    for (const t of targets) {
      // 地址注释 ; $XXXX 且 XXXX==target，或操作数 $XXXX
      const m = l.match(new RegExp('\\$' + t + '(?:\\b|,)', 'i'));
      if (m && l.includes(';')) hits.push(`${i + 1}: ${l.trim()}`);
    }
  });
  if (hits.length) {
    console.log(`== ${f} ==`);
    for (const h of hits) console.log(h);
  }
}
