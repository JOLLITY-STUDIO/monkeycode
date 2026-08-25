// 在 opening-all.log 中直接搜目标地址（含 bank 前缀变体）
const fs = require('fs');
const log = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8');
const lines = log.split(/\r?\n/);
const targets = ['A4C1', 'A4F9', 'A538', 'A557', '9A0D', '84C1'];
for (const tg of targets) {
  const hits = [];
  for (let i = 0; i < lines.length && hits.length < 3; i++) {
    if (lines[i].includes(':' + tg + ':')) hits.push(lines[i].slice(0, 140));
  }
  console.log('=== ' + tg + ' (' + hits.length + ' hits shown) ===');
  for (const h of hits) console.log(h);
}
// 也显示 log 前 3 行和某行地址格式样例
console.log('\n=== 地址格式样例 ===');
const sample = lines.filter((l) => l.includes('JSR')).slice(0, 5);
for (const s of sample) console.log(s.slice(0, 140));
