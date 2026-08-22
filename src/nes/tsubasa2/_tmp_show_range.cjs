// 提取 bank28 各文件中指定地址范围 (start, count)
const fs = require('fs');
const start = (process.argv[2] || '868E').toUpperCase();
const count = parseInt(process.argv[3] || '60', 10);
const files = ['_full.s', 'code_main.s', 'code_sub.s', 'code_data.s', 'data_tables.s'];
for (const f of files) {
  const p = 'asm/bank28/' + f;
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  let hit = -1;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t.startsWith('$' + start) || t.includes('$' + start + ':')) { hit = i; break; }
  }
  if (hit >= 0) {
    console.log('=== ' + f + ' line ' + (hit + 1) + ' ($' + start + ') ===');
    console.log(lines.slice(hit, Math.min(lines.length, hit + count)).join('\n'));
    console.log();
    break;
  }
}
