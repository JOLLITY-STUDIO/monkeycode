// 按引擎真实索引 dump SE_MAP：SE# → index = SE# - 1 → $8BDA + (SE#-1)*2
// SE# 0x30 → 0x0BDA + 0x5E = 0x0C38
const fs = require('fs');
const path = require('path');

function extractArray(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/=\s*\[([\s\S]*?)\];/);
  if (!match) return [];
  const hexPattern = /0x([0-9A-Fa-f]{2})/g;
  const vals = [];
  let m;
  while ((m = hexPattern.exec(match[1])) !== null) vals.push(parseInt(m[1], 16));
  return vals;
}

const b12 = extractArray(path.join(__dirname, 'rom-data', 'prg-bank-12.ts'));
const b13 = extractArray(path.join(__dirname, 'rom-data', 'prg-bank-13.ts'));
const b14 = extractArray(path.join(__dirname, 'rom-data', 'prg-bank-14.ts'));
const b15 = extractArray(path.join(__dirname, 'rom-data', 'prg-bank-15.ts'));
const BANKS = { 12: b12, 13: b13, 14: b14, 15: b15 };

const hex2 = n => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const hex4 = n => '0x' + n.toString(16).toUpperCase().padStart(4, '0');

function readByte(sid, addr) {
  if (addr >= 0x8000 && addr < 0xA000) return b12[addr - 0x8000] || 0;
  if (addr >= 0xA000 && addr < 0xC000) {
    let bank = 12;
    if (sid >= 0x32 && sid < 0x44) bank = 13;
    else if (sid >= 0x44 && sid < 0x51) bank = 14;
    else if (sid >= 0x51 && sid < 0x5C) bank = 15;
    return BANKS[bank][addr - 0xA000] || 0;
  }
  return 0;
}

console.log('=== SE_MAP by SE# (index = SE#-1) ===');
for (let se = 0x30; se <= 0x5F; se++) {
  const idx = se - 1;
  const off = 0x0BDA + idx * 2;
  const lo = b12[off];
  const hi = b12[off + 1];
  const ptr = (hi << 8) | lo;
  let bytes = [];
  for (let k = 0; k < 10; k++) bytes.push(hex2(readByte(se, ptr + k)));
  console.log(`SE#${hex2(se)} (idx ${hex2(idx)} @0x${off.toString(16).toUpperCase()}): → ${hex4(ptr)}: ${bytes.join(' ')}`);
}
