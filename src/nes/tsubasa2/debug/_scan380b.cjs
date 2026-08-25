// 扫描 380 逐帧 log：按 f<num> 分组，摘要每帧关键行为
const fs = require('fs');
const t = fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8');
const lines = t.split(/\r?\n/);

// 重组：每条指令 = 3 行 (f<num> c<cyc> / i<ins> / A:... opcode [continuation])
const joined = [];
let cur = null;
for (const raw of lines) {
  const l = raw.trim();
  if (!l) continue;
  const fm = l.match(/^f(\d+)\s+c\d+/);
  if (fm) { if (cur) joined.push(cur); cur = { frame: parseInt(fm[1], 10), text: l }; continue; }
  const im = l.match(/^i\d+/);
  if (im) { if (cur) { cur.text += ' ' + l; continue; } }
  if (cur) cur.text += ' ' + l;
}
if (cur) joined.push(cur);

const frameLog = new Map();
for (const e of joined) {
  if (!frameLog.has(e.frame)) frameLog.set(e.frame, []);
  frameLog.get(e.frame).push(e.text);
}
const frames = [...frameLog.keys()].sort((a, b) => a - b);
const out = ['frames: ' + frames.join(',')];

for (const f of frames) {
  const fl = frameLog.get(f);
  const has = (re) => fl.some(l => re.test(l));
  const gets = (re, n = 3) => fl.filter(l => re.test(l)).slice(0, n);
  const parts = [`f${f} (${fl.length} ins)`];
  if (has(/00ED/)) parts.push('ED:' + gets(/00ED/, 2).map(l => l.match(/A:([0-9A-F]{2})/)?.[1]).join(','));
  if (has(/\$9145/)) parts.push('ENG@9145');
  if (has(/\$91BF|\$91CD|\$91E3/)) parts.push('PHYS:' + gets(/\$91BF|\$91CD|\$91E3/, 4).map(l => l.trim()).join(' | '));
  if (has(/\$2007/)) parts.push(`NTWRITE=${fl.filter(l => /\$2007/.test(l)).length}`);
  if (has(/\$8000/)) parts.push('BANK:' + gets(/\$8000/, 3).map(l => { const m = l.match(/\$8000[:=]?\s*#\$([0-9A-F]{2})/i) || l.match(/\$8000\b[^=]*=\s*#\$([0-9A-F]{2})/i); return m ? m[1] : '?'; }).join(','));
  if (has(/9A7E|9AA2|05E8/)) parts.push('FADE:' + gets(/05E8|9A7E|9AA2/, 2).map(l => l.trim()).join(' | '));
  if (has(/\$9FA8/)) parts.push('INIT@9FA8');
  if (has(/0468|046B|046A/)) parts.push('SPR:' + gets(/0468|046B|046A/, 4).map(l => l.match(/@\s*\$?([0-9A-F]{4})/i)?.[1] || l.match(/STA\s+\$([0-9A-F]{4})/i)?.[1] || '?').join(','));
  out.push(parts.join(' '));
}
fs.writeFileSync('debug/_scan380b_out.txt', out.join('\n'));
console.log('written', frames.length, 'frames');
