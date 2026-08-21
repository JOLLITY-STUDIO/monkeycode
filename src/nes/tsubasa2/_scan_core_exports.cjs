const fs = require('fs');
const path = require('path');

function walk(d, out) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'output'].includes(e.name)) continue;
      walk(p, out);
    } else if (e.name.endsWith('.ts')) {
      out.push(p);
    }
  }
}

const files = [];
walk('src/core', files);

console.log('=== exports in src/core ===');
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const re = /export\s+(?:default\s+)?(?:class|interface|type|function|const|enum)\s+(\w+)/g;
  let m;
  const names = [];
  while ((m = re.exec(c))) names.push(m[1]);
  if (names.length) console.log(f.replace(/\\/g, '/') + ': ' + names.join(', '));
}

// DataStore / OamManager 引用点
console.log('\n=== DataStore/OamManager/PpuSync defs or refs ===');
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const re = /\b(DataStore|OamManager|PpuSync|paletteManager|PaletteTable)\b/g;
  let m;
  while ((m = re.exec(c))) {
    const line = c.split(/\r?\n/)[c.slice(0, m.index).split(/\r?\n/).length - 1];
    console.log(f.replace(/\\/g, '/') + ' [' + m[1] + ']: ' + line.trim().slice(0, 100));
  }
}
