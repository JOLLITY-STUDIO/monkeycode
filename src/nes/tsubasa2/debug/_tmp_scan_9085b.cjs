// 搜索 bank00 所有 .s 中 $9085 定义并提取到 $9142
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'asm', 'bank00');
for (const fn of fs.readdirSync(dir)) {
  if (!fn.endsWith('.s')) continue;
  const lines = fs.readFileSync(path.join(dir, fn), 'utf8').split(/\r?\n/);
  let started = false, buf = [];
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const m = ln.match(/;\s*\$([0-9A-F]{4})\s*$/);
    const addr = m ? parseInt(m[1], 16) : null;
    if (addr === 0x9085) { started = true; }
    if (started) {
      buf.push(ln);
      if (addr === 0x9142 || addr > 0x9142) break;
    }
  }
  if (buf.length) {
    console.log('===== ' + fn + ' =====');
    console.log(buf.join('\n'));
  }
}
