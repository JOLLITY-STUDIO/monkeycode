// 查 OPENING_TILE_STREAMS 中 index 0x17 的结构
const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/scene/bank7/streams.ts', 'utf8').split(/\r?\n/);
// 找到定义方式
for (let i = 0; i < Math.min(t.length, 40); i++) console.log((i + 1) + ': ' + t[i]);
// 找 0x17 项（含上下文）
for (let i = 0; i < t.length; i++) {
  if (/0x17|17\s*[:=]/.test(t[i]) && !/0x170|0x17[0-9a-fA-F]{2}/.test(t[i])) {
    const from = Math.max(0, i - 2);
    for (let j = from; j <= Math.min(t.length - 1, i + 3); j++) console.log((j + 1) + ': ' + t[j]);
    console.log('---');
  }
}
