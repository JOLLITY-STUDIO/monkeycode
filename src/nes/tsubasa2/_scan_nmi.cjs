// 查找 $C76E-$C820 NMI 区域 + $0468 shadow OAM 拷贝逻辑
const fs = require('fs');
const path = require('path');

function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.s')) out.push(p);
  }
  return out;
}

const files = walk(path.join(__dirname, 'asm'));
const pats = [/0468/, /4014/, /2003/, /\$C76E|\$C78B|\$C820|C76E|C78B/];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  const hits = [];
  lines.forEach((l, i) => {
    for (const re of pats) {
      if (re.test(l)) { hits.push({ i, l }); break; }
    }
  });
  if (hits.length) {
    console.log(`\n### ${f} (${hits.length} hits)`);
    for (const h of hits.slice(0, 40)) {
      const from = Math.max(0, h.i - 4);
      const to = Math.min(lines.length - 1, h.i + 4);
      for (let j = from; j <= to; j++) console.log(`${j + 1}: ${lines[j].trim().slice(0, 130)}`);
      console.log('  ...');
    }
  }
}
console.log('\n--- done ---');
