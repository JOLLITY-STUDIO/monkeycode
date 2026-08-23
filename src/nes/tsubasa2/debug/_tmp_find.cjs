const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const c = fs.readFileSync(root + '/src/game/prg/code/system/GameSystemService.ts', 'utf8');
const lines = c.split('\n');
// 找 004D / 004E 写入点
lines.forEach((l, i) => {
  if (/0x004[DdEe]/.test(l) && /wr|rd|Ptr/.test(l)) console.log((i + 1) + ': ' + l.trim());
});
console.log('===== 004D 上下文 (sceneLoad 区) =====');
// 找 sceneLoad 方法
for (let i = 0; i < lines.length; i++) {
  if (/sub8B09|sceneLoad|sub82EC|sub8297/.test(lines[i]) && /private|public/.test(lines[i])) {
    console.log((i + 1) + ': ' + lines[i].trim());
  }
}
