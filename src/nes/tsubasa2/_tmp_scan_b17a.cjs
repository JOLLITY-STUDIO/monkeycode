// 扫描 bank17-data.ts 结构 + 全库 bank17 引用
const fs = require('fs');
const f = 'src/game/prg/data/audio/bank17-data.ts';
const t = fs.readFileSync(f, 'utf8');
const lines = t.split(/\r?\n/);
console.log('总行数:', lines.length, ' 字节:', t.length);
// 找 export 声明
for (let i = 0; i < lines.length; i++) {
  if (/^export|^const [A-Z_]+\s*[:=]|^\/\/ =+/.test(lines[i])) console.log((i + 1) + ': ' + lines[i].slice(0, 100));
}
// 最后 20 行
console.log('\n===== 文件尾部 =====');
console.log(lines.slice(-20).join('\n'));
// 查找 BANK17_DATA 引用
console.log('\n===== 全库 BANK17 引用 =====');
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    const s = fs.statSync(p);
    if (s.isDirectory()) { if (!f.startsWith('.') && f !== 'node_modules' && f !== '_test_out' && f !== 'output' && f !== 'trace' && f !== 'docs') walk(p); }
    else if (/\.ts$/.test(f)) files.push(p);
  }
})('src');
for (const p of files) {
  const c = fs.readFileSync(p, 'utf8');
  if (/bank17|BANK17|BANK_17/i.test(c)) {
    const ls = c.split(/\r?\n/);
    for (let i = 0; i < ls.length; i++) {
      if (/bank17|BANK17|BANK_17/i.test(ls[i])) console.log(p + ':' + (i + 1) + ': ' + ls[i].trim().slice(0, 110));
    }
  }
}
