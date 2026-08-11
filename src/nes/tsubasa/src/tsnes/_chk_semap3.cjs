// 校验 SE_MAP 关键条目（引擎真实索引 index = SE#-1）
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
const b12 = ex(path.join(__dirname, 'rom-data', 'prg-bank-12.ts'));
const b13 = ex(path.join(__dirname, 'rom-data', 'prg-bank-13.ts'));
const b14 = ex(path.join(__dirname, 'rom-data', 'prg-bank-14.ts'));
const b15 = ex(path.join(__dirname, 'rom-data', 'prg-bank-15.ts'));
const B = { 12: b12, 13: b13, 14: b14, 15: b15 };
const h2 = n => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const h4 = n => '0x' + n.toString(16).toUpperCase().padStart(4, '0');
function rb(sid, addr) {
  if (addr >= 0x8000 && addr < 0xA000) return b12[addr - 0x8000] || 0;
  if (addr >= 0xA000 && addr < 0xC000) {
    let b = 12;
    if (sid >= 0x32 && sid < 0x44) b = 13;
    else if (sid >= 0x44 && sid < 0x51) b = 14;
    else if (sid >= 0x51 && sid < 0x5C) b = 15;
    return B[b][addr - 0xA000] || 0;
  }
  return 0;
}
const list = [0x30, 0x31, 0x32, 0x33, 0x34, 0x39, 0x3A, 0x4A, 0x4B, 0x50, 0x5B];
for (const se of list) {
  const idx = se - 1;
  const off = 0x0BDA + idx * 2;
  const lo = b12[off], hi = b12[off + 1];
  const ptr = (hi << 8) | lo;
  const bytes = [];
  for (let k = 0; k < 14; k++) bytes.push(h2(rb(se, ptr + k)));
  console.log('SE#' + h2(se), 'idx', h2(idx), '@' + h4(off), '->', h4(ptr), ':', bytes.join(' '));
}
