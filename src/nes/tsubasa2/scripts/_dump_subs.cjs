// 临时：提取 bank00 子程序体（地址标注在行尾 `; $XXXX`）
const fs = require('fs');
const files = {
  sub: 'src/asm/bank00/code_sub.s',
  main: 'src/asm/bank00/code_main.s',
  util: 'src/asm/bank00/code_util.s',
  render: 'src/asm/bank00/code_render.s',
  scene: 'src/asm/bank00/code_scene.s',
};
const want = {
  sub: ['9B91', '9F89', '9F96', '9E7C', '9E36', '9FA8', '88CA', '9B28', '9B5E', '9B7F', '9F69'],
  main: ['8895', '8920', '8976', '88FB', '890C', '98EA', '98E8', '9A0D', '9A35', '9A71', '99F0', '8AF7'],
  util: ['9B91', '9E7C', '9E36', '9F89', '9F96'],
};
function lineAddr(l) {
  const m = l.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/);
  return m ? m[1].toUpperCase() : null;
}
for (const [file, adds] of Object.entries(want)) {
  const text = fs.readFileSync(files[file], 'utf8');
  const lines = text.split(/\r?\n/);
  const idx = {};
  lines.forEach((l, i) => {
    const a = lineAddr(l);
    if (a && !(a in idx)) idx[a] = i;
  });
  for (const w of adds) {
    const i = idx[w];
    console.log('===== ' + file + ' $' + w + ' @line ' + i + ' =====');
    if (i !== undefined) console.log(lines.slice(i, i + 32).join('\n'));
    else console.log('NOT FOUND');
  }
}
