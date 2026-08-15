const fs = require('fs');
let m = require('./rom-data/prg-bank-24.js');
const b = Array.isArray(m) ? m : (m.default || m);
// bank24 CPU $8000-$9FFF → PRG offset 0
function bytes(addr, n) {
  const off = addr - 0x8000;
  const out = [];
  for (let i = 0; i < n; i++) out.push(b[off + i]);
  return out;
}
// $89B4-$89F9 dispatch 表区
const start = 0x89b4;
const raw = bytes(start, 0x50);
let line = '';
for (let i = 0; i < raw.length; i++) {
  line += raw[i].toString(16).padStart(2, '0') + ' ';
  if ((i + 1) % 16 === 0) { console.log((start + i + 1 - 16).toString(16) + ': ' + line.trim()); line = ''; }
}
if (line.trim()) console.log((start + raw.length - line.trim().split(/\s+/).length).toString(16) + ': ' + line.trim());
console.log('---');
// 解释 vector: 按 C509 机制, cmd 的 vector 在 $89BA+cmd*2+1 (hi) 与 +2 (lo)
console.log('C509 vector decode (base $89BA, hi@+1 lo@+2):');
for (let cmd = 0; cmd < 32; cmd++) {
  const base = 0x89ba + cmd * 2;
  const hi = b[base - 0x8000 + 1];
  const lo = b[base - 0x8000 + 2];
  console.log(' cmd' + cmd.toString().padStart(2, ' ') + ' ($E' + cmd.toString(16).padStart(2, '0') + ') -> $' + ((hi << 8) | lo).toString(16).toUpperCase().padStart(4, '0'));
}
