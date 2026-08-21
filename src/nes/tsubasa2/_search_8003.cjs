// 查找 bank22 入口 $8003 的调用点 + 描述符来源 + 旧版 spawn 实现
const fs = require('fs');
const path = require('path');

function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.s') || p.endsWith('.ts') || p.endsWith('.cjs') || p.endsWith('.txt')) out.push(p);
  }
  return out;
}

const dir = __dirname;
const files = walk(dir).filter(f => !f.includes('node_modules'));
const pats = [
  /JSR\s+\$8003/,
  /JSR\s+\$8005/,
  /JMP\s+\$8003/,
  /8003/,
  /spawn/,
  /HybridService/,
  /bank22/,
  /BANK_22/,
];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    for (const re of pats) {
      if (re.test(l)) {
        console.log(`${f}:${i + 1}: ${l.trim().slice(0, 160)}`);
        break;
      }
    }
  });
}
console.log('--- done ---');
