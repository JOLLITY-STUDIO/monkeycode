// 扫描 src 中 $0200 OAM page / sprites 渲染的消费方
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

const files = walk(path.join(__dirname, 'src'));
const pats = [/0x0200|ram_0200|0200/, /emitSprites|\.sprites\s*=/, /OamStore|oamStore/, /4014/];
for (const f of files) {
  if (f.includes('game\\prg')) continue;
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    for (const re of pats) {
      if (re.test(l)) {
        console.log(`${f}:${i + 1}: ${l.trim().slice(0, 140)}`);
        break;
      }
    }
  });
}
console.log('--- done ---');
