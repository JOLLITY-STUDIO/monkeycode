// 定位 ppuBufAlloc / writePpuBuf / ppuBufEnd / nmiRender / ppuBufWrite 实现位置
const fs = require('fs');
const files = [
  'src/game/prg/code/system/GameSystemService.ts',
  'src/game/prg/code/system/BootRouter.ts',
];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  console.log('===== ' + f + ' =====');
  lines.forEach((ln, i) => {
    if (/ppuBuf|writePpuBuf|ppuBufEnd|nmiRender|ram_0628|writeNT|writeVramByte/.test(ln)) {
      console.log(`${i + 1}: ${ln.trim()}`);
    }
  });
}
