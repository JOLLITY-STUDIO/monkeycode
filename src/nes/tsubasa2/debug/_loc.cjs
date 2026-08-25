// 搜索 H5 验证脚本：setControllerState / controllers 注入
const fs = require('fs');
const path = require('path');
const dirs = ['scripts', 'test'];
const keys = ['setControllerState', 'controllers[1]', 'controllerState', '0x10', 'buttonA', 'pressA', 'setButton'];
const out = [];
function walk(d, root) {
  if (!fs.existsSync(d)) return;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p, root);
    else if (f.endsWith('.ts') || f.endsWith('.cjs') || f.endsWith('.js')) {
      const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
      lines.forEach((l, i) => {
        for (const k of keys) {
          if (l.includes(k)) { out.push(p.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim()); break; }
        }
      });
    }
  }
}
for (const d of dirs) walk(d, d);
fs.writeFileSync('debug/_loc_out.txt', out.join('\n'));
