// 临时：提取 $9085 与 $9F69 子程序（bank00）
const fs = require('fs');
const files = {
  sub: 'src/asm/bank00/code_sub.s',
  main: 'src/asm/bank00/code_main.s',
  util: 'src/asm/bank00/code_util.s',
  render: 'src/asm/bank00/code_render.s',
  scene: 'src/asm/bank00/code_scene.s',
};
const want = ['9085', '9F69', '8A14', 'AADF', 'AAE0'];
function lineAddr(l) {
  const m = l.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/);
  return m ? m[1].toUpperCase() : null;
}
for (const [file, path] of Object.entries(files)) {
  const text = fs.readFileSync(path, 'utf8');
  const lines = text.split(/\r?\n/);
  const idx = {};
  lines.forEach((l, i) => {
    const a = lineAddr(l);
    if (a && !(a in idx)) idx[a] = i;
  });
  for (const w of want) {
    const i = idx[w];
    if (i !== undefined) {
      console.log('===== ' + file + ' $' + w + ' @line ' + i + ' =====');
      console.log(lines.slice(i, i + 40).join('\n'));
    }
  }
}
