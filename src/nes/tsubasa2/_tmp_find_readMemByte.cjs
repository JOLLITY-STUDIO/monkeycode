// 临时: 找 readMemByte 定义
const fs = require('fs');
for (const f of ['src/game/prg/code/match/MatchHudService.ts',
                 'src/game/prg/code/match/MatchAuxService.ts',
                 'src/game/prg/code/match/MatchConfigService.ts',
                 'src/game/prg/code/match/MatchEngineService.ts',
                 'src/game/prg/code/match/MatchTurnService.ts']) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/readMemByte\(/.test(l) && /private|protected|readMemByte\(addr/.test(l)) {
      console.log(`${f}:${i + 1}| ${l.trim()}`);
    }
  });
}
// bank24 PRG 数据访问辅助
const hud = fs.readFileSync('src/game/prg/code/match/MatchHudService.ts', 'utf8').split('\n');
hud.forEach((l, i) => {
  if (/PRG|BANK|bank24|rom|Rom|readMem/.test(l)) console.log(`HUD:${i + 1}| ${l.trim()}`);
});
