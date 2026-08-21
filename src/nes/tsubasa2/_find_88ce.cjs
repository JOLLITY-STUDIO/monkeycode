// 查找 sub_88CE 区域 (影子 OAM $0468 → 硬件 OAM $0200 拷贝)
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'asm');
for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f);
  if (!fs.statSync(p).isDirectory()) continue;
  for (const f2 of fs.readdirSync(p)) {
    if (!f2.endsWith('.s')) continue;
    const fp = path.join(p, f2);
    const lines = fs.readFileSync(fp, 'utf8').split('\n');
    lines.forEach((l, i) => {
      if (/\$88CE|88CE|88D2/.test(l)) {
        console.log(`${fp}:${i + 1}: ${l.trim().slice(0, 130)}`);
      }
    });
  }
}
console.log('--- done ---');
