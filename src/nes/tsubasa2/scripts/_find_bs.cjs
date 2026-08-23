// 临时：搜索 buildSprite/sceneCmd9459/sceneCmdLoop 的外部调用者
const fs = require('fs');
const path = require('path');
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.codebuddy') continue;
      walk(p, out);
    } else if (e.name.endsWith('.ts')) out.push(p);
  }
  return out;
}
const files = walk('src');
for (const f of files) {
  if (f.endsWith('TileRenderService.ts')) continue;
  const c = fs.readFileSync(f, 'utf8');
  if (/buildSprite|sceneCmd9459|sceneCmdLoop/.test(c)) {
    console.log('HIT', f);
  }
}
console.log('done');
