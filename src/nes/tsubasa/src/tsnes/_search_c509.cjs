// 定位 bank_30.asm 中 C509/C50C/C512/C515/C536 与 bank_11.asm 中 89E4 之后的脚本
const fs = require('fs');
const t = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);
for (const pat of ['C509', 'C50C', 'C512', 'C515', 'C536']) {
  const idx = t.findIndex(l => l.includes(pat) && /[0-9A-F]:[0-9A-F]{4}:/.test(l));
  if (idx >= 0) {
    console.log(`=== ${pat} @ line ${idx + 1} ===`);
    for (let i = idx; i < Math.min(idx + 40, t.length); i++) {
      console.log(t[i]);
      if (i > idx && /RTS|JMP/.test(t[i])) break;
    }
  }
  console.log('---');
}
