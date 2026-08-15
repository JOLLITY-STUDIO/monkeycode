const fs = require('fs');
const loadBank = (name) => {
  const txt = fs.readFileSync(`./rom-data/${name}.ts`, 'utf8');
  const m = txt.match(/\[([\s\S]*?)\]\s*as\s+const|\[([\s\S]*?)\]\s*;/);
  const body = (m ? m[1] || m[2] : '').replace(/\s+/g, '');
  return body.split(',').filter(s => s !== '').map(s => parseInt(s, 16));
};
const a28 = loadBank('prg-bank-28');
const a29 = loadBank('prg-bank-29');
const dump = (arr, base, c, n, label) => {
  const s = [];
  for (let i = 0; i < n; i++) {
    const off = c + i - base;
    const v = off >= 0 && off < arr.length ? arr[off] : -1;
    s.push(v < 0 ? '??' : v.toString(16).padStart(2, '0'));
  }
  console.log(label + ' ' + c.toString(16) + ': ' + s.join(' '));
};
console.log('b28 len', a28.length, 'b29 len', a29.length);
dump(a28, 0x8000, 0x9e4e, 64, 'b28 9e4e');
dump(a28, 0x8000, 0x9fce, 64, 'b28 9fce');
dump(a29, 0xa000, 0xae86, 64, 'b29 ae86');
dump(a29, 0xa000, 0xa000, 16, 'b29 a000');
