// 搜索 SpriteService / spawn / SpriteAnimationService 在 src 中的引用
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
const patterns = [/SpriteService/, /\.spawn\(/, /SpriteAnimationService/, /ram_0200/, /oam\b/];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  for (const re of patterns) {
    if (re.test(content)) {
      const lines = content.split('\n');
      lines.forEach((l, i) => {
        if (re.test(l)) console.log(`${f}:${i + 1}: ${l.trim()}`);
      });
    }
  }
}
console.log('--- done ---');
