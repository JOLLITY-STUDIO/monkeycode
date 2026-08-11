// 转储 SE_MAP 与各 SID initPtr 区域，核对真实 ROM 数据
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

const ROM_DIR = path.join(__dirname, 'rom-data');
const bank12 = extractArray(path.join(ROM_DIR, 'prg-bank-12.ts'));
const bank13 = extractArray(path.join(ROM_DIR, 'prg-bank-13.ts'));
const bank14 = extractArray(path.join(ROM_DIR, 'prg-bank-14.ts'));
const bank15 = extractArray(path.join(ROM_DIR, 'prg-bank-15.ts'));
const BANKS = { 12: bank12, 13: bank13, 14: bank14, 15: bank15 };

function sidToBank(sid) {
  if (sid < 0x32) return 12;
  if (sid < 0x44) return 13;
  if (sid < 0x51) return 14;
  if (sid < 0x5C) return 15;
  return 12;
}

function readByte(sid, addr) {
  if (addr >= 0x8000 && addr < 0xA000) return bank12[addr - 0x8000] || 0;
  if (addr >= 0xA000 && addr < 0xC000) {
    const b = BANKS[sidToBank(sid)];
    return b[addr - 0xA000] || 0;
  }
  return 0;
}

const hex2 = n => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const hex4 = n => '0x' + n.toString(16).toUpperCase().padStart(4, '0');

const SE_MAP_OFF = 0x0BDA;
console.log('=== SE_MAP (bank12 0x0BDA) ===');
for (let i = 0; i < 48; i++) {
  const sid = 0x30 + i;
  const lo = bank12[SE_MAP_OFF + i * 2];
  const hi = bank12[SE_MAP_OFF + i * 2 + 1];
  const ptr = (hi << 8) | lo;
  const bank = sidToBank(sid);
  // 显示 initPtr 处 12 字节
  let bytes = [];
  for (let k = 0; k < 12; k++) bytes.push(hex2(readByte(sid, ptr + k)));
  console.log(`${hex2(sid)} bank${bank} initPtr=${hex4(ptr)}: ${bytes.join(' ')}`);
}
