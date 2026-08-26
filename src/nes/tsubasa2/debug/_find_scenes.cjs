// 临时脚本：在 bank02 asm 中定位场景 12-23 的地址注释
const fs = require('fs');
const path = require('path');

const targets = {
  '8602': 'Scene12', '861c': 'Scene13', '8629': 'Scene14', '8650': 'Scene15',
  '869c': 'Scene16', '877a': 'Scene17', '8782': 'Scene18', '878d': 'Scene19',
  '87bd': 'Scene20', '87ce': 'Scene21', '87d6': 'Scene22', '87fa': 'Scene23',
  '859a': 'Scene5-ish', '85a8': 'Scene5', '85b0': 'Scene6', '85b8': 'Scene7',
  '85bf': 'Scene8', '85cd': 'Scene9', '85db': 'Scene10', '85e8': 'Scene11',
};

const files = ['_full.s', 'code_main.s', 'code_sub.s', 'code_data.s', 'data_tables.s'];
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank02');

for (const f of files) {
  const p = path.join(dir, f);
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  // 收集含目标地址的行号
  const found = [];
  lines.forEach((ln, i) => {
    for (const [addr, name] of Object.entries(targets)) {
      if (ln.includes('; $' + addr)) found.push({ addr, name, line: i + 1, text: ln.trim() });
    }
  });
  if (found.length) {
    console.log(`=== ${f} ===`);
    for (const f of found) console.log(`  ${f.addr} ${f.name} @${f.line}: ${f.text}`);
  }
}
console.log('done');
