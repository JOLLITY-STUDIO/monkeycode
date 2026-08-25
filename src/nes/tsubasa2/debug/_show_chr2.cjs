// 提取 loadChrSlot / applySceneEndBankOverride / applyChrFrom009e / midFrameChrSwitch
const fs = require('fs');
const lines = fs.readFileSync('src/game/prg/code/system/InterruptService.ts', 'utf8').split('\n');
const pats = ['loadChrSlot(', 'applySceneEndBankOverride(', 'applyChrFrom009e(', 'midFrameChrSwitch('];
for (let i = 0; i < lines.length; i++) {
  if (pats.some(p => lines[i].includes(p))) {
    const s = Math.max(0, i - 2), e = Math.min(lines.length, i + 45);
    console.log('===== line ' + (i + 1) + ' =====');
    for (let j = s; j < e; j++) console.log(String(j + 1).padStart(4) + '|' + lines[j]);
  }
}
