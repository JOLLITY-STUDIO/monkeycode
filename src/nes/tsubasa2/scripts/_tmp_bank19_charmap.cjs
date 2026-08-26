const fs = require('fs');
const s = fs.readFileSync('src/asm/bank19/code_main.s', 'utf8');
const lines = s.split('\n');
console.log('lines', lines.length, 'first', JSON.stringify(lines[4].slice(0, 60)));
const bytes = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  const m = l.match(/^\s*\.byte\s+(.+)/);
  if (i < 15) console.log('line', i, !!m, JSON.stringify(l.slice(0, 40)));
  if (!m) continue;
  const vals = m[1].split(',').map(x => parseInt(x.trim().replace(/^\$/, ''), 16)).filter(x => !isNaN(x));
  bytes.push(...vals);
  if (bytes.length >= 256) break;
}
console.log('read', bytes.length, 'bytes');
for (let c = 0x80; c < 0xa0; c++) {
  console.log('0x' + c.toString(16).padStart(2, '0'), '->', '0x' + bytes[c].toString(16).padStart(2, '0'));
}
console.log('--- 0x94/0x95 ---');
console.log('0x94 -> 0x' + bytes[0x94].toString(16).padStart(2, '0'));
console.log('0x95 -> 0x' + bytes[0x95].toString(16).padStart(2, '0'));
