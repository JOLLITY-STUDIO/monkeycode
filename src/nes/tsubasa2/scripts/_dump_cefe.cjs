const fs = require('fs');
const lines = fs.readFileSync('src/asm/bank30/code_main.s', 'utf8').split(/\r?\n/);
const map = {};
lines.forEach((s, i) => {
  const m = s.match(/;\s*\$([0-9A-F]{4})/);
  if (m) map[m[1]] = i;
});
for (const t of ['CEFE', 'CF1C', 'C6BE', 'C821']) {
  const i = map[t];
  if (i === undefined) { console.log(`!! ${t} not found`); continue; }
  console.log(`\n############ $${t} @line ${i + 1} ############`);
  for (let j = Math.max(0, i - 2); j < Math.min(lines.length, i + 70); j++) {
    console.log(`${String(j + 1).padStart(4)}|${lines[j]}`);
  }
}
// 搜索 $004A / $004B 写入
console.log('\n========== 搜索 STA $004A / STA $004B / $004A ==========');
lines.forEach((s, i) => {
  if (/STA \$004[AB]|LDA \$004[AB]|INC \$004[AB]|DEC \$004[AB]/.test(s)) console.log(`${i + 1}: ${s.trim()}`);
});
