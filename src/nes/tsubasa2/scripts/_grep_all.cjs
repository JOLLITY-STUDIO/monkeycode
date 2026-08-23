// grep 所有 asm 中 $001B 的位操作（bit0 输入开关）与 Start(0x08) 检测
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm');
for (const bank of fs.readdirSync(dir)) {
  const bdir = path.join(dir, bank);
  if (!fs.statSync(bdir).isDirectory()) continue;
  for (const f of fs.readdirSync(bdir)) {
    if (!f.endsWith('.s')) continue;
    const t = fs.readFileSync(path.join(bdir, f), 'utf8');
    const L = t.split(/\r?\n/);
    L.forEach((ln, i) => {
      if (/\$001B|\$001E/.test(ln) || /AND #\$0[18F]|ORA #\$0[18]|EOR #\$0[18]/.test(ln)) {
        console.log(`${bank}/${f}:${i + 1}: ${ln.trim()}`);
      }
    });
  }
}
