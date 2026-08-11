// 检查 bank13 共享区域：0xA580-0xA660 与 0xB650-0xB6A0
const fs = require('fs');
const path = require('path');
function ex(p) {
  const c = fs.readFileSync(p, 'utf8');
  const m = c.match(/=\s*\[([\s\S]*?)\];/);
  if (!m) return [];
  const v = [];
  const re = /0x([0-9A-Fa-f]{2})/g;
  let x;
  while ((x = re.exec(m[1])) !== null) v.push(parseInt(x[1], 16));
  return v;
}
const b13 = ex(path.join(__dirname, 'rom-data', 'prg-bank-13.ts'));
const h2 = n => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
function dump(bank, from, to) {
  for (let a = from; a <= to; a += 16) {
    const end = Math.min(a + 15, to);
    const bytes = [];
    for (let k = a; k <= end; k++) bytes.push(h2(bank[k]));
    console.log('0x' + a.toString(16).toUpperCase().padStart(4, '0') + ' | ' + bytes.join(' '));
  }
  console.log();
}
dump(b13, 0x0580, 0x0660);   // 0xA580-0xA660
dump(b13, 0x1640, 0x16A0);   // 0xB640-0xB6A0
