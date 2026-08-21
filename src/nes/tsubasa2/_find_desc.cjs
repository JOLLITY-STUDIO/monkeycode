// 查找所有设置 $003C/$003D 指针的地方 (描述符来源)
const fs = require('fs');
const path = require('path');

function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.s')) out.push(p);
  }
  return out;
}

const files = walk(path.join(__dirname, 'asm'));
const pats = [
  /STA \$003C|STX \$003C|STY \$003C/,
  /STA \$003D|STX \$003D|STY \$003D/,
  /LDA #\$[0-9A-F]+\s*;\s*\$[0-9A-F]+\s*$/,
];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    const t = l.trim();
    if (/STA \$003C|STX \$003C|STY \$003C|STA \$003D|STX \$003D|STY \$003D/.test(t)) {
      // 找前后 8 行上下文
      const ctx = [];
      for (let j = Math.max(0, i - 6); j <= Math.min(lines.length - 1, i + 6); j++) {
        ctx.push(`${j + 1}: ${lines[j].trim()}`);
      }
      console.log(`\n### ${f}:${i + 1}\n${ctx.join('\n')}`);
    }
  });
}
console.log('\n--- done ---');
