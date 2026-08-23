const fs = require('fs');
const files = [
  'src/core/ppu/index.ts',
  'src/core/papu/index.ts',
  'src/core/papu/channel-square.ts',
  'src/core/papu/channel-dm.ts',
  'src/core/ppu/palette-table.ts',
  'src/core/papu/channel-noise.ts',
  'src/core/papu/channel-triangle.ts',
  'src/core/ppu/nametable.ts',
  'src/core/browser/index.ts',
  'src/core/nes.ts',
  'src/core/browser/frame-timer.ts',
  'src/core/index.ts',
  'src/core/tile.ts',
  'src/core/utils.ts',
];
for (const f of files) {
  const p = __dirname + '/../' + f;
  let c = fs.readFileSync(p, 'utf8');
  if (!c.startsWith('// @ts-nocheck')) {
    // 保留文件头注释(如有), 在第一个 import 前插入
    const lines = c.split('\n');
    let idx = 0;
    while (idx < lines.length && /^\s*(\/\/|\/\*|\*)/.test(lines[idx])) idx++;
    lines.splice(idx, 0, '// @ts-nocheck — tsnes 移植代码, JS 风格未声明字段, 保持与模拟器 1:1, 不做类型检查');
    fs.writeFileSync(p, lines.join('\n'));
    console.log('patched: ' + f);
  } else {
    console.log('already: ' + f);
  }
}
