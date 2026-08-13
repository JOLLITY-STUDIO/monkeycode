// 从 bank12 SE_MAP($8BDA) 表确认 SID→initPtr→bank 归属，并转储 bank15 各 header
const fs = require('fs');
const path = require('path');

function extractArray(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/=\s*\[([\s\S]*?)\];/);
  if (!match) return [];
  const vals = [];
  let m;
  while ((m = /0x([0-9A-Fa-f]{2})/g.exec(match[1])) !== null) vals.push(parseInt(m[1], 16));
  return vals;
}

const b12 = extractArray(path.join(__dirname, 'rom-data', 'prg-bank-12.ts'));
const b15 = extractArray(path.join(__dirname, 'rom-data', 'prg-bank-15.ts'));

function sidToBank(sid) {
  if (sid < 0x32) return 12;
  if (sid < 0x44) return 13;
  if (sid < 0x51) return 14;
  if (sid < 0x5C) return 15;
  return 12;
}

// SE_MAP at $8BDA (bank12 window $8000-$9FFF) → offset 0xBDA
console.log('=== SE_MAP @$8BDA (SID# → initPtr) ===');
const MAP_OFF = 0x8BDA - 0x8000;
for (let sid = 0x30; sid <= 0x5C; sid++) {
  const idx = (sid - 1) * 2 + MAP_OFF;
  if (idx + 1 >= b12.length) break;
  const lo = b12[idx];
  const hi = b12[idx + 1];
  const ptr = (hi << 8) | lo;
  const bank = sidToBank(sid);
  let off = -1;
  if (ptr >= 0x8000 && ptr < 0xA000) off = ptr - 0x8000;      // bank12 窗口
  else if (ptr >= 0xA000 && ptr < 0xC000) off = ptr - 0xA000; // bank13-15 窗口
  console.log(`SID 0x${sid.toString(16)} → ptr=$${ptr.toString(16)} bank=${bank}${off >= 0 ? ' bankOffset=0x' + off.toString(16) : ''}`);
}

// 转储 bank15 各已知 BGM header
console.log('\n=== Bank15 BGM header 转储 ===');
const initPtrs = [
  0xA000, 0xA157, 0xA1F8, 0xA30F, 0xA5E0, 0xA7D9, 0xA848, 0xAAA8, 0xAC59, 0xB7AD,
];
for (const addr of initPtrs) {
  const off = addr - 0xA000;
  console.log(`\ninitPtr=$${addr.toString(16)} (offset 0x${off.toString(16)}):`);
  console.log('  ' + b15.slice(off, off + 24).map(x => x.toString(16).padStart(2, '0')).join(' '));
}

// bank15 尾部
console.log('\n=== Bank15 尾部 $1FD0-$1FFF ===');
console.log('  ' + b15.slice(0x1FD0).map(x => x.toString(16).padStart(2, '0')).join(' '));
