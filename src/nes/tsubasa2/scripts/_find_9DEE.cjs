// 定位 $9DEE / $9E7C / $9A35 / $9B7F / $98A0 / $9B28 / $9B91 / $C4B9 / $C52A / $C515 定义
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'src', 'asm');
const targets = ['9DEE', '9E7C', '9A35', '9B7F', '98A0', '9B28', '9B91', 'C4B9', 'C52A', 'C515', 'C563', 'C566', 'C509', '9DEE', '9F41', '9F37', '9F3F', '9B90'];
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.s')) out.push(p);
  }
  return out;
}
const files = walk(root, []);
const found = new Map();
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    for (const t of targets) {
      // 形如 "; $9DEE" 或 "JSR $9DEE" 的定义行（地址注释）
      const m = lines[i].match(new RegExp(`;\\s+\\$${t}\\b|^\\s*JSR \\$${t}\\b|^\\s*JMP \\$${t}\\b`));
      if (m) {
        if (!found.has(t)) found.set(t, []);
        found.get(t).push(`${f.replace(root, '')}:${i + 1}: ${lines[i].trim()}`);
      }
    }
  }
}
for (const t of targets) {
  console.log(`=== $${t} ===`);
  const list = found.get(t) || [];
  for (const l of list.slice(0, 12)) console.log('  ' + l);
  if (list.length === 0) console.log('  (not found)');
}
