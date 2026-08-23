// 提取 bank00 asm 中 sub9085 ($9085-$9142) 完整代码
const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, '..', 'asm', 'bank00', 'code_sub.s');
if (!fs.existsSync(f)) f2 = path.join(__dirname, '..', 'asm', 'bank00', 'code_util.s');
const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
let started = false, buf = [];
for (let i = 0; i < lines.length; i++) {
  const ln = lines[i];
  const m = ln.match(/;\s*\$([0-9A-F]{4})\s*$/);
  const addr = m ? parseInt(m[1], 16) : null;
  if (addr === 0x9085) { started = true; }
  if (started) {
    buf.push(ln);
    if (addr === 0x9142) break;
  }
}
console.log(buf.join('\n'));
