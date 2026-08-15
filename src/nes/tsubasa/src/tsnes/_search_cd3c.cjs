const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes';
const names = fs.readdirSync(dir).filter(f => /_b30|_tmp_b30|b30/i.test(f) && /\.(txt|cjs)$/.test(f));
console.log(names.join('\n'));
// 搜索 CD3C 反汇编
for (const f of names) {
  try {
    const t = fs.readFileSync(dir + '/' + f, 'utf8');
    const lines = t.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      if (/CD3[C-F]|CD4[0-9]/.test(lines[i])) {
        console.log('\n=== ' + f + ':' + (i + 1) + ' ===');
        for (let j = i; j < Math.min(i + 40, lines.length); j++) console.log(lines[j]);
        i += 40;
      }
    }
  } catch (e) { /* skip */ }
}
