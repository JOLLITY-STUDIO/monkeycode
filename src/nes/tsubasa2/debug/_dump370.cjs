// dump f370-f378 完整指令 + 搜索 0568 读写（全帧）
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
  const t2 = e.text.replace(/\s+/g, ' ');
  if (e.frame >= 370 && e.frame <= 378) out.push(`[f${e.frame}] ${t2}`);
}
out.push('=== 0568/0570/0588 writes across all frames ===');
for (const e of joined) {
  const t2 = e.text.replace(/\s+/g, ' ');
  if (/\$05(68|69|6A|6B|6C|6D|6E|6F|70|71|72|73|74|75|76|77|78|79|7A|7B|7C|7D|7E|7F)\b/.test(t2) && /(STA|LDA|INC|DEC)/.test(t2)) out.push(`[f${e.frame}] ${t2}`);
}
fs.writeFileSync('debug/_f370_378_full.txt', out.join('\n'));
console.log('lines', out.length);
