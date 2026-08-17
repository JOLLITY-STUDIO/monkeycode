// 搜索 Bank20Service 使用点 + 固定区 API 参考实现
const fs = require('fs');
const path = require('path');
const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src';
function walk(d, out) {
  let items;
  try { items = fs.readdirSync(d); } catch (e) { return; }
  for (const f of items) {
    const p = path.join(d, f);
    let st;
    try { st = fs.statSync(p); } catch (e) { continue; }
    if (st.isDirectory()) {
      if (!f.startsWith('node_modules') && !f.startsWith('.git')) walk(p, out);
    } else if (/\.(ts|js)$/.test(f)) out.push(p);
  }
}
const files = [];
walk(ROOT, files);
console.log('=== Bank20Service usages ===');
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/Bank20Service/.test(l)) console.log(f.replace(ROOT, '.') + ':' + (i + 1) + ': ' + l.trim());
  });
}
console.log('\n=== fixed API implementations (first match lines per file) ===');
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => {
    if (/private _fixedC509|private _fixedC50C|private _fixedC530|private _fixedC533|private _fixedC536|private _fixedC542|private _fixedC545|_fixedC530\(|_fixedC533\(|_fixedC536\(|_fixedC542\(|_fixedC545\(/.test(l)) hits.push((i + 1) + ': ' + l.trim());
  });
  if (hits.length) console.log(f.replace(ROOT, '.') + '\n  ' + hits.join('\n  '));
}
