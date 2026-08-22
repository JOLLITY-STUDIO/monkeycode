/** grep_seg.cjs — 在 cpu 分段日志里搜索子串 */
const fs = require('fs');
const file = process.argv[2];
const needle = process.argv[3];
const ctx = parseInt(process.argv[4] || '0', 10);
const max = parseInt(process.argv[5] || '30', 10);

const lines = fs.readFileSync(file, 'utf8').split('\n');
let c = 0;
for (let i = 0; i < lines.length && c < max; i++) {
  if (lines[i].includes(needle)) {
    for (let j = Math.max(0, i - ctx); j <= Math.min(lines.length - 1, i + ctx); j++) {
      console.log('L' + j + ': ' + lines[j].slice(0, 130));
    }
    console.log('---');
    c++;
  }
}
console.log('hits shown:', c);
