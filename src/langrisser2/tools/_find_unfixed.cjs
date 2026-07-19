const fs = require('fs');
const L = fs.readFileSync('20260713/asm/m68k/rom.asm', 'utf8').split('\n');
for (let i = 0; i < L.length; i++) {
  const l = L[i];
  if (/位置待定位|LZSS.*未|LZSS.*待|待定位/.test(l)) console.log(i + ': ' + l);
}
// Also find all places that mention LZSS
for (let i = 0; i < L.length; i++) {
  if (/LZSS/i.test(L[i])) console.log('LZSS ref L' + i + ': ' + L[i].trim().substring(0, 120));
}
