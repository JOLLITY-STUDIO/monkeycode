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
const bank12 = extractArray(path.join('rom-data', 'prg-bank-12.ts'));
const bank13 = extractArray(path.join('rom-data', 'prg-bank-13.ts'));
const bank14 = extractArray(path.join('rom-data', 'prg-bank-14.ts'));
const bank15 = extractArray(path.join('rom-data', 'prg-bank-15.ts'));
const banks = { 12: bank12, 13: bank13, 14: bank14, 15: bank15 };
function sidToBank(sid) {
  if (sid < 0x32) return 12;
  if (sid < 0x44) return 13;
  if (sid < 0x51) return 14;
  return 15;
}
function readByte(sid, addr) {
  if (addr >= 0x8000 && addr < 0xA000) return bank12[addr - 0x8000] || 0;
  if (addr >= 0xA000 && addr < 0xC000) {
    const b = banks[sidToBank(sid)];
    return b[addr - 0xA000] || 0;
  }
  return 0;
}
function hex(v) { return '0x' + v.toString(16).toUpperCase().padStart(2, '0'); }
function dump(sid, addr, n) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(hex(readByte(sid, addr + i)));
  return arr.join(' ');
}
// SE_MAP @ $8BDA: print 64 entries
console.log('=== SE_MAP $8BDA (64 entries) ===');
for (let i = 0; i < 64; i++) {
  const lo = bank12[0x0BDA + i * 2];
  const hi = bank12[0x0BDA + i * 2 + 1];
  const p = (hi << 8) | lo;
  const sid = 0x30 + i;
  console.log(`  ${hex(sid)} → $${p.toString(16).toUpperCase().padStart(4, '0')} @${dump(sid, p, 20)}`);
}
