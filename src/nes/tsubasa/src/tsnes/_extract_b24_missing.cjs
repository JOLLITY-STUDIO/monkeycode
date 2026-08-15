// 提取 bank_24.asm 中 $8851-$8868 段 + 检查固定区 $C51E/$C527 引用
const fs = require('fs');
const t = fs.readFileSync('_tmp_bzk_out/bank_24.asm', 'utf8');
const lines = t.split(/\r?\n/);

let out = [];
let started = false;
for (const l of lines) {
  const m = l.match(/0C:([0-9A-F]{4}):/);
  if (m && m[1] === '8851') started = true;
  if (m && m[1] === '8869') break;
  if (started) out.push(l);
}
console.log('=== $8851-$8868 ===');
console.log(out.join('\n'));

// 在 tsubasa2-h5-src 中查找 C51E / C527 实现
function walk(dir, results) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p, results); }
    else if (/\.(ts|js)$/.test(e.name)) results.push(p);
  }
  return results;
}
const files = walk('tsubasa2-h5-src/src', []);
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const hits = [];
  if (/C51E/.test(c)) hits.push('C51E');
  if (/C527/.test(c)) hits.push('C527');
  if (/C509/.test(c)) hits.push('C509');
  if (hits.length) console.log(`### ${f}: ${hits.join(',')}`);
}
