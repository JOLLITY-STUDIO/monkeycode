// 在 opening-all.log 定位 Scene0 ($A4C1) 及关键函数执行的帧号
const fs = require('fs');
const log = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8');
// 全文 matchAll 多流交错
const re = /f(\d+)\s+c\d+\s+i\d+\s+A:[0-9A-F]{2}\s+X:[0-9A-F]{2}\s+Y:[0-9A-F]{2}\s+S:[0-9A-F]{2}\s+P:\S+\s+\$(\d+):([0-9A-F]{4}):\s*((?:[0-9A-F]{2}\s*)*?)([A-Z]{3})/g;
const targets = {
  A4C1: 'Scene0入口 JSR $9A0D',
  A4C4: 'LDA #$10',
  A4C9: 'LDY #$30',
  A4DE: 'LDA #$17 loadChrConfig',
  A4E3: 'LDA #$68',
  A4E7: 'LDA #$03 loadSceneData',
  A4F4: 'LDA #$04',
  A4F9: 'JSR $9A35',
  A4FC: 'JSR $88FB',
  A4FF: 'LDA #$01 滚动循环',
  A515: 'LDA #$00 loadSceneData0',
  A520: 'LDA #$F0 等240',
  A525: 'LDA #$3C 等60',
  A530: 'LDA #$00 复位',
  A538: 'JSR $99F0 渐隐',
  A53B: 'JSR $9B7F hideOam',
  A53E: 'JSR $98A0 清NT',
  A552: 'LDA #$01 loadSceneData1',
  A557: 'LDA #$02 RTS',
};
const found = {};
let m;
while ((m = re.exec(log)) !== null) {
  const f = parseInt(m[1], 10);
  const addr = m[2].toUpperCase();
  const op = m[4];
  const t = targets[addr];
  if (t && !found[addr]) {
    found[addr] = { f, line: m[0].slice(0, 130) };
  }
}
for (const [a, t] of Object.entries(targets)) {
  if (found[a]) console.log('$' + a + ' ' + t + '  首次 f' + found[a].f + ': ' + found[a].line);
  else console.log('$' + a + ' ' + t + '  （未找到）');
}
