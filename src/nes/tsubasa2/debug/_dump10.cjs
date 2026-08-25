// dump f10-f16 完整指令流
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
  if (e.frame >= 10 && e.frame <= 16) out.push(`[f${e.frame}] ${e.text.replace(/\s+/g, ' ')}`);
}
fs.writeFileSync('debug/_f10_16_full.txt', out.join('\n'));
console.log('lines', out.length);
