// 搜索 $801F / $801E 的 JSR 调用点 与 $A203 上下文
const fs = require('fs');
const path = require('path');
const asmDir = path.join(__dirname, '..', 'asm');
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.s')) files.push(p);
  }
}
walk(asmDir);
const pats = [/\b801[EF]\b/i, /\b8019\b/i, /\b801C\b/i, /\bA203\b/i];
const hits = [];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((ln, i) => {
    if (ln.trim().startsWith(';') || !/JSR|JMP|\.word|\.byte/i.test(ln)) return;
    for (const p of pats) {
      if (p.test(ln)) { hits.push(`${path.relative(asmDir, f)}:${i + 1} ${ln.trim()}`); break; }
    }
  });
}
console.log('=== refs to $8019/$801C/$801F/$A203 ===');
console.log(hits.join('\n'));
console.log('total:', hits.length);
