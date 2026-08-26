// 临时脚本：解析 OpeningScreenTable 14 屏摘要
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningScreenTable.ts', 'utf8');
const start = s.indexOf("export const OPENING_SCREENS:");
const arrStart = s.indexOf('[', start);
let depth = 0, arrEnd = -1;
for (let i = arrStart; i < s.length; i++) {
  if (s[i] === '[') depth++;
  else if (s[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
}
const arr = s.slice(arrStart, arrEnd + 1);

// 顶层 { } 拆分
let out = [];
let d = 0, cur = '';
for (let i = 0; i < arr.length; i++) {
  const c = arr[i];
  if (c === '{') { d++; cur += c; }
  else if (c === '}') { d--; cur += c; if (d === 0) { out.push(cur); cur = ''; } }
  else if (d > 0) cur += c;
}
console.log('SCREEN COUNT', out.length);
out.forEach((blk, i) => {
  const g = (k) => {
    const m = blk.match(new RegExp("'" + k + "'\\s*:\\s*([^,}]+)"));
    return m ? m[1].trim().replace(/'/g, '') : '?';
  };
  console.log(`#${i} id=${g('id')} label=${g('label')} start=${g('startFrame')} end=${g('endFrame')} dur=${g('duration')} chr=${g('chr')}`);
});
