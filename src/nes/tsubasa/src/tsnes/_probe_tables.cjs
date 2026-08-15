const fs = require('fs');
let m = require('./rom-data/prg-bank-24.js');
const b = Array.isArray(m) ? m : (m.default || m);
function dump(addr, n, label) {
  const off = addr - 0x8000;
  const bytes = [];
  for (let i = 0; i < n; i++) bytes.push(b[off + i]);
  console.log(label + ' @$' + addr.toString(16) + ':');
  let line = '';
  for (let i = 0; i < bytes.length; i++) {
    line += bytes[i].toString(16).padStart(2, '0') + ' ';
    if ((i + 1) % 16 === 0) { console.log('  ' + (addr + i + 1 - 16).toString(16) + ': ' + line.trim()); line = ''; }
  }
  if (line.trim()) console.log('  ' + (addr + bytes.length - line.trim().split(/\s+/).length).toString(16) + ': ' + line.trim());
}
dump(0x8068, 8, 'subtable $8068');
dump(0x80ed, 16, 'query table $80ED');
dump(0x89b4, 0x50, 'sprite dispatch');
dump(0x8a12, 0x1e, 'nested dispatch $8A12');
