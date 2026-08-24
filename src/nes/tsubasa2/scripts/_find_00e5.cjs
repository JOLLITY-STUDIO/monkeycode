// 临时：全 asm 查找 $00E5 / $004D 指针初始化
const fs = require('fs');
const path = require('path');
function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else if (f.endsWith('.s')) out.push(p);
  }
  return out;
}
const files = walk('src/asm');
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/\$00E5|\$004D|\$004E/.test(line) && !line.trim().startsWith(';')) {
      // 只看写操作或指针设置
      if (/(STA|STX|STY|LDA\s+#)/i.test(line)) {
        console.log(`${f}:${i + 1}| ${line.trim()}`);
      }
    }
  }
}
