// 给 core 移植文件加 @ts-nocheck（复用旧工程方案，用完删除）
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const files = [
  'src/core/browser/frame-timer.ts',
  'src/core/browser/index.ts',
  'src/core/debug/debug-canvas.ts',
  'src/core/debug/debug-panel.ts',
  'src/core/debug/tracer.ts',
  'src/core/nes.ts',
  'src/core/papu/channel-dm.ts',
  'src/core/papu/channel-noise.ts',
  'src/core/papu/channel-square.ts',
  'src/core/papu/channel-triangle.ts',
  'src/core/papu/index.ts',
  'src/core/ppu/index.ts',
  'src/core/ppu/nametable.ts',
  'src/core/ppu/palette-table.ts',
  'src/core/tile.ts',
  'src/core/utils.ts',
];
for (const f of files) {
  const p = path.join(root, f);
  let t = fs.readFileSync(p, 'utf8');
  if (t.startsWith('// @ts-nocheck')) { console.log('SKIP ' + f); continue; }
  // 保留首行注释（如 "// ============..."），在其上方插入
  const lines = t.split('\n');
  let idx = 0;
  while (idx < lines.length && lines[idx].startsWith('//')) idx++;
  lines.splice(idx, 0, '// @ts-nocheck  // tsnes 移植核心，非翻译层，跳过类型检查');
  fs.writeFileSync(p, lines.join('\n'), 'utf8');
  console.log('PATCHED ' + f);
}
