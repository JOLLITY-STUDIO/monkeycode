// 扫描 game/prg 下所有对 $0200 / 0x0200 / 0200+ 的写入模式
const fs = require('fs');
const path = require('path');

function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.ts')) out.push(p);
  }
  return out;
}

const files = walk(path.join(__dirname, 'src', 'game'));
const pats = [/0x0200|0200|OAM|oam/i];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    for (const re of pats) {
      if (re.test(l)) {
        console.log(`${f}:${i + 1}: ${l.trim().slice(0, 150)}`);
        break;
      }
    }
  });
}
console.log('--- done ---');
