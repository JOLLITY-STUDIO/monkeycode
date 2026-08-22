// 临时: 找 bank24 $80EA/$80CB 的 asm 定义
const fs = require('fs');
const s = fs.readFileSync('asm/bank24/_full.s', 'utf8').split('\n');
const hits = [];
s.forEach((l, i) => {
  if (/\$80EA|\$80CB|\$80EE|\$80E6/.test(l)) hits.push(i);
});
const seen = new Set();
for (const i of hits) {
  for (let k = Math.max(0, i - 8); k < Math.min(s.length, i + 18); k++) {
    if (seen.has(k)) continue;
    seen.add(k);
    console.log(String(k + 1).padStart(4) + '|' + s[k]);
  }
  console.log('====');
}
