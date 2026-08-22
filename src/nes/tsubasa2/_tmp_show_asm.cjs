// 从 asm 提取指定地址段的代码 (bank28, $8000 基址)
const fs = require('fs');
const files = ['code_main.s', 'code_sub.s', '_full.s', 'code_data.s', 'data_tables.s'];
const target = (process.argv[2] || '8C7F').toUpperCase();
for (const f of files) {
  const p = 'asm/bank28/' + f;
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  let hit = -1;
  for (let i = 0; i < lines.length; i++) {
    // 匹配行尾注释地址或行内地址标记, 如 "$8C7F:" 或 "; $8C7F"
    if (lines[i].includes('$' + target + ':') || lines[i].includes('; $' + target) || lines[i].trim().startsWith('$' + target)) { hit = i; break; }
  }
  if (hit >= 0) {
    console.log('=== ' + f + ' line ' + (hit + 1) + ' ===');
    console.log(lines.slice(Math.max(0, hit - 2), Math.min(lines.length, hit + 90)).join('\n'));
    console.log();
  }
}
if (process.argv[3]) {
  // 第二目标: 继续搜索
  const t2 = process.argv[3].toUpperCase();
  for (const f of files) {
    const p = 'asm/bank28/' + f;
    if (!fs.existsSync(p)) continue;
    const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
    let hit = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('$' + t2 + ':') || lines[i].includes('; $' + t2) || lines[i].trim().startsWith('$' + t2)) { hit = i; break; }
    }
    if (hit >= 0) {
      console.log('=== ' + f + ' line ' + (hit + 1) + ' (target ' + t2 + ') ===');
      console.log(lines.slice(Math.max(0, hit - 2), Math.min(lines.length, hit + 90)).join('\n'));
      console.log();
    }
  }
}
