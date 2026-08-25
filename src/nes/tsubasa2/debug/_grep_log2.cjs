// 直接搜 '01:A4C' 和 '$01:A' 样本
const fs = require('fs');
const log = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8');
const lines = log.split(/\r?\n/);
let a4c = [];
let a49 = [];
let sample = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('01:A4C')) { a4c.push(lines[i].slice(0, 150)); if (a4c.length > 5) break; }
}
console.log('=== 01:A4C (前5) ===');
for (const s of a4c) console.log(s);
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('01:A49')) { a49.push(lines[i].slice(0, 150)); if (a49.length > 3) break; }
}
console.log('=== 01:A49 (前3) ===');
for (const s of a49) console.log(s);
let cnt = 0;
for (let i = 0; i < lines.length && cnt < 5; i++) {
  if (lines[i].includes('$01:A')) { sample.push(lines[i].slice(0, 140)); cnt++; }
}
console.log('=== $01:A 样本 ===');
for (const s of sample) console.log(s);
