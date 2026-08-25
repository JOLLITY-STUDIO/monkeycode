// 追踪 f374-f380: 00ED / 0090/0091 / 0094-0096(脚本指针) / 0568+ / 场景切换
const fs = require('fs');
const t = fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8');
const lines = t.split(/\r?\n/);
const joined = [];
let cur = null;
for (const raw of lines) {
  const l = raw.trim();
  if (!l) continue;
  const fm = l.match(/^f(\d+)\s+c\d+/);
  if (fm) { if (cur) joined.push(cur); cur = { frame: parseInt(fm[1], 10), text: l }; continue; }
  if (/^i\d+/.test(l)) { if (cur) { cur.text += ' ' + l; continue; } }
  if (cur) cur.text += ' ' + l;
}
if (cur) joined.push(cur);

const out = [];
for (const e of joined) {
  if (e.frame < 370) continue;
  const t2 = e.text.replace(/\s+/g, ' ');
  // 只输出关键指令: 00ED / 0090/0091 / 0094/0095/0096 / 0568 / 9145 / 9FA8 / 94C1 / C4B9 / 8000 / 场景类
  if (/(00ED|0090|0091|0094|0095|0096)/.test(t2) && /(LDA|STA|STX|STY|ADC|INC|DEC|CMP)/.test(t2)) out.push(`[f${e.frame}] ${t2}`);
  else if (/(9145|9FA8|94C1|94D5|9154|9156|91BF|920B)/.test(t2)) out.push(`[f${e.frame}] ${t2}`);
  else if (/(\$8000|\$8001)/.test(t2)) out.push(`[f${e.frame}] ${t2}`);
  else if (/(0568|0569|056A)/.test(t2)) out.push(`[f${e.frame}] ${t2}`);
}
fs.writeFileSync('debug/_f370_380_key.txt', out.join('\n'));
console.log('lines', out.length);
