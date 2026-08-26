// 临时脚本：定位 $AC6D / $AC71 / $9E7C / $88CA 定义体
const fs = require('fs');
const path = require('path');
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.s$/.test(f)) files.push(p);
  }
})('src/asm');

for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/AC6D|AC71/.test(l)) console.log(f, i + 1, '|', l.trim().slice(0, 120));
  });
}
