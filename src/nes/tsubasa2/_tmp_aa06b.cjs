const fs = require('fs');
const c = fs.readFileSync('asm/bank00/_full.s', 'utf8').split('\n');
// $AA06 在 bank0 $A000 窗口? 不对, bank0 是 $8000 窗口
// $AA06 = $A000 窗口, R7=bank2 时 = bank2 偏移 $2A06
// 但 $AA06 被调用时 R7 可能不是 bank2
// 从 trace 看 preMainLoopInit 在 $82E2 调 JSR $AA06
// $82E2 在 $8000 窗口 (R6=bank0), $AA06 在 $A000 窗口 (R7=?)
// preMainLoopInit 时 R7=bank2 ($0025=0x02)
// 所以 $AA06 = bank2 偏移 $2A06
// bank02 asm 用 $8000 基址, 所以 $2A06 = $AA06 - $8000 = $2A06
// 但 bank02 _full.s 没找到... 可能地址标注用 $8A06 而非 $AA06
for (let i = 0; i < c.length; i++) {
  if (c[i].match(/;\s*\$AA06\b/)) {
    console.log('bank00 line ' + (i+1) + ': ' + c[i]);
  }
}
// 也搜 bank02
const c2 = fs.readFileSync('asm/bank02/_full.s', 'utf8').split('\n');
for (let i = 0; i < c2.length; i++) {
  if (c2[i].match(/;\s*\$8A06\b/) || c2[i].match(/;\s*\$AA06\b/)) {
    console.log('bank02 line ' + (i+1) + ': ' + c2[i]);
    for (let j = i; j < Math.min(i + 30, c2.length); j++) {
      console.log('  ' + (j+1) + ': ' + c2[j]);
    }
    break;
  }
}
