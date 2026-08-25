// 找 OPENING_TILE_STREAMS 中 0x17 配置及 OPENING_CHR_CONFIGS
const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/scene/opening-data.ts', 'utf8').split(/\r?\n/);
// 找 OPENING_CHR_CONFIGS 定义
for (let i = 0; i < t.length; i++) {
  if (/OPENING_CHR_CONFIGS/.test(t[i])) console.log((i + 1) + ': ' + t[i].trim());
  if (/0x17/.test(t[i])) console.log((i + 1) + ': ' + t[i].trim());
}
console.log('--- bank7-streams.ts ---');
const t2 = fs.readFileSync('src/game/prg/data/scene/bank7-streams.ts', 'utf8').split(/\r?\n/);
for (let i = 0; i < t2.length; i++) {
  if (/17|0x17/i.test(t2[i])) {
    console.log((i + 1) + ': ' + t2[i].trim());
    if (i > 0 && /0x17|17\s*:/.test(t2[i - 1])) console.log('  ^^ 上一行');
  }
}
// dump OPENING_TILE_STREAMS 前几项结构
const m = t2.join('\n').match(/OPENING_TILE_STREAMS\s*[:=]\s*\[([\s\S]*?)\]\s*;/);
if (m) console.log('streams 定义长度:', m[1].length, '首 500 字符:\n' + m[1].slice(0, 500));
