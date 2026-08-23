// 扫描 asm 中 JSR $8484 / $8484 分发器调用点 + 主循环调度器上下文
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';
function walk(d) {
  const out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.s')) out.push(p);
  }
  return out;
}
for (const f of walk(root)) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/JSR\s+\$8484|JMP\s+\$8484|\$8484\b/.test(l)) {
      console.log(`${f.replace(root + '/', '')}:${i + 1}: ${l.trim()}`);
    }
  });
}
console.log('=== 主循环 $9EED 区段 (调度器上下文) ===');
const f0 = path.join(root, 'bank00/code_sub.s');
const lines = fs.readFileSync(f0, 'utf8').split(/\r?\n/);
let inMain = false;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (/\$9EED|mainLoop|\$9F04/.test(l)) inMain = true;
  if (inMain) {
    console.log(`code_sub.s:${i + 1}: ${l.trim()}`);
    if (/\$9FFF|\$9FF[0-F]/.test(l) && i > 0) break;
  }
}
