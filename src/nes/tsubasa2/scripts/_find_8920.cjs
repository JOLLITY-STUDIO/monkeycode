/**
 * 深入查找场景 3 NT 数据和 $8920/$8AF7 真实行为
 */
const fs = require('fs');
const asmRoot = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm';

// 查找 $8920（场景装载）在 bank00 或 bank02
const files = [
  'bank00/code_sub.s', 'bank00/code_scene.s', 'bank00/code_main.s',
  'bank02/code_sub.s', 'bank02/code_main.s',
  'bank00/code_render.s',
];

for (const f of files) {
  const p = asmRoot + '/' + f;
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    // 查找 $8920 入口或场景装载逻辑
    if (lines[i].match(/\$8920/) || lines[i].match(/\$8AF7/) || lines[i].match(/BF00/)) {
      console.log(f + ':' + (i+1) + ': ' + lines[i].trim());
    }
  }
}

console.log('\n=== bank00 code_scene.s $8920 区域 ===');
const p = asmRoot + '/bank00/code_scene.s';
if (fs.existsSync(p)) {
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/\$89[0-9A-F]{2}/) || lines[i].match(/\$8A[0-9A-F]{2}/)) {
      console.log((i+1) + ': ' + lines[i].trim());
      if (i > 0 && lines[i-1].match(/; \$/)) console.log('  prev: ' + lines[i-1].trim());
    }
  }
}

console.log('\n=== bank00 code_scene.s $8AF7 区域（CHR 配置）===');
if (fs.existsSync(p)) {
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  let inRange = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('$8AF7')) inRange = true;
    if (inRange) {
      console.log((i+1) + ': ' + lines[i].trim());
      if (i > 0 && lines[i].match(/^\s*\.byte/)) {
        // 打印后续 .byte 数据
      }
    }
    if (inRange && lines[i].includes('$8BB')) break;
  }
}
