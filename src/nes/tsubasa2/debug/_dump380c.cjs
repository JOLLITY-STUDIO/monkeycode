// dump f380 + f379 完整指令流（重组后）
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
  if (e.frame === 379 || e.frame === 380) {
    out.push(`[f${e.frame}] ${e.text.replace(/\s+/g, ' ')}`);
  }
}
fs.writeFileSync('debug/_dump380c.txt', out.join('\n'));
console.log('lines', out.length);
