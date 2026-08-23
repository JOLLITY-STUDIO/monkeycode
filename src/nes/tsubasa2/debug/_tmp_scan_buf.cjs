const fs = require('fs');
const path = require('path');
const files = [
  'src/game/prg/code/story/ScriptEngine.ts',
  'src/game/prg/code/system/BootRouter.ts',
  'src/game/prg/code/system/InterruptService.ts',
  'src/game/prg/code/system/GameSystemService.ts',
];
for (const f of files) {
  const full = path.resolve(__dirname, '..', f);
  const lines = fs.readFileSync(full, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (/0628|05E8|ppuBufAlloc|commitVram|beginVram|writeVramByte|endVram|fillText|writeCharTiles/.test(l)) {
      console.log(`${f}:${i + 1}: ${l.trim()}`);
    }
  });
}
