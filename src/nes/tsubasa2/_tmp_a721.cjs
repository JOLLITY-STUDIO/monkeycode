const fs = require('fs');
const path = require('path');

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith('.s')) out.push(p);
  }
  return out;
}

// 找 $A721 定义：行内 "; $A721"、"A721:" 标号、或地址区间 [$A710,$A780) 的任何指令
console.log('=== 所有含 "A721" 的行 ===');
for (const f of walk('asm')) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (l.toUpperCase().includes('A721')) console.log(`${f}:${i + 1}: ${l.trim()}`);
  });
}

// 找 $A700-$A790 区间（可能反汇编器从 A721 起没打注释，看 A700+ 的行尾地址）
console.log('\n=== bank01 code_sub.s 中地址 A700-A790 区间的行 ===');
const cs = fs.readFileSync('asm/bank01/code_sub.s', 'utf8').split('\n');
cs.forEach((l, i) => {
  const m = /;\s*\$A7[0-8][0-9A-F]/.exec(l);
  if (m) console.log(`${i + 1}: ${l.trim()}`);
});

console.log('\n=== bank01 _full.s 中地址 A700-A790 区间的行 ===');
const fs_ = fs.readFileSync('asm/bank01/_full.s', 'utf8').split('\n');
fs_.forEach((l, i) => {
  const m = /;\s*\$A7[0-8][0-9A-F]/.exec(l);
  if (m) console.log(`${i + 1}: ${l.trim()}`);
});
