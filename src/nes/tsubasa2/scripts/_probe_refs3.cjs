/* 定位 asm 中符号定义（宽松匹配） */
const fs = require('fs');
const path = require('path');

const targets = ['9B91', '9F96', '9F89', '8976', 'A82F', 'A767', '9F69', 'AA97', '9B28', '9B5E', '9FA8', 'A72C', '9E7C', 'AC6D', 'AC71', '88CA', 'A677', 'A67B', '9A43', 'AA06'];

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
      // 定义："; $XXXX:" 或独立标签行 "XXXX:"
      if (line.includes('; $' + t + ':') || line.trim().startsWith(t + ':')) {
        console.log(`== ${path.relative('', f)}:${i + 1} [$` + t + ']');
        for (let k = Math.max(0, i - 2); k <= Math.min(lines.length - 1, i + 10); k++) {
          console.log(`   ${k + 1}: ${lines[k]}`);
        }
        console.log('');
        break;
      }
    }
  }
}
console.log('DONE');
