// 定位 $C4B9 定义及 $0025 的写入点（bank30 + bank02）
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'src', 'asm');
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.s')) out.push(p);
  }
  return out;
}
const files = walk(root, []).filter(f => f.includes('bank30') || f.includes('bank02') || f.includes('bank00'));
// 打印 $C4B9 定义上下文
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/;\s*\$C4B9\b/.test(lines[i])) {
      console.log(`### ${f.replace(root, '')}:${i + 1}`);
      for (let j = Math.max(0, i - 2); j < Math.min(lines.length, i + 40); j++) {
        console.log(String(j + 1).padStart(4) + '| ' + lines[j]);
      }
      console.log('---');
    }
  }
}
// 打印 bank02/bank00/bank30 中写入 $0025 的位置
console.log('\n=== STA $0025 / LDA $0025 出现位置 ===');
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/\$0025/.test(lines[i]) && !/a:\s*\$0025/.test(lines[i])) {
      console.log(`${f.replace(root, '')}:${i + 1}: ${lines[i].trim()}`);
    }
  }
}
