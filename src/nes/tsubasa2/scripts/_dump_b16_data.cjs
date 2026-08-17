const fs = require('fs');
const path = require('path');
const p16 = path.resolve(__dirname, '../../rom-data/prg-bank-16.ts');
const t = fs.readFileSync(p16, 'utf8');
const m = t.match(/\[([\s\S]*?)\];/);
const bytes = m[1].split(',').map((s) => parseInt(s.trim(), 16));
const areas = { '8291': 12, '8308': 23, '83AF': 4, '83BB': 4, '857A': 16, '8622': 5, '8635': 8, '8645': 8, '86A6': 14, '86C8': 4, '86E3': 17, '86F4': 0, '876A': 0, '89BF': 0 };
const out = [];
for (const addr of Object.keys(areas)) {
  const a = parseInt(addr, 16);
  const lo = a - 0x8000;
  let end = areas[addr];
  if (addr === '86F4' || addr === '876A' || addr === '89BF') end = 0x100;
  const row = [];
  for (let i = 0; i < end; i++) {
    const b = bytes[lo + i];
    row.push(b === undefined ? '??' : '0x' + b.toString(16).padStart(2, '0'));
  }
  out.push(addr + ': ' + row.join(' '));
}
fs.writeFileSync(path.join(__dirname, '_b16_data_tables.txt'), out.join('\n'));
console.log('ok bytes', bytes.length);
