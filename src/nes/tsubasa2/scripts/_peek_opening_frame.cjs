// 临时脚本：按 H5 frame 抽取 OpeningFrameTable 的 palette / NT 信息
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const idx = s.indexOf('const OPENING_FRAMES:');
const arrStart = s.indexOf('[', idx);
let depth = 0, arrEnd = -1;
for (let i = arrStart; i < s.length; i++) {
  if (s[i] === '[') depth++;
  else if (s[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
}
const arrStr = s.slice(arrStart, arrEnd + 1);

const frames = [];
const re = /f:(\d+)/g;
let m;
while ((m = re.exec(arrStr)) !== null) frames.push(parseInt(m[1]));
console.log('FIRST', frames[0], 'LAST', frames[frames.length - 1], 'COUNT', frames.length);
console.log('NEAR 1940:', frames.slice(1920, 1970).join(','));
