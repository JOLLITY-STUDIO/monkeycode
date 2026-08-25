// 在 asm 中找 $05E8 NT 缓冲消费者（NMI）
const fs = require('fs');
const path = require('path');
const dir = 'src/asm';
const out = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.s')) out.push(p);
  }
}
walk(dir);
let found = [];
for (const f of out) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].toUpperCase();
    // 找 LDA/LDX/LDY/STA/JSR 涉及 $05E8/$05E9/$05EA 或 0x05E8
    if (l.includes('05E8') || l.includes('05E9') || l.includes('05EA') || l.includes('05EB')) {
      if (/LD[AXY]|STA|CMP|BIT|ASL|LSR|ROL|ROR/.test(l)) {
        found.push(`${f}:${i + 1}: ${lines[i].trim()}`);
      }
    }
  }
}
console.log('files scanned:', out.length, 'hits:', found.length);
console.log(found.slice(0, 80).join('\n'));
