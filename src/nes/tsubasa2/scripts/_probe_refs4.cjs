/* 全文扫描符号出现位置（不分格式，输出行上下文） */
const fs = require('fs');
const path = require('path');

const targets = ['9B91', '9F96', '9F89', '8976', 'A82F', 'A767', '9F69', 'AA97'];

function scan(dir, depth) {
  if (depth > 3) return [];
  const out = [];
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const ent of entries) {
    if (ent.name.startsWith('.')) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...scan(full, depth + 1));
    else if (ent.name.endsWith('.s')) out.push(full);
  }
  return out;
}

const files = scan('src/asm', 0);
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const t of targets) {
      if (line.toLowerCase().includes(t.toLowerCase())) {
        console.log(`${path.relative('', f)}:${i + 1}: ${line.trim().slice(0, 120)}`);
        break;
      }
    }
  }
}
console.log('DONE');
