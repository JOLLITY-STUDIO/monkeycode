// 扫描翻译缺口：asm bank 列表 vs prg service 列表
const fs = require('fs');
const path = require('path');

function listDir(d, ext) {
  const out = [];
  if (!fs.existsSync(d)) return out;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) out.push(...listDir(p, ext));
    else if (f.endsWith(ext)) out.push(p);
  }
  return out;
}

const asmFiles = listDir('src/asm', '.s');
const asmBanks = new Set();
for (const f of asmFiles) {
  const m = f.match(/bank(\d+)/);
  if (m) asmBanks.add(+m[1]);
}
console.log('=== src/asm banks:', [...asmBanks].sort((a, b) => a - b).join(','));

const prgFiles = listDir('src/game/prg', '.ts');
const prgByDir = {};
for (const f of prgFiles) {
  const dir = path.dirname(f).replace(/\\/g, '/');
  if (!prgByDir[dir]) prgByDir[dir] = [];
  prgByDir[dir].push(path.basename(f));
}
for (const [d, files] of Object.entries(prgByDir)) {
  console.log('\n=== ' + d + ' (' + files.length + ')');
  for (const f of files.sort()) console.log('   ' + f);
}

// 检查每个 ts 文件是否包含 TODO/stub
console.log('\n=== TODO/STUB markers ===');
for (const f of prgFiles) {
  const c = fs.readFileSync(f, 'utf8');
  const hits = [];
  const lines = c.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/TODO|STUB|stub|未实现|not implemented|FIXME|throw new Error|XXX/.test(l)) hits.push((i + 1) + ':' + l.trim().slice(0, 80));
  });
  if (hits.length) {
    console.log('\n' + f.replace(/\\/g, '/'));
    hits.slice(0, 12).forEach(h => console.log('   ' + h));
  }
}
