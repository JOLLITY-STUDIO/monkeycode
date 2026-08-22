// 临时: bank28 $8C06-$8C90 asm 完整
const fs = require('fs');
for (const f of ['asm/bank28/_full.s', 'asm/bank28/code_sub.s', 'asm/bank28/code_main.s']) {
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  const idx = lines.findIndex(l => /\$8C06/.test(l) && /JMP|;/.test(l));
  if (idx < 0) continue;
  console.log(`===== ${f} (found at ${idx + 1}) =====`);
  for (let k = Math.max(0, idx - 3); k < Math.min(lines.length, idx + 80); k++) {
    console.log(`${String(k + 1).padStart(4)}|${lines[k]}`);
  }
  break;
}
