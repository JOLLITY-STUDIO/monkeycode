// 找 $0468 精灵影射 与 $0200 OAM 的关系（谁拷贝 $0468→$0200）
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm');
const pats = [/\$0468/, /\$0200/, /\$C982/];
for (const bank of fs.readdirSync(dir)) {
  const bdir = path.join(dir, bank);
  if (!fs.statSync(bdir).isDirectory()) continue;
  for (const f of fs.readdirSync(bdir)) {
    if (!f.endsWith('.s')) continue;
    const L = fs.readFileSync(path.join(bdir, f), 'utf8').split(/\r?\n/);
    L.forEach((ln, i) => {
      for (const p of pats) {
        if (p.test(ln)) { console.log(`${bank}/${f}:${i + 1}: ${ln.trim()}`); break; }
      }
    });
  }
}
