// 在 asm 中定位叙事阶段 NT 写入来源子程:
// $98C0 / $994F / $985C / $A038 / $CB6C / $94C1 / $94D8
const fs = require('fs');
const path = require('path');

const targets = ['98C0', '994F', '985C', 'A038', 'CB6C', '94C1', '94D8', '9154', '9224', '94AE'];
const dir = path.join(__dirname, '..', 'asm');

function walk(d, depth) {
  if (depth > 2) return;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, depth + 1);
    else if (f.endsWith('.s')) {
      const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        for (const t of targets) {
          // 匹配行尾注释 ; $XXXX 或 ; $XXXX:
          const m = lines[i].match(/;\s*\$([0-9A-Fa-f]{4})\b/);
          if (m) {
            const addr = m[1].toUpperCase();
            if (addr === t) {
              console.log(`${path.relative(dir, p)}:${i + 1}: ${lines[i].trim().slice(0, 130)}`);
            }
          }
        }
      }
    }
  }
}
walk(dir, 0);
