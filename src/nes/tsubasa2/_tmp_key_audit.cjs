// 全 bank 键名对齐审计：扫描所有 service/boot 中 store.read/write 的非 ram_XXXX 语义键
const fs = require('fs');
const path = require('path');

const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const DIRS = [
  'src/game/service',
  'src/game/boot.ts',
  'src/game/view',
];

const all = {};

function scanFile(fp) {
  if (!fs.existsSync(fp)) return;
  const src = fs.readFileSync(fp, 'utf8');
  const lines = src.split('\n');
  // 匹配 read('X') / write('X', / read(\`X\`) / write(\`X\`)
  const re = /\.(?:read|write)\((['`"])([^'`"]+)\1/g;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    while ((m = re.exec(line)) !== null) {
      const key = m[2];
      if (/^ram_[0-9A-F]{4}$/i.test(key)) continue; // 已对齐
      if (/^frameCount$/.test(key)) continue;
      if (/^btn/.test(key)) continue;
      if (key.startsWith('$')) continue;
      const rel = path.relative(ROOT, fp);
      if (!all[key]) all[key] = [];
      all[key].push(rel + ':' + (i + 1) + ' ' + line.trim().slice(0, 90));
    }
  }
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      if (f === 'node_modules' || f === 'prg') continue;
      walk(fp);
    } else if (f.endsWith('.ts')) {
      scanFile(fp);
    }
  }
}

for (const d of DIRS) {
  if (d.endsWith('.ts')) scanFile(d);
  else walk(d);
}

const keys = Object.keys(all).sort();
let out = '=== 非 ram_XXXX 语义键总数: ' + keys.length + ' ===\n';
for (const k of keys) {
  out += '\n### ' + k + ' (' + all[k].length + ' 处)\n';
  for (const loc of all[k].slice(0, 8)) out += '  ' + loc + '\n';
}
fs.writeFileSync(path.join(ROOT, '_tmp_key_audit.txt'), out);
console.log('written: _tmp_key_audit.txt');
