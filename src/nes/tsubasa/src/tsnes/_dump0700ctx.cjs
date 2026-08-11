// 打印 bank_01.asm 中 STA ram_0700 附近上下文（子串匹配）
const fs = require('fs');
const path = require('path');
function ctx(file, needle, before = 16, after = 5) {
  const s = fs.readFileSync(path.join('_tmp_bzk_out', file), 'utf8');
  const lines = s.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(needle)) {
      console.log(`\n=== ${file} ${needle} ===`);
      for (let k = Math.max(0, i - before); k < Math.min(lines.length, i + after); k++) console.log(lines[k]);
      return;
    }
  }
  console.log(`${file} ${needle}: NOT FOUND`);
}
ctx('bank_01.asm', '00:819C:');
ctx('bank_01.asm', '00:824F:');
ctx('bank_01.asm', '00:82C5:');
ctx('bank_01.asm', '00:82D7:');
ctx('bank_01.asm', '00:8394:');
ctx('bank_01.asm', '00:86D4:');
ctx('bank_01.asm', '00:8712:');
ctx('bank_00.asm', '00:8245:');
ctx('bank_00.asm', '00:8287:');
ctx('bank_00.asm', '00:82DC:');
ctx('bank_00.asm', '00:85FC:');
