const fs = require('fs');
const path = require('path');

// 全项目扫描（排除 node_modules/.git）
const roots = ['.'];
const skip = new Set(['node_modules', '.git', 'asm', 'docs', 'output', 'dist', '_test_out', 'scripts_output_all.txt']);
const out = [];
function walk(d, dep) {
  if (dep > 6) return;
  let it;
  try { it = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const x of it) {
    if (skip.has(x.name)) continue;
    const p = path.join(d, x.name);
    if (x.isDirectory()) walk(p, dep + 1);
    else if (/\.(ts|js|wxml|json)$/.test(x.name)) out.push(p);
  }
}
walk('.', 0);

console.log('=== 输入驱动(input_mask/controller/joypad/input) 全项目 ===');
for (const f of out) {
  try {
    const c = fs.readFileSync(f, 'utf8');
    const ls = c.split(/\r?\n/);
    ls.forEach((l, i) => {
      if (/input_mask|controller_1|controller_2|joypad|pad1|pad2|keydown|keyup|touchstart/.test(l) && !/^\s*(\/\/|\*)/.test(l)) {
        console.log(`${f}:${i + 1}: ${l.trim().slice(0, 150)}`);
      }
    });
  } catch (e) {}
}

console.log('\n=== frame() 调用方 (Tsubasa2.frame / nes.frame) ===');
for (const f of out) {
  try {
    const c = fs.readFileSync(f, 'utf8');
    const ls = c.split(/\r?\n/);
    ls.forEach((l, i) => {
      if (/\.frame\(/.test(l) && !/^\s*(\/\/|\*)/.test(l)) {
        console.log(`${f}:${i + 1}: ${l.trim().slice(0, 150)}`);
      }
    });
  } catch (e) {}
}
