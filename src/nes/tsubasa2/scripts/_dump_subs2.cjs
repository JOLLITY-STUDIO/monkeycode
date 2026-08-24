// 临时：提取 bank00 关键子程序定义（行尾注释地址为定义）
const fs = require('fs');
const s = fs.readFileSync('src/asm/bank00/code_sub.s', 'utf8');
const ls = s.split(/\r?\n/);
const idx = {};
ls.forEach((l, i) => { const m = l.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/); if (m) idx[m[1].toUpperCase()] = i; });
const out = [];
const dump = (name, len) => {
  const i = idx[name];
  out.push('===== ' + name + ' @line ' + i + ' =====');
  if (i === undefined) { out.push('NF'); return; }
  out.push(ls.slice(i, i + len).join('\n'));
};
dump('9B28', 30);
dump('9B5E', 20);
dump('9B91', 16);
dump('8976', 34);
dump('9E7C', 30);
dump('9E36', 20);
dump('88CA', 16);
dump('8895', 16);
dump('8920', 16);
dump('9F96', 14);
dump('9F89', 14);
dump('9FA8', 12);
fs.writeFileSync('temp_subs2.txt', out.join('\n\n'));
console.log('written');
