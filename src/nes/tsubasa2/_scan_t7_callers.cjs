// 扫描 task7 三个 service 的调用方
const fs = require('fs');
const path = require('path');
const root = 'src/game';
const pats = [
  /SpriteService/g,
  /SpriteAnimationService/g,
  /TeamRosterService/g,
  /\.spawn\(/g,
  /getRoster\(/g,
  /loadAnim\(/g,
  /\.update\(/g,
];
function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.ts')) out.push(p);
  }
  return out;
}
for (const f of walk(root)) {
  const txt = fs.readFileSync(f, 'utf8');
  const lines = txt.split('\n');
  lines.forEach((ln, i) => {
    for (const p of pats) {
      p.lastIndex = 0;
      if (p.test(ln)) {
        console.log(`${f}:${i + 1}: ${ln.trim()}`);
        break;
      }
    }
  });
}
