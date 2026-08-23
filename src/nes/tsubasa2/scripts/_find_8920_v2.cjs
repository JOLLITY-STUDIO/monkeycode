/**
 * 查找 $8E15（tile 渲染）和 $8920（场景数据装载）的真实实现
 */
const fs = require('fs');
const asmRoot = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm';
const p = asmRoot + '/bank00/code_scene.s';
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);

console.log('=== $8E15 区域（tile 渲染）===');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].match(/\$8E[0-9A-F]{2}/) || lines[i].match(/\$8F[0-9A-F]{2}/)) {
    console.log((i+1) + ': ' + lines[i].trim());
  }
}

console.log('\n=== $8920 区域（场景数据装载）===');
// $8920 在 code_main.s 或 code_sub.s
for (const f of ['bank00/code_main.s', 'bank00/code_sub.s', 'bank00/code_render.s']) {
  const fp = asmRoot + '/' + f;
  if (!fs.existsSync(fp)) continue;
  const flines = fs.readFileSync(fp, 'utf8').split(/\r?\n/);
  for (let i = 0; i < flines.length; i++) {
    if (flines[i].match(/\$8920/) || flines[i].match(/\$892[0-9A-F]/) || flines[i].match(/\$893[0-9A-F]/) || flines[i].match(/\$894[0-9A-F]/)) {
      console.log(f + ':' + (i+1) + ': ' + flines[i].trim());
    }
  }
}

// 查找 bank06 的场景表数据（$BF00）
console.log('\n=== bank06 data_tables.s $BF00 区域 ===');
const b06 = fs.readFileSync(asmRoot + '/bank06/data_tables.s', 'utf8').split(/\r?\n/);
for (let i = 0; i < b06.length; i++) {
  if (b06[i].match(/BF00/) || b06[i].match(/BF0/) || (i < 20 && b06[i].startsWith('    .byte'))) {
    console.log((i+1) + ': ' + b06[i].trim());
  }
}
