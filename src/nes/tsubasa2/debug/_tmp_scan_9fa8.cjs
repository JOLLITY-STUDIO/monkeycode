// 提取 bank00 中 $9FA8 协程让出的完整 asm (code_sub.s / code_util.s 可能重复)
const fs = require('fs');
const path = require('path');
const targets = ['code_sub.s', 'code_util.s'];
const files = targets.map(t => path.join(__dirname, '..', 'asm', 'bank00', t));
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  console.log('===== ' + path.basename(f) + ' =====');
  let started = false, buf = [];
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    if (/;\s*\$9F(?:9[0-9A-F]|A[0-8])\s*$/.test(ln.trim()) || (started && /;\s*\$9F/i.test(ln))) {
      if (!started && !/9FA8/.test(ln) && !/9F9/.test(ln)) continue;
      started = true;
    }
    if (started) {
      buf.push(ln);
      if (/;\s*\$9FF[0-9A-F]\s*$/.test(ln.trim()) || /;\s*\$A0[0-2]\d\s*$/.test(ln.trim())) break;
    }
  }
  if (buf.length) console.log(buf.join('\n'));
}
