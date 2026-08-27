// 临时：查看 emu pt.json 38-63 内容
const fs = require('fs');
const p = JSON.parse(fs.readFileSync('output/emu-full/frame-0010/pt.json', 'utf8'));
console.log('pt isArray=', Array.isArray(p), 'len=', Array.isArray(p) ? p.length : Object.keys(p).length);
const arr = Array.isArray(p) ? p : Object.values(p);
for (const e of arr) {
  if (e.idx >= 38 && e.idx <= 63) {
    console.log('idx', e.idx, 'p0=' + JSON.stringify(e.plane0), 'p1=' + JSON.stringify(e.plane1));
  }
}
