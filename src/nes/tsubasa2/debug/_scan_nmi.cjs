const fs = require('fs');
const path = require('path');
const asmDir = path.resolve(__dirname, '../asm');
const hits = [];

// 扫描所有 bank 的 asm 文件, 找 STA $001B / $001B 引用 / NMI 向量
const files = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (f.endsWith('.s')) files.push(p);
  }
}
walk(asmDir);

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const ls = s.split('\n');
  for (let i = 0; i < ls.length; i++) {
    const l = ls[i];
    if (l.includes('001B') || l.toUpperCase().includes('NMI') || l.includes('FFFA') || l.includes('FFFE')) {
      hits.push(`${f.replace(/\\/g, '/').split('/asm/')[1]}:${i + 1}: ${l.trim()}`);
    }
  }
}
console.log('命中 ' + hits.length + ' 处:');
console.log(hits.slice(0, 120).join('\n'));
