// 提取 GameSystemService / SceneController 等中的 OAM 相关方法
const fs = require('fs');
const path = require('path');
const targets = [
  'src/game/prg/code/system/GameSystemService.ts',
  'src/game/prg/code/scene/SceneController.ts',
];
for (const t of targets) {
  const fp = path.join(__dirname, t);
  if (!fs.existsSync(fp)) { console.log(`MISSING ${t}`); continue; }
  const lines = fs.readFileSync(fp, 'utf8').split('\n');
  console.log(`\n### ${t} — OAM/精灵相关行`);
  lines.forEach((l, i) => {
    if (/oam|OAM|0468|0200|Sprite|sprite|精灵|spawn/i.test(l)) {
      console.log(`${i + 1}: ${l.trim().slice(0, 150)}`);
    }
  });
}
console.log('\n--- done ---');
