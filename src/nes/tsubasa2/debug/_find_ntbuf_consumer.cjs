/* 临时脚本：在所有 asm 中定位 $05E8 / $0628 缓冲消费者 */
const fs = require('fs');
const path = require('path');
function walk(d) {
  let r = [];
  for (const e of fs.readdirSync(d)) {
    const p = path.join(d, e);
    const st = fs.statSync(p);
    if (st.isDirectory()) r = r.concat(walk(p));
    else if (e.endsWith('.s')) r.push(p);
  }
  return r;
}
for (const f of walk('src/asm')) {
  const s = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  s.forEach((l, i) => {
    if (/05E8|0628/.test(l) && /LDA|LDX|CMP|STA|ADC|DEC|INC/.test(l)) {
      console.log(f + ' ' + (i + 1) + ': ' + l.trim());
    }
  });
}
