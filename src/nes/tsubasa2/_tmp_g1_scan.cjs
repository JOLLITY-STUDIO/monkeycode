const fs = require('fs');
const path = require('path');
const dirs = ['src/game/service', 'src/game/data/prg'];
const files = [];
for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  const walk = (p) => {
    for (const e of fs.readdirSync(p, { withFileTypes: true })) {
      const fp = path.join(p, e.name);
      if (e.isDirectory()) walk(fp);
      else if (/bank(13|15|21|22|25|31)/.test(e.name) && /\.ts$/.test(e.name)) files.push(fp);
    }
  };
  walk(d);
}
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => {
    if (/TODO|stub|Stub|占位|PRG_BANK|未翻译|未实现|no-op|noop|placeholder/i.test(l)) hits.push('  L' + (i + 1) + ': ' + l.trim().slice(0, 130));
  });
  console.log('== ' + f + ' (' + lines.length + ' 行) ' + (hits.length ? hits.length + ' 命中' : '无 TODO/stub/PRG_BANK'));
  hits.slice(0, 12).forEach(x => console.log(x));
  console.log();
}
