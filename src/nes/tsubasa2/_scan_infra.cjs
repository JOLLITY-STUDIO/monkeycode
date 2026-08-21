const fs = require('fs');
const path = require('path');

function walk(d, out) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'asm', 'dist', 'output', '_tmp_bzk_out'].includes(e.name)) continue;
      walk(p, out);
    } else if (e.name.endsWith('.ts')) {
      out.push(p);
    }
  }
}

const files = [];
walk('src', files);
walk('test', files);
walk('pages', files);

console.log('=== ALL .ts files in src/test/pages ===');
files.forEach(f => console.log(f.replace(/\\/g, '/')));

// 检查关键基础设施是否缺失
const infra = ['DataStore', 'PpuSync', 'OamManager', 'paletteManager', 'type PaletteTable'];
console.log('\n=== infrastructure defs ===');
for (const key of infra) {
  const hits = [];
  for (const f of files) {
    const c = fs.readFileSync(f, 'utf8');
    if (c.includes('class ' + key) || c.includes('interface ' + key) || c.includes(key + ' =')) {
      hits.push(f.replace(/\\/g, '/'));
    }
  }
  console.log(key + ': ' + (hits.length ? hits.join(', ') : 'MISSING'));
}

// 查找所有 import 的本地相对路径是否解析
console.log('\n=== broken relative imports (target missing) ===');
let broken = 0;
for (const f of files) {
  const dir = path.dirname(f);
  const c = fs.readFileSync(f, 'utf8');
  const re = /from\s+['"](\.[^'"]+)['"]/g;
  let m;
  while ((m = re.exec(c))) {
    const spec = m[1].replace(/\.ts$/, '');
    // 尝试解析
    const candidates = [
      path.join(dir, spec + '.ts'),
      path.join(dir, spec, 'index.ts'),
    ];
    if (!candidates.some(cp => fs.existsSync(cp))) {
      console.log((f.replace(/\\/g, '/')) + ' -> ' + spec);
      broken++;
    }
  }
}
console.log('total broken: ' + broken);
