/* 临时探针：在 src/asm 下查找指定地址标签/注释的定义位置 */
const fs = require('fs');
const path = require('path');

const targets = ['$9B91', '$9F96', '$9F89', '$8976', '$A82F', '$A767', '$9F69', '$9B28', '$9B5E', '$88FB', '$9B7F', '$98A0', '$98EA', '$8895', '$8920', '$8AF7', '$9FA8', '$A72C', '$9E7C', '$AC6D', '$AC71', '$88CA', '$AA97', '$A677', '$A67B', '$9A43', '$AA06'];

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
      // 定义位置：注释中包含 $XXXX: 或标签行如 "XXXX:" 或 "; $XXXX"
      const re = new RegExp(';\\s*\\$' + t.slice(1) + '\\s*:', 'i');
      const re2 = new RegExp('\\$' + t.slice(1) + '\\s*:', 'i');
      if (re.test(line) || (re2.test(line) && !line.includes('JSR') && !line.includes('JMP') && !line.includes('STA') && !line.includes('LDA'))) {
        // 输出定义上下文
        console.log(`== ${f}:${i + 1} [${t}]`);
        for (let k = Math.max(0, i - 3); k <= Math.min(lines.length - 1, i + 8); k++) {
          console.log(`   ${k + 1}: ${lines[k]}`);
        }
        console.log('');
        break;
      }
    }
  }
}
console.log('DONE');
