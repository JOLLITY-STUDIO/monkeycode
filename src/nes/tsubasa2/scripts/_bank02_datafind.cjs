// 在 bank02 asm 内找 $A8xx/$A9xx/$AAxx/$ABxx 数据表参考（CPU 绝对地址）
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank02');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
const hits = new Map(); // addr -> [{file,line,text}]
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const ls = t.split(/\r?\n/);
  for (let i = 0; i < ls.length; i++) {
    const re = /\$([89A-F][0-9A-F]{2})/g;
    let m;
    while ((m = re.exec(ls[i])) !== null) {
      const addr = parseInt(m[1], 16);
      if (addr >= 0xa000 && addr <= 0xabff) {
        if (!hits.has(m[1])) hits.set(m[1], []);
        hits.get(m[1]).push(f + ':' + (i + 1) + ':' + ls[i].trim());
      }
    }
  }
}
// 重点关注我们关心的表地址
for (const want of ['A491','A492','A47','A75','A97','B1F','B21','B22','C6D','C71','DF','E0']) {
  const arr = [];
  for (const [k, v] of hits) {
    if (k.startsWith(want)) arr.push(k);
  }
  console.log(`--- $${want}xxx refs: ${arr.join(', ')} ---`);
  for (const k of arr) {
    console.log('  $' + k);
    for (const e of hits.get(k).slice(0, 5)) console.log('    ' + e);
  }
}
