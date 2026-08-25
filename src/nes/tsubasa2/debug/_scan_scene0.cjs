// 重建 emu 中 Scene0 完整时间线：扫描 log 中 Scene0 地址与关键函数的首现帧
const fs = require('fs');
const log = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8');
const lines = log.split(/\r?\n/);
const RE = /^f(\d+)\s+c\d+\s+i\d+\s+A:[0-9A-F]{2}\s+X:[0-9A-F]{2}\s+Y:[0-9A-F]{2}\s+S:[0-9A-F]{2}\s+P:\S+\s+\$(\d+):([0-9A-F]{4}):\s*([0-9A-F ]{0,11})\s*([A-Z]{3})?/;
// Scene0 关键点: 地址 -> 描述
const PTS = [
  ['01', 'A4C0', 'Scene0 入口 JSR $9A0D'],
  ['01', 'A4C4', 'LDA #$10 (等16)'],
  ['01', 'A4C9', 'LDY #$30 (漂移30)'],
  ['01', 'A4D8', 'LDA #$00 ($5B=0)'],
  ['01', 'A4DE', 'LDA #$17 loadChrConfig'],
  ['01', 'A4E3', 'LDA #$68 scrollY'],
  ['01', 'A4E7', 'LDA #$03 loadSceneData(3)'],
  ['01', 'A4F4', 'LDA #$04 (等4)'],
  ['01', 'A4F9', 'JSR $9A35 满亮'],
  ['01', 'A4FC', 'JSR $88FB attr翻转'],
  ['01', 'A4FF', 'LDA #$01 滚动循环'],
  ['01', 'A515', 'LDA #$00 loadSceneData(0)'],
  ['01', 'A51A', 'LDA $001B flags|1'],
  ['01', 'A520', 'LDA #$F0 (等240)'],
  ['01', 'A525', 'LDA #$3C (等60)'],
  ['01', 'A52A', 'LDA $001B flags&~1'],
  ['01', 'A530', 'LDA #$00 复位0090'],
  ['01', 'A538', 'JSR $99F0 渐隐'],
  ['01', 'A53B', 'JSR $9B7F hideOam'],
  ['01', 'A53E', 'JSR $98A0 清NT'],
  ['01', 'A552', 'LDA #$01 loadSceneData(1)'],
  ['01', 'A557', 'LDA #$02 (返回2)'],
];
const first = {};
const frames = [];
let maxFrame = 0;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(RE);
  if (!m) continue;
  const f = parseInt(m[1], 10);
  if (f > maxFrame) maxFrame = f;
  const bk = m[2];
  const addr = m[3];
  const key = bk + ':' + addr;
  if (first[key] === undefined) first[key] = f;
}
console.log('maxFrame in log:', maxFrame);
for (const [bk, addr, desc] of PTS) {
  const k = bk + ':' + addr;
  console.log('$' + k + ' ' + desc + '  首现 f' + first[k]);
}
// 关键 bank00 函数调用
const FN = [
  ['00', '9A0D', '$9A0D BG渐隐'],
  ['00', '99F0', '$99F0 BG+SPR渐隐'],
  ['00', '9A35', '$9A35 满亮'],
  ['00', '9B7F', '$9B7F hideOam'],
  ['00', '98A0', '$98A0 清NT'],
  ['00', '8920', '$8920 loadSceneData'],
  ['00', '8AF7', '$8AF7 loadChrConfig'],
];
for (const [bk, addr, desc] of FN) {
  const k = bk + ':' + addr;
  console.log('$' + k + ' ' + desc + '  首现 f' + first[k]);
}
