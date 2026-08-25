// dump head + 帧格式探测
const fs = require('fs');
const t = fs.readFileSync('docs/roms/aftertecmo/tsubasa-when-show380-逐帧.log', 'utf8');
const lines = t.split(/\r?\n/);
const out = [];
for (let i = 0; i < 80; i++) out.push(i + '|' + JSON.stringify(lines[i]));
// 找可能的帧标记
const marks = [];
lines.forEach((l, i) => { if (/\b\d{1,4}\b\s*(frame|Frame|FRAME)/.test(l) || /(frame|Frame|FRAME)\s*[:=]\s*\d{1,4}/.test(l) || /^\s*\d{2,4}\s*$/.test(l)) marks.push(i + '|' + JSON.stringify(l)); });
out.push('---marks---');
out.push(...marks.slice(0, 40));
fs.writeFileSync('debug/_head380.txt', out.join('\n'));
console.log('ok', lines.length);
