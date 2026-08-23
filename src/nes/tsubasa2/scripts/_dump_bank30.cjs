const fs = require('fs');
const lines = fs.readFileSync('src/asm/bank30/code_main.s', 'utf8').split(/\r?\n/);
// 打印所有 ; $xxxx 行号，然后定位 $C64E / $CEFE / $C400 / $C401
const map = {};
lines.forEach((s, i) => {
  const m = s.match(/;\s*\$([0-9A-F]{4})/);
  if (m) map[m[1]] = i;
});
for (const t of ['C64E', 'CEFE', 'C400', 'C401', 'CB8B', 'CB35']) {
  const i = map[t];
  if (i === undefined) { console.log(`!! ${t} not found`); continue; }
  console.log(`\n############ $${t} @line ${i + 1} ############`);
  for (let j = Math.max(0, i - 2); j < Math.min(lines.length, i + 60); j++) {
    console.log(`${String(j + 1).padStart(4)}|${lines[j]}`);
    if (j > i && /RTS|JMP/.test(lines[j]) && j > i + 3) break;
  }
}
